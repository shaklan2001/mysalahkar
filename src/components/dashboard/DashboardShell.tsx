"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { LogOut, Menu, X, type LucideIcon } from "lucide-react";
import { MySalahkarLogo } from "@/components/brand/MySalahkarLogo";
import { cn } from "@/lib/utils";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
};

export type DashboardNavGroup = { label: string; items: DashboardNavItem[] };

type DashboardShellProps = {
  homeHref: string;
  ariaLabel: string;
  groups: DashboardNavGroup[];
  /** Under the logo (wallet, listing status…). */
  top?: ReactNode;
  /** Card above the profile row. Receives `close` so actions can shut the mobile drawer. */
  promo?: (close: () => void) => ReactNode;
  user: { name: string; detail?: string };
  onSignOut: () => void;
  signOutLabel?: string;
  /** Right side of the mobile top bar. */
  mobileRight?: ReactNode;
  children: ReactNode;
};

function isActive(pathname: string, item: DashboardNavItem) {
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function initials(name: string) {
  return (
    name
      .replace(/^(Dr|CA|CS|Adv)\.?\s+/i, "")
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  );
}

/** Navy sidebar shell shared by the client and professional dashboards. */
export function DashboardShell({
  homeHref,
  ariaLabel,
  groups,
  top,
  promo,
  user,
  onSignOut,
  signOutLabel = "Sign out",
  mobileRight,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const allItems = groups.flatMap((group) => group.items);
  const current =
    allItems.find((item) => isActive(pathname, item)) ?? allItems[0];

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-5 pb-4">
        <Link href={homeHref} aria-label={`${ariaLabel} home`} onClick={close}>
          <MySalahkarLogo height={30} variant="white" />
        </Link>
        {top ? <div className="mt-5">{top}</div> : null}
      </div>

      <nav
        className="flex-1 space-y-6 overflow-y-auto px-3 py-2"
        aria-label={ariaLabel}
      >
        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[10px] font-semibold tracking-[0.16em] text-slate-500 uppercase">
              {group.label}
            </p>
            <ul className="mt-2 space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={close}
                      className={cn(
                        "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-white/[0.09] text-white"
                          : "text-slate-400 hover:bg-white/[0.05] hover:text-white",
                      )}
                    >
                      {active ? (
                        <span
                          className="absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-accent"
                          aria-hidden
                        />
                      ) : null}
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          active && "text-blue-300",
                        )}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="space-y-3 p-3">
        {promo ? promo(close) : null}
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
            {initials(user.name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {user.name}
            </p>
            {user.detail ? (
              <p className="truncate text-xs text-slate-400">{user.detail}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={signOutLabel}
            title={signOutLabel}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 bg-[#001450] text-white lg:block">
        {sidebar}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Phones only: the sidebar is a drawer, so keep a slim bar to open it. */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border/70 bg-white/85 px-4 backdrop-blur-md sm:px-6 lg:hidden">
          <button
            type="button"
            className="-ml-1.5 rounded-md p-2 text-foreground hover:bg-muted"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight text-foreground">
            {current.label}
          </p>
          {mobileRight}
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-[#001450]/50 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={close}
          />
          <div className="relative h-full w-72 max-w-[85vw] bg-[#001450] text-white shadow-2xl">
            <button
              type="button"
              className="absolute top-4 right-3 z-10 rounded-md p-2 text-slate-300 hover:bg-white/10"
              onClick={close}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Blue gradient promo card for the sidebar. */
export function SidebarPromo({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  action: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0a2a8a] to-[#001450] p-4 ring-1 ring-white/10">
      <div
        className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-accent/40 blur-2xl"
        aria-hidden
      />
      <Icon className="relative h-4 w-4 text-blue-200" />
      <p className="relative mt-2 text-sm font-semibold text-white">{title}</p>
      <p className="relative mt-0.5 text-xs text-slate-300">{body}</p>
      <div className="relative mt-3">{action}</div>
    </div>
  );
}

export const sidebarPromoButtonClass =
  "inline-flex h-8 w-full items-center justify-center rounded-md bg-white text-xs font-semibold text-[#001450] hover:bg-blue-50";
