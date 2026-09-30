"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Briefcase,
  LayoutGrid,
  Lock,
  Menu,
  Newspaper,
  Sparkles,
  UserRound,
  Users,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { MySalahkarLogo } from "@/components/brand/MySalahkarLogo";
import { HeadlineTicker } from "@/components/layout/HeadlineTicker";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useConsult } from "@/components/consult/ConsultProvider";

type MenuLink = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  soon?: boolean;
};

const platformLinks: MenuLink[] = [
  {
    href: "/features",
    label: "Features",
    description: "AI Salahkars, channels, billing and more",
    icon: Sparkles,
  },
  {
    href: "/how-it-works",
    label: "How it works",
    description: "From first question to expert sign-off",
    icon: Workflow,
  },
  {
    href: "/services",
    label: "Services",
    description: "Tax, GST, company law, FEMA and advisory",
    icon: LayoutGrid,
  },
  {
    href: "/security",
    label: "Security",
    description: "Confidentiality and data protection",
    icon: Lock,
  },
];

const resourceLinks: MenuLink[] = [
  {
    href: "/daily-digest",
    label: "Daily Digest",
    description: "Compliance updates, markets & due dates",
    icon: Newspaper,
  },
  {
    href: "/community",
    label: "Community",
    description: "Discussions from practitioners",
    icon: Users,
  },
  {
    href: "/learning",
    label: "Learning",
    description: "Workshops & masterclasses",
    icon: BookOpen,
    soon: true,
  },
];

const signInLinks: MenuLink[] = [
  {
    href: "/client/login",
    label: "Client",
    description: "Consults, bookings & wallet",
    icon: UserRound,
  },
  {
    href: "/professionals/login",
    label: "Professional",
    description: "Your practice & earnings",
    icon: Briefcase,
  },
];

/** Every top-level menu trigger in the bar shares this look. */
const navTriggerClass =
  "bg-transparent text-[13px] text-muted-foreground hover:text-foreground";

const directLinks = [{ href: "/agents", label: "Find Experts" }];

const mobileSections = [
  { title: "Platform", links: platformLinks },
  { title: "Resources", links: resourceLinks },
];

function SoonBadge() {
  return (
    <span className="rounded-full bg-brand-blue/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-accent uppercase">
      Soon
    </span>
  );
}

function MegaLink({ link }: { link: MenuLink }) {
  const Icon = link.icon;
  return (
    <NavigationMenuLink asChild>
      <Link
        href={link.href}
        className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-muted"
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-white text-accent">
          <Icon className="h-4 w-4" />
        </span>
        <span className="flex flex-col">
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            {link.label}
            {link.soon ? <SoonBadge /> : null}
          </span>
          <span className="text-xs leading-snug text-muted-foreground">
            {link.description}
          </span>
        </span>
      </Link>
    </NavigationMenuLink>
  );
}

const authRoutes = new Set([
  "/client/login",
  "/client/signup",
  "/professionals/login",
  "/professionals/signup",
]);

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTicker, setShowTicker] = useState(false);
  const { openConsult } = useConsult();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setShowTicker(window.scrollY > 160);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // No headlines over the sign-in / sign-up forms.
  const tickerAllowed = !authRoutes.has(pathname);

  const isActive = (href: string) =>
    !href.includes("#") &&
    (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] border-b transition-colors",
        scrolled || mobileOpen
          ? "border-border/70 bg-white/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={() => setMobileOpen(false)}
            aria-label="mysalahkar home"
          >
            <MySalahkarLogo height={34} />
          </Link>

          <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList className="gap-0.5">
              <NavigationMenuItem>
                <NavigationMenuTrigger className={navTriggerClass}>
                  Platform
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[520px] grid-cols-2 gap-1 p-2">
                    {platformLinks.map((link) => (
                      <MegaLink key={link.href} link={link} />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {directLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-[13px]",
                        isActive(link.href)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger className={navTriggerClass}>
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[300px] gap-1 p-2">
                    {resourceLinks.map((link) => (
                      <MegaLink key={link.href} link={link} />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-2 lg:flex">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={navTriggerClass}>
                    Sign in
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="right-0 left-auto">
                    <div className="grid w-[300px] gap-1 p-2">
                      {signInLinks.map((link) => (
                        <MegaLink key={link.href} link={link} />
                      ))}
                    </div>
                    <div className="border-t border-border/70 px-4 py-2.5">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/professionals/signup"
                          className="p-0 text-xs text-muted-foreground hover:bg-transparent hover:text-accent"
                        >
                          New professional? Apply to join
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button size="sm" variant="accent" onClick={() => openConsult()}>
              Consult now
            </Button>
          </div>

          <button
            className="rounded-md p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border/70 py-4 lg:hidden">
            <nav className="flex flex-col gap-0.5">
              {directLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-semibold",
                    isActive(link.href)
                      ? "bg-muted text-foreground"
                      : "text-foreground hover:bg-muted/70",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {mobileSections.map((section) => (
              <div key={section.title} className="mt-4">
                <p className="px-3 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  {section.title}
                </p>
                <div className="mt-1 flex flex-col gap-0.5">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-muted/70"
                    >
                      <link.icon className="h-4 w-4 text-accent" />
                      {link.label}
                      {link.soon ? <SoonBadge /> : null}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button asChild variant="outline">
                <Link href="/client/login" onClick={() => setMobileOpen(false)}>
                  Client login
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  href="/professionals/login"
                  onClick={() => setMobileOpen(false)}
                >
                  Professional login
                </Link>
              </Button>
              <Button
                variant="accent"
                className="col-span-2"
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

      {/* Headline strip: absolutely positioned so it never shifts the page. */}
      {tickerAllowed ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full transition-all duration-300 ease-out",
            showTicker && !mobileOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0",
          )}
          aria-hidden={!showTicker || mobileOpen || undefined}
          inert={!showTicker || mobileOpen || undefined}
        >
          <HeadlineTicker />
        </div>
      ) : null}
    </header>
  );
}
