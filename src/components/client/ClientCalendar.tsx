"use client";

import Link from "next/link";
import { CalendarPlus } from "lucide-react";
import {
  appointmentsForViewer,
  splitAppointments,
} from "@/lib/data/appointments";
import {
  AppointmentList,
  EmptyAppointments,
} from "@/components/client/ClientAppointments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function ClientCalendar() {
  const { upcoming, past } = splitAppointments(appointmentsForViewer("client"));

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Calendar
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every consultation with its Google Meet link. Times are in IST.
          </p>
        </div>
        <Button asChild>
          <Link href="/client/dashboard/find?kind=human">
            <CalendarPlus className="h-4 w-4" /> Book a consultation
          </Link>
        </Button>
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
            {upcoming.length ? (
              <AppointmentList appointments={upcoming} />
            ) : (
              <EmptyAppointments />
            )}
          </section>
        </TabsContent>
        <TabsContent value="past" className="mt-5">
          <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
            {past.length ? (
              <AppointmentList appointments={past} past rebookHref="/client/dashboard/find?kind=human" />
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No past consultations yet.
              </p>
            )}
          </section>
        </TabsContent>
      </Tabs>

      <p className="mt-4 text-xs text-muted-foreground">
        Demo data. Meet links open Google Meet in a new tab.
      </p>
    </div>
  );
}
