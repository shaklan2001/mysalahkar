"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type ScheduleCallDialogProps = {
  professionalName: string;
  professionalSlug: string;
  triggerLabel?: string;
  triggerVariant?: "default" | "outline" | "secondary";
  triggerSize?: "default" | "sm" | "lg";
  triggerClassName?: string;
};

export function ScheduleCallDialog({
  professionalName,
  professionalSlug,
  triggerLabel = "Schedule a call",
  triggerVariant = "default",
  triggerSize = "sm",
  triggerClassName,
}: ScheduleCallDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    note: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          agentSlug: professionalSlug,
          type: "booking",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(`Call requested with ${professionalName}. We'll confirm shortly.`);
      setOpen(false);
      setForm({ name: "", email: "", phone: "", preferredTime: "", note: "" });
    } catch {
      toast.error("Could not submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        variant={triggerVariant}
        size={triggerSize}
        className={triggerClassName}
        onClick={() => setOpen(true)}
      >
        <Calendar className="mr-2 h-4 w-4" />
        {triggerLabel}
      </Button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/40"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-xl">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Schedule a call with {professionalName}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              A human specialist will confirm your slot. This is not an instant AI call.
            </p>
            <form onSubmit={submit} className="mt-5 space-y-3">
              <div>
                <Label htmlFor="sch-name">Your name</Label>
                <Input
                  id="sch-name"
                  className="mt-1.5"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="sch-email">Email</Label>
                  <Input
                    id="sch-email"
                    type="email"
                    className="mt-1.5"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="sch-phone">Phone</Label>
                  <Input
                    id="sch-phone"
                    className="mt-1.5"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="sch-time">Preferred time</Label>
                <Input
                  id="sch-time"
                  className="mt-1.5"
                  placeholder="e.g. Tue after 4pm IST"
                  value={form.preferredTime}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, preferredTime: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="sch-note">What do you need help with?</Label>
                <Textarea
                  id="sch-note"
                  className="mt-1.5"
                  rows={3}
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={submitting}>
                  {submitting ? "Submitting…" : "Request call"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
