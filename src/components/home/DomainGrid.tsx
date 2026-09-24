import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { domainCards } from "@/lib/data/stats";
import { 
  Calculator, 
  Briefcase, 
  Scale, 
  Globe, 
  TrendingUp, 
  Home, 
  AlertCircle,
  LucideIcon 
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  Briefcase,
  Scale,
  Globe,
  TrendingUp,
  Home,
  AlertCircle,
};

export function DomainGrid() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Professional Expertise Across Domains
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Browse our AI Salahkars by specialty. From tax and legal to wealth and real estate—find the right expert for your needs.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {domainCards.map((domain, idx) => {
            const Icon = iconMap[domain.icon] || Calculator;
            const typeSlug = domain.title.toLowerCase().replace(/\s+/g, "-");
            
            return (
              <Link
                key={idx}
                href={`/agents?type=${typeSlug}`}
                className="group"
              >
                <Card className="h-full p-6 transition-all hover:shadow-xl hover:-translate-y-1">
                  <div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${domain.color}15` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: domain.color }} />
                  </div>
                  
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700">
                      {domain.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {domain.agentCount} {domain.agentCount === 1 ? 'Agent' : 'Agents'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm leading-relaxed text-slate-600">
                    {domain.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
