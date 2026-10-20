"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Bot,
  CalendarClock,
  Sparkles,
  Video,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import {
  Delta,
  MetricCards,
  PerformanceChart,
  RecentLeadsPreview,
} from "@/components/professionals/DashboardWidgets";
import {
  AppointmentList,
  EmptyAppointments,
  formatSlot,
} from "@/components/client/ClientAppointments";
import { statusMeta } from "@/components/professionals/ProDashboardShell";
import { Button } from "@/components/ui/button";
import { api, ApiError } from "@/lib/api";
import { loadBookings } from "@/lib/bookings";
import { formatINR, cn } from "@/lib/utils";
import {
  type DashboardMetrics,
  type LeadRow,
  type ProfessionalStatus,
} from "@/lib/data/professional";
import { splitAppointments, type Appointment } from "@/lib/data/appointments";

function greeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }).format(new Date()),
  );
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const EMPTY_METRICS: DashboardMetrics = {
  consultations: 0,
  consultationsDelta: 0,
  conversionRate: 0,
  conversionDelta: 0,
  grossGmv: 0,
  yourShare: 0,
  shareDelta: 0,
  escalations: 0,
  rating: 0,
  reviewCount: 0,
};

type ProDashboardResponse = {
  metrics: {
    consultations: number;
    consultationsDelta: number;
    bookings: number;
    escalations: number;
    grossPaise: number;
    sharePaise: number;
    shareDelta: number;
    rating: number;
    reviewCount: number;
  };
  daily: { date: string; earningsPaise: number }[];
};

type EarningItem = { sharePaise: number; status: string };
type LeadItem = {
  id: string;
  status: LeadRow["status"];
  name: string;
  topic: string;
  source: string;
  createdAt: string;
};

function toMetrics(metrics: ProDashboardResponse["metrics"]): DashboardMetrics {
  const conversion = metrics.consultations
    ? Math.round((metrics.bookings / metrics.consultations) * 1000) / 10
    : 0;
  return {
    consultations: metrics.consultations,
    consultationsDelta: metrics.consultationsDelta,
    conversionRate: conversion,
    conversionDelta: 0,
    grossGmv: metrics.grossPaise / 100,
    yourShare: metrics.sharePaise / 100,
    shareDelta: metrics.shareDelta,
    escalations: metrics.escalations,
    rating: metrics.rating,
    reviewCount: metrics.reviewCount,
  };
}

function toLead(item: LeadItem): LeadRow {
  const channel: LeadRow["channel"] = item.source === "call" ? "Call" : "Chat";
  return {
    id: item.id,
    client: item.name,
    channel,
    topic: item.topic,
    status: item.status,
    value: 0,
    at: item.createdAt,
  };
}

export function DashboardHome() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("Your practice");
  const [statusKey, setStatusKey] = useState<ProfessionalStatus>("draft");
  const [shareBps, setShareBps] = useState(5500);
  const [metrics, setMetrics] = useState(EMPTY_METRICS);
  const [daily, setDaily] = useState<{ date: string; earnings: number }[]>([]);
  const [paid, setPaid] = useState(0);
  const [pending, setPending] = useState(0);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const status = statusMeta[statusKey];
  const { upcoming } = splitAppointments(appointments);
  const next = upcoming[0];
  const nextSlot = next ? formatSlot(next) : null;

  useEffect(() => {
    if (searchParams.get("welcome") === "1") {
      toast.success("Welcome — your partner dashboard is ready.");
    }
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    api<{ professional: { name?: string; status?: ProfessionalStatus; shareBps?: number } | null; application: { status?: string } | null }>("/pro/me")
      .then(({ professional, application }) => {
        if (cancelled) return;
        if (professional?.name) setName(professional.name);
        if (professional?.status) setStatusKey(professional.status);
        else if (application?.status === "pending_review") setStatusKey("pending_review");
        if (professional?.shareBps) setShareBps(professional.shareBps);
      })
      .catch(() => undefined);

    api<ProDashboardResponse>("/pro/dashboard")
      .then((data) => {
        if (cancelled) return;
        setMetrics(toMetrics(data.metrics));
        setDaily(data.daily.map((point) => ({ date: point.date, earnings: point.earningsPaise / 100 })));
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        if (error instanceof ApiError && error.status === 403) {
          setNotice("Your listing isn't live yet. Metrics appear after an admin approves you.");
        }
      });

    api<{ items: EarningItem[] }>("/pro/earnings")
      .then(({ items }) => {
        if (cancelled) return;
        setPaid(items.filter((row) => row.status === "Paid").reduce((sum, row) => sum + row.sharePaise, 0) / 100);
        setPending(items.filter((row) => row.status !== "Paid").reduce((sum, row) => sum + row.sharePaise, 0) / 100);
      })
      .catch(() => undefined);

    api<{ items: LeadItem[] }>("/pro/leads")
      .then(({ items }) => {
        if (!cancelled) setLeads(items.map(toLead));
      })
      .catch(() => undefined);

    loadBookings("professional")
      .then((items) => {
        if (!cancelled) setAppointments(items);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {searchParams.get("new") === "1" ? (
        <section className="flex flex-col gap-4 rounded-2xl border border-accent/25 bg-gradient-to-r from-[#eef3ff] to-white p-5 sm:flex-row sm:items-center sm:p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
              Create your AI Salahkar
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Your account is ready. Set up the Salahkar clients will chat with
              and call.
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
          <div
            className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_70%)]"
            aria-hidden
          />
          <div
            className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-accent/35 blur-[100px]"
            aria-hidden
          />
          <div className="relative">
            <p className="text-sm text-blue-200">{greeting()},</p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-[2.1rem]">
              {name}
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10">
              <Bot className="h-3.5 w-3.5 text-blue-200" />
              {name} is
              <span className="inline-flex items-center gap-1 font-semibold text-white">
                <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />{" "}
                {status.label.toLowerCase()}
              </span>
              <span className="hidden sm:inline">
                · {metrics.consultations} consultations in 30 days
              </span>
            </p>

            {next && nextSlot ? (
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-white text-[#001450]">
                  <span className="font-display text-lg leading-none font-semibold">
                    {nextSlot.day}
                  </span>
                  <span className="mt-1 text-[10px] font-semibold tracking-wide uppercase">
                    {nextSlot.month}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-wide text-blue-200 uppercase">
                    Next client call
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold">
                    {next.service ?? next.title} ·{" "}
                    {next.clientName ?? next.withName}
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
            <Delta value={metrics.shareDelta} />
          </div>
          <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground">
            {formatINR(metrics.yourShare)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {Math.round(shareBps / 100)}% consultation share · gross{" "}
            {formatINR(metrics.grossGmv)}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border/70 pt-4 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Paid out</dt>
              <dd className="mt-0.5 font-semibold text-foreground">
                {formatINR(paid)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Pending</dt>
              <dd className="mt-0.5 font-semibold text-foreground">
                {formatINR(pending)}
              </dd>
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

      {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}

      <MetricCards metrics={metrics} />

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold tracking-tight text-foreground">
              <CalendarClock className="h-4 w-4 text-accent" /> Upcoming client
              calls
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
              <AppointmentList
                appointments={upcoming.slice(0, 4)}
                viewer="professional"
              />
            ) : (
              <EmptyAppointments
                message="New bookings from clients will appear here."
                action={null}
              />
            )}
          </div>
        </section>
        <RecentLeadsPreview leads={leads} />
      </div>

      <PerformanceChart points={daily} grossRupees={metrics.grossGmv} />
    </div>
  );
}
