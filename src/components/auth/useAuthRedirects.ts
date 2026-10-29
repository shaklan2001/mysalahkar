"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasRole, useSession, type Role } from "@/lib/auth";

/** On sign-in / sign-up pages: someone already signed in with this role goes straight on. */
export function useRedirectIfSignedIn(role: Role, next: string) {
  const router = useRouter();
  const { ready, user } = useSession();
  useEffect(() => {
    if (ready && hasRole(user, role)) router.replace(next);
  }, [ready, user, role, next, router]);
}
