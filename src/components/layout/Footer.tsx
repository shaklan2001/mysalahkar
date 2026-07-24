import Link from "next/link";
import {
  Mail,
  Phone,
} from "lucide-react";
import { MySalahkarLogo } from "@/components/brand/MySalahkarLogo";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <MySalahkarLogo height={44} variant="white" />
            </div>
            <p className="mb-4 text-sm text-slate-400">
              India&apos;s AI Salahkars — expert CA, CS, Legal, FEMA, Wealth &amp;
              more. Consult on WhatsApp, chat or call. 24/7.
            </p>
            <div className="flex gap-3">
              {["Facebook", "X", "LinkedIn", "Instagram"].map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold transition-colors hover:bg-primary"
                >
                  {label.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/agents", "AI Agents"],
                ["/services", "Services"],
                ["/community", "Community"],
                ["/learning", "Learning"],
                ["/loan-comparison", "Smart Loan"],
                ["/how-it-works", "How it works"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">For Professionals</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Join as Professional
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="transition-colors hover:text-white">
                  How AI Agents Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/learning" className="transition-colors hover:text-white">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="mt-1 h-4 w-4" />
                <div>
                  <p>Email</p>
                  <a
                    href="mailto:support@mysalahkar.com"
                    className="text-sky-400 hover:text-sky-300"
                  >
                    support@mysalahkar.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-1 h-4 w-4" />
                <div>
                  <p>Phone</p>
                  <a href="tel:+918047001234" className="text-sky-400 hover:text-sky-300">
                    +91 80470 01234
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p className="text-slate-400">
              © {new Date().getFullYear()} My Salahkar. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
