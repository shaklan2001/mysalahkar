"use client";

/**
 * Session for every role (client, professional, admin), backed by the API's httpOnly cookies.
 * One shared store: `useSession()` in components, `getSessionUser()` in event handlers.
 */

import { useEffect, useSyncExternalStore } from "react";
import { api, API_URL } from "@/lib/api";

export type Role = "client" | "professional" | "admin";

export type SessionUser = {
  id: string;
  role: Role;
  name: string;
  email: string;
  phone: string | null;
  proSlug: string | null;
  hasPassword: boolean;
  googleLinked: boolean;
  createdAt: string;
  status: "active" | "disabled";
};

export type SessionState = { ready: boolean; user: SessionUser | null };

export const ROLE_LOGIN: Record<Role, string> = {
  client: "/client/login",
  professional: "/professionals/login",
  admin: "/admin/login",
};

export const ROLE_HOME: Record<Role, string> = {
  client: "/client/dashboard",
  professional: "/professionals/dashboard",
  admin: "/admin/applications",
};

const SERVER_STATE: SessionState = { ready: false, user: null };
let state: SessionState = SERVER_STATE;
let loading: Promise<SessionUser | null> | null = null;
const listeners = new Set<() => void>();

function emit(next: SessionState) {
  state = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The API sets this role hint next to the session; without it there is no session to load. */
function hasSessionHint(): boolean {
  return typeof document !== "undefined" && /(?:^|;\s*)ms_role=/.test(document.cookie);
}

/** Loads the signed-in user once (deduplicated). Resolves null when signed out. */
export function loadSession(force = false): Promise<SessionUser | null> {
  if (loading && !force) return loading;
  if (!hasSessionHint()) {
    emit({ ready: true, user: null });
    loading = Promise.resolve(null);
    return loading;
  }
  loading = api<{ user: SessionUser }>("/me")
    .then(({ user }) => {
      emit({ ready: true, user });
      return user;
    })
    .catch(() => {
      emit({ ready: true, user: null });
      return null;
    });
  return loading;
}

export function useSession(): SessionState {
  const snapshot = useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
  useEffect(() => {
    if (!state.ready) void loadSession();
  }, []);
  return snapshot;
}

export function getSessionUser(): SessionUser | null {
  return state.user;
}

export function setSessionUser(user: SessionUser | null) {
  loading = Promise.resolve(user);
  emit({ ready: true, user });
}

/** Admin passes every role check, mirroring the API. */
export function hasRole(user: SessionUser | null, ...roles: Role[]): user is SessionUser {
  return Boolean(user && (user.role === "admin" || roles.includes(user.role)));
}

// ---- Sign-in methods ----

export async function signInWithPassword(input: { email: string; password: string; role: Role }) {
  const { user } = await api<{ user: SessionUser }>("/auth/login", { method: "POST", body: input, retry: false });
  setSessionUser(user);
  return user;
}

export async function signUpWithPassword(input: {
  role: Exclude<Role, "admin">;
  name: string;
  email: string;
  password: string;
}) {
  const { user } = await api<{ user: SessionUser }>("/auth/signup", {
    method: "POST",
    body: { ...input, privacyConsent: true },
    retry: false,
  });
  setSessionUser(user);
  return user;
}

export async function sendOtp(input: { channel: "phone" | "email"; target: string; role: Exclude<Role, "admin"> }) {
  return api<{ ok: true; devCode?: string }>("/auth/otp/send", { method: "POST", body: input, retry: false });
}

export async function verifyOtp(input: {
  channel: "phone" | "email";
  target: string;
  role: Exclude<Role, "admin">;
  code: string;
}) {
  const { user } = await api<{ user: SessionUser }>("/auth/otp/verify", {
    method: "POST",
    body: { ...input, privacyConsent: true },
    retry: false,
  });
  setSessionUser(user);
  return user;
}

/** Full-page redirect into Google OAuth (authorization code + PKCE, handled by the API). */
export function googleSignInUrl(role: Role, next?: string): string {
  const params = new URLSearchParams({ role, consent: "true" });
  if (next) params.set("next", next);
  return `${API_URL}/auth/oauth/google/start?${params.toString()}`;
}

export async function signOut() {
  await api("/auth/logout", { method: "POST", retry: false }).catch(() => undefined);
  setSessionUser(null);
}

export async function signOutEverywhere() {
  await api("/auth/logout-all", { method: "POST" });
  setSessionUser(null);
}

const OAUTH_ERRORS: Record<string, string> = {
  google_unavailable: "Google sign-in isn't set up yet. Please use email.",
  oauth_cancelled: "Google sign-in was cancelled.",
  consent_required: "Please accept the Terms and DPDP consent, then continue with Google.",
  email_unverified: "Your Google account's email isn't verified.",
  wrong_role: "This Google account is registered as a different account type. Use the other login.",
  not_admin: "This account doesn't have admin access.",
  disabled: "This account is disabled. Contact support@mysalahkar.com.",
};

/** Message for the ?error= code the API's OAuth callback redirects back with. */
export function oauthErrorMessage(code: string | null): string | null {
  if (!code) return null;
  return OAUTH_ERRORS[code] ?? "Google sign-in failed. Please try again.";
}
