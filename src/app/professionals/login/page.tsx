"use client";

import { useState } from "react";
import Link from "next/link";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { AuthFrame } from "@/components/auth/AuthFrame";
import { useRedirectIfSignedIn } from "@/components/auth/useAuthRedirects";
import { useAuthNext } from "@/lib/client-session";

export default function ProfessionalLoginPage() {
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const { next } = useAuthNext("/professionals/dashboard");
  useRedirectIfSignedIn("professional", next);

  return (
    <AuthFrame
      audience="professional"
      mode="signin"
      title="Professional sign in"
      description="Open your dashboard: leads, calendar, AI Salahkar and earnings."
      footer={
        <p>
          New to My Salahkar?{" "}
          <Link href="/professionals/signup" className="font-semibold text-accent hover:underline">
            Create a professional account
          </Link>
        </p>
      }
    >
      <div className="space-y-5">
        <LegalConsent id="login-dpdp" checked={privacyConsent} onChange={setPrivacyConsent} />
        <AuthButtons role="professional" consent={privacyConsent} next={next} />
      </div>
    </AuthFrame>
  );
}
