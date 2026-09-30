"use client";

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
import {
  mockProfessional,
  type ProfessionalStatus,
} from "@/lib/data/professional";
import { cn } from "@/lib/utils";

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
  const pro = mockProfessional;

  return (
    <DashboardShell
      homeHref="/professionals/dashboard"
      ariaLabel="Partner dashboard"
      groups={groups}
      user={{ name: pro.name, detail: pro.firm }}
      onSignOut={() => router.push("/professionals/login")}
      signOutLabel="Sign out"
      mobileRight={
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-semibold text-foreground">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              statusMeta[pro.status].dot,
            )}
          />
          {statusMeta[pro.status].label}
        </span>
      }
    >
      {children}
    </DashboardShell>
  );
}
