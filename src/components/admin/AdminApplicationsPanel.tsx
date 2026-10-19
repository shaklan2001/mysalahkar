"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, FileText, LogOut } from "lucide-react";
import { toast } from "sonner";
import { RoleGate } from "@/components/auth/RoleGate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { api, errorMessage } from "@/lib/api";
import { signOut, useSession } from "@/lib/auth";
import { cn } from "@/lib/utils";

type Status = "pending_review" | "approved" | "rejected";

type AdminApplication = {
  id: string;
  status: Status;
  createdAt: string;
  reviewedAt: string | null;
  reviewNote: string | null;
  listingKind: "ai" | "human" | "both";
  name: string;
  email: string;
  phone: string;
  firm: string;
  domain: string;
  credentials: string;
  membershipId: string;
  city: string;
  displayName: string;
  tagline: string;
  bio: string;
  fee: number;
  slug: string;
  documents: { kind: string; fileName: string; url?: string }[];
};

const TABS: { id: Status; label: string }[] = [
  { id: "pending_review", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

export function AdminApplicationsPanel() {
  return (
    <RoleGate role="admin">
      <ApplicationsReview />
    </RoleGate>
  );
}

function ApplicationsReview() {
  const router = useRouter();
  const { user } = useSession();
  const [tab, setTab] = useState<Status>("pending_review");
  const [version, setVersion] = useState(0);
  const [result, setResult] = useState<{ key: string; items: AdminApplication[] } | null>(null);
  const key = `${tab}:${version}`;
  const apps = result?.key === key ? result.items : null;

  useEffect(() => {
    let cancelled = false;
    api<{ items: AdminApplication[] }>(`/admin/applications?status=${tab}`)
      .then(({ items }) => {
        if (!cancelled) setResult({ key: `${tab}:${version}`, items });
      })
      .catch((error) => {
        if (cancelled) return;
        toast.error(errorMessage(error));
        setResult({ key: `${tab}:${version}`, items: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [tab, version]);

  async function review(id: string, action: "approve" | "reject", note: string) {
    try {
      await api(`/admin/applications/${id}/${action}`, { method: "POST", body: { note: note || null } });
      toast.success(action === "approve" ? "Approved. The listing is live." : "Application rejected.");
      setVersion((v) => v + 1);
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Admin</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Listing applications</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Check documents, then approve. Approved professionals go live on Find Professionals and get an email.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/agents">View marketplace</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            title={user?.email}
            onClick={async () => {
              await signOut();
              router.replace("/admin/login");
            }}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>

      <div className="mt-8 inline-grid grid-cols-3 rounded-lg bg-muted p-1" role="tablist" aria-label="Status">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "h-8 rounded-md px-4 text-xs font-semibold transition-colors",
              tab === t.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section className="mt-6 space-y-4">
        {apps === null ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : apps.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing here.{" "}
            {tab === "pending_review" ? (
              <>
                New applications arrive from{" "}
                <Link href="/professionals/signup" className="underline">
                  professional signup
                </Link>
                .
              </>
            ) : null}
          </p>
        ) : (
          apps.map((app) => (
            <ApplicationCard key={app.id} app={app} onReview={(action, note) => review(app.id, action, note)} />
          ))
        )}
      </section>
    </div>
  );
}

function ApplicationCard({
  app,
  onReview,
}: {
  app: AdminApplication;
  onReview: (action: "approve" | "reject", note: string) => Promise<void>;
}) {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [docs, setDocs] = useState<AdminApplication["documents"] | null>(null);

  async function openDocuments() {
    try {
      const { application } = await api<{ application: AdminApplication }>(`/admin/applications/${app.id}`);
      setDocs(application.documents);
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }

  async function act(action: "approve" | "reject") {
    setBusy(true);
    await onReview(action, note);
    setBusy(false);
  }

  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-foreground">{app.displayName || app.name}</p>
            <p className="text-sm text-muted-foreground">
              {app.name} · {app.email} · +91 {app.phone}
              {app.firm ? ` · ${app.firm}` : ""}
            </p>
          </div>
          <Badge
            variant={app.status === "approved" ? "success" : app.status === "rejected" ? "outline" : "secondary"}
          >
            {app.status.replace("_", " ")}
          </Badge>
        </div>
        <dl className="grid gap-1 text-sm sm:grid-cols-2">
          <div>
            <span className="text-muted-foreground">Listing: </span>
            {app.listingKind}
          </div>
          <div>
            <span className="text-muted-foreground">Domain: </span>
            {app.domain} · {app.credentials}
          </div>
          <div>
            <span className="text-muted-foreground">Membership: </span>
            {app.membershipId || "—"}
          </div>
          <div>
            <span className="text-muted-foreground">City / fee: </span>
            {app.city} · ₹{app.fee}
          </div>
          <div className="sm:col-span-2">
            <span className="text-muted-foreground">Submitted: </span>
            {new Date(app.createdAt).toLocaleString("en-IN")}
          </div>
          <div className="sm:col-span-2">
            <span className="text-muted-foreground">Bio: </span>
            {app.bio}
          </div>
          {app.reviewNote ? (
            <div className="sm:col-span-2">
              <span className="text-muted-foreground">Review note: </span>
              {app.reviewNote}
            </div>
          ) : null}
        </dl>

        <div className="rounded-lg border border-border/70 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Documents</p>
          {docs ? (
            <ul className="mt-2 space-y-1 text-sm">
              {docs.map((d) => (
                <li key={`${d.kind}-${d.fileName}`}>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    {d.kind.replace("_", " ")}: {d.fileName}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-muted-foreground">
                {app.documents.map((d) => d.fileName).join(", ") || "—"}
              </span>
              <Button size="sm" variant="outline" onClick={openDocuments}>
                Open documents
              </Button>
            </div>
          )}
          {docs ? <p className="mt-2 text-xs text-muted-foreground">Links expire after 10 minutes.</p> : null}
        </div>

        {app.status === "pending_review" ? (
          <div className="space-y-2 pt-1">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note to the professional (optional, included in the email)"
              maxLength={1000}
              rows={2}
            />
            <div className="flex flex-wrap gap-2">
              <Button size="sm" disabled={busy} onClick={() => act("approve")}>
                Approve
              </Button>
              <Button size="sm" variant="outline" disabled={busy} onClick={() => act("reject")}>
                Reject
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
