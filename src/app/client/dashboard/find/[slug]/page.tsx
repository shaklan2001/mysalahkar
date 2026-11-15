import type { Metadata } from "next";
import { LiveProfessionalProfile } from "@/components/agents/LiveProfessionalProfile";
import { listingDisplayName } from "@/lib/data/marketplace";
import { fetchProfessional } from "@/lib/data/professionals-server";

type FindProfilePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: FindProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = await fetchProfessional(slug);
  if (!agent) return { title: "Professional" };
  return { title: listingDisplayName(agent), description: agent.bio };
}

export default async function ClientFindProfilePage({
  params,
}: FindProfilePageProps) {
  const { slug } = await params;
  return (
    <LiveProfessionalProfile
      slug={slug}
      backHref="/client/dashboard/find?kind=human"
      backLabel="Back to Find professionals"
      aiBase="/client/dashboard/find/ai"
      embedded
    />
  );
}
