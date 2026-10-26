import { createHmac, timingSafeEqual } from "node:crypto";
import {
  CASE_TYPES,
  dateParts,
  findBoCaseId,
  parseBanks,
  parseCaseBanks,
  parseOffers,
  parseUtmLink,
  partnerNote,
  selfCheckSmartLoan,
  splitName,
  type CaseBank,
  type CaseType,
  type LoanOffer,
  type LoanRequest,
  type PartnerBank,
} from "./smart-loan";

const ALLOWED_HOSTS = new Set([
  "devserver.mymudrafintech.com",
  "api.mymudrafintech.com",
]);

const QUOTE_MS = 30 * 60 * 1000;

export class QuoteError extends Error {
  constructor() {
    super("Offer check expired");
    this.name = "QuoteError";
  }
}

export class PartnerError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "PartnerError";
    this.status = status;
  }
}

type MudraConfig = { origin: string; token: string; partnerCode: string };

export function mudraConfig(): MudraConfig {
  const token = process.env.MYMUDRA_TOKEN?.trim() ?? "";
  const partnerCode = process.env.MYMUDRA_PARTNER_CODE?.trim() ?? "";
  const base = process.env.MYMUDRA_BASE_URL?.trim() ?? "";
  if (!token || !partnerCode || !base) {
    throw new PartnerError("Smart Loan is not configured.", 503);
  }
  let url: URL;
  try {
    url = new URL(base);
  } catch {
    throw new PartnerError("Smart Loan is not configured.", 503);
  }
  if (url.protocol !== "https:" || url.username || url.password || !ALLOWED_HOSTS.has(url.hostname)) {
    throw new PartnerError("Smart Loan is not configured.", 503);
  }
  return { origin: url.origin, token, partnerCode };
}

export type CaseRef = { boCaseId: number; caseType: CaseType };

/** Signed, short-lived handle to a My Mudra case so the browser never picks an arbitrary boCaseId. */
export function signQuote(ref: CaseRef, secret: string, now = Date.now()): string {
  const payload = Buffer.from(JSON.stringify({ ...ref, exp: now + QUOTE_MS })).toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function readQuote(token: string, secret: string, now = Date.now()): CaseRef {
  const dot = token.indexOf(".");
  if (dot <= 0) throw new QuoteError();
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) throw new QuoteError();
  let data: unknown;
  try {
    data = JSON.parse(Buffer.from(payload, "base64url").toString());
  } catch {
    throw new QuoteError();
  }
  if (!data || typeof data !== "object") throw new QuoteError();
  const row = data as Record<string, unknown>;
  if (typeof row.boCaseId !== "number" || !Number.isInteger(row.boCaseId) || row.boCaseId <= 0) {
    throw new QuoteError();
  }
  if (typeof row.exp !== "number" || row.exp < now) throw new QuoteError();
  if (!CASE_TYPES.includes(row.caseType as CaseType)) throw new QuoteError();
  return { boCaseId: row.boCaseId, caseType: row.caseType as CaseType };
}

async function mudra(
  path: string,
  init: { method: "GET" | "POST"; body?: unknown },
  retry: boolean,
): Promise<unknown> {
  const form = init.body instanceof FormData ? init.body : null;
  const cfg = mudraConfig();
  const url = new URL(path, cfg.origin);
  if (url.origin !== cfg.origin) throw new PartnerError("Smart Loan is not configured.", 503);

  let lastStatus = 0;
  const attempts = retry ? 3 : 1;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12_000);
    try {
      const res = await fetch(url, {
        method: init.method,
        redirect: "manual",
        signal: controller.signal,
        headers: {
          Token: cfg.token,
          Accept: "application/json",
          // fetch sets the multipart boundary itself for FormData.
          ...(init.body === undefined || form ? {} : { "Content-Type": "application/json" }),
        },
        body: form ?? (init.body === undefined ? undefined : JSON.stringify(init.body)),
      });
      lastStatus = res.status;
      if (res.status >= 300 && res.status < 400) {
        throw new PartnerError("The loan partner could not complete that step.", 502);
      }
      const body = (await res.json().catch(() => null)) as unknown;
      if (res.status === 401 || res.status === 403) {
        console.error(JSON.stringify({ event: "mymudra", status: res.status }));
        throw new PartnerError("Smart Loan is temporarily unavailable. Please try again later.", 503);
      }
      if ((res.status === 429 || res.status >= 500) && attempt < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
        continue;
      }
      if (!res.ok || (body && typeof body === "object" && (body as { success?: boolean }).success === false)) {
        throw new PartnerError(partnerNote(body) ?? "The loan partner could not complete that step.", res.ok ? 502 : res.status);
      }
      return body;
    } catch (error) {
      if (error instanceof PartnerError) throw error;
      if (attempt < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
        continue;
      }
      throw new PartnerError("The loan partner could not be reached.", lastStatus || 502);
    } finally {
      clearTimeout(timer);
    }
  }
  throw new PartnerError("The loan partner could not be reached.", 502);
}

