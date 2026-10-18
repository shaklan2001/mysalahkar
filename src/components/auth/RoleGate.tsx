"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { hasRole, ROLE_LOGIN, useSession, type Role } from "@/lib/auth";

/**
 * Renders children only for a signed-in user with `role` (admins pass every gate); everyone else is sent
 * to that role's login with ?next= back here. UI convenience only: the API enforces every permission.
 */
export function RoleGate({ role, children }: { role: Role; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { ready, user } = useSession();
  const allowed = hasRole(user, role);

  useEffect(() => {
    if (!ready || allowed) return;
    const next = `${pathname}${window.location.search}`;
    router.replace(`${ROLE_LOGIN[role]}?next=${encodeURIComponent(next)}`);
  }, [ready, allowed, pathname, role, router]);

  if (!ready || !allowed) return null;
  return children;
}
