import https from "node:https";
import type { MarketQuote } from "@/lib/data/digest";

/**
 * Yahoo Finance integration (no API key):
 *  - Quotes via the public chart endpoint: query1.finance.yahoo.com/v8/finance/chart
 *  - News by crawling the server-rendered "News" tab of Indian tickers
 *    (finance.yahoo.com/quote/<symbol>/news/). Yahoo's RSS and search APIs answer HTTP 429 to
 *    server-side clients, but these pages are served normally.
 *
 * Callers cache results; see lib/finance-news.ts and app/api/finance-news.
 */

const QUOTES_REVALIDATE_S = 5 * 60;

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Accept: "application/json, text/html, */*",
  "Accept-Language": "en-IN,en;q=0.9",
};

/** Ticker news pages with the most regular Indian coverage on Yahoo. */
const NEWS_SYMBOLS = ["^NSEI", "^BSESN", "INR=X", "HDB", "IBN", "INFY", "WIPRO.NS"];

const QUOTE_SYMBOLS: { id: string; symbol: string; label: string; format: (n: number) => string }[] = [
  { id: "nifty", symbol: "^NSEI", label: "NIFTY 50", format: (n) => inr(n, 2) },
  { id: "sensex", symbol: "^BSESN", label: "SENSEX", format: (n) => inr(n, 2) },
  { id: "banknifty", symbol: "^NSEBANK", label: "BANK NIFTY", format: (n) => inr(n, 2) },
  { id: "usdinr", symbol: "INR=X", label: "USD / INR", format: (n) => n.toFixed(2) },
  { id: "gold", symbol: "GC=F", label: "Gold (USD/oz)", format: (n) => `$${inr(n, 0)}` },
  { id: "brent", symbol: "BZ=F", label: "Brent crude", format: (n) => `$${n.toFixed(2)}` },
];

function inr(n: number, digits: number) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function decodeEntities(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

/**
 * GET a page with Node's https client. Yahoo's response headers exceed the 16 KB limit of
 * Node's built-in fetch (UND_ERR_HEADERS_OVERFLOW), so the header limit is raised here.
 */
function getPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: HEADERS, maxHeaderSize: 128 * 1024, timeout: 10_000 }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`Yahoo ${url}: HTTP ${res.statusCode}`));
        return;
      }
      res.setEncoding("utf8");
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve(body));
    });
    req.on("timeout", () => req.destroy(new Error(`Yahoo ${url}: timeout`)));
    req.on("error", reject);
  });
}

const AGO_UNITS_MS: Record<string, number> = {
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
  w: 7 * 86_400_000,
  mo: 30 * 86_400_000,
  y: 365 * 86_400_000,
};

/** Yahoo only prints relative ages ("3h ago", "12d ago", "1mo ago"); turn them into timestamps. */
function fromAgo(text: string, now: number): Date | null {
  if (/just now|\bnow\b/i.test(text)) return new Date(now);
  if (/yesterday/i.test(text)) return new Date(now - AGO_UNITS_MS.d);
  const m = text.match(/(\d+)\s*(mo|m|h|d|w|y)\w*\s+ago/i);
  return m ? new Date(now - Number(m[1]) * AGO_UNITS_MS[m[2].toLowerCase()]) : null;
}

export type YahooStory = { id: string; title: string; url: string; publisher: string; publishedAt: string };

async function crawlNewsPage(symbol: string): Promise<YahooStory[]> {
  const html = await getPage(`https://finance.yahoo.com/quote/${encodeURIComponent(symbol)}/news/`);
  const now = Date.now();
  const stories: YahooStory[] = [];

  for (const block of html.match(/data-testid="storyitem"[\s\S]*?<\/section>/g) ?? []) {
    const href = block.match(/class="[^"]*\btitles\b[^"]*"[^>]*?href="([^"]+)"/)?.[1];
    const title = decodeEntities(block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1]?.replace(/<[^>]+>/g, "") ?? "");
    const publishing = block.match(/<div class="publishing[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "";
    const published = fromAgo(publishing.replace(/<[^>]+>/g, " "), now);
    if (!href || !title || !published) continue;

    let url: string;
    try {
      url = new URL(decodeEntities(href), "https://finance.yahoo.com").toString();
    } catch {
      continue;
    }
    const partner = block.match(/yContentPartner&quot;:&quot;([^&]+)&quot;/)?.[1];
    stories.push({
      id: block.match(/;g:([0-9a-f-]{36})/)?.[1] ?? url,
      title,
      url,
      publisher: partner ? decodeEntities(partner) : decodeEntities(publishing.split(/<i|•/)[0]),
      publishedAt: published.toISOString(),
    });
  }
  return stories;
}

/** Latest stories from the Yahoo Finance news tabs of Indian indices, the rupee and large Indian tickers. */
export async function getYahooIndiaStories(): Promise<YahooStory[]> {
  const pages = await Promise.allSettled(NEWS_SYMBOLS.map(crawlNewsPage));
  for (const p of pages) if (p.status === "rejected") console.warn("[finance-news]", String(p.reason));
  return pages.flatMap((p) => (p.status === "fulfilled" ? p.value : []));
}

/** Last good quote per symbol, so one throttled symbol doesn't drop out of the strip. */
const lastQuotes = new Map<string, MarketQuote>();

async function fetchQuote(spec: (typeof QUOTE_SYMBOLS)[number]): Promise<MarketQuote> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(spec.symbol)}?interval=1d&range=5d`;
  const res = await fetch(url, {
    headers: HEADERS,
    next: { revalidate: QUOTES_REVALIDATE_S },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Yahoo chart ${spec.symbol}: HTTP ${res.status}`);
  const result = (await res.json())?.chart?.result?.[0];
  const meta = result?.meta;
  const price = meta?.regularMarketPrice;
  if (typeof price !== "number") throw new Error(`Yahoo chart ${spec.symbol}: missing price`);

  // chartPreviousClose is the close *before the 5-day range*, not yesterday's, so don't use it.
  let change: unknown = meta?.regularMarketChangePercent;
  if (typeof change !== "number") {
    const closes = ((result?.indicators?.quote?.[0]?.close ?? []) as (number | null)[]).filter(
      (c): c is number => typeof c === "number",
    );
    // The last bar is today's in-progress candle, so yesterday's close is the one before it.
    const prev = closes.length >= 2 ? closes[closes.length - 2] : undefined;
    if (!prev) throw new Error(`Yahoo chart ${spec.symbol}: missing previous close`);
    change = ((price - prev) / prev) * 100;
  }
  return { id: spec.id, label: spec.label, value: spec.format(price), change: change as number };
}

export async function getMarketQuotes(): Promise<MarketQuote[]> {
  const results = await Promise.allSettled(QUOTE_SYMBOLS.map(fetchQuote));
  return QUOTE_SYMBOLS.flatMap((spec, i) => {
    const r = results[i];
    if (r.status === "fulfilled") lastQuotes.set(spec.id, r.value);
    const quote = lastQuotes.get(spec.id);
    return quote ? [quote] : [];
  });
}
