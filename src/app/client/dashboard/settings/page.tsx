"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ExternalLink,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthField } from "@/components/auth/AuthFrame";
import { useWalletBalance } from "@/components/client/ClientHome";
import {
  readClientSession,
  signInClient,
  signOutClient,
} from "@/lib/client-session";
import { formatRupees } from "@/lib/wallet";
import { SettingsSection as Section, SettingsToggle as Toggle } from "@/components/dashboard/SettingsSection";

export default function ClientSettingsPage() {
  const router = useRouter();
  const balance = useWalletBalance();
  // ClientGate only renders the dashboard in the browser once a session exists,
  // so reading it directly here is safe (the hook would start as null).
  const [name, setName] = useState(() => readClientSession()?.name ?? "");
  const [email, setEmail] = useState(() => readClientSession()?.email ?? "");
  const [reminders, setReminders] = useState(true);
  const [digestEmail, setDigestEmail] = useState(false);
  const [productNews, setProductNews] = useState(false);

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter a valid email.");
      return;
    }
    signInClient({ name, email });
    toast.success("Profile saved");
  }

  function saveNotifications() {
    toast.success(
      reminders
        ? "Preferences saved. Reminders on."
        : "Preferences saved. Reminders off.",
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your profile, how we contact you, and your privacy choices.
        </p>
      </div>

      <Section
        icon={UserRound}
        title="Profile"
        description="How professionals see you when you book."
      >
        <form onSubmit={saveProfile} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AuthField
              id="name"
              label="Full name"
              icon={UserRound}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
            <AuthField
              id="email"
              label="Email"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save profile</Button>
          </div>
        </form>
      </Section>

      <Section
        icon={Bell}
        title="Notifications"
        description="Choose what we send you."
      >
        <div className="divide-y divide-border/70">
          <Toggle
            id="reminders"
            label="Consultation reminders"
            description="An email before each Google Meet consultation."
            checked={reminders}
            onChange={setReminders}
          />
          <Toggle
            id="digest-email"
            label="Daily Digest by email"
            description="The morning summary of GST, CBDT, MCA, SEBI and RBI updates."
            checked={digestEmail}
            onChange={setDigestEmail}
          />
          <Toggle
            id="product-news"
            label="Product updates"
            description="Occasional news about new features."
            checked={productNews}
            onChange={setProductNews}
          />
        </div>
        <div className="mt-5 flex justify-end">
          <Button type="button" variant="outline" onClick={saveNotifications}>
            Save preferences
          </Button>
        </div>
      </Section>

      <Section
        icon={Wallet}
        title="Wallet"
        description="Consultation calls are billed per minute from this balance."
      >
        <div className="flex flex-col gap-4 rounded-xl bg-[#f8f9fc] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Current balance</p>
            <p className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-foreground">
              {formatRupees(balance)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground sm:max-w-xs sm:text-right">
            Top up any time from the wallet button in the top bar. Razorpay test
            mode.
          </p>
        </div>
      </Section>

      <Section
        icon={ShieldCheck}
        title="Privacy & data"
        description="Your rights under the DPDP Act, 2023."
      >
        <ul className="space-y-3 text-sm">
          <li className="flex items-center justify-between gap-4">
            <span className="text-ink-soft">Read how we handle your data</span>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
            >
              Privacy policy <ExternalLink className="h-3 w-3" />
            </Link>
          </li>
          <li className="flex items-center justify-between gap-4">
            <span className="text-ink-soft">
              Access, correct or erase your data
            </span>
            <a
              href="mailto:privacy@mysalahkar.com"
              className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
            >
              privacy@mysalahkar.com
            </a>
          </li>
        </ul>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/70 pt-5">
          <div>
            <p className="text-sm font-medium text-foreground">Sign out</p>
            <p className="text-sm text-muted-foreground">
              End your session on this browser.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              signOutClient();
              router.push("/");
            }}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </Section>
    </div>
  );
}
