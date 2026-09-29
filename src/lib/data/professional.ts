export type ProfessionalStatus = "draft" | "pending_review" | "live" | "paused";

export type ProfessionalProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  firm: string;
  credentials: string;
  domain: string;
  city: string;
  agentName: string;
  agentSlug: string;
  tagline: string;
  bio: string;
  consultationFee: number;
  shareRate: number;
  status: ProfessionalStatus;
  joinedAt: string;
  verified: boolean;
};

export type DashboardMetrics = {
  consultations: number;
  consultationsDelta: number;
  conversionRate: number;
  conversionDelta: number;
  grossGmv: number;
  yourShare: number;
  shareDelta: number;
  escalations: number;
  rating: number;
  reviewCount: number;
};

export type DailyPoint = {
  date: string;
  consultations: number;
  earnings: number;
};

export type EarningRow = {
  id: string;
  date: string;
  type: "Consultation" | "Service" | "Escalation" | "Referral";
  client: string;
  gross: number;
  share: number;
  status: "Paid" | "Pending" | "Processing";
};

export type LeadRow = {
  id: string;
  client: string;
  channel: "WhatsApp" | "Chat" | "Call";
  topic: string;
  status: "Open" | "Converted" | "Escalated" | "Closed";
  value: number;
  at: string;
};

export const mockProfessional: ProfessionalProfile = {
  id: "pro-1",
  name: "Dr. Ananya Mehta",
  email: "ananya.mehta@example.com",
  phone: "+91 98765 43210",
  firm: "Mehta & Associates",
  credentials: "FCA, DISA",
  domain: "CA",
  city: "Mumbai",
  agentName: "Ananya",
  agentSlug: "ananya-ca",
  tagline: "GST, tax planning & MSME compliance — clear and on time",
  bio: "Practising CA with 14 years advising startups and MSMEs on GST, direct tax, and statutory audits. My AI Salahkar handles first-line queries; I take over for audits, notices, and complex planning.",
  consultationFee: 1000,
  shareRate: 0.55,
  status: "live",
  joinedAt: "2026-03-12",
  verified: true,
};

export const mockMetrics: DashboardMetrics = {
  consultations: 186,
  consultationsDelta: 12.4,
  conversionRate: 28.5,
  conversionDelta: 3.1,
  grossGmv: 412500,
  yourShare: 226875,
  shareDelta: 8.6,
  escalations: 24,
  rating: 4.9,
  reviewCount: 67,
};

export const mockDailySeries: DailyPoint[] = [
  { date: "Sep 8", consultations: 4, earnings: 5200 },
  { date: "Sep 10", consultations: 6, earnings: 7800 },
  { date: "Sep 12", consultations: 5, earnings: 6400 },
  { date: "Sep 14", consultations: 8, earnings: 11200 },
  { date: "Sep 16", consultations: 7, earnings: 9100 },
  { date: "Sep 18", consultations: 9, earnings: 12400 },
  { date: "Sep 20", consultations: 6, earnings: 8200 },
  { date: "Sep 22", consultations: 11, earnings: 15800 },
  { date: "Sep 24", consultations: 8, earnings: 10500 },
  { date: "Sep 26", consultations: 10, earnings: 14200 },
  { date: "Sep 28", consultations: 7, earnings: 9800 },
  { date: "Sep 30", consultations: 12, earnings: 16800 },
];

export const mockEarnings: EarningRow[] = [
  {
    id: "e1",
    date: "2026-09-28",
    type: "Consultation",
    client: "Ravi Traders",
    gross: 2500,
    share: 1375,
    status: "Paid",
  },
  {
    id: "e2",
    date: "2026-09-27",
    type: "Service",
    client: "Nova Soft Pvt Ltd",
    gross: 18000,
    share: 9900,
    status: "Processing",
  },
  {
    id: "e3",
    date: "2026-09-26",
    type: "Escalation",
    client: "Priya Nair",
    gross: 8500,
    share: 6800,
    status: "Paid",
  },
  {
    id: "e4",
    date: "2026-09-24",
    type: "Consultation",
    client: "Greenfield Foods",
    gross: 2500,
    share: 1375,
    status: "Paid",
  },
  {
    id: "e5",
    date: "2026-09-22",
    type: "Referral",
    client: "Orbit Logistics",
    gross: 12000,
    share: 3600,
    status: "Pending",
  },
  {
    id: "e6",
    date: "2026-09-20",
    type: "Service",
    client: "Saanvi Design Co",
    gross: 9500,
    share: 5225,
    status: "Paid",
  },
];

export const mockLeads: LeadRow[] = [
  {
    id: "l1",
    client: "Ravi Traders",
    channel: "WhatsApp",
    topic: "GSTR-3B late fee mitigation",
    status: "Converted",
    value: 2500,
    at: "2026-09-28T09:14:00",
  },
  {
    id: "l2",
    client: "Nova Soft Pvt Ltd",
    channel: "Chat",
    topic: "Tax audit readiness FY25-26",
    status: "Escalated",
    value: 18000,
    at: "2026-09-27T16:40:00",
  },
  {
    id: "l3",
    client: "Priya Nair",
    channel: "Call",
    topic: "IT scrutiny notice response",
    status: "Escalated",
    value: 8500,
    at: "2026-09-26T11:05:00",
  },
  {
    id: "l4",
    client: "Aarav Kapoor",
    channel: "WhatsApp",
    topic: "Startup India & 80-IAC",
    status: "Open",
    value: 0,
    at: "2026-09-29T08:22:00",
  },
  {
    id: "l5",
    client: "Mehta Retail LLP",
    channel: "Chat",
    topic: "ITC mismatch GSTR-2B",
    status: "Open",
    value: 0,
    at: "2026-09-29T07:55:00",
  },
  {
    id: "l6",
    client: "Greenfield Foods",
    channel: "Call",
    topic: "TDS return filing",
    status: "Closed",
    value: 2500,
    at: "2026-09-24T14:10:00",
  },
];

export const shareTiers = [
  {
    title: "AI consultations",
    rate: "50–55%",
    detail: "Your share of paid chat, WhatsApp, and call consultations handled by your AI Salahkar.",
  },
  {
    title: "Service fulfilment",
    rate: "45–60%",
    detail: "When a client books a filing or advisory package through your AI Salahkar listing.",
  },
  {
    title: "Human escalations",
    rate: "70–80%",
    detail: "When you personally take over a complex matter — higher share for your time.",
  },
  {
    title: "Referrals",
    rate: "10–25%",
    detail: "Share when your AI Salahkar refers work to another domain consultant on the platform.",
  },
];

export const professionalDomains = [
  "CA — Chartered Accountant",
  "CS — Company Secretary",
  "Lawyer / Advocate",
  "FEMA / Cross-border",
  "Wealth / RIA",
  "Insurance",
  "Real Estate",
  "Insolvency (IRP/RP)",
  "Lending / Credit",
];
