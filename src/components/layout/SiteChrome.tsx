"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConsultDock } from "@/components/consult/ConsultDock";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProDashboard = pathname.startsWith("/professionals/dashboard");

  if (isProDashboard) {
    return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ConsultDock />
    </>
  );
}
