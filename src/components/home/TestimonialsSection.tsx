import Image from "next/image";
import { testimonials } from "@/lib/data/testimonials";

const featured = testimonials.slice(0, 3);

export function TestimonialsSection() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Clients
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
            Trusted by founders and professionals.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col rounded-xl border border-border bg-white p-6 sm:p-7"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">
                “{item.content.slice(0, 220)}
                {item.content.length > 220 ? "…" : ""}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/80 pt-5">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.businessType} · {item.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
