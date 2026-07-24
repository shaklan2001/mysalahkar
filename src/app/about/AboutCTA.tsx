"use client";

import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import { Sparkles } from "lucide-react";

export function AboutCTA() {
  const { openConsult } = useConsult();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-slate-900">
          Experience the Future of Professional Advice
        </h2>
        <p className="mb-8 text-lg text-slate-600">
          Join thousands of businesses and individuals who trust My Salahkar for instant,
          expert guidance.
        </p>
        <Button size="lg" onClick={() => openConsult()}>
          <Sparkles className="h-5 w-5" />
          Start Your First Consultation
        </Button>
      </div>
    </section>
  );
}
