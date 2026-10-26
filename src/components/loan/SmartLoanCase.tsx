"use client";

import { useState } from "react";
import { Check, FileUp, Landmark, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DOCUMENT_LABELS, DOCUMENT_MAX_BYTES, type CaseBank, type PartnerBank } from "@/lib/smart-loan";

type Reply = { error?: string; banks?: PartnerBank[] | CaseBank[]; uploaded?: string };

async function send(body: BodyInit, json: boolean): Promise<Reply> {
  let res: Response;
  try {
    res = await fetch("/api/smart-loan", {
      method: "POST",
      headers: json ? { "Content-Type": "application/json" } : undefined,
      body,
    });
  } catch {
    throw new Error("Can't reach My Salahkar right now. Check your connection and try again.");
  }
  const data = (await res.json().catch(() => ({}))) as Reply;
  if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

const selectClass =
  "mt-1.5 h-10 w-full rounded-md border border-input bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Steps after the lead exists: optional bank, tracking, then documents. */
export function SmartLoanCase({ quote, showBankStep }: { quote: string; showBankStep: boolean }) {
  const [error, setError] = useState("");
  const [banks, setBanks] = useState<PartnerBank[] | null>(null);
  const [bankId, setBankId] = useState("");
  const [tracked, setTracked] = useState<CaseBank[] | null>(null);
  const [busy, setBusy] = useState<"" | "banks" | "add" | "track" | "upload">("");
  const [docLabel, setDocLabel] = useState<string>(DOCUMENT_LABELS[0]);
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [fileKey, setFileKey] = useState(0);

  async function run(step: typeof busy, work: () => Promise<void>) {
    setError("");
    setBusy(step);
    try {
      await work();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setBusy("");
    }
  }

  const loadBanks = () =>
    run("banks", async () => {
      const data = await send(JSON.stringify({ action: "banks", quote }), true);
      setBanks((data.banks as PartnerBank[]) ?? []);
    });

  const addBank = () =>
    run("add", async () => {
      if (!bankId) throw new Error("Choose a bank from the list.");
      const data = await send(JSON.stringify({ action: "addBank", quote, bankId }), true);
      setTracked((data.banks as CaseBank[]) ?? []);
    });

  const track = () =>
    run("track", async () => {
      const data = await send(JSON.stringify({ action: "track", quote }), true);
      setTracked((data.banks as CaseBank[]) ?? []);
    });

  const upload = (event: React.FormEvent) => {
    event.preventDefault();
    void run("upload", async () => {
      if (!file) throw new Error("Attach a file to upload.");
      if (file.size > DOCUMENT_MAX_BYTES) throw new Error("Files must be 10 MB or smaller.");
      const form = new FormData();
      form.set("quote", quote);
      form.set("fileName", docLabel);
      form.set("file", file);
      const data = await send(form, false);
      setUploaded((current) => [...current, data.uploaded ?? docLabel]);
      setFile(null);
      setFileKey((key) => key + 1);
    });
  };

  return (
    <div className="space-y-4">
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      {showBankStep ? (
        <section className="rounded-2xl border border-border bg-white p-5">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
            <Landmark className="h-4 w-4 text-accent" aria-hidden /> Choose a bank
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">Optional. Your case goes to the bank you pick, and you can track it here.</p>
          {banks === null ? (
            <Button type="button" variant="outline" className="mt-4" disabled={busy === "banks"} onClick={() => void loadBanks()}>
              {busy === "banks" ? "Loading banks…" : "Show partner banks"}
            </Button>
          ) : banks.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No partner banks are available right now.</p>
          ) : (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <Label htmlFor="case-bank">Bank</Label>
                <select id="case-bank" className={selectClass} value={bankId} onChange={(event) => setBankId(event.target.value)}>
                  <option value="">Select a bank</option>
                  {banks.map((bank) => (
                    <option key={bank.bankId} value={bank.bankId}>
                      {bank.bankName}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="button" variant="accent" disabled={busy === "add" || !bankId} onClick={() => void addBank()}>
                {busy === "add" ? "Adding…" : "Add bank"}
              </Button>
            </div>
          )}
        </section>
      ) : null}

      {tracked !== null || !showBankStep ? (
        <section className="rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-base font-semibold tracking-tight">Loan tracking</h3>
            <Button type="button" variant="ghost" size="sm" disabled={busy === "track"} onClick={() => void track()}>
              <RefreshCw className={busy === "track" ? "h-4 w-4 animate-spin" : "h-4 w-4"} aria-hidden />
              {tracked === null ? "Check status" : "Refresh"}
            </Button>
          </div>
          {tracked === null ? null : tracked.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No bank is linked to this case yet.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {tracked.map((bank, index) => (
                <li key={`${bank.bankName}-${index}`} className="rounded-xl border border-border p-4">
                  <p className="font-semibold">{bank.bankName}</p>
                  {bank.facts.length ? (
                    <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      {bank.facts.map(([label, value]) => (
                        <div key={label}>
                          <dt className="text-xs text-muted-foreground">{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      <form onSubmit={upload} className="rounded-2xl border border-border bg-white p-5">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
          <FileUp className="h-4 w-4 text-accent" aria-hidden /> Upload documents
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">PDF, JPG, PNG or WEBP, up to 10 MB each. Sent to My Mudra for this case.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] sm:items-end">
          <div>
            <Label htmlFor="doc-label">Document</Label>
            <select id="doc-label" className={selectClass} value={docLabel} onChange={(event) => setDocLabel(event.target.value)}>
              {DOCUMENT_LABELS.map((label) => (
                <option key={label}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="doc-file">File</Label>
            <input
              key={fileKey}
              id="doc-file"
              type="file"
              accept="application/pdf,image/jpeg,image/png,image/webp"
              className="mt-1.5 block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-2 file:text-sm"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </div>
          <Button type="submit" variant="accent" disabled={busy === "upload" || !file}>
            {busy === "upload" ? "Uploading…" : "Upload"}
          </Button>
        </div>
        {uploaded.length ? (
          <ul className="mt-4 space-y-1.5 text-sm" aria-live="polite">
            {uploaded.map((label, index) => (
              <li key={`${label}-${index}`} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-accent" aria-hidden /> {label} uploaded
              </li>
            ))}
          </ul>
        ) : null}
      </form>
    </div>
  );
}
