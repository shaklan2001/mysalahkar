import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bot,
  Info,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { ConsultantPhoto } from "@/components/agents/ConsultantPhoto";
import { AiConsultActions } from "@/components/agents/AiConsultActions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { aiConsultantName } from "@/lib/data/agents";
import {
  hasHumanProfile,
  splitBio,
  type MarketplaceListing,
} from "@/lib/data/marketplace";

/**
 * Page for an AI Salahkar. Deliberately not a "profile": no fee, city or
 * reviews — those belong to the human professional who guides it.
 */
export function AiSalahkarView({
  listing,
  backHref = "/agents?kind=ai",
  backLabel = "All AI Salahkars",
  humanBase = "/agents",
  embedded = false,
}: {
  listing: MarketplaceListing;
  backHref?: string;
  backLabel?: string;
  /** Base path for the guiding professional's profile. */
  humanBase?: string;
  /** Inside a dashboard shell: no public-header offset or outer padding. */
  embedded?: boolean;
}) {
  const name = aiConsultantName(listing);
  const { aiIntro } = splitBio(listing);
  const canCall = listing.channels.includes("call");
  const withHuman = hasHumanProfile(listing);

  return (
    <>
      {/* Hero */}
      <section className={embedded ? "relative isolate -mx-4 -mt-6 overflow-hidden sm:-mx-6 lg:-mx-8 lg:-mt-8" : "relative isolate -mt-16 overflow-hidden pt-16"}>
        <div className="bg-dots mask-hero absolute inset-0 -z-10" aria-hidden />
        <div
          className="absolute top-[-16rem] left-1/2 -z-10 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,60,248,0.16),transparent)]"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-14 sm:px-6 lg:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_440px] lg:gap-14">
            <div>
              <div className="flex items-center gap-4">
                <ConsultantPhoto
                  src={listing.image}
                  alt=""
                  showAiBadge
                  rounded="2xl"
                  className="h-16 w-16"
                  sizes="64px"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
                    <Sparkles className="h-3.5 w-3.5" /> AI Salahkar
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-success ring-1 ring-border">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                    </span>
                    Online 24/7
                  </span>
                </div>
              </div>

              <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-5xl">
                {name}
              </h1>
              <p className="mt-3 text-balance text-lg text-ink-soft sm:text-xl">
                {listing.tagline}
              </p>
              {aiIntro ? (
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {aiIntro}
                </p>
              ) : null}

              <AiConsultActions
                slug={listing.slug}
                canCall={canCall}
                className="mt-8"
              />

              <p className="mt-5 inline-flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                You&apos;re talking to an AI assistant, not a live person. Its
                guidance is informational; a human professional handles signed
                advice and representation.
              </p>
            </div>

            {/* Sample conversation */}
            {listing.sampleChat.length ? (
              <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-[0_40px_80px_-40px_rgba(0,20,80,0.45)]">
                <div className="flex items-center gap-3 border-b border-border/70 px-5 py-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001450] text-white">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Sample conversation
                    </p>
                  </div>
                  <span className="flex gap-1 text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    {canCall ? <Phone className="h-4 w-4" /> : null}
                  </span>
                </div>
                <div className="space-y-3 bg-[#fbfcfe] p-5 text-[13px] leading-relaxed">
                  {listing.sampleChat.map((message, index) =>
                    message.role === "user" ? (
                      <div
                        key={index}
                        className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-[#001450] px-3.5 py-2.5 text-white"
                      >
                        {message.text}
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="max-w-[90%] rounded-2xl rounded-bl-md border border-border bg-white px-3.5 py-2.5 text-ink-soft"
                      >
                        {message.text}
                      </div>
                    ),
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className={embedded ? "mx-auto max-w-6xl space-y-20 pb-10" : "mx-auto max-w-6xl space-y-20 px-4 pb-24 sm:px-6 lg:px-8"}>
        {/* Capabilities */}
        {listing.capabilities.length ? (
          <section>
            <p className="eyebrow">What {name} helps with</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground">
              Ask about any of these, any time.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {listing.capabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="rounded-2xl border border-border bg-white p-6"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10 text-accent">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-foreground">
                    {capability.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
            {listing.specializations.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {listing.specializations.map((spec) => (
                  <li
                    key={spec}
                    className="rounded-full border border-border bg-white px-3 py-1 text-xs text-ink-soft"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ) : null}

        {/* How it works */}
        {listing.workflows.length ? (
          <section>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground">
              From question to next step.
            </h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {listing.workflows.map((step) => (
                <li
                  key={step.num}
                  className="rounded-2xl border border-border bg-white p-6"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001450] font-display text-sm font-semibold text-white">
                    {step.num}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {/* Human handover */}
        <section className="relative overflow-hidden rounded-3xl bg-[#001450] text-white">
          <div
            className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/30 blur-[110px]"
            aria-hidden
          />
          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_360px] lg:items-center lg:p-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-blue-300 uppercase">
                When a human takes over
              </p>
              <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {name} knows when to hand over.
              </h2>
              {listing.escalationNote ? (
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
                  {listing.escalationNote}
                </p>
              ) : null}
              <ul className="mt-6 space-y-2.5 text-sm text-slate-200">
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-blue-300" /> Your
                  conversation is shared, so you never repeat yourself
                </li>
                <li className="flex items-center gap-2.5">
                  <BadgeCheck className="h-4 w-4 text-blue-300" /> Handled by a
                  verified professional
                </li>
              </ul>
            </div>

            {withHuman ? (
              <Link
                href={`${humanBase}/${listing.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition-colors hover:bg-white/[0.08]"
              >
                <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-blue-200 uppercase">
                  <UserRound className="h-3.5 w-3.5" /> Guided by
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <ConsultantPhoto
                    src={listing.image}
                    alt=""
                    rounded="2xl"
                    className="h-14 w-14"
                    sizes="56px"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold tracking-tight">
                      {listing.name}
                    </p>
                    <p className="text-sm text-slate-300">
                      {listing.typeLabel}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {listing.experience}+ years · {listing.location}
                    </p>
                  </div>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white">
                  View profile & book
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ) : null}
          </div>
        </section>

        {/* FAQ */}
        {listing.faqs.length ? (
          <section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground">
                Questions about {name}.
              </h2>
              <AiConsultActions
                slug={listing.slug}
                canCall={canCall}
                size="default"
                className="mt-6"
              />
            </div>
            <Accordion type="single" collapsible defaultValue="faq-0">
              {listing.faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${index}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="py-5 font-display text-[15px] font-semibold tracking-tight text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ) : null}
      </div>
    </>
  );
}
