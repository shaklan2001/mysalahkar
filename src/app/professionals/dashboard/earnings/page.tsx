import {
  mockEarnings,
  mockMetrics,
  mockProfessional,
  shareTiers,
} from "@/lib/data/professional";
import { cn, formatINR } from "@/lib/utils";

export default function ProEarningsPage() {
  const pro = mockProfessional;
  const paid = mockEarnings
    .filter((e) => e.status === "Paid")
    .reduce((s, e) => s + e.share, 0);
  const pending = mockEarnings
    .filter((e) => e.status !== "Paid")
    .reduce((s, e) => s + e.share, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Earnings & share
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your revenue share from agent consultations, services, and escalations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-xs text-muted-foreground">Your share (30d)</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-accent">
            {formatINR(mockMetrics.yourShare)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-xs text-muted-foreground">Paid out</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
            {formatINR(paid)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-xs text-muted-foreground">Pending / processing</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
            {formatINR(pending)}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold tracking-tight">
          Your share rates
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Active agreement · consultation share{" "}
          {Math.round(pro.shareRate * 100)}%
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {shareTiers.map((tier) => (
            <div
              key={tier.title}
              className="rounded-lg border border-border/80 px-4 py-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-semibold">{tier.title}</p>
                <p className="font-display text-sm font-semibold text-accent">
                  {tier.rate}
                </p>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {tier.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-white">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Payout ledger
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Client</th>
                <th className="px-4 py-3 font-semibold text-right">Gross</th>
                <th className="px-4 py-3 font-semibold text-right">Your share</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockEarnings.map((row) => (
                <tr key={row.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(row.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">{row.type}</td>
                  <td className="px-4 py-3 font-medium">{row.client}</td>
                  <td className="px-4 py-3 text-right">{formatINR(row.gross)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-accent">
                    {formatINR(row.share)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-[11px] font-semibold",
                        row.status === "Paid" && "bg-blue-50 text-blue-800",
                        row.status === "Pending" && "bg-amber-50 text-amber-800",
                        row.status === "Processing" && "bg-sky-50 text-sky-800"
                      )}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
