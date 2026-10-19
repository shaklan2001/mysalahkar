import type { Agent } from "./agents";
import { agents, aiConsultantName, STANDARD_HALF_HOUR_FEE } from "./agents";

export type ListingKind = "ai" | "human" | "both";

export type ListingDocument = {
  id: string;
  name: string;
  kind: "credential" | "id_proof" | "practice_proof" | "other";
  fileName: string;
};

/** A live professional from GET /professionals (the API's public card). */
export type ApiProfessionalCard = Pick<
  Agent,
  "slug" | "name" | "type" | "typeLabel" | "specializations" | "experience" | "consultationFee" | "location"
  | "availability" | "languages" | "channels" | "accent" | "tagline" | "rating" | "reviewCount"
> & { image?: string; aiName?: string; liveDemo?: boolean; listingKind: ListingKind };

export type MarketplaceListing = Agent & {
  listingKind: ListingKind;
  /** Human / partner listing (not a Vibrium live demo) */
  isHumanProfessional?: boolean;
};

function listingKindFor(agent: Agent): ListingKind {
  // Connected bots (Ankit, Soniya) are also real people you can book.
  return agent.liveDemo ? "both" : "human";
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

/** Shapes an approved professional (not in the static seed) like a seed agent for the directory. */
export function cardToListing(card: ApiProfessionalCard): MarketplaceListing {
  return {
    ...card,
    services: [],
    bio: card.tagline,
    image:
      card.image ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    consultationFee: card.consultationFee || STANDARD_HALF_HOUR_FEE,
    personality: "",
    kpis: [],
    capabilities: [],
    workflows: [],
    sampleChat: [],
    faqs: [],
    escalationNote: "",
    liveTag: "Verified professional",
    listingKind: card.listingKind,
    isHumanProfessional: card.listingKind !== "ai",
    liveDemo: false,
  };
}

/** Marketplace listings from the real professional roster */
export function getMarketplaceListings(): MarketplaceListing[] {
  return agents.map((a) => ({
    ...a,
    listingKind: listingKindFor(a),
    isHumanProfessional: true,
  }));
}

export function getMarketplaceListing(
  slug: string,
): MarketplaceListing | undefined {
  return getMarketplaceListings().find((l) => l.slug === slug);
}

/** AI Salahkars do not show a city or a human response time. */
export function isAiSalahkarListing(listing: { listingKind: ListingKind }): boolean {
  return listing.listingKind !== "human";
}

/** Real name on a human or combined profile. AI-only listings use the AI name. */
export function listingDisplayName(listing: Pick<MarketplaceListing, "listingKind" | "name" | "aiName">) {
  if (listing.listingKind === "ai") return aiConsultantName(listing);
  return listing.name;
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

export function slugifyName(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || `pro-${Date.now()}`
  );
}

/* ---------------------------------------------------------------------------
 * AI Salahkars have their own pages (/ai-salahkars/[aiSlug]); /agents/[slug]
 * is the human professional's profile. A "both" listing appears in each.
 * ------------------------------------------------------------------------- */

export function hasAiSalahkar(listing: Pick<MarketplaceListing, "listingKind">): boolean {
  return listing.listingKind === "ai" || listing.listingKind === "both";
}

export function hasHumanProfile(listing: Pick<MarketplaceListing, "listingKind">): boolean {
  return listing.listingKind === "human" || listing.listingKind === "both";
}

/** URL slug for the AI Salahkar, e.g. "Ankit AI" → "ankit-ai". */
export function aiSalahkarSlug(listing: Pick<MarketplaceListing, "name" | "aiName">): string {
  return slugifyName(aiConsultantName(listing));
}

export function aiSalahkarHref(listing: Pick<MarketplaceListing, "name" | "aiName">): string {
  return `/ai-salahkars/${aiSalahkarSlug(listing)}`;
}

export function humanProfileHref(listing: Pick<MarketplaceListing, "slug">): string {
  return `/agents/${listing.slug}`;
}

export function getAiSalahkars(): MarketplaceListing[] {
  return getMarketplaceListings().filter(hasAiSalahkar);
}

export function getAiSalahkar(aiSlug: string): MarketplaceListing | undefined {
  return getAiSalahkars().find((listing) => aiSalahkarSlug(listing) === aiSlug);
}

/**
 * Seed bios for "both" listings open with a sentence about the AI
 * ("Ankit AI is an AI-powered guidance tool…"). Split it so the human
 * profile reads about the person and the AI page keeps the intro.
 */
export function splitBio(listing: Pick<MarketplaceListing, "bio" | "name" | "aiName">): {
  aiIntro: string | null;
  personBio: string;
} {
  const aiName = aiConsultantName(listing);
  if (!listing.bio.startsWith(aiName)) return { aiIntro: null, personBio: listing.bio };
  const end = listing.bio.indexOf(". ");
  if (end === -1) return { aiIntro: listing.bio, personBio: "" };
  const personBio = listing.bio.slice(end + 2).trim();
  return {
    aiIntro: listing.bio.slice(0, end + 1),
    // "He has rich experience…" → "Ankit Gupta has rich experience…"
    personBio: personBio.replace(/^(He|She|They) /, `${listing.name} `),
  };
}
