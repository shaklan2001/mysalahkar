import type { Agent, AgentType } from "./agents";
import { agents, STANDARD_HALF_HOUR_FEE } from "./agents";

export type ListingKind = "ai" | "human" | "both";

export type ListingApplicationStatus =
  | "pending_review"
  | "approved"
  | "rejected";

export type ListingDocument = {
  id: string;
  name: string;
  kind: "credential" | "id_proof" | "practice_proof" | "other";
  /** File name only — demo store; no binary upload backend yet */
  fileName: string;
};

export type ListingApplication = {
  id: string;
  createdAt: string;
  status: ListingApplicationStatus;
  reviewedAt?: string;
  reviewNote?: string;
  listingKind: ListingKind;
  name: string;
  email: string;
  phone: string;
  firm: string;
  domain: string;
  credentials: string;
  membershipId: string;
  city: string;
  displayName: string;
  tagline: string;
  bio: string;
  fee: number;
  documents: ListingDocument[];
  slug: string;
};

export type MarketplaceListing = Agent & {
  listingKind: ListingKind;
  /** Human / partner listing (not a Vibrium live demo) */
  isHumanProfessional?: boolean;
};

function listingKindFor(agent: Agent): ListingKind {
  return agent.liveDemo ? "ai" : "human";
}

export function getSeedHumanProfessionals(): MarketplaceListing[] {
  return agents
    .filter((a) => !a.liveDemo)
    .map((a) => ({
      ...a,
      listingKind: "human" as const,
      isHumanProfessional: true,
    }));
}

export function listingToAgentShape(app: ListingApplication): MarketplaceListing {
  const type = (app.domain as AgentType) || "CA";
  return {
    slug: app.slug,
    name: app.displayName || app.name,
    type,
    typeLabel: app.domain,
    specializations: [app.credentials || app.domain],
    services: [],
    experience: 5,
    rating: 5,
    reviewCount: 0,
    consultationFee: app.fee || STANDARD_HALF_HOUR_FEE,
    bio: app.bio,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: `${app.city}, India`,
    availability:
      app.listingKind === "ai" ? "Online 24/7" : "By appointment",
    languages: ["English", "Hindi"],
    channels:
      app.listingKind === "human"
        ? ["call"]
        : app.listingKind === "ai"
          ? ["chat", "call"]
          : ["chat", "call"],
    accent: "#0d9488",
    tagline: app.tagline,
    personality: "",
    kpis: [],
    capabilities: [],
    workflows: [],
    sampleChat: [],
    faqs: [],
    escalationNote: "Partner listing pending full profile enrichment.",
    liveTag:
      app.listingKind === "human"
        ? "Verified professional"
        : app.listingKind === "both"
          ? "AI + human"
          : "AI consultant",
    listingKind: app.listingKind,
    isHumanProfessional: app.listingKind !== "ai",
    liveDemo: app.listingKind === "ai" || app.listingKind === "both",
  };
}

/** Marketplace listings from the real professional roster */
export function getMarketplaceListings(): MarketplaceListing[] {
  return agents.map((a) => ({
    ...a,
    listingKind: listingKindFor(a),
    isHumanProfessional: !a.liveDemo,
  }));
}

export function getMarketplaceListing(
  slug: string,
): MarketplaceListing | undefined {
  return getMarketplaceListings().find((l) => l.slug === slug);
}

export function canChatOrCall(listing: MarketplaceListing): boolean {
  return (
    listing.listingKind === "ai" ||
    listing.listingKind === "both" ||
    Boolean(listing.liveDemo)
  );
}

export function canScheduleHuman(listing: MarketplaceListing): boolean {
  return (
    listing.listingKind === "human" ||
    listing.listingKind === "both" ||
    Boolean(listing.isHumanProfessional)
  );
}

export const APPLICATIONS_STORAGE_KEY = "salahkar-listing-applications";

export function slugifyName(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || `pro-${Date.now()}`
  );
}
