import Link from "next/link";
import type { ReactNode } from "react";
import type { Agent } from "@/lib/data/agents";
import { ConsultantPhoto } from "@/components/agents/ConsultantPhoto";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ExpertCardProps = {
  agent: Agent;
  badge: string;
  availability: string;
  showAiBadge?: boolean;
  displayName?: string;
  detail?: string;
  href?: string;
  footer?: ReactNode;
};

export function ExpertCard({
  agent,
  badge,
  availability,
  showAiBadge = false,
  displayName,
  detail,
  href = `/agents/${agent.slug}`,
  footer,
}: ExpertCardProps) {
  const name = displayName ?? agent.name;
  const isOnline = availability === "Online 24/7";

  return (
    <Card className="flex h-full flex-col rounded-2xl p-6 transition-shadow hover:border-accent/40 hover:shadow-[0_12px_32px_-16px_rgba(0,20,80,0.4)]">
      <Link
        href={href}
        className="flex flex-1 flex-col gap-5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="flex items-start gap-4">
          <ConsultantPhoto
            src={agent.image}
            alt=""
            showAiBadge={showAiBadge}
            className="h-14 w-14"
            sizes="56px"
          />
          <div className="min-w-0 pt-0.5">
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              {name}
            </p>
            {detail ? (
              <p className="mt-1 text-sm leading-snug text-muted-foreground">{detail}</p>
            ) : null}
            {showAiBadge ? null : (
              <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
                {agent.typeLabel}
              </p>
            )}
          </div>
        </div>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {agent.tagline}
        </p>
        <div className="flex flex-wrap items-center gap-2.5 border-t border-border pt-4">
          <Badge variant={showAiBadge ? "live" : "secondary"}>{badge}</Badge>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span
              className={cn(
                "size-1.5 rounded-full",
                isOnline ? "bg-success" : "bg-warning",
              )}
              aria-hidden="true"
            />
            {availability}
          </span>
        </div>
      </Link>
      {footer ? <div className="mt-5 flex flex-wrap gap-2">{footer}</div> : null}
    </Card>
  );
}
