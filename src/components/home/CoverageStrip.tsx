const coverage = [
  "GST",
  "Income Tax",
  "MCA · ROC",
  "SEBI",
  "RBI",
  "FEMA",
  "Trademark",
  "IBC",
  "UAE setup",
];

export function CoverageStrip() {
  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-12 sm:px-6 lg:flex-row lg:gap-10 lg:px-8">
        <p className="shrink-0 text-center text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase lg:text-left">
          Advice across every
          <br className="hidden lg:block" /> regulator you deal with
        </p>
        <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-between">
          {coverage.map((item) => (
            <li
              key={item}
              className="font-display text-lg font-semibold tracking-tight text-foreground/35 transition-colors hover:text-foreground/70"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
