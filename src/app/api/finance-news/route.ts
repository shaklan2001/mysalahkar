import { NextResponse } from "next/server";
import { getIndiaFinanceNews } from "@/lib/finance-news";
import { getMarketQuotes } from "@/lib/yahoo-finance";

export const dynamic = "force-dynamic";

/** Indian finance headlines (Yahoo Finance + Indian publishers) and Yahoo market quotes for the Daily Digest. */
export async function GET() {
  const [news, quotes] = await Promise.all([getIndiaFinanceNews(), getMarketQuotes()]);
  return NextResponse.json(
    { news, quotes, updatedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900" } },
  );
}
