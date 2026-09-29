"use client";

import { MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";
import { cn } from "@/lib/utils";

/** Chat / call buttons for an AI Salahkar page. */
export function AiConsultActions({
  slug,
  canCall = true,
  size = "lg",
  stacked = false,
  className,
}: {
  slug: string;
  canCall?: boolean;
  size?: "sm" | "default" | "lg";
  stacked?: boolean;
  className?: string;
}) {
  const { openConsult } = useConsult();
  return (
    <div
      className={cn(
        "flex gap-3",
        stacked ? "flex-col" : "flex-wrap",
        className,
      )}
    >
      <Button
        size={size}
        variant="accent"
        onClick={() => openConsult(slug, "chat")}
        className={stacked ? "w-full" : undefined}
      >
        <MessageSquare className="h-4 w-4" />
        Start chat
      </Button>
      {canCall ? (
        <Button
          size={size}
          variant="outline"
          onClick={() => openConsult(slug, "call")}
          className={stacked ? "w-full" : undefined}
        >
          <Phone className="h-4 w-4" />
          Voice call
        </Button>
      ) : null}
    </div>
  );
}
