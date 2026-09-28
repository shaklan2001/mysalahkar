import crypto from "node:crypto";
import { paiseForTopUp } from "@/lib/wallet";

const RAZORPAY_API = "https://api.razorpay.com/v1";
const TIMEOUT_MS = 15_000;

type RazorpayConfig = { keyId: string; keySecret: string };

type RazorpayOrder = { id: string; amount: number; currency: string };

type RazorpayPayment = {
  id?: string;
  amount?: number;
  currency?: string;
  status?: string;
  order_id?: string;
};

export function razorpayConfig(): RazorpayConfig | null {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim() ?? "";
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim() ?? "";
  if (!keyId || !keySecret) return null;
  return { keyId, keySecret };
}

function authHeader(config: RazorpayConfig): string {
  const token = Buffer.from(`${config.keyId}:${config.keySecret}`).toString("base64");
  return `Basic ${token}`;
}

async function razorpayFetch(path: string, init: RequestInit): Promise<Response> {
  const config = razorpayConfig();
  if (!config) throw new Error("MISSING_KEYS");
  return fetch(`${RAZORPAY_API}${path}`, {
    ...init,
    headers: {
      Authorization: authHeader(config),
      "Content-Type": "application/json",
      ...init.headers,
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

export async function createRazorpayOrder(amountPaise: number): Promise<RazorpayOrder> {
  const receipt = `w_${crypto.randomUUID().replaceAll("-", "")}`;
  const res = await razorpayFetch("/orders", {
    method: "POST",
    body: JSON.stringify({ amount: amountPaise, currency: "INR", receipt }),
  });
  if (!res.ok) {
    throw new Error(res.status === 401 ? "BAD_KEYS" : "ORDER_FAILED");
  }
  const data = (await res.json()) as Partial<RazorpayOrder>;
  if (!data.id?.startsWith("order_") || data.amount !== amountPaise || data.currency !== "INR") {
    throw new Error("ORDER_FAILED");
  }
  return { id: data.id, amount: data.amount, currency: data.currency };
}

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string,
): boolean {
  const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function fetchCapturedPayment(
  orderId: string,
  paymentId: string,
): Promise<{ amountPaise: number }> {
  const res = await razorpayFetch(`/payments/${paymentId}`, { method: "GET" });
  if (!res.ok) throw new Error("VERIFY_FAILED");
  const payment = (await res.json()) as RazorpayPayment;
  const amount = typeof payment.amount === "number" ? payment.amount : Number(payment.amount);
  const paid =
    typeof amount === "number" &&
    Number.isInteger(amount) &&
    paiseForTopUp(amount / 100) === amount;
  const settled = payment.status === "captured" || payment.status === "authorized";
  if (!paid || !settled || payment.currency !== "INR" || payment.order_id !== orderId) {
    throw new Error("VERIFY_FAILED");
  }
  return { amountPaise: amount };
}

function selfCheck(): void {
  const secret = crypto.randomBytes(16).toString("hex");
  const good = crypto.createHmac("sha256", secret).update("order_x|pay_y").digest("hex");
  if (!verifyPaymentSignature("order_x", "pay_y", good, secret)) {
    throw new Error("wallet signature check failed");
  }
  const flipped = `${good.slice(0, -1)}${good.endsWith("0") ? "1" : "0"}`;
  if (verifyPaymentSignature("order_x", "pay_y", flipped, secret)) {
    throw new Error("wallet signature accepted a bad value");
  }
}

selfCheck();
