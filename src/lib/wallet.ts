"use client";

/**
 * Account wallet. The balance lives on the API (`GET /wallet`). This module only
 * caches that response so the header, home, and call screen stay in sync.
 */

import { useEffect, useSyncExternalStore } from "react";
import { api } from "@/lib/api";

/** Fallback until the API answers. The server list is what checkout actually allows. */
export const WALLET_TOP_UPS_RUPEES = [100, 500, 1000, 2000] as const;

export type WalletSnapshot = {
  balancePaise: number;
  topUpsRupees: number[];
  freeMinutes: number;
  rupeesPerMinute: number;
  loaded: boolean;
};

type WalletResponse = {
  balancePaise: number;
  topUpsRupees: number[];
  freeMinutes: number;
  rupeesPerMinute: number;
};

const EMPTY: WalletSnapshot = {
  balancePaise: 0,
  topUpsRupees: [...WALLET_TOP_UPS_RUPEES],
  freeMinutes: 5,
  rupeesPerMinute: 10,
  loaded: false,
};

let snapshot: WalletSnapshot = EMPTY;
const listeners = new Set<() => void>();
let inflight: Promise<WalletSnapshot> | null = null;

function emit(next: WalletSnapshot) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getWalletSnapshot(): WalletSnapshot {
  return snapshot;
}

export function readBalancePaise(): number {
  return snapshot.balancePaise;
}

/** Writes a balance the API just confirmed (after a top-up or a call tick). */
export function applyWalletBalance(balancePaise: number) {
  if (!Number.isInteger(balancePaise) || balancePaise < 0) return;
  emit({ ...snapshot, balancePaise, loaded: true });
}

export function onWalletChange(listener: () => void): () => void {
  return subscribe(listener);
}

/** Loads the signed-in user's wallet. Signed-out callers keep a zero balance. */
export function refreshWallet(): Promise<WalletSnapshot> {
  inflight ??= api<WalletResponse>("/wallet")
    .then((data) => {
      const topUps = data.topUpsRupees.filter((rupees) => Number.isInteger(rupees) && rupees > 0);
      const next: WalletSnapshot = {
        balancePaise: data.balancePaise,
        topUpsRupees: topUps.length > 0 ? topUps : [...WALLET_TOP_UPS_RUPEES],
        freeMinutes: data.freeMinutes,
        rupeesPerMinute: data.rupeesPerMinute,
        loaded: true,
      };
      emit(next);
      return next;
    })
    .catch(() => {
      emit({ ...snapshot, loaded: true });
      return snapshot;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export function formatRupees(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(paise / 100);
}

/** Balance in paise. Loads from the API once per page. */
export function useWalletBalance(): number {
  const balance = useSyncExternalStore(subscribe, readBalancePaise, () => 0);
  useEffect(() => {
    if (!snapshot.loaded) void refreshWallet();
  }, []);
  return balance;
}

export function useWalletSnapshot(): WalletSnapshot {
  const current = useSyncExternalStore(subscribe, getWalletSnapshot, () => EMPTY);
  useEffect(() => {
    if (!snapshot.loaded) void refreshWallet();
  }, []);
  return current;
}
