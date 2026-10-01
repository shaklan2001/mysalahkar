import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CalendarCheck,
  CalendarDays,
  Eye,
  FileCheck,
  GraduationCap,
  Inbox,
  IndianRupee,
  Lock,
  Newspaper,
  PhoneCall,
  Star,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ConsultButton } from "@/components/consult/ConsultButton";
import { FeatureBento } from "@/components/home/FeatureBento";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Features",
  description:
    "AI Salahkars, verified professionals, WhatsApp, chat and call, metered billing, a daily regulatory digest and tools for professionals, all in one platform.",
};

type Feature = { icon: LucideIcon; title: string; body: string };

const clientFeatures: Feature[] = [
  {
    icon: Bot,
    title: "24/7 AI Salahkars",
    body: "Ask tax, GST, company law or FEMA questions any time and get clear, practical answers.",
  },
  {
    icon: BadgeCheck,
    title: "Verified human professionals",
    body: "Book a CA, CS or lawyer in half-hour slots when a matter needs a professional.",
  },
  {
    icon: Wallet,
    title: "Wallet & per-minute billing",
    body: "Top up once and pay only for the minutes you use. No retainers.",
  },
  {
    icon: CalendarDays,
    title: "Appointments in one place",
    body: "See upcoming calls, reschedule and keep every consultation in your dashboard.",
  },
  {
    icon: Star,
    title: "Reviews you can trust",
    body: "Ratings from real consultations help you choose the right professional.",
  },
  {
    icon: Newspaper,
    title: "Daily regulatory digest",
    body: "A short morning summary of the GST, CBDT, MCA, SEBI and RBI changes that matter.",
  },
];

const professionalFeatures: Feature[] = [
  {
    icon: Bot,
    title: "Your own AI Salahkar",
    body: "A branded AI assistant guided by your expertise that handles routine questions for you.",
  },
  {
    icon: Inbox,
    title: "Leads & escalations",
    body: "Clients arrive with their full conversation, so you start with context, not from zero.",
  },
  {
    icon: CalendarCheck,
    title: "Calendar & availability",
    body: "Publish your hours once. Clients book the slots that suit you.",
  },
  {
    icon: PhoneCall,
    title: "Metered calls",
    body: "Consultations are timed and billed automatically from the client's wallet.",
  },
  {
    icon: IndianRupee,
    title: "Earnings dashboard",
    body: "Track consultations, ratings and payouts as they happen.",
  },
  {
    icon: GraduationCap,
    title: "Community & learning",
    body: "Share rulings, answer peers and keep up with sessions from other practitioners.",
  },
];

const trust = [
  {
    icon: Lock,
    title: "Encrypted end to end",
    body: "TLS 1.3 in transit and AES-256 at rest.",
  },
  {
    icon: Eye,
    title: "Never trained on your data",
    body: "Your conversations stay yours.",
  },
  {
    icon: FileCheck,
    title: "DPDP-aligned",
    body: "Built around India's Digital Personal Data Protection Act, 2023.",
  },
];

function FeatureColumn({
  eyebrow,
  title,
  features,
  href,
  cta,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  features: Feature[];
  href: string;
  cta: string;
  dark?: boolean;
}) {
  return (
    <div
      className={
        dark
          ? "relative overflow-hidden rounded-3xl bg-[#001450] p-8 text-white sm:p-10"
          : "rounded-3xl border border-border bg-white p-8 sm:p-10"
      }
    >
      {dark ? (
        <div
          className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-accent/30 blur-[100px]"
          aria-hidden
        />
      ) : null}
      <div className="relative">
        <p
          className={
            dark
              ? "text-xs font-semibold tracking-[0.14em] text-blue-300 uppercase"
              : "eyebrow"
          }
        >
          {eyebrow}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
          {title}
        </h3>
        <ul className="mt-8 grid gap-7 sm:grid-cols-2">
          {features.map(({ icon: Icon, title: featureTitle, body }) => (
            <li key={featureTitle}>
              <span
                className={
                  dark
                    ? "flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-blue-200 ring-1 ring-white/15"
                    : "flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10 text-accent"
                }
              >
                <Icon className="h-4 w-4" />
              </span>
              <h4 className="mt-3 font-display text-[15px] font-semibold tracking-tight">
                {featureTitle}
              </h4>
              <p
                className={
                  dark
                    ? "mt-1 text-sm leading-relaxed text-slate-400"
                    : "mt-1 text-sm leading-relaxed text-muted-foreground"
                }
              >
                {body}
              </p>
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className={
            dark
              ? "group mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-white"
              : "group mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
          }
        >
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        title="Everything a professional consultation needs,"
        highlight="in one place."
        description="AI Salahkars that answer in seconds, verified professionals when it matters, and the scheduling, billing and compliance tools that tie it all together."
      >
        <ConsultButton className="w-full sm:w-auto" />
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Link href="/how-it-works">See how it works</Link>
        </Button>
      </PageHero>

      <div className="pb-4">
        <FeatureBento withHeading={false} />
      </div>

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Built for both sides"
            title="Tools for the people who ask, and the people who advise."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <FeatureColumn
              eyebrow="For clients"
              title="Get answers and stay compliant"
              features={clientFeatures}
              href="/client/signup"
              cta="Create a client account"
            />
            <FeatureColumn
              eyebrow="For professionals"
              title="Run and grow your practice"
              features={professionalFeatures}
              href="/professionals/signup"
              cta="Apply as a professional"
              dark
            />
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 rounded-3xl border border-border bg-white p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-sm">
              <p className="eyebrow">Security</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                Confidential by default.
              </h2>
              <Link
                href="/security"
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
              >
                Read about security
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="grid flex-1 gap-6 sm:grid-cols-3 lg:max-w-2xl">
              {trust.map(({ icon: Icon, title, body }) => (
                <li key={title}>
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  <p className="mt-3 text-sm font-semibold text-foreground">
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
