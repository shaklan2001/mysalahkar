import { notFound } from "next/navigation";
import { aiConsultantName, getAgent, isLiveDemoAgent } from "@/lib/data/agents";
import { ConsultSession } from "@/components/consult/ConsultSession";
import type { ConsultMode } from "@/components/consult/ConsultProvider";
import type { Metadata } from "next";

type ConsultPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
};

export async function generateMetadata({
  params,
}: ConsultPageProps): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return { title: "Consult" };
  return {
    title: `Consult ${aiConsultantName(agent)}`,
    description: `Chat or call with ${aiConsultantName(agent)} on MySalahkaar`,
  };
}

export default async function ConsultPage({
  params,
  searchParams,
}: ConsultPageProps) {
  const { slug } = await params;
  const { mode } = await searchParams;

  if (!isLiveDemoAgent(slug) || !getAgent(slug)) {
    notFound();
  }

  const initialMode: ConsultMode = mode === "call" ? "call" : "chat";

  return <ConsultSession agentSlug={slug} initialMode={initialMode} />;
}
