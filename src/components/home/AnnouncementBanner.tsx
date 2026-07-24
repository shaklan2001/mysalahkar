"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

export function AnnouncementBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="container mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-center text-sm font-medium md:text-base">
          <Sparkles className="h-5 w-5 flex-shrink-0 text-yellow-300" />
          <span>
            <strong className="font-bold">400+ Services Live</strong> — AI Agents for CA, CS, Legal, FEMA, Wealth Management & More
          </span>
          <Link
            href="/services"
            className="ml-2 hidden font-semibold underline underline-offset-4 hover:text-blue-100 sm:inline"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
