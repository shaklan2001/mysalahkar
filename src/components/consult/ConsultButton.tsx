"use client";

import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useConsult } from "@/components/consult/ConsultProvider";

/** Opens the consult dock from server-rendered marketing pages. */
export function ConsultButton({
  children = "Start a consultation",
  agentSlug,
  variant = "accent",
  size = "lg",
  ...props
}: ButtonProps & { agentSlug?: string }) {
  const { openConsult } = useConsult();
  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => openConsult(agentSlug)}
      {...props}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
}
