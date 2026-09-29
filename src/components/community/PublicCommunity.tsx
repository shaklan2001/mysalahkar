"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Flame,
  Heart,
  Link2,
  Lock,
  MessageCircle,
  PenLine,
  Search,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import {
  communityGuidelines,
  communityPosts,
  communityStats,
  topContributors,
  trendingTopics,
  type CommunityPost,
} from "@/lib/data/community";
import { useClientSession } from "@/lib/client-session";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn, formatNumber } from "@/lib/utils";

/*
 * Public community is READ-ONLY. Anyone can browse; posting, liking and
 * replying require a client or professional login (dashboards own posting).
 */

const CLIENT_COMMUNITY = "/client/dashboard/community";

const roleLabel: Record<string, string> = {
  CA: "Chartered Accountant",
  CS: "Company Secretary",
  Lawyer: "Lawyer",
  FEMA: "FEMA Consultant",
  "Real Estate": "Real Estate Advisor",
  Wealth: "Wealth Advisor",
  IRP: "Insolvency Professional",
};

const avatarTone = [
  "bg-[#001450]",
  "bg-[#003cf8]",
  "bg-[#3b5bdb]",
  "bg-[#0e7490]",
  "bg-[#5b21b6]",
  "bg-[#b45309]",
];

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function toneFor(name: string) {
  const sum = [...name].reduce((n, ch) => n + ch.charCodeAt(0), 0);
  return avatarTone[sum % avatarTone.length];
}

type Sort = "latest" | "top";

type Member = { name: string; role: string };

/**
 * `member` unlocks posting, likes and replies (dashboards). Without it the
 * feed is read-only and every write action opens the sign-in gate.
 */
