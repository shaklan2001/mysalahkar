/**
 * Browser client for the MySalahkar API. The API is served on this site's own origin under /api/v1 (the AWS load
 * balancer routes it, or next.config.ts rewrites it to API_ORIGIN).
 *
 * Every call carries the Auth0 access token as `Authorization: Bearer …`. The token comes from the Auth0 SDK's
 * /auth/access-token route (which refreshes it when needed) and is cached here until shortly before it expires.
 */

import { getAccessToken } from "@auth0/nextjs-auth0";

export const API_URL = "/api/v1";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly field?: string,
    readonly data: Record<string, unknown> = {},
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /** Set false to skip the one retry with a fresh token after a 401. */
  retry?: boolean;
};

// undefined = not fetched yet; null = signed out of Auth0
let cached: { token: string; expiresAt: number } | null | undefined;
let fetching: Promise<string | null> | null = null;

/** The current Auth0 access token, or null when signed out. One fetch at a time, shared by concurrent callers. */
export function accessToken(force = false): Promise<string | null> {
  const now = Date.now() / 1000;
  if (!force && cached !== undefined && (cached === null || cached.expiresAt - 60 > now)) {
    return Promise.resolve(cached?.token ?? null);
  }
  fetching ??= getAccessToken({ includeFullResponse: true })
    .then((res) => ({ token: res.token, expiresAt: res.expires_at ?? now + 300 }))
    .catch(() => null)
    .then((value) => {
      cached = value;
      fetching = null;
      return value?.token ?? null;
    });
  return fetching;
}

/** Headers for a raw fetch() to the API (streaming endpoints). */
export async function authHeaders(extra: Record<string, string> = {}): Promise<Record<string, string>> {
  const token = await accessToken();
  return token ? { ...extra, Authorization: `Bearer ${token}` } : extra;
}

export async function api<T>(path: string, { method = "GET", body, retry = true }: RequestOptions = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: await authHeaders(body === undefined ? {} : { "Content-Type": "application/json" }),
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "Can't reach MySalahkar right now. Check your connection and try again.");
  }

  if (res.status === 401 && retry && cached && (await accessToken(true))) {
    return api<T>(path, { method, body, retry: false });
  }

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const message = typeof data.error === "string" ? data.error : "Something went wrong. Please try again.";
    throw new ApiError(res.status, message, typeof data.field === "string" ? data.field : undefined, data);
  }
  return data as T;
}

export function errorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  return error instanceof Error && error.message ? error.message : fallback;
}
