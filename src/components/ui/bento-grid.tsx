import { cn } from "@/lib/utils";

// Adapted from Aceternity UI "Bento Grid" — brand tokens instead of neutral greys.
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid grid-cols-1 gap-4 md:auto-rows-[19rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-border bg-white p-5 transition duration-200 hover:border-accent/30 hover:shadow-[0_18px_40px_-24px_rgba(0,20,80,0.35)]",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-1.5">
        {icon}
        <div className="mt-3 mb-1.5 font-display text-[15px] font-semibold tracking-tight text-foreground">
          {title}
        </div>
        <div className="text-[13px] leading-relaxed text-muted-foreground">
          {description}
        </div>
      </div>
    </div>
  );
};
