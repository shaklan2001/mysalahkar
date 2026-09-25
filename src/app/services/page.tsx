import { Metadata } from "next";
import { serviceCategories, totalServices } from "@/lib/data/services";
import { getAgent } from "@/lib/data/agents";
import {
  ServicesCategoryNav,
  ServicesHero,
} from "@/components/services/ServicesHero";
import { ServiceCategoryCard } from "@/components/services/ServiceCategoryCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Services",
  description:
    "Official service catalogue — business setup, income tax, GST, trademark, FEMA, ROC secretarial, audit, financial services, and UAE advisory.",
};

export default function ServicesPage() {
  const navItems = serviceCategories.map((cat) => ({
    id: cat.id,
    category: cat.category,
    count: cat.services.length,
  }));

  return (
    <div>
      <ServicesHero
        categoryCount={serviceCategories.length}
        totalServices={totalServices}
      />
      <ServicesCategoryNav categories={navItems} />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {serviceCategories.map((category) => {
            const agent = getAgent(category.agentSlug);
            return (
              <div key={category.id} id={category.id} className="scroll-mt-32">
                <ServiceCategoryCard category={category} agent={agent} />
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-white p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Need help choosing a service?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Start a consultation — AI Consultation or Human Consultation for
            any service in this catalogue.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/agents">
              Talk to an AI Salahkar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
