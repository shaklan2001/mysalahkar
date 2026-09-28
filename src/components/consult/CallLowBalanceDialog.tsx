"use client";

import { useId, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatClock } from "@/lib/call-meter";
import { WALLET_TOP_UPS_RUPEES, formatRupees } from "@/lib/wallet";
import { startWalletTopUp, WalletPaymentCancelled } from "@/lib/wallet-checkout";

type CallLowBalanceDialogProps = {
  secondsRemaining: number;
  balancePaise: number;
  rupeesPerMinute: number;
  onPaid: () => void;
  onEnd: () => void;
  onPayingChange: (paying: boolean) => void;
};

export function CallLowBalanceDialog({
  secondsRemaining,
  balancePaise,
  rupeesPerMinute,
  onPaid,
  onEnd,
  onPayingChange,
}: CallLowBalanceDialogProps) {
  const titleId = useId();
  const [amountRupees, setAmountRupees] = useState<(typeof WALLET_TOP_UPS_RUPEES)[number]>(100);
  const [paying, setPaying] = useState(false);

  async function handlePay() {
    setPaying(true);
    onPayingChange(true);
    try {
      await startWalletTopUp(amountRupees);
      toast.success("Money added. The call will continue.");
      onPaid();
    } catch (error) {
      if (!(error instanceof WalletPaymentCancelled)) {
        toast.error(error instanceof Error ? error.message : "Could not add money.");
      }
    } finally {
      setPaying(false);
      onPayingChange(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl"
      >
        <h2 id={titleId} className="text-lg font-semibold text-slate-900">
          Add money to keep talking
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {formatClock(secondsRemaining)} left. After that this call ends unless your wallet covers{" "}
          {formatRupees(rupeesPerMinute * 100)} per minute.
        </p>
        <p className="mt-3 text-sm font-medium text-slate-800">Wallet {formatRupees(balancePaise)}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {WALLET_TOP_UPS_RUPEES.map((rupees) => {
            const selected = rupees === amountRupees;
            return (
              <button
                key={rupees}
                type="button"
                aria-pressed={selected}
                className={
                  selected
                    ? "rounded-md bg-[#001450] px-3 py-2 text-sm font-semibold text-white"
                    : "rounded-md border border-border px-3 py-2 text-sm font-semibold hover:bg-muted"
                }
                onClick={() => setAmountRupees(rupees)}
              >
                {formatRupees(rupees * 100)}
              </button>
            );
          })}
        </div>

        <Button type="button" className="mt-4 w-full" disabled={paying} onClick={() => void handlePay()}>
          {paying ? "Opening Razorpay…" : `Add ${formatRupees(amountRupees * 100)}`}
        </Button>
        <button
          type="button"
          className="mt-3 w-full text-sm text-slate-500 hover:text-slate-800"
          onClick={onEnd}
        >
          End call
        </button>
      </div>
    </div>
  );
}
