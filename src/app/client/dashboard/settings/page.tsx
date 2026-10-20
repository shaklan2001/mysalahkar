"use client";

import { useEffect, useState } from "react";
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
import { useWalletBalance } from "@/lib/wallet";
import { readClientSession, signOutClient } from "@/lib/client-session";
import { api, errorMessage } from "@/lib/api";
import { setSessionUser, signOutEverywhere, useSession, type SessionUser } from "@/lib/auth";
import { formatRupees } from "@/lib/wallet";
import { SettingsSection as Section, SettingsToggle as Toggle } from "@/components/dashboard/SettingsSection";

export default function ClientSettingsPage() {
  const router = useRouter();
  const balance = useWalletBalance();
  // ClientGate only renders the dashboard in the browser once a session exists,
  // so reading it directly here is safe (the hook would start as null).
  const [name, setName] = useState(() => readClientSession()?.name ?? "");
  const [email] = useState(() => readClientSession()?.email ?? "");
  const [saving, setSaving] = useState(false);
  const [phone] = useState(() => readClientSession()?.phone);
  const { user } = useSession();
  const [reminders, setReminders] = useState(true);
  const [digestEmail, setDigestEmail] = useState(false);
  const [productNews, setProductNews] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("ms-client-notify");
      if (!raw) return;
      const saved = JSON.parse(raw) as { reminders?: boolean; digestEmail?: boolean; productNews?: boolean };
      if (typeof saved.reminders === "boolean") setReminders(saved.reminders);
      if (typeof saved.digestEmail === "boolean") setDigestEmail(saved.digestEmail);
      if (typeof saved.productNews === "boolean") setProductNews(saved.productNews);
    } catch {
      // A bad local preference is ignored; the defaults stay.
    }
  }, []);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Enter your name.");
      return;
    }
    setSaving(true);
    try {
      const { user } = await api<{ user: SessionUser }>("/me", { method: "PATCH", body: { name } });
      setSessionUser(user);
      toast.success("Profile saved");
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  function saveNotifications() {
    window.localStorage.setItem(
      "ms-client-notify",
      JSON.stringify({ reminders, digestEmail, productNews }),
    );
    toast.success("Saved on this device. Email notifications aren't sent yet.");
  }

  async function changePassword(event: React.FormEvent) {
    event.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Use at least 8 characters.");
      return;
    }
    setChangingPassword(true);
    try {
      await api("/me/password", {
        method: "POST",
        body: {
          ...(user?.hasPassword ? { currentPassword } : {}),
          newPassword,
        },
      });
      setCurrentPassword("");
      setNewPassword("");
      toast.success("Password updated.");
    } catch (error) {
      toast.error(errorMessage(error, "Could not change your password."));
    } finally {
      setChangingPassword(false);
    }
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
              readOnly
              aria-readonly="true"
              className="cursor-not-allowed text-muted-foreground"
              placeholder={phone ? "Signed in with phone" : undefined}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {phone ? (
              <>
                Signed in with <span className="font-medium text-foreground">+91 {phone}</span> (verified by OTP).
              </>
            ) : (
              "Your email is your sign-in, so it can't be changed here. Contact support to move your account."
            )}
          </p>
          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save profile"}
            </Button>
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
        <p className="mt-4 text-xs text-muted-foreground">
          These choices stay on this browser. They are not saved to your account.
        </p>
        <div className="mt-5 flex justify-end">
          <Button type="button" variant="outline" onClick={saveNotifications}>
            Save on this device
          </Button>
        </div>
      </Section>

      <Section
        icon={ShieldCheck}
        title="Password"
        description={user?.hasPassword ? "Change the password for this account." : "Add a password so you can also sign in with email."}
      >
        <form onSubmit={(event) => void changePassword(event)} className="space-y-4">
          {user?.hasPassword ? (
            <AuthField
              id="current-password"
              label="Current password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
            />
          ) : null}
          <AuthField
            id="new-password"
            label="New password"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            minLength={8}
            required
            hint="At least 8 characters"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={changingPassword}>
              {changingPassword ? "Updating…" : "Update password"}
            </Button>
          </div>
        </form>
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
            onClick={async () => {
              await signOutClient();
              router.push("/");
            }}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-border/70 pt-5">
          <div>
            <p className="text-sm font-medium text-foreground">Sign out of all devices</p>
            <p className="text-sm text-muted-foreground">
              Use this if you signed in on a shared or lost device.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              try {
                await signOutEverywhere();
                toast.success("Signed out on every device");
                router.push("/");
              } catch (error) {
                toast.error(errorMessage(error));
              }
            }}
          >
            <LogOut className="h-4 w-4" /> Sign out everywhere
          </Button>
        </div>
      </Section>
    </div>
  );
}
