import type { Metadata } from "next";
import { aiConsultantName } from "@/lib/data/agents";
import { fetchProfessional } from "@/lib/data/professionals-server";
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
  const agent = await fetchProfessional(slug);
  if (!agent) return { title: "Consult" };
  return {
    title: `Consult ${aiConsultantName(agent)}`,
    description: `Chat or call with ${aiConsultantName(agent)} on MySalahkar`,
  };
}

/** ConsultSession loads the professional and shows "not found" unless they have a live AI Salahkar. */
export default async function ConsultPage({
  params,
  searchParams,
}: ConsultPageProps) {
  const { slug } = await params;
  const { mode } = await searchParams;
  const initialMode: ConsultMode = mode === "call" ? "call" : "chat";
  return <ConsultSession agentSlug={slug} initialMode={initialMode} />;
}
