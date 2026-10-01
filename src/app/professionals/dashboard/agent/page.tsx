"use client";

import { useState } from "react";
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
import {
  mockMetrics,
  mockProfessional,
  type ProfessionalStatus,
} from "@/lib/data/professional";
import { cn } from "@/lib/utils";

const STATUSES: ProfessionalStatus[] = [
  "live",
  "paused",
  "pending_review",
  "draft",
];

export default function ProAgentPage() {
  const pro = mockProfessional;
  const [form, setForm] = useState({
    agentName: pro.agentName,
    tagline: pro.tagline,
    bio: pro.bio,
    fee: String(pro.consultationFee),
    status: pro.status,
  });
  const aiName = `${form.agentName || "Your"} AI`;
  const escalationRate = Math.round(
    (mockMetrics.escalations / mockMetrics.consultations) * 100,
  );

  function save(e: React.FormEvent) {
    e.preventDefault();
    toast.success("AI Salahkar updated (demo — not saved yet).");
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            My AI Salahkar
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            How your AI Salahkar introduces itself to clients on the
            marketplace.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/agents?kind=ai">
            Preview marketplace <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      <dl className="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-white">
        {[
          ["Consultations (30d)", String(mockMetrics.consultations)],
          ["Escalated to you", `${escalationRate}%`],
          ["Client rating", `${mockMetrics.rating}★`],
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
          onSubmit={save}
          className="space-y-6 rounded-2xl border border-border bg-white p-5 sm:p-6"
        >
          <div>
            <Label className="text-[13px] font-medium text-foreground">
              Listing status
            </Label>
            <div
              className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4"
              role="radiogroup"
              aria-label="Listing status"
            >
              {STATUSES.map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={form.status === value}
                  onClick={() => setForm((f) => ({ ...f, status: value }))}
                  className={cn(
                    "inline-flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-semibold transition-colors",
                    form.status === value
                      ? "border-[#001450] bg-[#001450] text-white"
                      : "border-border bg-white text-ink-soft hover:border-accent/40",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      statusMeta[value].dot,
                    )}
                  />
                  {statusMeta[value].label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Paused Salahkars stay listed but don&apos;t accept new chats or
              calls.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <AuthField
              id="agentName"
              label="Display name"
              value={form.agentName}
              onChange={(e) =>
                setForm((f) => ({ ...f, agentName: e.target.value }))
              }
              hint={`Shown as “${aiName}”`}
            />
            <AuthField
              id="fee"
              label="Your fee (₹ per 30 min)"
              type="number"
              min={0}
              value={form.fee}
              onChange={(e) => setForm((f) => ({ ...f, fee: e.target.value }))}
              hint="For human consultations booked with you"
            />
          </div>
          <AuthField
            id="tagline"
            label="Tagline"
            value={form.tagline}
            onChange={(e) =>
              setForm((f) => ({ ...f, tagline: e.target.value }))
            }
            maxLength={80}
            hint={`${form.tagline.length}/80`}
          />
          <div>
            <Label
              htmlFor="bio"
              className="text-[13px] font-medium text-foreground"
            >
              About
            </Label>
            <textarea
              id="bio"
              rows={5}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className="mt-1.5 w-full resize-y rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-accent/50 focus:ring-3 focus:ring-accent/15"
            />
          </div>
          <div className="flex justify-end border-t border-border/70 pt-5">
            <Button type="submit">Save changes</Button>
          </div>
        </form>

        {/* Live preview */}
        <aside className="space-y-3 lg:sticky lg:top-8">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Marketplace preview
          </p>
          <article className="overflow-hidden rounded-2xl border border-accent/20 bg-white">
            <div
              className="h-1 bg-gradient-to-r from-[#003cf8] to-[#6f93ff]"
              aria-hidden
            />
            <div className="p-6">
              <div className="flex items-start gap-4">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent font-display text-xl font-semibold text-white">
                  {(form.agentName || "A").charAt(0).toUpperCase()}
                  <span className="absolute -right-1 -bottom-1 rounded-full bg-[#001450] px-1.5 py-0.5 text-[9px] font-bold text-white ring-2 ring-white">
                    AI
                  </span>
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-lg font-semibold tracking-tight text-foreground">
                      {aiName}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                      <Sparkles className="h-3 w-3" /> AI Salahkar
                    </span>
                  </div>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        statusMeta[form.status].dot,
                      )}
                    />
                    {form.status === "live"
                      ? "Online 24/7"
                      : statusMeta[form.status].label}
                  </p>
                </div>
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {form.tagline ||
                  "Add a tagline so clients know what you help with."}
              </p>
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#f8f9fc] px-3 py-2 text-xs text-muted-foreground">
                <UserRound className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  Guided by{" "}
                  <span className="font-medium text-foreground">
                    {pro.name}
                  </span>
                  , {pro.domain}
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
          <p className="text-xs text-muted-foreground">
            Updates as you type. Clients see this card in Find professionals.
          </p>
        </aside>
      </div>
    </div>
  );
}
