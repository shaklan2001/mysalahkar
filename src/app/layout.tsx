import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConsultProvider } from "@/components/consult/ConsultProvider";
import { ConsultDock } from "@/components/consult/ConsultDock";
import { AppToaster } from "@/components/layout/AppToaster";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "My Salahkar — AI Professional Consultancy",
    template: "%s | My Salahkar",
  },
  description:
    "India's AI Salahkars — expert CA, CS, Legal, FEMA, Wealth & more. Consult on WhatsApp, chat or call. 24/7. Human escalation when you need it.",
  metadataBase: new URL("https://mysalahkar.com"),
  openGraph: {
    title: "My Salahkar — AI Professional Consultancy",
    description:
      "Consult AI SME agents for tax, legal, FEMA, insolvency, wealth and more — WhatsApp, chat or call.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="site-shell flex min-h-full flex-col font-sans text-foreground">
        <ConsultProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ConsultDock />
          <AppToaster />
        </ConsultProvider>
      </body>
    </html>
  );
}
