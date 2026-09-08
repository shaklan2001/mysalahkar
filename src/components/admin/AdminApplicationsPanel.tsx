"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  listApplications,
  updateApplicationStatus,
} from "@/lib/applications-store";
import type { ListingApplication } from "@/lib/data/marketplace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const ADMIN_SESSION_KEY = "salahkar-admin-ok";
/** Demo gate only — replace with real auth later */
const DEMO_PASS = "salahkar-admin";

export function AdminApplicationsPanel() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [apps, setApps] = useState<ListingApplication[]>([]);

  function refresh() {
    setApps(listApplications());
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(ADMIN_SESSION_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) refresh();
  }, [authed]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (pass === DEMO_PASS) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      setAuthed(true);
      toast.success("Admin access granted (demo)");
    } else {
      toast.error("Incorrect passcode");
    }
  }

  function setStatus(
    id: string,
    status: "approved" | "rejected" | "pending_review",
  ) {
    updateApplicationStatus(id, status);
    refresh();
    toast.success(
      status === "approved"
        ? "Approved — listing can appear on Find Professionals"
        : status === "rejected"
          ? "Application rejected"
          : "Moved back to pending",
    );
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-display text-2xl font-semibold">Superadmin review</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Demo gate for approving professional listings. Use passcode{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
            salahkar-admin
          </code>
          .
        </p>
        <form onSubmit={login} className="mt-6 space-y-3">
          <Input
            type="password"
            placeholder="Passcode"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Enter
          </Button>
        </form>
      </div>
    );
  }

  const pending = apps.filter((a) => a.status === "pending_review");
  const others = apps.filter((a) => a.status !== "pending_review");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Superadmin
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold">
            Listing applications
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Approve professionals after document review. Approved listings show
            on Find Professionals (this browser).
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/agents">View marketplace</Link>
        </Button>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">
          Pending review ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No pending applications. Submit one via{" "}
            <Link href="/professionals/signup" className="underline">
              professional signup
            </Link>
            .
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {pending.map((app) => (
              <ApplicationCard
                key={app.id}
                app={app}
                onApprove={() => setStatus(app.id, "approved")}
                onReject={() => setStatus(app.id, "rejected")}
              />
            ))}
          </div>
        )}
      </section>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Processed ({others.length})</h2>
          <div className="mt-4 space-y-4">
            {others.map((app) => (
              <ApplicationCard
                key={app.id}
                app={app}
                onApprove={() => setStatus(app.id, "approved")}
                onReject={() => setStatus(app.id, "rejected")}
                onPending={() => setStatus(app.id, "pending_review")}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ApplicationCard({
  app,
  onApprove,
  onReject,
  onPending,
}: {
  app: ListingApplication;
  onApprove: () => void;
  onReject: () => void;
  onPending?: () => void;
}) {
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-foreground">
              {app.displayName || app.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {app.name} · {app.email} · {app.firm}
            </p>
          </div>
          <Badge
            variant={
              app.status === "approved"
                ? "success"
                : app.status === "rejected"
                  ? "outline"
                  : "secondary"
            }
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
            <span className="text-muted-foreground">City: </span>
            {app.city}
          </div>
          <div>
            <span className="text-muted-foreground">Fee: </span>₹{app.fee}
          </div>
          <div className="sm:col-span-2">
            <span className="text-muted-foreground">Docs: </span>
            {app.documents.map((d) => d.fileName).join(", ") || "—"}
          </div>
          <div className="sm:col-span-2">
            <span className="text-muted-foreground">Bio: </span>
            {app.bio}
          </div>
        </dl>
        <div className="flex flex-wrap gap-2 pt-1">
          {app.status !== "approved" && (
            <Button size="sm" onClick={onApprove}>
              Approve
            </Button>
          )}
          {app.status !== "rejected" && (
            <Button size="sm" variant="outline" onClick={onReject}>
              Reject
            </Button>
          )}
          {onPending && app.status !== "pending_review" && (
            <Button size="sm" variant="ghost" onClick={onPending}>
              Reopen
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
