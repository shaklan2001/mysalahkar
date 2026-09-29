"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LegalConsent } from "@/components/legal/LegalConsent";

const ACK_KEY = "salahkar-ai-consult-ack";

type AiConsultGateProps = {
  children: React.ReactNode;
};

export function AiConsultGate({ children }: AiConsultGateProps) {
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [aiAck, setAiAck] = useState(false);
  const [privacyAck, setPrivacyAck] = useState(false);

  useEffect(() => {
    setAllowed(sessionStorage.getItem(ACK_KEY) === "1");
    setReady(true);
  }, []);

  if (!ready) return null;
  if (allowed) return children;

  function accept() {
    sessionStorage.setItem(ACK_KEY, "1");
    setAllowed(true);
  }

  return (
    <div className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background p-4">
      <div className="bg-dots mask-hero absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute top-[-16rem] left-1/2 -z-10 h-[32rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,60,248,0.14),transparent)]"
        aria-hidden
      />
      <div className="w-full max-w-lg rounded-3xl border border-border bg-white p-6 shadow-[0_40px_80px_-40px_rgba(0,20,80,0.45)] sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-accent">
          <Sparkles className="h-5 w-5" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground">
          Before you start this AI consultation
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This is an AI consultation. Guidance is informational, may be incomplete,
          and is not a formal CA, CS, legal, or other professional opinion. Escalate
          to a human consultation for filings, attestations, or high-stakes decisions.
          See{" "}
          <Link href="/terms" target="_blank" className="font-medium text-foreground underline-offset-4 hover:underline">
            Terms
          </Link>
          .
        </p>
        <div className="mt-6 space-y-4 rounded-2xl bg-[#f8f9fc] p-4">
          <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <input
              type="checkbox"
              checked={aiAck}
              onChange={(e) => setAiAck(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-primary"
            />
            <span>
              I understand this is AI guidance, not a licensed professional opinion,
              and I will not treat it as formal advice.
            </span>
          </label>
          <LegalConsent
            id="ai-dpdp"
            checked={privacyAck}
            onChange={setPrivacyAck}
          />
        </div>
        <Button
          variant="accent"
          className="mt-6 h-11 w-full"
          disabled={!aiAck || !privacyAck}
          onClick={accept}
        >
          Start consultation
          <ArrowRight className="h-4 w-4" />
        </Button>
        <p className="mt-4 inline-flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" /> Your conversation is encrypted and never used to train AI models.
        </p>
      </div>
    </div>
  );
}
