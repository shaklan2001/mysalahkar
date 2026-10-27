"use client";

/**
 * Session for every role (client, professional, admin).
 *
 * Auth0 signs people in (/auth/login, a full-page redirect); the MySalahkar API then decides who they are and what
 * role they have (POST /api/v1/auth/session, GET /api/v1/me). One shared store: `useSession()` in components,
 * `getSessionUser()` in event handlers.
 */

import { useEffect, useSyncExternalStore } from "react";
import { api, ApiError } from "@/lib/api";
import { completeSignInAction } from "@/lib/completeSignInAction";

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

// ---- Role hint cookie ----
// Readable role name next to the Auth0 session: lets src/proxy.ts redirect dashboards early and lets pages skip
// /me for signed-out visitors. Never trusted: the API checks the real role on every request.

const ROLE_COOKIE = "ms_role";

function hasRoleHint(): boolean {
  return typeof document !== "undefined" && new RegExp(`(?:^|;\\s*)${ROLE_COOKIE}=`).test(document.cookie);
}

function setRoleHint(role: Role | null) {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = role
    ? `${ROLE_COOKIE}=${role}; path=/; max-age=${30 * 24 * 3600}; samesite=lax${secure}`
    : `${ROLE_COOKIE}=; path=/; max-age=0; samesite=lax${secure}`;
}

// ---- Store ----

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

/** Loads the signed-in user once (deduplicated). Resolves null when signed out. */
export function loadSession(force = false): Promise<SessionUser | null> {
  if (loading && !force) return loading;
  if (!hasRoleHint()) {
    emit({ ready: true, user: null });
    loading = Promise.resolve(null);
    return loading;
  }
  loading = api<{ user: SessionUser }>("/me")
    .then(({ user }) => {
      emit({ ready: true, user });
      return user;
    })
    .catch((error: unknown) => {
      // Auth0 session gone, or the account was disabled: forget the hint so pages stop asking.
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) setRoleHint(null);
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

// ---- Signing in and out ----

export type SignInOptions = {
  role: Role;
  /** Opens Auth0's sign-up screen instead of sign-in. */
  intent?: "signin" | "signup";
  /** Skip Auth0's screen and go straight to Google. */
  method?: "email" | "google";
  /** In-app path to land on afterwards. */
  next: string;
  /** The person ticked the Terms + DPDP consent (required to create an account). */
  consent: boolean;
};

/** Full-page URL into Auth0. Auth0 returns to /signin/complete, which finishes with the API. */
export function signInUrl({ role, intent = "signin", method = "email", next, consent }: SignInOptions): string {
  const complete = new URLSearchParams({ role, next });
  if (consent) complete.set("consent", "1");
  const params = new URLSearchParams({ returnTo: `/signin/complete?${complete.toString()}` });
  if (intent === "signup") params.set("screen_hint", "signup");
  if (method === "google") params.set("connection", "google-oauth2");
  return `/auth/login?${params.toString()}`;
}

/** After Auth0: find, link or create the MySalahkar account for this Auth0 identity, with the requested role. */
export async function completeSignIn(role: Role, consent: boolean): Promise<SessionUser> {
  const result = await completeSignInAction(role, consent);
  if (!result.ok) {
    throw new ApiError(result.status, result.message, result.field, result.code ? { code: result.code } : {});
  }
  setRoleHint(result.user.role);
  setSessionUser(result.user);
  return result.user;
}

/** Ends the Auth0 session too (full-page redirect), then lands on the home page. */
export async function signOut(): Promise<void> {
  setRoleHint(null);
  setSessionUser(null);
  window.location.assign("/auth/logout");
}

const SIGN_IN_ERRORS: Record<string, string> = {
  consent_required: "Please accept the Terms and DPDP consent, then continue.",
  email_unverified: "Please verify your email first (check your inbox for Auth0's email), then sign in again.",
  other_method: "This email is already registered with a different sign-in method. Sign out and use that one.",
  wrong_role: "This account is registered as a different account type. Use the other login.",
  not_admin: "This account doesn't have admin access.",
  disabled: "This account is disabled. Contact support@mysalahkar.com.",
  signed_out: "Your sign-in didn't complete. Please try again.",
};

/** Message for a sign-in failure code from POST /auth/session. */
export function signInErrorMessage(code: string | undefined, fallback?: string): string {
  return (code && SIGN_IN_ERRORS[code]) || fallback || "Sign-in failed. Please try again.";
}
