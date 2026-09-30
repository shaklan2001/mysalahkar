import { AgentsDirectory } from "@/components/agents/AgentsDirectory";
import { getMarketplaceListings } from "@/lib/data/marketplace";

/** Client dashboard "Find experts": the public directory, kept inside the dashboard shell. */
export function FindBoard({
  bookSlug,
  kind,
}: {
  bookSlug?: string;
  kind?: string;
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Find experts
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          AI Salahkars answer instantly, 24/7. Human experts are verified
          professionals you book on Google Meet.
        </p>
      </div>
      <AgentsDirectory
        agents={getMarketplaceListings()}
        searchParams={{ book: bookSlug, kind }}
        profileBase="/client/dashboard/find"
        aiBase="/client/dashboard/find/ai"
        stickyTop="top-14 lg:top-0"
      />
    </div>
  );
}
