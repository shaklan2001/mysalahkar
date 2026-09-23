import type { Metadata } from "next";
import { ClientDashboardShell } from "@/components/client/ClientDashboardShell";

export const metadata: Metadata = {
  title: "Client dashboard",
  description: "Your consultations and upcoming Google Meet appointments.",
};

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientDashboardShell>{children}</ClientDashboardShell>;
}
