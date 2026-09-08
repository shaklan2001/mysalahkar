"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";

export function BottomCTA() {
  const { openConsult } = useConsult();

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0a1628] px-8 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready for clearer professional advice?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
            Open a consultation with an AI Salahkar — or explore services and
            agents first.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              variant="accent"
              onClick={() => openConsult()}
            >
              Consult now
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/agents">Browse professionals</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
