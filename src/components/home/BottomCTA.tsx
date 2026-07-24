"use client";

import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function BottomCTA() {
  const { openConsult } = useConsult();

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 text-white md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            Get Started Today
          </div>
          
          <h2 className="mb-6 text-3xl font-extrabold leading-tight md:text-5xl">
            Ready to Transform Your Consultancy Experience?
          </h2>
          
          <p className="mb-10 text-lg leading-relaxed text-slate-200 md:text-xl">
            Join thousands who've made the switch to AI-powered professional consultancy. 
            Expert guidance at your fingertips, 24/7.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => openConsult()}
              className="group h-12 gap-2 bg-white px-8 text-base font-semibold text-blue-700 shadow-xl hover:bg-slate-50"
            >
              <Sparkles className="h-5 w-5" />
              Start Your First Consultation
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 gap-2 border-2 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/agents">
                Browse All AI Agents
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-10 text-sm text-slate-400">
            No credit card required • First consultation free • Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
}
