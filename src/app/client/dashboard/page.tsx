import Link from "next/link";
import { AppointmentsCalendar } from "@/components/dashboard/AppointmentsCalendar";
import { appointmentsForViewer } from "@/lib/data/appointments";
import { Button } from "@/components/ui/button";

export default function ClientDashboardPage() {
  const appointments = appointmentsForViewer("client");

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upcoming human consultations with Google Meet links.
        </p>
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
