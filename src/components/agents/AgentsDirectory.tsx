"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bot,
  CalendarClock,
  Check,
  Languages,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Sparkles,
  Star,
  UserRound,
  X,
} from "lucide-react";
import {
  AgentType,
  SPECIALIZATIONS,
  aiConsultantName,
} from "@/lib/data/agents";
import {
  aiSalahkarSlug,
  canScheduleHuman,
  listingToAgentShape,
  type MarketplaceListing,
} from "@/lib/data/marketplace";
import { listApprovedApplications } from "@/lib/applications-store";
import { ConsultantPhoto } from "@/components/agents/ConsultantPhoto";
import { ScheduleCallDialog } from "@/components/agents/ScheduleCallDialog";
import { useConsult } from "@/components/consult/ConsultProvider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, formatINR } from "@/lib/utils";

interface AgentsDirectoryProps {
  agents: MarketplaceListing[];
  searchParams?: {
    type?: string;
    kind?: string;
    book?: string;
  };
  profileBase?: string;
  /** Base path for AI Salahkar pages (dashboards keep users inside their shell). */
  aiBase?: string;
  /** Sticky offset for the filter bar; matches the height of the page header. */
  stickyTop?: string;
}

type View = "all" | "ai" | "human";

/**
 * One card per *kind of help*. A person who also has an AI Salahkar
 * ("both") becomes two entries — the AI and the human — so clients never
 * have to guess whether they are talking to a person.
 */
type Entry = { key: string; mode: "ai" | "human"; listing: MarketplaceListing };

const AGENT_TYPES: { value: AgentType; label: string }[] = [
  { value: "CA", label: "Chartered Accountant" },
  { value: "CS", label: "Company Secretary" },
  { value: "Lawyer", label: "Lawyer" },
  { value: "Wealth Management", label: "Wealth Management" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "IRP", label: "Insolvency & Restructuring" },
  { value: "FEMA", label: "FEMA Consultant" },
  { value: "Insurance", label: "Insurance Advisor" },
  { value: "Lending", label: "Lending Advisor" },
];

function toEntries(listings: MarketplaceListing[]): Entry[] {
  return listings.flatMap((listing) => {
    const entries: Entry[] = [];
    if (listing.listingKind === "ai" || listing.listingKind === "both") {
      entries.push({ key: `${listing.slug}:ai`, mode: "ai", listing });
    }
    if (listing.listingKind === "human" || listing.listingKind === "both") {
      entries.push({ key: `${listing.slug}:human`, mode: "human", listing });
    }
    return entries;
  });
}

function matchesSearch(entry: Entry, search: string) {
  const q = search.trim().toLowerCase();
  if (!q) return true;
  const { listing } = entry;
  const haystack = [
    listing.name,
    entry.mode === "ai" ? aiConsultantName(listing) : "",
    listing.type,
    listing.typeLabel,
    ...listing.specializations,
    AGENT_TYPES.find((t) => t.value === listing.type)?.label ?? "",
  ];
  return haystack.some((value) => value.toLowerCase().includes(q));
}

function initialView(kind?: string): View {
  return kind === "ai" || kind === "human" ? kind : "all";
}

