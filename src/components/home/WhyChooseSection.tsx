import { Card } from "@/components/ui/card";
import { whyChooseFeatures } from "@/lib/data/stats";
import {
  Brain,
  Clock,
  Users,
  Lock,
  Award,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Clock,
  Users,
  Lock,
  Award,
};

export function WhyChooseSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Why Choose My Salahkar?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            The future of professional consultancy—combining AI efficiency with human expertise.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseFeatures.map((feature, idx) => {
            const Icon = iconMap[feature.icon] || Brain;
            
            return (
              <Card key={idx} className="p-8 transition-all hover:shadow-lg">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                  <Icon className="h-7 w-7 text-blue-700" />
                </div>
                
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                
                <p className="leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
