"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockProfessional } from "@/lib/data/professional";
import { toast } from "sonner";

export default function ProSettingsPage() {
  const pro = mockProfessional;

  function save(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Settings saved (demo).");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Account, payouts, and escalation preferences.
        </p>
      </div>

      <form
        onSubmit={save}
        className="space-y-5 rounded-xl border border-border bg-white p-5 sm:p-6"
      >
        <div>
          <Label htmlFor="name">Legal name</Label>
          <Input id="name" className="mt-1.5" defaultValue={pro.name} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1.5"
              defaultValue={pro.email}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" className="mt-1.5" defaultValue={pro.phone} />
          </div>
        </div>
        <div>
          <Label htmlFor="firm">Firm</Label>
          <Input id="firm" className="mt-1.5" defaultValue={pro.firm} />
        </div>
        <div>
          <Label htmlFor="bank">Payout account (UPI / bank)</Label>
          <Input
            id="bank"
            className="mt-1.5"
            placeholder="upi@bank or account ending ****4521"
            defaultValue="ananya@okhdfcbank"
          />
        </div>
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          Escalation SLA: respond to human handoffs within{" "}
          <strong className="text-foreground">4 business hours</strong>. You can
          adjust this after go-live with the partnerships team.
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save settings</Button>
        </div>
      </form>
    </div>
  );
}
