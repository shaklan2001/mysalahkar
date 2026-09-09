import type { AgentType } from "./agents";

export type ServiceItem = {
  name: string;
  consultant: string;
  description: string;
};

export type ServiceCategory = {
  id: string;
  iconName: string;
  category: string;
  summary: string;
  type: AgentType | string;
  color: string;
  agentSlug: string;
  services: ServiceItem[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "start-your-business",
    iconName: "Building2",
    category: "Start Your Business",
    summary: "Business registration & setup",
    type: "CS",
    color: "#003cf8",
    agentSlug: "sneha-cs",
    services: [
      { name: "Proprietorship", consultant: "Ankit Gupta/Soniya Gupta", description: "Business registration & setup" },
      { name: "Partnership", consultant: "Ankit Gupta/Soniya Gupta", description: "Business registration & setup" },
      { name: "Limited Liability Partnership (LLP)", consultant: "Soniya Gupta", description: "Business registration & setup" },
      { name: "Private Limited Company", consultant: "Soniya Gupta", description: "Business registration & setup" },
      { name: "Public Limited Company", consultant: "Soniya Gupta", description: "Business registration & setup" },
      { name: "Section 8 Company", consultant: "Soniya Gupta", description: "Business registration & setup" },
      { name: "One Person Company (OPC)", consultant: "Soniya Gupta", description: "Business registration & setup" },
      { name: "Producer Company", consultant: "Soniya Gupta", description: "Business registration & setup" },
      { name: "Business Registartions", consultant: "", description: "Business registration & setup" },
      { name: "Startup Registartion", consultant: "Soniya Gupta/Ankit Gupta", description: "Business registration & setup" },
      { name: "DSC Registartions", consultant: "Soniya Gupta", description: "Business registration & setup" },
      { name: "Import Export Code Registration", consultant: "Ankit Gupta", description: "Business registration & setup" },
      { name: "Trademark Registration", consultant: "Soniya Gupta", description: "Business registration & setup" },
      { name: "ICEGATE Registration", consultant: "Ankit Gupta", description: "Business registration & setup" },
      { name: "MSME/Udyam Registration", consultant: "Soniya Gupta", description: "Business registration & setup" },
      { name: "NBFC Registration", consultant: "Pawan Agarwal", description: "Business registration & setup" },
    ],
  },
  {
    id: "income-tax-tds",
    iconName: "Calculator",
    category: "Income Tax & TDS",
    summary: "Direct tax, returns, assessments, and TDS compliance",
    type: "CA",
    color: "#003cf8",
    agentSlug: "arjun-ca",
    services: [
      { name: "Income Tax", consultant: "", description: "Direct tax, returns, assessments, and TDS compliance" },
      { name: "Pan Application", consultant: "Ankit Gupta", description: "Direct tax, returns, assessments, and TDS compliance" },
      { name: "Income Tax Returns", consultant: "Ankit Gupta", description: "Direct tax, returns, assessments, and TDS compliance" },
      { name: "Income Tax Assessments", consultant: "Praveen Dutt", description: "Direct tax, returns, assessments, and TDS compliance" },
      { name: "Income Tax Consulting", consultant: "Praveen Dutt", description: "Direct tax, returns, assessments, and TDS compliance" },
      { name: "Income Tax Search & Seizures", consultant: "Praveen Dutt", description: "Direct tax, returns, assessments, and TDS compliance" },
      { name: "TDS", consultant: "Ankit Gupta", description: "Direct tax, returns, assessments, and TDS compliance" },
      { name: "TAN Registartion", consultant: "Ankit Gupta", description: "Direct tax, returns, assessments, and TDS compliance" },
      { name: "TDS Returns", consultant: "Ankit Gupta", description: "Direct tax, returns, assessments, and TDS compliance" },
      { name: "Lower TDS Deduction Certificate", consultant: "Ankit Gupta", description: "Direct tax, returns, assessments, and TDS compliance" },
      { name: "Fom 15CA/ Form15CB", consultant: "Ankit Gupta", description: "Direct tax, returns, assessments, and TDS compliance" },
      { name: "TDS ON sale of Property", consultant: "Ankit Gupta", description: "Direct tax, returns, assessments, and TDS compliance" },
    ],
  },
  {
    id: "gst",
    iconName: "Receipt",
    category: "GST",
    summary: "Registration, filings, assessments, and GST advisory",
    type: "CA",
    color: "#0891b2",
    agentSlug: "arjun-ca",
    services: [
      { name: "GST", consultant: "Ankit Gupta", description: "Registration, filings, assessments, and GST advisory" },
      { name: "GST Registartion", consultant: "Ankit Gupta", description: "Registration, filings, assessments, and GST advisory" },
      { name: "GST Filings", consultant: "Ankit Gupta", description: "Registration, filings, assessments, and GST advisory" },
      { name: "E-way bill", consultant: "Ankit Gupta", description: "Registration, filings, assessments, and GST advisory" },
      { name: "LUT under GST", consultant: "Ankit Gupta", description: "Registration, filings, assessments, and GST advisory" },
      { name: "GST Assessments", consultant: "Ram Naresh", description: "Registration, filings, assessments, and GST advisory" },
      { name: "GST Consulting", consultant: "Ram Naresh", description: "Registration, filings, assessments, and GST advisory" },
      { name: "GST Search & Seizures", consultant: "Keshav Maheswari", description: "Registration, filings, assessments, and GST advisory" },
      { name: "TCS Registration under GST", consultant: "Ankit Gupta", description: "Registration, filings, assessments, and GST advisory" },
    ],
  },
  {
    id: "trademark",
    iconName: "BadgeCheck",
    category: "Trademark",
    summary: "Search, registration, opposition, and renewal",
    type: "CS",
    color: "#7c3aed",
    agentSlug: "sneha-cs",
    services: [
      { name: "Trademark", consultant: "Soniya Gupta", description: "Search, registration, opposition, and renewal" },
      { name: "Trademark Search & Registration", consultant: "Soniya Gupta", description: "Search, registration, opposition, and renewal" },
      { name: "Trademark Objection Reply", consultant: "Soniya Gupta", description: "Search, registration, opposition, and renewal" },
      { name: "Trademark Opposition", consultant: "Soniya Gupta", description: "Search, registration, opposition, and renewal" },
      { name: "Trademark Assignment", consultant: "Soniya Gupta", description: "Search, registration, opposition, and renewal" },
      { name: "Trademark Renewal", consultant: "Soniya Gupta", description: "Search, registration, opposition, and renewal" },
    ],
  },
  {
    id: "fema",
    iconName: "Landmark",
    category: "FEMA & Cross-border",
    summary: "FDI, ODI, ECB, RBI compliance, and foreign investment",
    type: "FEMA",
    color: "#059669",
    agentSlug: "kabir-fema",
    services: [
      { name: "FEMA", consultant: "", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "FC-GPR", consultant: "Soniya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "FC-TRS", consultant: "Soniya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "FLA Return", consultant: "Soniya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "FEMA Compliance Certificate", consultant: "Soniya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "ECB Compliance & reporting", consultant: "Pawan Agarwal/ CS Sandhya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "RBI Compliance Matters", consultant: "Pawan Agarwal/ CS Sandhya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "Cross-Border Transaction Advisory", consultant: "Pawan Agarwal/ CS Sandhya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "ODI (Overseas Direct Investment) Compliance", consultant: "Pawan Agarwal/ CS Sandhya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "FEMA Audit & Due Diligence", consultant: "Pawan Agarwal/ CS Sandhya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "FEMA Compounding Applications", consultant: "Pawan Agarwal/ CS Sandhya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "Foreign Investment Structuring", consultant: "Pawan Agarwal/ CS Sandhya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
      { name: "FEMA Litigation & Appeals", consultant: "Pawan Agarwal/ CS Sandhya Gupta", description: "FDI, ODI, ECB, RBI compliance, and foreign investment" },
    ],
  },
  {
    id: "audit-valuations",
    iconName: "LineChart",
    category: "Audit, Valuations & M&A",
    summary: "Due diligence, valuations, mergers, and advisory",
    type: "CA",
    color: "#b45309",
    agentSlug: "arjun-ca",
    services: [
      { name: "Audit & Valuations", consultant: "", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Risk Advisory", consultant: "Avdesh Varshney", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Risk Assurance", consultant: "Rakesh Agarwal/ Ankit Gupta", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "International Taxation", consultant: "Taran Agarwal", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Merger & Acquistions", consultant: "Pawan Agarwal/ Soniya Gupta/ Praveen Dutt/Ankit Gupta", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Financial Due Diligence", consultant: "Pawan Agarwal/ Soniya Gupta/ Praveen Dutt/Ankit Gupta", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Legal Due Diligence", consultant: "Pawan Agarwal/ Soniya Gupta/ Praveen Dutt/Ankit Gupta", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Valuation & Structuring", consultant: "Pawan Agarwal/ Soniya Gupta/ Praveen Dutt/Ankit Gupta", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Scheme of Arrangement", consultant: "Pawan Agarwal/ Soniya Gupta/ Praveen Dutt/Ankit Gupta", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Tax Planning", consultant: "Pawan Agarwal/ Soniya Gupta/ Praveen Dutt/Ankit Gupta", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "ROC Filings & Approvals", consultant: "Pawan Agarwal/ Soniya Gupta/ Praveen Dutt/Ankit Gupta", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Regulatory Compliance", consultant: "Pawan Agarwal/ Soniya Gupta/ Praveen Dutt/Ankit Gupta", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Corporate Governance", consultant: "Pawan Agarwal/ Soniya Gupta/ Praveen Dutt/Ankit Gupta", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Post-Merger Integration", consultant: "Pawan Agarwal/ Soniya Gupta/ Praveen Dutt/Ankit Gupta", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Valuation Services", consultant: "Avdesh Varshney", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Securities Valuation", consultant: "", description: "Due diligence, valuations, mergers, and advisory" },
      { name: "Real Estate Valuation", consultant: "", description: "Due diligence, valuations, mergers, and advisory" },
    ],
  },
  {
    id: "financial-services",
    iconName: "TrendingUp",
    category: "Financial Services",
    summary: "Project finance, loans, debt structuring, and capital advisory",
    type: "Lending",
    color: "#1d4ed8",
    agentSlug: "veer-lending",
    services: [
      { name: "Financial Services", consultant: "Ashok Mehta", description: "Project finance, loans, debt structuring, and capital advisory" },
      { name: "Project Finance", consultant: "Ashok Mehta", description: "Project finance, loans, debt structuring, and capital advisory" },
      { name: "Working Capital Finance", consultant: "Ashok Mehta", description: "Project finance, loans, debt structuring, and capital advisory" },
      { name: "Business Term Loans", consultant: "Ashok Mehta", description: "Project finance, loans, debt structuring, and capital advisory" },
      { name: "Loan Against Property", consultant: "Ashok Mehta", description: "Project finance, loans, debt structuring, and capital advisory" },
      { name: "Debt Structuring & Refinancing", consultant: "Ashok Mehta", description: "Project finance, loans, debt structuring, and capital advisory" },
      { name: "Capital Advisory", consultant: "Ashok Mehta", description: "Project finance, loans, debt structuring, and capital advisory" },
      { name: "Lender & Transaction Advisory", consultant: "Ashok Mehta", description: "Project finance, loans, debt structuring, and capital advisory" },
      { name: "Private Equity", consultant: "Ashok Mehta", description: "Project finance, loans, debt structuring, and capital advisory" },
    ],
  },
  {
    id: "services-in-uae",
    iconName: "Globe",
    category: "Services in UAE",
    summary: "UAE company setup, corporate tax, VAT, and transfer pricing",
    type: "CA",
    color: "#6366f1",
    agentSlug: "arjun-ca",
    services: [
      { name: "Services In UAE", consultant: "Ekansh Agarwal", description: "UAE company setup, corporate tax, VAT, and transfer pricing" },
      { name: "UAE Company Registrations", consultant: "Ekansh Agarwal", description: "UAE company setup, corporate tax, VAT, and transfer pricing" },
      { name: "Corporate Tax Advisory", consultant: "Ekansh Agarwal", description: "UAE company setup, corporate tax, VAT, and transfer pricing" },
      { name: "VAT & Indirect Tax", consultant: "Ekansh Agarwal", description: "UAE company setup, corporate tax, VAT, and transfer pricing" },
      { name: "Transfer Pricing", consultant: "Ekansh Agarwal", description: "UAE company setup, corporate tax, VAT, and transfer pricing" },
      { name: "OECD Pillar Two", consultant: "Ekansh Agarwal", description: "UAE company setup, corporate tax, VAT, and transfer pricing" },
      { name: "Readiness Assessment", consultant: "Ekansh Agarwal", description: "UAE company setup, corporate tax, VAT, and transfer pricing" },
      { name: "ASP & ERP Integration", consultant: "Ekansh Agarwal", description: "UAE company setup, corporate tax, VAT, and transfer pricing" },
      { name: "Tax Tech & Transformation", consultant: "Ekansh Agarwal", description: "UAE company setup, corporate tax, VAT, and transfer pricing" },
      { name: "Training & Enablement", consultant: "Ekansh Agarwal", description: "UAE company setup, corporate tax, VAT, and transfer pricing" },
    ],
  },
  {
    id: "roc-secretarial",
    iconName: "Briefcase",
    category: "ROC Plus Secretarial Services",
    summary: "ROC filings, board resolutions, conversions, and agreements",
    type: "CS",
    color: "#db2777",
    agentSlug: "sneha-cs",
    services: [
      { name: "DIN Application", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Alteration of Memorandum of Association", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Alteration of Article of Association", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Board Resolutions", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Notice & Directors' Report", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "ROC  Forms Filing/Annual Compliances", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Director e Kyc", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Due Diligence", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Share Transfer", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "ROC Search Report", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Director/KMP/Manager/WTD Appointment/Resignation/Removal/Change ( Company)", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Partner Appointment/Resignation/Removal/Change ( LLP)", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Secretrial Audit", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Change of Objects", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Shifting of Registered Office", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Change of Company Name", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Changes in LLP Agreement", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Increase/Change in Share Capital/ Debentures", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Closure of a Private/ Public Ltd Company", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Closure of a Limited Liability Partnership", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Closure of  a One Person Company", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Partnership to Private Limited Company Conversion", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "LLP to Private Limited Company Conversion", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "OPC to Private Limited Company Conversion", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Private Limited company to LLP Conversion", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Private company to Public company Conversion", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Buyback of Shares", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Corporate Social Responsibility (CSR)", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Environment, Social, Governance (ESG)", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "SEBI / Listed Companies Compliances", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Corporate Governance", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Shareholders Agreement", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Debenture Agreement", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Term Sheet", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
      { name: "Non-Disclosure Agreement", consultant: "Soniya Gupta", description: "ROC filings, board resolutions, conversions, and agreements" },
    ],
  },
  {
    id: "fema-compliance-matrix",
    iconName: "Table",
    category: "FEMA Compliance Matrix for CA/CS",
    summary: "Compliance triggers, forms, and reporting timelines",
    type: "FEMA",
    color: "#047857",
    agentSlug: "kabir-fema",
    services: [
      { name: "Foreign Direct Investment (FDI)", consultant: "Pawan Agarwal / CS Sandhya Gupta", description: "Receipt of foreign investment · FC-GPR · Within prescribed RBI timeline after allotment" },
      { name: "Transfer of shares (Resident ↔ Non-Resident)", consultant: "Pawan Agarwal / CS Sandhya Gupta", description: "Sale/Purchase of shares · FC-TRS · Within prescribed RBI timeline" },
      { name: "Annual Foreign Liabilities & Assets", consultant: "Pawan Agarwal / CS Sandhya Gupta", description: "Company has FDI/ODI · FLA Return · Annually" },
      { name: "Downstream Investment", consultant: "Pawan Agarwal / CS Sandhya Gupta", description: "Investment by Indian entity with foreign investment · Reporting through FIRMS · Event-based" },
      { name: "Convertible Notes", consultant: "Pawan Agarwal / CS Sandhya Gupta", description: "Issue/Transfer · RBI Reporting · Event-based" },
      { name: "ESOPs to Non-Residents", consultant: "Pawan Agarwal / CS Sandhya Gupta", description: "Grant/Exercise · FEMA reporting (if applicable) · Event-based" },
      { name: "Overseas Direct Investment (ODI)", consultant: "Pawan Agarwal / CS Sandhya Gupta", description: "Investment abroad · ODI Forms · Event-based" },
      { name: "Annual Performance Report", consultant: "Pawan Agarwal / CS Sandhya Gupta", description: "Existing ODI · APR · Annual" },
      { name: "External Commercial Borrowings (ECB)", consultant: "Pawan Agarwal / CS Sandhya Gupta", description: "Overseas borrowing · ECB reporting · Monthly/Event-based" },
      { name: "Trade Credits", consultant: "Pawan Agarwal / CS Sandhya Gupta", description: "Import finance · AD Bank reporting · Event-based" },
    ],
  },
];

export const totalServices = serviceCategories.reduce(
  (sum, cat) => sum + cat.services.length,
  0
);

export const uniqueConsultants = Array.from(
  new Set(
    serviceCategories.flatMap((cat) => cat.services.map((s) => s.consultant))
  )
).sort();

export function getCategoryById(id: string): ServiceCategory | undefined {
  return serviceCategories.find((cat) => cat.id === id);
}

const typeToCategories: Record<string, string[]> = {
  CA: ["income-tax-tds", "gst", "audit-valuations", "services-in-uae"],
  CS: ["start-your-business", "roc-secretarial", "trademark"],
  FEMA: ["fema", "fema-compliance-matrix"],
  "Wealth Management": ["financial-services"],
  Lending: ["financial-services"],
  Lawyer: ["roc-secretarial"],
  "Real Estate": ["audit-valuations"],
};

export function getCatalogServicesForAgentType(type: string, limit = 12): string[] {
  const ids = typeToCategories[type] ?? [];
  const names: string[] = [];
  for (const id of ids) {
    const cat = getCategoryById(id);
    if (!cat) continue;
    for (const service of cat.services) {
      if (names.length >= limit) return names;
      if (!names.includes(service.name)) names.push(service.name);
    }
  }
  return names;
}

export function getAllServiceNames(): string[] {
  return serviceCategories.flatMap((cat) => cat.services.map((s) => s.name));
}
