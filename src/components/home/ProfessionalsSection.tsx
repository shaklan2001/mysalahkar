import Link from "next/link";
import { ArrowRight, Bot, CalendarCheck, IndianRupee, Inbox, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Bot,
    title: "Your own AI Salahkar",
    body: "A branded AI assistant, guided by your expertise, that answers routine questions around the clock.",
  },
  {
    icon: Inbox,
    title: "Qualified leads & escalations",
    body: "Clients arrive with context. You take only the matters that need a professional.",
  },
  {
    icon: CalendarCheck,
    title: "Calendar, calls & billing",
    body: "Set your hours and half-hour rate. Calls are metered and collected for you.",
  },
  {
    icon: IndianRupee,
    title: "Earnings you can see",
    body: "Consultations, reviews and payouts tracked live in your partner dashboard.",
  },
];

const bars = [38, 52, 44, 61, 58, 72, 66, 84, 78, 92];

export function ProfessionalsSection() {
  return (
    <section id="professionals" className="scroll-mt-28 px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#001450] text-white">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_80%_0%,#000,transparent)]" aria-hidden />
        <div
          className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-accent/30 blur-[120px]"
          aria-hidden
        />

        <div className="relative grid gap-14 px-6 py-14 sm:px-10 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-blue-300 uppercase">
              For professionals
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Practise on your terms. Let the platform bring the clients.
            </h2>
            <p className="mt-4 max-w-lg text-slate-300">
              Practising CA, CS, lawyer or advisor? List your AI Salahkar on the
              marketplace, handle escalations when you choose, and earn on every
              consultation.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {features.map(({ icon: Icon, title, body }) => (
                <div key={title}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                    <Icon className="h-4 w-4 text-blue-200" />
                  </span>
                  <h3 className="mt-3 font-display text-[15px] font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="accent">
                <Link href="/professionals/signup">
                  Apply as a professional
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/professionals/login">Professional login</Link>
              </Button>
            </div>
          </div>

          <div className="self-center">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Partner dashboard</p>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-slate-300 uppercase">
                  Preview
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ["Consults", "126"],
                  ["Rating", "4.9"],
                  ["Repeat", "38%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-white/[0.06] p-3">
                    <p className="text-[11px] text-slate-400">{label}</p>
                    <p className="mt-0.5 font-display text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-xl bg-white/[0.06] p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-slate-400">Earnings this month</p>
                    <p className="font-display text-2xl font-semibold">₹1,84,200</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
                    <TrendingUp className="h-3.5 w-3.5" /> 18%
                  </span>
                </div>
                <div className="mt-4 flex h-24 items-end gap-1.5">
                  {bars.map((h, i) => (
                    <span
                      key={i}
                      className={i === bars.length - 1 ? "flex-1 rounded-t bg-accent" : "flex-1 rounded-t bg-white/15"}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <ul className="mt-3 divide-y divide-white/10 rounded-xl bg-white/[0.06] px-4 text-sm">
                {[
                  ["New escalation", "LLP to Pvt Ltd conversion", "Now"],
                  ["Booking", "FEMA · ODI filing review", "2h"],
                ].map(([kind, title, time]) => (
                  <li key={title} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="text-[11px] text-blue-300">{kind}</p>
                      <p className="truncate">{title}</p>
                    </div>
                    <span className="shrink-0 text-xs text-slate-400">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
