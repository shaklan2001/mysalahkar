"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  ExternalLink,
  Globe2,
  Info,
  Newspaper,
  Search,
  TrendingUp,
} from "lucide-react";
import {
  digestUpdates,
  getDigestForDate,
  globalNewsTop5,
  marketSnapshot,
  upcomingDeadlines,
  type DigestSource,
} from "@/lib/data/digest";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SOURCES: DigestSource[] = [
  "GST",
  "Income Tax",
  "ROC",
  "MCA",
  "SEBI",
  "RBI",
];

const sourceTone: Record<DigestSource, string> = {
  GST: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  "Income Tax": "bg-blue-50 text-blue-700 ring-blue-600/15",
  ROC: "bg-violet-50 text-violet-700 ring-violet-600/15",
  MCA: "bg-sky-50 text-sky-700 ring-sky-600/15",
  SEBI: "bg-amber-50 text-amber-800 ring-amber-600/20",
  RBI: "bg-slate-100 text-slate-700 ring-slate-500/15",
};

const longDate = new Intl.DateTimeFormat("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
const shortDate = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
});

function parse(iso: string) {
  return new Date(`${iso}T00:00:00`);
}

function SourcePill({ source }: { source: DigestSource }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset",
        sourceTone[source],
      )}
    >
      {source}
    </span>
  );
}

