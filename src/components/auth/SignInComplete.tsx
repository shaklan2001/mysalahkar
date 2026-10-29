"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";
import { completeSignIn, ROLE_HOME, ROLE_LOGIN, signInErrorMessage, signOut, type Role } from "@/lib/auth";
import { safeNextPath } from "@/lib/client-session";

const ROLES: readonly Role[] = ["client", "professional", "admin"];
const OTHER_LOGIN: Partial<Record<Role, { href: string; label: string }>> = {
  client: { href: ROLE_LOGIN.professional, label: "Go to the professional login" },
  professional: { href: ROLE_LOGIN.client, label: "Go to the client login" },
};

/** Where Auth0 sends people back to: turns the Auth0 sign-in into a MySalahkar session, then moves on. */
export function SignInComplete() {
  const params = useSearchParams();
  const router = useRouter();
  const started = useRef(false);
  const [error, setError] = useState<{ code?: string; message: string } | null>(null);

  const requested = params.get("role");
  const role: Role = ROLES.includes(requested as Role) ? (requested as Role) : "client";
  const next = safeNextPath(params.get("next"), ROLE_HOME[role]);
  const consent = params.get("consent") === "1";

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    completeSignIn(role, consent)
      .then(() => router.replace(next))
      .catch((err: unknown) => {
        const code = err instanceof ApiError && typeof err.data.code === "string" ? err.data.code : undefined;
        setError({ code, message: signInErrorMessage(code, err instanceof ApiError ? err.message : undefined) });
      });
  }, [role, consent, next, router]);

  if (!error) {
    return (
      <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center gap-3 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Signing you in…
      </div>
    );
  }

  const other = error.code === "wrong_role" ? OTHER_LOGIN[role] : undefined;
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <AlertCircle className="h-5 w-5" />
        </span>
        <h1 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
          We couldn&apos;t sign you in
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex flex-col gap-3">
          {other ? (
            <Button asChild>
              <Link href={other.href}>{other.label}</Link>
            </Button>
          ) : null}
          <Button type="button" variant="outline" onClick={() => void signOut()}>
            <LogOut className="h-4 w-4" /> Sign out and try another account
          </Button>
        </div>
      </div>
    </div>
  );
}
