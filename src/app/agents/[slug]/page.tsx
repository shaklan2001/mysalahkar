import type { Metadata } from "next";
import { LiveProfessionalProfile } from "@/components/agents/LiveProfessionalProfile";
import { splitBio } from "@/lib/data/marketplace";
import { fetchProfessional } from "@/lib/data/professionals-server";

interface AgentProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: AgentProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = await fetchProfessional(slug);
  if (!agent) return { title: "Professional" };
  return {
    title: `${agent.name} · ${agent.typeLabel}`,
    description: splitBio(agent).personBio || agent.bio,
  };
}

/** Human professional profile. AI Salahkars live at /ai-salahkars/[slug]. */
export default async function AgentProfilePage({ params }: AgentProfilePageProps) {
  const { slug } = await params;
  return <LiveProfessionalProfile slug={slug} />;
}
