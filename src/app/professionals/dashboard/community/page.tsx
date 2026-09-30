import { PublicCommunity } from "@/components/community/PublicCommunity";
import { mockProfessional } from "@/lib/data/professional";

export default function ProCommunityPage() {
  const pro = mockProfessional;
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Community
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Share rulings and insights, and answer client questions. Your posts
          show your professional title.
        </p>
      </div>
      <PublicCommunity member={{ name: pro.name, role: pro.domain }} />
    </div>
  );
}
