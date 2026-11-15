"use client";

import { AgentProfileView } from "@/components/agents/AgentProfileView";
import { ProfileLoadState } from "@/components/agents/ProfileLoadState";
import { useProfessional } from "@/lib/data/professionals";

type LiveProfessionalProfileProps = {
  slug: string;
  backHref?: string;
  backLabel?: string;
  aiBase?: string;
  embedded?: boolean;
};

/** A human professional's profile, loaded from GET /professionals/{slug}. */
export function LiveProfessionalProfile({
  slug,
  backHref,
  backLabel,
  aiBase,
  embedded,
}: LiveProfessionalProfileProps) {
  const profile = useProfessional(slug);

  if (profile.status !== "ready" || !profile.data) {
    return (
      <ProfileLoadState
        state={profile.status === "ready" ? "missing" : profile.status}
        backHref={backHref?.split("?")[0]}
      />
    );
  }

  return (
    <AgentProfileView
      agent={profile.data}
      backHref={backHref}
      backLabel={backLabel}
      aiBase={aiBase}
      embedded={embedded}
    />
  );
}
