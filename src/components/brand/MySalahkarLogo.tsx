import Image from "next/image";

interface MySalahkarLogoProps {
  height?: number;
  variant?: "default" | "white";
  className?: string;
  /** Icon mark only (square). */
  markOnly?: boolean;
  /** Include CONNECT · CONSULT · GROW tagline. Default uses compact wordmark for nav. */
  withTagline?: boolean;
}

export function MySalahkarLogo({
  height = 40,
  variant = "default",
  className,
  markOnly = false,
  withTagline = false,
}: MySalahkarLogoProps) {
  const onDark = variant === "white";

  let src: string;
  if (markOnly) {
    src = onDark
      ? "/brand/mysalahkar-mark-on-dark.png"
      : "/brand/mysalahkar-mark.png";
  } else if (withTagline) {
    src = onDark
      ? "/brand/mysalahkar-logo-on-dark.png"
      : "/brand/mysalahkar-logo.png";
  } else {
    src = onDark
      ? "/brand/mysalahkar-logo-compact-on-dark.png"
      : "/brand/mysalahkar-logo-compact.png";
  }

  return (
    <Image
      src={src}
      alt="mysalahkar — Connect · Consult · Grow"
      height={height}
      width={Math.round(height * 1.6)}
      className={className}
      style={{ display: "block", height, width: "auto" }}
      priority
    />
  );
}
