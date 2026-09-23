"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#f8fafc] p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-white p-6 shadow-xl">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Before this AI consultation
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
        <div className="mt-5 space-y-4">
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
          className="mt-6 w-full"
          disabled={!aiAck || !privacyAck}
          onClick={accept}
        >
          Start consultation
        </Button>
      </div>
    </div>
  );
}
