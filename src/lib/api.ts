/**
 * Browser client for the MySalahkar API (backend/). The API is served on this site's own origin under /api/v1
 * (the AWS load balancer routes it, or next.config.ts rewrites it to API_ORIGIN), so session cookies are
 * first-party. A 401 triggers one silent refresh, then the request is retried.
 */

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
  /** Set false for auth endpoints so a 401 isn't retried through /auth/refresh. */
  retry?: boolean;
};

let refreshing: Promise<boolean> | null = null;

/** One refresh at a time, shared by every request that hit a 401 together. */
export function refreshSession(): Promise<boolean> {
  refreshing ??= fetch(`${API_URL}/auth/refresh`, { method: "POST", credentials: "include" })
    .then((res) => res.ok)
    .catch(() => false)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

export async function api<T>(path: string, { method = "GET", body, retry = true }: RequestOptions = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      credentials: "include",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, "Can't reach MySalahkar right now. Check your connection and try again.");
  }

  if (res.status === 401 && retry && (await refreshSession())) {
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
