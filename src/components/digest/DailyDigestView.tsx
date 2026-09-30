"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bookmark, ExternalLink, Newspaper, Search } from "lucide-react";
import {
  digestUpdates,
  getDigestForDate,
  globalNewsTop5,
  type DigestSource,
  type DigestUpdate,
  type GlobalNewsItem,
} from "@/lib/data/digest";
import { cn } from "@/lib/utils";

const sources: DigestSource[] = ["GST", "Income Tax", "ROC", "SEBI", "RBI", "MCA"];

const cover: Record<DigestSource, string> = {
  GST: "from-[#0c3b2e] to-[#1a9b6c]",
  "Income Tax": "from-[#001450] to-[#2454e6]",
  ROC: "from-[#2d1460] to-[#6b46e5]",
  SEBI: "from-[#6b2b08] to-[#e08a2a]",
  RBI: "from-[#10233a] to-[#3d5a73]",
  MCA: "from-[#0e2f4d] to-[#2b6cb0]",
};

const regionCover: Record<string, string> = {
  Global: "from-[#001450] to-[#003cf8]",
  US: "from-[#1c3148] to-[#3d5a80]",
  EU: "from-[#16323c] to-[#2a6f7f]",
  Asia: "from-[#0e3332] to-[#1a7a6d]",
};

type Tab = "foryou" | "trending" | "global";

const tabs: { id: Tab; label: string }[] = [
  { id: "foryou", label: "For you" },
  { id: "trending", label: "Trending" },
  { id: "global", label: "Global" },
];

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function labelDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

function readMins(text: string) {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 35));
}

function hit(text: string, query: string) {
  const q = query.trim().toLowerCase();
  return !q || text.toLowerCase().includes(q);
}

