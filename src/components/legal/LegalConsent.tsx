"use client";

import Link from "next/link";

type LegalConsentProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function LegalConsent({ id, checked, onChange }: LegalConsentProps) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-primary"
      />
      <span>
        I agree to the{" "}
        <Link href="/terms" target="_blank" className="font-medium text-foreground underline-offset-4 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" target="_blank" className="font-medium text-foreground underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        , and I consent to processing of my personal data under the DPDP Act, 2023.
      </span>
    </label>
  );
}
