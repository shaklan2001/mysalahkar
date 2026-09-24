"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";

export function FinalCTA() {
  const { openConsult } = useConsult();

  return (
    <section className="section-pad pt-0">
      <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-8 sm:p-10">
          <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_65%)]" aria-hidden />
          <div className="relative">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-accent">
              <UserRound className="h-5 w-5" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
              Need professional advice?
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Ask an AI Salahkar now, or create an account to book verified experts
              and track your compliance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="accent" onClick={() => openConsult()}>
                Consult now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button asChild variant="outline">
                <Link href="/client/signup">Create client account</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-[#001450] p-8 text-white sm:p-10">
          <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_65%)]" aria-hidden />
          <div className="relative">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-200 ring-1 ring-white/15">
              <Briefcase className="h-5 w-5" />
            </span>
            <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
              Are you a professional?
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300">
              Join My Salahkar as a CA, CS, lawyer or advisor. Launch your AI
              Salahkar and grow your practice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="accent">
                <Link href="/professionals/signup">
                  Apply now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/professionals/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
