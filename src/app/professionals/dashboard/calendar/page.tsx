import { AppointmentsCalendar } from "@/components/dashboard/AppointmentsCalendar";
import { appointmentsForViewer } from "@/lib/data/appointments";

export default function ProCalendarPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Calendar
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upcoming client calls with Google Meet links (demo).
        </p>
      </div>
      <AppointmentsCalendar
        appointments={appointmentsForViewer("professional")}
        title="Your consultation calendar"
      />
    </div>
  );
}
