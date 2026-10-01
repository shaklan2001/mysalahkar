import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a client account",
  description: "Create a free My Salahkar client account to consult AI Salahkars and book verified professionals.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
