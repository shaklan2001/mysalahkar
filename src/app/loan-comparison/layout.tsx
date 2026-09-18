import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Salahkar",
  robots: { index: false, follow: false },
};

export default function LoanComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
