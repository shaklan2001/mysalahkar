import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { applyInBank, createLead, fetchOffers, mudraConfig, PartnerError, QuoteError, readQuote, signQuote } from "@/lib/mymudra";
import { assess, normalizePhone } from "@/lib/smart-loan";

export const runtime = "nodejs";

const offersSchema = z
  .object({
    action: z.literal("offers"),
    name: z.string().trim().min(2).max(80),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number."),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    salary: z.number().int().positive(),
    loanAmount: z.number().int().positive(),
    loanTenure: z.number().int().positive(),
    salaried: z.literal(true),
    consent: z.literal(true),
  })
  .strict();

const applySchema = z
  .object({
    action: z.literal("apply"),
    quote: z.string().min(20).max(800),
    bankId: z.string().uuid(),
  })
  .strict();

const bodySchema = z.discriminatedUnion("action", [offersSchema, applySchema]);

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

export async function POST(request: NextRequest) {
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

  const ip = clientIp(request);
  if (limited(`ip:${ip}`, 30, 10 * 60 * 1000)) {
    return json({ error: "Too many attempts. Try again in a few minutes." }, 429, { "Retry-After": "600" });
  }

  try {
    if (parsed.data.action === "apply") {
      const cfg = mudraConfig();
      const boCaseId = readQuote(parsed.data.quote, cfg.token);
      const utmLink = await applyInBank(boCaseId, parsed.data.bankId);
      return json({ utmLink });
    }

    const input = {
      name: parsed.data.name,
      phone: parsed.data.phone,
      dateOfBirth: parsed.data.dateOfBirth,
      salary: parsed.data.salary,
      loanAmount: parsed.data.loanAmount,
      loanTenure: parsed.data.loanTenure,
    };
    const issues = assess(input);
    if (issues.length) return json({ error: issues[0] }, 400);
    if (limited(`phone:${input.phone}`, 5, 10 * 60 * 1000)) {
      return json({ error: "Too many attempts for this mobile number. Try again in a few minutes." }, 429, {
        "Retry-After": "600",
      });
    }

    const boCaseId = await createLead(input);
    const { name, offers } = await fetchOffers(boCaseId);
    return json({
      name: name || input.name,
      offers,
      quote: signQuote(boCaseId, mudraConfig().token),
    });
  } catch (error) {
    if (error instanceof QuoteError) {
      return json({ error: "This offer check has expired. Check eligibility again." }, 400);
    }
    if (error instanceof PartnerError) {
      const status = error.status === 503 ? 503 : error.status === 400 ? 400 : error.status === 429 ? 429 : 502;
      console.error(JSON.stringify({ event: "smart-loan", status: error.status }));
      return json({ error: error.message }, status);
    }
    console.error(JSON.stringify({ event: "smart-loan", status: 500 }));
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
}
