"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Calendar,
  Home,
  LogOut,
  Menu,
  Newspaper,
  Settings,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { MySalahkarLogo } from "@/components/brand/MySalahkarLogo";
import { ClientWallet } from "@/components/client/ClientWallet";
import { signOutClient, useClientSession } from "@/lib/client-session";
import { cn } from "@/lib/utils";

const siteNav: { href: string; label: string; icon: typeof Home; exact?: boolean }[] = [
  { href: "/client/dashboard", label: "Home", icon: Home, exact: true },
  { href: "/client/dashboard/community", label: "Community", icon: Users },
  { href: "/client/dashboard/daily-digest", label: "Daily Digest", icon: Newspaper },
  { href: "/client/dashboard/calendar", label: "Calendar", icon: Calendar },
];

const accountNav: { href: string; label: string; icon: typeof Home; exact?: boolean }[] = [
  { href: "/client/dashboard/account", label: "Account", icon: Wallet },
  { href: "/client/dashboard/profile", label: "Profile", icon: User },
  { href: "/client/dashboard/settings", label: "Settings", icon: Settings },
];

export function ClientDashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useClientSession();
  const [open, setOpen] = useState(false);

  function handleSignOut() {
    signOutClient();
    router.push("/");
  }

  function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
    return (
      <nav className="flex flex-col gap-0.5">
        {siteNav.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-white text-foreground shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
        <p className="mb-1 mt-4 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Account
        </p>
        {accountNav.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-white text-foreground shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f4f6f8]">
      <aside className="hidden w-60 shrink-0 flex-col bg-[#001450] text-white lg:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <Link href="/client/dashboard">
            <MySalahkarLogo height={32} variant="white" />
          </Link>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Client console
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <NavLinks />
        </div>
        <div className="border-t border-white/10 p-4">
          <p className="truncate text-sm font-semibold">{session?.name ?? "Client"}</p>
          <p className="truncate text-xs text-slate-400">{session?.email}</p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/70 bg-white/90 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md p-2 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm font-semibold tracking-tight text-foreground">
                Your consultations
              </p>
              <p className="text-xs text-muted-foreground">Client dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ClientWallet />
            <Link
              href="/agents"
              className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline"
            >
              Book a consultation
            </Link>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-950/50"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full w-64 flex-col bg-[#001450] text-white">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <MySalahkarLogo height={28} variant="white" />
              <button
                type="button"
                className="rounded-md p-2"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
