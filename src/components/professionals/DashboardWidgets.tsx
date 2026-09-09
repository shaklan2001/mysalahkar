import { formatINR, cn } from "@/lib/utils";
import {
  mockDailySeries,
  mockLeads,
  mockMetrics,
  type DashboardMetrics,
} from "@/lib/data/professional";

function Delta({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "text-xs font-semibold",
        positive ? "text-blue-700" : "text-red-600"
      )}
    >
      {positive ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

export function MetricCards({ metrics }: { metrics: DashboardMetrics }) {
  const cards = [
    {
      label: "Consultations (30d)",
      value: metrics.consultations.toString(),
      delta: metrics.consultationsDelta,
    },
    {
      label: "Conversion rate",
      value: `${metrics.conversionRate}%`,
      delta: metrics.conversionDelta,
    },
    {
      label: "Your share",
      value: formatINR(metrics.yourShare),
      delta: metrics.shareDelta,
    },
    {
      label: "Human escalations",
      value: metrics.escalations.toString(),
      delta: null as number | null,
      sub: `${metrics.rating}★ · ${metrics.reviewCount} reviews`,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-border bg-white p-5"
        >
          <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {card.value}
            </p>
            {card.delta != null ? <Delta value={card.delta} /> : null}
          </div>
          {card.sub ? (
            <p className="mt-1 text-xs text-muted-foreground">{card.sub}</p>
          ) : (
            <p className="mt-1 text-xs text-muted-foreground">vs prior 30 days</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function PerformanceChart() {
  const max = Math.max(...mockDailySeries.map((d) => d.earnings));

  return (
    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Earnings trend
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your share from agent activity · last 3 weeks
          </p>
        </div>
        <p className="font-display text-sm font-semibold text-accent">
          Gross GMV {formatINR(mockMetrics.grossGmv)}
        </p>
      </div>
      <div className="mt-8 flex h-40 items-end gap-1.5 sm:gap-2">
        {mockDailySeries.map((point) => (
          <div key={point.date} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-sm bg-accent/80 transition-colors hover:bg-accent"
              style={{ height: `${(point.earnings / max) * 100}%`, minHeight: 4 }}
              title={`${point.date}: ${formatINR(point.earnings)}`}
            />
            <span className="hidden text-[10px] text-muted-foreground sm:block">
              {point.date.replace("Jul ", "")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentLeadsPreview() {
  const rows = mockLeads.slice(0, 5);

  return (
    <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold tracking-tight">
          Recent leads
        </h2>
        <a
          href="/professionals/dashboard/leads"
          className="text-sm font-medium text-accent hover:underline"
        >
          View all
        </a>
      </div>
      <ul className="mt-4 divide-y divide-border">
        {rows.map((lead) => (
          <li
            key={lead.id}
            className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {lead.client}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {lead.topic} · {lead.channel}
              </p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold",
                lead.status === "Open" && "bg-amber-50 text-amber-800",
                lead.status === "Converted" && "bg-blue-50 text-blue-800",
                lead.status === "Escalated" && "bg-sky-50 text-sky-800",
                lead.status === "Closed" && "bg-muted text-muted-foreground"
              )}
            >
              {lead.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
