import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Handshake,
  Lock,
  MessageCircle,
  Newspaper,
  Phone,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { getTickerItems } from "@/lib/data/digest";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[7.5rem] flex-1 overflow-hidden rounded-xl border border-border/70 bg-[#f7f9fd] p-4">
      {children}
    </div>
  );
}

function ChatHeader() {
  return (
    <Frame>
      <div className="flex w-full flex-col justify-center gap-2 text-[12px]">
        <div className="ml-auto max-w-[70%] rounded-xl rounded-br-sm bg-[#001450] px-3 py-1.5 text-white">
          Can I claim HRA and home-loan interest together?
        </div>
        <div className="max-w-[80%] rounded-xl rounded-bl-sm border border-border bg-white px-3 py-1.5 text-ink-soft">
          Yes, if the rented home and the owned home are in different cities, or
          the owned one isn&apos;t habitable…
        </div>
        <div className="flex items-center gap-1 pl-1 text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:300ms]" />
        </div>
      </div>
    </Frame>
  );
}

function ChannelsHeader() {
  const channels = [
    {
      icon: Smartphone,
      label: "WhatsApp",
      tone: "bg-[#25d366]/12 text-[#128c4a]",
    },
    {
      icon: MessageCircle,
      label: "Web chat",
      tone: "bg-brand-blue/10 text-accent",
    },
    { icon: Phone, label: "Voice call", tone: "bg-[#001450]/8 text-[#001450]" },
  ];
  return (
    <Frame>
      <div className="flex w-full flex-col justify-center gap-2">
        {channels.map(({ icon: Icon, label, tone }) => (
          <span
            key={label}
            className="flex items-center gap-2.5 rounded-lg border border-border bg-white px-3 py-1.5 text-[12px] font-medium text-foreground"
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-md ${tone}`}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            {label}
          </span>
        ))}
      </div>
    </Frame>
  );
}

function HandoffHeader() {
  return (
    <Frame>
      <div className="flex w-full items-center justify-between gap-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#001450] text-white">
          <Bot className="h-5 w-5" />
        </span>
        <span className="relative h-px flex-1 bg-[repeating-linear-gradient(to_right,var(--border)_0_6px,transparent_6px_10px)]">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-white px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-muted-foreground">
            context shared
          </span>
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
          CA
        </span>
      </div>
    </Frame>
  );
}

function WalletHeader() {
  return (
    <Frame>
      <div className="flex w-full flex-col justify-center">
        <p className="text-[11px] text-muted-foreground">
          Call in progress · 12:40
        </p>
        <p className="mt-0.5 font-display text-xl font-semibold text-foreground">
          ₹423.00
        </p>
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-border/70">
          <div className="h-full w-[42%] rounded-full bg-accent" />
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          Billed per minute from your wallet
        </p>
      </div>
    </Frame>
  );
}

function SecurityHeader() {
  return (
    <Frame>
      <div className="flex w-full items-center justify-center">
        <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-white shadow-sm">
          <Lock className="h-7 w-7 text-accent" strokeWidth={1.75} />
          <span className="absolute -inset-3 -z-0 rounded-3xl border border-dashed border-accent/25" />
        </span>
      </div>
    </Frame>
  );
}

function DigestHeader() {
  const items = getTickerItems()
    .filter((item) => !item.quiet)
    .slice(0, 3);
  return (
    <Frame>
      <ul className="flex w-full flex-col justify-center divide-y divide-border/70">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 py-1.5 text-[12px]"
          >
            <span className="w-20 shrink-0 whitespace-nowrap rounded bg-white px-1.5 py-0.5 text-center text-[10px] font-semibold text-accent ring-1 ring-border">
              {item.source}
            </span>
            <span className="truncate text-ink-soft">{item.title}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function CommunityHeader() {
  const initials = ["RS", "PM", "AK", "NV"];
  return (
    <Frame>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <div className="flex -space-x-2">
          {initials.map((i, idx) => (
            <span
              key={i}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[11px] font-semibold text-white"
              style={{
                background: ["#001450", "#003cf8", "#3b5bdb", "#5a6a85"][idx],
              }}
            >
              {i}
            </span>
          ))}
        </div>
        <span className="rounded-full border border-border bg-white px-2.5 py-0.5 text-[11px] text-muted-foreground">
          #gst-refunds · #startup-compliance
        </span>
      </div>
    </Frame>
  );
}

const iconClass = "h-4 w-4 text-accent";

const items = [
  {
    title: "AI Salahkars that know Indian law",
    description:
      "Specialist agents for tax, GST, company law, FEMA, insolvency and wealth. Answers in seconds, at 2 a.m. or on a Sunday.",
    header: <ChatHeader />,
    icon: <Bot className={iconClass} />,
    className: "md:col-span-2",
  },
  {
    title: "Consult on any channel",
    description:
      "Start on WhatsApp, continue on the web, switch to a call. The Salahkar remembers.",
    header: <ChannelsHeader />,
    icon: <MessageCircle className={iconClass} />,
    className: "",
  },
  {
    title: "Human escalation, context intact",
    description:
      "Hand complex matters to a verified professional without repeating yourself.",
    header: <HandoffHeader />,
    icon: <Handshake className={iconClass} />,
    className: "",
  },
  {
    title: "Transparent, metered billing",
    description:
      "Top up a wallet and pay per minute. No retainers, no surprise invoices.",
    header: <WalletHeader />,
    icon: <Wallet className={iconClass} />,
    className: "",
  },
  {
    title: "Confidential by design",
    description:
      "Encrypted conversations, strict access controls and DPDP-aligned practices.",
    header: <SecurityHeader />,
    icon: <Lock className={iconClass} />,
    className: "",
  },
  {
    title: "Daily regulatory digest",
    description:
      "Every GST, CBDT, MCA, SEBI and RBI update that matters, summarised each morning.",
    header: <DigestHeader />,
    icon: <Newspaper className={iconClass} />,
    className: "md:col-span-2",
  },
  {
    title: "A community of practitioners",
    description:
      "Ask peers, share rulings and learn from professionals across India.",
    header: <CommunityHeader />,
    icon: <Users className={iconClass} />,
    className: "",
  },
];

export function FeatureBento({
  withHeading = true,
}: {
  withHeading?: boolean;
}) {
  return (
    <section id="platform" className="section-pad scroll-mt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {withHeading ? (
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Platform</p>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Everything a professional consultation needs, in one place.
              </h2>
            </div>
            <Link
              href="/features"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
            >
              All features
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        ) : null}

        <BentoGrid>
          {items.map((item) => (
            <BentoGridItem
              key={item.title}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
