import { NextResponse, type NextRequest } from "next/server";
import { auth0, auth0Configured } from "@/lib/auth0";

/**
 * Runs on every page request (Next 16 Proxy, formerly Middleware):
 * 1. Auth0 mounts its routes (/auth/login, /auth/logout, /auth/callback, /auth/access-token) and keeps the
 *    session cookie rolling.
 * 2. Optimistic, role-based redirects for the dashboards: signed out, or the `ms_role` hint (set by the website
 *    after /api/v1/auth/session) doesn't match → that role's login page. The hint is never trusted for data:
 *    the API checks the real user and role on every request, and RoleGate re-checks in the browser.
 */
const RULES = [
  { prefix: "/client/dashboard", roles: ["client", "admin"], login: "/client/login" },
  { prefix: "/professionals/dashboard", roles: ["professional", "admin"], login: "/professionals/login" },
  { prefix: "/admin", roles: ["admin"], login: "/admin/login" },
] as const;

export async function proxy(request: NextRequest) {
  const authResponse = auth0Configured ? await auth0.middleware(request) : NextResponse.next();
  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/auth/") || pathname === "/admin/login") return authResponse;

  const rule = RULES.find((r) => pathname === r.prefix || pathname.startsWith(`${r.prefix}/`));
  if (!rule) return authResponse;

  const session = auth0Configured ? await auth0.getSession(request) : null;
  const role = request.cookies.get("ms_role")?.value ?? "";
  if (session && (rule.roles as readonly string[]).includes(role)) return authResponse;

  const login = new URL(rule.login, request.url);
  login.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(login);
}

export const config = {
  // Everything except static assets and the MySalahkar API (/api/v1 is proxied or routed to the API itself).
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/v1/).*)"],
};
