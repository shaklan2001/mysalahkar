"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, Home, Newspaper, Search, Settings, Sparkles, Users } from "lucide-react";
import { ClientWallet } from "@/components/client/ClientWallet";
import { useConsult } from "@/components/consult/ConsultProvider";
import {
  DashboardShell,
  SidebarPromo,
  sidebarPromoButtonClass,
  type DashboardNavGroup,
} from "@/components/dashboard/DashboardShell";
import { signOutClient, useClientSession } from "@/lib/client-session";

const groups: DashboardNavGroup[] = [
  {
    label: "Workspace",
    items: [
      { href: "/client/dashboard", label: "Home", icon: Home, exact: true },
      { href: "/client/dashboard/find", label: "Find experts", icon: Search },
      { href: "/client/dashboard/calendar", label: "Calendar", icon: CalendarDays },
    ],
  },
  {
    label: "Stay informed",
    items: [
      { href: "/client/dashboard/daily-digest", label: "Daily Digest", icon: Newspaper },
      { href: "/client/dashboard/community", label: "Community", icon: Users },
    ],
  },
  {
    label: "Account",
    items: [{ href: "/client/dashboard/settings", label: "Settings", icon: Settings }],
  },
];

export function ClientDashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session } = useClientSession();
  const { openConsult } = useConsult();

  return (
    <DashboardShell
      homeHref="/client/dashboard"
      ariaLabel="Client dashboard"
      groups={groups}
      top={<ClientWallet tone="dark" align="left" block />}
      promo={(close) => (
        <SidebarPromo
          icon={Sparkles}
          title="Ask an AI Salahkar"
          body="Instant answers, 24/7."
          action={
            <button
              type="button"
              className={sidebarPromoButtonClass}
              onClick={() => {
                close();
                openConsult();
              }}
            >
              Start a chat
            </button>
          }
        />
      )}
      user={{ name: session?.name ?? "Client", detail: session?.email }}
      onSignOut={() => {
        signOutClient();
        router.push("/");
      }}
      mobileRight={<ClientWallet />}
    >
      {children}
    </DashboardShell>
  );
}
