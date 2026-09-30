"use client";

import { PublicCommunity } from "@/components/community/PublicCommunity";
import { useClientSession } from "@/lib/client-session";

export function ClientCommunity() {
  const { session } = useClientSession();
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Community
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Ask questions and compare notes with CAs, CSs, lawyers and other
          clients. Keep client details confidential.
        </p>
      </div>
      <PublicCommunity
        member={{ name: session?.name ?? "Client", role: "Client" }}
      />
    </div>
  );
}
