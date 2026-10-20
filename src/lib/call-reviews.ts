import { api } from "@/lib/api";

const MAX_COMMENT = 500;

export type ReviewInput = {
  callId?: string;
  bookingId?: string;
  stars: number;
  comment: string;
};

/** Checks a review before it is sent. The API enforces the same limits. */
export function parseCallReview(input: ReviewInput): { ok: true } | { ok: false; error: string } {
  const comment = input.comment.trim();
  const hasCall = Boolean(input.callId);
  const hasBooking = Boolean(input.bookingId);
  if (hasCall === hasBooking) return { ok: false, error: "This review isn't attached to a call or a booking." };
  if (!Number.isInteger(input.stars) || input.stars < 1 || input.stars > 5) {
    return { ok: false, error: "Choose a rating from 1 to 5." };
  }
  if (comment.length > MAX_COMMENT) return { ok: false, error: "Review must be 500 characters or fewer." };
  return { ok: true };
}

/** Saves a review on the account that made the call or booking. */
export async function saveCallReview(input: ReviewInput): Promise<void> {
  const parsed = parseCallReview(input);
  if (!parsed.ok) throw new Error(parsed.error);
  await api("/reviews", {
    method: "POST",
    body: {
      callId: input.callId,
      bookingId: input.bookingId,
      stars: input.stars,
      comment: input.comment.trim(),
    },
  });
}
