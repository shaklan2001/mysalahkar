import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { ConsultProvider } from "@/components/consult/ConsultProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "My Salahkar — AI Professional Consultancy",
    description:
      "Consult AI Salahkars for tax, legal, FEMA, insolvency, wealth and more — WhatsApp, chat or call.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/brand/mysalahkar-logo-on-white.png" }],
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
      <body className="site-shell flex min-h-full flex-col">
        <ConsultProvider>
          <SiteChrome>
            <Suspense fallback={null}>{children}</Suspense>
          </SiteChrome>
          <AppToaster />
        </ConsultProvider>
      </body>
    </html>
  );
}
