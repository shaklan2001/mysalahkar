import { STANDARD_HALF_HOUR_FEE, type Agent } from "./agents";

/**
 * AI Salahkars stay defined here, not in the database: only these two are wired to live AI agents, and their pages,
 * chat and calls keep working exactly as before. Human profiles (including Ankit's and Soniya's) come from the API.
 */
const ALL_AI_SALAHKARS: Agent[] = [
  {
    slug: "ankit-gupta-ca",
    name: "Ankit Gupta",
    aiName: "Ankit AI",
    type: "CA",
    typeLabel: "Chartered Accountant",
    specializations: [
      "Income Tax & Corporate Taxation",
      "GST",
      "Mergers & Acquisitions (M&A)",
      "Start-up Advisory & Business Structuring",
    ],
    services: [
      "Startup Registration & Advisory",
      "Import Export Code (IEC) Registration",
      "ICEGATE Registration",
      "Income Tax Returns, Assessments & Tax Consulting",
      "Income Tax Search & Seizure Matters",
      "TAN Registration",
      "TDS Returns & Certificates (15CA/15CB, Property TDS)",
      "GST Registration, Returns & Compliance",
      "E-Way Bill & LUT under GST",
      "GST Assessments & Search/Seizure Matters",
      "TCS Registration under GST",
      "Risk Assurance & Internal Control Review",
      "M&A Taxation Advisory",
      "Financial Due Diligence",
      "Corporate Tax Planning & Structuring",
      "Statutory & Tax Audits",
      "Internal Audit & Internal Controls",
    ],
    experience: 15,
    rating: 4.9,
    reviewCount: 312,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "Ankit AI is an AI-powered guidance tool on MySalahkar, guided by CA Ankit Gupta, Chartered Accountant. He has rich experience of more than 15 Years in Financial Reporting, Income Tax, Corporate tax, GST, TDS, Import Export, financial advisory, mergers & acquisitions, business restructuring and regulatory compliance. He provides strategic and practical solutions to businesses, startups and corporates across the complete business lifecycle—from business setup and tax structuring to financial management, compliance, transactions and growth advisory.",
    image: "/consultants/ankit-gupta.jpg",
    location: "Delhi, India",
    availability: "Online 24/7",
    languages: ["English", "Hindi"],
    channels: ["chat", "call"],
    accent: "#0ea5e9",
    tagline: "Tax, GST & M&A Advisory for Growing Businesses",
    personality:
      "Solution-oriented and commercially focused. Combines deep tax expertise with transaction experience. Clear on compliance risks and practical next steps.",
    kpis: [
      { value: "15+", label: "Years Experience" },
      { value: "200+", label: "M&A & Restructuring Assignments" },
      { value: "FCA", label: "Credentials" },
      { value: "4.9★", label: "Client Rating" },
    ],
    capabilities: [
      {
        title: "Income Tax & Corporate Tax",
        description:
          "ITR filing, assessments, tax consulting, search and seizure advisory, TAN/TDS including 15CA/15CB and property TDS, and corporate tax planning.",
      },
      {
        title: "GST & Indirect Tax",
        description:
          "Registration, returns, e-way bill, LUT, assessments, TCS under GST, and compliance for businesses across sectors.",
      },
      {
        title: "M&A & Transaction Advisory",
        description:
          "M&A taxation, financial and tax due diligence, corporate restructuring, and transaction structuring for startups and corporates.",
      },
      {
        title: "Audit & Risk Assurance",
        description:
          "Statutory and tax audits, internal audit, internal controls review, and risk assurance frameworks.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Share Your Requirement",
        desc: "Describe your business stage, tax or compliance query, or transaction context via chat or call.",
      },
      {
        num: "2",
        title: "Strategic Advisory",
        desc: "Ankit analyses your situation, outlines applicable law, risks, and a practical action plan.",
      },
      {
        num: "3",
        title: "Execute & Comply",
        desc: "Guidance on filings, documentation, structuring, and escalation to human CA when needed.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "We are a startup raising Series A. What tax and compliance should we prepare?",
      },
      {
        role: "agent",
        text: "For Series A, key areas are: (1) Cap table and share allotment compliance; (2) Valuation and angel tax considerations; (3) TDS and ESOP tax implications; (4) GST if applicable; (5) Due diligence readiness—clean ITR/GST filings and financials. Are you a private limited company?",
      },
    ],
    faqs: [
      {
        q: "Can you advise on income tax search and seizure matters?",
        a: "Yes, at an advisory level—I guide on documentation, response strategy, and coordination for representation. Active search matters need immediate professional engagement.",
      },
      {
        q: "Do you handle GST registration and e-way bill compliance?",
        a: "Yes—GST registration, returns, e-way bill, LUT for exports, ITC reconciliation, and assessment or search-related queries.",
      },
      {
        q: "Can you support M&A and due diligence?",
        a: "Absolutely. I advise on M&A taxation, financial and tax due diligence scope, structuring, and compliance for corporate restructuring.",
      },
    ],
    escalationNote:
      "For active search and seizure, prosecution, signed representation before tax authorities, or complex cross-border M&A closing opinions, I'll connect you with CA Ankit Gupta's human practice team.",
    liveTag: "Live on Web Chat · Web Call",
    liveDemo: true,
  },
  {
    slug: "soniya-gupta-cs",
    name: "Soniya Gupta",
    aiName: "Soniya AI",
    type: "CS",
    typeLabel: "Company Secretary · Insolvency Professional · POSH Trainer",
    specializations: [
      "Corporate & Commercial Advisory",
      "IPO & Due Diligence",
      "Corporate Law",
      "SEBI & Listing Compliances",
      "Insolvency & Bankruptcy",
      "FEMA & Regulatory Compliances",
      "POSH Advisory & Training",
    ],
    services: [
      "Corporate & Commercial Consultancy",
      "IPO Due Diligence & Compliance",
      "NCLT/NCLAT Matters",
      "Insolvency & Liquidation",
      "Compounding & Condonation",
      "MCA/RD/ROC Approvals",
      "Secretarial & Compliance Audits",
      "Due Diligence & Search Reports",
      "FEMA & RBI Compliances",
      "NBFC Compliances",
      "POSH Training & ICC Services",
      "Corporate Restructuring & Incorporation",
      "Trademark, Copyright & Patent Registration",
      "Scrutinizer Services",
      "XBRL Conversion",
    ],
    experience: 18,
    rating: 4.9,
    reviewCount: 286,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "Soniya AI is an AI-powered guidance tool on MySalahkar, guided by CS Soniya Gupta, Company Secretary. She has a rich experience of more than 18 years in IPO, legal, Corporate Secretarial and Commercial Advisory, Certified POSH Trainer, adjudication before NCLT, NCLAT, Compounding of offences, Approvals of Regulatory Authorities, Audits, Compliances & Certification and Other Secretarial & Legal Areas etc.",
    image: "/consultants/soniya-gupta.jpg",
    location: "New Delhi, India",
    availability: "Online 24/7",
    languages: ["English", "Hindi"],
    channels: ["chat", "call"],
    accent: "#8b5cf6",
    tagline: "Corporate Compliance, IPO & Insolvency Expertise",
    personality:
      "Authoritative and structured. Balances regulatory precision with practical business context. Clear on when matters need formal representation.",
    kpis: [
      { value: "18+", label: "Years Experience" },
      { value: "FCS, LL.B., IP", label: "Credentials" },
      { value: "NCLT+", label: "Regulatory Matters" },
      { value: "4.9★", label: "Client Rating" },
    ],
    capabilities: [
      {
        title: "Corporate & IPO Advisory",
        description:
          "Companies Act compliance, board processes, IPO due diligence, SEBI and listing regulations, and MCA/ROC filings.",
      },
      {
        title: "Insolvency & NCLT",
        description:
          "IBC insolvency processes, liquidation advisory, NCLT/NCLAT matter guidance, and coordination with insolvency professionals.",
      },
      {
        title: "FEMA & Regulatory",
        description:
          "FEMA and RBI compliance, NBFC regulatory themes, compounding and condonation routes, and regulatory approval processes.",
      },
      {
        title: "POSH & Secretarial",
        description:
          "POSH training and ICC services, secretarial audits, scrutinizer services, and XBRL conversion.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Brief the Matter",
        desc: "Share entity type, filings pending, or regulatory question.",
      },
      {
        num: "2",
        title: "Compliance Map",
        desc: "Soniya outlines applicable filings, timelines, and risk areas.",
      },
      {
        num: "3",
        title: "Execute & Represent",
        desc: "Guidance on filings and escalation for NCLT/ROC representation when needed.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "We need help with ROC annual filings and a secretarial audit.",
      },
      {
        role: "agent",
        text: "I can guide on AOC-4/MGT-7 timelines, board documentation, and secretarial audit scope under the Companies Act. Share your company type, last AGM date, and whether you're listed or unlisted so I can prioritise the calendar.",
      },
    ],
    faqs: [
      {
        q: "Do you handle NCLT/NCLAT matters?",
        a: "Yes—advisory and coordination for insolvency, compounding, condonation, and other NCLT/NCLAT matters, with human representation where required.",
      },
      {
        q: "Can you support IPO due diligence?",
        a: "Yes—IPO due diligence, SEBI and listing compliance themes, and secretarial readiness for the offer process.",
      },
      {
        q: "Do you provide POSH training?",
        a: "Yes—POSH training and Internal Complaints Committee (ICC) related services for organisations.",
      },
    ],
    escalationNote:
      "For court/tribunal appearances, signed opinions, or insolvency appointments requiring a registered IP engagement, I'll connect you with Soniya Gupta's practice team.",
    liveTag: "Live on Web Chat · Web Call",
    liveDemo: true,
  },
];

/**
 * Which AI Salahkars the website shows. Soniya AI is hidden for now; add "soniya-gupta-cs" back to show her again.
 * A professional not in this list is shown as a human professional only.
 */
export const AI_SALAHKAR_SLUGS: readonly string[] = ["ankit-gupta-ca"];

export const aiSalahkars: Agent[] = ALL_AI_SALAHKARS.filter((agent) => AI_SALAHKAR_SLUGS.includes(agent.slug));

export function isAiSalahkarSlug(slug: string): boolean {
  return AI_SALAHKAR_SLUGS.includes(slug);
}

export function getAiSalahkarAgent(slug: string): Agent | undefined {
  return aiSalahkars.find((agent) => agent.slug === slug);
}

/** The AI Salahkar to talk to: this professional's, or the first one shown. */
export function resolveAiSalahkarSlug(slug?: string): string {
  return slug && isAiSalahkarSlug(slug) ? slug : AI_SALAHKAR_SLUGS[0];
}
