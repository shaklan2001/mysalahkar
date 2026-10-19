import type { FinanceNewsItem, FinanceNewsTopic } from "@/lib/data/digest";
import { decodeEntities, getYahooIndiaStories } from "@/lib/yahoo-finance";

/**
 * India-only finance headlines for the Daily Digest, merged from two free sources:
 *  - Yahoo Finance: crawled news tabs of Indian tickers (see lib/yahoo-finance.ts)
 *  - Official RSS feeds of Indian business publishers (Yahoo's own Indian coverage is thin,
 *    often only a handful of stories a week)
 *
 * Only headline, short summary and link are shown; every item links to the original publisher.
 * Results are cached in memory for 15 minutes and the last good set is served if every source fails.
 */

const CACHE_MS = 15 * 60 * 1000;
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const PER_FEED = 6;
const MAX_NEWS = 40;

/** `indiaOnly`: the section itself is India-specific, so items skip the India keyword check. */
const PUBLISHER_FEEDS: { source: string; url: string; indiaOnly?: boolean }[] = [
  { source: "Economic Times", url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms" },
  { source: "Economic Times", url: "https://economictimes.indiatimes.com/news/economy/rssfeeds/1373380680.cms" },
  { source: "Economic Times", url: "https://economictimes.indiatimes.com/wealth/tax/rssfeeds/47119912.cms", indiaOnly: true },
  { source: "Business Standard", url: "https://www.business-standard.com/rss/markets-106.rss" },
  { source: "Business Standard", url: "https://www.business-standard.com/rss/economy-102.rss" },
  { source: "Mint", url: "https://www.livemint.com/rss/markets" },
  { source: "Mint", url: "https://www.livemint.com/rss/economy" },
  { source: "BusinessLine", url: "https://www.thehindubusinessline.com/markets/feeder/default.rss" },
];

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Accept: "application/rss+xml, application/xml, text/xml, */*",
};

/**
 * An item must show Indian context to be listed: the digest is India-only, and publishers'
 * market feeds also carry Wall Street, China, Korea etc. stories.
 */
const INDIA_RE =
  /\b(india|indian|indias|rupee|sensex|nifty|rbi|reserve bank of india|sebi|gst|tds|cbdt|itr|epfo|nps|upi|npci|mumbai|delhi|dalal street|bse|nse|crore|lakh|sitharaman|fm|modi|centre|union budget|msmes?|psu|state-run|adani|reliance|jio|tata|infosys|wipro|hdfc|icici|sbi|bajaj|mahindra|lic|kotak|axis bank|upper circuit|lower circuit|fy2\d|fii|fpi|dii|mutual funds?|sip|ipo gmp|grey market)\b|₹|\brs\.?\s?\d/i;

/** Foreign-market sections of Indian publishers (ET's US stocks / Wall Street guide, BS world news). */
const FOREIGN_URL_RE = /\/(us-stocks|world-news|international|world)\/|wall-street/i;

const TOPICS: [FinanceNewsTopic, RegExp][] = [
  ["Tax", /\b(tax|taxes|taxpayers?|gst|tds|itr|cbdt|income-tax)\b/i],
  ["RBI & Policy", /\b(rbi|reserve bank|repo rate|monetary policy|sebi|budget|finance minister|sitharaman|regulator|policy)\b/i],
  ["Earnings", /\b(q[1-4]|quarter|earnings|net profit|profit|results|revenue|dividend)\b/i],
  ["Rupee & FX", /\b(rupee|forex|currency|usd\/inr)\b/i],
  ["Banking", /\b(bank|banks|lender|loan|nbfc|credit|deposit)\b/i],
];

/** Classify by headline first; the summary often mentions incidental terms ("profit after tax"). */
function topicFor(title: string, summary = ""): FinanceNewsTopic {
  const match = (text: string) => TOPICS.find(([, re]) => re.test(text))?.[0];
  return match(title) ?? match(summary) ?? "Markets";
}

function tag(block: string, name: string) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decodeEntities(m[1]) : "";
}

function plainText(html: string, max = 280) {
  const text = decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function httpUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}

async function fetchPublisherFeed(feed: (typeof PUBLISHER_FEEDS)[number]): Promise<FinanceNewsItem[]> {
  const res = await fetch(feed.url, { headers: HEADERS, cache: "no-store", signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`${feed.url}: HTTP ${res.status}`);
  const xml = await res.text();

  const items: FinanceNewsItem[] = [];
  for (const block of xml.match(/<item>[\s\S]*?<\/item>/g) ?? []) {
    const title = plainText(tag(block, "title"), 300);
    const url = httpUrl(tag(block, "link"));
    const published = new Date(tag(block, "pubDate"));
    if (!title || !url || Number.isNaN(published.getTime())) continue;
    const summary = plainText(tag(block, "description"));
    if (FOREIGN_URL_RE.test(url)) continue;
    if (!feed.indiaOnly && !INDIA_RE.test(`${title} ${summary}`)) continue;
    items.push({
      id: url,
      title,
      summary,
      url,
      source: feed.source,
      publishedAt: published.toISOString(),
      topic: topicFor(title, summary),
    });
    if (items.length >= PER_FEED) break;
  }
  return items;
}

async function fetchYahoo(): Promise<FinanceNewsItem[]> {
  const stories = await getYahooIndiaStories();
  return stories
    .filter((s) => INDIA_RE.test(s.title))
    .map((s) => ({
      id: s.id,
      title: s.title,
      summary: "",
      url: s.url,
      source: `${s.publisher} via Yahoo Finance`,
      publishedAt: s.publishedAt,
      topic: topicFor(s.title),
    }));
}

const STOPWORDS = new Set(
  "after amid also from have here into more over says shares share stock stocks than that their this today what when with india indias indian market markets".split(" "),
);

function titleWords(title: string) {
  return new Set((title.toLowerCase().match(/[a-z0-9]{4,}/g) ?? []).filter((w) => !STOPWORDS.has(w)));
}

/** Same story from two publishers ("Union Bank shares jump 5% as Q2 PAT rises 30%" / "Union Bank of India posts 30% jump in Q2 profit"). */
function sameStory(a: Set<string>, b: Set<string>) {
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  return shared >= 3 && shared / Math.min(a.size, b.size) >= 0.5;
}

async function load(): Promise<FinanceNewsItem[]> {
  const results = await Promise.allSettled([fetchYahoo(), ...PUBLISHER_FEEDS.map(fetchPublisherFeed)]);
  const now = Date.now();
  const candidates: FinanceNewsItem[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") candidates.push(...r.value);
    else console.warn("[finance-news]", String(r.reason));
  }

  // Newest first, so the first copy of a story we keep is the latest one.
  candidates.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const kept: { item: FinanceNewsItem; words: Set<string> }[] = [];
  for (const item of candidates) {
    if (now - Date.parse(item.publishedAt) > MAX_AGE_MS) continue;
    const words = titleWords(item.title);
    if (kept.some((k) => k.item.id === item.id || sameStory(k.words, words))) continue;
    kept.push({ item, words });
    if (kept.length >= MAX_NEWS) break;
  }
  return kept.map((k) => k.item);
}

let cache: { at: number; items: FinanceNewsItem[] } = { at: 0, items: [] };
let inflight: Promise<FinanceNewsItem[]> | null = null;

export async function getIndiaFinanceNews(): Promise<FinanceNewsItem[]> {
  if (Date.now() - cache.at < CACHE_MS) return cache.items;
  inflight ??= load()
    .then((items) => {
      // Keep serving the previous set if every source failed this round.
      if (items.length) cache = { at: Date.now(), items };
      return cache.items;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}
