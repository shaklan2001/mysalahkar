"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";

const stats = [
  { value: "17+", label: "AI specialist Salahkars" },
  { value: "137", label: "Professional services" },
  { value: "24/7", label: "Consultation access" },
  { value: "3", label: "Ways to consult" },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function HomeHero() {
  const { openConsult } = useConsult();

  return (
    <section className="relative isolate -mt-16 overflow-hidden pt-16">
      <div className="bg-dots mask-hero absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute top-[-18rem] left-1/2 -z-10 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,60,248,0.14),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-6 sm:px-6 md:pt-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <Link
              href="/daily-digest"
              className="beam-border inline-flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-xs font-medium text-ink-soft transition-colors hover:text-foreground"
            >
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
                New
              </span>
              Daily compliance digest
              <span className="-ml-1 hidden sm:inline">for GST, ROC, SEBI &amp; RBI</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-7 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem]"
          >
            Expert CA, CS &amp; legal advice,{" "}
            <span className="bg-gradient-to-r from-[#003cf8] to-[#4f7bff] bg-clip-text text-transparent">
              on demand.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg"
          >
            My Salahkar pairs always-on AI Salahkars with verified professionals.
            Clients get clear answers in minutes, and professionals get a practice
            that brings the work to them.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" variant="accent" className="w-full sm:w-auto" onClick={() => openConsult()}>
              Start a consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/professionals/signup">I&apos;m a professional</Link>
            </Button>
          </motion.div>

          <motion.ul
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <li className="inline-flex items-center gap-1.5">
              <Smartphone className="h-4 w-4 text-accent" /> WhatsApp
            </li>
            <li className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-accent" /> Chat
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-accent" /> Voice call
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" /> Confidential by default
            </li>
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div
            className="absolute -inset-x-10 -top-10 -bottom-4 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(0,60,248,0.16),transparent_70%)] blur-2xl"
            aria-hidden
          />
          <ProductPreview />
        </motion.div>

        <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-y-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse text-center">
              <dt className="mt-1 text-[13px] text-muted-foreground">{stat.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Static, illustrative preview of the client workspace. */
function ProductPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_40px_80px_-40px_rgba(0,20,80,0.45)] ring-1 ring-black/[0.02]">
      <div className="flex items-center gap-2 border-b border-border/80 bg-[#f8f9fc] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto hidden rounded-md border border-border bg-white px-16 py-0.5 text-[11px] text-muted-foreground sm:block">
          mysalahkar.com/consult
        </span>
      </div>

      <div className="grid text-left md:grid-cols-[1fr_280px]">
        {/* Conversation */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#001450] text-xs font-bold text-white">
                AI
                <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-success" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Ankit AI</p>
                <p className="text-[11px] text-muted-foreground">Online 24/7 · Income tax &amp; GST</p>
              </div>
            </div>
            <span className="hidden items-center gap-1 rounded-full bg-brand-blue/10 px-2.5 py-1 text-[11px] font-medium text-accent sm:inline-flex">
              <Sparkles className="h-3 w-3" /> AI Salahkar
            </span>
          </div>

          <div className="flex-1 space-y-3 bg-[#fbfcfe] px-5 py-5 text-[13px] leading-relaxed">
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#001450] px-3.5 py-2.5 text-white">
              Our turnover is under ₹1.5 Cr. Do we still file GSTR-1 every month?
            </div>
            <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-border bg-white px-3.5 py-2.5 text-ink-soft">
              If you&apos;re on QRMP, GSTR-1 is quarterly. You can still use the
              Invoice Furnishing Facility (IFF) monthly for B2B invoices, so your
              buyers can claim ITC on time.
            </div>
            <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-border bg-white px-3.5 py-2.5 text-ink-soft">
              I&apos;ve added this quarter&apos;s due dates to your calendar. Want
              Ankit Gupta, CA to review your last return?
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-border/70 px-4 py-3">
            <div className="h-9 flex-1 rounded-lg border border-border bg-muted/40 px-3 text-[13px] leading-9 text-muted-foreground">
              Ask about GST, ITR, ROC…
            </div>
            <span className="inline-flex h-9 items-center rounded-lg bg-accent px-3.5 text-[13px] font-semibold text-white">
              Send
            </span>
          </div>
        </div>

        {/* Context rail */}
        <aside className="hidden space-y-3 border-l border-border/70 bg-white p-4 md:block">
          <div className="rounded-xl border border-border p-3.5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              <BadgeCheck className="h-3.5 w-3.5 text-accent" /> Escalate to a human
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">Ankit Gupta, CA</p>
            <p className="text-xs text-muted-foreground">Verified · 15 yrs · Delhi</p>
            <span className="mt-3 flex h-8 items-center justify-center rounded-lg bg-[#001450] text-xs font-semibold text-white">
              Book 30 min · ₹1,000
            </span>
          </div>

          <div className="rounded-xl border border-border p-3.5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              <CalendarClock className="h-3.5 w-3.5 text-accent" /> Upcoming due dates
            </p>
            <ul className="mt-2.5 space-y-2 text-xs">
              {[
                ["IFF (B2B invoices)", "13 Oct"],
                ["GSTR-3B · QRMP", "22 Oct"],
                ["TDS return · Q2", "31 Oct"],
              ].map(([label, date]) => (
                <li key={label} className="flex items-center justify-between">
                  <span className="text-ink-soft">{label}</span>
                  <span className="rounded bg-muted px-1.5 py-0.5 font-medium text-foreground">{date}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border p-3.5">
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                <Wallet className="h-3.5 w-3.5 text-accent" /> Wallet
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-foreground">₹2,450</p>
            </div>
            <span className="rounded-md border border-border px-2 py-1 text-[11px] font-medium text-ink-soft">
              Top up
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
