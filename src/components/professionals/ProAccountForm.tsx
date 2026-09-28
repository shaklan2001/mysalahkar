"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      toast.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
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
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:py-24">
      <Link
        href="/professionals/login"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Professional sign in
      </Link>
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">
        Create a professional account
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Set up your login first. You create your AI Salahkar after the account
        exists.
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
          <Label htmlFor="email">Work email</Label>
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
          <Label htmlFor="phone">Mobile</Label>
          <Input id="phone" name="phone" required autoComplete="tel" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="firm">Firm / practice name</Label>
          <Input id="firm" name="firm" required className="mt-1.5" />
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
          id="pro-signup-dpdp"
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
        <GoogleAuthButton role="professional" intent="signup" consent={privacyConsent} />
      </form>
    </div>
  );
}
