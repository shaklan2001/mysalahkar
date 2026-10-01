import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, FileText, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    title: "Ask an AI Salahkar",
    body: "Describe your question in plain language on WhatsApp, chat or a call. Get a clear, cited answer in minutes.",
  },
  {
    num: "02",
    title: "Book a verified professional",
    body: "When it needs a signature or a second opinion, book a CA, CS or lawyer. They see your full conversation.",
  },
  {
    num: "03",
    title: "Stay compliant",
    body: "Track due dates, documents and past consults from one dashboard, with a daily digest of what changed.",
  },
];

export function ClientsSection() {
  return (
    <section id="clients" className="section-pad scroll-mt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="eyebrow">For clients</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Answers in minutes. Professionals when it matters.
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Whether you&apos;re incorporating a startup, filing returns or
            sending money abroad, start with an AI Salahkar and bring in a human
            only when you need one.
          </p>

          <ol className="mt-10 space-y-7">
            {steps.map((step) => (
              <li key={step.num} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white font-display text-sm font-semibold text-accent">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/client/signup">
                Create a free account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">Browse services</Link>
            </Button>
          </div>
        </div>

        <ClientDashboardPreview />
      </div>
    </section>
  );
}

function ClientDashboardPreview() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_70%_20%,rgba(0,60,248,0.12),transparent_60%)]"
        aria-hidden
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_30px_60px_-32px_rgba(0,20,80,0.4)]">
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
          <div>
            <p className="text-xs text-muted-foreground">Client dashboard</p>
            <p className="font-display text-base font-semibold text-foreground">Good morning, Nishant</p>
          </div>
          <span className="rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
            All filings on track
          </span>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              <CalendarDays className="h-3.5 w-3.5 text-accent" /> Next appointment
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">Soniya Gupta, CS</p>
            <p className="text-xs text-muted-foreground">Thu, 4:30 pm · Board resolution review</p>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              <FileText className="h-3.5 w-3.5 text-accent" /> Documents
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-foreground">14</p>
            <p className="text-xs text-muted-foreground">3 shared with your CA this week</p>
          </div>

          <div className="rounded-xl border border-border p-4 sm:col-span-2">
            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
              Compliance checklist · October
            </p>
            <ul className="mt-3 space-y-2.5 text-sm">
              {[
                { label: "GSTR-1 (IFF) filed", done: true },
                { label: "TDS deposited for September", done: true },
                { label: "DIR-3 KYC for both directors", done: false },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2.5">
                  <CheckCircle2
                    className={item.done ? "h-4 w-4 text-success" : "h-4 w-4 text-border"}
                  />
                  <span className={item.done ? "text-muted-foreground line-through" : "text-foreground"}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#f7f9fd] p-4 sm:col-span-2">
            <div>
              <p className="text-sm font-semibold text-foreground">How was your call with Ankit AI?</p>
              <p className="text-xs text-muted-foreground">Your review helps other clients choose.</p>
            </div>
            <div className="flex gap-0.5 text-[#f5a524]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
