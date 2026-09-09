"use client";

import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  const { openConsult } = useConsult();

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#001450] px-8 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Experience clearer professional advice
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
            Join businesses and individuals who use My Salahkar for instant,
            expert guidance.
          </p>
          <Button
            size="lg"
            variant="accent"
            className="mt-8"
            onClick={() => openConsult()}
          >
            Start your consultation
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
