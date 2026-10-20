import type { Metadata } from "next";
import { LiveProfessionalProfile } from "@/components/agents/LiveProfessionalProfile";
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
  return (
    <LiveProfessionalProfile
      slug={slug}
      seed={agent ?? null}
      backHref="/client/dashboard/find?kind=human"
      backLabel="Back to Find professionals"
      aiBase="/client/dashboard/find/ai"
      embedded
    />
  );
}
