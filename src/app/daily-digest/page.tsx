import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { MarketStrip, PublicDigest } from "@/components/digest/PublicDigest";

export const metadata: Metadata = {
  title: "Daily Digest",
  description:
    "AI-curated daily compliance updates from GST, Income Tax, ROC, SEBI, RBI, and MCA — plus markets, due dates and top global headlines.",
};

export default function DailyDigestPage() {
  return (
    <>
      <PageHero
        size="compact"
        title="Daily Digest:"
        highlight="what changed today."
        description="GST, Income Tax, ROC, SEBI, RBI and MCA updates in plain language, with markets, upcoming due dates and global headlines."
      />
      <div className="mx-auto max-w-6xl space-y-8 px-4 pb-24 sm:px-6 lg:px-8">
        <MarketStrip />
        <PublicDigest />
      </div>
    </>
  );
}
