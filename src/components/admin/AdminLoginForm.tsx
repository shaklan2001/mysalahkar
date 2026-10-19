"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AuthField, AuthOr, PasswordField } from "@/components/auth/AuthFrame";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { useOAuthErrorToast, useRedirectIfSignedIn } from "@/components/auth/useAuthRedirects";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/api";
import { signInWithPassword } from "@/lib/auth";
import { useAuthNext } from "@/lib/client-session";

/** Staff sign-in. Only accounts with the admin role get through; there is no admin sign-up. */
export function AdminLoginForm() {
  const router = useRouter();
  const { next } = useAuthNext("/admin/applications");
  const [loading, setLoading] = useState(false);
  useRedirectIfSignedIn("admin", next);
  useOAuthErrorToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await signInWithPassword({
        email: String(data.get("email") ?? ""),
        password: String(data.get("password") ?? ""),
        role: "admin",
      });
      router.replace(next);
    } catch (error) {
      toast.error(errorMessage(error));
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#001450] text-white">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">For My Salahkar staff. Every action is tied to your account.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <AuthField id="email" name="email" label="Email" type="email" icon={Mail} autoComplete="email" required />
          <PasswordField
            id="password"
            name="password"
            label="Password"
            icon={Lock}
            autoComplete="current-password"
            required
          />
          <Button type="submit" className="h-11 w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
            {loading ? null : <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
        <div className="mt-5 space-y-5">
          <AuthOr />
          {/* Existing admins only: the API never creates an admin through Google. */}
          <GoogleAuthButton role="admin" consent next={next} />
        </div>
      </div>
    </div>
  );
}
