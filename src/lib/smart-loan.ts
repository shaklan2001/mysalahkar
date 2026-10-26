/** Loan rules and My Mudra response parsing. Safe to import from the browser. */

export type CaseType = "PL" | "BL" | "HL";

export const CASE_TYPES: readonly CaseType[] = ["PL", "BL", "HL"];

type LoanRules = {
  label: string;
  minAge: number;
  maxAge: number;
  minAmount: number;
  maxAmount: number;
  minTenure: number;
  maxTenure: number;
  incomeLabel: string;
  maxIncome: number;
};

export const LOAN_RULES: Record<CaseType, LoanRules> = {
  PL: {
    label: "Personal loan",
    minAge: 21,
    maxAge: 60,
    minAmount: 1_000,
    maxAmount: 5_000_000,
    minTenure: 3,
    maxTenure: 60,
    incomeLabel: "Monthly salary (₹)",
    maxIncome: 10_000_000,
  },
  BL: {
    label: "Business loan",
    minAge: 21,
    maxAge: 65,
    minAmount: 50_000,
    maxAmount: 100_000_000,
    minTenure: 6,
    maxTenure: 120,
    incomeLabel: "Last year turnover (₹)",
    maxIncome: 10_000_000_000,
  },
  HL: {
    label: "Home loan",
    minAge: 21,
    maxAge: 65,
    minAmount: 100_000,
    maxAmount: 100_000_000,
    minTenure: 12,
    maxTenure: 360,
    incomeLabel: "Annual income (₹)",
    maxIncome: 1_000_000_000,
  },
};

/** Labels My Mudra accepts as `fileName` on uploadBoFile. */
export const DOCUMENT_LABELS = [
  "PAN Card",
  "Aadhaar Card",
  "Salary Slip",
  "Bank Statement",
  "ITR",
  "GST Certificate",
  "Property Papers",
  "Other",
] as const;

export const DOCUMENT_MAX_BYTES = 10 * 1024 * 1024;

export type LoanRequest = {
  caseType: CaseType;
  name: string;
  phone: string;
  dateOfBirth: string;
  /** PL: monthly salary. BL: last year turnover. HL: annual income. */
  income: number;
  loanAmount: number;
  loanTenure: number;
  /** BL only. */
  businessName?: string;
};

export type PartnerBank = { bankId: string; bankName: string; bankImg: string };

export type CaseBank = { bankName: string; facts: [string, string][] };

export type LoanOffer = {
  bankId: string;
  bankName: string;
  bankImg: string;
  features: string[];
  interestRate: string;
  emi: string;
  loanAmount: number;
  loanTenure: number;
  processingFee?: string;
  penalCharges?: string;
  apr?: string;
};

export const BANK_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const rupees = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

/** "Asha K Rao" -> first "Asha", middle "K", last "Rao". */
export function splitName(full: string): { firstName: string; middleName: string; lastName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { firstName: parts[0] ?? "", middleName: "", lastName: "" };
  return {
    firstName: parts[0],
    middleName: parts.slice(1, -1).join(" "),
    lastName: parts[parts.length - 1],
  };
}

/** "1994-06-15" -> { year: 1994, month: 6, day: 15 }, the date object every My Mudra endpoint uses. */
export function dateParts(iso: string): { year: number; month: number; day: number } {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

/** Age in whole years on a calendar date in India. */
export function ageYears(iso: string, today = new Date()): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const born = new Date(Date.UTC(year, month - 1, day));
  if (
    born.getUTCFullYear() !== year ||
    born.getUTCMonth() !== month - 1 ||
    born.getUTCDate() !== day
  ) {
    return null;
  }
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(today);
  const nowYear = Number(parts.find((part) => part.type === "year")?.value);
  const nowMonth = Number(parts.find((part) => part.type === "month")?.value);
  const nowDay = Number(parts.find((part) => part.type === "day")?.value);
  let age = nowYear - year;
  if (nowMonth < month || (nowMonth === month && nowDay < day)) age -= 1;
  return age;
}

