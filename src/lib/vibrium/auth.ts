import { getVibriumConfig } from "./config";

let cachedToken: string | null = null;
let expiresAtMs = 0;

function hasServiceCreds(): boolean {
  try {
    const cfg = getVibriumConfig();
    return Boolean(cfg.username && cfg.password && cfg.customerId);
  } catch {
    return false;
  }
}

function tokenFresh(): boolean {
  return Boolean(cachedToken && Date.now() < expiresAtMs - 60_000);
}

export function clearTokenCache() {
  cachedToken = null;
  expiresAtMs = 0;
}

export async function mintServiceToken(): Promise<string> {
  const { apiBaseUrl, customerId, username, password } = getVibriumConfig();
  const basic = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64",
  );

  const res = await fetch(
    `${apiBaseUrl}/v1/customers/${customerId}/auth/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: "{}",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Vibrium auth failed (${res.status}): ${text}`);
  }

  const json = (await res.json()) as {
    data?: { token?: string; expires_at?: string; expiresAt?: string };
    token?: string;
  };

  const token = json.data?.token || json.token;
  if (!token) {
    throw new Error("Vibrium auth response missing token");
  }

  const expiresRaw = json.data?.expires_at || json.data?.expiresAt;
  if (expiresRaw) {
    const parsed = Date.parse(expiresRaw);
    expiresAtMs = Number.isFinite(parsed)
      ? parsed
      : Date.now() + 55 * 60 * 1000;
  } else {
    expiresAtMs = Date.now() + 55 * 60 * 1000;
  }

  cachedToken = token;
  return token;
}

export async function getBearerToken(forceRefresh = false): Promise<string> {
  if (!hasServiceCreds()) {
    throw new Error("Vibrium service account credentials are not configured");
  }
  if (!forceRefresh && tokenFresh() && cachedToken) {
    return cachedToken;
  }
  return mintServiceToken();
}

export async function vibriumFetch(
  url: string,
  init: RequestInit = {},
  retried = false,
): Promise<Response> {
  const token = await getBearerToken(retried);
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  const res = await fetch(url, { ...init, headers, cache: "no-store" });

  if (res.status === 401 && !retried) {
    clearTokenCache();
    return vibriumFetch(url, init, true);
  }

  return res;
}
