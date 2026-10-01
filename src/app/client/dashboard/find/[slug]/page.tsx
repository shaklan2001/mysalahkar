import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgentProfileView } from "@/components/agents/AgentProfileView";
import {
  getMarketplaceListing,
  listingDisplayName,
} from "@/lib/data/marketplace";

type FindProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: FindProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getMarketplaceListing(slug);
  if (!agent) return { title: "Professional" };
  const displayName = listingDisplayName(agent);
  return { title: displayName, description: agent.bio };
}

export default async function ClientFindProfilePage({
  params,
}: FindProfilePageProps) {
  const { slug } = await params;
  const agent = getMarketplaceListing(slug);
  if (!agent) notFound();

  return (
    <AgentProfileView
      agent={agent}
      backHref="/client/dashboard/find?kind=human"
      backLabel="Back to Find professionals"
      aiBase="/client/dashboard/find/ai"
      embedded
    />
  );
}
