import Link from "next/link";
import { uniqueConsultants } from "@/lib/data/services";

interface ServicesHeroProps {
  categoryCount: number;
  totalServices: number;
}

export function ServicesHero({
  categoryCount,
  totalServices,
}: ServicesHeroProps) {
  return (
    <section className="border-b border-border/70 bg-white/60 section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Services
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            Client service catalogue — as provided by your firm.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {categoryCount} categories and {totalServices} services across
            business setup, tax, GST, FEMA, secretarial, and advisory — each
            mapped to the consultant responsible.
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
              {totalServices}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Services</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {uniqueConsultants.length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Consultants</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesCategoryNav({
  categories,
}: {
  categories: { id: string; category: string; count: number }[];
}) {
  return (
    <nav className="sticky top-16 z-30 border-b border-border/70 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex gap-1 py-3">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`#${cat.id}`}
                className="inline-flex whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:text-sm"
              >
                {cat.category}
                <span className="ml-1.5 text-muted-foreground/70">{cat.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
