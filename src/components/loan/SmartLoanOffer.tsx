"use client";

import { ArrowRight, Check, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import type { LoanOffer } from "@/lib/smart-loan";

export function SmartLoanOffer({
  offer,
  pending,
  onChoose,
}: {
  offer: LoanOffer;
  pending: boolean;
  onChoose: (offer: LoanOffer) => void;
}) {
  const facts = [
    ["Interest", offer.interestRate || "—"],
    ["EMI", offer.emi || "—"],
    ["Amount", offer.loanAmount ? formatINR(offer.loanAmount) : "—"],
    ["Tenure", offer.loanTenure ? `${offer.loanTenure} months` : "—"],
    ...(offer.apr ? [["APR", offer.apr] as const] : []),
    ...(offer.processingFee ? [["Processing fee", offer.processingFee] as const] : []),
  ];

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-3">
        {offer.bankImg ? (
          // Partner logos are hosted wherever My Mudra points, so this is a plain img.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={offer.bankImg}
            alt=""
            className="h-10 w-16 rounded-md border border-border bg-white object-contain p-1"
          />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#001450] text-white">
            <Landmark className="h-4 w-4" aria-hidden />
          </span>
        )}
        <div>
          <h3 className="font-display text-base font-semibold tracking-tight">{offer.bankName}</h3>
          <p className="text-xs text-muted-foreground">Personal loan</p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className={label === "Interest" || label === "EMI" ? "font-semibold" : undefined}>{value}</dd>
          </div>
        ))}
      </dl>
      {offer.features.length ? (
        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          {offer.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
      ) : null}
      {offer.penalCharges ? (
        <p className="mt-3 text-xs text-muted-foreground">Late charges: {offer.penalCharges}</p>
      ) : null}
      <Button type="button" variant="accent" className="mt-5" disabled={pending} onClick={() => onChoose(offer)}>
        {pending ? "Opening the bank…" : "Choose this offer"}
        {pending ? null : <ArrowRight className="h-4 w-4" />}
      </Button>
    </article>
  );
}
