"use client";

import Link from "next/link";
import { ServiceCategory } from "@/lib/data/services";
import { Agent } from "@/lib/data/agents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import * as Icons from "lucide-react";
import { LucideIcon, UserRound } from "lucide-react";

interface ServiceCategoryCardProps {
  category: ServiceCategory;
  agent?: Agent;
}

export function ServiceCategoryCard({
  category,
  agent,
}: ServiceCategoryCardProps) {
  const { openConsult } = useConsult();

  const IconComponent = (Icons[category.iconName as keyof typeof Icons] ||
    Icons.FileText) as LucideIcon;

  const consultants = Array.from(
    new Set(category.services.map((s) => s.consultant))
  );

  return (
    <Card className="overflow-hidden border border-border bg-white shadow-none">
      <CardHeader className="border-b border-border/80 bg-[#f8fafb] pb-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div
              className="rounded-lg p-3"
              style={{ backgroundColor: `${category.color}18` }}
            >
              <IconComponent
                className="h-6 w-6"
                style={{ color: category.color }}
                strokeWidth={1.75}
              />
            </div>
            <div>
              <CardTitle className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {category.category}
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {category.summary}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{category.services.length} services</Badge>
                {agent ? (
                  <Badge variant="outline">AI agent: {agent.name}</Badge>
                ) : null}
              </div>
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <UserRound className="h-3.5 w-3.5" />
                {consultants.slice(0, 3).join(" · ")}
                {consultants.length > 3 ? ` · +${consultants.length - 3} more` : ""}
              </p>
            </div>
          </div>
          {agent ? (
            <Button
              onClick={() => openConsult(category.agentSlug)}
              variant="accent"
              className="shrink-0"
            >
              Consult {agent.name}
            </Button>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {category.services.map((service) => (
            <div
              key={service.name}
              className="rounded-lg border border-border bg-white p-4 transition-colors hover:bg-[#f8fafb]"
            >
              <h4 className="text-sm font-semibold leading-snug text-foreground">
                {service.name}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Consultant: {service.consultant}
              </p>
            </div>
          ))}
        </div>
        {category.id === "financial-services" ? (
          <p className="mt-4 text-xs text-muted-foreground">
            Compare lender rates in the{" "}
            <Link
              href="/loan-comparison"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              loan comparison tool
            </Link>
            .
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
