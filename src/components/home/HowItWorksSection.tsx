import { Card } from "@/components/ui/card";
import { howItWorksSteps } from "@/lib/data/stats";

export function HowItWorksSection() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Get expert guidance in three simple steps. Fast, efficient, and available 24/7.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {howItWorksSteps.map((step, idx) => (
            <div key={idx} className="relative">
              {idx < howItWorksSteps.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-1 w-full bg-gradient-to-r from-blue-200 to-blue-300 md:block" />
              )}
              
              <Card className="relative z-10 p-8 text-center transition-all hover:shadow-xl">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-2xl font-extrabold text-white shadow-lg">
                  {step.num}
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                
                <p className="leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
