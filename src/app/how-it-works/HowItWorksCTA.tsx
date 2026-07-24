"use client";

import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import { Sparkles, ArrowRight } from "lucide-react";

export function HowItWorksCTA() {
  const { openConsult } = useConsult();

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to Get Expert Advice?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
            Start a conversation with our AI agents now. No signup required, no credit card
            needed. Just honest answers.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => openConsult()}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Sparkles className="h-5 w-5" />
              Start Consulting Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white bg-transparent text-white hover:bg-white/10"
            >
              <a href="/agents">
                <ArrowRight className="h-5 w-5" />
                Browse AI Agents
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
