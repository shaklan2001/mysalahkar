import { agents } from "@/lib/data/agents";
import { AgentsDirectory } from "@/components/agents/AgentsDirectory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find AI Professional Consultants | Salahkar",
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Find AI Professional Consultants
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with expert AI consultants for tax, legal, compliance, wealth management, and more. 
            Get professional advice 24/7 from India's most experienced professionals.
          </p>
        </div>

        <AgentsDirectory agents={agents} searchParams={params} />
      </div>
    </div>
  );
}
