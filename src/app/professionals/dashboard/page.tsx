import { Suspense } from "react";
import { DashboardHome } from "@/components/professionals/DashboardHome";

export default function ProDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl text-sm text-muted-foreground">
          Loading dashboard…
        </div>
      }
    >
      <DashboardHome />
    </Suspense>
  );
}