/** Empty list means the profile can be sent to partner banks. */
export function assess(input: LoanRequest, today = new Date()): string[] {
  const rules = LOAN_RULES[input.caseType];
  const issues: string[] = [];
  const name = input.name.trim();
  if (name.length < 2 || name.length > 80) {
    issues.push("Enter your full name.");
  }
  if (!/^[6-9]\d{9}$/.test(normalizePhone(input.phone))) {
    issues.push("Enter a 10-digit Indian mobile number.");
  }
  const age = ageYears(input.dateOfBirth, today);
  if (age === null) {
    issues.push("Enter a valid date of birth.");
  } else if (age < rules.minAge || age > rules.maxAge) {
    issues.push(`${rules.label}s here are for ages ${rules.minAge} to ${rules.maxAge}.`);
  }
  if (input.caseType === "BL") {
    const business = input.businessName?.trim() ?? "";
    if (business.length < 2 || business.length > 120) issues.push("Enter your business name.");
  }
  if (!Number.isInteger(input.income) || input.income < 1 || input.income > rules.maxIncome) {
    issues.push(`Enter your ${rules.incomeLabel.replace(" (₹)", "").toLowerCase()} in rupees.`);
  }
  if (
    !Number.isInteger(input.loanAmount) ||
    input.loanAmount < rules.minAmount ||
    input.loanAmount > rules.maxAmount
  ) {
    issues.push(`Loan amount must be between ${rupees(rules.minAmount)} and ${rupees(rules.maxAmount)}.`);
  }
  if (
    !Number.isInteger(input.loanTenure) ||
    input.loanTenure < rules.minTenure ||
    input.loanTenure > rules.maxTenure
  ) {
    issues.push(`Tenure must be between ${rules.minTenure} and ${rules.maxTenure} months.`);
  }
  return issues;
}

export function findBoCaseId(value: unknown, depth = 0): number | null {
  if (depth > 4 || !value || typeof value !== "object") return null;
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findBoCaseId(item, depth + 1);
      if (found) return found;
    }
    return null;
  }
  const row = value as Record<string, unknown>;
  if ("boCaseId" in row) {
    const id = Number(row.boCaseId);
    if (Number.isInteger(id) && id > 0) return id;
  }
  for (const nested of Object.values(row)) {
    const found = findBoCaseId(nested, depth + 1);
    if (found) return found;
  }
  return null;
}

function text(value: unknown, max = 80): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function httpsUrl(value: unknown): string {
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return "";
    return url.toString();
  } catch {
    return "";
  }
}

export function parseOffers(body: unknown): { name: string; offers: LoanOffer[] } {
  if (!body || typeof body !== "object") return { name: "", offers: [] };
  const root = body as Record<string, unknown>;
  const data =
    root.data && typeof root.data === "object" && !Array.isArray(root.data)
      ? (root.data as Record<string, unknown>)
      : root;
  const name = text(data.name, 80);
  const list = Array.isArray(data.lenderList) ? data.lenderList : [];
  const offers: LoanOffer[] = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    if (row.isActive === false) continue;
    const bankId = text(row.bankId, 36);
    const bankName = text(row.bankName, 80);
    if (!BANK_ID.test(bankId) || !bankName) continue;
    const features = Array.isArray(row.features)
      ? row.features.filter((feature): feature is string => typeof feature === "string").map((feature) => feature.trim()).filter(Boolean).slice(0, 6)
      : [];
    const offer: LoanOffer = {
      bankId,
      bankName,
      bankImg: httpsUrl(row.bankImg),
      features,
      interestRate: text(row.interestRate),
      emi: text(row.emi),
      loanAmount: Number(row.loanAmount) || 0,
      loanTenure: Number(row.loanTenure) || 0,
    };
    const processingFee = text(row.processingFee, 120);
    const penalCharges = text(row.penalCharges, 120);
    const apr = text(row.apr);
    if (processingFee) offer.processingFee = processingFee;
    if (penalCharges) offer.penalCharges = penalCharges;
    if (apr) offer.apr = apr;
    offers.push(offer);
  }
  return { name, offers };
}

