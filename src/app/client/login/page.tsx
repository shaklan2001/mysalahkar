"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LegalConsent } from "@/components/legal/LegalConsent";

export default function ClientLoginPage() {
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
    toast.success("Signed in as client (demo)");
    router.push("/client/dashboard");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">
        Client sign in
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        View your consultations and upcoming Google Meet appointments. Demo
        accepts any credentials.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-5 rounded-xl border border-border bg-white p-6 sm:p-8"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            className="mt-1.5"
            defaultValue="client@example.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            className="mt-1.5"
            defaultValue="demo"
          />
        </div>
        <LegalConsent
          id="client-login-dpdp"
          checked={privacyConsent}
          onChange={setPrivacyConsent}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loading || !privacyConsent}
        >
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Are you a professional?{" "}
        <Link
          href="/professionals/login"
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Professional Login
        </Link>
      </p>
    </div>
  );
}
