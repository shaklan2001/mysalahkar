"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, KeyRound, Pencil, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type PhoneOtpFormProps = {
  role: "client" | "professional";
  consent: boolean;
  /** The Terms / DPDP checkbox, rendered above the first button. */
  consentSlot: ReactNode;
  onVerified: (phone: string) => void | Promise<void>;
  verifyLabel?: string;
};

const RESEND_SECONDS = 30;

/** Phone number → 6-digit OTP sign-in. Talks to /api/auth/otp/{send,verify}. */
export function PhoneOtpForm({
  role,
  consent,
  consentSlot,
  onVerified,
  verifyLabel = "Verify & sign in",
}: PhoneOtpFormProps) {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [devCode, setDevCode] = useState<string | null>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  const digits = phone.replace(/\D/g, "").slice(0, 10);
  const validPhone = /^[6-9]\d{9}$/.test(digits);

  useEffect(() => {
    if (resendIn <= 0) return;
    const id = window.setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [resendIn]);

  async function sendCode() {
    if (!consent) {
      toast.error("Please accept the Terms and DPDP consent to continue.");
      return;
    }
    if (!validPhone) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: digits, role }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        devCode?: string;
        retryAfter?: number;
      };
      if (!res.ok) {
        if (data.retryAfter) setResendIn(data.retryAfter);
        toast.error(data.error ?? "Couldn't send the code. Try again.");
        return;
      }
      setDevCode(data.devCode ?? null);
      setStep("code");
      setCode("");
      setResendIn(RESEND_SECONDS);
      toast.success(`Code sent to +91 ${digits}`);
      window.setTimeout(() => codeRef.current?.focus(), 50);
    } finally {
      setBusy(false);
    }
  }

  async function verify(e?: React.FormEvent) {
    e?.preventDefault();
    if (code.length !== 6) return;
    setBusy(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: digits, role, code }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast.error(data.error ?? "Couldn't verify the code.");
        setCode("");
        codeRef.current?.focus();
        return;
      }
      await onVerified(digits);
    } finally {
      setBusy(false);
    }
  }

  if (step === "phone") {
    return (
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void sendCode();
        }}
      >
        <div>
          <Label
            htmlFor={`${role}-phone`}
            className="text-[13px] font-medium text-foreground"
          >
            Mobile number
          </Label>
          <div className="mt-1.5 flex h-11 overflow-hidden rounded-lg border border-border bg-white transition-shadow focus-within:border-accent/50 focus-within:ring-3 focus-within:ring-accent/15">
            <span className="flex items-center gap-1.5 border-r border-border bg-[#f8f9fc] px-3 text-sm font-medium text-ink-soft">
              <Smartphone className="h-4 w-4 text-muted-foreground" /> +91
            </span>
            <input
              id={`${role}-phone`}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98xxx xxxxx"
              value={digits}
              onChange={(e) => setPhone(e.target.value)}
              className="min-w-0 flex-1 bg-transparent px-3 text-sm tracking-wide text-foreground outline-none placeholder:text-muted-foreground/70"
              required
            />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            We&apos;ll text a 6-digit code. Standard SMS rates may apply.
          </p>
        </div>
        {consentSlot}
        <Button
          type="submit"
          variant={role === "client" ? "accent" : "default"}
          className="h-11 w-full"
          disabled={busy || !consent || !validPhone || resendIn > 0}
        >
          {busy
            ? "Sending code…"
            : resendIn > 0
              ? `Try again in ${resendIn}s`
              : "Send OTP"}
          {busy || resendIn > 0 ? null : <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>
    );
  }

  return (
    <form className="space-y-4" onSubmit={verify}>
      <div className="flex items-center justify-between rounded-lg bg-[#f8f9fc] px-3 py-2.5 text-sm">
        <span className="text-muted-foreground">
          Code sent to{" "}
          <span className="font-semibold text-foreground">+91 {digits}</span>
        </span>
        <button
          type="button"
          onClick={() => {
            setStep("phone");
            setCode("");
          }}
          className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
        >
          <Pencil className="h-3 w-3" /> Change
        </button>
      </div>

      <div>
        <Label
          htmlFor={`${role}-otp`}
          className="text-[13px] font-medium text-foreground"
        >
          Enter 6-digit code
        </Label>
        <div className="relative mt-1.5">
          <KeyRound className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={codeRef}
            id={`${role}-otp`}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{6}"
            maxLength={6}
            placeholder="••••••"
            value={code}
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, "").slice(0, 6);
              setCode(next);
            }}
            className={cn(
              "h-12 w-full rounded-lg border border-border bg-white pr-3 pl-9 font-display text-lg font-semibold tracking-[0.5em] text-foreground outline-none transition-shadow placeholder:tracking-[0.4em] placeholder:text-muted-foreground/50 focus:border-accent/50 focus:ring-3 focus:ring-accent/15",
            )}
            required
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Code expires in 5 minutes.
          </span>
          <button
            type="button"
            disabled={resendIn > 0 || busy}
            onClick={() => void sendCode()}
            className="font-semibold text-accent hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
          >
            {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
          </button>
        </div>
      </div>

      {devCode ? (
        <p className="rounded-lg border border-dashed border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Development mode (no SMS provider yet): your code is{" "}
          <button
            type="button"
            className="font-mono font-semibold underline"
            onClick={() => setCode(devCode)}
          >
            {devCode}
          </button>
        </p>
      ) : null}

      <Button
        type="submit"
        variant={role === "client" ? "accent" : "default"}
        className="h-11 w-full"
        disabled={busy || code.length !== 6}
      >
        {busy ? "Verifying…" : verifyLabel}
        {busy ? null : <ArrowRight className="h-4 w-4" />}
      </Button>
    </form>
  );
}

/** Email / Phone switch for sign-in forms. */
export function SignInMethodSwitch({
  value,
  onChange,
}: {
  value: "email" | "phone";
  onChange: (value: "email" | "phone") => void;
}) {
  return (
    <div
      className="grid grid-cols-2 rounded-lg bg-muted p-1"
      role="tablist"
      aria-label="Sign-in method"
    >
      {(
        [
          ["email", "Email"],
          ["phone", "Phone (OTP)"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={value === id}
          onClick={() => onChange(id)}
          className={cn(
            "h-8 rounded-md text-xs font-semibold transition-colors",
            value === id
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
