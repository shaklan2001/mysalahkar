import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { MySalahkarLogo } from "@/components/brand/MySalahkarLogo";
import { Button } from "@/components/ui/button";

const columns = [
  {
    title: "Platform",
    links: [
      ["/features", "Features"],
      ["/how-it-works", "How it works"],
      ["/services", "Services"],
      ["/security", "Security"],
    ],
  },
  {
    title: "Clients",
    links: [
      ["/agents", "Find experts"],
      ["/client/signup", "Create account"],
      ["/client/login", "Client login"],
      ["/daily-digest", "Daily Digest"],
    ],
  },
  {
    title: "Professionals",
    links: [
      ["/#professionals", "Why My Salahkar"],
      ["/professionals/signup", "Apply to join"],
      ["/professionals/login", "Professional login"],
      ["/community", "Community"],
    ],
  },
  {
    title: "Company",
    links: [
      ["/about", "About us"],
      ["/contact", "Contact"],
      ["/learning", "Learning · Soon"],
      ["/compliance", "Compliance"],
    ],
  },
];

const legal = [
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/cookies", "Cookies"],
];

export function Footer({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className="relative isolate overflow-hidden bg-[#001450] text-slate-300">
      <div
        className="absolute -top-48 left-1/2 -z-10 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,60,248,0.28),transparent)]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* CTA — the home page ends with its own, so it can opt out */}
        {showCta ? (
          <div className="flex flex-col gap-6 border-b border-white/10 py-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
                Clear advice, whenever you need it.
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Start with an AI Salahkar in minutes, or join as a professional.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="accent">
                <Link href="/client/signup">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                <Link href="/professionals/signup">For professionals</Link>
              </Button>
            </div>
          </div>
        ) : null}

        {/* Links */}
        <div className="grid gap-12 py-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <MySalahkarLogo height={48} variant="white" withTagline />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              Professional advisory for India. AI Salahkars for tax, corporate,
              legal, FEMA and wealth, backed by verified human experts.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:support@mysalahkar.com"
                  className="inline-flex items-center gap-2.5 text-slate-300 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-slate-500" />{" "}
                  support@mysalahkar.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918047001234"
                  className="inline-flex items-center gap-2.5 text-slate-300 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-slate-500" /> +91 80470 01234
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-slate-400">
                <MapPin className="h-4 w-4 text-slate-500" /> India
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {column.links.map(([href, label]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="group inline-flex items-center gap-1 text-slate-400 transition-colors hover:text-white"
                      >
                        {label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>
              © {new Date().getFullYear()} My Salahkar. All rights reserved.
            </p>
            <span
              className="hidden h-4 w-px bg-white/10 md:block"
              aria-hidden
            />
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" />{" "}
              DPDP-aligned
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-emerald-400/80" /> Encrypted
              consultations
            </span>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="transition-colors hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="pointer-events-none select-none" aria-hidden>
        <p className="-mb-[0.22em] text-center font-display text-[18vw] leading-none font-semibold tracking-tighter text-transparent bg-gradient-to-b from-white/[0.07] to-white/0 bg-clip-text lg:text-[13rem]">
          mysalahkar
        </p>
      </div>
    </footer>
  );
}
