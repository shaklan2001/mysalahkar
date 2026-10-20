"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { api, errorMessage } from "@/lib/api";
import { type LeadRow } from "@/lib/data/professional";
import { toast } from "sonner";
import {
  channelIcon,
  formatLeadTime,
} from "@/components/professionals/DashboardWidgets";
import { cn, formatINR } from "@/lib/utils";

const FILTERS: ("All" | LeadRow["status"])[] = [
  "All",
  "Open",
  "Escalated",
  "Converted",
  "Closed",
];

type LeadItem = {
  id: string;
  status: LeadRow["status"];
  name: string;
  topic: string;
  source: string;
  createdAt: string;
};

function toLead(item: LeadItem): LeadRow {
  return {
    id: item.id,
    client: item.name,
    channel: item.source === "call" ? "Call" : "Chat",
    topic: item.topic,
    status: item.status,
    value: 0,
    at: item.createdAt,
  };
}

export function LeadsBoard() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    api<{ items: LeadItem[] }>("/pro/leads")
      .then(({ items }) => setLeads(items.map(toLead)))
      .catch(() => setNotice("Leads appear after your listing is live."));
  }, []);

  async function setStatus(id: string, status: LeadRow["status"]) {
    const previous = leads;
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    try {
      await api(`/pro/leads/${id}`, { method: "PATCH", body: { status } });
    } catch (error) {
      setLeads(previous);
      toast.error(errorMessage(error, "Could not update the lead."));
    }
  }

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: leads.length };
    leads.forEach(
      (lead) => (map[lead.status] = (map[lead.status] ?? 0) + 1),
    );
    return map;
  }, [leads]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...leads]
      .sort((a, b) => b.at.localeCompare(a.at))
      .filter((lead) => filter === "All" || lead.status === filter)
      .filter(
        (lead) =>
          !q ||
          `${lead.client} ${lead.topic} ${lead.channel}`
            .toLowerCase()
            .includes(q),
      );
  }, [filter, query, leads]);

  const pipeline = leads.filter(
    (l) => l.status === "Open" || l.status === "Escalated",
  ).length;
  const converted = leads
    .filter((l) => l.status === "Converted")
    .reduce((sum, l) => sum + l.value, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Leads
          </h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Conversations your AI Salahkar handled. Pick up escalations and
            follow up on open questions.
          </p>
        </div>
        <dl className="flex gap-3">
          <div className="rounded-xl border border-border bg-white px-4 py-2.5">
            <dt className="text-[11px] text-muted-foreground">Needs you</dt>
            <dd className="font-display text-lg font-semibold text-foreground">
              {pipeline}
            </dd>
          </div>
          <div className="rounded-xl border border-border bg-white px-4 py-2.5">
            <dt className="text-[11px] text-muted-foreground">
              Converted value
            </dt>
            <dd className="font-display text-lg font-semibold text-foreground">
              {formatINR(converted)}
            </dd>
          </div>
        </dl>
      </div>

      {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div
          className="-mx-1 flex gap-1.5 overflow-x-auto px-1 [scrollbar-width:none]"
          role="tablist"
          aria-label="Lead status"
        >
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => setFilter(item)}
              className={cn(
                "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold whitespace-nowrap transition-colors",
                filter === item
                  ? "border-[#001450] bg-[#001450] text-white"
                  : "border-border bg-white text-ink-soft hover:border-accent/40",
              )}
            >
              {item}
              <span
                className={
                  filter === item ? "text-white/60" : "text-muted-foreground"
                }
              >
                {counts[item] ?? 0}
              </span>
            </button>
          ))}
        </div>
        <label className="relative block flex-1 sm:max-w-xs sm:ml-auto">
          <span className="sr-only">Search leads</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search client or topic"
            className="h-9 w-full rounded-lg border border-border bg-white pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-accent/50 focus:ring-3 focus:ring-accent/15 [&::-webkit-search-cancel-button]:appearance-none"
          />
        </label>
      </div>

      <section className="overflow-hidden rounded-2xl border border-border bg-white">
        {rows.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border/70 bg-[#f8f9fc] text-xs tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th className="px-5 py-3 font-semibold">Client</th>
                  <th className="px-5 py-3 font-semibold">Topic</th>
                  <th className="px-5 py-3 font-semibold">Channel</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">Value</th>
                  <th className="px-5 py-3 font-semibold">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {rows.map((lead) => {
                  const Icon = channelIcon[lead.channel];
                  return (
                    <tr
                      key={lead.id}
                      className="transition-colors hover:bg-[#f8f9fc]"
                    >
                      <td className="px-5 py-3.5 font-semibold text-foreground">
                        {lead.client}
                      </td>
                      <td className="max-w-[260px] truncate px-5 py-3.5 text-ink-soft">
                        {lead.topic}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <Icon className="h-3.5 w-3.5" /> {lead.channel}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <label className="sr-only" htmlFor={`lead-${lead.id}`}>Status</label>
                        <select
                          id={`lead-${lead.id}`}
                          className="rounded-md border border-border bg-white px-2 py-1 text-xs"
                          value={lead.status}
                          onChange={(event) => void setStatus(lead.id, event.target.value as LeadRow["status"])}
                        >
                          {FILTERS.filter((item) => item !== "All").map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-3.5 text-right font-medium text-foreground tabular-nums">
                        {lead.value ? formatINR(lead.value) : "—"}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">
                        {formatLeadTime(lead.at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-14 text-center text-sm text-muted-foreground">
            No leads match these filters.
          </p>
        )}
      </section>
    </div>
  );
}
