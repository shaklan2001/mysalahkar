import Link from "next/link";
import { MySalahkarLogo } from "@/components/brand/MySalahkarLogo";

const product = [
  ["/", "Home"],
  ["/agents", "Find Professionals"],
  ["/services", "Services"],
  ["/how-it-works", "How it works"],
];

const company = [
  ["/about", "About"],
  ["/professionals", "For professionals"],
  ["/daily-digest", "Daily Digest"],
  ["/contact", "Contact"],
  ["/security", "Security"],
];

const legal = [
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/cookies", "Cookies"],
  ["/compliance", "Compliance"],
];

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-[#0a1628] text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <MySalahkarLogo height={36} variant="white" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Professional consultancy for India — AI agents for tax, corporate,
              legal, FEMA, and wealth. WhatsApp, chat, or call. Human escalation
              when you need it.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Product
              </h3>
              <ul className="space-y-2.5 text-sm">
                {product.map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-slate-300 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Company
              </h3>
              <ul className="space-y-2.5 text-sm">
                {company.map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-slate-300 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Legal
              </h3>
              <ul className="space-y-2.5 text-sm">
                {legal.map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-slate-300 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-1 text-sm">
                <a
                  href="mailto:support@mysalahkar.com"
                  className="block text-teal-300/90 hover:text-teal-200"
                >
                  support@mysalahkar.com
                </a>
                <a
                  href="tel:+918047001234"
                  className="block text-slate-400 hover:text-white"
                >
                  +91 80470 01234
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} My Salahkar. All rights reserved.</p>
          <Link
            href="/loan-comparison"
            className="text-xs tracking-wide text-slate-500 transition-colors hover:text-slate-300"
          >
            Loan comparison
          </Link>
        </div>
      </div>
    </footer>
  );
}
