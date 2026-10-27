"use server";

import { auth0 } from "@/lib/auth0";
import type { Role, SessionUser } from "@/lib/auth";

type SignInResult =
  | { ok: true; user: SessionUser }
  | { ok: false; status: number; message: string; code?: string; field?: string };

/**
 * Finishes sign-in on the server. The Auth0 session cookie stays HttpOnly; the ID token is sent only to the API,
 * which checks its signature before trusting the email.
 */
export async function completeSignInAction(role: Role, consent: boolean): Promise<SignInResult> {
  const session = await auth0.getSession();
  const accessToken = session?.tokenSet.accessToken;
  const idToken = session?.tokenSet.idToken;
  if (!accessToken) {
    return { ok: false, status: 401, message: "Please sign in to continue.", code: "signed_out" };
  }

  const base = process.env.APP_BASE_URL?.replace(/\/$/, "");
  if (!base) {
    return { ok: false, status: 500, message: "Sign-in is unavailable. APP_BASE_URL is not set." };
  }

  let res: Response;
  try {
    res = await fetch(`${base}/api/v1/auth/session`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ role, ...(consent ? { privacyConsent: true } : {}), ...(idToken ? { idToken } : {}) }),
      cache: "no-store",
    });
  } catch {
    return { ok: false, status: 0, message: "Can't reach MySalahkar right now. Check your connection and try again." };
  }

  const data = (await res.json().catch(() => ({}))) as { user?: SessionUser; error?: string; code?: string; field?: string };
  if (!res.ok || !data.user) {
    return {
      ok: false,
      status: res.status,
      message: typeof data.error === "string" ? data.error : "Sign-in failed. Please try again.",
      code: typeof data.code === "string" ? data.code : undefined,
      field: typeof data.field === "string" ? data.field : undefined,
    };
  }
  return { ok: true, user: data.user };
}
