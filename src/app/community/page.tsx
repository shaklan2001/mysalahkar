import { Metadata } from "next";
import { CommunityHeader } from "@/components/community/CommunityHeader";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";

export const metadata: Metadata = {
  title: "Community | My Salahkar",
  description:
    "Join India's premier professional community. Connect with CAs, CSs, lawyers, and fellow business owners. Share insights, stay updated on regulatory changes, and grow together.",
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <CommunityHeader />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <CommunityFeed />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CommunitySidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
