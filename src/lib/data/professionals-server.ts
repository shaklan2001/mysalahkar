/**
 * Server-side reads of professional profiles, for page titles and descriptions only. The pages themselves load profiles
 * in the browser, so a slow or unreachable API here only costs a generic title, never the page.
 *
 * The API is reached the same way the browser reaches it: API_ORIGIN when Next.js proxies the API, otherwise this
 * site's own origin (APP_BASE_URL), where the load balancer routes /api/v1 to the API.
 */

import { toListing, type ApiProfessional, type MarketplaceListing } from "./marketplace";

const REVALIDATE_SECONDS = 300;

function apiBase(): string | null {
  const origin = (process.env.API_ORIGIN || process.env.APP_BASE_URL)?.replace(/\/$/, "");
  return origin ? `${origin}/api/v1` : null;
}

async function get<T>(path: string): Promise<T | null> {
  const base = apiBase();
  if (!base) return null;
  try {
    const res = await fetch(`${base}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(3000),
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export async function fetchProfessional(slug: string): Promise<MarketplaceListing | null> {
  const data = await get<{ professional: ApiProfessional }>(`/professionals/${encodeURIComponent(slug)}`);
  return data ? toListing(data.professional) : null;
}
