"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { ServiceCategory } from "@/lib/data/services";
import type { Agent } from "@/lib/data/agents";
import { ServiceCategoryCard } from "@/components/services/ServiceCategoryCard";
import { cn } from "@/lib/utils";

type CatalogCategory = ServiceCategory & {
  agent?: Pick<Agent, "slug" | "name">;
};

export function ServicesCatalog({
  categories,
}: {
  categories: CatalogCategory[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((category) => active === "all" || category.id === active)
      .map((category) => ({
        category,
        services: q
          ? category.services.filter(
              (service) =>
                service.name.toLowerCase().includes(q) ||
                category.category.toLowerCase().includes(q),
            )
          : category.services,
      }))
      .filter((entry) => entry.services.length > 0);
  }, [categories, query, active]);

  const matchCount = results.reduce(
    (sum, entry) => sum + entry.services.length,
    0,
  );

  return (
    <div>
      <div className="sticky top-[6.25rem] z-30 -mx-4 border-b border-border/70 bg-background/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative block lg:w-72 lg:shrink-0">
            <span className="sr-only">Search services</span>
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. GST return, LLP, trademark"
              className="h-10 w-full rounded-lg border border-border bg-white pr-9 pl-9 [&::-webkit-search-cancel-button]:appearance-none text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent/50 focus:ring-3 focus:ring-accent/15"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </label>

          <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none]">
            {[
              {
                id: "all",
                category: "All",
                count: categories.reduce((n, c) => n + c.services.length, 0),
              },
              ...categories.map((c) => ({
                id: c.id,
                category: c.category,
                count: c.services.length,
              })),
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActive(chip.id)}
                aria-pressed={active === chip.id}
                className={cn(
                  "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-medium whitespace-nowrap transition-colors",
                  active === chip.id
                    ? "border-[#001450] bg-[#001450] text-white"
                    : "border-border bg-white text-ink-soft hover:border-accent/40 hover:text-foreground",
                )}
              >
                {chip.category}
                <span
                  className={
                    active === chip.id
                      ? "text-white/60"
                      : "text-muted-foreground"
                  }
                >
                  {chip.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {query || active !== "all"
          ? `${matchCount} ${matchCount === 1 ? "service" : "services"} found`
          : `Showing all ${matchCount} services`}
      </p>

      {results.length ? (
        <div className="mt-5 space-y-6">
          {results.map(({ category, services }) => (
            <div key={category.id} id={category.id} className="scroll-mt-52">
              <ServiceCategoryCard
                category={category}
                agent={category.agent}
                services={services}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-foreground">
            No services match “{query}”
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a broader term, or ask an AI Salahkar. They can point you to the
            right service.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive("all");
            }}
            className="mt-5 text-sm font-semibold text-accent hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
