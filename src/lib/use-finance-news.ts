"use client";

import { useEffect, useSyncExternalStore } from "react";
import { marketSnapshot, type FinanceNewsItem, type MarketQuote } from "@/lib/data/digest";

type State = {
  status: "idle" | "loading" | "ready";
  news: FinanceNewsItem[];
  quotes: MarketQuote[];
};

const REFRESH_MS = 5 * 60 * 1000;

const INITIAL: State = { status: "idle", news: [], quotes: [] };

let state: State = INITIAL;
let fetchedAt = 0;
const listeners = new Set<() => void>();

function set(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

async function load() {
  if (state.status === "loading" || Date.now() - fetchedAt < REFRESH_MS) return;
  set({ ...state, status: "loading" });
  try {
    const res = await fetch("/api/finance-news");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { news?: FinanceNewsItem[]; quotes?: MarketQuote[] };
    const news = data.news ?? [];
    const quotes = data.quotes ?? [];
    // An empty payload means Yahoo throttled the server; don't wait out the refresh window to retry.
    if (news.length || quotes.length) fetchedAt = Date.now();
    set({ status: "ready", news, quotes });
  } catch {
    // Keep whatever we already had; try again on the next mount.
    set({ ...state, status: "ready" });
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => state;
// Must return a stable reference, or React treats every render as a change.
const getServerSnapshot = () => INITIAL;

/**
 * Indian finance news and market quotes from Yahoo Finance (via /api/finance-news).
 * `live` is false while loading or when Yahoo is unreachable, in which case `quotes` is the
 * indicative offline snapshot.
 */
export function useFinanceNews() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    void load();
  }, []);

  const live = s.quotes.length > 0;
  return {
    news: s.news,
    quotes: live ? s.quotes : marketSnapshot.quotes,
    live,
    loading: s.status !== "ready",
  };
}
