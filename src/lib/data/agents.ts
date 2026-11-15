export type AgentType =
  | "CA"
  | "CS"
  | "Lawyer"
  | "Wealth Management"
  | "Real Estate"
  | "IRP"
  | "FEMA"
  | "Insurance"
  | "Lending"
  | "CMA"
  | "Finance Consultant"
  | "Tax Consultant"
  | "Registered Valuer"
  | "Mutual Fund Distributor"
  | "Industry Expert";

/** A professional's profile, as served by the API (GET /professionals/:slug). */
export type Agent = {
  slug: string;
  name: string;
  type: AgentType;
  typeLabel: string;
  specializations: string[];
  services: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  bio: string;
  image: string;
  location: string;
  availability: string;
  languages: string[];
  channels: ("whatsapp" | "chat" | "call")[];
  accent: string;
  tagline: string;
  /** Public name of the AI Salahkar when it differs from the human professional. */
  aiName?: string;
  personality: string;
  kpis: { value: string; label: string }[];
  capabilities: { title: string; description: string }[];
  workflows: { num: string; title: string; desc: string }[];
  sampleChat: { role: "user" | "agent"; text: string }[];
  faqs: { q: string; a: string }[];
  escalationNote: string;
  liveTag: string;
  /** Live Vibrium demo — web chat + voice on site */
  liveDemo?: boolean;
};

/** Uniform half-hour rate until per-consultant pricing is set. */
export const STANDARD_HALF_HOUR_FEE = 1000;

/** The AI Salahkar's public name, or the professional's own name when it has none. */
export function aiConsultantName(agent: Pick<Agent, "name" | "aiName">): string {
  return agent.aiName ?? agent.name;
}
