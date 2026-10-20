"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Clock,
  Landmark,
  LogOut,
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthField } from "@/components/auth/AuthFrame";
import {
  SettingsSection,
  SettingsToggle,
} from "@/components/dashboard/SettingsSection";
import { api, ApiError, errorMessage } from "@/lib/api";
import { signOut, useSession } from "@/lib/auth";

const NOTIFY_KEY = "ms-pro-notify";

type NotifyPrefs = {
  escalationAlerts: boolean;
  newLeads: boolean;
  weeklySummary: boolean;
};

type ProProfile = {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  availability: string;
  languages: string[];
};

const DEFAULT_PREFS: NotifyPrefs = {
  escalationAlerts: true,
  newLeads: true,
  weeklySummary: false,
};

function readPrefs(): NotifyPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(NOTIFY_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<NotifyPrefs>;
    return { ...DEFAULT_PREFS, ...parsed };
  } catch {
    return DEFAULT_PREFS;
  }
}

export default function ProSettingsPage() {
  const router = useRouter();
  const { user } = useSession();
  const [tagline, setTagline] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [languages, setLanguages] = useState("");
  const [bio, setBio] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [prefs, setPrefs] = useState<NotifyPrefs>(DEFAULT_PREFS);

  useEffect(() => {
    setPrefs(readPrefs());
    api<{ user: { name: string; email: string }; professional: ProProfile | null }>("/pro/me")
      .then(({ professional }) => {
        if (!professional) {
          setNotice("Profile edits open after your listing is live.");
          return;
        }
        setCanEdit(true);
        setTagline(professional.tagline ?? "");
        setLocation(professional.location ?? "");
        setAvailability(professional.availability ?? "");
        setLanguages((professional.languages ?? []).join(", "));
        setBio(professional.bio ?? "");
      })
      .catch((error: unknown) => {
        if (error instanceof ApiError && error.status === 403) {
          setNotice("Profile edits open after your listing is live.");
        }
      });
  }, []);

  async function saveProfile(event: React.FormEvent) {
    event.preventDefault();
    if (!canEdit) return;
    if (bio.trim().length < 20) {
      toast.error("About needs at least 20 characters.");
      return;
    }
    const languageList = languages
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 10);
    setSaving(true);
    try {
      await api("/pro/me/profile", {
        method: "PATCH",
        body: {
          tagline: tagline.trim(),
          location: location.trim(),
          availability: availability.trim(),
          languages: languageList,
          bio: bio.trim(),
        },
      });
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(errorMessage(error, "Could not save your profile."));
    } finally {
      setSaving(false);
    }
  }

  function saveNotifications() {
    window.localStorage.setItem(NOTIFY_KEY, JSON.stringify(prefs));
    toast.success("Saved on this device. Notification delivery isn't connected yet.");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your public profile and how this browser reminds you.
        </p>
      </div>

      {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}

      <form onSubmit={(event) => void saveProfile(event)} className="space-y-6">
        <SettingsSection
          icon={UserRound}
          title="Profile"
          description="Shown on your marketplace listing."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <AuthField
              id="name"
              label="Name"
              icon={UserRound}
              value={user?.name ?? ""}
              readOnly
            />
            <AuthField
              id="email"
              label="Email"
              type="email"
              icon={Mail}
              value={user?.email ?? ""}
              readOnly
            />
            <AuthField
              id="location"
              label="Location"
              icon={MapPin}
              value={location}
              disabled={!canEdit}
              onChange={(event) => setLocation(event.target.value)}
              maxLength={80}
            />
            <AuthField
              id="availability"
              label="Availability"
              icon={Clock}
              value={availability}
              disabled={!canEdit}
              onChange={(event) => setAvailability(event.target.value)}
              maxLength={100}
            />
          </div>
          <div className="mt-4 space-y-4">
            <AuthField
              id="tagline"
              label="Tagline"
              value={tagline}
              disabled={!canEdit}
              onChange={(event) => setTagline(event.target.value)}
              maxLength={200}
            />
            <AuthField
              id="languages"
              label="Languages"
              value={languages}
              disabled={!canEdit}
              onChange={(event) => setLanguages(event.target.value)}
              hint="Comma-separated, up to 10"
            />
            <div>
              <Label htmlFor="bio" className="text-[13px] font-medium text-foreground">
                About
              </Label>
              <textarea
                id="bio"
                rows={5}
                value={bio}
                disabled={!canEdit}
                onChange={(event) => setBio(event.target.value)}
                className="mt-1.5 w-full resize-y rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-accent/50 focus:ring-3 focus:ring-accent/15 disabled:cursor-not-allowed disabled:text-muted-foreground"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button type="submit" disabled={!canEdit || saving}>
              {saving ? "Saving…" : "Save profile"}
            </Button>
          </div>
        </SettingsSection>
      </form>

      <SettingsSection
        icon={Landmark}
        title="Payouts"
        description="Where your share is paid out."
      >
        <p className="text-sm text-muted-foreground">
          Payout accounts are arranged with the partnerships team. This page does not store bank details.
        </p>
      </SettingsSection>

      <SettingsSection
        icon={Bell}
        title="Notifications"
        description="Stored on this device only."
      >
        <div className="divide-y divide-border/70">
          <SettingsToggle
            id="escalation-alerts"
            label="Escalation alerts"
            description="A reminder on this browser when a client asks for you."
            checked={prefs.escalationAlerts}
            onChange={(escalationAlerts) => setPrefs((current) => ({ ...current, escalationAlerts }))}
          />
          <SettingsToggle
            id="new-leads"
            label="New leads"
            description="A reminder on this browser for new conversations."
            checked={prefs.newLeads}
            onChange={(newLeads) => setPrefs((current) => ({ ...current, newLeads }))}
          />
          <SettingsToggle
            id="weekly-summary"
            label="Weekly earnings summary"
            description="A local reminder. Email summaries are not sent yet."
            checked={prefs.weeklySummary}
            onChange={(weeklySummary) => setPrefs((current) => ({ ...current, weeklySummary }))}
          />
        </div>
        <div className="mt-5 flex justify-end">
          <Button type="button" variant="outline" onClick={saveNotifications}>
            Save on this device
          </Button>
        </div>
      </SettingsSection>

      <section className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-sm font-medium text-foreground">Sign out</p>
          <p className="text-sm text-muted-foreground">
            Leave the partner dashboard on this browser.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            void signOut().then(() => router.push("/professionals/login"));
          }}
        >
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </section>
    </div>
  );
}
