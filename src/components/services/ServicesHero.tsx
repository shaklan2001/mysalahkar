interface ServicesHeroProps {
  categoryCount: number;
  totalServices: number;
  aiExperts: number;
}

export function ServicesHero({
  categoryCount,
  totalServices,
  aiExperts,
}: ServicesHeroProps) {
  return (
    <section className="border-b border-border/70 bg-white/60 section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Services
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            Professional services across every domain that matters.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Taxation, corporate, legal, IP, FEMA, real estate, wealth, insurance,
            and lending — each category backed by a specialised AI consultant.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border/80 pt-8 sm:max-w-xl">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {categoryCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Categories</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {totalServices}+
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Services</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {aiExperts}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">AI experts</p>
          </div>
        </div>
      </div>
    </section>
  );
}