export function DailyDigestView({
  communityHref,
  compact = false,
}: {
  communityHref: string;
  compact?: boolean;
}) {
  const today = getDigestForDate();
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<DigestSource | null>(null);
  const [tab, setTab] = useState<Tab>("foryou");
  const [saved, setSaved] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);

  const india = useMemo(
    () => [...digestUpdates].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );

  function toggleSaved(id: string) {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function pickSource(next: DigestSource) {
    setSource((prev) => (prev === next ? null : next));
    setTab("foryou");
  }

  const indiaVisible = india.filter((item) => {
    if (source && item.source !== source) return false;
    if (tab === "trending" && item.quiet) return false;
    if (savedOnly && !saved.includes(item.id)) return false;
    return hit(`${item.title} ${item.summary} ${item.source}`, query);
  });

  const globalVisible = globalNewsTop5.filter((item) => {
    if (savedOnly && !saved.includes(item.id)) return false;
    return hit(`${item.title} ${item.source} ${item.region}`, query);
  });

  const lead = tab === "global" ? globalVisible.slice(0, 2) : indiaVisible.filter((item) => !item.quiet).slice(0, 2);
  const leadIds = new Set(lead.map((item) => item.id));
  const rest =
    tab === "global"
      ? globalVisible.filter((item) => !leadIds.has(item.id))
      : indiaVisible.filter((item) => !leadIds.has(item.id));

  return (
    <div className={compact ? "mx-auto max-w-6xl" : "bg-background"}>
      <div className={compact ? undefined : "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"}>
        <div className="mb-5">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Daily Digest
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            GST, Income Tax, ROC, SEBI, RBI, and MCA. Quiet days show &ldquo;No Updates for Day.&rdquo;
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-white p-4 shadow-sm sm:p-6">
          <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_17.5rem]">
            <div>
              <div className="flex items-center gap-3 rounded-2xl bg-[#001450] px-4 py-3 text-white">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10">
                  <Newspaper className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Today&apos;s brief · {labelDate(today.date)}</p>
                  <p className="truncate text-xs text-white/70">
                    {today.quiet ? "No Updates for Day" : today.title}
                  </p>
                </div>
                {today.quiet ? null : (
                  <a
                    href={today.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden shrink-0 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#001450] hover:bg-white/90 sm:inline-flex"
                  >
                    Official source
                  </a>
                )}
              </div>

              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search updates"
                  aria-label="Search updates"
                  className="h-11 w-full rounded-full border border-border bg-[#f6f8fb] pl-10 pr-12 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="button"
                  aria-pressed={savedOnly}
                  aria-label={savedOnly ? "Show all updates" : "Show saved only"}
                  onClick={() => setSavedOnly((v) => !v)}
                  className={cn(
                    "absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full",
                    savedOnly ? "bg-[#001450] text-white" : "text-muted-foreground hover:bg-white",
                  )}
                >
                  <Bookmark className={cn("h-4 w-4", savedOnly && "fill-current")} />
                </button>
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {sources.map((item) => {
                  const on = source === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={on}
                      onClick={() => pickSource(item)}
                      className={cn(
                        "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                        on ? "bg-[#001450] text-white" : "bg-[#f3f5f8] text-[#3d4d66] hover:bg-[#e7edf6]",
                      )}
                    >
                      <span className={on ? "text-white/60" : "text-accent"}># </span>
                      {item}
                    </button>
                  );
                })}
              </div>

              <div role="tablist" aria-label="Digest sections" className="mt-4 flex justify-center gap-8 border-b border-border">
                {tabs.map((item) => {
                  const on = tab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setTab(item.id)}
                      className={cn(
                        "-mb-px border-b-2 px-1 pb-3 text-sm font-medium",
                        on ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {lead.length === 0 && rest.length === 0 ? (
                <p className="px-2 py-16 text-center text-sm text-muted-foreground">
                  Nothing matches. Clear the search or a source chip.
                </p>
              ) : (
                <>
                  {lead.length > 0 ? (
                    <div className={cn("mt-5 grid gap-4", lead.length > 1 && "sm:grid-cols-2")}>
                      {tab === "global"
                        ? (lead as GlobalNewsItem[]).map((item, i) => (
                            <FeatureGlobal
                              key={item.id}
                              item={item}
                              index={i}
                              saved={saved.includes(item.id)}
                              onSave={() => toggleSaved(item.id)}
                            />
                          ))
                        : (lead as DigestUpdate[]).map((item, i) => (
                            <FeatureIndia
                              key={item.id}
                              item={item}
                              index={i}
                              saved={saved.includes(item.id)}
                              onSave={() => toggleSaved(item.id)}
                            />
                          ))}
                    </div>
                  ) : null}

                  <ul className="mt-2">
                    {tab === "global"
                      ? (rest as GlobalNewsItem[]).map((item) => (
                          <li key={item.id}>
                            <GlobalRow
                              item={item}
                              saved={saved.includes(item.id)}
                              onSave={() => toggleSaved(item.id)}
                            />
                          </li>
                        ))
                      : (rest as DigestUpdate[]).map((item) => (
                          <li key={item.id}>
                            <IndiaRow
                              item={item}
                              saved={saved.includes(item.id)}
                              onSave={() => toggleSaved(item.id)}
                            />
                          </li>
                        ))}
                  </ul>
                </>
              )}
            </div>

            <aside className="space-y-8 xl:sticky xl:top-6">
              <section>
                <h2 className="font-display text-base font-semibold tracking-tight">Curated picks</h2>
                <ul className="mt-4 space-y-4">
                  {(tab === "global" ? india.filter((item) => !item.quiet).slice(0, 4) : globalNewsTop5.slice(0, 4)).map(
                    (item) =>
                      "officialUrl" in item ? (
                        <PickIndia key={item.id} item={item} />
                      ) : (
                        <PickGlobal key={item.id} item={item} />
                      ),
                  )}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-base font-semibold tracking-tight">Categories</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sources.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => pickSource(item)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium",
                        source === item
                          ? "border-[#001450] bg-[#001450] text-white"
                          : "border-border bg-white text-foreground hover:bg-[#f6f8fb]",
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-[#f6f8fb] p-4">
                <h2 className="font-display text-sm font-semibold tracking-tight">Discuss it</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Peer threads on the same circulars, without the noise.
                </p>
                <Link
                  href={communityHref}
                  className="mt-3 inline-flex text-xs font-semibold text-accent hover:underline"
                >
                  Open Community
                </Link>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaveButton({
  saved,
  onSave,
  label,
  overlay = false,
}: {
  saved: boolean;
  onSave: () => void;
  label: string;
  overlay?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from saved` : `Save ${label}`}
      onClick={onSave}
      className={cn(
        "z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full",
        overlay
          ? "bg-white/90 text-[#001450] shadow-sm hover:bg-white"
          : "text-muted-foreground hover:bg-[#f3f5f8] hover:text-foreground",
      )}
    >
      <Bookmark className={cn("h-4 w-4", saved && "fill-[#001450] text-[#001450]")} />
    </button>
  );
}

function FeatureIndia({
  item,
  index,
  saved,
  onSave,
}: {
  item: DigestUpdate;
  index: number;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="relative">
      <a
        href={item.officialUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "relative flex min-h-72 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white",
          cover[item.source],
        )}
      >
        <span className="pointer-events-none absolute -bottom-4 -right-2 font-display text-6xl font-semibold tracking-tight text-white/10">
          {item.source}
        </span>
        <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#001450]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Trending #{index + 1} · {item.source}
        </span>
        <span className="relative mt-3 font-display text-lg font-semibold leading-snug tracking-tight">
          {item.title}
        </span>
        <span className="relative mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">{item.summary}</span>
        <span className="relative mt-3 inline-flex items-center gap-1 text-[11px] text-white/70">
          {labelDate(item.date)} · {readMins(item.summary)} min read
          <ExternalLink className="h-3 w-3" />
        </span>
      </a>
      <div className="absolute right-3 top-3">
        <SaveButton saved={saved} onSave={onSave} label={item.title} overlay />
      </div>
    </div>
  );
}

function FeatureGlobal({
  item,
  index,
  saved,
  onSave,
}: {
  item: GlobalNewsItem;
  index: number;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="relative">
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "relative flex min-h-72 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white",
          regionCover[item.region] ?? regionCover.Global,
        )}
      >
        <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#001450]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Top {index + 1} · {item.region}
        </span>
        <span className="relative mt-3 font-display text-lg font-semibold leading-snug tracking-tight">
          {item.title}
        </span>
        <span className="relative mt-3 text-[11px] text-white/70">
          {item.source}
          <ExternalLink className="ml-1 inline h-3 w-3" />
        </span>
      </a>
      <div className="absolute right-3 top-3">
        <SaveButton saved={saved} onSave={onSave} label={item.title} overlay />
      </div>
    </div>
  );
}

function IndiaRow({ item, saved, onSave }: { item: DigestUpdate; saved: boolean; onSave: () => void }) {
  return (
    <article className="flex gap-3 border-b border-border/80 py-4 last:border-0">
      <div
        className={cn(
          "grid h-16 w-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br text-[10px] font-semibold text-white",
          item.quiet ? "from-[#e7edf4] to-[#d5deea] text-[#5a6a85]" : cover[item.source],
        )}
        aria-hidden
      >
        {item.source}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted-foreground">
          {item.source} · {labelDate(item.date)}
        </p>
        {item.quiet ? (
          <p className="mt-1 text-sm italic text-muted-foreground">No Updates for Day</p>
        ) : (
          <a href={item.officialUrl} target="_blank" rel="noreferrer" className="group block">
            <h3 className="mt-1 text-sm font-semibold leading-snug text-foreground group-hover:text-accent">
              {item.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.summary}</p>
            <p className="mt-1.5 text-[11px] text-muted-foreground">{readMins(item.summary)} min read</p>
          </a>
        )}
      </div>
      {item.quiet ? null : <SaveButton saved={saved} onSave={onSave} label={item.title} />}
    </article>
  );
}

function GlobalRow({ item, saved, onSave }: { item: GlobalNewsItem; saved: boolean; onSave: () => void }) {
  return (
    <article className="flex gap-3 border-b border-border/80 py-4 last:border-0">
      <div
        className={cn(
          "h-16 w-20 shrink-0 rounded-xl bg-gradient-to-br",
          regionCover[item.region] ?? regionCover.Global,
        )}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted-foreground">
          {item.source} · {item.region}
        </p>
        <a href={item.url} target="_blank" rel="noreferrer" className="group block">
          <h3 className="mt-1 text-sm font-semibold leading-snug text-foreground group-hover:text-accent">
            {item.title}
          </h3>
        </a>
      </div>
      <SaveButton saved={saved} onSave={onSave} label={item.title} />
    </article>
  );
}

function PickIndia({ item }: { item: DigestUpdate }) {
  return (
    <li>
      <a href={item.officialUrl} target="_blank" rel="noreferrer" className="group flex gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-muted-foreground">{item.source}</p>
          <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-accent">
            {item.title}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">{labelDate(item.date)}</p>
        </div>
        <div className={cn("h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br", cover[item.source])} aria-hidden />
      </a>
    </li>
  );
}

function PickGlobal({ item }: { item: GlobalNewsItem }) {
  return (
    <li>
      <a href={item.url} target="_blank" rel="noreferrer" className="group flex gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-muted-foreground">
            {item.source} · {item.region}
          </p>
          <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-accent">
            {item.title}
          </p>
        </div>
        <div
          className={cn("h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br", regionCover[item.region] ?? regionCover.Global)}
          aria-hidden
        />
      </a>
    </li>
  );
}
