import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfessionalsPromo() {
  return (
    <section className="border-t border-border/70 section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 rounded-2xl border border-border bg-white px-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              For professionals
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Practising CA, CS, or lawyer? Create your AI consultant and earn a share.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              List your AI Salahkar on the marketplace, handle escalations on your
              terms, and track performance in a partner dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild size="lg">
              <Link href="/professionals">
                Explore partner program
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/professionals/signup">Create agent</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
