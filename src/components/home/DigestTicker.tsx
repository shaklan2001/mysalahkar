import Link from "next/link";
import { getTickerItems } from "@/lib/data/digest";

export function DigestTicker() {
  const items = getTickerItems();
  const loop = [...items, ...items];

  return (
    <div className="border-b border-border/70 bg-[#001450] text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Link
          href="/daily-digest"
          className="shrink-0 rounded bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
        >
          Daily Digest
        </Link>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="digest-marquee flex w-max gap-8 whitespace-nowrap text-xs sm:text-sm">
            {loop.map((item, i) => (
              <span key={`${item.id}-${i}`} className="inline-flex items-center gap-2">
                <span className="text-slate-400">{item.date}</span>
                <span className="font-medium text-slate-200">{item.source}</span>
                <span className={item.quiet ? "italic text-slate-400" : "text-white"}>
                  {item.quiet ? "No Updates for Day" : item.title}
                </span>
                <span className="text-slate-600" aria-hidden>
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
        <Link
          href="/daily-digest"
          className="hidden shrink-0 text-xs font-medium text-blue-200 hover:text-white sm:inline"
        >
          View all
        </Link>
      </div>
    </div>
  );
}