export function AgentsDirectory({
  agents,
  searchParams,
  profileBase = "/agents",
  aiBase = "/ai-salahkars",
  stickyTop = "top-[6.25rem]",
}: AgentsDirectoryProps) {
  const [extraListings, setExtraListings] = useState<MarketplaceListing[]>([]);
  const [view, setView] = useState<View>(initialView(searchParams?.kind));
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<AgentType | "all">(
    (searchParams?.type as AgentType) || "all",
  );
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [minRating, setMinRating] = useState("0");
  const [minExperience, setMinExperience] = useState("0");

  useEffect(() => {
    const approved = listApprovedApplications().map(listingToAgentShape);
    const existing = new Set(agents.map((a) => a.slug));
    setExtraListings(approved.filter((a) => !existing.has(a.slug)));
  }, [agents]);

  // Keep ?kind= in the URL so the tab survives refresh and can be linked to.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (view === "all") url.searchParams.delete("kind");
    else url.searchParams.set("kind", view);
    window.history.replaceState(null, "", url);
  }, [view]);

  const entries = useMemo(
    () => toEntries([...agents, ...extraListings]),
    [agents, extraListings],
  );

  const availableSpecializations = useMemo(
    () => (selectedType === "all" ? [] : SPECIALIZATIONS[selectedType] || []),
    [selectedType],
  );

  const filtered = useMemo(
    () =>
      entries.filter((entry) => {
        const { listing } = entry;
        if (!matchesSearch(entry, search)) return false;
        if (selectedType !== "all" && listing.type !== selectedType)
          return false;
        if (
          selectedSpecialization !== "all" &&
          !listing.specializations.includes(selectedSpecialization)
        )
          return false;
        if (listing.rating < Number(minRating)) return false;
        if (listing.experience < Number(minExperience)) return false;
        return true;
      }),
    [
      entries,
      search,
      selectedType,
      selectedSpecialization,
      minRating,
      minExperience,
    ],
  );

  const aiEntries = filtered.filter((e) => e.mode === "ai");
  const humanEntries = filtered.filter((e) => e.mode === "human");
  const totalAi = entries.filter((e) => e.mode === "ai").length;
  const totalHuman = entries.filter((e) => e.mode === "human").length;

  const hasActiveFilters =
    search !== "" ||
    selectedType !== "all" ||
    selectedSpecialization !== "all" ||
    minRating !== "0" ||
    minExperience !== "0";

  function clearFilters() {
    setSearch("");
    setSelectedType("all");
    setSelectedSpecialization("all");
    setMinRating("0");
    setMinExperience("0");
  }

  const showAi = view !== "human";
  const showHuman = view !== "ai";
  const nothing =
    (showAi ? aiEntries.length : 0) + (showHuman ? humanEntries.length : 0) ===
    0;

  return (
    <div>
      {/* AI vs Human chooser */}
      <div
        className="grid gap-4 md:grid-cols-2"
        role="group"
        aria-label="Type of consultant"
      >
        <KindCard
          active={view === "ai"}
          onClick={() => setView(view === "ai" ? "all" : "ai")}
          tone="ai"
          icon={<Bot className="h-5 w-5" />}
          title="AI Salahkars"
          count={totalAi}
          subtitle="Instant answers, any time"
          points={[
            "Online 24/7 on chat & call",
            "Guided by a real professional",
            "AI assistant, not a live person",
          ]}
        />
        <KindCard
          active={view === "human"}
          onClick={() => setView(view === "human" ? "all" : "human")}
          tone="human"
          icon={<UserRound className="h-5 w-5" />}
          title="Human experts"
          count={totalHuman}
          subtitle="Verified professionals, by appointment"
          points={[
            "Practising CA, CS & lawyers",
            "Book a 30-minute consultation",
            "For filings, notices & sign-off",
          ]}
        />
      </div>

      {/* Toolbar */}
      <div
        className={cn(
          "sticky z-30 -mx-4 mt-8 border-b border-border/70 bg-background/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
          stickyTop,
        )}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div
            className="inline-flex shrink-0 rounded-lg border border-border bg-white p-1"
            role="tablist"
          >
            {(
              [
                ["all", "All", totalAi + totalHuman],
                ["ai", "AI Salahkars", totalAi],
                ["human", "Human experts", totalHuman],
              ] as const
            ).map(([value, label, count]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={view === value}
                onClick={() => setView(value)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-semibold whitespace-nowrap transition-colors",
                  view === value
                    ? "bg-[#001450] text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {value === "ai" ? <Sparkles className="h-3 w-3" /> : null}
                {value === "human" ? <BadgeCheck className="h-3 w-3" /> : null}
                {label}
                <span
                  className={
                    view === value
                      ? "text-white/60"
                      : "text-muted-foreground/70"
                  }
                >
                  {count}
                </span>
              </button>
            ))}
          </div>

          <label className="relative block flex-1">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or expertise, e.g. GST, FEMA"
              className="h-10 w-full rounded-lg border border-border bg-white pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-accent/50 focus:ring-3 focus:ring-accent/15 [&::-webkit-search-cancel-button]:appearance-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <Select
              value={selectedType}
              onValueChange={(value) => {
                setSelectedType(value as AgentType | "all");
                setSelectedSpecialization("all");
              }}
            >
              <SelectTrigger
                className="h-10 w-full bg-white sm:w-44"
                aria-label="Profession"
              >
                <SelectValue placeholder="All professions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All professions</SelectItem>
                {AGENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {availableSpecializations.length > 0 ? (
              <Select
                value={selectedSpecialization}
                onValueChange={setSelectedSpecialization}
              >
                <SelectTrigger
                  className="h-10 w-full bg-white sm:w-48"
                  aria-label="Specialization"
                >
                  <SelectValue placeholder="All specializations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All specializations</SelectItem>
                  {availableSpecializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}

            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger
                className="h-10 w-full bg-white sm:w-32"
                aria-label="Minimum rating"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any rating</SelectItem>
                <SelectItem value="4">4.0+ ★</SelectItem>
                <SelectItem value="4.5">4.5+ ★</SelectItem>
                <SelectItem value="4.8">4.8+ ★</SelectItem>
              </SelectContent>
            </Select>

            <Select value={minExperience} onValueChange={setMinExperience}>
              <SelectTrigger
                className="h-10 w-full bg-white sm:w-36"
                aria-label="Minimum experience"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any experience</SelectItem>
                <SelectItem value="5">5+ years</SelectItem>
                <SelectItem value="10">10+ years</SelectItem>
                <SelectItem value="15">15+ years</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters ? (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="h-10 px-3 text-xs text-muted-foreground"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {nothing ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-foreground">
            No consultants match these filters
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Try a broader search, or switch between AI Salahkars and human
            experts.
          </p>
          <Button
            onClick={() => {
              clearFilters();
              setView("all");
            }}
            variant="outline"
            size="sm"
            className="mt-5"
          >
            Reset filters
          </Button>
        </div>
      ) : null}

      {showAi && aiEntries.length > 0 ? (
        <section className="mt-10" aria-labelledby="ai-heading">
          <GroupHeading
            id="ai-heading"
            tone="ai"
            title="AI Salahkars"
            count={aiEntries.length}
            note="AI assistants trained on professional domains and guided by the professional named on each card. Always labelled AI."
          />
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {aiEntries.map((entry) => (
              <AiCard
                key={entry.key}
                listing={entry.listing}
                profileBase={profileBase}
                aiBase={aiBase}
              />
            ))}
          </div>
        </section>
      ) : null}

      {showHuman && humanEntries.length > 0 ? (
        <section className="mt-14" aria-labelledby="human-heading">
          <GroupHeading
            id="human-heading"
            tone="human"
            title="Human experts"
            count={humanEntries.length}
            note="Real, verified professionals. Consultations are booked in 30-minute slots."
          />
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {humanEntries.map((entry) => (
              <HumanCard
                key={entry.key}
                listing={entry.listing}
                profileBase={profileBase}
                openBooking={searchParams?.book === entry.listing.slug}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function KindCard({
  active,
  onClick,
  tone,
  icon,
  title,
  count,
  subtitle,
  points,
}: {
  active: boolean;
  onClick: () => void;
  tone: "ai" | "human";
  icon: React.ReactNode;
  title: string;
  count: number;
  subtitle: string;
  points: string[];
}) {
  const ai = tone === "ai";
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-6 text-left transition-all",
        ai ? "bg-gradient-to-br from-[#eef3ff] to-white" : "bg-white",
        active
          ? ai
            ? "border-accent shadow-[0_0_0_3px_rgba(0,60,248,0.12)]"
            : "border-[#001450] shadow-[0_0_0_3px_rgba(0,20,80,0.1)]"
          : "border-border hover:border-accent/35",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              ai ? "bg-accent text-white" : "bg-[#001450] text-white",
            )}
          >
            {icon}
          </span>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              {title}{" "}
              <span className="font-sans text-sm font-medium text-muted-foreground">
                ({count})
              </span>
            </p>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
            active
              ? ai
                ? "border-accent bg-accent text-white"
                : "border-[#001450] bg-[#001450] text-white"
              : "border-border bg-white text-transparent",
          )}
          aria-hidden
        >
          <Check className="h-3 w-3" />
        </span>
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-soft">
        {points.map((point) => (
          <li key={point} className="inline-flex items-center gap-1.5">
            <Check
              className={cn("h-3.5 w-3.5", ai ? "text-accent" : "text-success")}
            />
            {point}
          </li>
        ))}
      </ul>
    </button>
  );
}

function GroupHeading({
  id,
  tone,
  title,
  count,
  note,
}: {
  id: string;
  tone: "ai" | "human";
  title: string;
  count: number;
  note: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg",
            tone === "ai"
              ? "bg-brand-blue/10 text-accent"
              : "bg-[#001450]/8 text-[#001450]",
          )}
        >
          {tone === "ai" ? (
            <Sparkles className="h-3.5 w-3.5" />
          ) : (
            <BadgeCheck className="h-3.5 w-3.5" />
          )}
        </span>
        <h2
          id={id}
          className="font-display text-xl font-semibold tracking-tight text-foreground"
        >
          {title}
        </h2>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {count}
        </span>
      </div>
      <p className="max-w-md text-sm text-muted-foreground sm:text-right">
        {note}
      </p>
    </div>
  );
}

function AiCard({
  listing,
  profileBase,
  aiBase,
}: {
  listing: MarketplaceListing;
  profileBase: string;
  aiBase: string;
}) {
  const { openConsult } = useConsult();
  const name = aiConsultantName(listing);
  const canCall = listing.channels.includes("call");

  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border border-accent/20 bg-white">
      <div
        className="h-1 bg-gradient-to-r from-[#003cf8] to-[#6f93ff]"
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-4">
          <ConsultantPhoto
            src={listing.image}
            alt=""
            showAiBadge
            rounded="2xl"
            className="h-14 w-14"
            sizes="56px"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`${aiBase}/${aiSalahkarSlug(listing)}`}
                className="font-display text-lg font-semibold tracking-tight text-foreground hover:text-accent"
              >
                {name}
              </Link>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                <Sparkles className="h-3 w-3" /> AI Salahkar
              </span>
            </div>
            <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-success">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Online 24/7
            </p>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {listing.tagline || listing.bio}
        </p>

        {listing.specializations.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {listing.specializations.slice(0, 3).map((spec) => (
              <li
                key={spec}
                className="rounded-md border border-border bg-[#f8f9fc] px-2 py-0.5 text-[11px] text-ink-soft"
              >
                {spec}
              </li>
            ))}
            {listing.specializations.length > 3 ? (
              <li className="px-1 py-0.5 text-[11px] text-muted-foreground">
                +{listing.specializations.length - 3}
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#f8f9fc] px-3 py-2 text-xs text-muted-foreground">
          <UserRound className="h-3.5 w-3.5 shrink-0" />
          <span className="min-w-0 truncate">
            Guided by{" "}
            <Link
              href={`${profileBase}/${listing.slug}`}
              className="font-medium text-foreground hover:text-accent hover:underline"
            >
              {listing.name}
            </Link>
            {listing.typeLabel ? `, ${listing.typeLabel}` : ""}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <Button
            size="sm"
            variant="accent"
            onClick={() => openConsult(listing.slug, "chat")}
          >
            <MessageSquare />
            Chat now
          </Button>
          {canCall ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => openConsult(listing.slug, "call")}
            >
              <Phone />
              Voice call
            </Button>
          ) : null}
          <Link
            href={`${aiBase}/${aiSalahkarSlug(listing)}`}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-accent"
          >
            About
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function HumanCard({
  listing,
  profileBase,
  openBooking,
}: {
  listing: MarketplaceListing;
  profileBase: string;
  openBooking: boolean;
}) {
  const { openConsult } = useConsult();
  const hasAiTwin = listing.listingKind === "both";
  // Professionals with an AI twin are reachable in person by appointment only.
  const availability = hasAiTwin ? "By appointment" : listing.availability;

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(0,20,80,0.4)]">
      <div className="flex items-start gap-4">
        <ConsultantPhoto
          src={listing.image}
          alt=""
          rounded="2xl"
          className="h-16 w-16"
          sizes="64px"
        />
        <div className="min-w-0 flex-1">
          <Link
            href={`${profileBase}/${listing.slug}`}
            className="font-display text-base leading-snug font-semibold tracking-tight text-foreground hover:text-accent"
          >
            {listing.name}
          </Link>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
            {listing.typeLabel}
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
            <BadgeCheck className="h-3 w-3" /> Verified
          </span>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-3 divide-x divide-border rounded-xl border border-border text-center">
        <div className="px-2 py-2.5">
          <dt className="text-[10px] tracking-wide text-muted-foreground uppercase">
            Rating
          </dt>
          <dd className="mt-0.5 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
            <Star className="h-3 w-3 fill-[#f5a524] text-[#f5a524]" />
            {listing.rating}
          </dd>
        </div>
        <div className="px-2 py-2.5">
          <dt className="text-[10px] tracking-wide text-muted-foreground uppercase">
            Experience
          </dt>
          <dd className="mt-0.5 text-sm font-semibold text-foreground">
            {listing.experience} yrs
          </dd>
        </div>
        <div className="px-2 py-2.5">
          <dt className="text-[10px] tracking-wide text-muted-foreground uppercase">
            30 min
          </dt>
          <dd className="mt-0.5 text-sm font-semibold text-foreground">
            {formatINR(listing.consultationFee)}
          </dd>
        </div>
      </dl>

      <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0" /> {listing.location}
        </li>
        <li className="flex items-center gap-2">
          <CalendarClock className="h-3.5 w-3.5 shrink-0" /> {availability}
        </li>
        {listing.languages.length ? (
          <li className="flex items-center gap-2">
            <Languages className="h-3.5 w-3.5 shrink-0" />{" "}
            {listing.languages.join(", ")}
          </li>
        ) : null}
      </ul>

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap gap-2">
          {canScheduleHuman(listing) ? (
            <ScheduleCallDialog
              professionalName={listing.name}
              professionalSlug={listing.slug}
              triggerLabel="Book consultation"
              triggerVariant="default"
              triggerClassName="flex-1"
              initialOpen={openBooking}
            />
          ) : null}
          <Button asChild size="sm" variant="outline">
            <Link href={`${profileBase}/${listing.slug}`}>Profile</Link>
          </Button>
        </div>
        {hasAiTwin ? (
          <button
            type="button"
            onClick={() => openConsult(listing.slug, "chat")}
            className="group mt-3 flex w-full items-center justify-between gap-2 rounded-lg border border-dashed border-accent/30 bg-brand-blue/[0.04] px-3 py-2 text-left text-xs text-ink-soft transition-colors hover:border-accent/50"
          >
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Quick question? Ask{" "}
              <span className="font-semibold text-accent">
                {aiConsultantName(listing)}
              </span>{" "}
              first
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
          </button>
        ) : null}
      </div>
    </article>
  );
}
