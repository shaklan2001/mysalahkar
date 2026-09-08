import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Learning (on hold) | My Salahkar",
  description: "Professional learning is temporarily on hold.",
};

export default function LearningOnHoldPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        On hold
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
        Learning is paused for now
      </h1>
      <p className="mt-4 text-muted-foreground">
        We&apos;re focusing on Find Professionals, live AI consultations, and
        verified human specialists. Check Daily Digest for updates in the meantime.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/agents">Find Professionals</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/daily-digest">Daily Digest</Link>
        </Button>
      </div>
    </div>
  );
}
