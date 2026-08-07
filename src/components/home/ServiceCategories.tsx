import Link from "next/link";
import {
  Briefcase,
  Building2,
  Calculator,
  Landmark,
  Scale,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    title: "GST & Income Tax",
    description: "Returns, notices, audits, and tax planning with a CA agent.",
    href: "/services#ca-services",
    icon: Calculator,
  },
  {
    title: "Company & ROC",
    description: "Incorporation, annual filings, board resolutions, secretarial.",
    href: "/services#cs-services",
    icon: Building2,
  },
  {
    title: "Legal & Contracts",
    description: "Agreements, disputes, employment, and commercial counsel.",
    href: "/services#legal-services",
    icon: Scale,
  },
  {
    title: "FEMA & Cross-border",
    description: "FDI, ODI, remittances, and RBI compliance guidance.",
    href: "/services#fema-services",
    icon: Landmark,
  },
  {
    title: "Wealth & Insurance",
    description: "Portfolio advice, risk cover, and goal-based planning.",
    href: "/services#wealth-services",
    icon: TrendingUp,
  },
  {
    title: "Lending & Credit",
    description: "Compare business loans and get an AI advisor walkthrough.",
    href: "/loan-comparison",
    icon: Briefcase,
  },
];

export function ServiceCategories() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Services
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
              Clear categories. Expert agents.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Start with the domain you need — each path connects you to a
              specialised AI Salahkar.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
          >
            View all services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex flex-col bg-white p-6 transition-colors hover:bg-[#f8fafb] sm:p-7"
              >
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
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
