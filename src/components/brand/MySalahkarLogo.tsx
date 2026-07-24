interface MySalahkarLogoProps {
  height?: number;
  variant?: "default" | "white";
  className?: string;
}

export function MySalahkarLogo({
  height = 44,
  variant = "default",
  className,
}: MySalahkarLogoProps) {
  const suffix = variant === "white" ? "w" : "d";
  const grad1 = `salahkar-g1-${suffix}`;
  const grad2 = `salahkar-g2-${suffix}`;
  const shadow = `salahkar-s-${suffix}`;
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
        <linearGradient id={grad1} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="#4f46e5"
            floodOpacity="0.28"
          />
        </filter>
        <linearGradient id={grad2} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <circle
        cx="24"
        cy="24"
        r="22.5"
        fill="none"
        stroke={`url(#${grad2})`}
        strokeWidth="1"
        opacity={onDark ? "0.4" : "1"}
      />
      <circle
        cx="24"
        cy="24"
        r="20"
        fill={`url(#${grad1})`}
        filter={onDark ? undefined : `url(#${shadow})`}
      />
      <path
        d="M24,11 L27.7,18.3 L35,22 L27.7,25.7 L24,33 L20.3,25.7 L13,22 L20.3,18.3 Z"
        fill="white"
        opacity="0.97"
      />
      <circle cx="24" cy="22" r="2.2" fill={`url(#${grad1})`} />
      <text
        x="54"
        y="21"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="11"
        fontWeight="500"
        letterSpacing="0.18em"
        fill={onDark ? "rgba(255,255,255,0.62)" : "#0ea5e9"}
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
        fill={onDark ? "rgba(255,255,255,0.18)" : "#e0f2fe"}
      />
      <text
        x="54"
        y="42"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="20"
        fontWeight="800"
        letterSpacing="0.03em"
        fill={onDark ? "#ffffff" : "#1e1b4b"}
        textAnchor="start"
      >
        SALAHKAR
      </text>
    </svg>
  );
}
