import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { LiveProfessionalProfile } from "@/components/agents/LiveProfessionalProfile";
import {
  aiSalahkarHref,
  getMarketplaceListing,
  getMarketplaceListings,
  hasHumanProfile,
  splitBio,
} from "@/lib/data/marketplace";

interface AgentProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getMarketplaceListings()
    .filter(hasHumanProfile)
    .map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({ params }: AgentProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getMarketplaceListing(slug);
  if (!agent) return { title: "Professional Not Found" };
  return {
    title: `${agent.name} · ${agent.typeLabel}`,
    description: splitBio(agent).personBio || agent.bio,
  };
}

/** Human professional profile. AI-only listings live at /ai-salahkars/[slug]. */
export default async function AgentProfilePage({ params }: AgentProfilePageProps) {
  const { slug } = await params;
  const agent = getMarketplaceListing(slug);
  if (agent && !hasHumanProfile(agent)) redirect(aiSalahkarHref(agent));
  return (
    <LiveProfessionalProfile slug={slug} seed={agent ?? null} />
  );
}
