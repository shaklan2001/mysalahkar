const stats = [
  { value: "17+", label: "AI specialist agents" },
  { value: "380+", label: "Professional services" },
  { value: "24/7", label: "Consultation access" },
  { value: "3", label: "Channels — WhatsApp, chat, call" },
];

export function QuietTrust() {
  return (
    <section className="border-y border-border/70 bg-white/70">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
