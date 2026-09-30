import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Inbox,
  IndianRupee,
  MessageCircle,
  Phone,
  Smartphone,
  TrendingUp,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { formatINR, cn } from "@/lib/utils";
import {
  mockDailySeries,
  mockLeads,
  mockMetrics,
  type DashboardMetrics,
  type EarningRow,
  type LeadRow,
} from "@/lib/data/professional";

export function Delta({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
        positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
      )}
    >
      {positive ? (
        <ArrowUpRight className="h-3 w-3" />
      ) : (
        <ArrowDownRight className="h-3 w-3" />
      )}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

export function MetricCards({ metrics }: { metrics: DashboardMetrics }) {
  const cards: {
    label: string;
    value: string;
    delta: number | null;
    sub: string;
    icon: LucideIcon;
  }[] = [
    {
      label: "Consultations",
      value: metrics.consultations.toString(),
      delta: metrics.consultationsDelta,
      sub: "Last 30 days",
      icon: MessageCircle,
    },
    {
      label: "Conversion rate",
      value: `${metrics.conversionRate}%`,
      delta: metrics.conversionDelta,
      sub: "Chats that became paid work",
      icon: TrendingUp,
    },
    {
      label: "Your share",
      value: formatINR(metrics.yourShare),
      delta: metrics.shareDelta,
      sub: "Last 30 days",
      icon: IndianRupee,
    },
    {
      label: "Human escalations",
      value: metrics.escalations.toString(),
      delta: null,
      sub: `${metrics.rating}★ from ${metrics.reviewCount} reviews`,
      icon: UserRound,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {cards.map(({ label, value, delta, sub, icon: Icon }) => (
        <div
          key={label}
          className="rounded-2xl border border-border bg-white p-4 sm:p-5"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10 text-accent">
              <Icon className="h-4 w-4" />
            </span>
            {delta != null ? <Delta value={delta} /> : null}
          </div>
          <p className="mt-4 text-xs font-medium text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{sub}</p>
        </div>
      ))}
    </div>
  );
}

export function PerformanceChart({ className }: { className?: string }) {
  const max = Math.max(...mockDailySeries.map((d) => d.earnings));
  const total = mockDailySeries.reduce((sum, d) => sum + d.earnings, 0);

  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-white p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-base font-semibold tracking-tight text-foreground">
            Earnings trend
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Your share, last 3 weeks
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-xl font-semibold tracking-tight text-foreground">
            {formatINR(total)}
          </p>
          <p className="text-xs text-muted-foreground">
            Gross GMV {formatINR(mockMetrics.grossGmv)} (30d)
          </p>
        </div>
      </div>
      <div className="mt-8 flex h-44 items-end gap-1.5 sm:gap-2">
        {mockDailySeries.map((point, index) => {
          const latest = index === mockDailySeries.length - 1;
          return (
            <div
              key={point.date}
              className="group flex flex-1 flex-col items-center gap-2"
            >
              <div className="relative flex w-full flex-1 items-end">
                <div
                  className={cn(
                    "w-full rounded-t-md transition-colors",
                    latest
                      ? "bg-accent"
                      : "bg-accent/25 group-hover:bg-accent/60",
                  )}
                  style={{
                    height: `${(point.earnings / max) * 100}%`,
                    minHeight: 4,
                  }}
                  title={`${point.date}: ${formatINR(point.earnings)}`}
                />
              </div>
              <span className="hidden text-[10px] text-muted-foreground sm:block">
                {point.date.split(" ")[1]}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const channelIcon: Record<LeadRow["channel"], LucideIcon> = {
  WhatsApp: Smartphone,
  Chat: MessageCircle,
  Call: Phone,
};

const leadTone: Record<LeadRow["status"], string> = {
  Open: "bg-amber-50 text-amber-800 ring-amber-600/20",
  Converted: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Escalated: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Closed: "bg-muted text-muted-foreground ring-border",
};

const payoutTone: Record<EarningRow["status"], string> = {
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Pending: "bg-amber-50 text-amber-800 ring-amber-600/20",
  Processing: "bg-blue-50 text-blue-700 ring-blue-600/20",
};

export function StatusBadge({
  status,
}: {
  status: LeadRow["status"] | EarningRow["status"];
}) {
  const tone =
    (leadTone as Record<string, string>)[status] ??
    (payoutTone as Record<string, string>)[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset",
        tone,
      )}
    >
      {status}
    </span>
  );
}

const leadTime = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

export function formatLeadTime(iso: string) {
  return leadTime.format(new Date(`${iso}+05:30`));
}

export function RecentLeadsPreview({ className }: { className?: string }) {
  const rows = [...mockLeads]
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 5);

  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-white p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold tracking-tight text-foreground">
          <Inbox className="h-4 w-4 text-accent" /> Recent leads
        </h2>
        <Link
          href="/professionals/dashboard/leads"
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-accent"
        >
          All leads <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <ul className="mt-4 divide-y divide-border/70">
        {rows.map((lead) => {
          const Icon = channelIcon[lead.channel];
          return (
            <li
              key={lead.id}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f8f9fc] text-muted-foreground ring-1 ring-border">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {lead.client}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {lead.topic}
                </p>
              </div>
              <StatusBadge status={lead.status} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
