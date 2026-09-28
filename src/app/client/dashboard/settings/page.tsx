"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ClientSettingsPage() {
  const [reminders, setReminders] = useState(true);

  function save(e: React.FormEvent) {
    e.preventDefault();
    toast.success(reminders ? "Reminders on." : "Reminders off.");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Appointment reminders for this demo session.
        </p>
      </div>
      <form
        onSubmit={save}
        className="space-y-5 rounded-xl border border-border bg-white p-5 sm:p-6"
      >
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={reminders}
            onChange={(e) => setReminders(e.target.checked)}
          />
          <span>
            <Label className="font-medium">Email reminders</Label>
            <span className="mt-1 block text-muted-foreground">
              A reminder before each Google Meet consultation.
            </span>
          </span>
        </label>
        <div className="flex justify-end">
          <Button type="submit">Save settings</Button>
        </div>
      </form>
    </div>
  );
}
