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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <ServicesHero
        categoryCount={categoryCount}
        totalServices={totalServices}
        aiExperts={uniqueAgents}
      />

      {/* Service Categories */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {serviceCategories.map((category) => {
            const agent = getAgent(category.agentSlug);
            return (
              <ServiceCategoryCard
                key={category.id}
                category={category}
                agent={agent}
              />
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-2">
              Meet Our Expert AI Consultants
            </h2>
            <p className="text-blue-100 mb-6 max-w-xl">
              Connect with specialized AI professionals for personalized guidance
              across all service categories. Available 24/7 via WhatsApp, chat, or
              call.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              <Link href="/agents">
                Browse All Consultants
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
