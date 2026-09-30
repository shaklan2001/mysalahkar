import Link from "next/link";
import { ArrowRight, Banknote, Clock, IndianRupee } from "lucide-react";
import { mockEarnings, mockMetrics, mockProfessional, shareTiers } from "@/lib/data/professional";
import { Delta, PerformanceChart, StatusBadge } from "@/components/professionals/DashboardWidgets";
import { formatINR } from "@/lib/utils";

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });

export default function ProEarningsPage() {
  const pro = mockProfessional;
  const paid = mockEarnings.filter((e) => e.status === "Paid").reduce((s, e) => s + e.share, 0);
  const pending = mockEarnings.filter((e) => e.status !== "Paid").reduce((s, e) => s + e.share, 0);

  const summary = [
    { icon: IndianRupee, label: "Your share (30d)", value: formatINR(mockMetrics.yourShare), extra: <Delta value={mockMetrics.shareDelta} /> },
    { icon: Banknote, label: "Paid out", value: formatINR(paid), extra: null },
    { icon: Clock, label: "Pending / processing", value: formatINR(pending), extra: null },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Earnings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your share from AI consultations, services, escalations and referrals.
          </p>
        </div>
        <Link
          href="/professionals/dashboard/settings"
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-accent"
        >
          Payout account <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {summary.map(({ icon: Icon, label, value, extra }) => (
          <div key={label} className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/10 text-accent">
                <Icon className="h-4 w-4" />
              </span>
              {extra}
            </div>
            <p className="mt-4 text-xs font-medium text-muted-foreground">{label}</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <PerformanceChart />
        <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
          <h2 className="font-display text-base font-semibold tracking-tight text-foreground">Your share rates</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Active agreement · {Math.round(pro.shareRate * 100)}% on consultations
          </p>
          <ul className="mt-5 divide-y divide-border/70">
            {shareTiers.map((tier) => (
              <li key={tier.title} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{tier.title}</p>
                  <p className="font-display text-sm font-semibold text-accent">{tier.rate}</p>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tier.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border border-border bg-white">
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-4 sm:px-6">
          <h2 className="font-display text-base font-semibold tracking-tight text-foreground">Payout ledger</h2>
          <p className="text-xs text-muted-foreground">{mockEarnings.length} transactions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-border/70 bg-[#f8f9fc] text-xs tracking-wide text-muted-foreground uppercase">
              <tr>
                <th className="px-5 py-3 font-semibold sm:px-6">Date</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 text-right font-semibold">Gross</th>
                <th className="px-5 py-3 text-right font-semibold">Your share</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {mockEarnings.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-[#f8f9fc]">
                  <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground sm:px-6">
                    {dateFmt.format(new Date(`${row.date}T00:00:00+05:30`))}
                  </td>
                  <td className="px-5 py-3.5 text-ink-soft">{row.type}</td>
                  <td className="px-5 py-3.5 font-semibold text-foreground">{row.client}</td>
                  <td className="px-5 py-3.5 text-right text-ink-soft tabular-nums">{formatINR(row.gross)}</td>
                  <td className="px-5 py-3.5 text-right font-semibold text-foreground tabular-nums">{formatINR(row.share)}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
