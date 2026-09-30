"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Bot, CalendarClock, Sparkles, Video, Wallet } from "lucide-react";
import { toast } from "sonner";
import {
  Delta,
  MetricCards,
  PerformanceChart,
  RecentLeadsPreview,
} from "@/components/professionals/DashboardWidgets";
import { AppointmentList, EmptyAppointments, formatSlot } from "@/components/client/ClientAppointments";
import { statusMeta } from "@/components/professionals/ProDashboardShell";
import { Button } from "@/components/ui/button";
import { formatINR, cn } from "@/lib/utils";
import { mockEarnings, mockMetrics, mockProfessional } from "@/lib/data/professional";
import { appointmentsForViewer, splitAppointments } from "@/lib/data/appointments";

function greeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-IN", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date()),
  );
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function DashboardHome() {
  const searchParams = useSearchParams();
  const pro = mockProfessional;
  const status = statusMeta[pro.status];
  const { upcoming } = splitAppointments(appointmentsForViewer("professional"));
  const next = upcoming[0];
  const nextSlot = next ? formatSlot(next) : null;
  const paid = mockEarnings.filter((e) => e.status === "Paid").reduce((sum, e) => sum + e.share, 0);
  const pending = mockEarnings.filter((e) => e.status !== "Paid").reduce((sum, e) => sum + e.share, 0);

  useEffect(() => {
    if (searchParams.get("welcome") === "1") {
      toast.success("Welcome — your partner dashboard is ready (demo data).");
    }
  }, [searchParams]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {searchParams.get("new") === "1" ? (
        <section className="flex flex-col gap-4 rounded-2xl border border-accent/25 bg-gradient-to-r from-[#eef3ff] to-white p-5 sm:flex-row sm:items-center sm:p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">Create your AI Salahkar</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Your account is ready. Set up the Salahkar clients will chat with and call.
            </p>
          </div>
          <Button asChild variant="accent">
            <Link href="/professionals/dashboard/consultant">
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      ) : null}

      {/* Welcome + this month */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="relative overflow-hidden rounded-3xl bg-[#001450] p-6 text-white sm:p-8">
          <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_70%)]" aria-hidden />
          <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-accent/35 blur-[100px]" aria-hidden />
          <div className="relative">
            <p className="text-sm text-blue-200">{greeting()},</p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-[2.1rem]">{pro.agentName}</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10">
              <Bot className="h-3.5 w-3.5 text-blue-200" />
              {pro.agentName} AI is
              <span className="inline-flex items-center gap-1 font-semibold text-white">
                <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} /> {status.label.toLowerCase()}
              </span>
              · {mockMetrics.consultations} consultations in 30 days
            </p>

            {next && nextSlot ? (
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-white text-[#001450]">
                  <span className="font-display text-lg leading-none font-semibold">{nextSlot.day}</span>
                  <span className="mt-1 text-[10px] font-semibold tracking-wide uppercase">{nextSlot.month}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-wide text-blue-200 uppercase">Next client call</p>
                  <p className="mt-0.5 truncate text-sm font-semibold">
                    {next.service ?? next.title} · {next.clientName ?? next.withName}
                  </p>
                  <p className="text-xs text-slate-300">
                    {nextSlot.weekday}, {nextSlot.time} IST
                  </p>
                </div>
                <a
                  href={next.meetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 shrink-0 items-center gap-2 self-start rounded-md bg-white px-3.5 text-xs font-semibold text-[#001450] hover:bg-blue-50 sm:self-auto"
                >
                  <Video className="h-3.5 w-3.5" /> Join Meet
                </a>
              </div>
            ) : null}
          </div>
        </section>

        <section className="flex flex-col rounded-2xl border border-border bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <Wallet className="h-4 w-4 text-accent" /> Your share · 30 days
            </p>
            <Delta value={mockMetrics.shareDelta} />
          </div>
          <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground">
            {formatINR(mockMetrics.yourShare)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {Math.round(pro.shareRate * 100)}% consultation share · gross {formatINR(mockMetrics.grossGmv)}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border/70 pt-4 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Paid out</dt>
              <dd className="mt-0.5 font-semibold text-foreground">{formatINR(paid)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Pending</dt>
              <dd className="mt-0.5 font-semibold text-foreground">{formatINR(pending)}</dd>
            </div>
          </dl>
          <Link
            href="/professionals/dashboard/earnings"
            className="mt-auto inline-flex items-center gap-1 pt-5 text-xs font-semibold text-muted-foreground hover:text-accent"
          >
            View earnings <ArrowRight className="h-3 w-3" />
          </Link>
        </section>
      </div>

      <MetricCards metrics={mockMetrics} />

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold tracking-tight text-foreground">
              <CalendarClock className="h-4 w-4 text-accent" /> Upcoming client calls
            </h2>
            <Link
              href="/professionals/dashboard/calendar"
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-accent"
            >
              Calendar <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-5">
            {upcoming.length ? (
              <AppointmentList appointments={upcoming.slice(0, 4)} viewer="professional" />
            ) : (
              <EmptyAppointments message="New bookings from clients will appear here." action={null} />
            )}
          </div>
        </section>
        <RecentLeadsPreview />
      </div>

      <PerformanceChart />
    </div>
  );
}
