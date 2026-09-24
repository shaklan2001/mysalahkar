import { cn } from "@/lib/utils";

interface MySalahkarLogoProps {
  height?: number;
  variant?: "default" | "white";
  className?: string;
  /** Icon only — no wordmark */
  markOnly?: boolean;
  /** Show CONNECT · CONSULT · GROW under the wordmark */
  withTagline?: boolean;
}

/**
 * Official mysalahkar mark: two figures forming M + check/arrow.
 * Nav uses SVG + HTML wordmark so nothing gets cropped.
 */
export function MySalahkarLogo({
  height = 40,
  variant = "default",
  className,
  markOnly = false,
  withTagline = false,
}: MySalahkarLogoProps) {
  const onDark = variant === "white";
  const navy = onDark ? "#FFFFFF" : "#001450";
  const blue = "#003CF8";
  const taglineColor = onDark ? "rgba(255,255,255,0.85)" : "#001450";

  const markSize = withTagline ? Math.round(height * 0.72) : height;

  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      style={{ height: withTagline ? height : markSize }}
    >
      <MarkSvg size={markSize} navy={navy} blue={blue} />
      {!markOnly && (
        <span className="flex flex-col justify-center leading-none">
          <span
            className="font-semibold tracking-tight"
            style={{
              fontSize: withTagline ? Math.round(height * 0.32) : Math.round(height * 0.42),
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: navy }}>my</span>
            <span style={{ color: onDark ? "#6f93ff" : blue }}>salahkar</span>
          </span>
          {withTagline && (
            <span
              className="mt-1 flex items-center gap-1.5 tracking-[0.14em]"
              style={{
                color: taglineColor,
                fontSize: Math.max(8, Math.round(height * 0.12)),
                fontWeight: 600,
              }}
            >
              <span
                className="h-px w-3 shrink-0"
                style={{ background: onDark ? "rgba(255,255,255,0.45)" : navy }}
              />
              CONNECT · CONSULT · GROW
              <span
                className="h-px w-3 shrink-0"
                style={{ background: onDark ? "rgba(255,255,255,0.45)" : navy }}
              />
            </span>
          )}
        </span>
      )}
    </span>
  );
}

function MarkSvg({
  size,
  navy,
  blue,
}: {
  size: number;
  navy: string;
  blue: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      {/* Left figure */}
      <circle cx="30" cy="26" r="11" fill={navy} />
      <rect x="21" y="38" width="18" height="42" rx="9" fill={navy} />
      {/* Right figure */}
      <circle cx="90" cy="26" r="11" fill={blue} />
      <rect x="81" y="38" width="18" height="42" rx="9" fill={blue} />
      {/* Arms / M valley */}
      <path
        d="M30 52 C42 52 48 78 60 86 C72 78 78 52 90 52"
        stroke={navy}
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M36 54 C46 54 52 74 60 80 C68 74 74 54 84 54"
        stroke={blue}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
      {/* Circle */}
      <circle
        cx="60"
        cy="44"
        r="16"
        stroke={navy}
        strokeWidth="2.5"
        fill="none"
      />
      {/* Check → arrow */}
      <path
        d="M50 45 L57 52 L74 32"
        stroke={blue}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M74 32 L74 41 M74 32 L65 32"
        stroke={blue}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
