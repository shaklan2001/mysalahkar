import Image from "next/image";
import { cn } from "@/lib/utils";

interface ConsultantPhotoProps {
  src: string;
  alt: string;
  /** AI Salahkar context: show an AI avatar instead of the person's photograph. */
  showAiBadge?: boolean;
  className?: string;
  sizes?: string;
  rounded?: "full" | "xl" | "2xl";
}

const roundedClass = {
  full: "rounded-full",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
} as const;

/** Brand gradients; each AI Salahkar gets a stable one so they're easy to tell apart. */
const AI_GRADIENTS = [
  "from-[#003cf8] via-[#2a5bff] to-[#001450]",
  "from-[#5b3df5] via-[#3b5bdb] to-[#001450]",
  "from-[#0e7490] via-[#1d4ed8] to-[#001450]",
];

function gradientFor(key: string) {
  let hash = 0;
  for (const ch of key) hash = (hash * 7 + ch.charCodeAt(0)) >>> 0;
  return AI_GRADIENTS[hash % AI_GRADIENTS.length];
}

/** An AI agent avatar: a glowing orb with a spark, never a person's photo. */
function AiAvatar({ seed, rounded }: { seed: string; rounded: keyof typeof roundedClass }) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-gradient-to-br",
        gradientFor(seed),
        roundedClass[rounded],
      )}
      aria-hidden
    >
      {/* Soft highlight for depth */}
      <span className="absolute -top-1/4 -left-1/4 h-3/4 w-3/4 rounded-full bg-white/25 blur-md" />
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 m-auto h-[62%] w-[62%]"
        fill="none"
      >
        <circle cx="24" cy="24" r="17" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="11" stroke="white" strokeOpacity="0.55" strokeWidth="1.5" />
        <path
          d="M24 12c.9 6.3 5.7 11.1 12 12-6.3.9-11.1 5.7-12 12-.9-6.3-5.7-11.1-12-12 6.3-.9 11.1-5.7 12-12Z"
          fill="white"
        />
        <circle cx="35.5" cy="12.5" r="2" fill="white" fillOpacity="0.85" />
      </svg>
    </div>
  );
}

export function ConsultantPhoto({
  src,
  alt,
  showAiBadge = false,
  className,
  sizes = "96px",
  rounded = "full",
}: Readonly<ConsultantPhotoProps>) {
  return (
    <div className={cn("relative shrink-0", className)}>
      {showAiBadge ? (
        <AiAvatar seed={src} rounded={rounded} />
      ) : (
        <div
          className={cn(
            "relative h-full w-full overflow-hidden bg-muted",
            roundedClass[rounded],
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes={sizes}
          />
        </div>
      )}
      {showAiBadge ? (
        <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-[#003cf8] px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-white ring-2 ring-white">
          AI
        </span>
      ) : null}
    </div>
  );
}
