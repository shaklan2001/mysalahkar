"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Calculator,
  ChartLine,
  FileText,
  Globe,
  Landmark,
  Receipt,
  Sparkles,
  Table,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCategory, ServiceItem } from "@/lib/data/services";
import type { Agent } from "@/lib/data/agents";
import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import { ScheduleCallDialog } from "@/components/agents/ScheduleCallDialog";

const icons: Record<string, LucideIcon> = {
  Building2,
  Calculator,
  Receipt,
  BadgeCheck,
  Landmark,
  LineChart: ChartLine,
  TrendingUp,
  Globe,
  Briefcase,
  Table,
};

interface ServiceCategoryCardProps {
  category: ServiceCategory;
  agent?: Pick<Agent, "slug" | "name">;
  /** Services to show — defaults to all of the category's services */
  services?: ServiceItem[];
}

export function ServiceCategoryCard({
  category,
  agent,
  services = category.services,
}: ServiceCategoryCardProps) {
  const { openConsult } = useConsult();
  const Icon = icons[category.iconName] ?? FileText;

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-white">
      <header className="flex flex-col gap-4 border-b border-border/70 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-accent">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {category.category}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {category.summary}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-ink-soft">
            {category.services.length} services
          </span>
          {agent ? (
            <Link
              href={`/agents/${agent.slug}`}
              className="group inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-accent"
            >
              Led by {agent.name}
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          ) : null}
        </div>
      </header>

      <ul className="grid divide-y divide-border/70 md:grid-cols-2 md:divide-y-0">
        {services.map((service, index) => (
          <li
            key={service.name}
            className={
              "flex flex-col items-start gap-2.5 px-6 py-4 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-4 hover:bg-[#f8f9fc] sm:px-7 " +
              (index >= 2 ? "md:border-t md:border-border/70 " : "") +
              (index % 2 === 0 ? "md:border-r md:border-border/70" : "")
            }
          >
            <p className="min-w-0 text-sm font-medium text-foreground">
              {service.name}
            </p>
            <div className="-ml-2.5 flex shrink-0 items-center gap-1.5 sm:ml-0">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 px-2.5 text-xs text-accent hover:bg-brand-blue/10 hover:text-accent"
                onClick={() => openConsult(category.agentSlug)}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Ask AI
              </Button>
              <ScheduleCallDialog
                professionalName={agent?.name ?? "specialist"}
                professionalSlug={category.agentSlug}
                serviceName={service.name}
                triggerLabel="Book professional"
                triggerVariant="outline"
                triggerSize="sm"
                triggerClassName="h-8 px-2.5 text-xs"
              />
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
