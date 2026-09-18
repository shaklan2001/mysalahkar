"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome =
    pathname.startsWith("/professionals/dashboard") ||
    pathname.startsWith("/client/dashboard") ||
    pathname.startsWith("/consult");

  if (hideChrome) {
    return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
