import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Lock,
  MessagesSquare,
  Newspaper,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react";
import { learningPath, learningSessions } from "@/lib/data/learning";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ConsultButton } from "@/components/consult/ConsultButton";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Learning · Coming soon",
  description:
    "Live workshops and recorded masterclasses on tax, corporate law and compliance, taught by practising professionals. Coming soon to My Salahkar.",
};

const formats: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Video,
    title: "Live workshops",
    body: "Interactive sessions with practising CAs, CSs and lawyers, with time for your questions.",
  },
  {
    icon: BookOpen,
    title: "Recorded masterclasses",
    body: "Watch at your own pace, from fundamentals to advanced specialisations.",
  },
  {
    icon: GraduationCap,
    title: "Structured learning paths",
    body: "Beginner to advanced tracks, so you always know what to learn next.",
  },
];

export default function LearningPage() {
  const preview = learningSessions.slice(0, 6);

  return (
    <>
      <PageHero
        badge={{ label: "Coming soon" }}
        title="Learning"
        highlight="is on its way."
        description="Workshops and masterclasses on tax, corporate law and compliance, taught by the professionals who practise it every day."
      >
        <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
          <Link href="/daily-digest">
            Read today&apos;s Digest
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Link href="/community">Browse the Community</Link>
        </Button>
      </PageHero>

      {/* What's coming */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {formats.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-white p-7"
              >
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

      {/* Learning paths */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Learning paths"
            title="From fundamentals to specialisation."
          />
          <ol className="relative mt-12 grid gap-5 md:grid-cols-3">
            {learningPath.map((path, index) => (
              <li
                key={path.title}
                className="relative rounded-2xl border border-border bg-white p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001450] font-display text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-ink-soft">
                    {path.level}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
                  {path.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {path.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sneak peek */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Sneak peek"
            title="Sessions in the works."
            description="A preview of what we're preparing. Topics and schedules may change before launch."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((session) => (
              <li
                key={session.id}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-accent">
                    {session.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    <Lock className="h-3 w-3" /> Soon
                  </span>
                </div>
                <h3 className="mt-3 flex-1 font-display text-[15px] leading-snug font-semibold tracking-tight text-foreground">
                  {session.title.replace(" [Recorded]", "")}
                </h3>
                <p className="mt-4 text-xs text-muted-foreground">
                  {session.level} · {session.duration}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Meanwhile */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#001450] px-6 py-12 text-white sm:px-12">
            <div
              className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-accent/30 blur-[100px]"
              aria-hidden
            />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-blue-300 uppercase">
                  In the meantime
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Keep learning with what&apos;s live today.
                </h2>
                <ul className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
                  <li className="flex items-start gap-2.5">
                    <Newspaper className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />{" "}
                    Daily regulatory digest
                  </li>
                  <li className="flex items-start gap-2.5">
                    <MessagesSquare className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />{" "}
                    Practitioner discussions
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />{" "}
                    Instant answers from AI Salahkars
                  </li>
                </ul>
              </div>
              <ConsultButton className="w-full sm:w-auto">
                Ask an AI Salahkar
              </ConsultButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
