export type AgentType =
  | "CA"
  | "CS"
  | "Lawyer"
  | "Wealth Management"
  | "Real Estate"
  | "IRP"
  | "FEMA"
  | "Insurance"
  | "Lending";

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

export const LIVE_DEMO_AGENT_SLUGS = ["ankit-gupta-ca", "soniya-gupta-cs"] as const;
export type LiveDemoAgentSlug = (typeof LIVE_DEMO_AGENT_SLUGS)[number];

export const agents: Agent[] = [
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
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
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
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
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
      "For court/tribunal appearances, signed opinions, or insolvency appointments requiring a licensed IP engagement, I'll connect you with Soniya Gupta's practice team.",
    liveTag: "Live on Web Chat · Web Call",
    liveDemo: true,
  },
  {
    slug: "ashok-mehta-funding",
    name: "Ashok Mehta",
    type: "Lending",
    typeLabel: "Business Funding & Capital Advisory",
    specializations: [
      "Business Funding & Capital Advisory",
      "Project & Structured Finance",
      "Working Capital & Term Finance",
      "Debt Structuring & Refinancing",
      "Capital Raising and Transaction Advisory",
      "Lender Advisory & Financing Strategy",
      "Private Equity & Growth Capital",
    ],
    services: [
      "Project Finance",
      "Working Capital Finance",
      "Business Term Loans",
      "Loan Against Property (LAP)",
      "Debt Structuring & Refinancing",
      "Capital Advisory",
      "Lender & Transaction Advisory",
      "Private Equity",
    ],
    experience: 20,
    rating: 4.8,
    reviewCount: 140,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "Ashok Mehta is a finance professional with 20 years of experience in corporate finance, business funding, capital structuring and lender advisory. Based in Gurugram, Haryana, he works with businesses across India to identify, structure and facilitate appropriate funding solutions aligned with their business requirements and growth objectives. His experience spans banks, NBFCs, private credit institutions and structured funding solutions.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: "Gurugram, India",
    availability: "By appointment",
    languages: ["English", "Hindi"],
    channels: ["call"],
    accent: "#1d4ed8",
    tagline: "Business funding, debt structuring & capital advisory",
    personality:
      "Practical lender-and-business perspective. Focused on structuring fundable proposals and matching the right capital source.",
    kpis: [
      { value: "20+", label: "Years Experience" },
      { value: "Banks + NBFC", label: "Lender Network" },
      { value: "Pan-India", label: "Coverage" },
      { value: "4.8★", label: "Client Rating" },
    ],
    capabilities: [
      {
        title: "Project & Structured Finance",
        description:
          "Funding solutions for new projects, expansion and capacity enhancement with structured facilities.",
      },
      {
        title: "Working Capital & Term Loans",
        description:
          "Structuring working capital and term funding for day-to-day operations, asset acquisition and growth.",
      },
      {
        title: "Debt & Capital Advisory",
        description:
          "Optimising debt, refinancing, lender selection, proposal preparation and PE/growth capital introductions.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Understand Funding Need",
        desc: "Share business model, quantum, tenure and purpose of funds.",
      },
      {
        num: "2",
        title: "Structure the Solution",
        desc: "Ashok maps suitable products—WC, term loan, LAP, project finance or equity.",
      },
      {
        num: "3",
        title: "Lender Engagement",
        desc: "Support on proposals, negotiations and transaction execution.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "We need ₹5 Cr working capital and a term loan for expansion.",
      },
      {
        role: "agent",
        text: "I typically structure a mix of WC limits and term facilities based on cash cycles, collateral and lender appetite. Share turnover, existing debt, and whether you prefer bank or NBFC channels so I can outline a fundable structure.",
      },
    ],
    faqs: [
      {
        q: "Do you arrange Loan Against Property?",
        a: "Yes—LAP solutions secured against eligible residential, commercial or industrial property, alongside broader debt structuring.",
      },
      {
        q: "Can you help with private equity introductions?",
        a: "Yes—advisory on equity capital raising and connecting suitable growth-stage funding opportunities.",
      },
    ],
    escalationNote:
      "Funding mandates and lender negotiations are handled personally by Ashok Mehta's advisory practice.",
    liveTag: "Verified professional",
  },
  {
    slug: "avdhesh-varshney-ca",
    name: "Avdhesh Varshney",
    type: "CA",
    typeLabel: "Chartered Accountant · Risk & Advisory",
    specializations: [
      "Internal & Risk-Based Audit",
      "Internal Financial Controls (IFC/ICFR) & SOX 404",
      "IT General Controls (ITGC) & IT Application Controls (ITAC)",
      "Enterprise Risk Management",
      "Standard Operating Procedures & Control Frameworks",
      "Forensic Reviews & Investigations",
      "ERP Controls – SAP, Oracle & Dynamics",
    ],
    services: [
      "Internal Audit & Risk Advisory",
      "IFC / ICFR & SOX Compliance",
      "IT Audit and ERP Controls Assessment",
      "Internal Control Design & Testing",
      "Enterprise Risk Management",
      "SOP Development & Process Improvement",
      "Forensic Investigation & Reviews",
      "Audit Committee & Management Advisory",
    ],
    experience: 14,
    rating: 4.8,
    reviewCount: 98,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "Avdhesh Varshney is a Risk & Advisory professional with 14+ years of experience across risk advisory, assurance, internal audit, financial controls, IT controls and forensic reviews. He has worked across sectors including financial services, manufacturing, retail and automotive.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: "Ghaziabad, India",
    availability: "By appointment",
    languages: ["English", "Hindi"],
    channels: ["call"],
    accent: "#0d9488",
    tagline: "Risk advisory, IFC/SOX, IT controls & forensic reviews",
    personality:
      "Control-focused and methodical. Strong on IFC/SOX, ITGC/ITAC and forensic investigation frameworks.",
    kpis: [
      { value: "14+", label: "Years Experience" },
      { value: "IFC / SOX", label: "Control Frameworks" },
      { value: "ERP", label: "SAP · Oracle · Dynamics" },
      { value: "4.8★", label: "Client Rating" },
    ],
    capabilities: [
      {
        title: "Internal Audit & IFC",
        description:
          "Risk-based internal audit, IFC/ICFR and SOX 404 design, testing and remediation.",
      },
      {
        title: "IT & ERP Controls",
        description:
          "ITGC/ITAC assessments and ERP controls reviews across SAP, Oracle and Dynamics.",
      },
      {
        title: "Forensic & ERM",
        description:
          "Forensic reviews, enterprise risk management, SOP design and audit committee advisory.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Scope the Risk Area",
        desc: "Define process, system or investigation scope.",
      },
      {
        num: "2",
        title: "Assess & Test",
        desc: "Control walkthroughs, ITGC/ITAC testing or forensic analytics.",
      },
      {
        num: "3",
        title: "Remediate & Report",
        desc: "Findings, remediation roadmap and management/audit committee reporting.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "We need an IFC / ICFR review before year-end.",
      },
      {
        role: "agent",
        text: "I typically start with entity-level controls, then key processes (procure-to-pay, order-to-cash, payroll) and ITGCs. Share your reporting framework (Companies Act / SOX) and ERP so I can propose a scoped review plan.",
      },
    ],
    faqs: [
      {
        q: "Do you cover SOX 404 and IFC?",
        a: "Yes—design, documentation, testing and remediation for IFC/ICFR and SOX 404 programs.",
      },
      {
        q: "Can you review SAP / Oracle controls?",
        a: "Yes—ITGC, ITAC and ERP control assessments across SAP, Oracle and Dynamics.",
      },
    ],
    escalationNote:
      "Formal audit opinions, forensic engagements and board reporting are handled through Avdhesh Varshney's risk advisory practice.",
    liveTag: "Verified professional",
  },
  {
    slug: "nayansi-agrawal-ca",
    name: "Nayansi Agrawal",
    type: "CA",
    typeLabel: "Chartered Accountant · Registered Valuer",
    specializations: [
      "Business & Equity Valuation",
      "Securities & Financial Assets Valuation",
      "M&A, Exchange Ratios & Fairness Opinions",
      "ESOP / Sweat Equity Valuation",
      "IBC / Insolvency Valuation",
      "Regulatory & Tax Valuations",
      "Financial Reporting under Ind AS",
      "Corporate & Compliance Advisory",
    ],
    services: [
      "Business & Share Valuation",
      "M&A and Transaction Valuation",
      "Fairness Opinions & Swap/Exchange Ratio Advisory",
      "ESOP & Sweat Equity Valuation",
      "PE / VC Fundraising Valuation",
      "IBC & Insolvency Valuation",
      "Fair Value, PPA & Impairment Testing",
      "FEMA & Income Tax Valuations",
      "GST Audit & Compliance Advisory",
      "Virtual CFO & Managed Services",
    ],
    experience: 6,
    rating: 4.8,
    reviewCount: 72,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "Nayansi Agrawal is an IBBI Registered Valuer – Securities & Financial Assets and a Fellow Chartered Accountant (FCA) with expertise in business valuation, corporate advisory, M&A, fundraising, financial reporting and regulatory valuations. She has 6+ years of compliance advisory experience, including GST audits, certifications and end-to-end regulatory support.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: "Ghaziabad, India",
    availability: "By appointment",
    languages: ["English", "Hindi"],
    channels: ["call"],
    accent: "#b45309",
    tagline: "IBBI Registered Valuer · M&A, ESOP & regulatory valuations",
    personality:
      "Precise on valuation standards and regulatory purpose. Clear on Ind AS, FEMA, tax and IBC valuation contexts.",
    kpis: [
      { value: "6+", label: "Years Experience" },
      { value: "IBBI RV", label: "Securities & Financial Assets" },
      { value: "FCA", label: "Credentials" },
      { value: "4.8★", label: "Client Rating" },
    ],
    capabilities: [
      {
        title: "Business & Equity Valuation",
        description:
          "Business, share and securities valuations for fundraising, M&A and fairness opinions.",
      },
      {
        title: "Regulatory & Tax Valuations",
        description:
          "FEMA, income tax, ESOP/sweat equity, IBC and Ind AS fair value / PPA / impairment work.",
      },
      {
        title: "Compliance & vCFO",
        description:
          "GST audit and compliance advisory plus virtual CFO and managed finance services.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Define Valuation Purpose",
        desc: "Fundraising, M&A, ESOP, FEMA, tax or IBC—purpose drives standard and approach.",
      },
      {
        num: "2",
        title: "Analyse & Model",
        desc: "Financials, projections and method selection (DCF, market, asset-based).",
      },
      {
        num: "3",
        title: "Report & Advise",
        desc: "Valuation report, fairness opinion or swap ratio with clear assumptions.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "We need an ESOP valuation and a FEMA valuation for a share transfer.",
      },
      {
        role: "agent",
        text: "ESOP and FEMA valuations follow different purpose and standard requirements. Share company stage, last audited financials, and the regulatory trigger so I can confirm scope and timelines.",
      },
    ],
    faqs: [
      {
        q: "Are you an IBBI Registered Valuer?",
        a: "Yes—Registered Valuer for Securities & Financial Assets, covering business, equity and related regulatory valuations.",
      },
      {
        q: "Do you handle IBC valuations?",
        a: "Yes—IBC / insolvency valuation support alongside M&A and fundraising valuations.",
      },
    ],
    escalationNote:
      "Signed valuation reports and statutory certifications are issued through Nayansi Agrawal's registered valuer practice.",
    liveTag: "Verified professional",
  },
  {
    slug: "taran-aggarwal-ca",
    name: "Taran Aggarwal",
    type: "CA",
    typeLabel: "Chartered Accountant",
    specializations: [
      "External Audit & Assurance",
      "Financial Advisory",
      "U.S. Client Advisory",
      "Hedge Funds & Mutual Funds",
      "Private Equity",
      "Investment & Fund-related Advisory",
      "Cross-border / International Client Services",
    ],
    services: [
      "External Audit & Assurance",
      "Audit & Financial Reporting Advisory",
      "Advisory Services for Hedge Funds",
      "Mutual Fund Advisory",
      "Private Equity Advisory",
      "Financial & Business Advisory",
      "U.S. Client Accounting & Compliance Support",
      "Cross-border Advisory Services",
    ],
    experience: 15,
    rating: 4.8,
    reviewCount: 110,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "Taran Aggarwal is a Chartered Accountant (ICAI) with a Bachelor's degree in Commerce from the University of Delhi and has also completed the Executive Program – Future Ready Leaders from ISB Hyderabad. He brings 15+ years of experience in external audit and advisory, with extensive experience serving U.S. clients, including Hedge Funds, Mutual Funds and Private Equity firms.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: "Delhi, Noida and Dubai",
    availability: "By appointment",
    languages: ["English", "Hindi"],
    channels: ["call"],
    accent: "#0369a1",
    tagline: "External audit & U.S. fund / PE advisory",
    personality:
      "International client-ready. Strong on audit, funds and cross-border advisory for U.S. and India-linked entities.",
    kpis: [
      { value: "15+", label: "Years Experience" },
      { value: "U.S. Funds", label: "HF · MF · PE" },
      { value: "ISB", label: "Future Ready Leaders" },
      { value: "4.8★", label: "Client Rating" },
    ],
    capabilities: [
      {
        title: "External Audit & Assurance",
        description:
          "External audit, assurance and financial reporting advisory for corporates and investment entities.",
      },
      {
        title: "Fund & PE Advisory",
        description:
          "Advisory for hedge funds, mutual funds and private equity firms, including U.S. client support.",
      },
      {
        title: "Cross-border Services",
        description:
          "International client accounting, compliance support and cross-border advisory across Delhi, Noida and Dubai.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Client Context",
        desc: "Entity type, jurisdiction and audit/advisory need.",
      },
      {
        num: "2",
        title: "Scope & Plan",
        desc: "Assurance plan or advisory workstream for funds/PE/corporates.",
      },
      {
        num: "3",
        title: "Deliver & Report",
        desc: "Audit support, reporting packs or cross-border compliance guidance.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "We are a PE-backed company needing U.S. investor reporting support.",
      },
      {
        role: "agent",
        text: "I work frequently with U.S. fund and PE reporting packs—financials, covenant schedules and investor metrics. Share your reporting calendar and GAAP/IFRS basis so I can outline support.",
      },
    ],
    faqs: [
      {
        q: "Do you work with hedge funds and mutual funds?",
        a: "Yes—extensive experience serving U.S. clients including hedge funds, mutual funds and private equity firms.",
      },
      {
        q: "Are you available across Delhi, Noida and Dubai?",
        a: "Yes—practice coverage across Delhi, Noida and Dubai for international and domestic clients.",
      },
    ],
    escalationNote:
      "Statutory audit appointments and signed assurance opinions are handled through Taran Aggarwal's practice.",
    liveTag: "Verified professional",
  },
  {
    slug: "pawan-agarwal-cs",
    name: "Pawan Agarwal",
    type: "CS",
    typeLabel: "Company Secretary · Corporate & Transaction Advisor",
    specializations: [
      "Secretarial Affairs & Corporate Governance",
      "Corporate Restructuring & Transaction Structuring",
      "Mergers & Acquisitions (M&A)",
      "Fund Sourcing & Banking / Finance",
      "IPO Management & Stock Exchange Operations",
      "Legal, Commercial & Loan Documentation",
      "Regulatory & Government Liaison",
      "Strategic Transaction Advisory",
    ],
    services: [
      "Corporate restructuring and strategic transaction advisory",
      "Mergers, acquisitions and corporate reorganisation support",
      "Fund raising and banking & finance advisory",
      "IPO management and stock exchange-related assistance",
      "Drafting and review of legal, commercial and loan documentation",
      "Secretarial support, including conducting and documenting corporate meetings",
      "Transaction structuring and implementation support",
      "Liaison with government departments and regulatory authorities",
      "Coordination with banks, financial institutions and external agencies",
      "Regulatory and compliance coordination with ROC, RD, MCA, RBI, SEBI, Ministry of Finance and Stock Exchanges",
    ],
    experience: 30,
    rating: 4.9,
    reviewCount: 165,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "Pawan Agarwal brings over 30 years of extensive experience across corporate secretarial affairs, corporate restructuring, M&A, fund sourcing, IPO management, banking and finance, transaction structuring and regulatory liaison. He has strong expertise in handling complex corporate and financial transactions, preparing and reviewing legal and commercial documentation, and managing interactions with key regulatory authorities and financial institutions.",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: "Delhi, India",
    availability: "By appointment",
    languages: ["English", "Hindi"],
    channels: ["call"],
    accent: "#7c3aed",
    tagline: "30+ years · M&A, IPO, fund sourcing & regulatory liaison",
    personality:
      "Seasoned transaction and regulatory coordinator. Strong relationship management with banks, regulators and stakeholders.",
    kpis: [
      { value: "30+", label: "Years Experience" },
      { value: "M&A / IPO", label: "Transaction Focus" },
      { value: "ROC–SEBI", label: "Regulatory Liaison" },
      { value: "4.9★", label: "Client Rating" },
    ],
    capabilities: [
      {
        title: "Restructuring & M&A",
        description:
          "Corporate restructuring, M&A support, transaction structuring and implementation.",
      },
      {
        title: "IPO & Capital Markets",
        description:
          "IPO management, stock exchange operations support and fund-raising coordination.",
      },
      {
        title: "Regulatory Liaison",
        description:
          "Coordination with ROC, RD, MCA, RBI, SEBI, Ministry of Finance, banks and stock exchanges.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Transaction Brief",
        desc: "Share deal type—restructuring, M&A, IPO or fund raise.",
      },
      {
        num: "2",
        title: "Structure & Docs",
        desc: "Transaction structure, documentation and stakeholder map.",
      },
      {
        num: "3",
        title: "Execute & Liaise",
        desc: "Regulatory filings, bank/FI coordination and closing support.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "We are planning a merger and need ROC/SEBI coordination support.",
      },
      {
        role: "agent",
        text: "Mergers typically need scheme documentation, board/shareholder process, and liaison with ROC/RD and, where applicable, stock exchanges or SEBI. Share listed/unlisted status and draft timelines so I can outline the workstream.",
      },
    ],
    faqs: [
      {
        q: "Do you help with IPO management?",
        a: "Yes—IPO management and stock exchange-related assistance alongside secretarial and documentation support.",
      },
      {
        q: "Can you coordinate with banks and regulators?",
        a: "Yes—proven experience liaising with government departments, ROC, RD, MCA, RBI, SEBI, banks and financial institutions.",
      },
    ],
    escalationNote:
      "Complex transaction execution and regulatory representation are handled personally through Pawan Agarwal's advisory practice.",
    liveTag: "Verified professional",
  },
  {
    slug: "piyush-saraf-lawyer",
    name: "Piyush Saraf",
    type: "Lawyer",
    typeLabel: "Lawyer · Commercial & Regulatory",
    specializations: [
      "Commercial Contracts & Legal Advisory",
      "Commercial & Corporate Disputes",
      "Employment & Labour Law Matters",
      "Environmental & Regulatory Matters",
      "Litigation & Dispute Resolution",
      "Legal Risk Management & Compliance",
      "Government & Regulatory Liaison",
    ],
    services: [
      "Drafting, reviewing and negotiating commercial contracts",
      "Legal advisory on commercial, employment and environmental matters",
      "Dispute management and remedial action planning",
      "Representation before Courts, Tribunals, Forums and Regulatory Authorities",
      "Coordination with external counsels and internal business functions",
      "Liaison with government departments and regulatory authorities",
      "Designing and implementing legal processes, policies and procedures",
      "Establishing legal risk management frameworks and guidelines",
      "Advising organizations on legal and regulatory risk mitigation",
    ],
    experience: 3,
    rating: 4.7,
    reviewCount: 28,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "Piyush Saraf is a legal professional with 3 years of experience in commercial contracts, dispute resolution, employment and environmental matters. Based in Delhi, he provides legal advisory, litigation support, regulatory representation and risk-management services, with a focus on helping organizations effectively manage legal and regulatory requirements.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: "Delhi, India",
    availability: "By appointment",
    languages: ["English", "Hindi"],
    channels: ["call"],
    accent: "#dc2626",
    tagline: "Commercial contracts, disputes & regulatory legal advisory",
    personality:
      "Practical commercial lawyer. Focused on contracts, disputes, employment and regulatory risk mitigation.",
    kpis: [
      { value: "3+", label: "Years Experience" },
      { value: "Contracts", label: "Commercial Focus" },
      { value: "Delhi", label: "Based" },
      { value: "4.7★", label: "Client Rating" },
    ],
    capabilities: [
      {
        title: "Commercial Contracts",
        description:
          "Drafting, reviewing and negotiating commercial contracts for businesses.",
      },
      {
        title: "Disputes & Litigation",
        description:
          "Dispute management, remedial planning and representation before courts, tribunals and forums.",
      },
      {
        title: "Employment & Regulatory",
        description:
          "Employment/labour, environmental and regulatory advisory with legal risk frameworks.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Issue Brief",
        desc: "Share contract, dispute or regulatory question.",
      },
      {
        num: "2",
        title: "Legal Assessment",
        desc: "Risk analysis, options and recommended next steps.",
      },
      {
        num: "3",
        title: "Draft or Represent",
        desc: "Contract work, notices, or representation coordination.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "Can you review our vendor MSA and flag risky clauses?",
      },
      {
        role: "agent",
        text: "Yes—I typically review liability caps, indemnity, termination, IP, data protection and dispute resolution clauses. Share the draft and your non-negotiables so I can prioritise redlines.",
      },
    ],
    faqs: [
      {
        q: "Do you handle employment and labour matters?",
        a: "Yes—employment and labour law advisory alongside commercial and environmental matters.",
      },
      {
        q: "Can you represent before courts and tribunals?",
        a: "Yes—representation before courts, tribunals, forums and regulatory authorities, with coordination of external counsel when needed.",
      },
    ],
    escalationNote:
      "Court appearances and formal legal opinions are handled through Piyush Saraf's legal practice.",
    liveTag: "Verified professional",
  },
  {
    slug: "nikhil-kumar-verma-lawyer",
    name: "Nikhil Kumar Verma",
    type: "Lawyer",
    typeLabel: "Advocate · Founder, Satyarth Legal",
    specializations: [
      "Corporate and Commercial Law",
      "Startup Transactional Agreements (SHA, SSA, Founders)",
      "Insolvency and Bankruptcy Law",
      "Intellectual Property Rights (IPR)",
      "Arbitration and Alternative Dispute Resolution",
      "Civil and Commercial Litigation",
      "Negotiable Instruments Act",
      "Quashing Petitions",
    ],
    services: [
      "Shareholders’ Agreements (SHA)",
      "Share Subscription Agreements (SSA)",
      "Founders’ Agreements & ESOP documentation",
      "Commercial contract drafting, review and negotiation",
      "Companies Act, corporate governance and compliance advisory",
      "NCLT / NCLAT insolvency representation",
      "Trademark, copyright and patent advisory & disputes",
      "Domestic and international arbitration",
      "Writ petitions, civil suits and commercial disputes",
      "Cheque dishonour (NI Act) matters",
      "Quashing petitions before High Courts",
      "High Court and District Court litigation",
    ],
    experience: 13,
    rating: 4.9,
    reviewCount: 120,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "Mr. Nikhil Kumar Verma is an accomplished independent legal practitioner and Founder of Satyarth Legal (est. 2018), with extensive experience in litigation, transactional advisory and corporate legal matters. He regularly appears before High Courts, District Courts, NCLT, NCLAT and other tribunals. He specialises in startup and emerging-business agreements—including Shareholders’ Agreements (SHA), Share Subscription Agreements (SSA), Founders’ Agreements and investment documentation—alongside insolvency, IPR, arbitration and commercial litigation. Enrolled with the Bar Council of Delhi; Member, Delhi High Court Bar Association; Member, ICSI. B.Com (University of Delhi), LL.B. (2013), LL.M. (2017).",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: "New Delhi, India · Lajpat Nagar-III",
    availability: "By appointment",
    languages: ["English", "Hindi"],
    channels: ["call"],
    accent: "#1e3a8a",
    tagline: "Startup deals, insolvency, IPR & High Court litigation",
    personality:
      "Strategic, detail-oriented and client-centric. Strong blend of transactional drafting for startups and hands-on litigation before courts and tribunals.",
    kpis: [
      { value: "13+", label: "Years Practice" },
      { value: "2018", label: "Satyarth Legal Founded" },
      { value: "NCLT+", label: "Courts & Tribunals" },
      { value: "4.9★", label: "Client Rating" },
    ],
    capabilities: [
      {
        title: "Startup & Corporate Transactions",
        description:
          "SHA, SSA, founders’ agreements, ESOPs and investment docs, plus Companies Act governance and commercial contracts.",
      },
      {
        title: "Insolvency & NCLT/NCLAT",
        description:
          "Representation for resolution professionals, creditors, corporate debtors and stakeholders in IBC proceedings.",
      },
      {
        title: "Litigation, IPR & Arbitration",
        description:
          "High Court and District Court matters, trademark/copyright/patent disputes, arbitration, NI Act and quashing petitions.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Brief the Matter",
        desc: "Share whether you need transactional drafting, insolvency support or litigation advice.",
      },
      {
        num: "2",
        title: "Strategy & Scope",
        desc: "Nikhil outlines risks, forums, timelines and a practical action plan.",
      },
      {
        num: "3",
        title: "Draft or Appear",
        desc: "Agreements, petitions or court/tribunal representation through Satyarth Legal.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "We are closing a seed round and need an SHA and SSA reviewed.",
      },
      {
        role: "agent",
        text: "I regularly handle startup SHAs and SSAs—vesting, drag/tag, liquidation preference, information rights and founder protections. Share the term sheet and draft so I can flag negotiation points before signing.",
      },
    ],
    faqs: [
      {
        q: "Do you draft Shareholders’ and Founders’ Agreements?",
        a: "Yes—SHA, SSA, Founders’ Agreements, ESOP and other investment-related documentation for startups and emerging businesses.",
      },
      {
        q: "Do you appear before NCLT / NCLAT?",
        a: "Yes—representing resolution professionals, creditors, corporate debtors and other stakeholders in insolvency proceedings.",
      },
      {
        q: "Which courts do you practise before?",
        a: "High Courts and District Courts, NCLT, NCLAT, and other tribunals and regulatory authorities.",
      },
    ],
    escalationNote:
      "Court appearances, signed pleadings and formal legal opinions are handled through Satyarth Legal under Adv. Nikhil Kumar Verma.",
    liveTag: "Verified professional",
  },
  {
    slug: "jyoti-sharma-cs",
    name: "Jyoti Sharma",
    type: "CS",
    typeLabel: "Company Secretary · POSH Trainer · Founder, JVS & Associates",
    specializations: [
      "Corporate Laws",
      "Legal & Secretarial Matters – Listed Companies",
      "NBFC Secretarial & Compliance",
      "Public Sector & Private Sector Enterprises",
      "POSH Training & Workplace Compliance",
      "Workplace Rights & Gender Sensitisation",
    ],
    services: [
      "Corporate law advisory for listed and unlisted companies",
      "Legal and secretarial compliance for listed companies",
      "NBFC secretarial and regulatory support",
      "Public sector and private enterprise secretarial matters",
      "Board and shareholder meeting support",
      "ROC / MCA compliance coordination",
      "POSH training for HR and organisations",
      "Prevention of Sexual Harassment awareness programmes",
      "Workplace rights & responsibilities education",
      "Inclusive workplace policy advisory",
    ],
    experience: 15,
    rating: 4.8,
    reviewCount: 95,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "Jyoti Sharma (FCS, LL.B., M.Com) is Founder of JVS & Associates with more than 15 years of rich experience in corporate laws and legal & secretarial matters for listed companies, NBFCs, and public & private sector enterprises. She is also a certified POSH Trainer, helping HR teams and organisations build safer, inclusive workplaces—creating awareness on Prevention of Sexual Harassment of Women at Workplace and empowering women and men on workplace rights and responsibilities.",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: "India",
    availability: "By appointment",
    languages: ["English", "Hindi"],
    channels: ["call"],
    accent: "#9d174d",
    tagline: "Corporate secretarial · Listed / NBFC compliance · Certified POSH Trainer",
    personality:
      "Practical corporate-secretarial expert with a strong focus on listed-company compliance and building harassment-free, inclusive workplaces through POSH training.",
    kpis: [
      { value: "15+", label: "Years Experience" },
      { value: "FCS, LL.B., M.Com", label: "Credentials" },
      { value: "POSH", label: "Certified Trainer" },
      { value: "4.8★", label: "Client Rating" },
    ],
    capabilities: [
      {
        title: "Corporate & Secretarial",
        description:
          "Corporate laws and end-to-end legal/secretarial support for listed companies, NBFCs, and public & private enterprises.",
      },
      {
        title: "Listed & NBFC Compliance",
        description:
          "Secretarial matters tailored to listed entities and NBFC regulatory/compliance needs.",
      },
      {
        title: "POSH Training",
        description:
          "Certified POSH training for HR and organisations—awareness, workplace rights, and safer inclusive culture.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Share Your Need",
        desc: "Corporate/secretarial compliance or POSH training for your organisation.",
      },
      {
        num: "2",
        title: "Scope & Plan",
        desc: "Jyoti outlines filings, policies or training modules suited to your entity type.",
      },
      {
        num: "3",
        title: "Deliver",
        desc: "Secretarial support or POSH workshops through JVS & Associates.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "We are a listed company and also need POSH training for our HR team.",
      },
      {
        role: "agent",
        text: "I support listed-company secretarial compliance and run certified POSH programmes for HR and organisations. Share your listing status, headcount and whether you need ICC orientation or full workforce sensitisation so I can propose a plan.",
      },
    ],
    faqs: [
      {
        q: "Do you handle secretarial work for listed companies and NBFCs?",
        a: "Yes—more than 15 years across listed companies, NBFCs, and public & private sector enterprises.",
      },
      {
        q: "Are you a certified POSH Trainer?",
        a: "Yes—certified POSH Trainer helping organisations build safer, inclusive, harassment-free workplaces.",
      },
      {
        q: "What is JVS & Associates?",
        a: "JVS & Associates is Jyoti Sharma’s firm focused on corporate laws, legal & secretarial matters, and POSH training.",
      },
    ],
    escalationNote:
      "Formal secretarial certifications, signed filings and POSH programme delivery are handled through JVS & Associates under CS Jyoti Sharma.",
    liveTag: "Verified professional",
  },
  {
    slug: "anita-sinha-lawyer",
    name: "Adv. Anita Sinha",
    type: "Lawyer",
    typeLabel: "Legal & Corporate Lawyer · Delhi High Court",
    specializations: [
      "Civil & Criminal Matters",
      "Matrimonial & Family Disputes",
      "Bail Matters",
      "Cheque Bounce Matters",
      "Securities & Share Disputes",
      "Real Estate Matters",
      "Cyber Crime Matters",
      "Arbitration & Dispute Resolution",
      "SAT Matters",
      "Legal Documentation",
    ],
    services: [
      "Representation and legal assistance in civil and criminal matters",
      "Matrimonial and family dispute resolution",
      "Bail applications and related legal proceedings",
      "Cheque bounce litigation",
      "Real estate dispute and legal advisory",
      "Cyber crime legal matters",
      "Arbitration proceedings and dispute resolution",
      "Legal documentation and drafting",
      "Matters relating to shares and securities",
      "Representation before the Securities Appellate Tribunal (SAT)",
    ],
    experience: 15,
    rating: 4.8,
    reviewCount: 0,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "Adv. Anita Sinha is a legal and corporate lawyer practicing before the Delhi High Court, with 15+ years of professional experience. Qualifications: B.A. (Hons.) Economics, M.Com, CS, LL.B. She specializes in civil, criminal, matrimonial, family, real estate, cyber crime, arbitration, securities and other dispute-resolution matters, along with legal documentation and advisory services.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
    location: "Delhi, India",
    availability: "By appointment",
    languages: ["English", "Hindi"],
    channels: ["call"],
    accent: "#0f766e",
    tagline: "Delhi High Court practice across disputes, securities & documentation",
    personality:
      "Court-focused and practical. Clear on forum, documents, and the next step in a dispute.",
    kpis: [
      { value: "15+", label: "Years Experience" },
      { value: "DHC", label: "Delhi High Court" },
      { value: "CS · LL.B.", label: "Qualifications" },
      { value: "Delhi", label: "Location" },
    ],
    capabilities: [
      {
        title: "Civil, Criminal & Family",
        description:
          "Civil and criminal matters, matrimonial and family disputes, and bail applications.",
      },
      {
        title: "Commercial Disputes",
        description:
          "Cheque bounce, real estate, shares and securities, and representation before the SAT.",
      },
      {
        title: "Arbitration & Drafting",
        description:
          "Arbitration and dispute resolution, cyber crime matters, and legal documentation.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Share the Matter",
        desc: "Describe the dispute, forum, and documents you already have.",
      },
      {
        num: "2",
        title: "Legal Assessment",
        desc: "Anita outlines the forum, risks, and a practical next step.",
      },
      {
        num: "3",
        title: "Draft or Appear",
        desc: "Documentation, filings, or representation before the Delhi High Court and SAT.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "A cheque issued to my company was dishonoured. What should I do first?",
      },
      {
        role: "agent",
        text: "Keep the cheque, bank return memo, and your legal notice timeline. A dishonour matter usually starts with a demand notice, then a complaint if payment does not come. Share the cheque date, return date, and whether a notice has already gone out.",
      },
    ],
    faqs: [
      {
        q: "Which court do you practice before?",
        a: "Delhi High Court, including civil, criminal, bail, and related dispute work.",
      },
      {
        q: "Do you handle SAT and securities disputes?",
        a: "Yes—share and securities disputes, and representation before the Securities Appellate Tribunal.",
      },
      {
        q: "What are your qualifications?",
        a: "B.A. (Hons.) Economics, M.Com, CS, and LL.B.",
      },
    ],
    escalationNote:
      "Court appearances, signed pleadings, and formal legal opinions are handled through Adv. Anita Sinha’s Delhi High Court practice.",
    liveTag: "Verified professional",
  },
  {
    slug: "isha-madaan-cs",
    name: "CS Isha Madaan",
    type: "CS",
    typeLabel: "Company Secretary",
    specializations: [
      "Insolvency & Bankruptcy",
      "Secretarial Affairs & Corporate Governance",
    ],
    services: [
      "Compliances under the Insolvency and Bankruptcy Code, 2016",
      "Secretarial compliances",
      "IBC process support",
    ],
    experience: 6,
    rating: 4.8,
    reviewCount: 0,
    consultationFee: STANDARD_HALF_HOUR_FEE,
    bio: "CS Isha Madaan is an Associate member of the Institute of Company Secretaries of India and a commerce graduate, with more than 6 years of experience in compliances under the Insolvency and Bankruptcy Code, 2016 and secretarial work. She presently works in the field of the IBC, 2016.",
    image: "/consultants/isha-madaan.png",
    location: "India",
    availability: "By appointment",
    languages: ["English", "Hindi"],
    channels: ["call"],
    accent: "#6d28d9",
    tagline: "IBC, 2016 compliances and secretarial work",
    personality:
      "Compliance-focused company secretary. Clear on IBC timelines and secretarial filings.",
    kpis: [
      { value: "6+", label: "Years Experience" },
      { value: "ACS", label: "ICSI Associate" },
      { value: "IBC", label: "Current Focus" },
      { value: "B.Com", label: "Commerce Graduate" },
    ],
    capabilities: [
      {
        title: "IBC Compliances",
        description:
          "Compliances under the Insolvency and Bankruptcy Code, 2016.",
      },
      {
        title: "Secretarial Work",
        description:
          "Secretarial compliances alongside insolvency process support.",
      },
    ],
    workflows: [
      {
        num: "1",
        title: "Share the Matter",
        desc: "Describe the IBC process or secretarial compliance you need.",
      },
      {
        num: "2",
        title: "Compliance Map",
        desc: "Isha outlines filings, timelines, and what is still pending.",
      },
      {
        num: "3",
        title: "File & Follow",
        desc: "Guidance on IBC and secretarial compliances through her practice.",
      },
    ],
    sampleChat: [
      {
        role: "user",
        text: "We need help with compliances under the IBC. Where do we start?",
      },
      {
        role: "agent",
        text: "Start with the process stage you are in — CIRP, liquidation, or a specific filing — and the last form you submitted. I work on IBC, 2016 compliances and can map what is due next.",
      },
    ],
    faqs: [
      {
        q: "Are you a member of ICSI?",
        a: "Yes. Associate member of the Institute of Company Secretaries of India, and a commerce graduate.",
      },
      {
        q: "What do you handle?",
        a: "Compliances under the Insolvency and Bankruptcy Code, 2016, and secretarial work. Current practice is in the IBC, 2016.",
      },
    ],
    escalationNote:
      "Signed secretarial certifications and formal IBC appointments are handled through CS Isha Madaan’s practice.",
    liveTag: "Verified professional",
  },
];

