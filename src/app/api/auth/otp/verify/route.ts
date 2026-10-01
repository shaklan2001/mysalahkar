import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  normalizeIndianMobile,
  verifyOtp,
  type OtpRole,
} from "@/lib/otp-store";

const messages = {
  invalid: "That code isn't right. Check the SMS and try again.",
  expired: "This code has expired. Request a new one.",
  locked: "Too many wrong attempts. Request a new code.",
} as const;

export async function POST(req: NextRequest) {
  const limited = checkRateLimit(req, "otp-verify", 20, 10 * 60 * 1000);
  if (limited) return limited;

  const body = (await req.json().catch(() => null)) as {
    phone?: unknown;
    role?: unknown;
    code?: unknown;
  } | null;
  const role: OtpRole | null =
    body?.role === "client" || body?.role === "professional" ? body.role : null;
  const phone =
    typeof body?.phone === "string" ? normalizeIndianMobile(body.phone) : null;
  const code =
    typeof body?.code === "string" && /^\d{6}$/.test(body.code)
      ? body.code
      : null;
  if (!role || !phone || !code) {
    return NextResponse.json(
      { error: "Enter the 6-digit code." },
      { status: 400 },
    );
  }

  const result = verifyOtp(role, phone, code);
  if (result !== "ok") {
    return NextResponse.json(
      { error: messages[result] },
      { status: result === "invalid" ? 401 : 410 },
    );
  }
  return NextResponse.json({ ok: true, phone });
}
