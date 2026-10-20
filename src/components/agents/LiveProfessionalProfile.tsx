"use client";

import { useEffect, useState } from "react";
import { AgentProfileView } from "@/components/agents/AgentProfileView";
import { api } from "@/lib/api";
import { mergeApiCard, type ApiProfessionalCard, type MarketplaceListing } from "@/lib/data/marketplace";

type LiveProfessionalProfileProps = {
  slug: string;
  seed: MarketplaceListing | null;
  backHref?: string;
  backLabel?: string;
  aiBase?: string;
  embedded?: boolean;
};

/** Loads GET /professionals/{slug} and keeps seed copy for fields the card does not include. */
export function LiveProfessionalProfile({
  slug,
  seed,
  backHref,
  backLabel,
  aiBase,
  embedded,
}: LiveProfessionalProfileProps) {
  const [agent, setAgent] = useState<MarketplaceListing | null>(seed);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api<{ professional: ApiProfessionalCard & { bio?: string } }>(`/professionals/${slug}`)
      .then(({ professional }) => {
        if (!cancelled) setAgent(mergeApiCard(professional, seed ?? undefined));
      })
      .catch(() => {
        if (!cancelled && !seed) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, seed]);

  if (missing || !agent) {
    return <p className="mx-auto max-w-3xl px-4 py-16 text-sm text-muted-foreground">Professional not found.</p>;
  }

  return (
    <AgentProfileView
      agent={agent}
      backHref={backHref}
      backLabel={backLabel}
      aiBase={aiBase}
      embedded={embedded}
    />
  );
}
