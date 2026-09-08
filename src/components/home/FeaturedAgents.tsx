import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLiveDemoAgents } from "@/lib/data/agents";

const featured = getLiveDemoAgents();

export function FeaturedAgents() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Find Professionals
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
              AI specialists and human consultants.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Talk to live AI agents anytime — or schedule a call with a verified
              human professional.
            </p>
          </div>
          <Link
            href="/agents"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
          >
            Browse all professionals
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((agent) => (
            <Link
              key={agent.slug}
              href={`/agents/${agent.slug}`}
              className="group rounded-xl border border-border bg-white p-5 transition-colors hover:border-accent/40 hover:bg-[#f8fafb]"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-display text-base font-semibold tracking-tight text-foreground">
                    {agent.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{agent.typeLabel}</p>
                </div>
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {agent.tagline}
              </p>
              <p className="mt-4 text-xs font-medium text-accent">
                {agent.availability}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
