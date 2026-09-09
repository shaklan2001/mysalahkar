"use client";

import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import { TrendingUp, ArrowRight } from "lucide-react";

export function PremiumPromo() {
  const { openConsult } = useConsult();

  return (
    <section className="bg-gradient-to-r from-[#001450] via-[#002080] to-[#003cf8] py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <TrendingUp className="h-4 w-4" />
            Premium Advisory
          </div>
          
          <h2 className="mb-6 text-3xl font-extrabold leading-tight md:text-5xl">
            Expert Financial Advisory, Powered by AI Intelligence
          </h2>
          
          <p className="mb-8 text-lg leading-relaxed text-white/90 md:text-xl">
            From tax planning and wealth management to FEMA compliance and corporate structuring—get instant, 
            expert-level guidance from AI consultants trained on decades of professional practice.
          </p>
          
          <Button
            size="lg"
            onClick={() => openConsult()}
            className="group h-12 gap-2 bg-white px-8 text-base font-semibold text-[#001450] shadow-xl hover:bg-slate-50"
          >
            Start Consulting
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
