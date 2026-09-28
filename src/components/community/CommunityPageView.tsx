import { CommunityFeed } from "@/components/community/CommunityFeed";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";

export function CommunityPageView({ compact = false }: { compact?: boolean }) {
  const heading = (
    <>
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
    </>
  );

  const feed = (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <CommunityFeed />
      </div>
      <div className="lg:col-span-1">
        <CommunitySidebar />
      </div>
    </div>
  );

  if (compact) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Community
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Share views with peers. Post insights, ask questions, and discuss
            compliance.
          </p>
        </div>
        {feed}
      </div>
    );
  }

  return (
    <div>
      <section className="section-pad border-b border-border/70 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{heading}</div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{feed}</div>
    </div>
  );
}
