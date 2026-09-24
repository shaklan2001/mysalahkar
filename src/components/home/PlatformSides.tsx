import Link from "next/link";
import { ArrowRight, Briefcase, Check, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const sides = [
  {
    key: "clients",
    icon: UserRound,
    eyebrow: "For clients",
    title: "Get clear answers, fast",
    body: "Founders, families and finance teams ask an AI Salahkar first, then book a verified human when the stakes are high.",
    points: ["24/7 AI consults", "Verified CA, CS & lawyers", "Pay per minute from a wallet"],
    href: "/client/signup",
    cta: "Create a client account",
    dark: false,
  },
  {
    key: "platform",
    icon: Sparkles,
    eyebrow: "The platform",
    title: "My Salahkar connects both sides",
    body: "AI triage, matching, scheduling, metered calls, reviews and payouts in one workspace, so nobody has to chase anybody.",
    points: ["AI to human handoff with context", "Calendar, calls & billing built in", "Daily regulatory digest"],
    href: "/how-it-works",
    cta: "See how it works",
    dark: true,
  },
  {
    key: "professionals",
    icon: Briefcase,
    eyebrow: "For professionals",
    title: "Grow your practice",
    body: "Practising CAs, CSs and lawyers launch a branded AI Salahkar, take escalations on their terms and get paid.",
    points: ["Your own AI Salahkar", "Qualified leads & bookings", "Earnings dashboard"],
    href: "/professionals/signup",
    cta: "Apply as a professional",
    dark: false,
  },
];

export function PlatformSides() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">One platform, both sides of the table</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built for the people who need advice, and the people who give it.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {sides.map((side) => {
            const Icon = side.icon;
            return (
              <div
                key={side.key}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-2xl border p-7",
                  side.dark
                    ? "border-[#001450] bg-[#001450] text-white shadow-[0_30px_60px_-30px_rgba(0,20,80,0.7)] lg:-my-4 lg:py-11"
                    : "border-border bg-white",
                )}
              >
                {side.dark ? (
                  <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000,transparent_70%)]" aria-hidden />
                ) : null}
                <div className="relative flex flex-1 flex-col">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      side.dark ? "bg-accent text-white" : "bg-brand-blue/10 text-accent",
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p
                    className={cn(
                      "mt-6 text-xs font-semibold tracking-[0.14em] uppercase",
                      side.dark ? "text-blue-300" : "text-accent",
                    )}
                  >
                    {side.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                    {side.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed",
                      side.dark ? "text-slate-300" : "text-muted-foreground",
                    )}
                  >
                    {side.body}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                    {side.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5">
                        <Check
                          className={cn("h-4 w-4 shrink-0", side.dark ? "text-blue-300" : "text-accent")}
                        />
                        <span className={side.dark ? "text-slate-100" : "text-ink-soft"}>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={side.href}
                    className={cn(
                      "group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold",
                      side.dark ? "text-white" : "text-foreground hover:text-accent",
                    )}
                  >
                    {side.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
