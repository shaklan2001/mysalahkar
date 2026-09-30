import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  /** Optional pill above the title, e.g. { label: "DPDP-aligned", href: "/privacy" } */
  badge?: { label: string; href?: string };
  title: React.ReactNode;
  /** Words rendered in the brand gradient after the title */
  highlight?: string;
  description: string;
  align?: "center" | "left";
  /** "compact" for app-like pages (directories) that lead into content fast */
  size?: "default" | "compact";
  className?: string;
  children?: React.ReactNode;
};

/** Marketing page hero — same soft glow + dot field as the home hero. */
export function PageHero({
  eyebrow,
  badge,
  title,
  highlight,
  description,
  align = "center",
  size = "default",
  className,
  children,
}: PageHeroProps) {
  const centered = align === "center";

  const pill = badge ? (
    <span className="beam-border inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-ink-soft">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {badge.label}
      {badge.href ? <ArrowRight className="h-3 w-3" /> : null}
    </span>
  ) : null;

  return (
    <section
      className={cn("relative isolate -mt-16 overflow-hidden pt-16", className)}
    >
      <div className="bg-dots mask-hero absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute top-[-18rem] left-1/2 -z-10 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,60,248,0.13),transparent)]"
        aria-hidden
      />

      <div
        className={cn(
          "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
          size === "compact"
            ? "pt-12 pb-10 md:pt-16"
            : "pt-16 pb-14 md:pt-24 md:pb-16",
        )}
      >
        <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
          {badge ? (
            badge.href ? (
              <Link
                href={badge.href}
                className="transition-opacity hover:opacity-80"
              >
                {pill}
              </Link>
            ) : (
              pill
            )
          ) : eyebrow ? (
            <p className="eyebrow">{eyebrow}</p>
          ) : null}

          <h1
            className={cn(
              "mt-6 text-balance font-display leading-[1.08] font-semibold tracking-tight text-foreground",
              size === "compact"
                ? "text-3xl sm:text-4xl lg:text-[2.75rem]"
                : "text-4xl sm:text-5xl lg:text-[3.4rem]",
            )}
          >
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="bg-gradient-to-r from-[#003cf8] to-[#4f7bff] bg-clip-text text-transparent">
                  {highlight}
                </span>
              </>
            ) : null}
          </h1>
          <p
            className={cn(
              "mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
          {children ? (
            <div
              className={cn(
                "mt-9 flex flex-wrap gap-3",
                centered && "justify-center",
              )}
            >
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
