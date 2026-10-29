"use client";

import { useMemo, useState } from "react";
import { LegalConsent } from "@/components/legal/LegalConsent";
import { SmartLoanCase } from "@/components/loan/SmartLoanCase";
import { SmartLoanOffer } from "@/components/loan/SmartLoanOffer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { assess, CASE_TYPES, LOAN_RULES, normalizePhone, type CaseType, type LoanOffer } from "@/lib/smart-loan";

type FormState = {
  name: string;
  phone: string;
  dateOfBirth: string;
  income: string;
  loanAmount: string;
  loanTenure: string;
  businessName: string;
};

const emptyForm: FormState = {
  name: "",
  phone: "",
  dateOfBirth: "",
  income: "",
  loanAmount: "",
  loanTenure: "24",
  businessName: "",
};

const defaultTenure: Record<CaseType, string> = { PL: "24", BL: "36", HL: "240" };

type LeadResult = { caseType: CaseType; applicant: string; offers: LoanOffer[] | null; quote: string; notice: string };

async function postSmartLoan(body: unknown) {
  let res: Response;
  try {
    res = await fetch("/api/v1/smart-loan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Can't reach My Salahkar right now. Check your connection and try again.");
  }
  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    offers?: LoanOffer[] | null;
    quote?: string;
    name?: string;
    utmLink?: string;
    notice?: string;
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
  const [caseType, setCaseType] = useState<CaseType>("PL");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [salaried, setSalaried] = useState(false);
  const [consent, setConsent] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<LeadResult | null>(null);
  const [applyingId, setApplyingId] = useState("");

  const rules = LOAN_RULES[caseType];
  const request = useMemo(
    () => ({
      caseType,
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      dateOfBirth: form.dateOfBirth,
      income: Number(form.income),
      loanAmount: Number(form.loanAmount),
      loanTenure: Number(form.loanTenure),
      ...(caseType === "BL" ? { businessName: form.businessName.trim() } : {}),
    }),
    [caseType, form],
  );
  const issues = assess(request);
  const showIssues = issues.length > 0 && Boolean(form.name || form.phone || form.dateOfBirth || form.income || form.loanAmount);

  function setField(key: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function chooseType(next: CaseType) {
    if (next === caseType) return;
    setCaseType(next);
    setForm((current) => ({ ...current, loanTenure: defaultTenure[next] }));
    setResult(null);
    setError("");
  }

  async function handleCheck(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (caseType === "PL" && !salaried) {
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
      const data = await postSmartLoan({
        action: "lead",
        ...request,
        ...(caseType === "PL" ? { salaried: true } : {}),
        consent: true,
      });
      if (!data.quote) throw new Error("The loan partner did not return a case.");
      setResult({
        caseType,
        applicant: data.name || request.name,
        offers: data.offers ?? null,
        quote: data.quote,
        notice: data.notice ?? "",
      });
    } catch (caught) {
      setResult(null);
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  async function handleChoose(offer: LoanOffer) {
    if (!result?.quote) {
      setError("Check eligibility again, then choose an offer.");
      return;
    }
    setError("");
    setApplyingId(offer.bankId);
    try {
      const data = await postSmartLoan({ action: "apply", quote: result.quote, bankId: offer.bankId });
      if (!data.utmLink?.startsWith("https://")) throw new Error("The bank did not return an application link.");
      window.location.assign(data.utmLink);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
      setApplyingId("");
    }
  }

  const offers = result?.offers ?? null;

  return (
    <div className="space-y-4">
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <form onSubmit={(event) => void handleCheck(event)} className="rounded-2xl border border-border bg-white p-6 sm:p-7">
          <div role="group" aria-label="Loan type" className="mb-5 grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
            {CASE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={caseType === type}
                onClick={() => chooseType(type)}
                className={
                  caseType === type
                    ? "rounded-md bg-white px-2 py-1.5 text-sm font-semibold shadow-sm"
                    : "rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                }
              >
                {LOAN_RULES[type].label}
              </button>
            ))}
          </div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            {caseType === "PL" ? "Check what you qualify for" : `Start your ${rules.label.toLowerCase()}`}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {caseType === "PL"
              ? "We send this to My Mudra. Banks that can lend show up on the right."
              : "We open a case with My Mudra. You can then pick a bank and upload documents."}
          </p>
          <div className="mt-6 space-y-4">
            <Field id="loan-name" label={caseType === "BL" ? "Owner / director name" : "Full name"} autoComplete="name" required value={form.name} onChange={(event) => setField("name", event.target.value)} />
            {caseType === "BL" ? (
              <Field id="loan-business" label="Business name" autoComplete="organization" required value={form.businessName} onChange={(event) => setField("businessName", event.target.value)} />
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="loan-phone" label="Mobile" inputMode="tel" autoComplete="tel" required placeholder="98xxxxxxxx" value={form.phone} onChange={(event) => setField("phone", event.target.value)} />
              <Field id="loan-dob" label="Date of birth" type="date" required value={form.dateOfBirth} onChange={(event) => setField("dateOfBirth", event.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field id="loan-income" label={rules.incomeLabel} inputMode="numeric" required value={form.income} onChange={(event) => setField("income", event.target.value.replace(/\D/g, ""))} />
              <Field id="loan-amount" label="Amount (₹)" inputMode="numeric" required value={form.loanAmount} onChange={(event) => setField("loanAmount", event.target.value.replace(/\D/g, ""))} />
              <Field id="loan-tenure" label="Tenure (months)" inputMode="numeric" required min={rules.minTenure} max={rules.maxTenure} value={form.loanTenure} onChange={(event) => setField("loanTenure", event.target.value.replace(/\D/g, "").slice(0, 3))} />
            </div>
            {caseType === "PL" ? (
              <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-primary" checked={salaried} onChange={(event) => setSalaried(event.target.checked)} />
                I am salaried. This personal-loan check uses monthly salary.
              </label>
            ) : null}
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
            {checking ? "Sending to My Mudra…" : caseType === "PL" ? "Show my offers" : "Create my case"}
          </Button>
        </form>

        <div className="space-y-4">
          {result === null ? (
            <div className="rounded-2xl border border-dashed border-border bg-white/70 p-6 text-sm text-muted-foreground">
              {caseType === "PL"
                ? "Offers appear here after the check. Each card is a bank that can lend on the amount and tenure you asked for. Choosing one opens that bank's application."
                : "Once your case is created you can pick a partner bank, track it, and upload documents here."}{" "}
              My Salahkar does not sanction the loan.
            </div>
          ) : (
            <>
              {result.notice ? (
                <p className="rounded-xl border border-border bg-white p-4 text-sm text-muted-foreground" role="status">
                  {result.notice}
                </p>
              ) : null}
              {result.caseType === "PL" && offers !== null ? (
                offers.length === 0 ? (
                  <div className="rounded-2xl border border-border bg-white p-6" role="status">
                    <h2 className="font-display text-xl font-semibold tracking-tight">No offer right now</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      None of the partner banks have a personal loan for {result.applicant || "this profile"}. A different amount or tenure can change that.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="font-display text-xl font-semibold tracking-tight">
                      {offers.length === 1 ? "1 offer" : `${offers.length} offers`} for {result.applicant}
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
                )
              ) : (
                <h2 className="font-display text-xl font-semibold tracking-tight">Case created for {result.applicant}</h2>
              )}
              <SmartLoanCase
                key={result.quote}
                quote={result.quote}
                showBankStep={result.caseType !== "PL" || offers === null || offers.length === 0}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