export function parseUtmLink(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const root = body as Record<string, unknown>;
  const data =
    root.data && typeof root.data === "object" && !Array.isArray(root.data)
      ? (root.data as Record<string, unknown>)
      : root;
  return httpsUrl(data.utmLink) || null;
}

/** First array of objects anywhere under the body (My Mudra nests lists under varying keys). */
function firstRows(value: unknown, depth = 0): Record<string, unknown>[] {
  if (depth > 4 || !value || typeof value !== "object") return [];
  if (Array.isArray(value)) {
    const rows = value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item));
    if (rows.length) return rows;
  }
  for (const nested of Object.values(value as Record<string, unknown>)) {
    const rows = firstRows(nested, depth + 1);
    if (rows.length) return rows;
  }
  return [];
}

/** getAllBanks: master list used with addBoCaseBank. */
export function parseBanks(body: unknown): PartnerBank[] {
  const root = body && typeof body === "object" ? (body as Record<string, unknown>).data ?? body : body;
  const banks: PartnerBank[] = [];
  const seen = new Set<string>();
  for (const row of firstRows(root)) {
    const bankId = text(row.bankId ?? row.id, 36);
    const bankName = text(row.bankName ?? row.name, 80);
    if (!BANK_ID.test(bankId) || !bankName || seen.has(bankId) || row.isActive === false) continue;
    seen.add(bankId);
    banks.push({ bankId, bankName, bankImg: httpsUrl(row.bankImg ?? row.bankImage ?? row.logo) });
  }
  return banks.sort((a, b) => a.bankName.localeCompare(b.bankName));
}

