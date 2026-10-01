import { useId } from "react";
import { cn } from "@/lib/utils";

interface MySalahkarLogoProps {
  height?: number;
  variant?: "default" | "white";
  className?: string;
  /** Icon only — no wordmark */
  markOnly?: boolean;
  /** Show CONNECT • CONSULT • GROW under the wordmark */
  withTagline?: boolean;
}

const NAVY = "#001450";
const BLUE = "#003CF8";

/**
 * Official mysalahkar logo: two figures forming an "M", a ring and a
 * check that turns into an arrow. Mark is SVG; the wordmark is live text
 * (Poppins) so it stays crisp and never gets cropped.
 */
export function MySalahkarLogo({
  height = 40,
  variant = "default",
  className,
  markOnly = false,
  withTagline = false,
}: MySalahkarLogoProps) {
  const onDark = variant === "white";
  const navy = onDark ? "#FFFFFF" : NAVY;
  const blue = onDark ? "#6F93FF" : BLUE;
  const taglineColor = onDark ? "rgba(255,255,255,0.85)" : NAVY;

  const markSize = withTagline ? Math.round(height * 0.78) : height;

  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      style={{ height: withTagline ? height : markSize }}
    >
      <MySalahkarMark size={markSize} navy={navy} blue={BLUE} />
      {!markOnly && (
        <span
          className="flex flex-col justify-center leading-none"
          // Optical centring: the M's solid body sits low in the mark, so a
          // box-centred wordmark reads as floating high. Nudge it onto the M.
          style={{ transform: `translateY(${Math.round(markSize * 0.08)}px)` }}
        >
          <span
            className="font-semibold"
            style={{
              fontFamily:
                "var(--font-logo), var(--font-plus-jakarta), system-ui, sans-serif",
              fontSize: withTagline
                ? Math.round(height * 0.34)
                : Math.round(height * 0.46),
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: navy }}>my</span>
            <span style={{ color: blue }}>salahkar</span>
          </span>
          {withTagline && (
            <span
              className="mt-1 flex items-center gap-1.5"
              style={{
                color: taglineColor,
                fontFamily:
                  "var(--font-logo), var(--font-plus-jakarta), system-ui, sans-serif",
                fontSize: Math.max(8, Math.round(height * 0.12)),
                fontWeight: 500,
                letterSpacing: "0.16em",
              }}
            >
              <span
                className="h-px w-3 shrink-0"
                style={{ background: onDark ? "rgba(255,255,255,0.45)" : BLUE }}
              />
              CONNECT
              <span aria-hidden style={{ color: onDark ? "#6F93FF" : BLUE }}>
                •
              </span>
              CONSULT
              <span aria-hidden style={{ color: onDark ? "#6F93FF" : BLUE }}>
                •
              </span>
              GROW
              <span
                className="h-px w-3 shrink-0"
                style={{ background: onDark ? "rgba(255,255,255,0.45)" : BLUE }}
              />
            </span>
          )}
        </span>
      )}
    </span>
  );
}

/**
 * The mark on its own, traced from the brand artwork (viewBox 510×510):
 * navy figure + left bar, blue figure + right bar, one V stroke whose
 * colour folds from navy to blue in the valley, a navy ring open at the
 * bottom and top-right, and a blue check whose arm becomes an arrow.
 * Source of truth for /public/brand/mysalahkar-mark.svg.
 */
export function MySalahkarMark({
  size = 40,
  navy = NAVY,
  blue = BLUE,
  className,
}: {
  size?: number;
  navy?: string;
  blue?: string;
  className?: string;
}) {
  const gradientId = `msk-v-${useId().replace(/:/g, "")}`;
  const onWhite = navy === NAVY;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 510 510"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="200"
          y1="412"
          x2="344"
          y2="344"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.382" stopColor={navy} />
          <stop offset="0.382" stopColor={onWhite ? "#0028C2" : blue} />
          <stop offset="0.6" stopColor={blue} />
          <stop offset="1" stopColor={onWhite ? "#1F55FF" : blue} />
        </linearGradient>
      </defs>
      {/* Ring */}
      <path
        d="M324.3 37.2A124 124 0 1 0 220.8 259.2M289.2 259.2A124 124 0 0 0 377.1 161.5"
        stroke={navy}
        strokeWidth="18"
        strokeLinecap="round"
      />
      {/* Check → arrow */}
      <path
        d="M200 180L250 230L362 97"
        stroke={blue}
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M402 50L392.6 123.2L331.4 71.6Z"
        fill={blue}
        stroke={blue}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Figures */}
      <circle cx="54" cy="163" r="36" fill={navy} />
      <circle cx="457" cy="163" r="36" fill={blue} />
      {/* The "M" */}
      <path
        d="M56 256V463"
        stroke={navy}
        strokeWidth="82"
        strokeLinecap="round"
      />
      <path
        d="M455 254V465"
        stroke={blue}
        strokeWidth="80"
        strokeLinecap="round"
      />
      <path
        d="M56 251L256 434L455 247"
        stroke={`url(#${gradientId})`}
        strokeWidth="74"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
