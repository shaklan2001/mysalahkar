"use client";

import { useState } from "react";
import Link from "next/link";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { AuthFrame } from "@/components/auth/AuthFrame";
import { useRedirectIfSignedIn } from "@/components/auth/useAuthRedirects";
import { useAuthNext } from "@/lib/client-session";

export default function ClientLoginPage() {
  const { next, href } = useAuthNext();
  const [privacyConsent, setPrivacyConsent] = useState(false);
  useRedirectIfSignedIn("client", next);

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
          <Link href={href("/client/signup")} className="font-semibold text-accent hover:underline">
            Create a free account
          </Link>
        </p>
      }
    >
      <div className="space-y-5">
        <LegalConsent id="client-login-dpdp" checked={privacyConsent} onChange={setPrivacyConsent} />
        <AuthButtons role="client" consent={privacyConsent} next={next} variant="accent" />
      </div>
    </AuthFrame>
  );
}
