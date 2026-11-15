import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { aiConsultantName } from "@/lib/data/agents";
import { getAiSalahkarAgent } from "@/lib/data/ai-salahkars";
import { ConsultSession } from "@/components/consult/ConsultSession";
import type { ConsultMode } from "@/components/consult/ConsultProvider";

type ConsultPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
};

export async function generateMetadata({
  params,
}: ConsultPageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAiSalahkarAgent(slug);
  if (!agent) return { title: "Consult" };
  return {
    title: `Consult ${aiConsultantName(agent)}`,
    description: `Chat or call with ${aiConsultantName(agent)} on MySalahkar`,
  };
}

export default async function ConsultPage({
  params,
  searchParams,
}: ConsultPageProps) {
  const { slug } = await params;
  const { mode } = await searchParams;

  if (!getAiSalahkarAgent(slug)) {
    notFound();
  }

  const initialMode: ConsultMode = mode === "call" ? "call" : "chat";

  return <ConsultSession agentSlug={slug} initialMode={initialMode} />;
}
