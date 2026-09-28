"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { signInClient } from "@/lib/client-session";

const MIN_PASSWORD_LENGTH = 8;

export default function ClientSignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!privacyConsent) {
      toast.error("Please accept the Terms and DPDP consent to continue.");
      return;
    }
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirm") ?? "");
    if (password.length < MIN_PASSWORD_LENGTH) {
      toast.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    signInClient({ name, email });
    toast.success("Client account created (demo)");
    router.push("/client/dashboard");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">
        Create a client account
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Book consultations and track upcoming appointments. Demo does not store
        your password.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-5 rounded-xl border border-border bg-white p-6 sm:p-8"
      >
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" required autoComplete="name" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete="new-password"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            name="confirm"
            type="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete="new-password"
            className="mt-1.5"
          />
        </div>
        <LegalConsent
          id="client-signup-dpdp"
          checked={privacyConsent}
          onChange={setPrivacyConsent}
        />
        <Button type="submit" className="w-full" disabled={loading || !privacyConsent}>
          {loading ? "Creating account…" : "Create account"}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">or</span>
          </div>
        </div>
        <GoogleAuthButton role="client" intent="signup" consent={privacyConsent} />
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/client/login"
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
