export type HomeStat = {
  value: string;
  label: string;
};

export const homeStats: HomeStat[] = [
  { value: "500+", label: "AI Consultants" },
  { value: "10,000+", label: "Consultations Handled" },
  { value: "50+", label: "Learning Sessions" },
  { value: "4.8/5", label: "Average Rating" },
];

export type TrustLogo = {
  name: string;
  description: string;
};

export const trustLogos: TrustLogo[] = [
  { name: "STARTUP INDIA", description: "DPIIT Recognized Platform" },
  { name: "MSME", description: "Supporting MSMEs Nationwide" },
  { name: "NASSCOM", description: "Technology Innovation Partner" },
  { name: "CII", description: "Confederation of Indian Industry Member" },
  { name: "FICCI", description: "Federation of Indian Chambers of Commerce" },
];

export type DomainCard = {
  title: string;
  description: string;
  icon: string;
  color: string;
  agentCount: number;
};

export const domainCards: DomainCard[] = [
  {
    title: "Chartered Accountants",
    description: "Tax, GST, Audit, Compliance & Financial Advisory",
    icon: "Calculator",
    color: "#0ea5e9",
    agentCount: 5,
  },
  {
    title: "Company Secretaries",
    description: "ROC, Corporate Governance, SEBI & Capital Markets",
    icon: "Briefcase",
    color: "#ec4899",
    agentCount: 2,
  },
  {
    title: "Lawyers",
    description: "Corporate, IP, Family, Property & Labour Law",
    icon: "Scale",
    color: "#3b82f6",
    agentCount: 4,
  },
  {
    title: "FEMA Consultants",
    description: "FDI, ODI, ECB, LRS & Cross-Border Compliance",
    icon: "Globe",
    color: "#0ea5e9",
    agentCount: 1,
  },
  {
    title: "Wealth Management",
    description: "Investment Planning, Portfolio & Financial Goals",
    icon: "TrendingUp",
    color: "#f59e0b",
    agentCount: 2,
  },
  {
    title: "Real Estate Consultants",
    description: "RERA, Title Verification & Property Transactions",
    icon: "Home",
    color: "#10b981",
    agentCount: 1,
  },
  {
    title: "Insolvency Professionals",
    description: "CIRP, Liquidation, NCLT & Debt Restructuring",
    icon: "AlertCircle",
    color: "#ef4444",
    agentCount: 1,
  },
];

export type WhyChooseFeature = {
  title: string;
  description: string;
  icon: string;
};

export const whyChooseFeatures: WhyChooseFeature[] = [
  {
    title: "AI-Powered Experts",
    description:
      "500+ AI consultants trained on years of professional practice—CA, CS, lawyers, FEMA, IRP, wealth advisors. Get expert guidance instantly.",
    icon: "Brain",
  },
  {
    title: "24/7 Availability",
    description:
      "No waiting for office hours. Consult via WhatsApp, chat, or call anytime—nights, weekends, holidays. Instant responses, zero delays.",
    icon: "Clock",
  },
  {
    title: "Community & Learning",
    description:
      "Join 2,450+ professionals sharing insights. Access 50+ courses on GST, corporate law, IP, tax planning, and more. Grow your knowledge.",
    icon: "Users",
  },
  {
    title: "Secure & Confidential",
    description:
      "End-to-end encryption for all conversations. Your data is protected with bank-grade security. GDPR and DPDP compliant.",
    icon: "Lock",
  },
  {
    title: "Top Rated & Trusted",
    description:
      "4.8/5 average rating from 10,000+ consultations. Backed by STARTUP INDIA, NASSCOM, and trusted by MSMEs and startups nationwide.",
    icon: "Award",
  },
];

export type HowItWorksStep = {
  num: string;
  title: string;
  description: string;
};

export const howItWorksSteps: HowItWorksStep[] = [
  {
    num: "1",
    title: "Find Your Expert",
    description:
      "Browse 500+ AI consultants across CA, CS, lawyers, FEMA, wealth, real estate, insolvency. Filter by specialization, rating, and fees.",
  },
  {
    num: "2",
    title: "Book Consultation",
    description:
      "Choose your preferred channel—WhatsApp, chat, or call. Share your query, documents, or concern. Consultation fees: ₹1,000 per 30 minutes.",
  },
  {
    num: "3",
    title: "Get Expert Advice",
    description:
      "Receive instant, actionable guidance—tax strategies, legal drafts, compliance checklists, investment plans. Follow-up support included.",
  },
];
