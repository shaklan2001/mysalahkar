export type LoanProduct = {
  id: string;
  bankName: string;
  productType: string;
  interestRate: number;
  processingFee: string;
  maxAmount: string;
  tenure: string;
  logo: string;
  features: string[];
};

export const loanProducts: LoanProduct[] = [
  {
    id: "loan-1",
    bankName: "HDFC Bank",
    productType: "Home Loan",
    interestRate: 8.35,
    processingFee: "0.5% of loan amount",
    maxAmount: "₹10 Crore",
    tenure: "Up to 30 years",
    logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=100&fit=crop",
    features: [
      "Pre-approved home loans for existing customers",
      "Doorstep service and documentation",
      "Balance transfer with top-up facility",
      "No prepayment charges on floating rate loans",
      "Quick approval in 3-4 days",
    ],
  },
  {
    id: "loan-2",
    bankName: "ICICI Bank",
    productType: "Home Loan",
    interestRate: 8.4,
    processingFee: "0.5% of loan amount + GST",
    maxAmount: "₹5 Crore",
    tenure: "Up to 30 years",
    logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=100&fit=crop",
    features: [
      "Instant home loan approval up to ₹1 Cr",
      "100% digital documentation",
      "Flexible repayment options (monthly/quarterly)",
      "EMI holiday for under-construction properties",
      "Special rates for women borrowers",
    ],
  },
  {
    id: "loan-3",
    bankName: "Bajaj Finserv",
    productType: "Home Loan",
    interestRate: 8.5,
    processingFee: "Up to 2% of loan amount",
    maxAmount: "₹3.5 Crore",
    tenure: "Up to 30 years",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
    features: [
      "Overdraft facility available",
      "Flexi hybrid loan option (save on interest)",
      "Step-up repayment for young professionals",
      "Zero foreclosure charges after 12 months",
      "Loan sanction in 24 hours",
    ],
  },
  {
    id: "loan-4",
    bankName: "State Bank of India",
    productType: "Home Loan",
    interestRate: 8.3,
    processingFee: "0.35% of loan amount (min ₹2,000 + GST)",
    maxAmount: "No upper limit",
    tenure: "Up to 30 years",
    logo: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=200&h=100&fit=crop",
    features: [
      "Lowest interest rates among public sector banks",
      "Concession of 0.05% for women borrowers",
      "Door-step service through 'SBI Home Loan Centres'",
      "No prepayment penalty on floating rate loans",
      "Takeover/Balance transfer of existing home loans",
    ],
  },
  {
    id: "loan-5",
    bankName: "Axis Bank",
    productType: "Home Loan",
    interestRate: 8.45,
    processingFee: "Up to 1% of loan amount",
    maxAmount: "₹5 Crore",
    tenure: "Up to 30 years",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=100&fit=crop",
    features: [
      "Instant e-approval facility",
      "SMS alerts for due payments and rate changes",
      "Aadhaar-based e-KYC for faster processing",
      "Special rates for NRI home loan applicants",
      "Part prepayment allowed without charges",
    ],
  },
  {
    id: "loan-6",
    bankName: "LIC Housing Finance",
    productType: "Home Loan",
    interestRate: 8.4,
    processingFee: "0.5% of loan amount",
    maxAmount: "₹10 Crore",
    tenure: "Up to 30 years",
    logo: "https://images.unsplash.com/photo-1565373679346-5411f85f6e6e?w=200&h=100&fit=crop",
    features: [
      "Specialized products for affordable housing",
      "Fast-track approval for salaried customers",
      "Balance transfer with attractive rates",
      "Loan against property also available",
      "Tax benefits under Section 80C and 24(b)",
    ],
  },
  {
    id: "loan-7",
    bankName: "Kotak Mahindra Bank",
    productType: "Home Loan",
    interestRate: 8.55,
    processingFee: "0.5% to 1% of loan amount",
    maxAmount: "₹5 Crore",
    tenure: "Up to 30 years",
    logo: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=200&h=100&fit=crop",
    features: [
      "Attractive interest rates for salaried professionals",
      "Online application with minimal documentation",
      "Step-up and Step-down EMI options",
      "Dedicated relationship manager",
      "Quick disbursal after property verification",
    ],
  },
  {
    id: "loan-8",
    bankName: "IDFC First Bank",
    productType: "Home Loan",
    interestRate: 8.65,
    processingFee: "1% of loan amount",
    maxAmount: "₹5 Crore",
    tenure: "Up to 30 years",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=100&fit=crop",
    features: [
      "Digital home loan journey with instant sanction",
      "Competitive rates for balance transfer",
      "Loan against property also available",
      "Free CIBIL score check for applicants",
      "Doorstep service for documentation",
    ],
  },
];

export function calculateEMI(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

export function calculateTotalPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const emi = calculateEMI(principal, annualRate, years);
  return emi * years * 12;
}

export function calculateTotalInterest(
  principal: number,
  annualRate: number,
  years: number
): number {
  const totalPayment = calculateTotalPayment(principal, annualRate, years);
  return totalPayment - principal;
}
