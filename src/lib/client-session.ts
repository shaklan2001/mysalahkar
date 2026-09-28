"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mysalahkar.client";
const CHANGE_EVENT = "mysalahkar-client";

export type ClientSession = {
  name: string;
  email: string;
};

export function readClientSession(): ClientSession | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as { name?: unknown; email?: unknown };
    if (typeof record.email !== "string" || !record.email.includes("@")) return null;
    return {
      name: typeof record.name === "string" && record.name.trim() ? record.name.trim() : "Client",
      email: record.email.trim(),
    };
  } catch {
    return null;
  }
}

export function signInClient(input: { name?: string; email: string }) {
  const session: ClientSession = {
    name: input.name?.trim() || "Client",
    email: input.email.trim(),
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(CHANGE_EVENT));
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
