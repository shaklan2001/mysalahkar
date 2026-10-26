import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  addCaseBank,
  applyInBank,
  caseBankDetails,
  createLead,
  fetchOffers,
  listBanks,
  mudraConfig,
  PartnerError,
  QuoteError,
  readQuote,
  signQuote,
  uploadDocument,
} from "@/lib/mymudra";
import { assess, BANK_ID, DOCUMENT_LABELS, DOCUMENT_MAX_BYTES, normalizePhone, sniffDocument } from "@/lib/smart-loan";

export const runtime = "nodejs";

const quote = z.string().min(20).max(800);
const bankId = z.string().regex(BANK_ID, "Choose a bank from the list.");

const leadSchema = z
  .object({
    action: z.literal("lead"),
    caseType: z.enum(["PL", "BL", "HL"]),
    name: z.string().trim().min(2).max(80),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number."),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    income: z.number().int().positive(),
    loanAmount: z.number().int().positive(),
    loanTenure: z.number().int().positive(),
    businessName: z.string().trim().max(120).optional(),
    salaried: z.boolean().optional(),
    consent: z.literal(true),
  })
  .strict();

const bodySchema = z.discriminatedUnion("action", [
  leadSchema,
  z.object({ action: z.literal("apply"), quote, bankId }).strict(),
  z.object({ action: z.literal("banks"), quote }).strict(),
  z.object({ action: z.literal("addBank"), quote, bankId }).strict(),
  z.object({ action: z.literal("track"), quote }).strict(),
]);

// ponytail: per-process window. A shared store is needed if more than one server handles this route.
const hits = new Map<string, number[]>();

function limited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [id, times] of hits) {
      if (times.every((at) => now - at >= windowMs)) hits.delete(id);
    }
  }
  return false;
}

function clientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function json(body: unknown, status = 200, extra?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...Object.fromEntries(new Headers(extra).entries()) },
  });
}

function failure(error: unknown) {
  if (error instanceof QuoteError) {
    return json({ error: "This loan check has expired. Start again." }, 400);
  }
  if (error instanceof PartnerError) {
    const status = error.status === 503 ? 503 : error.status === 400 ? 400 : error.status === 429 ? 429 : 502;
    console.error(JSON.stringify({ event: "smart-loan", status: error.status }));
    return json({ error: error.message }, status);
  }
  console.error(JSON.stringify({ event: "smart-loan", status: 500 }));
  return json({ error: "Something went wrong. Please try again." }, 500);
}

function caseFrom(token: string) {
  return readQuote(token, mudraConfig().token);
}

/** Multipart: quote, fileName (one of DOCUMENT_LABELS) and file. Forwarded to uploadBoFile. */
async function upload(request: NextRequest) {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > DOCUMENT_MAX_BYTES + 64 * 1024) return json({ error: "Files must be 10 MB or smaller." }, 413);
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Attach a file to upload." }, 400);
  }
  const token = form.get("quote");
  const label = form.get("fileName");
  const file = form.get("file");
  if (typeof token !== "string" || !quote.safeParse(token).success) {
    return json({ error: "This loan check has expired. Start again." }, 400);
  }
  if (typeof label !== "string" || !(DOCUMENT_LABELS as readonly string[]).includes(label)) {
    return json({ error: "Choose what this document is.", field: "fileName" }, 400);
  }
  if (!(file instanceof Blob) || file.size === 0) return json({ error: "Attach a file to upload.", field: "file" }, 400);
  if (file.size > DOCUMENT_MAX_BYTES) return json({ error: "Files must be 10 MB or smaller.", field: "file" }, 413);
  const type = sniffDocument(new Uint8Array(await file.slice(0, 16).arrayBuffer()));
  if (!type) return json({ error: "Upload a PDF, JPG, PNG or WEBP file.", field: "file" }, 415);

  try {
    const { boCaseId } = caseFrom(token);
    const ext = type === "application/pdf" ? "pdf" : type.slice("image/".length).replace("jpeg", "jpg");
    // The browser's file name is not forwarded; the label plus a fixed extension is enough for My Mudra.
    const uploadName = `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.${ext}`;
    await uploadDocument(boCaseId, label, new Blob([await file.arrayBuffer()], { type }), uploadName);
    return json({ uploaded: label });
  } catch (error) {
    return failure(error);
  }
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (limited(`ip:${ip}`, 40, 10 * 60 * 1000)) {
    return json({ error: "Too many attempts. Try again in a few minutes." }, 429, { "Retry-After": "600" });
  }

  if (request.headers.get("content-type")?.startsWith("multipart/form-data")) {
    if (limited(`upload:${ip}`, 15, 10 * 60 * 1000)) {
      return json({ error: "Too many uploads. Try again in a few minutes." }, 429, { "Retry-After": "600" });
    }
    return upload(request);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Send a JSON body." }, 400);
  }

  const incoming =
    payload && typeof payload === "object" && !Array.isArray(payload)
      ? {
          ...(payload as Record<string, unknown>),
          ...(typeof (payload as { phone?: unknown }).phone === "string"
            ? { phone: normalizePhone((payload as { phone: string }).phone) }
            : {}),
        }
      : payload;
  const parsed = bodySchema.safeParse(incoming);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = issue?.path?.[0];
    return json(
      { error: issue?.message || "Check the form and try again.", field: typeof field === "string" ? field : undefined },
      400,
    );
  }

  try {
    const data = parsed.data;
    switch (data.action) {
      case "apply": {
        const ref = caseFrom(data.quote);
        if (ref.caseType !== "PL") return json({ error: "Bank offers are only for personal loans." }, 400);
        return json({ utmLink: await applyInBank(ref.boCaseId, data.bankId) });
      }
      case "banks":
        caseFrom(data.quote);
        return json({ banks: await listBanks() });
      case "addBank": {
        const { boCaseId } = caseFrom(data.quote);
        await addCaseBank(boCaseId, data.bankId);
        return json({ banks: await caseBankDetails(boCaseId) });
      }
      case "track":
        return json({ banks: await caseBankDetails(caseFrom(data.quote).boCaseId) });
      case "lead":
        break;
    }

    if (data.caseType === "PL" && data.salaried !== true) {
      return json({ error: "This check is for salaried personal loans.", field: "salaried" }, 400);
    }
    const input = {
      caseType: data.caseType,
      name: data.name,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      income: data.income,
      loanAmount: data.loanAmount,
      loanTenure: data.loanTenure,
      businessName: data.caseType === "BL" ? data.businessName : undefined,
    };
    const issues = assess(input);
    if (issues.length) return json({ error: issues[0] }, 400);
    if (limited(`phone:${input.phone}`, 5, 10 * 60 * 1000)) {
      return json({ error: "Too many attempts for this mobile number. Try again in a few minutes." }, 429, {
        "Retry-After": "600",
      });
    }

    const boCaseId = await createLead(input);
    const signed = signQuote({ boCaseId, caseType: input.caseType }, mudraConfig().token);
    if (input.caseType !== "PL") return json({ name: input.name, offers: null, quote: signed });
    try {
      const { name, offers } = await fetchOffers(boCaseId);
      return json({ name: name || input.name, offers, quote: signed });
    } catch (error) {
      // The lead exists, so keep the case usable for bank selection and documents.
      if (!(error instanceof PartnerError) || error.status === 503) throw error;
      console.error(JSON.stringify({ event: "smart-loan-offers", status: error.status }));
      return json({ name: input.name, offers: null, quote: signed, notice: "Bank offers could not be loaded. You can still pick a bank below." });
    }
  } catch (error) {
    return failure(error);
  }
}
