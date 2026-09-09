import type { Metadata } from "next";
import { ProDashboardShell } from "@/components/professionals/ProDashboardShell";

export const metadata: Metadata = {
  title: "Partner dashboard",
  description: "Track your AI consultant performance, leads, and earnings on My Salahkar.",
};

export default function ProDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProDashboardShell>{children}</ProDashboardShell>;
}
