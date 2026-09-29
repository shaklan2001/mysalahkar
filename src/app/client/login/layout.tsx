import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client sign in",
  description: "Sign in to your My Salahkar client account.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
