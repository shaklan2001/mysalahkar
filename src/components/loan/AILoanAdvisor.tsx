"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useConsult } from "@/components/consult/ConsultProvider";
import { Bot, Lightbulb, TrendingUp } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface AILoanAdvisorProps {
  recommendedProduct: {
    bankName: string;
    productType: string;
    interestRate: number;
    monthlyEMI: number;
    rationale: string;
  } | null;
  amount: number;
  tenure: number;
}

export function AILoanAdvisor({
  recommendedProduct,
  amount,
  tenure,
}: AILoanAdvisorProps) {
  const { openConsult } = useConsult();

  if (!recommendedProduct) {
    return null;
  }

  return (
    <Card className="border-border bg-white p-6">
      <div className="mb-4 flex items-start gap-4">
        <div className="rounded-lg bg-teal-50 p-3">
          <Bot className="h-6 w-6 text-accent" />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
              Ask Veer (AI Loan Advisor)
            </h3>
            <Badge variant="secondary" className="bg-teal-50 text-teal-800">
              AI Powered
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            Get personalized loan recommendations based on your profile
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Recommendation */}
        <div className="p-4 bg-white rounded-lg border border-purple-100">
          <div className="flex items-start gap-3 mb-3">
            <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                Recommended for You
              </p>
              <p className="text-xs text-gray-600 mb-3">
                Based on {formatINR(amount)} loan for {tenure} years
              </p>
            </div>
          </div>

          <div className="mb-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">
                {recommendedProduct.bankName}
              </h4>
              <Badge className="bg-emerald-500">
                {recommendedProduct.interestRate}% p.a.
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {recommendedProduct.productType}
            </p>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span className="text-lg font-semibold text-emerald-600">
                EMI: {formatINR(recommendedProduct.monthlyEMI)}/month
              </span>
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-medium text-gray-900">Why this?</span>{" "}
              {recommendedProduct.rationale}
            </p>
          </div>
        </div>

        {/* Chat-style tip */}
        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
          <div className="flex gap-3">
            <div className="p-2 bg-purple-100 rounded-full h-fit">
              <Bot className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium text-gray-900">Pro Tip:</span> Consider improving your CIBIL score to access even better rates. A score above 750 can save you lakhs in interest over the loan tenure.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={() => openConsult("veer-lending")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          size="lg"
        >
          <Bot className="h-4 w-4 mr-2" />
          Chat with Veer for Personalized Advice
        </Button>
      </div>
    </Card>
  );
}
