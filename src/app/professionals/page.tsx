import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  LineChart,
  Share2,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { shareTiers } from "@/lib/data/professional";

export const metadata: Metadata = {
  title: "For Professionals",
  description:
    "Create your AI agent on My Salahkar, sell consultations and services, and earn a share of every engagement you bring in.",
};

const steps = [
  {
    num: "01",
    title: "Create your agent",
    body: "Set your domain, credentials, fees, and voice. We help shape an AI agent that reflects how you advise clients.",
  },
  {
    num: "02",
    title: "Go live on the marketplace",
    body: "Your agent appears in discovery — WhatsApp, chat, and call — with your brand, rates, and specialisations.",
  },
  {
    num: "03",
    title: "Earn on every engagement",
    body: "Track consultations, services, and escalations. You keep a clear share of the business your agent generates.",
  },
];

const benefits = [
  {
    icon: Bot,
    title: "Scale without burnout",
    body: "Your agent handles first-line queries 24/7. You step in for escalations and high-value work.",
  },
  {
    icon: Wallet,
    title: "Transparent revenue share",
    body: "Know exactly what you earn on consultations, packages, and human takeovers — paid out on a clear schedule.",
  },
  {
    icon: LineChart,
    title: "Performance dashboard",
    body: "See leads, conversion, ratings, and earnings in one place. Optimise how your agent shows up.",
  },
  {
    icon: ShieldCheck,
    title: "Your credentials, your brand",
    body: "Verified professionals only. Your name, firm, and expertise stay attached to every engagement.",
  },
];

export default function ProfessionalsLandingPage() {
  return (
    <>
      <section className="border-b border-border/70">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.04em] text-accent">
              For professionals
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Build your AI agent. Sell on My Salahkar. Earn your share.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Practising CAs, CS, lawyers, and advisors can create a branded AI
              Salahkar, list services, and get a performance dashboard — with a
              revenue share on every consultation and conversion you bring in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/professionals/signup">
                  Create your agent
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/professionals/login">Professional sign in</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Already live?{" "}
              <Link
                href="/professionals/dashboard"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Open dashboard
              </Link>
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Sample earnings
                </p>
                <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground">
                  ₹2.26L
                </p>
                <p className="text-sm text-muted-foreground">Your share · this month</p>
              </div>
              <span className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
                +8.6%
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4">
              {[
                ["Consultations", "186"],
                ["Conversion", "28.5%"],
                ["Escalations", "24"],
                ["Rating", "4.9★"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-muted/60 px-3 py-3">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-display text-lg font-semibold tracking-tight">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Illustrative dashboard metrics for a live CA partner. Your numbers
              appear after your agent goes live.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              From practice to platform in three steps.
            </h2>
          </div>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.num}>
                <span className="font-display text-4xl font-semibold text-border">
                  {step.num}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border/70 bg-white/70 section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Revenue share
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              You bring the expertise. You share in the business.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Indicative ranges — final terms are confirmed in your partner
              agreement after verification.
            </p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
            {shareTiers.map((tier) => (
              <div key={tier.title} className="bg-white p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {tier.title}
                  </h3>
                  <span className="font-display text-xl font-semibold text-accent">
                    {tier.rate}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tier.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Why join
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              Built for practising professionals.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-white p-6 sm:p-7"
                >
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0a1628] px-8 py-12 text-center sm:px-12 sm:py-16">
            <Sparkles className="mx-auto h-6 w-6 text-teal-300" />
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to put your practice on the platform?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
              Create your agent in minutes. Verification usually completes within
              2–3 business days.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="accent">
                <Link href="/professionals/signup">
                  Start application
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/professionals/login">
                  <Share2 className="h-4 w-4" />
                  Sign in
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
