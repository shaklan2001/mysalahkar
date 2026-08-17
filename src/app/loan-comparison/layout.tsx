import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Loan Comparison",
  description:
    "Compare home, personal, and business loans from India's leading banks and NBFCs. Get AI-powered recommendations from Veer, your loan advisor.",
};

export default function LoanComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
