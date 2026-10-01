import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CalendarClock,
  Check,
  Languages,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { ConsultantPhoto } from "@/components/agents/ConsultantPhoto";
import { ScheduleCallDialog } from "@/components/agents/ScheduleCallDialog";
import { aiConsultantName } from "@/lib/data/agents";
import { getCatalogServicesForAgentType } from "@/lib/data/services";
import {
  aiSalahkarSlug,
  hasAiSalahkar,
  splitBio,
  type MarketplaceListing,
} from "@/lib/data/marketplace";
import { formatINR } from "@/lib/utils";

type AgentProfileViewProps = {
  agent: MarketplaceListing;
  backHref?: string;
  backLabel?: string;
  embedded?: boolean;
  /** Base path for the AI Salahkar cross-link. */
  aiBase?: string;
};

/**
 * Profile of a HUMAN professional. AI Salahkars have their own page
 * (AiSalahkarView at /ai-salahkars/[slug]) and are only cross-linked here.
 */
export function AgentProfileView({
  agent,
  backHref = "/agents?kind=human",
  backLabel = "All human professionals",
  embedded = false,
  aiBase = "/ai-salahkars",
}: AgentProfileViewProps) {
  const { personBio } = splitBio(agent);
  const withAi = hasAiSalahkar(agent);
  const aiName = aiConsultantName(agent);
  const services = agent.services.length
    ? agent.services
    : getCatalogServicesForAgentType(agent.type);
  // KPIs for the person (drop the rating tile — it's shown in the header).
  const kpis = agent.kpis.filter((kpi) => !/rating/i.test(kpi.label));

  return (
    <div
      className={
        embedded
          ? "mx-auto max-w-6xl"
          : "mx-auto max-w-6xl px-4 pt-8 pb-24 sm:px-6 lg:px-8"
      }
    >
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row">
              <ConsultantPhoto
                src={agent.image}
                alt={agent.name}
                rounded="2xl"
                className="h-28 w-28 sm:h-32 sm:w-32"
                sizes="128px"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified professional
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-ink-soft">
                    Human professional
                  </span>
                </div>
                <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2.1rem]">
                  {agent.name}
                </h1>
                <p className="mt-1 text-base text-muted-foreground">
                  {agent.typeLabel}
                </p>

                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
                  <li className="inline-flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-[#f5a524] text-[#f5a524]" />
                    <span className="font-semibold text-foreground">
                      {agent.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({agent.reviewCount} reviews)
                    </span>
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />{" "}
                    {agent.experience}+ years
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-muted-foreground" />{" "}
                    {agent.location}
                  </li>
                  {agent.languages.length ? (
                    <li className="inline-flex items-center gap-1.5">
                      <Languages className="h-4 w-4 text-muted-foreground" />{" "}
                      {agent.languages.join(", ")}
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>

            {personBio ? (
              <p className="mt-6 border-t border-border/70 pt-6 text-[15px] leading-relaxed text-ink-soft">
                {personBio}
              </p>
            ) : null}

            {kpis.length ? (
              <dl className={`mt-6 grid grid-cols-2 gap-3 ${kpis.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4"}`}>
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-xl bg-[#f8f9fc] px-4 py-3"
                  >
                    <dd className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {kpi.value}
                    </dd>
                    <dt className="mt-0.5 text-xs text-muted-foreground">
                      {kpi.label}
                    </dt>
                  </div>
                ))}
              </dl>
            ) : null}
          </section>

          {/* Expertise */}
          {agent.capabilities.length ? (
            <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                Areas of practice
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {agent.capabilities.map((capability) => (
                  <div
                    key={capability.title}
                    className="rounded-2xl border border-border/80 p-5"
                  >
                    <h3 className="font-display text-[15px] font-semibold tracking-tight text-foreground">
                      {capability.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {capability.description}
                    </p>
                  </div>
                ))}
              </div>
              {agent.specializations.length ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {agent.specializations.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-full border border-border bg-[#f8f9fc] px-3 py-1 text-xs text-ink-soft"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ) : null}

          {/* Services */}
          {services.length ? (
            <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  Services offered
                </h2>
                <Link
                  href="/services"
                  className="text-xs font-semibold text-muted-foreground hover:text-accent"
                >
                  Full catalogue
                </Link>
              </div>
              <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {services.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-2.5 text-sm text-ink-soft"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {service}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Rating */}
          <section className="flex flex-col gap-4 rounded-3xl border border-border bg-white p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex items-center gap-4">
              <p className="font-display text-5xl font-semibold tracking-tight text-foreground">
                {agent.rating}
              </p>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < Math.round(agent.rating)
                          ? "h-4 w-4 fill-[#f5a524] text-[#f5a524]"
                          : "h-4 w-4 text-border"
                      }
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  From {agent.reviewCount} client reviews
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground sm:ml-auto sm:max-w-xs sm:text-right">
              Ratings come from clients after a completed consultation.
            </p>
          </section>
        </div>

        {/* Booking rail */}
        <aside className="space-y-5 lg:sticky lg:top-28">
          <div className="rounded-3xl border border-border bg-white p-6">
            <p className="text-sm text-muted-foreground">Consultation fee</p>
            <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground">
              {formatINR(agent.consultationFee)}
              <span className="ml-1 font-sans text-sm font-normal text-muted-foreground">
                / 30 min
              </span>
            </p>

            <div className="mt-5">
              <ScheduleCallDialog
                professionalName={agent.name}
                professionalSlug={agent.slug}
                triggerLabel={`Book ${agent.name.split(" ")[0]}`}
                triggerVariant="default"
                triggerSize="lg"
                triggerClassName="w-full"
              />
            </div>

            <ul className="mt-6 space-y-3 border-t border-border/70 pt-5 text-sm text-ink-soft">
              <li className="flex items-start gap-2.5">
                <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                By appointment, in 30-minute slots
              </li>
              <li className="flex items-start gap-2.5">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                Credentials verified by My Salahkar
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                Confidential, encrypted consultation
              </li>
            </ul>
          </div>

          {withAi ? (
            <Link
              href={`${aiBase}/${aiSalahkarSlug(agent)}`}
              className="group block rounded-3xl border border-accent/20 bg-gradient-to-br from-[#eef3ff] to-white p-6 transition-colors hover:border-accent/40"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-white">
                <Sparkles className="h-3 w-3" /> AI Salahkar
              </span>
              <p className="mt-3 font-display text-lg font-semibold tracking-tight text-foreground">
                Quick question first? Ask {aiName}.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {aiName} is an AI assistant guided by {agent.name}, online 24/7
                on chat and call.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Meet {aiName}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
