import { AppointmentsCalendar } from "@/components/dashboard/AppointmentsCalendar";
import { appointmentsForViewer } from "@/lib/data/appointments";

export default function ClientCalendarPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Calendar
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All upcoming appointments with Meet join links.
        </p>
      </div>
      <AppointmentsCalendar
        appointments={appointmentsForViewer("client")}
        title="Your schedule"
      />
    </div>
  );
}
