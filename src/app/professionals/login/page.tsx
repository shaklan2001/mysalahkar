"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";
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

export default function ProfessionalLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!privacyConsent) {
      toast.error("Please accept the Terms and DPDP consent to continue.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Signed in (demo)");
    router.push("/professionals/dashboard");
  }

  return (
    <AuthFrame
      audience="professional"
      mode="signin"
      title="Professional sign in"
      description="Open your dashboard: leads, calendar, AI Salahkar and earnings."
      footer={
        <p>
          New to My Salahkar?{" "}
          <Link
            href="/professionals/signup"
            className="font-semibold text-accent hover:underline"
          >
            Create a professional account
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <AuthField
          id="email"
          name="email"
          label="Work email"
          type="email"
          icon={Mail}
          placeholder="you@yourfirm.com"
          autoComplete="email"
          required
        />
        <PasswordField
          id="password"
          name="password"
          label="Password"
          icon={Lock}
          placeholder="Your password"
          autoComplete="current-password"
          required
        />
        <LegalConsent
          id="login-dpdp"
          checked={privacyConsent}
          onChange={setPrivacyConsent}
        />
        <Button
          type="submit"
          className="h-11 w-full"
          disabled={loading || !privacyConsent}
        >
          {loading ? "Signing in…" : "Sign in to dashboard"}
          {loading ? null : <ArrowRight className="h-4 w-4" />}
        </Button>
        <AuthOr />
        <GoogleAuthButton role="professional" consent={privacyConsent} />
      </form>
    </AuthFrame>
  );
}
