"use client";

import { useEffect, useState } from "react";
import { PublicCommunity } from "@/components/community/PublicCommunity";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth";

export default function ProCommunityPage() {
  const { user } = useSession();
  const [name, setName] = useState(user?.name ?? "");
  const [role, setRole] = useState("Professional");

  useEffect(() => {
    api<{ professional: { name?: string; typeLabel?: string; type?: string } | null }>("/pro/me")
      .then(({ professional }) => {
        if (!professional) return;
        if (professional.name) setName(professional.name);
        setRole(professional.typeLabel || professional.type || "Professional");
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Community
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Share rulings and insights, and answer client questions. Your posts
          show your professional title.
        </p>
      </div>
      <PublicCommunity member={{ name: name || user?.name || "Professional", role }} />
    </div>
  );
}
