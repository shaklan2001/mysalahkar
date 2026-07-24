import { homeStats } from "@/lib/data/stats";

export function StatsStrip() {
  return (
    <section className="bg-slate-900 py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {homeStats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="mb-2 text-3xl font-extrabold text-white md:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-300 md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
