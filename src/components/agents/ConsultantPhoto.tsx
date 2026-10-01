import Image from "next/image";
import { cn } from "@/lib/utils";

interface ConsultantPhotoProps {
  src: string;
  alt: string;
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
      {showAiBadge ? (
        <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-[#003cf8] px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-white ring-2 ring-white">
          AI
        </span>
      ) : null}
    </div>
  );
}
