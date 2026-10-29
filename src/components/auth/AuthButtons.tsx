"use client";

import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthOr } from "@/components/auth/AuthFrame";
import { signInUrl, type Role } from "@/lib/auth";

type AuthButtonsProps = {
  role: Role;
  intent?: "signin" | "signup";
  /** Terms + DPDP consent ticked. Admin sign-in doesn't ask for it (admins are never created by signing in). */
  consent: boolean;
  /** In-app path to land on after signing in. */
  next: string;
  /** Runs before leaving for Auth0; return false to stay (e.g. a form field is invalid). */
  beforeRedirect?: () => boolean;
  variant?: "default" | "accent";
};

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4A7.2 7.2 0 0 1 5 12c0-.8.1-1.6.4-2.4V6.5H1.4A12 12 0 0 0 0 12c0 1.9.5 3.8 1.4 5.5l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.5l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"
      />
    </svg>
  );
}

/**
 * Email/password and Google sign-in, both through Auth0's hosted login page (a full-page redirect). Auth0 returns
 * to /signin/complete, which creates or loads the MySalahkar account and continues to `next`.
 */
export function AuthButtons({
  role,
  intent = "signin",
  consent,
  next,
  beforeRedirect,
  variant = "default",
}: AuthButtonsProps) {
  const [leaving, setLeaving] = useState<"email" | "google" | null>(null);
  const needsConsent = role !== "admin";

  function go(method: "email" | "google") {
    if (needsConsent && !consent) {
      toast.error("Please accept the Terms and DPDP consent to continue.");
      return;
    }
    if (beforeRedirect && !beforeRedirect()) return;
    setLeaving(method);
    window.location.assign(signInUrl({ role, intent, method, next, consent }));
  }

  const blocked = leaving !== null || (needsConsent && !consent);
  return (
    <div className="space-y-5">
      <Button type="button" variant={variant} className="h-11 w-full" disabled={blocked} onClick={() => go("email")}>
        <Mail className="h-4 w-4" />
        {leaving === "email"
          ? "Opening secure sign-in…"
          : intent === "signup"
            ? "Sign up with email"
            : "Continue with email"}
        {leaving === "email" ? null : <ArrowRight className="h-4 w-4" />}
      </Button>
      <AuthOr />
      <Button type="button" variant="outline" className="h-11 w-full" disabled={blocked} onClick={() => go("google")}>
        <GoogleMark />
        {leaving === "google" ? "Redirecting to Google…" : "Continue with Google"}
      </Button>
    </div>
  );
}
