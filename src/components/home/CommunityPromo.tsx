import { Button } from "@/components/ui/button";
import { Newspaper, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CommunityPromo() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#001450] to-[#12304f] p-8 text-white md:p-12">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Newspaper className="h-7 w-7 text-blue-200" />
          </div>
          <h3 className="mb-4 max-w-xl font-display text-2xl font-semibold md:text-3xl">
            Daily Digest
          </h3>
          <p className="mb-8 max-w-2xl leading-relaxed text-slate-300">
            Stay current on GST, income tax, corporate filings, and regulatory
            shifts — without another noisy feed. Learning hub is on hold while we
            focus on professionals and live consultations.
          </p>
          <Button asChild size="lg" variant="secondary" className="gap-2">
            <Link href="/daily-digest">
              Read today&apos;s digest
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
