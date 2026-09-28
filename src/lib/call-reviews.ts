const STORAGE_KEY = "salahkar.call-reviews";
const MAX_COMMENT = 500;
const MAX_STORED = 100;
const SLUG = /^[a-z0-9-]{1,80}$/;

export type CallReview = {
  agentSlug: string;
  stars: number;
  comment: string;
  createdAt: string;
};

type ReviewInput = {
  agentSlug: string;
  stars: number;
  comment: string;
};

export function parseCallReview(
  input: ReviewInput,
): { ok: true; review: Omit<CallReview, "createdAt"> } | { ok: false; error: string } {
  const agentSlug = input.agentSlug.trim();
  const comment = input.comment.trim();
  if (!SLUG.test(agentSlug)) return { ok: false, error: "Invalid AI Salahkar." };
  if (!Number.isInteger(input.stars) || input.stars < 1 || input.stars > 5) {
    return { ok: false, error: "Choose a rating from 1 to 5." };
  }
  if (comment.length > MAX_COMMENT) {
    return { ok: false, error: "Review must be 500 characters or fewer." };
  }
  return { ok: true, review: { agentSlug, stars: input.stars, comment } };
}

function readReviews(): CallReview[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CallReview =>
        !!item &&
        typeof item === "object" &&
        typeof item.agentSlug === "string" &&
        typeof item.stars === "number" &&
        typeof item.comment === "string" &&
        typeof item.createdAt === "string",
    );
  } catch {
    return [];
  }
}

/** ponytail: this browser only. Move to the server when reviews must show on other devices. */
export function saveCallReview(input: ReviewInput): CallReview {
  const parsed = parseCallReview(input);
  if (!parsed.ok) throw new Error(parsed.error);
  const review: CallReview = { ...parsed.review, createdAt: new Date().toISOString() };
  const next = [...readReviews(), review].slice(-MAX_STORED);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return review;
}

export function demoCallReview() {
  const badStars = parseCallReview({ agentSlug: "ankit-gupta-ca", stars: 0, comment: "" });
  if (badStars.ok) throw new Error("expected star reject");
  const badSlug = parseCallReview({ agentSlug: "../x", stars: 5, comment: "" });
  if (badSlug.ok) throw new Error("expected slug reject");
  const long = parseCallReview({
    agentSlug: "ankit-gupta-ca",
    stars: 4,
    comment: "a".repeat(MAX_COMMENT + 1),
  });
  if (long.ok) throw new Error("expected length reject");
  const good = parseCallReview({ agentSlug: "ankit-gupta-ca", stars: 5, comment: "  clear  " });
  if (!good.ok || good.review.comment !== "clear" || good.review.stars !== 5) {
    throw new Error("expected accept");
  }
}

if (typeof process !== "undefined" && process.argv?.[1]?.includes("call-reviews")) {
  demoCallReview();
}
