export type DigestSource = "GST" | "Income Tax" | "ROC" | "SEBI" | "RBI" | "MCA";

export type DigestUpdate = {
  id: string;
  date: string; // YYYY-MM-DD
  source: DigestSource;
  title: string;
  summary: string;
  officialUrl: string;
  quiet?: boolean;
};

export type GlobalNewsItem = {
  id: string;
  title: string;
  source: string;
  region: string;
  url: string;
};

/** Mock AI-pulled compliance updates — one entry per day. Quiet days use quiet: true. */
export const digestUpdates: DigestUpdate[] = [
  {
    id: "d-2026-09-17",
    date: "2026-09-17",
    source: "GST",
    title: "GSTN advisory on GSTR-1 vs GSTR-3B mismatch for Sep 2026",
    summary:
      "GSTN flagged auto-notices for suppliers with >₹50k cumulative mismatch. Reconcile ITC before Oct filing window.",
    officialUrl: "https://www.gst.gov.in/",
  },
  {
    id: "d-2026-09-16",
    date: "2026-09-16",
    source: "MCA",
    title: "No Updates for Day",
    summary: "No material MCA / ROC circulars published today.",
    officialUrl: "https://www.mca.gov.in/",
    quiet: true,
  },
  {
    id: "d-2026-09-15",
    date: "2026-09-15",
    source: "SEBI",
    title: "SEBI LODR clarification on related-party disclosure timelines",
    summary:
      "Listed entities reminded of shortened quarterly results window (40 days) under amended LODR.",
    officialUrl: "https://www.sebi.gov.in/",
  },
  {
    id: "d-2026-09-14",
    date: "2026-09-14",
    source: "Income Tax",
    title: "CBDT extends Form 15CA/CB e-filing helpdesk hours",
    summary:
      "Helpdesk extended through Sep 30 for remittance filings ahead of festival season peaks.",
    officialUrl: "https://www.incometax.gov.in/",
  },
  {
    id: "d-2026-09-13",
    date: "2026-09-13",
    source: "RBI",
    title: "RBI circular on LRS end-use verification by AD banks",
    summary:
      "AD banks must seek investment confirmation within 180 days for purpose code S0001 remittances.",
    officialUrl: "https://www.rbi.org.in/",
  },
  {
    id: "d-2026-09-12",
    date: "2026-09-12",
    source: "ROC",
    title: "MCA V3 portal maintenance window for DIR-3 KYC filings",
    summary:
      "DIR-3 KYC submissions paused 10pm–2am IST Sep 12. File early to avoid late fees.",
    officialUrl: "https://www.mca.gov.in/",
  },
  {
    id: "d-2026-09-11",
    date: "2026-09-11",
    source: "GST",
    title: "No Updates for Day",
    summary: "No new GST Council or GSTN compliance updates published.",
    officialUrl: "https://www.gst.gov.in/",
    quiet: true,
  },
];

export const globalNewsTop5: GlobalNewsItem[] = [
  {
    id: "g1",
    title: "OECD updates Pillar Two administrative guidance for MNEs",
    source: "OECD",
    region: "Global",
    url: "https://www.oecd.org/",
  },
  {
    id: "g2",
    title: "US Fed signals cautious path on rate cuts amid inflation data",
    source: "Federal Reserve",
    region: "US",
    url: "https://www.federalreserve.gov/",
  },
  {
    id: "g3",
    title: "EU CSRD reporting: first-wave companies face assurance deadlines",
    source: "European Commission",
    region: "EU",
    url: "https://commission.europa.eu/",
  },
  {
    id: "g4",
    title: "IMF flags elevated sovereign debt risks in emerging markets",
    source: "IMF",
    region: "Global",
    url: "https://www.imf.org/",
  },
  {
    id: "g5",
    title: "Singapore MAS updates guidelines on digital asset custody",
    source: "MAS",
    region: "Asia",
    url: "https://www.mas.gov.sg/",
  },
];

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

export function getDigestForDate(date = todayKey()): DigestUpdate {
  const found = digestUpdates.find((u) => u.date === date);
  if (found) return found;
  return {
    id: `quiet-${date}`,
    date,
    source: "MCA",
    title: "No Updates for Day",
    summary: "No material compliance updates from GST, Income Tax, ROC, SEBI, or RBI today.",
    officialUrl: "https://www.mca.gov.in/",
    quiet: true,
  };
}

/** Items for the homepage ticker — newest first, include quiet-day label. */
export function getTickerItems(): DigestUpdate[] {
  return [...digestUpdates].sort((a, b) => b.date.localeCompare(a.date));
}
