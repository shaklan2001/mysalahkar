import type { Metadata } from "next";
import {
  AlertCircle,
  Check,
  Database,
  Eye,
  FileCheck,
  Lock,
  Mail,
  Shield,
  X,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/SectionHeading";

export const metadata: Metadata = {
  title: "Security & Data Privacy",
  description:
    "Learn how My Salahkar protects your data. Encryption, DPDP compliance, and our commitment to never training on your conversations.",
};

const highlights = [
  "TLS 1.3 in transit",
  "AES-256 at rest",
  "DPDP Act, 2023",
  "72-hour breach notice",
];

const principles: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Lock,
    title: "End-to-end encryption",
    body: "All conversations are encrypted in transit using TLS 1.3. Data at rest is encrypted with AES-256.",
  },
  {
    icon: Eye,
    title: "No training on your data",
    body: "Your conversations are never used to train or improve our AI models. Your queries stay private and confidential.",
  },
  {
    icon: Database,
    title: "Data minimisation",
    body: "We collect only what's needed to provide the service. No tracking pixels, no third-party analytics, no data brokers.",
  },
  {
    icon: FileCheck,
    title: "DPDP compliance",
    body: "We comply with India's Digital Personal Data Protection Act, 2023. Your rights, our responsibility.",
  },
  {
    icon: AlertCircle,
    title: "Incident response",
    body: "In the unlikely event of a breach, we notify affected users within 72 hours, as per DPDP guidelines.",
  },
  {
    icon: Shield,
    title: "Regular audits",
    body: "Security practices are reviewed quarterly by external auditors. We maintain SOC 2 Type II equivalent controls.",
  },
];

const collected = [
  {
    label: "Conversations",
    body: "Your queries and our AI responses, for quality control and escalation context.",
  },
  {
    label: "Contact information",
    body: "Email and phone (optional), for human escalation and follow-ups.",
  },
  {
    label: "Technical logs",
    body: "IP addresses (anonymised after 7 days), timestamps and browser type, for security.",
  },
  {
    label: "Payment data",
    body: "Processed by payment gateway partners. We never store full card details.",
  },
];

const notCollected = [
  "Browsing history or third-party tracking",
  "Location data beyond IP-based country detection",
  "Social media profiles or contacts",
  "Biometric or sensitive personal data (unless you explicitly share it)",
];

const retention = [
  {
    item: "Active conversations",
    period: "2 years",
    note: "Legal compliance and service improvement",
  },
  {
    item: "Anonymised logs",
    period: "Indefinite",
    note: "Aggregate analysis only, no personal data",
  },
  {
    item: "Payment records",
    period: "7 years",
    note: "Required under Indian tax law",
  },
  {
    item: "Deleted accounts",
    period: "30 days",
    note: "All personal data purged after a deletion request",
  },
];

const rights = [
  "Access your data",
  "Correct inaccurate data",
  "Erase your data (with legal exceptions)",
  "Nominate a data guardian",
  "Grievance redressal",
];

const providers = [
  {
    category: "Cloud infrastructure",
    provider: "AWS (Mumbai region)",
    purpose: "Hosting and data storage",
  },
  {
    category: "AI models",
    provider: "Anthropic Claude, OpenAI GPT",
    purpose: "Data Processing Agreements in place",
  },
  {
    category: "Payments",
    provider: "Razorpay, Stripe",
    purpose: "PCI DSS compliant processing",
  },
  {
    category: "Communication",
    provider: "Twilio (WhatsApp), AWS SES (email)",
    purpose: "Encrypted channels",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        title="Your trust is"
        highlight="our foundation."
        description="How we protect your data, keep your conversations private, and align with India's data protection law."
      >
        <ul className="flex flex-wrap justify-center gap-2">
          {highlights.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-ink-soft"
            >
              <Check className="h-3.5 w-3.5 text-success" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Principles */}
      <section className="pt-6 pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Principles"
            title="Six commitments we build around."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {principles.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data handling */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Your data"
            title="Exactly what we collect, and what we don't."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-border bg-white p-7 sm:p-8">
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                What we collect
              </h3>
              <dl className="mt-6 divide-y divide-border/70">
                {collected.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <dt className="text-sm font-semibold text-foreground">
                      {row.label}
                    </dt>
                    <dd className="text-sm leading-relaxed text-muted-foreground">
                      {row.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl border border-border bg-white p-7 sm:p-8">
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                What we never collect
              </h3>
              <ul className="mt-6 space-y-4">
                {notCollected.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <X className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Retention + rights */}
      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-7 sm:p-8">
            <p className="eyebrow">Retention</p>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-foreground">
              How long we keep it
            </h3>
            <ul className="mt-6 divide-y divide-border/70">
              {retention.map((row) => (
                <li
                  key={row.item}
                  className="flex items-center justify-between gap-6 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {row.item}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {row.note}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-3 py-1 font-display text-sm font-semibold text-foreground">
                    {row.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#001450] p-7 text-white sm:p-8">
            <div
              className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-accent/30 blur-[90px]"
              aria-hidden
            />
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.14em] text-blue-300 uppercase">
                DPDP Act
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                Your rights
              </h3>
              <ul className="mt-6 space-y-3.5">
                {rights.map((right) => (
                  <li
                    key={right}
                    className="flex items-center gap-3 text-sm text-slate-200"
                  >
                    <Check className="h-4 w-4 shrink-0 text-emerald-300" />
                    Right to {right.charAt(0).toLowerCase() + right.slice(1)}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/10 pt-5 text-sm text-slate-400">
                To exercise your rights, email{" "}
                <a
                  href="mailto:privacy@mysalahkar.com"
                  className="font-medium text-white underline-offset-4 hover:underline"
                >
                  privacy@mysalahkar.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Providers */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Third-party services"
            title="Trusted providers, under contract."
            description="Every provider is vetted and contractually required to maintain data security. We never share customer data with advertisers, data brokers or unrelated third parties."
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/70 bg-[#f8f9fc] text-xs tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3.5 font-semibold">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3.5 font-semibold">
                    Provider
                  </th>
                  <th
                    scope="col"
                    className="hidden px-6 py-3.5 font-semibold sm:table-cell"
                  >
                    Safeguards
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {providers.map((row) => (
                  <tr key={row.category}>
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {row.category}
                    </td>
                    <td className="px-6 py-4 text-ink-soft">
                      {row.provider}
                      <span className="mt-0.5 block text-xs text-muted-foreground sm:hidden">
                        {row.purpose}
                      </span>
                    </td>
                    <td className="hidden px-6 py-4 text-muted-foreground sm:table-cell">
                      {row.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 rounded-3xl border border-border bg-white p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                Questions about our security?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Our security and privacy teams are here to help.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {["security@mysalahkar.com", "privacy@mysalahkar.com"].map(
                (email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <Mail className="h-4 w-4" />
                    {email}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
