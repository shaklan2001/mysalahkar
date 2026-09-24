import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { agents, aiConsultantName } from "@/lib/data/agents";
import { aiSalahkarHref } from "@/lib/data/marketplace";
import { ExpertCard } from "@/components/agents/ExpertCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const aiSalahkars = agents.filter((agent) => agent.liveDemo);
const humanExperts = agents.slice(0, 6);

export function ExpertsShowcase() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="ai">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Meet the Salahkars</p>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Start with AI. Book a human when you&apos;re ready.
              </h2>
              <p className="mt-3 text-muted-foreground">
                AI Salahkars are available 24/7 and are clearly labelled. They are
                never a live human on the line. Human experts are verified and work
                by appointment.
              </p>
            </div>
            <TabsList className="self-start md:self-auto">
              <TabsTrigger value="ai" className="px-4">AI Salahkars</TabsTrigger>
              <TabsTrigger value="human" className="px-4">Human experts</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="ai" className="mt-10">
            <div className="grid gap-5 sm:grid-cols-2">
              {aiSalahkars.map((agent) => (
                <ExpertCard
                  key={agent.slug}
                  agent={agent}
                  badge="AI Salahkar"
                  availability="Online 24/7"
                  showAiBadge
                  displayName={aiConsultantName(agent)}
                  href={aiSalahkarHref(agent)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="human" className="mt-10">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {humanExperts.map((agent) => (
                <ExpertCard
                  key={agent.slug}
                  agent={agent}
                  badge="Human"
                  availability={agent.liveDemo ? "By appointment" : agent.availability}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 flex justify-center">
          <Link
            href="/agents"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
          >
            Browse all professionals
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
