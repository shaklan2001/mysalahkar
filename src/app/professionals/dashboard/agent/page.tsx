"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  MessageSquare,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AuthField } from "@/components/auth/AuthFrame";
import { statusMeta } from "@/components/professionals/ProDashboardShell";
import { api, ApiError, errorMessage } from "@/lib/api";
import { type ProfessionalStatus } from "@/lib/data/professional";
import { cn, formatINR } from "@/lib/utils";

type ProProfile = {
  name: string;
  aiName: string | null;
  type: string;
  tagline: string;
  bio: string;
  consultationFee: number;
  status: "live" | "paused";
};

type CallItem = {
  id: string;
  mode: string;
  status: string;
  startedAt: string;
  durationSeconds?: number;
  chargedPaise: number;
};

const LISTING_NOTICE = "Your listing isn't live yet. Metrics and profile edits appear after it goes live.";

function asStatus(value: string | undefined): ProfessionalStatus {
  if (value === "live" || value === "paused") return value;
  return "draft";
}

export default function ProAgentPage() {
  const [profile, setProfile] = useState<ProProfile | null>(null);
  const [status, setStatus] = useState<ProfessionalStatus>("draft");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [consultations, setConsultations] = useState(0);
  const [escalations, setEscalations] = useState(0);
  const [rating, setRating] = useState(0);
  const [calls, setCalls] = useState<CallItem[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<{ professional: (ProProfile & { status?: string }) | null }>("/pro/me")
      .then(({ professional }) => {
        if (!professional) {
          setNotice(LISTING_NOTICE);
          return;
        }
        setProfile(professional);
        setStatus(asStatus(professional.status));
        setTagline(professional.tagline ?? "");
        setBio(professional.bio ?? "");
      })
      .catch((error: unknown) => {
        if (error instanceof ApiError && error.status === 403) setNotice(LISTING_NOTICE);
      });

    api<{ metrics: { consultations: number; escalations: number; rating: number } }>("/pro/dashboard")
      .then(({ metrics }) => {
        setConsultations(metrics.consultations);
        setEscalations(metrics.escalations);
        setRating(metrics.rating);
      })
      .catch((error: unknown) => {
        if (error instanceof ApiError && error.status === 403) setNotice(LISTING_NOTICE);
      });

    api<{ items: CallItem[] }>("/pro/calls")
      .then(({ items }) => setCalls(items))
      .catch(() => undefined);
  }, []);

  const displayName = profile?.aiName || profile?.name || "Your AI";
  const escalationRate = consultations
    ? Math.round((escalations / consultations) * 100)
    : 0;
  const canEdit = Boolean(profile);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!canEdit) return;
    if (bio.trim().length < 20) {
      toast.error("About needs at least 20 characters.");
      return;
    }
    setSaving(true);
    try {
      const { professional } = await api<{ professional: ProProfile }>("/pro/me/profile", {
        method: "PATCH",
        body: { tagline: tagline.trim(), bio: bio.trim() },
      });
      setProfile(professional);
      setTagline(professional.tagline ?? "");
      setBio(professional.bio ?? "");
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(errorMessage(error, "Could not save your profile."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            My AI Salahkar
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            How your AI Salahkar introduces itself to clients on the marketplace.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/agents?kind=ai">
            Preview marketplace <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}

      <dl className="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-white">
        {[
          ["Consultations (30d)", String(consultations)],
          ["Escalated to you", `${escalationRate}%`],
          ["Client rating", `${rating}★`],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col-reverse px-4 py-4 sm:px-6">
            <dt className="mt-0.5 text-xs text-muted-foreground">{label}</dt>
            <dd className="font-display text-xl font-semibold tracking-tight text-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form
          onSubmit={(event) => void save(event)}
          className="space-y-6 rounded-2xl border border-border bg-white p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={cn("h-1.5 w-1.5 rounded-full", statusMeta[status].dot)} />
            Listing is {statusMeta[status].label.toLowerCase()}. Fee{" "}
            {profile ? formatINR(profile.consultationFee) : "—"} per consultation.
            Status and fee are set by the partnerships team.
          </div>

          <AuthField
            id="agentName"
            label="Display name"
            value={displayName}
            readOnly
            hint="Shown on your marketplace card"
          />
          <AuthField
            id="tagline"
            label="Tagline"
            value={tagline}
            onChange={(event) => setTagline(event.target.value)}
            maxLength={200}
            disabled={!canEdit}
            hint={`${tagline.length}/200`}
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
          <div className="flex justify-end border-t border-border/70 pt-5">
            <Button type="submit" disabled={!canEdit || saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>

        <aside className="space-y-3 lg:sticky lg:top-8">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Marketplace preview
          </p>
          <article className="overflow-hidden rounded-2xl border border-accent/20 bg-white">
            <div className="h-1 bg-gradient-to-r from-[#003cf8] to-[#6f93ff]" aria-hidden />
            <div className="p-6">
              <div className="flex items-start gap-4">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent font-display text-xl font-semibold text-white">
                  {displayName.charAt(0).toUpperCase()}
                  <span className="absolute -right-1 -bottom-1 rounded-full bg-[#001450] px-1.5 py-0.5 text-[9px] font-bold text-white ring-2 ring-white">
                    AI
                  </span>
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-lg font-semibold tracking-tight text-foreground">
                      {displayName}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                      <Sparkles className="h-3 w-3" /> AI Salahkar
                    </span>
                  </div>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <span className={cn("h-1.5 w-1.5 rounded-full", statusMeta[status].dot)} />
                    {status === "live" ? "Online 24/7" : statusMeta[status].label}
                  </p>
                </div>
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {tagline || "Add a tagline so clients know what you help with."}
              </p>
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#f8f9fc] px-3 py-2 text-xs text-muted-foreground">
                <UserRound className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  Guided by{" "}
                  <span className="font-medium text-foreground">{profile?.name ?? "you"}</span>
                  {profile?.type ? `, ${profile.type}` : ""}
                </span>
              </div>
              <div className="mt-5 flex gap-2" aria-hidden>
                <span className="inline-flex h-8 items-center gap-1.5 rounded-md bg-accent px-3 text-xs font-semibold text-white">
                  <MessageSquare className="h-3.5 w-3.5" /> Chat now
                </span>
                <span className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-semibold text-foreground">
                  <Phone className="h-3.5 w-3.5" /> Voice call
                </span>
              </div>
            </div>
          </article>
        </aside>
      </div>

      <section className="rounded-2xl border border-border bg-white">
        <h2 className="border-b border-border/70 px-5 py-4 font-display text-lg font-semibold">
          Recent AI calls
        </h2>
        {calls.length ? (
          <ul className="divide-y divide-border/70">
            {calls.map((call) => (
              <li key={call.id} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                <span className="capitalize text-foreground">{call.mode}</span>
                <span className="text-muted-foreground">
                  {new Date(call.startedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                </span>
                <span className="text-muted-foreground">{call.status}</span>
                <span className="tabular-nums text-foreground">
                  {formatINR((call.chargedPaise ?? 0) / 100)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-8 text-sm text-muted-foreground">No AI calls yet.</p>
        )}
      </section>
    </div>
  );
}
