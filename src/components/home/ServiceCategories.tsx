import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { serviceCategories } from "@/lib/data/services";

export function ServiceCategories() {
  const featured = serviceCategories.slice(0, 6);

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Services
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
              Client catalogue — {serviceCategories.length} categories.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Business setup, tax, GST, FEMA, secretarial, and advisory — each
              service as AI Consultation or Human Consultation.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
          >
            View full catalogue
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => {
            const Icon = (Icons[item.iconName as keyof typeof Icons] ||
              Icons.Briefcase) as LucideIcon;
            return (
              <Link
                key={item.id}
                href={`/services#${item.id}`}
                className="group flex flex-col bg-white p-6 transition-colors hover:bg-[#f8fafb] sm:p-7"
              >
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
                  {item.category}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.summary} · {item.services.length} services
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-ink-soft opacity-70 transition-opacity group-hover:opacity-100">
                  Explore
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
