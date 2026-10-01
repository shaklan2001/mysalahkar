"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
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
import {
  readClientSession,
  signInClient,
  useAuthNext,
} from "@/lib/client-session";

export default function ClientLoginPage() {
  const router = useRouter();
  const { next, href } = useAuthNext();
  const [loading, setLoading] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [method, setMethod] = useState<"email" | "phone">("email");

  useEffect(() => {
    if (readClientSession()) router.replace(next);
  }, [next, router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!privacyConsent) {
      toast.error("Please accept the Terms and DPDP consent to continue.");
      return;
    }
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    signInClient({ name: "Nishant", email });
    toast.success("Signed in");
    router.replace(next);
  }

  const consent = (
    <LegalConsent
      id="client-login-dpdp"
      checked={privacyConsent}
      onChange={setPrivacyConsent}
    />
  );

  return (
    <AuthFrame
      audience="client"
      mode="signin"
      title="Welcome back"
      description="Sign in to your consultations, bookings and wallet."
      switchHrefs={{ client: href("/client/login") }}
      footer={
        <p>
          New to My Salahkar?{" "}
          <Link
            href={href("/client/signup")}
            className="font-semibold text-accent hover:underline"
          >
            Create a free account
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
              label="Email"
              type="email"
              icon={Mail}
              placeholder="you@company.com"
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
              variant="accent"
              className="h-11 w-full"
              disabled={loading || !privacyConsent}
            >
              {loading ? "Signing in…" : "Sign in"}
              {loading ? null : <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        ) : (
          <PhoneOtpForm
            role="client"
            consent={privacyConsent}
            consentSlot={consent}
            onVerified={(phone) => {
              signInClient({ name: "Nishant", phone });
              toast.success("Signed in");
              router.replace(next);
            }}
          />
        )}

        <AuthOr />
        <GoogleAuthButton role="client" consent={privacyConsent} />
      </div>
    </AuthFrame>
  );
}
