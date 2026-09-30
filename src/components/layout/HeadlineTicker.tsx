import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTickerItems, globalNewsTop5 } from "@/lib/data/digest";

type Headline = { id: string; tag: string; title: string };

const headlines: Headline[] = [
  ...getTickerItems()
    .filter((item) => !item.quiet)
    .map((item) => ({ id: item.id, tag: item.source, title: item.title })),
  ...globalNewsTop5.map((item) => ({ id: item.id, tag: item.region, title: item.title })),
];

/** Running headline strip shown under the sticky navbar once the page scrolls. */
export function HeadlineTicker() {
  // Rendered twice so the -50% marquee loop is seamless.
  const loop = [...headlines, ...headlines];

  return (
    <div className="flex h-9 items-center border-b border-border/70 bg-[#001450] text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/daily-digest"
          className="relative z-10 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Live digest
        </Link>

        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_4%,#000_96%,transparent)]">
          <ul className="digest-marquee flex w-max items-center gap-8 whitespace-nowrap hover:[animation-play-state:paused]">
            {loop.map((item, index) => (
              <li key={`${item.id}-${index}`} aria-hidden={index >= headlines.length || undefined}>
                <Link
                  href="/daily-digest"
                  tabIndex={index >= headlines.length ? -1 : undefined}
                  className="inline-flex items-center gap-2 text-xs text-slate-200 transition-colors hover:text-white"
                >
                  <span className="font-semibold text-blue-300">{item.tag}</span>
                  {item.title}
                  <span className="text-slate-600" aria-hidden>
                    •
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/daily-digest"
          className="hidden shrink-0 items-center gap-1 text-[11px] font-semibold text-blue-200 hover:text-white sm:inline-flex"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
