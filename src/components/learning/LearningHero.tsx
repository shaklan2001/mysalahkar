import { learningSessions } from "@/lib/data/learning";

export function LearningHero() {
  const upcomingSessions = learningSessions.filter((s) => s.upcoming).length;
  const totalEnrolled = learningSessions.reduce((sum, s) => sum + s.enrolled, 0);
  const avgRating = (
    learningSessions.reduce((sum, s) => sum + s.rating, 0) /
    learningSessions.length
  ).toFixed(1);

  return (
    <section className="border-b border-border/70 bg-white/60 section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Learning
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            Professional learning that stays practical.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Taxation, corporate law, compliance, and financial management —
            live workshops and recorded sessions from practising experts.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border/80 pt-8 sm:max-w-xl">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {upcomingSessions}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Upcoming</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {totalEnrolled.toLocaleString()}+
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Enrolled</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {avgRating}★
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Avg rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
