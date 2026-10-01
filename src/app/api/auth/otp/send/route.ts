import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  deliverOtp,
  issueOtp,
  normalizeIndianMobile,
  type OtpRole,
} from "@/lib/otp-store";

const isDev = process.env.NODE_ENV !== "production";

export async function POST(req: NextRequest) {
  const limited = checkRateLimit(req, "otp-send", 5, 10 * 60 * 1000);
  if (limited) return limited;

  const body = (await req.json().catch(() => null)) as {
    phone?: unknown;
    role?: unknown;
  } | null;
  const role: OtpRole | null =
    body?.role === "client" || body?.role === "professional" ? body.role : null;
  const phone =
    typeof body?.phone === "string" ? normalizeIndianMobile(body.phone) : null;
  if (!role || !phone) {
    return NextResponse.json(
      { error: "Enter a valid 10-digit Indian mobile number." },
      { status: 400 },
    );
  }

  const issued = issueOtp(role, phone);
  if ("retryAfter" in issued) {
    return NextResponse.json(
      {
        error: `Please wait ${issued.retryAfter}s before requesting a new code.`,
        retryAfter: issued.retryAfter,
      },
      { status: 429 },
    );
  }

  const sent = await deliverOtp(phone, issued.code);
  if (!sent && !isDev) {
    return NextResponse.json(
      { error: "Phone login isn't available yet. Please sign in with email." },
      { status: 503 },
    );
  }

  // Development only: no SMS provider is wired, so hand the code back for testing.
  return NextResponse.json({
    ok: true,
    ...(sent ? {} : { devCode: issued.code }),
  });
}
