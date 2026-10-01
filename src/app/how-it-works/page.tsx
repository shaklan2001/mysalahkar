import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Clock,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smartphone,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ConsultButton } from "@/components/consult/ConsultButton";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how My Salahkar's AI Salahkars work — consult via WhatsApp, chat, or call. Instant answers with human escalation when you need it.",
};

type Step = { title: string; body: string };

const clientSteps: Step[] = [
  {
    title: "Ask your question",
    body: "Type or speak in plain language. The AI understands context and nuance across multiple languages.",
  },
  {
    title: "Instant analysis",
    body: "Your Salahkar checks the query against regulatory frameworks, case law and best practice.",
  },
  {
    title: "Actionable answers",
    body: "Clear, step-by-step guidance with citations, deadlines and next steps. No jargon unless you want it.",
  },
  {
    title: "Escalate when needed",
    body: "Book a verified professional who sees your full conversation, so you never repeat yourself.",
  },
];

const professionalSteps: Step[] = [
  {
    title: "Apply & get verified",
    body: "Share your practice details and credentials. We verify every CA, CS and lawyer before listing.",
  },
  {
    title: "Launch your AI Salahkar",
    body: "A branded AI assistant, guided by your expertise, answers routine questions around the clock.",
  },
  {
    title: "Take escalations",
    body: "Clients book the matters that need you, with context attached. You choose your hours and rate.",
  },
  {
    title: "Get paid",
    body: "Calls are metered and collected automatically. Track earnings and payouts in your dashboard.",
  },
];

const channels: {
  icon: LucideIcon;
  name: string;
  body: string;
  points: string[];
  tone: string;
}[] = [
  {
    icon: Smartphone,
    name: "WhatsApp",
    body: "Message AI Salahkars directly on WhatsApp and get instant responses in your preferred language, 24/7.",
    points: [
      "No app installation needed",
      "Voice notes supported",
      "Document sharing",
    ],
    tone: "bg-[#25d366]/12 text-[#128c4a]",
  },
  {
    icon: MessageCircle,
    name: "Web chat",
    body: "Real-time chat with specialist AI Salahkars on the web, with rich formatting and file uploads.",
    points: [
      "Multi-file upload support",
      "Conversation history",
      "Desktop & mobile friendly",
    ],
    tone: "bg-brand-blue/10 text-accent",
  },
  {
    icon: Phone,
    name: "Voice call",
    body: "Talk to an AI voice agent, or request a human expert for complex matters.",
    points: [
      "Natural conversation flow",
      "Complex query resolution",
      "Human expert fallback",
    ],
    tone: "bg-[#001450]/8 text-[#001450]",
  },
];

const coverage = [
  { label: "GST & Tax Compliance", value: 95 },
  { label: "Company Law & ROC", value: 92 },
  { label: "Wealth Management", value: 90 },
  { label: "FEMA & Cross-Border", value: 88 },
];

const safeguards: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: UserCheck,
    title: "Automatic escalation triggers",
    body: "Court filings, litigation strategy, regulatory audits and M&A transactions route to human experts automatically.",
  },
  {
    icon: Clock,
    title: "Request human review anytime",
    body: "Not satisfied with an AI answer? Choose “Escalate to Expert” and we’ll schedule a consultation within 24 hours.",
  },
  {
    icon: ShieldCheck,
    title: "All AI advice supervised",
    body: "Every AI response is logged and periodically reviewed by domain experts for quality and compliance.",
  },
];

const escalateWhen = [
  "Court representation or litigation support",
  "Tax notices, scrutiny or assessment appeals",
  "Complex cross-border M&A or restructuring",
  "High-value wealth structuring (₹1 Cr+)",
  "Regulatory filings requiring attestation",
  "Sensitive IP, employment or family matters",
];

