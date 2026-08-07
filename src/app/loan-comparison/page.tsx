"use client";

import { useState, useMemo } from "react";
import {
  loanProducts,
  calculateEMI,
  calculateTotalPayment,
  calculateTotalInterest,
} from "@/lib/data/loans";
import { LoanCalculator } from "@/components/loan/LoanCalculator";
import { LoanCard } from "@/components/loan/LoanCard";
import { AILoanAdvisor } from "@/components/loan/AILoanAdvisor";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConsult } from "@/components/consult/ConsultProvider";
import { ArrowUpDown, HeadphonesIcon } from "lucide-react";
import { toast } from "sonner";

type SortOption = "emi" | "rate" | "processing";

export default function LoanComparisonPage() {
  const [loanType, setLoanType] = useState("Home Loan");
  const [amount, setAmount] = useState(5000000);
  const [tenure, setTenure] = useState(20);
  const [sortBy, setSortBy] = useState<SortOption>("emi");
  const [selectedLoans, setSelectedLoans] = useState<string[]>([]);
  const { openConsult } = useConsult();

  // Calculate loan details for each product
  const loansWithDetails = useMemo(() => {
    return loanProducts
      .filter((loan) => loan.productType === loanType)
      .map((loan) => {
        const monthlyEMI = calculateEMI(amount, loan.interestRate, tenure);
        const totalPayment = calculateTotalPayment(
          amount,
          loan.interestRate,
          tenure
        );
        const totalInterest = calculateTotalInterest(
          amount,
          loan.interestRate,
          tenure
        );

        const processingFeeNum = parseFloat(
          loan.processingFee.replace(/[^0-9.]/g, "")
        );

        return {
          ...loan,
          monthlyEMI,
          totalPayment,
          totalInterest,
          processingFeeNum,
        };
      });
  }, [loanType, amount, tenure]);

  // Sort loans
  const sortedLoans = useMemo(() => {
    const sorted = [...loansWithDetails];
    switch (sortBy) {
      case "emi":
        return sorted.sort((a, b) => a.monthlyEMI - b.monthlyEMI);
      case "rate":
        return sorted.sort((a, b) => a.interestRate - b.interestRate);
      case "processing":
        return sorted.sort((a, b) => a.processingFeeNum - b.processingFeeNum);
      default:
        return sorted;
    }
  }, [loansWithDetails, sortBy]);

  // Quick insights
  const bestRate = useMemo(() => {
    return Math.min(...loansWithDetails.map((l) => l.interestRate));
  }, [loansWithDetails]);

  const lowestEMI = useMemo(() => {
    return Math.min(...loansWithDetails.map((l) => l.monthlyEMI));
  }, [loansWithDetails]);

  const totalLenders = loansWithDetails.length;

  // Identify best offer
  const bestOfferId = sortedLoans[0]?.id;

  // AI recommendation logic
  const aiRecommendation = useMemo(() => {
    if (loansWithDetails.length === 0) return null;

    const bestLoan = loansWithDetails.reduce((best, current) =>
      current.monthlyEMI < best.monthlyEMI ? current : best
    );

    let rationale = "";
    if (amount >= 10000000) {
      rationale = `For high-value loans like yours, ${bestLoan.bankName} offers competitive rates with the lowest EMI. They have a strong track record in processing large ticket loans efficiently.`;
    } else if (amount >= 5000000) {
      rationale = `${bestLoan.bankName} provides the most affordable EMI for mid-sized loans, helping you save ${((loansWithDetails.find(l => l.id !== bestLoan.id)?.monthlyEMI || 0) - bestLoan.monthlyEMI).toFixed(0)} per month compared to the next best option.`;
    } else {
      rationale = `With the lowest interest rate of ${bestLoan.interestRate}%, ${bestLoan.bankName} is ideal for your loan requirement. You'll save significantly on total interest over ${tenure} years.`;
    }

    return {
      bankName: bestLoan.bankName,
      productType: bestLoan.productType,
      interestRate: bestLoan.interestRate,
      monthlyEMI: bestLoan.monthlyEMI,
      rationale,
    };
  }, [loansWithDetails, amount, tenure]);

  // Handle loan selection
  const handleSelectLoan = (id: string) => {
    if (selectedLoans.includes(id)) {
      setSelectedLoans(selectedLoans.filter((loanId) => loanId !== id));
    } else {
      if (selectedLoans.length >= 3) {
        toast.error("You can compare up to 3 loans at a time");
        return;
      }
      setSelectedLoans([...selectedLoans, id]);
    }
  };

  return (
    <div>
      <section className="border-b border-border/70 bg-white/60 section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Smart Loan
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Compare loans with clarity.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Side-by-side rates from leading banks and NBFCs — plus Veer, your AI
            loan advisor, for a tailored recommendation.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Calculator */}
          <div className="lg:col-span-1">
            <LoanCalculator
              loanType={loanType}
              amount={amount}
              tenure={tenure}
              bestRate={bestRate}
              lowestEMI={lowestEMI}
              totalLenders={totalLenders}
              onLoanTypeChange={setLoanType}
              onAmountChange={setAmount}
              onTenureChange={setTenure}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Loan Advisor */}
            <AILoanAdvisor
              recommendedProduct={aiRecommendation}
              amount={amount}
              tenure={tenure}
            />

            {/* Sort Control */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Available Loan Offers
                </h2>
                <p className="text-sm text-gray-600">
                  {totalLenders} lenders found for {loanType}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-gray-600" />
                <Select
                  value={sortBy}
                  onValueChange={(value: SortOption) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emi">Lowest EMI</SelectItem>
                    <SelectItem value="rate">Best Rate</SelectItem>
                    <SelectItem value="processing">Processing Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Loan Cards */}
            <div className="space-y-4">
              {sortedLoans.length > 0 ? (
                sortedLoans.map((loan) => (
                  <LoanCard
                    key={loan.id}
                    id={loan.id}
                    bankName={loan.bankName}
                    productType={loan.productType}
                    interestRate={loan.interestRate}
                    processingFee={loan.processingFee}
                    maxAmount={loan.maxAmount}
                    tenure={loan.tenure}
                    logo={loan.logo}
                    features={loan.features}
                    monthlyEMI={loan.monthlyEMI}
                    totalPayment={loan.totalPayment}
                    totalInterest={loan.totalInterest}
                    isBestOffer={loan.id === bestOfferId}
                    isSelected={selectedLoans.includes(loan.id)}
                    onSelect={handleSelectLoan}
                  />
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-gray-600">
                    No loan products available for {loanType}. Try selecting a
                    different loan type.
                  </p>
                </Card>
              )}
            </div>

            {/* Selected Loans Info */}
            {selectedLoans.length > 0 && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <p className="text-sm text-blue-900">
                  {selectedLoans.length} loan{selectedLoans.length > 1 ? "s" : ""}{" "}
                  selected for comparison.{" "}
                  {selectedLoans.length < 3 && (
                    <span className="text-blue-700">
                      You can select up to 3 loans.
                    </span>
                  )}
                </p>
              </Card>
            )}

            {/* Help Card */}
            <Card className="p-6 bg-gradient-to-br from-amber-50 via-white to-orange-50 border-amber-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <HeadphonesIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Need Help Choosing?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our loan experts can help you find the perfect loan based on
                    your credit profile, income, and financial goals. Get
                    personalized guidance and assistance with documentation.
                  </p>
                  <Button
                    onClick={() => openConsult("veer-lending")}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    <HeadphonesIcon className="h-4 w-4 mr-2" />
                    Consult an Expert
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
