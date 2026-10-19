import type { Metadata } from "next";
import { RoleGate } from "@/components/auth/RoleGate";
import { ProDashboardShell } from "@/components/professionals/ProDashboardShell";

export const metadata: Metadata = {
  title: "Partner dashboard",
  description:
    "Track your AI Salahkar performance, leads, and earnings on My Salahkar.",
};

export default function ProDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGate role="professional">
      <ProDashboardShell>{children}</ProDashboardShell>
    </RoleGate>
  );
}
