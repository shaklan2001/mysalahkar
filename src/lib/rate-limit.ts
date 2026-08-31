import { NextRequest, NextResponse } from "next/server";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function clientKey(req: NextRequest, scope: string): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anonymous";
  return `${scope}:${ip}`;
}

export function checkRateLimit(
  req: NextRequest,
  scope: string,
  limit: number,
  windowMs: number,
): NextResponse | null {
  const key = clientKey(req, scope);
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  existing.count += 1;
  if (existing.count > limit) {
    const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please slow down and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.max(retryAfter, 1)) },
      },
    );
  }

  return null;
}
