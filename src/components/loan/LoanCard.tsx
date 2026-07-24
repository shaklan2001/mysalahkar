"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import { Building2, TrendingUp, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";

interface LoanCardProps {
  id: string;
  bankName: string;
  productType: string;
  interestRate: number;
  processingFee: string;
  maxAmount: string;
  tenure: string;
  logo: string;
  features: string[];
  monthlyEMI: number;
  totalPayment: number;
  totalInterest: number;
  isBestOffer: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function LoanCard({
  id,
  bankName,
  productType,
  interestRate,
  processingFee,
  maxAmount,
  tenure,
  logo,
  features,
  monthlyEMI,
  totalPayment,
  totalInterest,
  isBestOffer,
  isSelected,
  onSelect,
}: LoanCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleApplyNow = () => {
    toast.success(`Application initiated for ${bankName} ${productType}`, {
      description: "Our team will contact you shortly.",
    });
  };

  return (
    <Card
      className={`p-6 hover:shadow-lg transition-all duration-300 ${
        isBestOffer ? "border-2 border-emerald-500 shadow-md" : "border"
      }`}
    >
      {isBestOffer && (
        <Badge className="mb-4 bg-emerald-500 hover:bg-emerald-600">
          Best Offer - Lowest EMI
        </Badge>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-24 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={logo}
              alt={bankName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{bankName}</h3>
            <p className="text-sm text-gray-600">{productType}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Building2 className="h-3.5 w-3.5" />
            <span>Monthly EMI</span>
          </div>
          <p className="text-lg font-semibold text-emerald-600">
            {formatINR(monthlyEMI)}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Interest Rate</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {interestRate}% p.a.
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <DollarSign className="h-3.5 w-3.5" />
            <span>Processing Fee</span>
          </div>
          <p className="text-sm font-medium text-gray-900">{processingFee}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-3.5 w-3.5" />
            <span>Max Amount</span>
          </div>
          <p className="text-sm font-medium text-gray-900">{maxAmount}</p>
        </div>
      </div>

      {showDetails && (
        <div className="mb-6 space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Tenure</p>
              <p className="text-sm font-medium text-gray-900">{tenure}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Payment</p>
              <p className="text-sm font-medium text-gray-900">
                {formatINR(totalPayment)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Interest</p>
              <p className="text-sm font-medium text-gray-900">
                {formatINR(totalInterest)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-2">Key Features</p>
            <ul className="space-y-1.5">
              {features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleApplyNow}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
        >
          Apply Now
        </Button>
        <Button
          onClick={() => setShowDetails(!showDetails)}
          variant="outline"
          className="flex-1"
        >
          {showDetails ? "Hide Details" : "View Details"}
        </Button>
        <Button
          onClick={() => onSelect(id)}
          variant={isSelected ? "default" : "outline"}
          size="icon"
        >
          {isSelected ? "✓" : "+"}
        </Button>
      </div>
    </Card>
  );
}
