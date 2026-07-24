export type CommunityPost = {
  id: string;
  authorName: string;
  authorType: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  tags: string[];
};

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    authorName: "Rajesh Mehta",
    authorType: "CA",
    title: "New GST Amnesty Scheme for Late Filers – Key Highlights",
    content:
      "The Government has announced a GST amnesty scheme for FY 2024-25 late filers. Key benefits: (1) Waiver of late fees for GSTR-3B and GSTR-1 if filed by March 31, 2026, (2) Interest capped at 9% (down from 18%) for delayed tax payment, (3) No penalty for first-time defaulters. This is a huge relief for MSMEs facing cash flow issues. Make sure to reconcile your ITC and file pending returns to avoid future notices. The scheme covers returns due from April 2024 to December 2025. If you have accumulated late fees, this is the perfect window to regularize your compliance. #GSTCompliance #TaxAmnesty",
    date: "2026-07-20",
    likes: 142,
    comments: 28,
    tags: ["GST", "Compliance", "Taxation"],
  },
  {
    id: "post-2",
    authorName: "Priya Sharma",
    authorType: "CS",
    title: "Companies Act Amendment 2026: What Changed for Startups?",
    content:
      "The Companies (Amendment) Act 2026 brings startup-friendly changes: (1) Threshold for private placement increased from 200 to 500 investors (easier angel rounds), (2) Fast-track merger timeline reduced from 210 to 150 days, (3) Small companies' turnover limit raised to ₹50 Cr (was ₹40 Cr), exempting more startups from heavy compliance, (4) Board meeting quorum relaxed—now possible with 1/3rd directors or 2 directors (whichever is higher) via video conferencing even for sensitive matters with RBI/SEBI pre-approval. Impact: Startups can now raise funds from more investors without going public, and compliance burden is lighter. Ensure your MOA/AOA reflect updated provisions. #CompaniesAct #StartupLaw #ROCCompliance",
    date: "2026-07-18",
    likes: 189,
    comments: 41,
    tags: ["Corporate Law", "Startups", "Compliance"],
  },
  {
    id: "post-3",
    authorName: "Vikram Desai",
    authorType: "Lawyer",
    title: "Supreme Court Ruling on Non-Compete Clauses: What Employers Must Know",
    content:
      "In a landmark judgment (July 2026), the Supreme Court clarified the enforceability of non-compete clauses in employment contracts. Key takeaways: (1) Post-termination non-compete (restraint of trade) remains largely unenforceable per Section 27, Indian Contract Act—except in sale of goodwill or partnership dissolution, (2) HOWEVER, courts may now enforce limited non-compete (6-12 months, specific geography) if: (a) Employee received specialized training at employer cost, (b) Employee had access to trade secrets/confidential client data, (c) Non-compete is reasonable in scope and duration, (3) Non-solicitation (clients/employees) and confidentiality clauses remain fully enforceable. Practical advice: Employers should focus on airtight NDAs, IP assignment, and garden leave (paid notice) rather than blanket non-compete. Draft with care! #EmploymentLaw #NonCompete #LabourLaw",
    date: "2026-07-15",
    likes: 201,
    comments: 56,
    tags: ["Legal", "Employment", "Supreme Court"],
  },
  {
    id: "post-4",
    authorName: "Ananya Iyer",
    authorType: "CS",
    title: "SEBI's New LODR Amendments: Impact on Listed Companies (July 2026)",
    content:
      "SEBI issued LODR (Listing Obligations and Disclosure Requirements) amendments effective August 1, 2026. Major changes: (1) Related Party Transaction (RPT) threshold reduced—now 10% of annual consolidated turnover (was 15%), meaning more RPTs need shareholder approval, (2) Audit Committee pre-approval mandatory for ALL RPTs (no de minimis exemption), (3) Business Responsibility & Sustainability Report (BRSR) now mandatory for Top 1000 listed entities (was Top 500), (4) Quarterly results filing deadline reduced to 40 days (was 45 days). Impact: Tighter disclosure timelines, more governance scrutiny, and heavier compliance load on mid-cap listed companies. Boards should update RPT policies and ensure robust internal controls. #SEBI #LODR #CapitalMarkets #CorporateGovernance",
    date: "2026-07-12",
    likes: 167,
    comments: 34,
    tags: ["SEBI", "Compliance", "Listing"],
  },
  {
    id: "post-5",
    authorName: "Kabir Singh",
    authorType: "FEMA",
    title: "RBI Tightens LRS Reporting: New Rules for Overseas Investments",
    content:
      "RBI issued a circular (July 10, 2026) tightening Liberalized Remittance Scheme (LRS) reporting for overseas investments. Key changes: (1) Mandatory PAN-based reporting for ALL LRS remittances (even < $25K), (2) Purpose code 'S0001' (overseas investment in equity/debt) now requires proof of FEMA compliance—investment declaration, foreign broker account proof, (3) AD banks must verify end-use within 180 days—remitter must submit foreign bank statement or investment confirmation, (4) Crypto transactions remain prohibited under LRS. Impact: Stricter scrutiny on foreign stock investments. If you're investing in US stocks via LRS, ensure you maintain detailed records (brokerage statements, tax filings) and submit to your bank when asked. Non-compliance may lead to LRS restriction or FEMA penalty. #FEMA #LRS #RBI #ForeignInvestment",
    date: "2026-07-10",
    likes: 134,
    comments: 29,
    tags: ["FEMA", "RBI", "Investment"],
  },
  {
    id: "post-6",
    authorName: "Maya Reddy",
    authorType: "Real Estate",
    title: "RERA Amendment 2026: Stricter Penalties for Builders, New Buyer Rights",
    content:
      "The Real Estate (Regulation and Development) Amendment Act 2026 introduces game-changing reforms: (1) Penalty for project delay increased to ₹1L/day (was ₹10K/day) for projects > ₹100 Cr, (2) Buyers can now claim compensation up to 18% annual interest on delayed possession (earlier 10-12%), (3) RERA authorities can now freeze developer accounts if escrow funds are misused, (4) Mandatory quarterly project updates on RERA website (with photos/videos), (5) Buyers have right to inspect escrow account statements. Impact: This levels the playing field for homebuyers. If your project is delayed, file RERA complaint immediately—you can now claim significantly higher compensation. Builders face tougher scrutiny and penalties. #RERA #RealEstate #BuyerRights #PropertyLaw",
    date: "2026-07-08",
    likes: 223,
    comments: 67,
    tags: ["RERA", "Real Estate", "Property Law"],
  },
  {
    id: "post-7",
    authorName: "Sanjay Kulkarni",
    authorType: "Wealth",
    title: "Budget 2026 Tax Changes: New 80C Limit & LTCG Tweaks",
    content:
      "Union Budget 2026 (presented July 23) announced key tax changes: (1) Section 80C limit increased to ₹2L (from ₹1.5L)—more room for ELSS, PPF, life insurance, (2) LTCG exemption on equity raised to ₹1.5L/year (from ₹1.25L), LTCG tax remains 12.5% above exemption, (3) NPS additional deduction under 80CCD(1B) increased to ₹75K (from ₹50K), (4) Standard deduction for salaried increased to ₹75K (from ₹50K), (5) New tax regime: 0% up to ₹4L, 5% (₹4-8L), 10% (₹8-12L), 15% (₹12-16L), 20% (₹16-20L), 25% (₹20-24L), 30% (>₹24L). Old regime unchanged. Impact: New regime is now more attractive for middle-income salaried (₹8-15L). Investors can save more via 80C + NPS. Start tax planning now! #Budget2026 #IncomeTax #WealthManagement #FinancialPlanning",
    date: "2026-07-23",
    likes: 312,
    comments: 89,
    tags: ["Budget", "Taxation", "Investment"],
  },
  {
    id: "post-8",
    authorName: "Neil Patel",
    authorType: "IRP",
    title: "IBC Amendment 2026: Pre-Pack Insolvency Extended to All Companies",
    content:
      "The Insolvency and Bankruptcy Code (Amendment) Act 2026 extends Pre-Packaged Insolvency Resolution Process (PPIRP) to ALL companies (earlier only MSMEs with default < ₹1 Cr). Key features: (1) PPIRP now available for companies with default ≥ ₹1 Cr (no upper limit), (2) Swiss Challenge mechanism introduced—if promoter submits base resolution plan, third-party bidders can submit competing plans (10% higher), (3) Timeline remains 90 days (vs. 180 days for regular CIRP), (4) CoC approval threshold: 66% (same as CIRP). Impact: Faster resolution for distressed large companies, reduced litigation, and better recovery for creditors. Promoters now have a structured path to retain control while clearing debt. If your company faces stress, consider pre-pack before creditors file Section 7. #IBC #Insolvency #NCLT #Restructuring",
    date: "2026-07-06",
    likes: 178,
    comments: 43,
    tags: ["IBC", "Insolvency", "NCLT"],
  },
];

