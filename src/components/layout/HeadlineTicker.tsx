"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { getTickerItems } from "@/lib/data/digest";
import { useFinanceNews } from "@/lib/use-finance-news";
import { cn } from "@/lib/utils";

type TickerItem =
  | { kind: "markets-tag"; id: string }
  | { kind: "quote"; id: string; label: string; value: string; change: number }
  | { kind: "headline"; id: string; tag: string; title: string };

function buildItems(quotes: ReturnType<typeof useFinanceNews>["quotes"], news: ReturnType<typeof useFinanceNews>["news"]): TickerItem[] {
  // Markets first (same quotes as the Daily Digest strip), then compliance updates, then Yahoo Finance headlines.
  return [
    { kind: "markets-tag", id: "markets" },
    ...quotes.map((quote) => ({ kind: "quote" as const, ...quote })),
    ...getTickerItems()
      .filter((item) => !item.quiet)
      .map((item) => ({ kind: "headline" as const, id: item.id, tag: item.source, title: item.title })),
    ...news.slice(0, 8).map((item) => ({ kind: "headline" as const, id: item.id, tag: item.topic, title: item.title })),
  ];
}

function Item({ item, marketsNote }: { item: TickerItem; marketsNote: string }) {
  if (item.kind === "markets-tag") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-blue-100 uppercase"
        title={marketsNote}
      >
        <TrendingUp className="h-3 w-3" /> Markets
      </span>
    );
  }
  if (item.kind === "quote") {
    const up = item.change >= 0;
    return (
      <>
        <span className="font-semibold text-slate-300">{item.label}</span>
        <span className="font-semibold text-white tabular-nums">{item.value}</span>
        <span className={cn("font-semibold tabular-nums", up ? "text-emerald-400" : "text-red-400")}>
          {up ? "▲" : "▼"} {up ? "+" : ""}
          {item.change.toFixed(2)}%
        </span>
      </>
    );
  }
  return (
    <>
      <span className="font-semibold text-blue-300">{item.tag}</span>
      {item.title}
    </>
  );
}

/** Running markets + headline strip shown under the sticky navbar once the page scrolls. */
export function HeadlineTicker() {
  const { quotes, news, live } = useFinanceNews();
  const items = useMemo(() => buildItems(quotes, news), [quotes, news]);
  const marketsNote = live ? "Delayed quotes · Yahoo Finance" : "Indicative snapshot, not a live feed";
  // Rendered twice so the -50% marquee loop is seamless.
  const loop = [...items, ...items];

  return (
    <div className="flex h-9 items-center border-b border-border/70 bg-[#001450] text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/daily-digest"
          className="relative z-10 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Live digest
        </Link>

        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_4%,#000_96%,transparent)]">
          <ul
            className="digest-marquee flex w-max items-center gap-6 whitespace-nowrap hover:[animation-play-state:paused]"
            // Longer loop now that markets are included — keep a readable speed.
            style={{ animationDuration: "75s" }}
          >
            {loop.map((item, index) => (
              <li key={`${item.id}-${index}`} aria-hidden={index >= items.length || undefined}>
                <Link
                  href="/daily-digest"
                  tabIndex={index >= items.length ? -1 : undefined}
                  className="inline-flex items-center gap-2 text-xs text-slate-200 transition-colors hover:text-white"
                >
                  <Item item={item} marketsNote={marketsNote} />
                  {item.kind === "markets-tag" ? null : (
                    <span className="text-slate-600" aria-hidden>
                      •
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/daily-digest"
          className="hidden shrink-0 items-center gap-1 text-[11px] font-semibold text-blue-200 hover:text-white sm:inline-flex"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
