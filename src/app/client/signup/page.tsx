"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import {
  AuthField,
  AuthFrame,
  AuthOr,
  PasswordField,
} from "@/components/auth/AuthFrame";
import { signInClient, useAuthNext } from "@/lib/client-session";

const MIN_PASSWORD_LENGTH = 8;

export default function ClientSignupPage() {
  const router = useRouter();
  const { next, href } = useAuthNext();
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
      toast.error(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      );
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
    router.replace(next);
  }

  return (
    <AuthFrame
      audience="client"
      mode="signup"
      title="Create your client account"
      description="Free to join. Consult AI Salahkars, book verified professionals and track your compliance."
      switchHrefs={{ client: href("/client/signup") }}
      footer={
        <p>
          Already have an account?{" "}
          <Link
            href={href("/client/login")}
            className="font-semibold text-accent hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <AuthField
          id="name"
          name="name"
          label="Full name"
          icon={UserRound}
          placeholder="Nishant"
          autoComplete="name"
          required
        />
        <AuthField
          id="email"
          name="email"
          label="Email"
          type="email"
          icon={Mail}
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <PasswordField
            id="password"
            name="password"
            label="Password"
            icon={Lock}
            hint={`At least ${MIN_PASSWORD_LENGTH} characters`}
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete="new-password"
            required
          />
          <PasswordField
            id="confirm"
            name="confirm"
            label="Confirm password"
            icon={Lock}
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete="new-password"
            required
          />
        </div>
        <LegalConsent
          id="client-signup-dpdp"
          checked={privacyConsent}
          onChange={setPrivacyConsent}
        />
        <Button
          type="submit"
          variant="accent"
          className="h-11 w-full"
          disabled={loading || !privacyConsent}
        >
          {loading ? "Creating account…" : "Create account"}
          {loading ? null : <ArrowRight className="h-4 w-4" />}
        </Button>
        <AuthOr />
        <GoogleAuthButton
          role="client"
          intent="signup"
          consent={privacyConsent}
        />
      </form>
    </AuthFrame>
  );
}
