import { Metadata } from "next";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";

export const metadata: Metadata = {
  title: "Community",
  description:
    "LinkedIn-style feed for professionals and clients to share views on tax, law, and compliance — open to all users.",
};

export default function CommunityPage() {
  return (
    <div>
      <section className="section-pad border-b border-border/70 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Community
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Share views with peers and clients.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Open to all users for now. Post insights, ask questions, discuss
            compliance — LinkedIn-style for India&apos;s professional community.
          </p>
        </div>
      </section>

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
