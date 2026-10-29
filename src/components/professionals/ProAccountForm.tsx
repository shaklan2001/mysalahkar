"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Building2, Phone } from "lucide-react";
import { AuthField, AuthFrame } from "@/components/auth/AuthFrame";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { useRedirectIfSignedIn } from "@/components/auth/useAuthRedirects";
import { saveProDraft } from "@/lib/pro-account";

/**
 * Professional sign-up. Auth0 creates the login (email + password, or Google). Firm and mobile are kept for this
 * tab so the listing application in the dashboard starts pre-filled.
 */
export function ProAccountForm() {
  const form = useRef<HTMLFormElement>(null);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  useRedirectIfSignedIn("professional", "/professionals/dashboard");

  function keepDraft(): boolean {
    const el = form.current;
    if (!el || !el.reportValidity()) return false;
    const data = new FormData(el);
    saveProDraft({ phone: String(data.get("phone") ?? ""), firm: String(data.get("firm") ?? "") });
    return true;
  }

  return (
    <AuthFrame
      audience="professional"
      mode="signup"
      title="Create your professional account"
      description="Set up your login first. You'll verify credentials and launch your AI Salahkar from the dashboard."
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/professionals/login" className="font-semibold text-accent hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <form ref={form} onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField
            id="firm"
            name="firm"
            label="Firm / practice"
            icon={Building2}
            placeholder="Gupta & Associates"
            autoComplete="organization"
            required
          />
          <AuthField
            id="phone"
            name="phone"
            label="Mobile"
            type="tel"
            icon={Phone}
            placeholder="+91 98xxx xxxxx"
            autoComplete="tel"
            required
          />
        </div>
        <LegalConsent id="pro-signup-dpdp" checked={privacyConsent} onChange={setPrivacyConsent} />
        <AuthButtons
          role="professional"
          intent="signup"
          consent={privacyConsent}
          next="/professionals/dashboard?new=1"
          beforeRedirect={keepDraft}
        />
      </form>
    </AuthFrame>
  );
}
