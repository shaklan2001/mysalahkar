import { getMarketplaceListings } from "@/lib/data/marketplace";
import { AgentsDirectory } from "@/components/agents/AgentsDirectory";
import { PageHero } from "@/components/layout/PageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Professionals",
  description:
    "Browse AI consultants and verified human professionals for tax, legal, compliance, and more on MySalahkaar.",
};

interface AgentsPageProps {
  searchParams: Promise<{
    type?: string;
    kind?: string;
  }>;
}

export default async function AgentsPage({ searchParams }: AgentsPageProps) {
  const params = await searchParams;

  return (
    <div>
      <PageHero
        eyebrow="Find Professionals"
        title="AI consultants and verified human consultants."
        description="Chat or call with live AI specialists anytime — or schedule a call with a verified human professional when you want personal attention."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <AgentsDirectory agents={getMarketplaceListings()} searchParams={params} />
      </div>
    </div>
  );
}
