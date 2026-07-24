import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/lib/data/testimonials";
import { Star, MapPin } from "lucide-react";
import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Trusted by Thousands
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Real stories from businesses and individuals who've transformed their professional consultancy experience.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col p-6 transition-all hover:shadow-xl">
              <div className="mb-4 flex items-start gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="rounded-full bg-slate-100"
                />
                
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <MapPin className="h-3.5 w-3.5" />
                    {testimonial.location}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {testimonial.businessType}
                  </div>
                </div>
              </div>
              
              <div className="mb-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Badge variant="secondary" className="text-xs">
                  via {testimonial.agentName} • {testimonial.agentType}
                </Badge>
              </div>
              
              <p className="flex-1 text-sm leading-relaxed text-slate-700">
                {testimonial.content}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
