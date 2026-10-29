"use client";

import { useState } from "react";
import Link from "next/link";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { AuthFrame } from "@/components/auth/AuthFrame";
import { useRedirectIfSignedIn } from "@/components/auth/useAuthRedirects";
import { useAuthNext } from "@/lib/client-session";

export default function ClientSignupPage() {
  const { next, href } = useAuthNext();
  const [privacyConsent, setPrivacyConsent] = useState(false);
  useRedirectIfSignedIn("client", next);

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
          <Link href={href("/client/login")} className="font-semibold text-accent hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <div className="space-y-5">
        <LegalConsent id="client-signup-dpdp" checked={privacyConsent} onChange={setPrivacyConsent} />
        <AuthButtons role="client" intent="signup" consent={privacyConsent} next={next} variant="accent" />
      </div>
    </AuthFrame>
  );
}
