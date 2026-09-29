import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiSalahkarView } from "@/components/agents/AiSalahkarView";
import { aiConsultantName } from "@/lib/data/agents";
import { aiSalahkarSlug, getAiSalahkar, getAiSalahkars } from "@/lib/data/marketplace";

interface AiSalahkarPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAiSalahkars().map((listing) => ({ slug: aiSalahkarSlug(listing) }));
}

export async function generateMetadata({ params }: AiSalahkarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = getAiSalahkar(slug);
  if (!listing) return { title: "AI Salahkar not found" };
  const name = aiConsultantName(listing);
  return {
    title: `${name} · AI Salahkar`,
    description: `${name} is an AI Salahkar for ${listing.tagline.toLowerCase()}, guided by ${listing.name}. Chat or call 24/7.`,
  };
}

export default async function AiSalahkarPage({ params }: AiSalahkarPageProps) {
  const { slug } = await params;
  const listing = getAiSalahkar(slug);
  if (!listing) notFound();
  return <AiSalahkarView listing={listing} />;
}
