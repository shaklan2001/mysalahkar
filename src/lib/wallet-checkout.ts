"use client";

import { creditWallet } from "@/lib/wallet";

type CheckoutResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayCheckout = { open: () => void };

declare global {
  interface Window {
    Razorpay?: new (options: {
      key: string;
      amount: number;
      currency: "INR";
      name: string;
      description: string;
      order_id: string;
      handler: (response: CheckoutResponse) => void;
      prefill?: { email?: string };
      theme?: { color?: string };
      modal?: { ondismiss?: () => void };
    }) => RazorpayCheckout;
  }
}

export class WalletPaymentCancelled extends Error {
  constructor() {
    super("Payment cancelled");
    this.name = "WalletPaymentCancelled";
  }
}

async function loadCheckout(): Promise<NonNullable<Window["Razorpay"]>> {
  if (window.Razorpay) return window.Razorpay;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay checkout failed to load."));
    document.body.appendChild(script);
  });
  if (!window.Razorpay) throw new Error("Razorpay checkout failed to load.");
  return window.Razorpay;
}

async function errorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

/** Opens Razorpay, verifies the payment, and credits the wallet. Resolves with the new balance in paise. */
export function startWalletTopUp(amountRupees: number): Promise<number> {
  return new Promise((resolve, reject) => {
    void (async () => {
      try {
        const orderRes = await fetch("/api/wallet/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amountRupees }),
        });
        if (!orderRes.ok) {
          throw new Error(await errorMessage(orderRes, "Could not start the payment."));
        }
        const order = (await orderRes.json()) as {
          orderId?: string;
          amountPaise?: number;
          keyId?: string;
        };
        if (!order.orderId || !order.amountPaise || !order.keyId) {
          throw new Error("Could not start the payment.");
        }

        const Razorpay = await loadCheckout();
        const checkout = new Razorpay({
          key: order.keyId,
          amount: order.amountPaise,
          currency: "INR",
          name: "My Salahkar",
          description: "Add money to wallet",
          order_id: order.orderId,
          prefill: { email: "client@example.com" },
          theme: { color: "#001450" },
          modal: { ondismiss: () => reject(new WalletPaymentCancelled()) },
          handler: (response) => {
            void (async () => {
              try {
                const verifyRes = await fetch("/api/wallet/verify", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    orderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                  }),
                });
                if (!verifyRes.ok) {
                  throw new Error(await errorMessage(verifyRes, "Payment could not be verified."));
                }
                const verified = (await verifyRes.json()) as { amountPaise?: number };
                if (typeof verified.amountPaise !== "number") {
                  throw new TypeError("Payment could not be verified.");
                }
                resolve(creditWallet(response.razorpay_payment_id, verified.amountPaise));
              } catch (error) {
                reject(error instanceof Error ? error : new Error("Payment could not be added."));
              }
            })();
          },
        });
        checkout.open();
      } catch (error) {
        reject(error instanceof Error ? error : new Error("Could not start the payment."));
      }
    })();
  });
}
