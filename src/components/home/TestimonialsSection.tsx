import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "@/lib/data/testimonials";

function trim(text: string, max = 200) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max))}…`;
}

const cards = testimonials.map((item) => ({
  quote: trim(item.content),
  name: item.name,
  title: `${item.businessType} · ${item.location}`,
  image: item.image,
  rating: item.rating,
}));

export function TestimonialsSection() {
  return (
    <section className="section-pad overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="eyebrow">Loved by clients</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Founders and finance teams trust My Salahkar.
        </h2>
      </div>
      <div className="mx-auto mt-12 max-w-7xl">
        <InfiniteMovingCards items={cards} speed="slow" />
      </div>
    </section>
  );
}