function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <span
        className="absolute top-[2.35rem] right-[12%] left-[12%] hidden h-px bg-[repeating-linear-gradient(to_right,var(--border)_0_6px,transparent_6px_12px)] lg:block"
        aria-hidden
      />
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative rounded-2xl border border-border bg-white p-6"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#001450] font-display text-sm font-semibold text-white ring-4 ring-background">
            {index + 1}
          </span>
          <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-foreground">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="From first question to"
        highlight="expert sign-off."
        description="Consult an AI Salahkar on WhatsApp, chat or call, and bring in a verified professional the moment a matter needs one."
      >
        <ConsultButton className="w-full sm:w-auto" />
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Link href="/professionals/signup">I&apos;m a professional</Link>
        </Button>
      </PageHero>

      {/* Journeys */}
      <section className="pt-6 pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="clients">
            <SectionHeading
              eyebrow="The journey"
              title="Four steps, whichever side you're on."
              action={
                <TabsList>
                  <TabsTrigger value="clients" className="px-4">
                    For clients
                  </TabsTrigger>
                  <TabsTrigger value="professionals" className="px-4">
                    For professionals
                  </TabsTrigger>
                </TabsList>
              }
            />
            <TabsContent value="clients" className="mt-12">
              <Steps steps={clientSteps} />
            </TabsContent>
            <TabsContent value="professionals" className="mt-12">
              <Steps steps={professionalSteps} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Channels */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Channels"
            title="Three ways to get expert advice."
            description="Same Salahkar, same context. Start on one channel and continue on another."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {channels.map(({ icon: Icon, name, body, points, tone }) => (
              <div
                key={name}
                className="flex flex-col rounded-2xl border border-border bg-white p-7"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-foreground">
                  {name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-border/70 pt-5 text-sm">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2.5 text-ink-soft"
                    >
                      <Check className="h-4 w-4 shrink-0 text-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI coverage */}
      <section className="pb-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="AI Salahkars"
              title="AI that understands Indian regulation."
              description="Our AI Salahkars are trained on decades of professional knowledge across tax, legal, compliance and financial domains, so most questions are answered on the spot."
            />
            <div className="mt-8 rounded-2xl border border-border bg-white p-4">
              <p className="px-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                Sample conversation
              </p>
              <div className="mt-3 space-y-2.5 text-[13px] leading-relaxed">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#001450] px-3.5 py-2.5 text-white">
                  We received a GST notice for an ITC mismatch. What should we
                  do first?
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-border bg-[#fbfcfe] px-3.5 py-2.5 text-ink-soft">
                  Reconcile GSTR-2B with your purchase register for the period
                  in the notice, then reply within the time it states. Since
                  this is a notice, I&apos;d suggest a CA reviews your reply
                  before you file it.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8 sm:p-10">
            <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
              Queries resolved by AI, by domain
            </h3>
            <ul className="mt-8 space-y-6">
              {coverage.map((item) => (
                <li key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink-soft">
                      {item.label}
                    </span>
                    <span className="font-display font-semibold text-foreground">
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#003cf8] to-[#4f7bff]"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-border/70 pt-5 text-sm text-muted-foreground">
              Based on 10,000+ resolved queries in 2026. Complex cases are
              escalated to human experts.
            </p>
          </div>
        </div>
      </section>

      {/* Escalation */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#001450] text-white">
          <div
            className="absolute -top-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-accent/30 blur-[120px]"
            aria-hidden
          />
          <div className="relative grid gap-12 px-6 py-14 sm:px-10 md:py-16 lg:grid-cols-2 lg:px-14">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-blue-300 uppercase">
                Human escalation
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Our AI knows its limits.
              </h2>
              <p className="mt-4 max-w-md text-slate-300">
                For complex, sensitive or high-stakes matters, we connect you
                with a licensed professional, with your conversation attached.
              </p>
              <ul className="mt-10 space-y-6">
                {safeguards.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-blue-200 ring-1 ring-white/15">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-display text-[15px] font-semibold tracking-tight">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="self-center rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-8">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                When to escalate to a human expert
              </h3>
              <ul className="mt-6 divide-y divide-white/10">
                {escalateWhen.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 py-3.5 text-sm text-slate-200"
                  >
                    <UserCheck className="h-4 w-4 shrink-0 text-blue-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
