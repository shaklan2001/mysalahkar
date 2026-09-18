"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { MySalahkarLogo } from "@/components/brand/MySalahkarLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConsult } from "@/components/consult/ConsultProvider";

const navItems = [
  { path: "/agents", label: "Find Professionals" },
  { path: "/services", label: "Services" },
  { path: "/community", label: "Community" },
  { path: "/daily-digest", label: "Daily Digest" },
  { path: "/how-it-works", label: "How it works" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const signInRef = useRef<HTMLDivElement>(null);
  const { openConsult } = useConsult();

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!signInRef.current?.contains(e.target as Node)) {
        setSignInOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={() => setMobileOpen(false)}
            aria-label="mysalahkar home"
          >
            <MySalahkarLogo height={36} />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.path || pathname.startsWith(`${item.path}/`);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "rounded-md px-3 py-2 text-[13px] font-medium tracking-tight transition-colors",
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <div className="relative" ref={signInRef}>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={() => setSignInOpen((o) => !o)}
                aria-expanded={signInOpen}
                aria-haspopup="menu"
              >
                Sign In
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </Button>
              {signInOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-1 w-52 rounded-lg border border-border bg-white py-1 shadow-lg"
                >
                  <Link
                    href="/client/login"
                    role="menuitem"
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                    onClick={() => setSignInOpen(false)}
                  >
                    Client Login
                  </Link>
                  <Link
                    href="/professionals/login"
                    role="menuitem"
                    className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                    onClick={() => setSignInOpen(false)}
                  >
                    Professional Login
                  </Link>
                </div>
              ) : null}
            </div>
            <Button size="sm" onClick={() => openConsult()}>
              Consult now
            </Button>
          </div>

          <button
            className="rounded-md p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-border/70 py-4 lg:hidden">
            <nav className="flex flex-col gap-0.5">
              {navItems.map((item) => {
                const active =
                  pathname === item.path || pathname.startsWith(`${item.path}/`);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm font-medium",
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/70",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/client/login" onClick={() => setMobileOpen(false)}>
                  Client Login
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href="/professionals/login"
                  onClick={() => setMobileOpen(false)}
                >
                  Professional Login
                </Link>
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  openConsult();
                }}
              >
                Consult now
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
