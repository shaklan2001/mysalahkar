import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work with MySalahkar. We bring qualified finance, tax, legal and compliance professionals together with AI to make trusted advice accessible across India.",
};

const CAREERS_EMAIL = "support@mysalahkar.com";

export default function CareersPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border/70 bg-white/60 section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Careers
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
              Build trusted professional advice with us
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              MySalahkar brings qualified professionals and AI together so every
              business and individual gets the right advice at the right time.
              We&apos;re always glad to hear from people who want to help build it.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Briefcase className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Join the team</h2>
            <p className="mt-2 text-slate-600">
              We hire across technology, operations, and finance, tax, legal and
              compliance roles. Send your CV with the role you&apos;re interested
              in, and we&apos;ll get back to you when there&apos;s a fit.
            </p>
            <Button asChild variant="accent" className="mt-6">
              <a href={`mailto:${CAREERS_EMAIL}?subject=Careers%20at%20MySalahkar`}>
                <Mail className="h-4 w-4" />
                {CAREERS_EMAIL}
              </a>
            </Button>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Practise on MySalahkar
            </h2>
            <p className="mt-2 text-slate-600">
              Are you a CA, CS, CMA, lawyer, valuer or advisor? Join as a
              registered professional, meet clients who need your expertise and
              build your practice.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/professionals/signup">
                Apply to join
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
