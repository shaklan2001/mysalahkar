import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { fetchCapturedPayment, razorpayConfig, verifyPaymentSignature } from "@/lib/razorpay";

export const runtime = "nodejs";

const bodySchema = z
  .object({
    orderId: z.string().regex(/^order_[A-Za-z0-9]+$/),
    paymentId: z.string().regex(/^pay_[A-Za-z0-9]+$/),
    signature: z.string().regex(/^[a-f0-9]{64}$/),
  })
  .strict();

function logWallet(outcome: string, fields: Record<string, string | number>) {
  console.info(JSON.stringify({ ts: new Date().toISOString(), scope: "wallet.verify", outcome, ...fields }));
}

export async function POST(request: NextRequest) {
  const limited = checkRateLimit(request, "wallet-verify", 12, 60_000);
  if (limited) return limited;

  let parsed: z.infer<typeof bodySchema>;
  try {
    const json: unknown = await request.json();
    parsed = bodySchema.parse(json);
  } catch {
    return NextResponse.json({ error: "Payment details were invalid." }, { status: 400 });
  }

  const config = razorpayConfig();
  if (!config) {
    return NextResponse.json({ error: "Razorpay test keys are not configured." }, { status: 503 });
  }

  if (!verifyPaymentSignature(parsed.orderId, parsed.paymentId, parsed.signature, config.keySecret)) {
    logWallet("rejected", { reason: "signature" });
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  try {
    const payment = await fetchCapturedPayment(parsed.orderId, parsed.paymentId);
    logWallet("verified", { amountPaise: payment.amountPaise });
    return NextResponse.json({ ok: true, amountPaise: payment.amountPaise });
  } catch (error) {
    const name = error instanceof Error ? error.name : "";
    logWallet("failed", { reason: name || "VERIFY_FAILED" });
    if (name === "AbortError" || name === "TimeoutError") {
      return NextResponse.json({ error: "Razorpay timed out. Try again." }, { status: 504 });
    }
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  }
}
