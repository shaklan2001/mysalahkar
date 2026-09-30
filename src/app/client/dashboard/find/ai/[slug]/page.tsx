import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiSalahkarView } from "@/components/agents/AiSalahkarView";
import { aiConsultantName } from "@/lib/data/agents";
import { getAiSalahkar } from "@/lib/data/marketplace";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = getAiSalahkar(slug);
  return {
    title: listing
      ? `${aiConsultantName(listing)} · AI Salahkar`
      : "AI Salahkar",
  };
}

export default async function ClientAiSalahkarPage({ params }: Props) {
  const { slug } = await params;
  const listing = getAiSalahkar(slug);
  if (!listing) notFound();
  return (
    <AiSalahkarView
      listing={listing}
      embedded
      backHref="/client/dashboard/find?kind=ai"
      backLabel="Back to Find experts"
      humanBase="/client/dashboard/find"
    />
  );
}
