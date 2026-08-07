"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { professionalDomains } from "@/lib/data/professional";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const steps = ["You", "Credentials", "Your agent", "Review"];

type FormState = {
  name: string;
  email: string;
  phone: string;
  firm: string;
  domain: string;
  credentials: string;
  city: string;
  membershipId: string;
  agentName: string;
  tagline: string;
  bio: string;
  fee: string;
  channels: string[];
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  firm: "",
  domain: professionalDomains[0],
  credentials: "",
  city: "",
  membershipId: "",
  agentName: "",
  tagline: "",
  bio: "",
  fee: "2500",
  channels: ["whatsapp", "chat", "call"],
};

export function SignupWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleChannel(ch: string) {
    setForm((f) => ({
      ...f,
      channels: f.channels.includes(ch)
        ? f.channels.filter((c) => c !== ch)
        : [...f.channels, ch],
    }));
  }

  function canNext() {
    if (step === 0) {
      return form.name && form.email && form.phone && form.firm;
    }
    if (step === 1) {
      return form.domain && form.credentials && form.city && form.membershipId;
    }
    if (step === 2) {
      return form.agentName && form.tagline && form.bio && form.fee && form.channels.length;
    }
    return true;
  }

  async function submit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Application submitted. Opening your dashboard…");
    setSubmitting(false);
    router.push("/professionals/dashboard?welcome=1");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link
        href="/professionals"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to for professionals
      </Link>

      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground">
        Create your AI agent
      </h1>
      <p className="mt-2 text-muted-foreground">
        A few details so we can list your agent and set up your partner dashboard.
      </p>

      <ol className="mt-8 flex gap-2">
        {steps.map((label, i) => (
          <li key={label} className="flex-1">
            <div
              className={cn(
                "h-1 rounded-full",
                i <= step ? "bg-accent" : "bg-border"
              )}
            />
            <p
              className={cn(
                "mt-2 text-xs font-medium",
                i === step ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl border border-border bg-white p-6 sm:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                className="mt-1.5"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="As on your professional certificate"
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1.5"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Mobile</Label>
                <Input
                  id="phone"
                  className="mt-1.5"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 …"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="firm">Firm / practice name</Label>
              <Input
                id="firm"
                className="mt-1.5"
                value={form.firm}
                onChange={(e) => update("firm", e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <Label htmlFor="domain">Professional domain</Label>
              <select
                id="domain"
                className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm"
                value={form.domain}
                onChange={(e) => update("domain", e.target.value)}
              >
                {professionalDomains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="credentials">Credentials</Label>
                <Input
                  id="credentials"
                  className="mt-1.5"
                  value={form.credentials}
                  onChange={(e) => update("credentials", e.target.value)}
                  placeholder="e.g. FCA, ACS, Advocate"
                />
              </div>
              <div>
                <Label htmlFor="membershipId">Membership / enrolment ID</Label>
                <Input
                  id="membershipId"
                  className="mt-1.5"
                  value={form.membershipId}
                  onChange={(e) => update("membershipId", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="city">Primary city</Label>
              <Input
                id="city"
                className="mt-1.5"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="agentName">Agent display name</Label>
                <Input
                  id="agentName"
                  className="mt-1.5"
                  value={form.agentName}
                  onChange={(e) => update("agentName", e.target.value)}
                  placeholder="Usually your first name"
                />
              </div>
              <div>
                <Label htmlFor="fee">Consultation fee (₹)</Label>
                <Input
                  id="fee"
                  type="number"
                  className="mt-1.5"
                  value={form.fee}
                  onChange={(e) => update("fee", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                className="mt-1.5"
                value={form.tagline}
                onChange={(e) => update("tagline", e.target.value)}
                placeholder="One line clients see on your listing"
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio for your agent</Label>
              <Textarea
                id="bio"
                className="mt-1.5 min-h-[110px]"
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                placeholder="Practice focus, years of experience, who you help…"
              />
            </div>
            <div>
              <Label>Channels</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  ["whatsapp", "WhatsApp"],
                  ["chat", "Chat"],
                  ["call", "Call"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleChannel(id)}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                      form.channels.includes(id)
                        ? "border-accent bg-teal-50 text-teal-900"
                        : "border-border text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {form.channels.includes(id) ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5" />
                        {label}
                      </span>
                    ) : (
                      label
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              Review your application. After submit, we verify credentials and
              provision your dashboard (demo unlocks immediately).
            </p>
            <dl className="divide-y divide-border rounded-lg border border-border">
              {[
                ["Name", form.name],
                ["Email", form.email],
                ["Firm", form.firm],
                ["Domain", form.domain],
                ["Credentials", form.credentials],
                ["Agent", form.agentName],
                ["Fee", `₹${form.fee}`],
                ["Channels", form.channels.join(", ")],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 px-4 py-3"
                >
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs leading-relaxed text-muted-foreground">
              By submitting, you agree to partner terms: verified professionals
              only, revenue share on engagements, and human escalation
              availability for your domain.
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button
              type="button"
              disabled={!canNext()}
              onClick={() => setStep((s) => s + 1)}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" disabled={submitting} onClick={submit}>
              {submitting ? "Submitting…" : "Submit & open dashboard"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
