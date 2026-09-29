"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Bot,
  CalendarCheck,
  Eye,
  EyeOff,
  IndianRupee,
  Inbox,
  Info,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type AuthAudience = "client" | "professional";
export type AuthMode = "signin" | "signup";

type AuthFrameProps = {
  audience: AuthAudience;
  mode: AuthMode;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Where the Client / Professional switch sends the other audience (keeps ?next= for clients). */
  switchHrefs?: Partial<Record<AuthAudience, string>>;
};

const defaultHrefs: Record<AuthMode, Record<AuthAudience, string>> = {
  signin: { client: "/client/login", professional: "/professionals/login" },
  signup: { client: "/client/signup", professional: "/professionals/signup" },
};

/** Split-screen auth layout shared by client & professional sign-in / sign-up. */
export function AuthFrame({
  audience,
  mode,
  title,
  description,
  children,
  footer,
  switchHrefs,
}: AuthFrameProps) {
  const hrefs = { ...defaultHrefs[mode], ...switchHrefs };

  return (
    <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:px-8 lg:py-10">
      {/* Form */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <div
            className="grid grid-cols-2 rounded-xl border border-border bg-white p-1"
            role="tablist"
            aria-label="Account type"
          >
            {(
              [
                ["client", "Client", UserRound],
                ["professional", "Professional", BadgeCheck],
              ] as const
            ).map(([value, label, Icon]) => (
              <Link
                key={value}
                href={hrefs[value]}
                role="tab"
                aria-selected={audience === value}
                className={cn(
                  "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg text-sm font-semibold transition-colors",
                  audience === value
                    ? "bg-[#001450] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>

          <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="mt-7">{children}</div>

          {footer ? (
            <div className="mt-6 space-y-1.5 text-center text-sm text-muted-foreground">
              {footer}
            </div>
          ) : null}

          <p className="mt-6 inline-flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" /> Demo environment. Any credentials
            work and passwords aren&apos;t stored.
          </p>
        </div>
      </div>

      {/* Brand panel */}
      <BrandPanel audience={audience} mode={mode} />
    </div>
  );
}

const panel: Record<
  AuthAudience,
  {
    eyebrow: string;
    title: string;
    body: string;
    points: { icon: LucideIcon; title: string; body: string }[];
  }
> = {
  client: {
    eyebrow: "For clients",
    title: "Expert advice, the moment you need it.",
    body: "Ask an AI Salahkar any time, and book a verified professional when it matters.",
    points: [
      {
        icon: Bot,
        title: "AI Salahkars, 24/7",
        body: "Instant answers on tax, GST, company law and FEMA.",
      },
      {
        icon: BadgeCheck,
        title: "Verified experts",
        body: "Book practising CAs, CSs and lawyers in 30-minute slots.",
      },
      {
        icon: Wallet,
        title: "Pay per minute",
        body: "Top up once. No retainers, no surprise invoices.",
      },
      {
        icon: ShieldCheck,
        title: "Confidential",
        body: "Encrypted consultations, aligned with the DPDP Act.",
      },
    ],
  },
  professional: {
    eyebrow: "For professionals",
    title: "Practise on your terms. We bring the clients.",
    body: "Launch your AI Salahkar, take escalations when you choose, and track every rupee you earn.",
    points: [
      {
        icon: Sparkles,
        title: "Your own AI Salahkar",
        body: "A branded assistant that answers routine questions for you.",
      },
      {
        icon: Inbox,
        title: "Qualified leads",
        body: "Clients arrive with their full conversation attached.",
      },
      {
        icon: CalendarCheck,
        title: "Calendar & billing",
        body: "Set your hours and rate. Calls are metered for you.",
      },
      {
        icon: IndianRupee,
        title: "Earnings dashboard",
        body: "Consultations, ratings and payouts in one place.",
      },
    ],
  },
};

const proSteps = [
  "Create your account",
  "Verify your credentials",
  "Launch your AI Salahkar or listing",
];

function BrandPanel({
  audience,
  mode,
}: {
  audience: AuthAudience;
  mode: AuthMode;
}) {
  const content = panel[audience];
  return (
    <aside className="relative hidden overflow-hidden rounded-3xl bg-[#001450] p-10 text-white lg:flex lg:flex-col">
      <div
        className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_70%)]"
        aria-hidden
      />
      <div
        className="absolute -top-40 -right-32 h-[26rem] w-[26rem] rounded-full bg-accent/35 blur-[120px]"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col">
        <p className="text-xs font-semibold tracking-[0.14em] text-blue-300 uppercase">
          {content.eyebrow}
        </p>
        <h2 className="mt-3 max-w-md text-balance font-display text-3xl leading-tight font-semibold tracking-tight">
          {content.title}
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
          {content.body}
        </p>

        <ul className="mt-9 grid gap-6 xl:grid-cols-2">
          {content.points.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-blue-200 ring-1 ring-white/15">
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-sm font-semibold">{title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-400">
                {body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          {audience === "professional" && mode === "signup" ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-xs font-semibold tracking-wide text-blue-200 uppercase">
                After you sign up
              </p>
              <ol className="mt-4 space-y-3">
                {proSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 text-sm text-slate-200"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold ring-1 ring-white/15">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
                  <Bot className="h-4 w-4" />
                </span>
                <p className="text-sm font-semibold">
                  {audience === "client" ? "Ankit AI" : "Your AI Salahkar"}
                  <span className="ml-2 text-xs font-normal text-emerald-300">
                    ● Online
                  </span>
                </p>
              </div>
              <p className="mt-3 rounded-xl rounded-tl-sm bg-white/10 px-3.5 py-2.5 text-[13px] leading-relaxed text-slate-200">
                {audience === "client"
                  ? "Welcome back! Your GSTR-3B for this quarter is due on the 22nd. Want me to walk you through it?"
                  : "Welcome back! You have new client questions waiting for your review."}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

type AuthFieldProps = {
  id: string;
  label: string;
  icon?: LucideIcon;
  hint?: ReactNode;
  /** Right-aligned element on the label row, e.g. "Forgot password?" */
  labelAction?: ReactNode;
  /** Element inside the input on the right, e.g. a show-password toggle */
  trailing?: ReactNode;
} & ComponentProps<"input">;

export function AuthField({
  id,
  label,
  icon: Icon,
  hint,
  labelAction,
  trailing,
  className,
  ...props
}: AuthFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-[13px] font-medium text-foreground">
          {label}
        </Label>
        {labelAction}
      </div>
      <div className="relative mt-1.5">
        {Icon ? (
          <Icon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        ) : null}
        <input
          id={id}
          className={cn(
            "h-11 w-full rounded-lg border border-border bg-white px-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:border-accent/50 focus:ring-3 focus:ring-accent/15",
            Icon && "pl-9",
            className,
          )}
          {...props}
        />
        {trailing ? (
          <div className="absolute top-1/2 right-1.5 -translate-y-1/2">
            {trailing}
          </div>
        ) : null}
      </div>
      {hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function PasswordField({
  id,
  label,
  icon,
  hint,
  labelAction,
  ...props
}: Omit<AuthFieldProps, "type" | "trailing">) {
  const [visible, setVisible] = useState(false);
  return (
    <AuthField
      id={id}
      label={label}
      icon={icon}
      hint={hint}
      labelAction={labelAction}
      type={visible ? "text" : "password"}
      className="pr-11"
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      }
      {...props}
    />
  );
}

export function AuthOr({ label = "or" }: { label?: string }) {
  return (
    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-background px-3 text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}
