import { Metadata } from "next";
import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";

export const metadata: Metadata = {
  title: "Daily Digest | My Salahkar",
  description:
    "Stay current on tax, corporate, and regulatory updates. Daily digest for India's professionals and business owners.",
};

export default function DailyDigestPage() {
  return (
    <div>
      <CommunityHeader />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CommunityFeed />
          </div>
          <div className="lg:col-span-1">
            <CommunitySidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
