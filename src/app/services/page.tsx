import { Metadata } from "next";
import { serviceCategories, totalServices } from "@/lib/data/services";
import { getAgent } from "@/lib/data/agents";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceCategoryCard } from "@/components/services/ServiceCategoryCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Services | My Salahkar",
  description:
    "Comprehensive professional services across taxation, corporate law, legal, IP, FEMA, real estate, wealth management, insurance, and lending. 12 service categories, 500+ services from expert AI consultants.",
};

export default function ServicesPage() {
  const categoryCount = serviceCategories.length;
  const uniqueAgents = new Set(
    serviceCategories.map((cat) => cat.agentSlug)
  ).size;

  return (
    <div>
      <ServicesHero
        categoryCount={categoryCount}
        totalServices={totalServices}
        aiExperts={uniqueAgents}
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {serviceCategories.map((category) => {
            const agent = getAgent(category.agentSlug);
            return (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <ServiceCategoryCard category={category} agent={agent} />
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-white p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Meet the AI consultants behind each service
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Connect with specialised agents for personalised guidance — available
            24/7 via WhatsApp, chat, or call.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/agents">
              Browse all consultants
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
