"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatINR, formatNumber } from "@/lib/utils";
import Link from "next/link";
import { Sparkles, TrendingDown, Building2, Users } from "lucide-react";

interface LoanCalculatorProps {
  loanType: string;
  amount: number;
  tenure: number;
  bestRate: number;
  lowestEMI: number;
  totalLenders: number;
  onLoanTypeChange: (type: string) => void;
  onAmountChange: (amount: number) => void;
  onTenureChange: (tenure: number) => void;
}

const LOAN_TYPES = [
  { value: "Home Loan", label: "Home Loan" },
  { value: "Personal Loan", label: "Personal Loan" },
  { value: "Business Loan", label: "Business Loan" },
  { value: "Car Loan", label: "Car Loan" },
];

const TENURE_OPTIONS = Array.from({ length: 26 }, (_, i) => ({
  value: (i + 5).toString(),
  label: `${i + 5} Years`,
}));

export function LoanCalculator({
  loanType,
  amount,
  tenure,
  bestRate,
  lowestEMI,
  totalLenders,
  onLoanTypeChange,
  onAmountChange,
  onTenureChange,
}: LoanCalculatorProps) {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    onAmountChange(Number(value));
  };

  return (
    <div className="sticky top-20 space-y-6">
      <Card className="border-border bg-white p-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Smart Loan Calculator
          </h2>
        </div>

        <div className="space-y-5">
          {/* Loan Type */}
          <div className="space-y-2">
            <Label htmlFor="loan-type" className="text-sm font-medium">
              Loan Type
            </Label>
            <Select value={loanType} onValueChange={onLoanTypeChange}>
              <SelectTrigger id="loan-type">
                <SelectValue placeholder="Select loan type" />
              </SelectTrigger>
              <SelectContent>
                {LOAN_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Loan Amount */}
          <div className="space-y-2">
            <Label htmlFor="loan-amount" className="text-sm font-medium">
              Loan Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                ₹
              </span>
              <Input
                id="loan-amount"
                type="text"
                value={amount === 0 ? "" : formatNumber(amount)}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="pl-7"
              />
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-2">
            <Label htmlFor="tenure" className="text-sm font-medium">
              Loan Tenure
            </Label>
            <Select value={tenure.toString()} onValueChange={(v) => onTenureChange(Number(v))}>
              <SelectTrigger id="tenure">
                <SelectValue placeholder="Select tenure" />
              </SelectTrigger>
              <SelectContent>
                {TENURE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          {/* Quick Insights */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Quick Insights
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-gray-600">Best Rate</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {bestRate.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Lowest EMI</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {formatINR(lowestEMI)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Total Lenders</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {totalLenders}
                </span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Get Expert Advice */}
          <Button
            asChild
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            <Link href="/agents/ashok-mehta-funding">
              <Sparkles className="h-4 w-4 mr-2" />
              Get Expert Advice
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
