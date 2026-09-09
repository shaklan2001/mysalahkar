const principles = [
  {
    num: "01",
    title: "Choose your domain",
    body: "Pick a service category or an AI consultant — CA, CS, Legal, FEMA, Wealth, and more.",
  },
  {
    num: "02",
    title: "Consult your way",
    body: "Message on WhatsApp, chat on the site, or start a voice call. Same expert context everywhere.",
  },
  {
    num: "03",
    title: "Escalate when needed",
    body: "Complex matters can be handed to a human professional — with your conversation history intact.",
  },
];

export function PrinciplesSection() {
  return (
    <section className="border-y border-border/70 bg-white/70 section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
            Three steps to clarity.
          </h2>
        </div>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {principles.map((item) => (
            <li key={item.num} className="relative">
              <span className="font-display text-4xl font-semibold tracking-tight text-border">
                {item.num}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
