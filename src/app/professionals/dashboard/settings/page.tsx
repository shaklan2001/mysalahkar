"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Building2,
  Clock,
  Landmark,
  LogOut,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthField } from "@/components/auth/AuthFrame";
import {
  SettingsSection,
  SettingsToggle,
} from "@/components/dashboard/SettingsSection";
import { mockProfessional } from "@/lib/data/professional";

export default function ProSettingsPage() {
  const router = useRouter();
  const pro = mockProfessional;
  const [escalationAlerts, setEscalationAlerts] = useState(true);
  const [newLeads, setNewLeads] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  function save(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Settings saved (demo).");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your account, payouts and how we reach you.
        </p>
      </div>

      <form onSubmit={save} className="space-y-6">
        <SettingsSection
          icon={UserRound}
          title="Profile"
          description="Shown to clients and used on invoices."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <AuthField
              id="name"
              label="Legal name"
              icon={UserRound}
              defaultValue={pro.name}
              autoComplete="name"
            />
            <AuthField
              id="firm"
              label="Firm"
              icon={Building2}
              defaultValue={pro.firm}
              autoComplete="organization"
            />
            <AuthField
              id="email"
              label="Email"
              type="email"
              icon={Mail}
              defaultValue={pro.email}
              autoComplete="email"
            />
            <AuthField
              id="phone"
              label="Phone"
              type="tel"
              icon={Phone}
              defaultValue={pro.phone}
              autoComplete="tel"
            />
          </div>
        </SettingsSection>

        <SettingsSection
          icon={Landmark}
          title="Payouts"
          description="Where your share is paid out."
        >
          <AuthField
            id="bank"
            label="Payout account (UPI or bank)"
            icon={Landmark}
            placeholder="upi@bank or account ending ****4521"
            defaultValue="ankit.gupta@okhdfcbank"
          />
        </SettingsSection>

        <SettingsSection
          icon={Clock}
          title="Escalations"
          description="When your AI Salahkar hands a client to you."
        >
          <div className="rounded-xl bg-[#f8f9fc] px-4 py-3 text-sm text-muted-foreground">
            Escalation SLA: respond to human handoffs within{" "}
            <strong className="text-foreground">4 business hours</strong>. You
            can adjust this after go-live with the partnerships team.
          </div>
          <div className="mt-4">
            <SettingsToggle
              id="escalation-alerts"
              label="Escalation alerts"
              description="Email and WhatsApp as soon as a client asks for you."
              checked={escalationAlerts}
              onChange={setEscalationAlerts}
            />
          </div>
        </SettingsSection>

        <SettingsSection
          icon={Bell}
          title="Notifications"
          description="Choose what we send you."
        >
          <div className="divide-y divide-border/70">
            <SettingsToggle
              id="new-leads"
              label="New leads"
              description="When your AI Salahkar starts a conversation that may need you."
              checked={newLeads}
              onChange={setNewLeads}
            />
            <SettingsToggle
              id="weekly-summary"
              label="Weekly earnings summary"
              description="Consultations, share and payouts every Monday."
              checked={weeklySummary}
              onChange={setWeeklySummary}
            />
          </div>
        </SettingsSection>

        <div className="flex justify-end">
          <Button type="submit">Save settings</Button>
        </div>
      </form>

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
          onClick={() => router.push("/professionals/login")}
        >
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </section>
    </div>
  );
}
