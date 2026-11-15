import type { Metadata } from "next";
import { LiveAiSalahkar } from "@/components/agents/LiveAiSalahkar";
import { aiConsultantName } from "@/lib/data/agents";
import { findAiSalahkar } from "@/lib/data/marketplace";
import { fetchProfessionals } from "@/lib/data/professionals-server";

interface AiSalahkarPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AiSalahkarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = findAiSalahkar(await fetchProfessionals(), slug);
  if (!listing) return { title: "AI Salahkar" };
  const name = aiConsultantName(listing);
  return {
    title: `${name} · AI Salahkar`,
    description: `${name} is an AI Salahkar for ${listing.tagline.toLowerCase()}, guided by ${listing.name}. Chat or call 24/7.`,
  };
}

export default async function AiSalahkarPage({ params }: AiSalahkarPageProps) {
  const { slug } = await params;
  return <LiveAiSalahkar aiSlug={slug} />;
}
