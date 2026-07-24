"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useConsult } from "@/components/consult/ConsultProvider";
import { Gift, Check, ArrowRight } from "lucide-react";

const benefits = [
  "No credit card required",
  "15-minute AI consultation",
  "Get actionable expert advice",
  "Access to full AI agent capabilities",
  "Human escalation available if needed",
];

export function FirstConsultOffer() {
  const { openConsult } = useConsult();

  return (
    <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border-2 border-amber-200 bg-white shadow-2xl">
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-8 py-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wide">Limited Time Offer</div>
                  <div className="text-2xl font-extrabold">First Consultation FREE</div>
                </div>
              </div>
            </div>
            
            <div className="grid gap-8 p-8 md:grid-cols-2 md:gap-12">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  Experience AI-Powered Consultancy
                </h3>
                <p className="mb-6 leading-relaxed text-slate-600">
                  Try our platform risk-free. Get your first consultation with any AI agent completely free. 
                  No strings attached—just expert guidance when you need it.
                </p>
                
                <Button
                  size="lg"
                  onClick={() => openConsult()}
                  className="group h-12 w-full gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-base font-semibold shadow-lg hover:from-amber-700 hover:to-orange-700 sm:w-auto"
                >
                  Claim Your Free Consultation
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              
              <div>
                <h4 className="mb-4 font-semibold text-slate-900">What's included:</h4>
                <ul className="space-y-3">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-700" />
                      </div>
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
