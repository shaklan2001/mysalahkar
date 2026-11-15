import type { Metadata } from "next";
import { LiveAiSalahkar } from "@/components/agents/LiveAiSalahkar";
import { aiConsultantName } from "@/lib/data/agents";
import { findAiSalahkar } from "@/lib/data/marketplace";
import { fetchProfessionals } from "@/lib/data/professionals-server";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = findAiSalahkar(await fetchProfessionals(), slug);
  return {
    title: listing
      ? `${aiConsultantName(listing)} · AI Salahkar`
      : "AI Salahkar",
  };
}

export default async function ClientAiSalahkarPage({ params }: Props) {
  const { slug } = await params;
  return (
    <LiveAiSalahkar
      aiSlug={slug}
      embedded
      backHref="/client/dashboard/find?kind=ai"
      backLabel="Back to Find professionals"
      humanBase="/client/dashboard/find"
    />
  );
}
