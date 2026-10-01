import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PublicCommunity } from "@/components/community/PublicCommunity";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Read discussions from India's CAs, CSs, lawyers and clients on tax, law and compliance. Sign in as a client or professional to post.",
};

export default function CommunityPage() {
  return (
    <>
      <PageHero
        size="compact"
        title="Community:"
        highlight="where practitioners compare notes."
        description="Rulings, circulars and real-world questions discussed by CAs, CSs, lawyers and the clients they advise."
      />
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <PublicCommunity />
      </div>
    </>
  );
}
