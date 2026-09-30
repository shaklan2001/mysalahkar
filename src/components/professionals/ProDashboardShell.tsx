"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  Bot,
  CalendarDays,
  Home,
  Inbox,
  IndianRupee,
  Newspaper,
  Settings,
  Store,
  Users,
} from "lucide-react";
import {
  DashboardShell,
  SidebarPromo,
  sidebarPromoButtonClass,
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

function ListingStatus() {
  const pro = mockProfessional;
  const status = statusMeta[pro.status];
  return (
    <Link
      href="/professionals/dashboard/agent"
      className="flex items-center gap-3 rounded-lg bg-white/[0.07] px-3 py-2.5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
        <Bot className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-white">
          {pro.agentName} AI · {pro.domain}
        </span>
        <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
          <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
          {status.label}
          {pro.verified ? (
            <>
              <span aria-hidden>·</span>
              <BadgeCheck className="h-3 w-3 text-blue-300" /> Verified
            </>
          ) : null}
        </span>
      </span>
    </Link>
  );
}

export function ProDashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pro = mockProfessional;

  return (
    <DashboardShell
      homeHref="/professionals/dashboard"
      ariaLabel="Partner dashboard"
      groups={groups}
      top={<ListingStatus />}
      promo={(close) => (
        <SidebarPromo
          icon={Store}
          title="See your listing"
          body="How clients see you on the marketplace."
          action={
            <Link
              href="/agents"
              className={sidebarPromoButtonClass}
              onClick={close}
            >
              View marketplace
            </Link>
          }
        />
      )}
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
