import Link from "next/link";
import { AppointmentsCalendar } from "@/components/dashboard/AppointmentsCalendar";
import { appointmentsForViewer } from "@/lib/data/appointments";
import { Button } from "@/components/ui/button";

const whenFormat = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

export default function ClientDashboardPage() {
  const appointments = [...appointmentsForViewer("client")].sort((a, b) =>
    a.startsAt.localeCompare(b.startsAt),
  );
  const next = appointments[0];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Home
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your consultations and upcoming Google Meet calls.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-xs font-medium text-muted-foreground">Upcoming</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
            {appointments.length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">consultations on your calendar</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-xs font-medium text-muted-foreground">Next with</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
            {next?.withName ?? "—"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{next?.service ?? "Nothing scheduled"}</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-xs font-medium text-muted-foreground">Next time</p>
          <p className="mt-2 font-display text-lg font-semibold tracking-tight">
            {next ? whenFormat.format(new Date(next.startsAt)) : "—"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{next?.title ?? ""}</p>
        </div>
      </div>

      <AppointmentsCalendar appointments={appointments} />

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/agents">Find a professional</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/client/dashboard/calendar">Full calendar</Link>
        </Button>
      </div>
    </div>
  );
}
