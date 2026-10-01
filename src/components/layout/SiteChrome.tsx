"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/** Pages that already end with FinalCTA — the footer skips its own CTA strip there. */
const pagesWithOwnCta = new Set(["/", "/features", "/services"]);

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome =
    pathname.startsWith("/professionals/dashboard") ||
    pathname.startsWith("/client/dashboard") ||
    pathname.startsWith("/consult");

  const hideFooter =
    pathname === "/client/login" ||
    pathname === "/client/signup" ||
    pathname === "/professionals/login" ||
    pathname === "/professionals/signup";

  if (hideChrome) {
    return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      {hideFooter ? null : <Footer showCta={!pagesWithOwnCta.has(pathname)} />}
    </>
  );
}
