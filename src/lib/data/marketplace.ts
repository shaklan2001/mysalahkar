import type { Agent, AgentType } from "./agents";
import { getLiveDemoAgents } from "./agents";

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

const humanSeed: MarketplaceListing[] = [
  {
    slug: "neha-sharma-ca",
    name: "Neha Sharma",
    type: "CA",
    typeLabel: "Chartered Accountant",
    specializations: ["GST", "Tax Planning", "MSME Compliance"],
    services: ["GST returns", "ITR filing", "Tax notices", "MSME advisory"],
    experience: 11,
    rating: 4.8,
    reviewCount: 94,
    consultationFee: 2800,
    bio: "Practising CA focused on GST and MSME tax. Book a scheduled call for notices, audits, and hands-on filing support.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: "Bengaluru, India",
    availability: "By appointment",
    languages: ["English", "Hindi", "Kannada"],
    channels: ["call"],
    accent: "#0d9488",
    tagline: "GST & MSME tax — book a human consultation",
    personality: "Practical and responsive.",
    kpis: [
      { value: "11+", label: "Years" },
      { value: "400+", label: "Clients" },
      { value: "4.8★", label: "Rating" },
    ],
    capabilities: [
      {
        title: "GST & returns",
        description: "Monthly filings, ITC reviews, and notice responses.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Schedule a call",
        desc: "Pick a slot that works for you.",
      },
      {
        num: "2",
        title: "Share context",
        desc: "Docs and questions before the call.",
      },
      {
        num: "3",
        title: "Consult & next steps",
        desc: "Clear action plan after the session.",
      },
    ],
    sampleChat: [],
    faqs: [
      {
        q: "Is this an AI chat?",
        a: "No — Neha is a verified human professional. You schedule a call; she joins personally.",
      },
    ],
    escalationNote: "Human consultation by appointment.",
    liveTag: "Verified professional",
    listingKind: "human",
    isHumanProfessional: true,
  },
  {
    slug: "rohan-desai-cs",
    name: "Rohan Desai",
    type: "CS",
    typeLabel: "Company Secretary",
    specializations: ["ROC Filings", "Board Governance", "Startup Compliance"],
    services: ["Incorporation", "Annual filings", "Board resolutions", "Secretarial"],
    experience: 9,
    rating: 4.7,
    reviewCount: 61,
    consultationFee: 3200,
    bio: "Company Secretary helping startups and mid-market firms with ROC, governance, and secretarial compliance. Schedule a call for hands-on support.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: "Mumbai, India",
    availability: "By appointment",
    languages: ["English", "Hindi", "Marathi"],
    channels: ["call"],
    accent: "#0369a1",
    tagline: "ROC & governance — schedule with a CS",
    personality: "Structured and deadline-driven.",
    kpis: [
      { value: "9+", label: "Years" },
      { value: "120+", label: "Companies" },
      { value: "4.7★", label: "Rating" },
    ],
    capabilities: [
      {
        title: "Secretarial compliance",
        description: "MCA filings, board process, and annual calendars.",
      },
    ],
    workflows: [
      { num: "1", title: "Schedule", desc: "Book a consultation slot." },
      { num: "2", title: "Brief", desc: "Share CIN and open items." },
      { num: "3", title: "Advise", desc: "Filing plan and timelines." },
    ],
    sampleChat: [],
    faqs: [],
    escalationNote: "Human CS consultation.",
    liveTag: "Verified professional",
    listingKind: "human",
    isHumanProfessional: true,
  },
];

export function getSeedHumanProfessionals(): MarketplaceListing[] {
  return humanSeed;
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
    consultationFee: app.fee,
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

/** Server-safe marketplace: live AI demos + seeded human professionals */
export function getMarketplaceListings(): MarketplaceListing[] {
  const ai = getLiveDemoAgents().map((a) => ({
    ...a,
    listingKind: "ai" as const,
    isHumanProfessional: false,
  }));
  return [...ai, ...humanSeed];
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
