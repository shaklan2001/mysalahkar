import { MarketStrip, PublicDigest } from "@/components/digest/PublicDigest";

export default function ProDailyDigestPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Daily Digest</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Today&apos;s GST, Income Tax, ROC, SEBI, RBI and MCA updates, with markets and client due dates.
        </p>
      </div>
      <MarketStrip />
      <PublicDigest />
    </div>
  );
}
