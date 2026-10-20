/** Personal-loan rules and My Mudra response parsing. Safe to import from the browser. */

export const LOAN_LIMITS = {
  minAge: 21,
  maxAge: 60,
  minAmount: 1_000,
  maxAmount: 5_000_000,
  minTenure: 3,
  maxTenure: 60,
  minSalary: 1,
  maxSalary: 10_000_000,
} as const;

export type LoanRequest = {
  name: string;
  phone: string;
  dateOfBirth: string;
  salary: number;
  loanAmount: number;
  loanTenure: number;
};

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

const BANK_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
  } else if (age < LOAN_LIMITS.minAge || age > LOAN_LIMITS.maxAge) {
    issues.push(`Personal loans here are for ages ${LOAN_LIMITS.minAge} to ${LOAN_LIMITS.maxAge}.`);
  }
  if (
    !Number.isInteger(input.salary) ||
    input.salary < LOAN_LIMITS.minSalary ||
    input.salary > LOAN_LIMITS.maxSalary
  ) {
    issues.push("Enter your monthly salary in rupees.");
  }
  if (
    !Number.isInteger(input.loanAmount) ||
    input.loanAmount < LOAN_LIMITS.minAmount ||
    input.loanAmount > LOAN_LIMITS.maxAmount
  ) {
    issues.push("Loan amount must be between ₹1,000 and ₹50,00,000.");
  }
  if (
    !Number.isInteger(input.loanTenure) ||
    input.loanTenure < LOAN_LIMITS.minTenure ||
    input.loanTenure > LOAN_LIMITS.maxTenure
  ) {
    issues.push("Tenure must be between 3 and 60 months.");
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
  const ok = assess(
    {
      name: "Asha Rao",
      phone: "+91 98765 43210",
      dateOfBirth: "1994-06-15",
      salary: 45000,
      loanAmount: 200000,
      loanTenure: 24,
    },
    today,
  );
  if (ok.length) throw new Error(`expected eligible, got ${ok.join("; ")}`);
  const young = assess(
    {
      name: "Asha Rao",
      phone: "9876543210",
      dateOfBirth: "2010-01-01",
      salary: 45000,
      loanAmount: 200000,
      loanTenure: 24,
    },
    today,
  );
  if (!young.some((issue) => issue.includes("ages"))) throw new Error("age gate");
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
