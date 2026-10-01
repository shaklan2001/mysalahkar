"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  MessageSquare,
  Newspaper,
  Sparkles,
  Users,
  Video,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  appointmentsForViewer,
  splitAppointments,
} from "@/lib/data/appointments";
import { getDigestForDate, upcomingDeadlines } from "@/lib/data/digest";
import { aiConsultantName } from "@/lib/data/agents";
import { getAiSalahkars } from "@/lib/data/marketplace";
import { formatRupees, onWalletChange, readBalancePaise } from "@/lib/wallet";
import {
  startWalletTopUp,
  WalletPaymentCancelled,
} from "@/lib/wallet-checkout";
import { useClientSession } from "@/lib/client-session";
import { useConsult } from "@/components/consult/ConsultProvider";
import { ConsultantPhoto } from "@/components/agents/ConsultantPhoto";
import {
  AppointmentList,
  EmptyAppointments,
  formatSlot,
} from "@/components/client/ClientAppointments";
import { Button } from "@/components/ui/button";

const TZ = "Asia/Kolkata";

function greeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      hour12: false,
      timeZone: TZ,
    }).format(new Date()),
  );
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function useWalletBalance() {
  return useSyncExternalStore(onWalletChange, readBalancePaise, () => 0);
}

function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border border-border bg-white p-5 sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function CardHeader({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="font-display text-base font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {href ? (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-accent"
        >
          {linkLabel} <ArrowRight className="h-3 w-3" />
        </Link>
      ) : null}
    </div>
  );
}

export function ClientHome() {
  const { session } = useClientSession();
  const { openConsult } = useConsult();
  const balance = useWalletBalance();
  const [topping, setTopping] = useState(false);

  const { upcoming } = splitAppointments(appointmentsForViewer("client"));
  const next = upcoming[0];
  const nextSlot = next ? formatSlot(next) : null;
  const firstName = (session?.name ?? "").split(" ")[0] || "there";
  const digest = getDigestForDate();
  const deadlines = [...upcomingDeadlines]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);
  const aiSalahkars = getAiSalahkars();

  async function topUp() {
    setTopping(true);
    try {
      const before = readBalancePaise();
      const after = await startWalletTopUp(500);
      toast.success(`Added ${formatRupees(after - before)} to your wallet`);
    } catch (error) {
      if (!(error instanceof WalletPaymentCancelled)) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Could not start the payment.",
        );
      }
    } finally {
      setTopping(false);
    }
  }

  const actions: {
    icon: LucideIcon;
    title: string;
    body: string;
    onClick?: () => void;
    href?: string;
    tone: string;
  }[] = [
    {
      icon: Sparkles,
      title: "Ask an AI Salahkar",
      body: "Instant answers, 24/7",
      onClick: () => openConsult(),
      tone: "bg-accent text-white",
    },
    {
      icon: BadgeCheck,
      title: "Book a professional",
      body: "Verified CA, CS & lawyers",
      href: "/client/dashboard/find?kind=human",
      tone: "bg-[#001450] text-white",
    },
    {
      icon: Newspaper,
      title: "Today's digest",
      body: "What changed today",
      href: "/client/dashboard/daily-digest",
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      icon: Users,
      title: "Community",
      body: "Ask practitioners",
      href: "/client/dashboard/community",
      tone: "bg-violet-50 text-violet-700",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Welcome + wallet */}
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
              {firstName}
            </h1>

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
                    Next consultation
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold">
                    {next.service ?? next.title} with {next.withName}
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
            ) : (
              <p className="mt-4 max-w-md text-sm text-slate-300">
                No consultations booked yet. Ask an AI Salahkar a question, or
                book a verified professional.
              </p>
            )}
          </div>
        </section>

        <Card className="flex flex-col">
          <div className="flex items-center justify-between">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <Wallet className="h-4 w-4 text-accent" /> Wallet
            </p>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground uppercase">
              Test mode
            </span>
          </div>
          <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground">
            {formatRupees(balance)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Calls are billed per minute from this balance.
          </p>
          <div className="mt-auto flex gap-2 pt-5">
            <Button
              className="flex-1"
              variant="accent"
              disabled={topping}
              onClick={() => void topUp()}
            >
              {topping ? "Opening Razorpay…" : "Add ₹500"}
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {actions.map(({ icon: Icon, title, body, onClick, href, tone }) => {
          const inner = (
            <>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="mt-4 block text-sm font-semibold text-foreground">
                {title}
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {body}
              </span>
              <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </>
          );
          const className =
            "group relative block rounded-2xl border border-border bg-white p-4 text-left transition-all hover:border-accent/30 hover:shadow-[0_12px_30px_-20px_rgba(0,20,80,0.35)] sm:p-5";
          return href ? (
            <Link key={title} href={href} className={className}>
              {inner}
            </Link>
          ) : (
            <button
              key={title}
              type="button"
              onClick={onClick}
              className={className}
            >
              {inner}
            </button>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card>
          <CardHeader
            title="Upcoming consultations"
            href="/client/dashboard/calendar"
            linkLabel="Calendar"
          />
          <div className="mt-5">
            {upcoming.length ? (
              <AppointmentList appointments={upcoming.slice(0, 4)} />
            ) : (
              <EmptyAppointments />
            )}
          </div>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader
              title="Your AI Salahkars"
              href="/client/dashboard/find?kind=ai"
              linkLabel="All"
            />
            <ul className="mt-4 space-y-3">
              {aiSalahkars.map((listing) => (
                <li key={listing.slug} className="flex items-center gap-3">
                  <ConsultantPhoto
                    src={listing.image}
                    alt=""
                    showAiBadge
                    rounded="xl"
                    className="h-10 w-10"
                    sizes="40px"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {aiConsultantName(listing)}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {listing.tagline}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openConsult(listing.slug, "chat")}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-blue/10 text-accent hover:bg-brand-blue/15"
                    aria-label={`Chat with ${aiConsultantName(listing)}`}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader
              title="Due dates"
              href="/client/dashboard/daily-digest"
              linkLabel="Digest"
            />
            <ul className="mt-4 space-y-3">
              {deadlines.map((deadline) => {
                const date = new Date(`${deadline.date}T00:00:00+05:30`);
                return (
                  <li key={deadline.id} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-[#f8f9fc] leading-none ring-1 ring-border">
                      <span className="text-sm font-semibold text-foreground">
                        {new Intl.DateTimeFormat("en-IN", {
                          day: "numeric",
                          timeZone: TZ,
                        }).format(date)}
                      </span>
                      <span className="mt-0.5 text-[9px] font-semibold text-muted-foreground uppercase">
                        {new Intl.DateTimeFormat("en-IN", {
                          month: "short",
                          timeZone: TZ,
                        }).format(date)}
                      </span>
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-foreground">
                        {deadline.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {deadline.source}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            {!digest.quiet ? (
              <p className="mt-4 flex items-start gap-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
                <CalendarClock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                Today: {digest.title}
              </p>
            ) : null}
          </Card>
        </div>
      </div>
    </div>
  );
}