function labelFor(key: string): string {
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

/**
 * getBankDetailsForBoCase: the response shape is undocumented, so keep the
 * readable scalar fields of each bank row and drop ids, links and blanks.
 */
export function parseCaseBanks(body: unknown): CaseBank[] {
  const root = body && typeof body === "object" ? (body as Record<string, unknown>).data ?? body : body;
  return firstRows(root)
    .slice(0, 20)
    .map((row) => {
      const facts: [string, string][] = [];
      for (const [key, value] of Object.entries(row)) {
        if (facts.length >= 10) break;
        if (/id$|img|image|logo|link|url|token/i.test(key) || /^bank ?name$/i.test(key)) continue;
        const shown =
          typeof value === "string" ? value.trim().slice(0, 120) : typeof value === "number" || typeof value === "boolean" ? String(value) : "";
        if (shown) facts.push([labelFor(key), shown]);
      }
      return { bankName: text(row.bankName ?? row.name, 80) || "Bank", facts };
    });
}

/** Content type from the file's first bytes. Null when it is not a PDF, JPG, PNG or WEBP. */
export function sniffDocument(head: Uint8Array): "application/pdf" | "image/jpeg" | "image/png" | "image/webp" | null {
  const ascii = (from: number, to: number) => String.fromCharCode(...head.slice(from, to));
  if (ascii(0, 5) === "%PDF-") return "application/pdf";
  if (head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff) return "image/jpeg";
  if (head[0] === 0x89 && ascii(1, 4) === "PNG") return "image/png";
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  return null;
}

/** Short partner message safe to show. Null when the body has nothing usable. */
export function partnerNote(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const root = body as Record<string, unknown>;
  const message = root.message;
  const error = root.error;
  const candidates = [
    typeof message === "string" ? message : null,
    message && typeof message === "object" ? (message as Record<string, unknown>).errorMessage : null,
    error && typeof error === "object" ? (error as Record<string, unknown>).errorMessage : null,
    typeof error === "string" ? error : null,
    message && typeof message === "object" ? (message as Record<string, unknown>).successMessage : null,
  ];
  for (const raw of candidates) {
    if (typeof raw !== "string") continue;
    const note = raw.replace(/\s+/g, " ").trim();
    if (!note || note.length > 180) continue;
    if (/token|secret|password|authorization/i.test(note)) continue;
    return note;
  }
  return null;
}

export function selfCheckSmartLoan(today = new Date("2026-10-20T12:00:00+05:30")): void {
  if (ageYears("2000-10-20", today) !== 26) throw new Error("age on birthday");
  if (ageYears("2000-10-21", today) !== 25) throw new Error("age before birthday");
  if (ageYears("1990-02-31", today) !== null) throw new Error("invalid date");
  const asha: LoanRequest = {
    caseType: "PL",
    name: "Asha Rao",
    phone: "+91 98765 43210",
    dateOfBirth: "1994-06-15",
    income: 45000,
    loanAmount: 200000,
    loanTenure: 24,
  };
  const ok = assess(asha, today);
  if (ok.length) throw new Error(`expected eligible, got ${ok.join("; ")}`);
  const young = assess({ ...asha, dateOfBirth: "2010-01-01" }, today);
  if (!young.some((issue) => issue.includes("ages"))) throw new Error("age gate");
  const noBusiness = assess({ ...asha, caseType: "BL", loanAmount: 500000 }, today);
  if (!noBusiness.some((issue) => issue.includes("business name"))) throw new Error("BL business name");
  const home = assess({ ...asha, caseType: "HL", income: 900000, loanAmount: 3500000, loanTenure: 240 }, today);
  if (home.length) throw new Error(`expected HL eligible, got ${home.join("; ")}`);
  const name = splitName("  Asha  K  Rao ");
  if (name.firstName !== "Asha" || name.middleName !== "K" || name.lastName !== "Rao") throw new Error("split name");
  if (dateParts("1994-06-15").month !== 6) throw new Error("date parts");
  const banks = parseBanks({
    data: [
      { bankId: "3b7bd756-44e9-11ef-b0fa-d62b02630d4d", bankName: "Axis Bank" },
      { bankId: "bad", bankName: "Skip" },
    ],
  });
  if (banks.length !== 1 || banks[0]?.bankName !== "Axis Bank") throw new Error("bank parse");
  const tracked = parseCaseBanks({
    data: { bankDetails: [{ bankId: "x", bankName: "Axis Bank", status: "LOGIN", sanctionedAmount: 400000, applyLink: "https://x" }] },
  });
  if (tracked[0]?.bankName !== "Axis Bank" || tracked[0].facts.length !== 2) throw new Error("case bank parse");
  if (sniffDocument(new TextEncoder().encode("%PDF-1.7")) !== "application/pdf") throw new Error("pdf sniff");
  if (sniffDocument(new TextEncoder().encode("<html>")) !== null) throw new Error("html must be rejected");
  const parsed = parseOffers({
    success: true,
    data: {
      name: "Asha Rao",
      lenderList: [
        {
          bankId: "3783cfcf-8a9c-4bae-90fc-26a00f41fab9",
          bankName: "HDFC Bank",
          bankImg: "https://devserver.mymudrafintech.com/logo.png",
          interestRate: "9.99%-24.00%",
          emi: "₹10,000",
          loanAmount: 200000,
          loanTenure: 24,
          isActive: true,
          features: ["Quick disbursal"],
        },
        { bankId: "not-a-uuid", bankName: "Skip", isActive: true },
        { bankId: "29bae68f-0cc5-11f1-98b5-a2aa3dc1a4da", bankName: "Off", isActive: false },
      ],
    },
  });
  if (parsed.offers.length !== 1 || parsed.offers[0]?.bankName !== "HDFC Bank") {
    throw new Error("offer parse");
  }
  if (findBoCaseId({ data: { boCaseId: 4903 } }) !== 4903) throw new Error("case id");
  if (parseUtmLink({ data: { utmLink: "http://bank.example/apply" } }) !== null) {
    throw new Error("utm must be https");
  }
  const note = partnerNote({
    success: false,
    error: { errorCode: "BAD_REQUEST", errorMessage: "Salary is required." },
  });
  if (note !== "Salary is required.") throw new Error("partner note");
}

if (typeof process !== "undefined" && process.argv?.[1]?.endsWith("smart-loan.ts")) {
  selfCheckSmartLoan();
}
