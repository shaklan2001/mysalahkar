"use client";

import { useSearchParams } from "next/navigation";
import { getSessionUser, hasRole, signOut, useSession, type SessionUser } from "@/lib/auth";

/** The signed-in customer, as client-facing screens need it. Null for professionals. */
export type ClientSession = {
  name: string;
  /** Empty when the client signed in with phone + OTP. */
  email: string;
  phone?: string;
};

function toClient(user: SessionUser | null): ClientSession | null {
  if (!hasRole(user, "client")) return null;
  return { name: user.name || "Client", email: user.email, ...(user.phone ? { phone: user.phone } : {}) };
}

/** Synchronous read for event handlers. The session is loaded on app start by SessionBootstrap. */
export function readClientSession(): ClientSession | null {
  return toClient(getSessionUser());
}

export function useClientSession() {
  const { ready, user } = useSession();
  return { ready, session: toClient(user) };
}

export function signOutClient(): Promise<void> {
  return signOut();
}

/** Relative in-app path only. Blocks open redirects. */
export function safeNextPath(value: string | null | undefined, fallback = "/client/dashboard") {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || value.includes("://")) {
    return fallback;
  }
  if (/^\/(client|professionals|admin)\/(login|signup)/.test(value)) return fallback;
  return value;
}

export function useAuthNext(fallback = "/client/dashboard") {
  const raw = useSearchParams().get("next");
  const next = safeNextPath(raw, fallback);
  return {
    next,
    href: (path: string) => (raw ? `${path}?next=${encodeURIComponent(next)}` : path),
  };
}
