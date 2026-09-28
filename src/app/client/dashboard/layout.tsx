import type { Metadata } from "next";
import { ClientDashboardShell } from "@/components/client/ClientDashboardShell";
import { ClientGate } from "@/components/client/ClientGate";

export const metadata: Metadata = {
  title: "Your consultations",
  description: "Your consultations and upcoming Google Meet appointments.",
};

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientGate>
      <ClientDashboardShell>{children}</ClientDashboardShell>
    </ClientGate>
  );
}
