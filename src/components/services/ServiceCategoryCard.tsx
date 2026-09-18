"use client";

import { ServiceCategory } from "@/lib/data/services";
import { Agent } from "@/lib/data/agents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import { ScheduleCallDialog } from "@/components/agents/ScheduleCallDialog";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

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

  return (
    <Card className="overflow-hidden border border-border bg-white shadow-none">
      <CardHeader className="border-b border-border/80 bg-[#f8fafb] pb-5">
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
            <div className="mt-3">
              <Badge variant="secondary">{category.services.length} services</Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {category.services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col rounded-lg border border-border bg-white p-4 transition-colors hover:bg-[#f8fafb]"
            >
              <h4 className="text-sm font-semibold leading-snug text-foreground">
                {service.name}
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="accent"
                  onClick={() => openConsult(category.agentSlug)}
                >
                  AI Consultation
                </Button>
                <ScheduleCallDialog
                  professionalName={agent?.name ?? "specialist"}
                  professionalSlug={category.agentSlug}
                  serviceName={service.name}
                  triggerLabel="Human Consultation"
                  triggerVariant="outline"
                  triggerSize="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
