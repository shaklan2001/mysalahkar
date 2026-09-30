"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Wallet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  WALLET_TOP_UPS_RUPEES,
  formatRupees,
  onWalletChange,
  readBalancePaise,
} from "@/lib/wallet";
import {
  startWalletTopUp,
  WalletPaymentCancelled,
} from "@/lib/wallet-checkout";

export function ClientWallet({
  tone = "light",
  align = "right",
  block = false,
}: {
  /** "dark" for the navy sidebar. */
  tone?: "light" | "dark";
  /** Which edge the top-up panel lines up with. */
  align?: "left" | "right";
  /** Full-width trigger. */
  block?: boolean;
} = {}) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [balancePaise, setBalancePaise] = useState(0);
  const [amountRupees, setAmountRupees] =
    useState<(typeof WALLET_TOP_UPS_RUPEES)[number]>(500);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const sync = () => setBalancePaise(readBalancePaise());
    sync();
    return onWalletChange(sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function handlePay() {
    setPaying(true);
    try {
      const before = readBalancePaise();
      const next = await startWalletTopUp(amountRupees);
      setBalancePaise(next);
      toast.success(`Added ${formatRupees(next - before)} to your wallet`);
      setOpen(false);
    } catch (error) {
      if (!(error instanceof WalletPaymentCancelled)) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Could not start the payment.",
        );
      }
    } finally {
      setPaying(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={
          tone === "dark"
            ? `${block ? "flex w-full" : "inline-flex"} items-center gap-2 rounded-lg bg-white/[0.07] px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]`
            : `${block ? "flex w-full" : "inline-flex"} items-center gap-1.5 rounded-md border border-border bg-white px-2.5 py-1.5 text-sm font-semibold text-foreground hover:bg-muted`
        }
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <Wallet className="h-4 w-4" aria-hidden="true" />
        {tone === "dark" ? (
          <span className="text-xs font-medium text-slate-400">Wallet</span>
        ) : null}
        <span className={tone === "dark" ? "ml-auto" : undefined}>
          {formatRupees(balancePaise)}
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          aria-label="Wallet"
          className={`absolute ${align === "left" ? "left-0" : "right-0"} z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-white p-4 text-foreground shadow-lg`}
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Wallet
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
            {formatRupees(balancePaise)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Saved in this browser. Razorpay test mode.
          </p>

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

          <Button
            type="button"
            className="mt-4 w-full"
            disabled={paying}
            onClick={() => void handlePay()}
          >
            {paying
              ? "Opening Razorpay…"
              : `Add ${formatRupees(amountRupees * 100)}`}
          </Button>
          <p className="mt-2 text-[11px] leading-4 text-muted-foreground">
            Test card 4111 1111 1111 1111, any future expiry, any CVV.
          </p>
        </div>
      ) : null}
    </div>
  );
}
