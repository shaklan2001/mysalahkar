import { Calendar, ExternalLink, Video } from "lucide-react";
import { splitAppointments, type Appointment } from "@/lib/data/appointments";

type AppointmentsCalendarProps = {
  appointments: Appointment[];
  title?: string;
};

function formatSlot(iso: string, durationMin: number) {
  const start = new Date(iso);
  const end = new Date(start.getTime() + durationMin * 60_000);
  const day = start.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const time = `${start.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })} – ${end.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  return { day, time };
}

export function AppointmentsCalendar({
  appointments,
  title = "Upcoming appointments",
}: AppointmentsCalendarProps) {
  const sorted = splitAppointments(appointments).upcoming;

  return (
    <section className="rounded-xl border border-border bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-accent" />
        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Google Meet links for booked human consultations (demo).
      </p>

      {sorted.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          No upcoming appointments.
        </p>
      ) : (
        <ul className="mt-5 divide-y divide-border">
          {sorted.map((apt) => {
            const { day, time } = formatSlot(apt.startsAt, apt.durationMin);
            return (
              <li
                key={apt.id}
                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {apt.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {day} · {time} IST · with {apt.withName}
                    {apt.service ? ` · ${apt.service}` : ""}
                  </p>
                </div>
                <a
                  href={apt.meetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-[#f8fafb] px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
                >
                  <Video className="h-3.5 w-3.5 text-accent" />
                  Join Meet
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
