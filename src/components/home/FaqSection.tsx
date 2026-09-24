"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Are these real professionals or AI?",
    a: "My Salahkar agents are AI specialists trained on professional domains (CA, CS, Legal, FEMA, Wealth, and more). For high-stakes or complex matters, you can escalate to a human expert with your conversation context.",
  },
  {
    q: "How do WhatsApp, chat, and call work?",
    a: "Start a consultation from the site. You can continue in-app chat, open WhatsApp with a prepared context, or simulate a voice call. The same agent persona stays with you across channels.",
  },
  {
    q: "Is my data secure?",
    a: "Consultations are treated as confidential professional conversations. See our Security and Privacy pages for encryption, access controls, and DPDP-oriented practices.",
  },
  {
    q: "What does a consultation cost?",
    a: "Agent profiles show indicative consultation fees. First-time users can start with a guided consult from the dock — pricing and packages can be confirmed during onboarding.",
  },
  {
    q: "Can I get help with company incorporation or GST?",
    a: "Yes. Browse Services for business setup, income tax, GST, trademark, FEMA, ROC secretarial, and 137 other services from our official catalogue — each as AI Consultation or Human Consultation.",
  },
  {
    q: "Can I join as a professional and sell my own agent?",
    a: "Yes. Practising CAs, CS, lawyers, and advisors can create a branded AI Salahkar, list services, and earn a revenue share on consultations and conversions. See For Professionals to apply and open the partner dashboard.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-border/70 bg-white/70 section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              FAQ
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
              Answers before you start.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Clear expectations on agents, channels, security, and services.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {faqs.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen ? (
                    <p className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
