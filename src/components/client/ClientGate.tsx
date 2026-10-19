"use client";

import { RoleGate } from "@/components/auth/RoleGate";

export function ClientGate({ children }: { children: React.ReactNode }) {
  return <RoleGate role="client">{children}</RoleGate>;
}
