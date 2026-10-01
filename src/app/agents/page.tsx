import type { Metadata } from "next";
import { getMarketplaceListings } from "@/lib/data/marketplace";
import { AgentsDirectory } from "@/components/agents/AgentsDirectory";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Find Professionals",
  description:
    "Browse AI Salahkars and verified human professionals for tax, legal, compliance, and more on MySalahkaar.",
};

interface AgentsPageProps {
  searchParams: Promise<{
    type?: string;
    kind?: string;
    book?: string;
  }>;
}

export default async function AgentsPage({ searchParams }: AgentsPageProps) {
  const params = await searchParams;

  return (
    <>
      <PageHero
        size="compact"
        title="Start with an AI Salahkar,"
        highlight="book a human when it matters."
        description="AI Salahkars answer instantly, 24/7. Human experts are verified professionals you book by appointment. Every card tells you which one you're choosing."
      />
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <AgentsDirectory
          agents={getMarketplaceListings()}
          searchParams={params}
        />
      </div>
    </>
  );
}