export const SPECIALIZATIONS: Record<AgentType, string[]> = {
  CA: [
    "Income Tax & Corporate Taxation",
    "GST",
    "Mergers & Acquisitions (M&A)",
    "Start-up Advisory & Business Structuring",
    "Internal & Risk-Based Audit",
    "Internal Financial Controls (IFC/ICFR) & SOX 404",
    "IT General Controls (ITGC) & IT Application Controls (ITAC)",
    "Enterprise Risk Management",
    "Forensic Reviews & Investigations",
    "Business & Equity Valuation",
    "Securities & Financial Assets Valuation",
    "ESOP / Sweat Equity Valuation",
    "IBC / Insolvency Valuation",
    "External Audit & Assurance",
    "U.S. Client Advisory",
    "Hedge Funds & Mutual Funds",
    "Private Equity",
    "Cross-border / International Client Services",
  ],
  CS: [
    "Corporate & Commercial Advisory",
    "IPO & Due Diligence",
    "Corporate Law",
    "SEBI & Listing Compliances",
    "Insolvency & Bankruptcy",
    "FEMA & Regulatory Compliances",
    "POSH Advisory & Training",
    "Secretarial Affairs & Corporate Governance",
    "Corporate Restructuring & Transaction Structuring",
    "Mergers & Acquisitions (M&A)",
    "Fund Sourcing & Banking / Finance",
    "IPO Management & Stock Exchange Operations",
    "Regulatory & Government Liaison",
    "Corporate Laws",
    "Legal & Secretarial Matters – Listed Companies",
    "NBFC Secretarial & Compliance",
    "Public Sector & Private Sector Enterprises",
    "POSH Training & Workplace Compliance",
    "Workplace Rights & Gender Sensitisation",
  ],
  Lawyer: [
    "Commercial Contracts & Legal Advisory",
    "Commercial & Corporate Disputes",
    "Employment & Labour Law Matters",
    "Environmental & Regulatory Matters",
    "Litigation & Dispute Resolution",
    "Legal Risk Management & Compliance",
    "Government & Regulatory Liaison",
    "Corporate and Commercial Law",
    "Startup Transactional Agreements (SHA, SSA, Founders)",
    "Insolvency and Bankruptcy Law",
    "Intellectual Property Rights (IPR)",
    "Arbitration and Alternative Dispute Resolution",
    "Civil and Commercial Litigation",
    "Negotiable Instruments Act",
    "Quashing Petitions",
    "Civil & Criminal Matters",
    "Matrimonial & Family Disputes",
    "Bail Matters",
    "Cheque Bounce Matters",
    "Securities & Share Disputes",
    "Real Estate Matters",
    "Cyber Crime Matters",
    "Arbitration & Dispute Resolution",
    "SAT Matters",
    "Legal Documentation",
  ],
  "Wealth Management": [
    "Investment Planning",
    "Portfolio Management",
    "Tax-Efficient Investing",
  ],
  "Real Estate": ["RERA", "Property Transactions", "Title Verification"],
  IRP: ["CIRP", "NCLT", "Liquidation"],
  FEMA: ["FDI", "ODI", "ECB"],
  Insurance: ["Life Insurance", "Health Insurance", "Business Insurance"],
  Lending: [
    "Business Funding & Capital Advisory",
    "Project & Structured Finance",
    "Working Capital & Term Finance",
    "Debt Structuring & Refinancing",
    "Capital Raising and Transaction Advisory",
    "Lender Advisory & Financing Strategy",
    "Private Equity & Growth Capital",
  ],
};

/** Name shown for the AI Salahkar. Falls back to the professional's name. */
export function aiConsultantName(agent: Pick<Agent, "name" | "aiName">): string {
  return agent.aiName ?? agent.name;
}

export function getAgent(slug: string): Agent | undefined {
  return agents.find((agent) => agent.slug === slug);
}

export function getAgentsByType(type: AgentType): Agent[] {
  return agents.filter((agent) => agent.type === type);
}

export function getLiveDemoAgents(): Agent[] {
  return agents.filter((agent) => agent.liveDemo);
}

export function isLiveDemoAgent(slug: string): slug is LiveDemoAgentSlug {
  return LIVE_DEMO_AGENT_SLUGS.includes(slug as LiveDemoAgentSlug);
}

export function resolveLiveDemoSlug(slug?: string): LiveDemoAgentSlug {
  if (slug && isLiveDemoAgent(slug)) return slug;
  return "ankit-gupta-ca";
}
