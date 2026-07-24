"use client";

import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const { openConsult } = useConsult();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50 py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]" />
      
      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Bot className="h-4 w-4" />
            <span>India's First AI Professional Consultancy Platform</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl md:leading-tight">
            Your Expert <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Salahkar</span>, Powered by AI
          </h1>
          
          <p className="mb-10 text-lg leading-relaxed text-slate-600 md:text-xl">
            Instant access to AI agents trained on years of CA, CS, Legal, FEMA, Wealth Management & more. 
            Consult via WhatsApp, chat, or call—24/7. Human escalation when complexity demands it.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => openConsult()}
              className="group h-12 gap-2 bg-gradient-to-r from-blue-600 to-blue-700 px-8 text-base font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800"
            >
              <Sparkles className="h-5 w-5" />
              Consult Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 gap-2 border-2 border-slate-300 px-8 text-base font-semibold hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              <Link href="/services">
                Explore Services
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 gap-2 px-8 text-base font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-700"
            >
              <Link href="/agents">
                Find AI Agents
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
