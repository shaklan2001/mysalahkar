import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { createRazorpayOrder, razorpayConfig } from "@/lib/razorpay";
import { paiseForTopUp } from "@/lib/wallet";

export const runtime = "nodejs";

const bodySchema = z
  .object({
    amountRupees: z.number().int(),
  })
  .strict();

function logWallet(outcome: string, fields: Record<string, string | number>) {
  console.info(JSON.stringify({ ts: new Date().toISOString(), scope: "wallet.order", outcome, ...fields }));
}

export async function POST(request: NextRequest) {
  const limited = checkRateLimit(request, "wallet-order", 8, 60_000);
  if (limited) return limited;

  let amountRupees: number;
  try {
    const json: unknown = await request.json();
    amountRupees = bodySchema.parse(json).amountRupees;
  } catch {
    return NextResponse.json({ error: "Choose a valid top-up amount." }, { status: 400 });
  }

  const amountPaise = paiseForTopUp(amountRupees);
  if (amountPaise === null) {
    return NextResponse.json({ error: "Choose a valid top-up amount." }, { status: 400 });
  }

  const config = razorpayConfig();
  if (!config) {
    return NextResponse.json(
      { error: "Razorpay test keys are not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
      { status: 503 },
    );
  }

  try {
    const order = await createRazorpayOrder(amountPaise);
    logWallet("created", { amountPaise });
    return NextResponse.json({
      orderId: order.id,
      amountPaise: order.amount,
      currency: order.currency,
      keyId: config.keyId,
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "ORDER_FAILED";
    const name = error instanceof Error ? error.name : "";
    logWallet("failed", { reason: name || reason });
    if (reason === "BAD_KEYS") {
      return NextResponse.json({ error: "Razorpay test keys were rejected." }, { status: 503 });
    }
    if (name === "AbortError" || name === "TimeoutError") {
      return NextResponse.json({ error: "Razorpay timed out. Try again." }, { status: 504 });
    }
    return NextResponse.json({ error: "Could not start the payment." }, { status: 502 });
  }
}
