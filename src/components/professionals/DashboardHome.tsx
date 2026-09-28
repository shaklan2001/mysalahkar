"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  MetricCards,
  PerformanceChart,
  RecentLeadsPreview,
} from "@/components/professionals/DashboardWidgets";
import { AppointmentsCalendar } from "@/components/dashboard/AppointmentsCalendar";
import { formatINR } from "@/lib/utils";
import {
  mockMetrics,
  mockProfessional,
} from "@/lib/data/professional";
import { appointmentsForViewer } from "@/lib/data/appointments";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DashboardHome({ heading = "Overview" }: { heading?: string }) {
  const searchParams = useSearchParams();
  const pro = mockProfessional;

  useEffect(() => {
    if (searchParams.get("welcome") === "1") {
      toast.success("Welcome — your partner dashboard is ready (demo data).");
    }
  }, [searchParams]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {heading}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Performance for {pro.agentName}&apos;s agent · share rate{" "}
          {Math.round(pro.shareRate * 100)}% on consultations
        </p>
      </div>

      {searchParams.get("new") === "1" ? (
        <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Create your AI Salahkar
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Your account is ready. Set up the Salahkar clients will chat with
            and call.
          </p>
          <Button asChild className="mt-4">
            <Link href="/professionals/dashboard/consultant">
              Create your AI Salahkar
            </Link>
          </Button>
        </div>
      ) : null}

      <MetricCards metrics={mockMetrics} />

      <AppointmentsCalendar
        appointments={appointmentsForViewer("professional")}
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <PerformanceChart />
        <RecentLeadsPreview />
      </div>

      <div className="grid gap-4 rounded-xl border border-border bg-white p-5 sm:grid-cols-3 sm:p-6">
        <div>
          <p className="text-xs text-muted-foreground">Gross GMV (30d)</p>
          <p className="mt-1 font-display text-xl font-semibold tracking-tight">
            {formatINR(mockMetrics.grossGmv)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Your share (30d)</p>
          <p className="mt-1 font-display text-xl font-semibold tracking-tight text-accent">
            {formatINR(mockMetrics.yourShare)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Listed fee</p>
          <p className="mt-1 font-display text-xl font-semibold tracking-tight">
            {formatINR(pro.consultationFee)}
          </p>
        </div>
      </div>
    </div>
  );
}
