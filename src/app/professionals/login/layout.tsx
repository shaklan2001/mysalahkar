import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional sign in",
  description: "Sign in to your My Salahkar professional dashboard.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
