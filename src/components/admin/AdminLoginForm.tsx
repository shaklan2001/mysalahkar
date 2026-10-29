"use client";

import { ShieldCheck } from "lucide-react";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { useRedirectIfSignedIn } from "@/components/auth/useAuthRedirects";
import { useAuthNext } from "@/lib/client-session";

/** Staff sign-in. Only accounts with the admin role get through; there is no admin sign-up. */
export function AdminLoginForm() {
  const { next } = useAuthNext("/admin/applications");
  useRedirectIfSignedIn("admin", next);

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#001450] text-white">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">For My Salahkar staff. Every action is tied to your account.</p>
        <div className="mt-6">
          {/* Existing admins only: the API never creates an admin by signing in. */}
          <AuthButtons role="admin" consent next={next} />
        </div>
      </div>
    </div>
  );
}
