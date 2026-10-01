import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories, totalServices } from "@/lib/data/services";
import { getAgent } from "@/lib/data/agents";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import { ConsultButton } from "@/components/consult/ConsultButton";
import { ServicesCatalog } from "@/components/services/ServicesCatalog";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Professional Services",
  description:
    "Official service catalogue — business setup, income tax, GST, trademark, FEMA, ROC secretarial, audit, financial services, and UAE advisory.",
};

export default function ServicesPage() {
  // Only what the client cards need — not the full agent profile.
  const categories = serviceCategories.map((category) => {
    const agent = getAgent(category.agentSlug);
    return {
      ...category,
      agent: agent ? { slug: agent.slug, name: agent.name } : undefined,
    };
  });

  const stats = [
    { value: String(serviceCategories.length), label: "Categories" },
    { value: String(totalServices), label: "Services" },
    { value: "AI + Human", label: "Every service, two ways" },
  ];

  return (
    <>
      <PageHero
        title="Every professional service your business needs,"
        highlight="in one catalogue."
        description="Business setup, income tax, GST, FEMA, secretarial and advisory. Ask an AI Salahkar for instant guidance, or book a verified professional to get it done."
      >
        <ConsultButton className="w-full sm:w-auto">
          Not sure? Ask an AI Salahkar
        </ConsultButton>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Link href="/agents">Browse professionals</Link>
        </Button>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <dl className="mx-auto -mt-2 mb-14 grid max-w-2xl grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-white">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse px-4 py-5 text-center"
            >
              <dt className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <ServicesCatalog categories={categories} />
      </div>

      <div className="pt-24">
        <FinalCTA />
      </div>
    </>
  );
}
