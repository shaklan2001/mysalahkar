import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Users } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50 px-4 py-20">
      <div className="text-center">
        <h1 className="mb-4 text-8xl font-bold text-blue-600">404</h1>
        <h2 className="mb-4 text-3xl font-bold text-slate-900">Page Not Found</h2>
        <p className="mb-8 text-lg text-slate-600">
          Sorry, we couldn't find the page you're looking for. It may have been moved,
          deleted, or never existed.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/agents">
              <Users className="h-5 w-5" />
              Browse AI Agents
            </Link>
          </Button>
        </div>

        <div className="mt-12 text-sm text-slate-500">
          <p>Need help? Contact us at{" "}
            <a
              href="mailto:support@mysalahkar.com"
              className="font-semibold text-blue-600 underline hover:text-blue-700"
            >
              support@mysalahkar.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
