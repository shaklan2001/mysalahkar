"use client";

import { api, errorMessage } from "@/lib/api";
import { getSessionUser } from "@/lib/auth";
import { applyWalletBalance, refreshWallet } from "@/lib/wallet";

type CheckoutResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayCheckout = { open: () => void };

type OrderResponse = {
  orderId: string;
  amountPaise: number;
  currency: string;
  keyId: string;
};

type VerifyResponse = {
  ok: boolean;
  amountPaise: number;
  balancePaise: number;
};

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

/**
 * Opens Razorpay for a signed-in user, then asks the API to credit the wallet.
 * Resolves with the new balance in paise. The browser does not store the balance.
 */
export function startWalletTopUp(amountRupees: number): Promise<number> {
  return new Promise((resolve, reject) => {
    void (async () => {
      try {
        const order = await api<OrderResponse>("/wallet/order", {
          method: "POST",
          body: { amountRupees },
        });
        if (!order.orderId || !order.amountPaise || !order.keyId) {
          throw new Error("Could not start the payment.");
        }

        const email = getSessionUser()?.email;
        const Razorpay = await loadCheckout();
        const checkout = new Razorpay({
          key: order.keyId,
          amount: order.amountPaise,
          currency: "INR",
          name: "My Salahkar",
          description: "Add money to wallet",
          order_id: order.orderId,
          prefill: email ? { email } : undefined,
          theme: { color: "#001450" },
          modal: { ondismiss: () => reject(new WalletPaymentCancelled()) },
          handler: (response) => {
            void (async () => {
              try {
                const verified = await api<VerifyResponse>("/wallet/verify", {
                  method: "POST",
                  body: {
                    orderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                  },
                });
                if (!Number.isInteger(verified.balancePaise)) {
                  throw new Error("Payment could not be verified.");
                }
                applyWalletBalance(verified.balancePaise);
                resolve(verified.balancePaise);
              } catch (error) {
                reject(error instanceof Error ? error : new Error(errorMessage(error, "Payment could not be added.")));
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

/** Reloads the wallet after a call is billed, so open panels show the server balance. */
export function syncWalletAfterCall(balancePaise: number | null) {
  if (balancePaise !== null) applyWalletBalance(balancePaise);
  else void refreshWallet();
}
