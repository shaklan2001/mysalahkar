"use client";

import { ServiceCategory } from "@/lib/data/services";
import { Agent } from "@/lib/data/agents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
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
    <Card className="overflow-hidden border-2 hover:border-blue-200 transition-all">
      <CardHeader
        className="pb-4"
        style={{ backgroundColor: `${category.color}15` }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="p-3 rounded-xl shrink-0"
              style={{ backgroundColor: `${category.color}25` }}
            >
              <IconComponent
                className="h-8 w-8"
                style={{ color: category.color }}
              />
            </div>
            <div>
              <CardTitle className="text-2xl mb-2">
                {category.category}
              </CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="secondary"
                  style={{
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                  }}
                >
                  {category.type}
                </Badge>
                <Badge variant="outline">{category.services.length} Services</Badge>
                {agent && (
                  <Badge variant="live" className="font-normal">
                    Consultant: {agent.name}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {agent && (
            <Button
              onClick={() => openConsult(category.agentSlug)}
              size="lg"
              style={{ backgroundColor: category.color }}
              className="text-white hover:opacity-90 shrink-0"
            >
              Consult {agent.name}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.services.map((service, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-sm mb-1 text-gray-900">
                {service.name}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
