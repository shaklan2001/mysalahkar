"use client";

import type { ComponentProps } from "react";
import { AiSalahkarView } from "@/components/agents/AiSalahkarView";
import { ProfileLoadState } from "@/components/agents/ProfileLoadState";
import { findAiSalahkar } from "@/lib/data/marketplace";
import { useProfessional, useProfessionals } from "@/lib/data/professionals";

type LiveAiSalahkarProps = Omit<ComponentProps<typeof AiSalahkarView>, "listing"> & {
  /** The AI Salahkar's URL slug, e.g. "ankit-ai". */
  aiSlug: string;
};

/** An AI Salahkar page: finds the professional behind the AI slug, then loads their full profile. */
export function LiveAiSalahkar({ aiSlug, ...view }: LiveAiSalahkarProps) {
  const directory = useProfessionals();
  const match = directory.data ? findAiSalahkar(directory.data, aiSlug) : undefined;
  const profile = useProfessional(match?.slug ?? null);
  const backHref = view.backHref?.split("?")[0];

  if (directory.status === "error" || profile.status === "error") {
    return <ProfileLoadState state="error" backHref={backHref} />;
  }
  if (directory.status === "ready" && !match) {
    return <ProfileLoadState state="missing" what="AI Salahkar" backHref={backHref} />;
  }
  if (profile.status !== "ready") return <ProfileLoadState state="loading" />;
  if (!profile.data) return <ProfileLoadState state="missing" what="AI Salahkar" backHref={backHref} />;
  return <AiSalahkarView listing={profile.data} {...view} />;
}
