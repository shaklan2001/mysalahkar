import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <p className="font-display text-6xl font-semibold tracking-tight text-accent">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          Sorry, we couldn&apos;t find that page. It may have moved or never
          existed.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/agents">Browse AI agents</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
