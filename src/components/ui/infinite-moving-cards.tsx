"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

// Adapted from Aceternity UI "Infinite Moving Cards" — brand-styled, with avatar + rating.
export type MovingCardItem = {
  quote: string;
  name: string;
  title: string;
  image?: string;
  rating?: number;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: MovingCardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller || scroller.dataset.duplicated) return;

    Array.from(scroller.children).forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      scroller.appendChild(clone);
    });
    scroller.dataset.duplicated = "true";

    container.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse",
    );
    container.style.setProperty(
      "--animation-duration",
      speed === "fast" ? "30s" : speed === "normal" ? "50s" : "90s",
    );
    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="relative flex w-[320px] max-w-full shrink-0 flex-col rounded-2xl border border-border bg-white px-7 py-6 shadow-[0_1px_2px_rgba(0,20,80,0.04)] md:w-[420px]"
          >
            {item.rating ? (
              <div className="flex gap-0.5 text-[#f5a524]" aria-label={`${item.rating} out of 5`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
            ) : null}
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
              “{item.quote}”
            </blockquote>
            <div className="mt-5 flex items-center gap-3 border-t border-border/70 pt-4">
              {item.image ? (
                <span className="relative h-9 w-9 overflow-hidden rounded-full bg-muted">
                  <Image src={item.image} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ) : null}
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.title}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
