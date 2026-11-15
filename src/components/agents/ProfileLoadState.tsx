import Link from "next/link";
import { Loader2 } from "lucide-react";

/** What a profile page shows while the profile loads, when it isn't found, or when the API can't be reached. */
export function ProfileLoadState({
  state,
  backHref = "/agents",
  what = "professional",
  message,
}: {
  state: "loading" | "missing" | "error";
  backHref?: string;
  what?: string;
  /** Replaces the default "missing" wording. */
  message?: { title: string; body: string; href: string; linkLabel: string };
}) {
  if (state === "loading") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center" role="status">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="sr-only">Loading profile</span>
      </div>
    );
  }
  const text =
    state === "error"
      ? { title: "We couldn't load this profile", body: "Check your connection and refresh the page.", href: backHref, linkLabel: "Browse professionals" }
      : (message ?? {
          title: `This ${what} isn't listed`,
          body: "They may have paused their listing. Browse the other professionals instead.",
          href: backHref,
          linkLabel: "Browse professionals",
        });
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p className="font-display text-lg font-semibold text-foreground">{text.title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{text.body}</p>
      <Link href={text.href} className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
        {text.linkLabel}
      </Link>
    </div>
  );
}
