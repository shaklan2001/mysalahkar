"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";

export function HeroSection() {
  const { openConsult } = useConsult();

  return (
    <section className="relative overflow-hidden border-b border-border/70">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.04em] text-accent">
            My Salahkar
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem]">
            Expert professional advice — on WhatsApp, chat, or call.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            AI Salahkars for CA, CS, Legal, FEMA, Wealth and more. Available
            24/7, with human escalation when complexity demands it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => openConsult()}>
              Start a consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">Browse services</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-accent" />
              WhatsApp
            </span>
            <span className="inline-flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-accent" />
              Chat
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              Voice call
            </span>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(14,116,144,0.12),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(15,118,110,0.1),transparent_50%)]"
            aria-hidden
          />
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_60px_-28px_rgba(10,22,40,0.35)]">
            <div className="flex items-center justify-between border-b border-border/80 bg-[#001450] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#003cf8] text-xs font-bold text-white">
                  A
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Arjun · CA</p>
                  <p className="text-[11px] text-blue-300/90">Online · Tax &amp; GST</p>
                </div>
              </div>
              <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white/70">
                Live
              </span>
            </div>
            <div className="space-y-3 bg-[#f8fafb] p-4 sm:p-5">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm text-white">
                Do I need to file GSTR-1 this month if turnover is under 1.5 Cr?
              </div>
              <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-border bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink-soft">
                If you&apos;re on the QRMP scheme, GSTR-1 is quarterly — but
                Invoice Furnishing Facility (IFF) still applies monthly for
                B2B. I can check your scheme and due dates.
              </div>
              <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-border bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink-soft">
                Share your GSTIN (or last return type) and I&apos;ll map the
                exact calendar for this quarter.
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-border/80 bg-white px-4 py-3">
              <div className="h-9 flex-1 rounded-md border border-border bg-muted/50 px-3 text-sm leading-9 text-muted-foreground">
                Ask about GST, ITR, ROC…
              </div>
              <Button size="sm" onClick={() => openConsult()}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
