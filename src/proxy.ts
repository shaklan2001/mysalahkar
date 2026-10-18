import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic, role-based redirects for the dashboards (Next 16 Proxy, formerly Middleware).
 * Reads only the `ms_role` hint cookie the API sets next to the session; it is never trusted for data.
 * The API checks the real session and role on every request, and RoleGate re-checks in the browser.
 */
const RULES = [
  { prefix: "/client/dashboard", roles: ["client", "admin"], login: "/client/login" },
  { prefix: "/professionals/dashboard", roles: ["professional", "admin"], login: "/professionals/login" },
  { prefix: "/admin", roles: ["admin"], login: "/admin/login" },
] as const;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  const rule = RULES.find((r) => pathname === r.prefix || pathname.startsWith(`${r.prefix}/`));
  if (!rule) return NextResponse.next();

  const role = request.cookies.get("ms_role")?.value ?? "";
  if ((rule.roles as readonly string[]).includes(role)) return NextResponse.next();

  const login = new URL(rule.login, request.url);
  login.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/client/dashboard/:path*", "/professionals/dashboard/:path*", "/admin/:path*"],
};
