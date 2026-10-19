"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bot,
  CalendarDays,
  Home,
  Inbox,
  IndianRupee,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";
import {
  DashboardShell,
  type DashboardNavGroup,
} from "@/components/dashboard/DashboardShell";
import { type ProfessionalStatus } from "@/lib/data/professional";
import { api } from "@/lib/api";
import { signOut, useSession } from "@/lib/auth";
import { cn } from "@/lib/utils";

type ProMe = {
  professional: { status: "live" | "paused" } | null;
  application: { status: "pending_review" | "approved" | "rejected" } | null;
};

function listingStatus(me: ProMe | null): ProfessionalStatus {
  if (me?.professional) return me.professional.status;
  if (me?.application?.status === "pending_review") return "pending_review";
  return "draft";
}

const groups: DashboardNavGroup[] = [
  {
    label: "Practice",
    items: [
      {
        href: "/professionals/dashboard",
        label: "Home",
        icon: Home,
        exact: true,
      },
      { href: "/professionals/dashboard/leads", label: "Leads", icon: Inbox },
      {
        href: "/professionals/dashboard/calendar",
        label: "Calendar",
        icon: CalendarDays,
      },
      {
        href: "/professionals/dashboard/earnings",
        label: "Earnings",
        icon: IndianRupee,
      },
    ],
  },
  {
    label: "AI Salahkar",
    items: [
      {
        href: "/professionals/dashboard/agent",
        label: "My AI Salahkar",
        icon: Bot,
      },
    ],
  },
  {
    label: "Stay informed",
    items: [
      {
        href: "/professionals/dashboard/daily-digest",
        label: "Daily Digest",
        icon: Newspaper,
      },
      {
        href: "/professionals/dashboard/community",
        label: "Community",
        icon: Users,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        href: "/professionals/dashboard/settings",
        label: "Settings",
        icon: Settings,
      },
    ],
  },
];

export const statusMeta: Record<
  ProfessionalStatus,
  { label: string; dot: string }
> = {
  live: { label: "Live", dot: "bg-emerald-400" },
  paused: { label: "Paused", dot: "bg-amber-400" },
  pending_review: { label: "In review", dot: "bg-sky-400" },
  draft: { label: "Draft", dot: "bg-slate-400" },
};

export function ProDashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useSession();
  const [me, setMe] = useState<ProMe | null>(null);
  const status = listingStatus(me);

  useEffect(() => {
    if (user?.role !== "professional") return;
    api<ProMe>("/pro/me").then(setMe).catch(() => setMe(null));
  }, [user?.role]);

  return (
    <DashboardShell
      homeHref="/professionals/dashboard"
      ariaLabel="Partner dashboard"
      groups={groups}
      user={{ name: user?.name ?? "Professional", detail: user?.email || undefined }}
      onSignOut={async () => {
        await signOut();
        router.push("/professionals/login");
      }}
      signOutLabel="Sign out"
      mobileRight={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-semibold text-foreground">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              statusMeta[status].dot,
            )}
          />
          {statusMeta[status].label}
        </span>
      }
    >
      {children}
    </DashboardShell>
  );
}
