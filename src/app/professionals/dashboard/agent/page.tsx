"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockProfessional } from "@/lib/data/professional";
import { toast } from "sonner";

export default function ProAgentPage() {
  const pro = mockProfessional;
  const [form, setForm] = useState({
    agentName: pro.agentName,
    tagline: pro.tagline,
    bio: pro.bio,
    fee: String(pro.consultationFee),
    status: pro.status,
  });

  function save(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Agent profile updated (demo — not persisted yet).");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            My AI Salahkar
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Control how your AI Salahkar appears on the marketplace.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/agents">Preview marketplace</Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3 border-b border-border pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
            {form.agentName.charAt(0) || "A"}
          </div>
          <div>
            <p className="font-display font-semibold tracking-tight">
              {form.agentName || "Agent"} · {pro.domain}
            </p>
            <p className="text-xs text-muted-foreground">
              slug: {pro.agentSlug} · status{" "}
              <span className="capitalize text-accent">
                {form.status.replace("_", " ")}
              </span>
            </p>
          </div>
        </div>

        <form onSubmit={save} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="agentName">Display name</Label>
              <Input
                id="agentName"
                className="mt-1.5"
                value={form.agentName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, agentName: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="fee">Consultation fee (₹ / 30 min)</Label>
              <Input
                id="fee"
                type="number"
                className="mt-1.5"
                value={form.fee}
                onChange={(e) => setForm((f) => ({ ...f, fee: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              className="mt-1.5"
              value={form.tagline}
              onChange={(e) =>
                setForm((f) => ({ ...f, tagline: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              className="mt-1.5 min-h-[120px]"
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="status">Listing status</Label>
            <select
              id="status"
              className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  status: e.target.value as typeof form.status,
                }))
              }
            >
              <option value="live">Live</option>
              <option value="paused">Paused</option>
              <option value="pending_review">Pending review</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
