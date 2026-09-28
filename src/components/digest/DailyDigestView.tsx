import Link from "next/link";
import {
  digestUpdates,
  getDigestForDate,
  globalNewsTop5,
} from "@/lib/data/digest";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export function DailyDigestView({
  communityHref,
  compact = false,
}: {
  communityHref: string;
  compact?: boolean;
}) {
  const today = getDigestForDate();
  const history = [...digestUpdates].sort((a, b) => b.date.localeCompare(a.date));

  const heading = compact ? (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Daily Digest
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        GST, Income Tax, ROC, SEBI, RBI, and MCA. Quiet days show &ldquo;No
        Updates for Day.&rdquo;
      </p>
    </div>
  ) : (
    <section className="section-pad border-b border-border/70 bg-white/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Daily Digest
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Compliance updates — one pull a day.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Mock AI agent watches GST, Income Tax, ROC, SEBI, RBI, and MCA.
          Quiet days show &ldquo;No Updates for Day.&rdquo;
        </p>
      </div>
    </section>
  );

  return (
    <div className={compact ? "mx-auto max-w-6xl space-y-6" : undefined}>
      {heading}

      <div className={compact ? undefined : "mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"}>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <article className="rounded-xl border border-border bg-white p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={today.quiet ? "outline" : "secondary"}>
                  Today · {today.date}
                </Badge>
                <Badge variant="outline">{today.source}</Badge>
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
                {today.quiet ? "No Updates for Day" : today.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {today.summary}
              </p>
              {!today.quiet ? (
                <a
                  href={today.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Official source
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </article>

            <div>
              <h3 className="font-display text-lg font-semibold tracking-tight">
                Recent India updates
              </h3>
              <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-white">
                {history.map((u) => (
                  <li key={u.id} className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>{u.date}</span>
                      <span>·</span>
                      <span className="font-medium text-foreground">{u.source}</span>
                    </div>
                    <p
                      className={`mt-1 text-sm font-medium ${
                        u.quiet ? "italic text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {u.quiet ? "No Updates for Day" : u.title}
                    </p>
                    {!u.quiet ? (
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {u.summary}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-white p-5">
              <h3 className="font-display text-base font-semibold tracking-tight">
                Top 5 global
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Alongside India-specific compliance pulls.
              </p>
              <ol className="mt-4 space-y-3">
                {globalNewsTop5.map((n, i) => (
                  <li key={n.id}>
                    <a href={n.url} target="_blank" rel="noreferrer" className="group block">
                      <span className="text-xs text-muted-foreground">
                        {i + 1}. {n.source} · {n.region}
                      </span>
                      <p className="text-sm font-medium text-foreground group-hover:text-accent">
                        {n.title}
                      </p>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-xl border border-border bg-[#f8fafb] p-5 text-sm text-muted-foreground">
              Prefer peer discussion?{" "}
              <Link
                href={communityHref}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Open Community
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
