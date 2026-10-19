"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileUp,
  Bot,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { professionalDomains } from "@/lib/data/professional";
import { type ListingDocument, type ListingKind } from "@/lib/data/marketplace";
import { api, errorMessage } from "@/lib/api";
import { getSessionUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";
import { readProDraft } from "@/lib/pro-account";

const steps = [
  "You",
  "Credentials",
  "Listing type",
  "Documents",
  "Profile",
  "Review",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  firm: string;
  domain: string;
  credentials: string;
  city: string;
  membershipId: string;
  listingKind: ListingKind;
  displayName: string;
  tagline: string;
  bio: string;
  fee: string;
  documents: ListingDocument[];
  privacyConsent: boolean;
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
  listingKind: "human",
  displayName: "",
  tagline: "",
  bio: "",
  fee: "1000",
  documents: [],
  privacyConsent: false,
};

/** The API's professional types, keyed by the labels shown in the domain picker. */
const DOMAIN_TYPES: Record<string, string> = {
  "CA — Chartered Accountant": "CA",
  "CS — Company Secretary": "CS",
  "Lawyer / Advocate": "Lawyer",
  "FEMA / Cross-border": "FEMA",
  "Wealth / RIA": "Wealth Management",
  Insurance: "Insurance",
  "Real Estate": "Real Estate",
  "Insolvency (IRP/RP)": "IRP",
  "Lending / Credit": "Lending",
};

const UPLOAD_TYPES: Record<string, "application/pdf" | "image/jpeg" | "image/png"> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

function contentTypeFor(file: File) {
  return UPLOAD_TYPES[file.name.split(".").pop()?.toLowerCase() ?? ""] ?? null;
}

/** Presigned upload (S3 in production, the API's local store in dev). Returns the stored key. */
async function uploadDocument(kind: ListingDocument["kind"], file: File): Promise<string> {
  const contentType = contentTypeFor(file);
  if (!contentType) throw new Error(`${file.name}: upload a PDF, JPG or PNG.`);
  const presigned = await api<{ url: string; fields: Record<string, string>; key: string }>(
    "/applications/documents/upload-url",
    { method: "POST", body: { kind, fileName: file.name, contentType } },
  );
  const body = new FormData();
  Object.entries(presigned.fields).forEach(([name, value]) => body.append(name, value));
  body.append("file", file);
  const res = await fetch(presigned.url, { method: "POST", body });
  if (!res.ok) throw new Error(`${file.name} didn't upload. Please try again.`);
  return presigned.key;
}

const listingOptions: {
  id: ListingKind;
  title: string;
  desc: string;
  icon: typeof User;
}[] = [
  {
    id: "human",
    title: "List myself (human)",
    desc: "Clients schedule a call with you. No AI chat.",
    icon: User,
  },
  {
    id: "ai",
    title: "AI Salahkar only",
    desc: "Your branded AI handles chat and voice. You escalate when needed.",
    icon: Bot,
  },
  {
    id: "both",
    title: "AI Salahkar + myself",
    desc: "AI for instant help; clients can also schedule a human call with you.",
    icon: Users,
  },
];

export function SignupWizard({
  phase = "account",
}: {
  phase?: "account" | "consultant";
}) {
  const router = useRouter();
  const [step, setStep] = useState(phase === "consultant" ? 1 : 0);
  // Rendered behind the professional RoleGate, so the session is already loaded on first render.
  const [form, setForm] = useState<FormState>(() => {
    const user = getSessionUser();
    const draft = readProDraft();
    return {
      ...initial,
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: draft?.phone || user?.phone || "",
      firm: draft?.firm ?? "",
    };
  });
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<Partial<Record<ListingDocument["kind"], File>>>({});

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addDocument(kind: ListingDocument["kind"], file: File | null) {
    if (!file) return;
    if (!contentTypeFor(file)) {
      toast.error("Upload a PDF, JPG or PNG.");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error("Each file must be 10 MB or smaller.");
      return;
    }
    setFiles((current) => ({ ...current, [kind]: file }));
    const doc: ListingDocument = {
      id: `doc-${kind}`,
      name: file.name,
      kind,
      fileName: file.name,
    };
    setForm((f) => ({
      ...f,
      documents: [...f.documents.filter((d) => d.kind !== kind), doc],
    }));
  }

  function canNext() {
    if (step === 0) {
      return form.name && form.email && form.phone && form.firm;
    }
    if (step === 1) {
      const phoneOk = /^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10));
      return phoneOk && form.domain && form.credentials && form.city && form.membershipId;
    }
    if (step === 2) {
      return Boolean(form.listingKind);
    }
    if (step === 3) {
      return form.documents.some((d) => d.kind === "credential");
    }
    if (step === 4) {
      return form.displayName && form.tagline && form.bio && form.fee;
    }
    if (step === 5) {
      return form.privacyConsent;
    }
    return true;
  }

  async function submit() {
    if (!form.privacyConsent) {
      toast.error("Please accept the Terms and DPDP consent to continue.");
      return;
    }
    setSubmitting(true);
    try {
      const documents = [];
      for (const doc of form.documents) {
        const file = files[doc.kind];
        if (!file) continue;
        documents.push({ kind: doc.kind, key: await uploadDocument(doc.kind, file), fileName: file.name });
      }
      await api("/applications", {
        method: "POST",
        body: {
          listingKind: form.listingKind,
          phone: form.phone,
          email: form.email || undefined,
          firm: form.firm,
          domain: DOMAIN_TYPES[form.domain] ?? "CA",
          credentials: form.credentials,
          membershipId: form.membershipId,
          city: form.city,
          displayName: form.displayName,
          tagline: form.tagline,
          bio: form.bio,
          fee: Number(form.fee) || 1000,
          documents,
          privacyConsent: true,
        },
      });
      toast.success("Application submitted for review. You'll appear in Find Professionals after approval.");
      router.push("/professionals/dashboard?welcome=1&status=pending_review");
    } catch (error) {
      toast.error(errorMessage(error, "Couldn't submit your application. Please try again."));
      setSubmitting(false);
    }
  }


  return (
    <div className={phase === "consultant" ? "mx-auto max-w-3xl" : "mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"}>
      <Link
        href={phase === "consultant" ? "/professionals/dashboard" : "/"}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {phase === "consultant" ? "Back to dashboard" : "Back to home"}
      </Link>

      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground">
        {phase === "consultant"
          ? "Create your AI Salahkar"
          : "Join as a professional"}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {phase === "consultant"
          ? "Your account is ready. Choose how clients reach you, then submit credentials for review."
          : "List yourself, launch an AI Salahkar, or both. Submit credentials for superadmin review before you go live."}
      </p>
      {phase === "consultant" ? null : (
        <p className="mt-3 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/professionals/login"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      )}

      <ol className="mt-8 flex items-center gap-2" aria-label="Progress">
        {(phase === "consultant" ? steps.slice(1) : steps).map((label, i, all) => {
          const current = step - (phase === "consultant" ? 1 : 0);
          const done = i < current;
          const active = i === current;
          return (
            <li key={label} className="flex flex-1 items-center gap-2" aria-current={active ? "step" : undefined}>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  done && "bg-accent text-white",
                  active && "bg-[#001450] text-white ring-4 ring-accent/15",
                  !done && !active && "border border-border bg-white text-muted-foreground",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-xs font-medium whitespace-nowrap md:block",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
              {i < all.length - 1 ? (
                <span className={cn("h-px flex-1", done ? "bg-accent" : "bg-border")} aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-2xl border border-border bg-white p-6 sm:p-8">
        {step === 0 && (
          <div className="mb-6 space-y-4">
            <LegalConsent
              id="signup-google-dpdp"
              checked={form.privacyConsent}
              onChange={(checked) => update("privacyConsent", checked)}
            />
            <GoogleAuthButton
              role="professional"
              intent="signup"
              consent={form.privacyConsent}
            />
            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  or continue with email
                </span>
              </div>
            </div>
          </div>
        )}
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
            {phase === "consultant" ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone">Mobile</Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    className="mt-1.5"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="98xxx xxxxx"
                  />
                </div>
                <div>
                  <Label htmlFor="firm">Firm / practice name</Label>
                  <Input
                    id="firm"
                    className="mt-1.5"
                    value={form.firm}
                    onChange={(e) => update("firm", e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>
            ) : null}
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
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Choose how you want to appear on Find Professionals. Both options
              need document review and approval.
            </p>
            {listingOptions.map((opt) => {
              const Icon = opt.icon;
              const active = form.listingKind === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => update("listingKind", opt.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                    active
                      ? "border-accent bg-blue-50/60"
                      : "border-border hover:bg-muted/40",
                  )}
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>
                    <span className="block font-semibold text-foreground">
                      {opt.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {opt.desc}
                    </span>
                  </span>
                  {active && <Check className="ml-auto h-4 w-4 text-accent" />}
                </button>
              );
            })}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground">
              Upload proof for verification (PDF, JPG or PNG, up to 10 MB each).
              Only the My Salahkar review team can open these files.
            </p>
            {(
              [
                ["credential", "Professional certificate / membership card"],
                ["id_proof", "Government ID (PAN / Aadhaar)"],
                [
                  "practice_proof",
                  "Firm letterhead or practice proof (optional)",
                ],
              ] as const
            ).map(([kind, label]) => {
              const existing = form.documents.find((d) => d.kind === kind);
              return (
                <div key={kind}>
                  <Label>{label}</Label>
                  <div className="mt-1.5 flex items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border px-3 py-2 text-sm hover:bg-muted/50">
                      <FileUp className="h-4 w-4" />
                      Choose file
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          addDocument(kind, e.target.files?.[0] ?? null)
                        }
                      />
                    </label>
                    {existing ? (
                      <span className="text-sm text-foreground">
                        {existing.fileName}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {kind === "practice_proof" ? "Optional" : "Required"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="displayName">
                  {form.listingKind === "human"
                    ? "Display name"
                    : "Agent / listing name"}
                </Label>
                <Input
                  id="displayName"
                  className="mt-1.5"
                  value={form.displayName}
                  onChange={(e) => update("displayName", e.target.value)}
                  placeholder={form.name.split(" ")[0] || "Your name"}
                />
              </div>
              <div>
                <Label htmlFor="fee">Consultation fee (₹ / 30 min)</Label>
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
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                className="mt-1.5 min-h-[110px]"
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                placeholder="Practice focus, years of experience, who you help…"
              />
            </div>
            {form.listingKind === "human" && (
              <p className="rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                Clients will see <strong>Schedule a call</strong> — not instant
                AI chat.
              </p>
            )}
            {form.listingKind === "ai" && (
              <p className="rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                After approval, your AI Salahkar can be provisioned for chat and
                voice (ops step).
              </p>
            )}
            {form.listingKind === "both" && (
              <p className="rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                Clients can use AI instantly and also schedule a human call with
                you.
              </p>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              Submit for superadmin review. You won’t appear on Find
              Professionals until approved.
            </p>
            <dl className="divide-y divide-border rounded-lg border border-border">
              {[
                ["Name", form.name],
                ["Email", form.email],
                ["Firm", form.firm],
                ["Domain", form.domain],
                ["Credentials", form.credentials],
                [
                  "Listing",
                  form.listingKind === "human"
                    ? "Human only"
                    : form.listingKind === "ai"
                      ? "AI Salahkar"
                      : "AI + Human",
                ],
                ["Display name", form.displayName],
                ["Fee", `₹${form.fee}`],
                [
                  "Documents",
                  form.documents.map((d) => d.fileName).join(", ") || "—",
                ],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium text-foreground">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <LegalConsent
              id="signup-dpdp"
              checked={form.privacyConsent}
              onChange={(checked) => update("privacyConsent", checked)}
            />
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            disabled={step === (phase === "consultant" ? 1 : 0)}
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
            <Button
              type="button"
              disabled={submitting || !form.privacyConsent}
              onClick={submit}
            >
              {submitting ? "Submitting…" : "Submit for review"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