export function MarketStrip() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-2.5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-foreground">
          <TrendingUp className="h-3.5 w-3.5 text-accent" /> Markets
        </p>
        <p className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Info className="h-3 w-3" />
          {marketSnapshot.isSample
            ? "Indicative snapshot, not a live feed"
            : "Delayed quotes"}
        </p>
      </div>
      <ul className="flex divide-x divide-border/70 overflow-x-auto [scrollbar-width:none]">
        {marketSnapshot.quotes.map((quote) => {
          const up = quote.change >= 0;
          return (
            <li key={quote.id} className="min-w-[9.5rem] flex-1 px-5 py-3.5">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                {quote.label}
              </p>
              <p className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground tabular-nums">
                {quote.value}
              </p>
              <p
                className={cn(
                  "mt-0.5 inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums",
                  up ? "text-emerald-600" : "text-red-600",
                )}
              >
                {up ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {up ? "+" : ""}
                {quote.change.toFixed(2)}%
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function PublicDigest() {
  const today = getDigestForDate();
  const [tab, setTab] = useState<"india" | "global">("india");
  const [source, setSource] = useState<DigestSource | null>(null);
  const [query, setQuery] = useState("");

  const updates = useMemo(
    () => [...digestUpdates].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );
  const lead = today.quiet ? updates.find((u) => !u.quiet) : today;

  const q = query.trim().toLowerCase();
  const visible = updates.filter((item) => {
    if (item.id === lead?.id) return false;
    if (source && item.source !== source) return false;
    return (
      !q ||
      `${item.title} ${item.summary} ${item.source}`.toLowerCase().includes(q)
    );
  });
  const globalVisible = globalNewsTop5.filter(
    (item) =>
      !q ||
      `${item.title} ${item.source} ${item.region}`.toLowerCase().includes(q),
  );

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0">
        {/* Lead story */}
        {lead ? (
          <article className="relative overflow-hidden rounded-3xl bg-[#001450] p-7 text-white sm:p-9">
            <div
              className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-accent/35 blur-[100px]"
              aria-hidden
            />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 font-semibold text-blue-100 ring-1 ring-white/15">
                  <Newspaper className="h-3.5 w-3.5" />
                  {today.quiet ? "Latest update" : "Today's top update"}
                </span>
                <span className="text-slate-400">
                  {lead.source} · {longDate.format(parse(lead.date))}
                </span>
              </div>
              <h2 className="mt-5 max-w-2xl text-balance font-display text-2xl font-semibold tracking-tight sm:text-[1.9rem] sm:leading-tight">
                {lead.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                {lead.summary}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <a href={lead.officialUrl} target="_blank" rel="noreferrer">
                    Official source
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </article>
        ) : null}

        {/* Controls */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div
            className="inline-flex shrink-0 rounded-lg border border-border bg-white p-1"
            role="tablist"
          >
            {(
              [
                ["india", "India compliance"],
                ["global", "Global"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={tab === value}
                onClick={() => setTab(value)}
                className={cn(
                  "h-8 rounded-md px-3.5 text-xs font-semibold transition-colors",
                  tab === value
                    ? "bg-[#001450] text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="relative block flex-1">
            <span className="sr-only">Search updates</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search updates, e.g. GSTR-1, LODR, LRS"
              className="h-10 w-full rounded-lg border border-border bg-white pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-accent/50 focus:ring-3 focus:ring-accent/15 [&::-webkit-search-cancel-button]:appearance-none"
            />
          </label>
        </div>

        {tab === "india" ? (
          <>
            <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
              <button
                type="button"
                onClick={() => setSource(null)}
                aria-pressed={source === null}
                className={cn(
                  "h-8 shrink-0 rounded-full border px-3 text-xs font-medium",
                  source === null
                    ? "border-[#001450] bg-[#001450] text-white"
                    : "border-border bg-white text-ink-soft hover:border-accent/40",
                )}
              >
                All sources
              </button>
              {SOURCES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSource(source === item ? null : item)}
                  aria-pressed={source === item}
                  className={cn(
                    "h-8 shrink-0 rounded-full border px-3 text-xs font-medium",
                    source === item
                      ? "border-[#001450] bg-[#001450] text-white"
                      : "border-border bg-white text-ink-soft hover:border-accent/40",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>

            {visible.length ? (
              <ol className="mt-5 space-y-3">
                {visible.map((item) => (
                  <li key={item.id}>
                    {item.quiet ? (
                      <div className="flex items-center gap-4 rounded-xl border border-dashed border-border px-5 py-3.5 text-sm">
                        <span className="w-14 shrink-0 text-xs font-medium text-muted-foreground">
                          {shortDate.format(parse(item.date))}
                        </span>
                        <SourcePill source={item.source} />
                        <span className="text-muted-foreground">
                          No updates for the day
                        </span>
                      </div>
                    ) : (
                      <article className="group flex gap-5 rounded-2xl border border-border bg-white p-5 transition-colors hover:border-accent/30 sm:p-6">
                        <div className="hidden w-14 shrink-0 text-center sm:block">
                          <p className="font-display text-2xl leading-none font-semibold text-foreground">
                            {parse(item.date).getDate()}
                          </p>
                          <p className="mt-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                            {parse(item.date).toLocaleDateString("en-IN", {
                              month: "short",
                            })}
                          </p>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <SourcePill source={item.source} />
                            <span className="text-xs text-muted-foreground sm:hidden">
                              {shortDate.format(parse(item.date))}
                            </span>
                          </div>
                          <h3 className="mt-2.5 font-display text-base font-semibold tracking-tight text-foreground sm:text-[17px]">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {item.summary}
                          </p>
                          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
                            <a
                              href={item.officialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                            >
                              Official source{" "}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </article>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyState
                onReset={() => {
                  setQuery("");
                  setSource(null);
                }}
              />
            )}
          </>
        ) : globalVisible.length ? (
          <ol className="mt-5 divide-y divide-border/70 overflow-hidden rounded-2xl border border-border bg-white">
            {globalVisible.map((item, index) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[#f8f9fc] sm:px-6"
                >
                  <span className="font-display text-lg font-semibold text-border">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-accent">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.source} · {item.region}
                    </p>
                  </div>
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState onReset={() => setQuery("")} />
        )}
      </div>

      {/* Sidebar */}
      <aside className="space-y-5 lg:sticky lg:top-28">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CalendarClock className="h-4 w-4 text-accent" /> Upcoming due dates
          </h3>
          <ul className="mt-4 space-y-3.5">
            {upcomingDeadlines
              .slice()
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((deadline) => (
                <li key={deadline.id} className="flex gap-3">
                  <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border border-border bg-[#f8f9fc] leading-none">
                    <span className="font-display text-sm font-semibold text-foreground">
                      {parse(deadline.date).getDate()}
                    </span>
                    <span className="mt-0.5 text-[9px] font-medium tracking-wide text-muted-foreground uppercase">
                      {parse(deadline.date).toLocaleDateString("en-IN", {
                        month: "short",
                      })}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] leading-snug font-medium text-foreground">
                      {deadline.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {deadline.source} · {deadline.who}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
          <p className="mt-4 border-t border-border/70 pt-3 text-[11px] leading-relaxed text-muted-foreground">
            Typical statutory dates. Always confirm on the official portal.
          </p>
        </div>

        {tab === "india" ? (
          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Globe2 className="h-4 w-4 text-accent" /> Global headlines
            </h3>
            <ul className="mt-3 divide-y divide-border/70">
              {globalNewsTop5.slice(0, 3).map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block py-3 text-[13px] leading-snug text-ink-soft hover:text-accent"
                  >
                    {item.title}
                    <span className="mt-1 block text-[11px] text-muted-foreground">
                      {item.source}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setTab("global")}
              className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-accent"
            >
              All global news <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        ) : null}

      </aside>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-border bg-white px-6 py-14 text-center">
      <p className="font-display text-base font-semibold text-foreground">
        No updates match your search
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-3 text-sm font-semibold text-accent hover:underline"
      >
        Clear filters
      </button>
    </div>
  );
}
