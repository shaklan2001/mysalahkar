import { createHash, randomInt, timingSafeEqual } from "node:crypto";

/**
 * One-time passcodes for phone login.
 *
 * In-memory: fine for a single dev/server process. Move to Redis or a DB
 * table before running on multiple instances or serverless.
 */

export type OtpRole = "client" | "professional";

const TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const RESEND_AFTER_MS = 30 * 1000;

type Entry = {
  hash: string;
  expiresAt: number;
  attempts: number;
  sentAt: number;
};

const store = new Map<string, Entry>();

const key = (role: OtpRole, phone: string) => `${role}:${phone}`;
const hash = (code: string) => createHash("sha256").update(code).digest("hex");

/** Indian mobile numbers: 10 digits starting 6–9, with or without +91 / 0. */
export function normalizeIndianMobile(input: string): string | null {
  const digits = input.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function issueOtp(
  role: OtpRole,
  phone: string,
): { code: string } | { retryAfter: number } {
  const now = Date.now();
  const existing = store.get(key(role, phone));
  if (existing && now - existing.sentAt < RESEND_AFTER_MS) {
    return {
      retryAfter: Math.ceil((RESEND_AFTER_MS - (now - existing.sentAt)) / 1000),
    };
  }
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  store.set(key(role, phone), {
    hash: hash(code),
    expiresAt: now + TTL_MS,
    attempts: 0,
    sentAt: now,
  });
  return { code };
}

export type VerifyResult = "ok" | "invalid" | "expired" | "locked";

export function verifyOtp(
  role: OtpRole,
  phone: string,
  code: string,
): VerifyResult {
  const k = key(role, phone);
  const entry = store.get(k);
  if (!entry || Date.now() > entry.expiresAt) {
    store.delete(k);
    return "expired";
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    store.delete(k);
    return "locked";
  }
  entry.attempts += 1;
  const a = Buffer.from(entry.hash, "hex");
  const b = Buffer.from(hash(code), "hex");
  if (a.length === b.length && timingSafeEqual(a, b)) {
    store.delete(k); // single use
    return "ok";
  }
  return entry.attempts >= MAX_ATTEMPTS ? "locked" : "invalid";
}

/**
 * Deliver the code by SMS. No provider is configured yet — wire MSG91,
 * Twilio, etc. here. Returns false when SMS isn't available.
 */
export async function deliverOtp(phone: string, code: string): Promise<boolean> {
  void phone;
  void code;
  return false;
}
