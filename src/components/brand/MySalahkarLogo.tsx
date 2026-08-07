interface MySalahkarLogoProps {
  height?: number;
  variant?: "default" | "white";
  className?: string;
}

export function MySalahkarLogo({
  height = 40,
  variant = "default",
  className,
}: MySalahkarLogoProps) {
  const suffix = variant === "white" ? "w" : "d";
  const mark = `salahkar-mark-${suffix}`;
  const onDark = variant === "white";

  return (
    <svg
      viewBox="0 0 210 48"
      height={height}
      className={className}
      style={{ display: "block" }}
      aria-label="My Salahkar — AI Professional Consultancy"
      role="img"
    >
      <defs>
        <linearGradient id={mark} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0e7490" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" fill={`url(#${mark})`} />
      <path
        d="M24,11 L27.7,18.3 L35,22 L27.7,25.7 L24,33 L20.3,25.7 L13,22 L20.3,18.3 Z"
        fill="white"
        opacity="0.97"
      />
      <circle cx="24" cy="22" r="2.2" fill={`url(#${mark})`} />
      <text
        x="54"
        y="21"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="11"
        fontWeight="500"
        letterSpacing="0.18em"
        fill={onDark ? "rgba(255,255,255,0.55)" : "#0e7490"}
        textAnchor="start"
      >
        MY
      </text>
      <rect
        x="54"
        y="24.5"
        width="42"
        height="0.9"
        rx="0.45"
        fill={onDark ? "rgba(255,255,255,0.2)" : "#cce7eb"}
      />
      <text
        x="54"
        y="42"
        fontFamily="'Sora', 'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="19"
        fontWeight="700"
        letterSpacing="0.02em"
        fill={onDark ? "#ffffff" : "#0a1628"}
        textAnchor="start"
      >
        SALAHKAR
      </text>
    </svg>
  );
}
