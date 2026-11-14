import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional sign in",
  description: "Sign in to your MySalahkar professional dashboard.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
