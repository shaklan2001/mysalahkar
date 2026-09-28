"use client";

import Link from "next/link";
import { useClientSession } from "@/lib/client-session";
import { Button } from "@/components/ui/button";

export default function ClientAccountPage() {
  const { session } = useClientSession();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Signed in on this browser. Your consultations stay on the main site.
        </p>
      </div>
      <div className="rounded-xl border border-border bg-white p-5 sm:p-6">
        <p className="text-sm text-muted-foreground">Name</p>
        <p className="mt-1 font-medium">{session?.name}</p>
        <p className="mt-4 text-sm text-muted-foreground">Email</p>
        <p className="mt-1 font-medium">{session?.email}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/agents">Find a professional</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/client/dashboard">Overview</Link>
        </Button>
      </div>
    </div>
  );
}
