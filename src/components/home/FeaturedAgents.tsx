import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { agents, aiConsultantName } from "@/lib/data/agents";
import { ExpertCard } from "@/components/agents/ExpertCard";

const aiSalahkars = agents.filter((agent) => agent.liveDemo);
const humanExperts = agents;

export function FeaturedAgents() {
  return (
    <>
      <section className="section-pad pb-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                AI Salahkar
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
                Talk to an AI Salahkar, anytime.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Ankit AI and Soniya AI here are AI Salahkars — chat or call
                24/7. They are not a live human on the line.
              </p>
            </div>
            <Link
              href="/agents?kind=ai"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
            >
              Browse AI Salahkars
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {aiSalahkars.map((agent) => (
              <ExpertCard
                key={agent.slug}
                agent={agent}
                badge="AI Salahkar"
                availability="Online 24/7"
                showAiBadge
                displayName={aiConsultantName(agent)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Human experts
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
                Book a verified human professional.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Real consultants, by appointment. Ankit and Soniya are listed
                here as people, separate from their AI Salahkars above.
              </p>
            </div>
            <Link
              href="/agents?kind=human"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
            >
              Show all
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {humanExperts.slice(0, 6).map((agent) => (
              <ExpertCard
                key={agent.slug}
                agent={agent}
                badge="Human"
                availability={agent.liveDemo ? "By appointment" : agent.availability}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
