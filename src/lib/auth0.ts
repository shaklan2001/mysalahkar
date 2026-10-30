import { Auth0Client } from "@auth0/nextjs-auth0/server";

/**
 * Server-side Auth0 client. It reads AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_SECRET and
 * APP_BASE_URL from the environment, and mounts /auth/login, /auth/logout, /auth/callback and
 * /auth/access-token through src/proxy.ts.
 *
 * Access tokens are issued for the MySalahkar API (AUTH0_AUDIENCE). The browser sends them as
 * `Authorization: Bearer …` on every /api/v1 call (src/lib/api.ts).
 */
export const auth0 = new Auth0Client({
  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE,
    scope: "openid profile email offline_access",
  },
});

/** The Auth0 variables still missing from .env.local; empty once Auth0 is set up. */
export const auth0MissingEnv = (["AUTH0_DOMAIN", "AUTH0_CLIENT_ID", "AUTH0_SECRET", "APP_BASE_URL"] as const).filter(
  (name) => !process.env[name],
);

/** False until the Auth0 variables are in .env.local, so the site still renders while Auth0 is being set up. */
export const auth0Configured = auth0MissingEnv.length === 0;
