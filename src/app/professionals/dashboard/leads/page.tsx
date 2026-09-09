import { mockLeads } from "@/lib/data/professional";
import { cn, formatINR } from "@/lib/utils";

export default function ProLeadsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Leads & consultations
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Conversations your AI consultant handled — escalate or follow up when needed.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Client</th>
                <th className="px-4 py-3 font-semibold">Topic</th>
                <th className="px-4 py-3 font-semibold">Channel</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Value</th>
                <th className="px-4 py-3 font-semibold">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {lead.client}
                  </td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-muted-foreground">
                    {lead.topic}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{lead.channel}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-[11px] font-semibold",
                        lead.status === "Open" && "bg-amber-50 text-amber-800",
                        lead.status === "Converted" && "bg-teal-50 text-teal-800",
                        lead.status === "Escalated" && "bg-sky-50 text-sky-800",
                        lead.status === "Closed" && "bg-muted text-muted-foreground"
                      )}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {lead.value ? formatINR(lead.value) : "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(lead.at).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