export const communityStats = {
  members: 2450,
  posts: 1234,
  activeToday: 342,
};

export const trendingTopics = [
  "GST Compliance 2026",
  "Companies Act Amendments",
  "Transfer Pricing",
  "SEBI Guidelines",
  "Startup Legal Framework",
  "Budget 2026 Tax Changes",
  "RERA Buyer Rights",
  "IBC Pre-Pack Reforms",
];

export const topContributors = [
  { name: "Rajesh Mehta", type: "CA", posts: 47 },
  { name: "Priya Sharma", type: "CS", posts: 39 },
  { name: "Vikram Desai", type: "Lawyer", posts: 52 },
  { name: "Maya Reddy", type: "Real Estate", posts: 28 },
];

export const communityGuidelines = [
  {
    title: "Be Respectful",
    description:
      "Treat all members with respect. No personal attacks, hate speech, or harassment.",
  },
  {
    title: "Share Accurate Information",
    description:
      "Ensure your posts are factually correct. Cite sources for legal/regulatory updates.",
  },
  {
    title: "No Spam or Self-Promotion",
    description:
      "Avoid excessive self-promotion or advertising. Focus on knowledge sharing.",
  },
  {
    title: "Maintain Confidentiality",
    description:
      "Do not share client information or confidential matters. Anonymize case discussions.",
  },
  {
    title: "Follow Professional Ethics",
    description:
      "Adhere to professional codes of conduct for CA, CS, Lawyers, and other regulated professions.",
  },
];