/** Request bodies follow the Partner API docs (16 Sep 2026): addPLLead, addBLLead, addHLLead. */
function leadRequest(input: LoanRequest): { path: string; body: unknown } {
  const name = input.name.trim();
  const mobileNumber = { countrycode: "+91", phoneNumber: input.phone };
  const dob = dateParts(input.dateOfBirth);
  if (input.caseType === "BL") {
    return {
      path: "/api/v1/addBLLead",
      body: {
        coApplicants: [{ name, dob, mobileNumber, isMainApplicant: true, shareHoldingInPercent: 100 }],
        companyDetails: { name: input.businessName?.trim() ?? "" },
        loanDetails: {
          loanAmount: input.loanAmount,
          loanTenure: input.loanTenure,
          lastYearTurnOver: input.income,
          directorDob: dob,
        },
      },
    };
  }
  if (input.caseType === "HL") {
    return {
      path: "/api/v1/addHLLead",
      body: {
        applicantDetails: {
          ...splitName(name),
          mobileNumber,
          dob,
          requestedLoanAmount: input.loanAmount,
          requestedLoanTenure: input.loanTenure,
          totalIncome: input.income,
        },
      },
    };
  }
  // getBanksOfferList needs loan amount, tenure, salary and date of birth on the lead.
  return {
    path: "/api/v1/addPLLead",
    body: {
      applicant: {
        ...splitName(name),
        dob,
        mobileNumber,
        employeeType: "Salaried",
        grossIncome: input.income,
        loanAmount: input.loanAmount,
        loanTenure: input.loanTenure,
      },
    },
  };
}

export async function createLead(input: LoanRequest): Promise<number> {
  const { path, body } = leadRequest(input);
  const res = await mudra(path, { method: "POST", body }, false);
  const id = findBoCaseId(res);
  if (!id) throw new PartnerError("The loan partner did not return a case id.", 502);
  return id;
}

export async function fetchOffers(boCaseId: number): Promise<{ name: string; offers: LoanOffer[] }> {
  const body = await mudra("/api/v1/getBanksOfferList", { method: "POST", body: { boCaseId } }, true);
  return parseOffers(body);
}

export async function applyInBank(boCaseId: number, bankId: string): Promise<string> {
  const cfg = mudraConfig();
  const path = `/api/v1/applyInBank?${new URLSearchParams({
    boCaseId: String(boCaseId),
    bankId,
    partnerReferralCode: cfg.partnerCode,
    caseType: "PL",
  }).toString()}`;
  const body = await mudra(path, { method: "GET" }, false);
  const link = parseUtmLink(body);
  if (!link) throw new PartnerError("The bank did not return an application link.", 502);
  return link;
}

export async function listBanks(): Promise<PartnerBank[]> {
  return parseBanks(await mudra("/api/v1/getAllBanks", { method: "GET" }, true));
}

export async function addCaseBank(boCaseId: number, bankId: string): Promise<void> {
  await mudra("/api/v1/addBoCaseBank", { method: "POST", body: { boCaseId, bankDetails: [{ bankId }] } }, false);
}

export async function caseBankDetails(boCaseId: number): Promise<CaseBank[]> {
  return parseCaseBanks(await mudra("/api/v1/getBankDetailsForBoCase", { method: "POST", body: { boCaseId } }, true));
}

export async function uploadDocument(boCaseId: number, fileName: string, file: Blob, uploadName: string): Promise<void> {
  const form = new FormData();
  form.set("fileName", fileName);
  form.set("boCaseId", String(boCaseId));
  form.set("file", file, uploadName);
  await mudra("/api/v1/uploadBoFile", { method: "POST", body: form }, false);
}

if (typeof process !== "undefined" && process.argv?.[1]?.endsWith("mymudra.ts")) {
  selfCheckSmartLoan();
  const now = 1_700_000_000_000;
  const quote = signQuote({ boCaseId: 4903, caseType: "PL" }, "test-secret", now);
  const back = readQuote(quote, "test-secret", now);
  if (back.boCaseId !== 4903 || back.caseType !== "PL") throw new Error("quote roundtrip");
  const pl = leadRequest({
    caseType: "PL",
    name: "Asha Rao",
    phone: "9876543210",
    dateOfBirth: "1994-06-15",
    income: 45000,
    loanAmount: 200000,
    loanTenure: 24,
  });
  const applicant = (pl.body as { applicant: Record<string, unknown> }).applicant;
  if (pl.path !== "/api/v1/addPLLead" || applicant.grossIncome !== 45000 || applicant.firstName !== "Asha") {
    throw new Error("PL lead body");
  }
  let rejected = false;
  try {
    readQuote(quote, "other-secret", now);
  } catch {
    rejected = true;
  }
  if (!rejected) throw new Error("quote must reject a bad secret");
}
