"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const STORAGE_KEY = "mysalahkar.client";
const CHANGE_EVENT = "mysalahkar-client";

export type ClientSession = {
  name: string;
  /** Empty when the client signed in with phone + OTP. */
  email: string;
  phone?: string;
};

export function readClientSession(): ClientSession | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as { name?: unknown; email?: unknown; phone?: unknown };
    const email = typeof record.email === "string" && record.email.includes("@") ? record.email.trim() : "";
    const phone = typeof record.phone === "string" && /^[6-9]\d{9}$/.test(record.phone) ? record.phone : undefined;
    if (!email && !phone) return null;
    return {
      name: typeof record.name === "string" && record.name.trim() ? record.name.trim() : "Client",
      email,
      ...(phone ? { phone } : {}),
    };
  } catch {
    return null;
  }
}

export function signInClient(input: { name?: string; email?: string; phone?: string }) {
  const session: ClientSession = {
    name: input.name?.trim() || "Client",
    email: input.email?.trim() ?? "",
    ...(input.phone ? { phone: input.phone } : {}),
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Relative in-app path only. Blocks open redirects. */
export function safeNextPath(value: string | null | undefined, fallback = "/client/dashboard") {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || value.includes("://")) {
    return fallback;
  }
  if (value.startsWith("/client/login") || value.startsWith("/client/signup")) return fallback;
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

export function signOutClient() {
  sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useClientSession() {
  const [state, setState] = useState<{ ready: boolean; session: ClientSession | null }>({
    ready: false,
    session: null,
  });

  useEffect(() => {
    const sync = () => setState({ ready: true, session: readClientSession() });
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, []);

  return state;
}
