import Link from "next/link";
import {
  CalendarPlus,
  CheckCircle2,
  Clock,
  ExternalLink,
  Video,
} from "lucide-react";
import type { Appointment } from "@/lib/data/appointments";
import { cn } from "@/lib/utils";

const TZ = "Asia/Kolkata";
const dayFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  timeZone: TZ,
});
const monthFmt = new Intl.DateTimeFormat("en-IN", {
  month: "short",
  timeZone: TZ,
});
const weekdayFmt = new Intl.DateTimeFormat("en-IN", {
  weekday: "long",
  timeZone: TZ,
});
const timeFmt = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: TZ,
});

export function formatSlot(apt: Appointment) {
  const start = new Date(apt.startsAt);
  const end = new Date(start.getTime() + apt.durationMin * 60_000);
  return {
    day: dayFmt.format(start),
    month: monthFmt.format(start),
    weekday: weekdayFmt.format(start),
    time: `${timeFmt.format(start)} – ${timeFmt.format(end)}`,
  };
}

/** "Human Consultation — GST reconciliation" → "GST reconciliation" */
function cleanTitle(title: string) {
  return title.replace(/^Human Consultation\s+—\s+/, "");
}

type RowOptions = {
  past?: boolean;
  /** Whose dashboard this is: clients see the expert, professionals see the client. */
  viewer?: "client" | "professional";
  /** Past rows get a "Book again" link when set. */
  rebookHref?: string;
};

export function AppointmentRow({
  apt,
  past = false,
  viewer = "client",
  rebookHref,
}: { apt: Appointment } & RowOptions) {
  const counterpart = viewer === "professional" ? (apt.clientName ?? apt.withName) : apt.withName;
  const slot = formatSlot(apt);
  return (
    <li className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
      <div
        className={cn(
          "flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border leading-none",
          past
            ? "border-border bg-muted/60 text-muted-foreground"
            : "border-accent/20 bg-brand-blue/[0.06] text-foreground",
        )}
      >
        <span className="font-display text-lg font-semibold">{slot.day}</span>
        <span className="mt-1 text-[10px] font-semibold tracking-wide uppercase">
          {slot.month}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm font-semibold",
            past ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {cleanTitle(apt.title)}
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {slot.weekday}, {slot.time} IST
          </span>
          <span>
            with{" "}
            <span className="font-medium text-ink-soft">{counterpart}</span>
          </span>
          {apt.service ? (
            <span className="rounded bg-muted px-1.5 py-0.5 text-[11px]">
              {apt.service}
            </span>
          ) : null}
        </p>
      </div>
      {past ? (
        <div className="flex shrink-0 items-center gap-3">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
            <CheckCircle2 className="h-3.5 w-3.5" /> Completed
          </span>
          {rebookHref ? (
            <Link
              href={rebookHref}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-white px-3 text-xs font-semibold text-foreground hover:bg-muted"
            >
              <CalendarPlus className="h-3.5 w-3.5" /> Book again
            </Link>
          ) : null}
        </div>
      ) : (
        <a
          href={apt.meetUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 shrink-0 items-center gap-2 self-start rounded-md bg-[#001450] px-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#001040] sm:self-auto"
        >
          <Video className="h-3.5 w-3.5" />
          Join Meet
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      )}
    </li>
  );
}

export function AppointmentList({
  appointments,
  ...options
}: { appointments: Appointment[] } & RowOptions) {
  return (
    <ul className="divide-y divide-border/70">
      {appointments.map((apt) => (
        <AppointmentRow key={apt.id} apt={apt} {...options} />
      ))}
    </ul>
  );
}

export function EmptyAppointments({
  message = "Book a verified expert and your Meet link will appear here.",
  action = { href: "/client/dashboard/find?kind=human", label: "Find an expert" },
}: {
  message?: string;
  action?: { href: string; label: string } | null;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border px-6 py-10 text-center">
      <p className="font-display text-base font-semibold text-foreground">No consultations booked</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      {action ? (
        <Link
          href={action.href}
          className="mt-4 inline-flex h-9 items-center rounded-md bg-[#001450] px-4 text-xs font-semibold text-white hover:bg-[#001040]"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
