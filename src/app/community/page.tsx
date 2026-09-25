import { Metadata } from "next";
import { CommunityPageView } from "@/components/community/CommunityPageView";

export const metadata: Metadata = {
  title: "Community",
  description:
    "LinkedIn-style feed for professionals and clients to share views on tax, law, and compliance — open to all users.",
};

export default function CommunityPage() {
  return <CommunityPageView />;
}
