"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInClient, useClientSession } from "@/lib/client-session";

export default function ClientProfilePage() {
  const { session } = useClientSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!session) return;
    setName(session.name);
    setEmail(session.email);
  }, [session]);

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Enter a valid email.");
      return;
    }
    signInClient({ name, email });
    toast.success("Profile updated.");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          How professionals see you on consultations.
        </p>
      </div>
      <form
        onSubmit={save}
        className="space-y-5 rounded-xl border border-border bg-white p-5 sm:p-6"
      >
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            className="mt-1.5"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="mt-1.5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save profile</Button>
        </div>
      </form>
    </div>
  );
}
