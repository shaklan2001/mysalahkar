export function CommunityHeader() {
  return (
    <section className="section-pad border-b border-border/70 bg-white/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Daily Digest
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          What professionals are talking about today
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Short updates on tax, corporate law, compliance, and practice —
          curated for India&apos;s professionals and business owners.
        </p>
      </div>
    </section>
  );
}