export function PublicCommunity({ member }: { member?: Member } = {}) {
  const { session } = useClientSession();
  const [gate, setGate] = useState<string | null>(null);
  const [myPosts, setMyPosts] = useState<CommunityPost[]>([]);
  const [liked, setLiked] = useState<Set<string>>(() => new Set());
  const [replies, setReplies] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState<Sort>("latest");
  const [tag, setTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    communityPosts.forEach((post) =>
      post.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)),
    );
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([t]) => t);
  }, []);

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...myPosts, ...communityPosts]
      .filter((post) => !tag || post.tags.includes(tag))
      .filter(
        (post) =>
          !q ||
          `${post.title} ${post.content} ${post.authorName} ${post.tags.join(" ")}`
            .toLowerCase()
            .includes(q),
      )
      .sort((a, b) =>
        sort === "top"
          ? b.likes + b.comments * 2 - (a.likes + a.comments * 2)
          : b.date.localeCompare(a.date),
      );
  }, [myPosts, query, sort, tag]);

  /** Every write action lands here for guests. */
  function requireSignIn(action: string) {
    setGate(action);
  }

  function toggleLike(id: string) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addReply(id: string, text: string) {
    setReplies((prev) => ({ ...prev, [id]: [...(prev[id] ?? []), text] }));
  }

  function publish(post: { title: string; content: string; tag: string }) {
    if (!member) return;
    setMyPosts((prev) => [
      {
        id: `mine-${Date.now()}`,
        authorName: member.name,
        authorType: member.role,
        title: post.title,
        content: post.content,
        date: new Date().toISOString().slice(0, 10),
        likes: 0,
        comments: 0,
        tags: [post.tag],
      },
      ...prev,
    ]);
    setSort("latest");
    setTag(null);
    setQuery("");
    toast.success("Posted to the community");
  }

  return (
    <>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          {member ? (
            <Composer member={member} tags={tags} onPublish={publish} />
          ) : (
            <button
              type="button"
              onClick={() => requireSignIn("start a discussion")}
              className="group flex w-full items-center gap-3 rounded-2xl border border-border bg-white p-4 text-left transition-colors hover:border-accent/35"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <PenLine className="h-4 w-4" />
              </span>
              <span className="flex-1 text-sm text-muted-foreground">
                Share an update or ask the community…
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                <Lock className="h-3 w-3" /> Sign in to post
              </span>
            </button>
          )}

          {/* Controls */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div
              className="inline-flex shrink-0 rounded-lg border border-border bg-white p-1"
              role="tablist"
            >
              {(
                [
                  ["latest", "Latest"],
                  ["top", "Top"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={sort === value}
                  onClick={() => setSort(value)}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-md px-3.5 text-xs font-semibold transition-colors",
                    sort === value
                      ? "bg-[#001450] text-white"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {value === "top" ? <Flame className="h-3 w-3" /> : null}
                  {label}
                </button>
              ))}
            </div>
            <label className="relative block flex-1">
              <span className="sr-only">Search discussions</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search discussions"
                className="h-10 w-full rounded-lg border border-border bg-white pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus:border-accent/50 focus:ring-3 focus:ring-accent/15 [&::-webkit-search-cancel-button]:appearance-none"
              />
            </label>
          </div>

          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
            {[null, ...tags].map((t) => (
              <button
                key={t ?? "all"}
                type="button"
                aria-pressed={tag === t}
                onClick={() => setTag(t)}
                className={cn(
                  "h-8 shrink-0 rounded-full border px-3 text-xs font-medium whitespace-nowrap",
                  tag === t
                    ? "border-[#001450] bg-[#001450] text-white"
                    : "border-border bg-white text-ink-soft hover:border-accent/40",
                )}
              >
                {t ? `#${t}` : "All topics"}
              </button>
            ))}
          </div>

          {posts.length ? (
            <ul className="mt-5 space-y-4">
              {posts.map((post) => (
                <li key={post.id}>
                  <PostItem
                    post={post}
                    onRequireSignIn={requireSignIn}
                    onTag={setTag}
                    member={Boolean(member)}
                    liked={liked.has(post.id)}
                    onLike={() => toggleLike(post.id)}
                    replies={replies[post.id] ?? []}
                    onReply={(text) => addReply(post.id, text)}
                    memberName={member?.name}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-border bg-white px-6 py-14 text-center">
              <p className="font-display text-base font-semibold text-foreground">
                No discussions match
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTag(null);
                }}
                className="mt-3 text-sm font-semibold text-accent hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-20">
          <div className="grid grid-cols-2 divide-x divide-border rounded-2xl border border-border bg-white text-center">
            {[
              ["Members", communityStats.members],
              ["Posts", communityStats.posts],
            ].map(([label, value]) => (
              <div key={label} className="px-2 py-4">
                <p className="font-display text-lg font-semibold text-foreground">
                  {formatNumber(Number(value))}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Flame className="h-4 w-4 text-accent" /> Trending topics
            </h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {trendingTopics.map((topic) => (
                <li key={topic}>
                  <button
                    type="button"
                    onClick={() => {
                      setTag(null);
                      setQuery(topic.split(" ")[0]);
                    }}
                    className="rounded-md bg-[#f3f5f9] px-2.5 py-1 text-xs text-ink-soft hover:bg-brand-blue/10 hover:text-accent"
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Users className="h-4 w-4 text-accent" /> Top contributors
            </h3>
            <ul className="mt-4 space-y-3">
              {topContributors.map((person) => (
                <li key={person.name} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white",
                      toneFor(person.name),
                    )}
                  >
                    {initials(person.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-foreground">
                      {person.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {roleLabel[person.type] ?? person.type}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {person.posts} posts
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" /> Community
              guidelines
            </h3>
            <ul className="mt-3 space-y-2.5">
              {communityGuidelines.map((rule) => (
                <li key={rule.title}>
                  <p className="text-[13px] font-medium text-foreground">
                    {rule.title}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {rule.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {member ? null : (
        <SignInGate
          action={gate}
          onClose={() => setGate(null)}
          signedIn={Boolean(session)}
        />
      )}
    </>
  );
}

function PostItem({
  post,
  onRequireSignIn,
  onTag,
  member = false,
  liked = false,
  onLike,
  replies = [],
  onReply,
  memberName,
}: {
  post: CommunityPost;
  onRequireSignIn: (action: string) => void;
  onTag: (tag: string) => void;
  member?: boolean;
  liked?: boolean;
  onLike?: () => void;
  replies?: string[];
  onReply?: (text: string) => void;
  memberName?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [replying, setReplying] = useState(false);
  const [draft, setDraft] = useState("");
  const long = post.content.length > 320;

  async function share() {
    const url = `${window.location.origin}/community#${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy the link");
    }
  }

  return (
    <article
      id={post.id}
      className="scroll-mt-24 rounded-2xl border border-border bg-white p-5 sm:p-6"
    >
      <header className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white",
            toneFor(post.authorName),
          )}
        >
          {initials(post.authorName)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-sm font-semibold text-foreground">
              {post.authorName}
            </p>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#001450]/[0.06] px-2 py-0.5 text-[11px] font-medium text-[#001450]">
              <Briefcase className="h-3 w-3" />
              {roleLabel[post.authorType] ?? post.authorType}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {dateFmt.format(new Date(`${post.date}T00:00:00`))}
          </p>
        </div>
      </header>

      <h3 className="mt-4 text-balance font-display text-[17px] leading-snug font-semibold tracking-tight text-foreground">
        {post.title}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed whitespace-pre-line text-muted-foreground",
          !expanded && long && "line-clamp-4",
        )}
      >
        {post.content}
      </p>
      {long ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1.5 text-xs font-semibold text-accent hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      ) : null}

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <li key={t}>
            <button
              type="button"
              onClick={() => onTag(t)}
              className="rounded-md border border-border bg-[#f8f9fc] px-2 py-0.5 text-[11px] text-ink-soft hover:border-accent/40 hover:text-accent"
            >
              #{t}
            </button>
          </li>
        ))}
      </ul>

      <footer className="mt-4 flex items-center gap-1 border-t border-border/70 pt-3">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 px-2.5 text-xs",
            liked ? "text-rose-600" : "text-muted-foreground",
          )}
          aria-pressed={member ? liked : undefined}
          onClick={() => (member ? onLike?.() : onRequireSignIn("like posts"))}
        >
          <Heart className={cn("h-3.5 w-3.5", liked && "fill-current")} />{" "}
          {formatNumber(post.likes + (liked ? 1 : 0))}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2.5 text-xs text-muted-foreground"
          aria-expanded={member ? replying : undefined}
          onClick={() =>
            member
              ? setReplying((v) => !v)
              : onRequireSignIn("reply to discussions")
          }
        >
          <MessageCircle className="h-3.5 w-3.5" />{" "}
          {post.comments + replies.length} replies
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto h-8 px-2.5 text-xs text-muted-foreground"
          onClick={share}
        >
          <Link2 className="h-3.5 w-3.5" /> Copy link
        </Button>
      </footer>

      {member && (replies.length > 0 || replying) ? (
        <div className="mt-3 space-y-3 rounded-xl bg-[#f8f9fc] p-3">
          {replies.map((reply, index) => (
            <div key={index} className="flex gap-2.5">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white",
                  toneFor(memberName ?? "You"),
                )}
              >
                {initials(memberName ?? "You")}
              </span>
              <div className="min-w-0 rounded-lg bg-white px-3 py-2 ring-1 ring-border">
                <p className="text-xs font-semibold text-foreground">
                  {memberName ?? "You"}
                </p>
                <p className="mt-0.5 text-sm text-ink-soft">{reply}</p>
              </div>
            </div>
          ))}
          {replying ? (
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const text = draft.trim();
                if (!text) return;
                onReply?.(text);
                setDraft("");
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a reply…"
                aria-label="Write a reply"
                className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-accent/50 focus:ring-3 focus:ring-accent/15"
              />
              <Button
                type="submit"
                size="sm"
                variant="accent"
                disabled={!draft.trim()}
                className="h-9"
              >
                Reply
              </Button>
            </form>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function Composer({
  member,
  tags,
  onPublish,
}: {
  member: Member;
  tags: string[];
  onPublish: (post: { title: string; content: string; tag: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState(tags[0] ?? "Compliance");
  const ready = title.trim().length >= 5 && content.trim().length >= 20;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-2xl border border-border bg-white p-4 text-left transition-colors hover:border-accent/35"
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white",
            toneFor(member.name),
          )}
        >
          {initials(member.name)}
        </span>
        <span className="flex-1 text-sm text-muted-foreground">
          Share an update or ask the community…
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
          <PenLine className="h-3 w-3" /> Post
        </span>
      </button>
    );
  }

  return (
    <form
      className="rounded-2xl border border-accent/30 bg-white p-4 shadow-[0_0_0_3px_rgba(0,60,248,0.06)] sm:p-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (!ready) return;
        onPublish({ title: title.trim(), content: content.trim(), tag: topic });
        setTitle("");
        setContent("");
        setOpen(false);
      }}
    >
      <p className="text-xs text-muted-foreground">
        Posting as{" "}
        <span className="font-semibold text-foreground">{member.name}</span> ·{" "}
        {member.role}
      </p>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title, e.g. How do I respond to a GST ITC notice?"
        aria-label="Post title"
        autoFocus
        className="mt-3 h-10 w-full rounded-lg border border-border px-3 text-sm font-medium outline-none focus:border-accent/50 focus:ring-3 focus:ring-accent/15"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add details. Don't share confidential client information."
        aria-label="Post details"
        rows={4}
        className="mt-2 w-full resize-y rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-accent/50 focus:ring-3 focus:ring-accent/15"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          Topic
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-8 rounded-md border border-border bg-white px-2 text-xs text-foreground outline-none"
          >
            {tags.map((t) => (
              <option key={t} value={t}>
                #{t}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" variant="accent" disabled={!ready}>
            Publish
          </Button>
        </div>
      </div>
    </form>
  );
}

function SignInGate({
  action,
  onClose,
  signedIn,
}: {
  action: string | null;
  onClose: () => void;
  signedIn: boolean;
}) {
  return (
    <Dialog
      open={action !== null}
      onOpenChange={(open) => (open ? null : onClose())}
    >
      <DialogContent>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-accent">
          <Lock className="h-5 w-5" />
        </span>
        <DialogTitle className="mt-5">
          {signedIn
            ? "Continue in your dashboard"
            : `Sign in to ${action ?? "join the conversation"}`}
        </DialogTitle>
        <DialogDescription>
          {signedIn
            ? "The public community is read-only. Post, like and reply from the community in your dashboard."
            : "The public community is read-only. Members sign in as a client or a professional to post, like and reply."}
        </DialogDescription>

        {signedIn ? (
          <Button asChild variant="accent" className="mt-6 w-full">
            <Link href={CLIENT_COMMUNITY}>
              Open my community <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <div className="mt-6 grid gap-3">
            <Link
              href={`/client/login?next=${encodeURIComponent(CLIENT_COMMUNITY)}`}
              className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-accent/40 hover:bg-[#f8f9fc]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10 text-accent">
                <UserRound className="h-4 w-4" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-foreground">
                  Continue as a client
                </span>
                <span className="block text-xs text-muted-foreground">
                  Ask questions and join discussions
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/professionals/login"
              className="group flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-accent/40 hover:bg-[#f8f9fc]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#001450]/[0.08] text-[#001450]">
                <BadgeCheck className="h-4 w-4" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-foreground">
                  Continue as a professional
                </span>
                <span className="block text-xs text-muted-foreground">
                  Share insights with verified credentials
                </span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
            <p className="pt-1 text-center text-xs text-muted-foreground">
              New here?{" "}
              <Link
                href="/client/signup"
                className="font-semibold text-accent hover:underline"
              >
                Create a free client account
              </Link>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
