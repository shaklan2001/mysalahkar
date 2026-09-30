"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowRight,
  Building2,
  Lock,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import {
  AuthField,
  AuthFrame,
  AuthOr,
  PasswordField,
} from "@/components/auth/AuthFrame";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { Button } from "@/components/ui/button";
import { saveProAccount } from "@/lib/pro-account";

const MIN_PASSWORD_LENGTH = 8;

export function ProAccountForm() {
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
    const phone = String(data.get("phone") ?? "");
    const firm = String(data.get("firm") ?? "");
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
    saveProAccount({ name, email, phone, firm });
    toast.success("Account created");
    router.push("/professionals/dashboard?new=1");
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
          <Link
            href="/professionals/login"
            className="font-semibold text-accent hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField
            id="name"
            name="name"
            label="Full name"
            icon={UserRound}
            placeholder="CA Ananya Mehta"
            autoComplete="name"
            required
          />
          <AuthField
            id="firm"
            name="firm"
            label="Firm / practice"
            icon={Building2}
            placeholder="Mehta & Associates"
            autoComplete="organization"
            required
          />
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
          id="pro-signup-dpdp"
          checked={privacyConsent}
          onChange={setPrivacyConsent}
        />
        <Button
          type="submit"
          className="h-11 w-full"
          disabled={loading || !privacyConsent}
        >
          {loading ? "Creating account…" : "Create account"}
          {loading ? null : <ArrowRight className="h-4 w-4" />}
        </Button>
        <AuthOr />
        <GoogleAuthButton
          role="professional"
          intent="signup"
          consent={privacyConsent}
        />
      </form>
    </AuthFrame>
  );
}
