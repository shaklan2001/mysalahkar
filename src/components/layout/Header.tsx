"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Users,
  Briefcase,
  MessageSquare,
  GraduationCap,
  TrendingUp,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { MySalahkarLogo } from "@/components/brand/MySalahkarLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConsult } from "@/components/consult/ConsultProvider";

const navItems = [
  { path: "/agents", label: "AI Agents", icon: Users },
  { path: "/services", label: "Services", icon: Briefcase },
  { path: "/community", label: "Community", icon: MessageSquare },
  { path: "/learning", label: "Learning", icon: GraduationCap },
  { path: "/loan-comparison", label: "Smart Loan", icon: TrendingUp },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openConsult } = useConsult();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
            <MySalahkarLogo height={44} />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.path || pathname.startsWith(`${item.path}/`);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-blue-50 text-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outline">Sign In</Button>
            <Button onClick={() => openConsult()}>
              <Sparkles className="h-4 w-4" />
              Consult now
            </Button>
          </div>

          <button
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.path || pathname.startsWith(`${item.path}/`);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                      active
                        ? "bg-blue-50 text-primary"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  openConsult();
                }}
              >
                <Sparkles className="h-4 w-4" />
                Consult now
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
