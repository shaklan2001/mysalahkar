import { Card } from "@/components/ui/card";
import { trustLogos } from "@/lib/data/stats";
import { Award } from "lucide-react";

export function TrustLogosSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
            <Award className="h-5 w-5" />
            Recognized & Trusted By
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {trustLogos.map((logo, idx) => (
            <Card
              key={idx}
              className="flex flex-col items-center justify-center p-6 text-center transition-all hover:shadow-lg"
            >
              <div className="mb-2 text-lg font-extrabold text-slate-900">
                {logo.name}
              </div>
              <div className="text-xs text-slate-600">
                {logo.description}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
