"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bot,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Wallet,
  X,
} from "lucide-react";
import { MySalahkarLogo } from "@/components/brand/MySalahkarLogo";
import { mockProfessional } from "@/lib/data/professional";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/professionals/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/professionals/dashboard/leads", label: "Leads", icon: MessageSquare },
  { href: "/professionals/dashboard/earnings", label: "Earnings", icon: Wallet },
  { href: "/professionals/dashboard/agent", label: "My AI consultant", icon: Bot },
  { href: "/professionals/dashboard/settings", label: "Settings", icon: Settings },
];

export function ProDashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const pro = mockProfessional;

  function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
    return (
      <nav className="flex flex-col gap-0.5">
        {nav.map((item) => {
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
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
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
          <Link href="/">
            <MySalahkarLogo height={32} variant="white" />
          </Link>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Partner console
          </p>
        </div>
        <div className="flex-1 px-3 py-4">
          <NavLinks />
        </div>
        <div className="border-t border-white/10 p-4">
          <p className="truncate text-sm font-semibold">{pro.name}</p>
          <p className="truncate text-xs text-slate-400">{pro.firm}</p>
          <Link
            href="/professionals"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
            Exit to site
          </Link>
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
                {pro.agentName} · AI {pro.domain}
              </p>
              <p className="text-xs text-muted-foreground">
                {pro.verified ? "Verified partner" : "Pending verification"} ·{" "}
                <span className="capitalize text-accent">{pro.status.replace("_", " ")}</span>
              </p>
            </div>
          </div>
          <Link
            href={`/agents`}
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline"
          >
            View marketplace
          </Link>
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
            <div className="flex-1 px-3 py-4">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
