import Image from "next/image";
import { cn } from "@/lib/utils";

interface MySalahkarLogoProps {
  height?: number;
  variant?: "default" | "white";
  className?: string;
  /** Icon mark only (square). */
  markOnly?: boolean;
  /** Include CONNECT · CONSULT · GROW tagline (stacked full logo). */
  withTagline?: boolean;
}

const ASSETS = {
  nav: {
    default: "/brand/mysalahkar-logo-nav.png",
    white: "/brand/mysalahkar-logo-nav-on-dark.png",
    aspect: 586 / 160,
  },
  tagline: {
    default: "/brand/mysalahkar-logo.png",
    white: "/brand/mysalahkar-logo-on-dark.png",
    aspect: 964 / 768,
  },
  mark: {
    default: "/brand/mysalahkar-mark.png",
    white: "/brand/mysalahkar-mark-on-dark.png",
    aspect: 1,
  },
} as const;

export function MySalahkarLogo({
  height = 40,
  variant = "default",
  className,
  markOnly = false,
  withTagline = false,
}: MySalahkarLogoProps) {
  const onDark = variant === "white";
  const kind = markOnly ? "mark" : withTagline ? "tagline" : "nav";
  const asset = ASSETS[kind];
  const src = onDark ? asset.white : asset.default;
  const width = Math.round(height * asset.aspect);

  return (
    <span
      className={cn("inline-flex items-center overflow-visible", className)}
      style={{ height, width }}
    >
      <Image
        src={src}
        alt="mysalahkar — Connect · Consult · Grow"
        width={width}
        height={height}
        className="h-full w-full object-contain object-left"
        priority
      />
    </span>
  );
}
