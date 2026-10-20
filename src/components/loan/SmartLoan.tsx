"use client";

import { useMemo, useState } from "react";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { SmartLoanOffer } from "@/components/loan/SmartLoanOffer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { assess, normalizePhone, type LoanOffer } from "@/lib/smart-loan";

type FormState = {
  name: string;
  phone: string;
  dateOfBirth: string;
  salary: string;
  loanAmount: string;
  loanTenure: string;
};

const emptyForm: FormState = {
  name: "",
  phone: "",
  dateOfBirth: "",
  salary: "",
  loanAmount: "",
  loanTenure: "24",
};

async function postSmartLoan(body: unknown) {
  let res: Response;
  try {
    res = await fetch("/api/smart-loan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Can't reach My Salahkar right now. Check your connection and try again.");
  }
  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    offers?: LoanOffer[];
    quote?: string;
    name?: string;
    utmLink?: string;
  };
  if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

function Field({
  id,
  label,
  ...props
}: { id: string; label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} className="mt-1.5" {...props} />
    </div>
  );
}

export function SmartLoan() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [salaried, setSalaried] = useState(false);
  const [consent, setConsent] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [offers, setOffers] = useState<LoanOffer[] | null>(null);
  const [applicant, setApplicant] = useState("");
  const [quote, setQuote] = useState("");
  const [applyingId, setApplyingId] = useState("");

  const request = useMemo(
    () => ({
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      dateOfBirth: form.dateOfBirth,
      salary: Number(form.salary),
      loanAmount: Number(form.loanAmount),
      loanTenure: Number(form.loanTenure),
    }),
    [form],
  );
  const issues = assess(request);
  const showIssues = issues.length > 0 && Boolean(form.name || form.phone || form.dateOfBirth || form.salary || form.loanAmount);

  function setField(key: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleCheck(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!salaried) {
      setError("This check is for salaried personal loans.");
      return;
    }
    if (!consent) {
      setError("Please accept the Terms and DPDP consent to continue.");
      return;
    }
    if (issues[0]) {
      setError(issues[0]);
      return;
    }
    setChecking(true);
    try {
      const data = await postSmartLoan({ action: "offers", ...request, salaried: true, consent: true });
      setApplicant(data.name || request.name);
      setOffers(data.offers ?? []);
      setQuote(data.quote ?? "");
    } catch (caught) {
      setOffers(null);
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  async function handleChoose(offer: LoanOffer) {
    if (!quote) {
      setError("Check eligibility again, then choose an offer.");
      return;
    }
    setError("");
    setApplyingId(offer.bankId);
    try {
      const data = await postSmartLoan({ action: "apply", quote, bankId: offer.bankId });
      if (!data.utmLink?.startsWith("https://")) throw new Error("The bank did not return an application link.");
      window.location.assign(data.utmLink);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
      setApplyingId("");
    }
  }

  return (
    <div className="space-y-4">
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <form onSubmit={(event) => void handleCheck(event)} className="rounded-2xl border border-border bg-white p-6 sm:p-7">
          <h2 className="font-display text-xl font-semibold tracking-tight">Check what you qualify for</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We send this to My Mudra. Banks that can lend show up on the right.
          </p>
          <div className="mt-6 space-y-4">
            <Field id="loan-name" label="Full name" autoComplete="name" required value={form.name} onChange={(event) => setField("name", event.target.value)} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="loan-phone" label="Mobile" inputMode="tel" autoComplete="tel" required placeholder="98xxxxxxxx" value={form.phone} onChange={(event) => setField("phone", event.target.value)} />
              <Field id="loan-dob" label="Date of birth" type="date" required value={form.dateOfBirth} onChange={(event) => setField("dateOfBirth", event.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field id="loan-salary" label="Monthly salary (₹)" inputMode="numeric" required value={form.salary} onChange={(event) => setField("salary", event.target.value.replace(/\D/g, ""))} />
              <Field id="loan-amount" label="Amount (₹)" inputMode="numeric" required value={form.loanAmount} onChange={(event) => setField("loanAmount", event.target.value.replace(/\D/g, ""))} />
              <Field id="loan-tenure" label="Tenure (months)" inputMode="numeric" required min={3} max={60} value={form.loanTenure} onChange={(event) => setField("loanTenure", event.target.value.replace(/\D/g, "").slice(0, 2))} />
            </div>
            <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <input type="checkbox" className="mt-1 h-4 w-4 accent-primary" checked={salaried} onChange={(event) => setSalaried(event.target.checked)} />
              I am salaried. This personal-loan check uses monthly salary.
            </label>
            <LegalConsent id="smart-loan-consent" checked={consent} onChange={setConsent} />
          </div>
          {showIssues ? (
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              {issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          ) : null}
          <Button type="submit" variant="accent" className="mt-6 w-full" disabled={checking}>
            {checking ? "Checking partner banks…" : "Show my offers"}
          </Button>
        </form>

        <div>
          {offers === null ? (
            <div className="rounded-2xl border border-dashed border-border bg-white/70 p-6 text-sm text-muted-foreground">
              Offers appear here after the check. Each card is a bank that can lend on the amount and tenure you asked for.
              Choosing one opens that bank&apos;s application. My Salahkar does not sanction the loan.
            </div>
          ) : offers.length === 0 ? (
            <div className="rounded-2xl border border-border bg-white p-6" role="status">
              <h2 className="font-display text-xl font-semibold tracking-tight">No offer right now</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                None of the partner banks have a personal loan for {applicant || "this profile"}. A different amount or tenure can change that.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                {offers.length === 1 ? "1 offer" : `${offers.length} offers`} for {applicant}
              </h2>
              {offers.map((offer) => (
                <SmartLoanOffer
                  key={offer.bankId}
                  offer={offer}
                  pending={applyingId === offer.bankId}
                  onChoose={(chosen) => void handleChoose(chosen)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
