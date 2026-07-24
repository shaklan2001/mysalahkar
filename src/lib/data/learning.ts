export type LearningSession = {
  id: string;
  title: string;
  instructor: string;
  instructorType: string;
  category: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  enrolled: number;
  rating: number;
  image: string;
  description: string;
  upcoming: boolean;
  date?: string;
  price: number;
};

export const learningSessions: LearningSession[] = [
  {
    id: "session-1",
    title: "Mastering GST Compliance for Startups & MSMEs",
    instructor: "CA Rajesh Mehta",
    instructorType: "CA",
    category: "Taxation",
    duration: "3 hours",
    level: "Intermediate",
    enrolled: 287,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop",
    description:
      "Comprehensive workshop covering GST registration, return filing (GSTR-1/3B/9), ITC reconciliation, e-invoicing, and handling GST notices. Ideal for startup founders, accountants, and MSME owners navigating GST compliance. Includes live demos on GST portal, case studies on ITC claims, and Q&A on sectoral GST challenges.",
    upcoming: true,
    date: "2026-08-05",
    price: 1999,
  },
  {
    id: "session-2",
    title: "Corporate Law for Startups: Funding, SHA, and Exits",
    instructor: "Adv. Priya Sharma",
    instructorType: "Lawyer",
    category: "Corporate Law",
    duration: "4 hours",
    level: "Intermediate",
    enrolled: 412,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop",
    description:
      "Deep dive into startup legal essentials: drafting term sheets, shareholders agreements (SHA), share subscription agreements, vesting schedules, anti-dilution clauses, tag-along/drag-along rights, and exit strategies (M&A, IPO, buyback). Covers FEMA compliance for foreign investment, DPIIT Startup India registration, and ROC post-funding filings. Includes SHA templates and negotiation tips.",
    upcoming: true,
    date: "2026-08-12",
    price: 2499,
  },
  {
    id: "session-3",
    title: "SEBI LODR & Listing Compliance for Public Companies",
    instructor: "CS Ananya Iyer",
    instructorType: "CS",
    category: "Corporate Governance",
    duration: "2.5 hours",
    level: "Advanced",
    enrolled: 156,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    description:
      "Master SEBI LODR regulations: quarterly results, annual reports, related party transactions (RPT), insider trading (PIT), board composition, audit committee, BRSR (Business Responsibility & Sustainability Report), and continuous disclosures. Covers recent LODR amendments (2026), XBRL filing, and penalty avoidance strategies. Essential for listed company secretaries, compliance officers, and CFOs.",
    upcoming: true,
    date: "2026-08-18",
    price: 2999,
  },
  {
    id: "session-4",
    title: "International Tax & Transfer Pricing: DTAA, TP Study, Form 3CEB",
    instructor: "CA Rohan Desai",
    instructorType: "CA",
    category: "Taxation",
    duration: "5 hours",
    level: "Advanced",
    enrolled: 203,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    description:
      "Advanced course on international taxation: DTAA interpretation, foreign tax credit (Form 67), NRI taxation, POEM (Place of Effective Management), transfer pricing methods (CUP, RPM, CPM, TNMM, PSM), benchmarking, Form 3CEB audit, and BEPS Action Plans. Includes case studies on TP audits, MAP (Mutual Agreement Procedure), and APA (Advance Pricing Agreement). For CAs advising multinational clients.",
    upcoming: true,
    date: "2026-08-22",
    price: 3499,
  },
  {
    id: "session-5",
    title: "Intellectual Property Rights: Trademark, Patent, Copyright Masterclass",
    instructor: "Adv. Ira Malhotra",
    instructorType: "Lawyer",
    category: "Legal",
    duration: "4 hours",
    level: "Beginner",
    enrolled: 521,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop",
    description:
      "Complete IP protection guide: trademark search, filing, opposition, registration, and enforcement. Patent drafting, claims, prior art search, PCT filing, and patent prosecution. Copyright registration for software, content, and art. Covers IP licensing, assignment, infringement litigation, and brand protection strategies. Ideal for startup founders, in-house counsels, and innovators.",
    upcoming: true,
    date: "2026-08-28",
    price: 2299,
  },
  {
    id: "session-6",
    title: "Financial Modeling & Valuation for Startups and Investors",
    instructor: "Aditi Kapoor",
    instructorType: "Wealth",
    category: "Finance",
    duration: "6 hours",
    level: "Intermediate",
    enrolled: 374,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
    description:
      "Hands-on financial modeling workshop: build 3-statement models (P&L, balance sheet, cash flow), revenue projections, burn rate analysis, unit economics, and DCF valuation. Covers startup-specific metrics (CAC, LTV, ARR, MRR, churn), cap table modeling, and scenario analysis (base/best/worst case). Includes Excel templates and pitch deck financials. For founders, VCs, and financial analysts.",
    upcoming: true,
    date: "2026-09-05",
    price: 2799,
  },
  {
    id: "session-7",
    title: "RERA Compliance & Real Estate Documentation [Recorded]",
    instructor: "Adv. Maya Reddy",
    instructorType: "Real Estate",
    category: "Real Estate",
    duration: "2 hours",
    level: "Beginner",
    enrolled: 198,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop",
    description:
      "Recorded session on RERA compliance for developers and buyers: RERA registration, quarterly progress reports, escrow account management, completion certificate, buyer-builder agreements, and handling RERA complaints. Covers title verification, sale deed drafting, stamp duty, and registration. Includes document templates and RERA portal navigation guide.",
    upcoming: false,
    price: 1499,
  },
  {
    id: "session-8",
    title: "Corporate Insolvency & Restructuring Under IBC [Recorded]",
    instructor: "IRP Neil Patel",
    instructorType: "IRP",
    category: "Insolvency",
    duration: "3.5 hours",
    level: "Advanced",
    enrolled: 142,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=450&fit=crop",
    description:
      "Recorded masterclass on IBC: CIRP process, IRP/RP roles, CoC management, resolution plan drafting, liquidation, pre-packaged insolvency (PPIRP), NCLT procedures, and avoidance transactions. Covers recent IBC amendments (2026), Swiss Challenge, and case studies on successful resolutions. For insolvency professionals, lawyers, and creditors.",
    upcoming: false,
    price: 2199,
  },
];

export const learningCategories = [
  { name: "Taxation", count: 28 },
  { name: "Corporate Law", count: 34 },
  { name: "Corporate Governance", count: 18 },
  { name: "Legal", count: 42 },
  { name: "Finance", count: 31 },
  { name: "Compliance", count: 26 },
];

export const popularInstructors = [
  { name: "CA Rajesh Mehta", courses: 12, rating: 4.8 },
  { name: "Adv. Priya Sharma", courses: 9, rating: 4.9 },
  { name: "CS Ananya Iyer", courses: 7, rating: 4.7 },
  { name: "CA Rohan Desai", courses: 8, rating: 4.9 },
];

export const learningPath = [
  {
    level: "Beginner",
    title: "Fundamentals",
    description: "Learn the basics of taxation, corporate law, and compliance",
    courses: 15,
  },
  {
    level: "Intermediate",
    title: "Professional Practice",
    description: "Master practical skills for CA, CS, legal, and financial advisory",
    courses: 22,
  },
  {
    level: "Advanced",
    title: "Specialization",
    description: "Deep dive into international tax, M&A, SEBI, IBC, and complex structuring",
    courses: 18,
  },
];
