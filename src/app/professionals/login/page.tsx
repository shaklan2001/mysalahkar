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
  useOAuthErrorToast,
  useRedirectIfSignedIn,
} from "@/components/auth/useAuthRedirects";
import { errorMessage } from "@/lib/api";
import { signInWithPassword } from "@/lib/auth";
import { useAuthNext } from "@/lib/client-session";
import {
  PhoneOtpForm,
  SignInMethodSwitch,
} from "@/components/auth/PhoneOtpForm";
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
  const [method, setMethod] = useState<"email" | "phone">("email");
  const { next } = useAuthNext("/professionals/dashboard");
  useRedirectIfSignedIn("professional", next);
  useOAuthErrorToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!privacyConsent) {
      toast.error("Please accept the Terms and DPDP consent to continue.");
      return;
    }
    const data = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await signInWithPassword({
        email: String(data.get("email") ?? ""),
        password: String(data.get("password") ?? ""),
        role: "professional",
      });
      toast.success("Signed in");
      router.replace(next);
    } catch (error) {
      toast.error(errorMessage(error));
      setLoading(false);
    }
  }

  const consent = (
    <LegalConsent
      id="login-dpdp"
      checked={privacyConsent}
      onChange={setPrivacyConsent}
    />
  );

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
      <div className="space-y-5">
        <SignInMethodSwitch value={method} onChange={setMethod} />

        {method === "email" ? (
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
            {consent}
            <Button
              type="submit"
              className="h-11 w-full"
              disabled={loading || !privacyConsent}
            >
              {loading ? "Signing in…" : "Sign in to dashboard"}
              {loading ? null : <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        ) : (
          <PhoneOtpForm
            role="professional"
            consent={privacyConsent}
            consentSlot={consent}
            verifyLabel="Verify & open dashboard"
            onVerified={() => {
              toast.success("Signed in");
              router.replace(next);
            }}
          />
        )}

        <AuthOr />
        <GoogleAuthButton role="professional" consent={privacyConsent} />
      </div>
    </AuthFrame>
  );
}
