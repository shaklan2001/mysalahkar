"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarPlus } from "lucide-react";
import { loadBookings } from "@/lib/bookings";
import { splitAppointments, type Appointment } from "@/lib/data/appointments";
import {
  AppointmentList,
  EmptyAppointments,
} from "@/components/client/ClientAppointments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type ScheduleViewProps = {
  viewer: "client" | "professional";
  description: string;
  /** Header button, e.g. "Book a consultation". */
  action?: { href: string; label: string };
  rebookHref?: string;
  emptyMessage?: string;
};

/** Upcoming / past consultations with Meet links — shared by both dashboards. */
export function ScheduleView({
  viewer,
  description,
  action,
  rebookHref,
  emptyMessage,
}: ScheduleViewProps) {
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadBookings(viewer)
      .then((next) => {
        if (!cancelled) setItems(next);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [viewer]);

  const { upcoming, past } = splitAppointments(items);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Calendar
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {action ? (
          <Button asChild>
            <Link href={action.href}>
              <CalendarPlus className="h-4 w-4" /> {action.label}
            </Link>
          </Button>
        ) : null}
      </div>

      <Tabs defaultValue="upcoming" className="mt-8">
        <TabsList>
          <TabsTrigger value="upcoming" className="px-4">
            Upcoming{" "}
            <span className="ml-1.5 text-muted-foreground">
              {upcoming.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="past" className="px-4">
            Past{" "}
            <span className="ml-1.5 text-muted-foreground">{past.length}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-5">
          <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading consultations…</p>
            ) : failed ? (
              <p className="text-sm text-muted-foreground">Could not load your consultations.</p>
            ) : upcoming.length ? (
              <AppointmentList appointments={upcoming} viewer={viewer} />
            ) : (
              <EmptyAppointments
                message={emptyMessage}
                action={action ?? null}
              />
            )}
          </section>
        </TabsContent>
        <TabsContent value="past" className="mt-5">
          <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
            {past.length ? (
              <AppointmentList
                appointments={past}
                past
                viewer={viewer}
                rebookHref={rebookHref}
              />
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No past consultations yet.
              </p>
            )}
          </section>
        </TabsContent>
      </Tabs>

      <p className="mt-4 text-xs text-muted-foreground">
        Times are in IST. Meet links open Google Meet in a new tab.
      </p>
    </div>
  );
}

export function ClientCalendar() {
  return (
    <ScheduleView
      viewer="client"
      description="Every consultation with its Google Meet link."
      action={{
        href: "/client/dashboard/find?kind=human",
        label: "Book a consultation",
      }}
      rebookHref="/client/dashboard/find?kind=human"
    />
  );
}
