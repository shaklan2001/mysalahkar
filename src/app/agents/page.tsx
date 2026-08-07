import { agents } from "@/lib/data/agents";
import { AgentsDirectory } from "@/components/agents/AgentsDirectory";
import { PageHero } from "@/components/layout/PageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Professional Consultants",
  description:
    "Browse expert AI consultants for tax, legal, compliance, wealth management, and more. Get professional advice 24/7.",
};

interface AgentsPageProps {
  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function AgentsPage({ searchParams }: AgentsPageProps) {
  const params = await searchParams;

  return (
    <div>
      <PageHero
        eyebrow="AI Agents"
        title="Find the right professional consultant."
        description="Connect with specialised AI agents for tax, legal, compliance, wealth, and more — available 24/7 on WhatsApp, chat, or call."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <AgentsDirectory agents={agents} searchParams={params} />
      </div>
    </div>
  );
}
