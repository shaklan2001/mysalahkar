"use client";

import { useId, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { saveCallReview } from "@/lib/call-reviews";

type CallReviewDialogProps = {
  agentSlug: string;
  agentName: string;
  onClose: () => void;
};

export function CallReviewDialog({ agentSlug, agentName, onClose }: CallReviewDialogProps) {
  const titleId = useId();
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    try {
      saveCallReview({ agentSlug, stars, comment });
      toast.success("Thanks — your review was saved.");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the review.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl"
      >
        <h2 id={titleId} className="text-lg font-semibold text-slate-900">
          Rate this call
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          How was {agentName}, your AI Salahkar?
        </p>

        <div className="mt-4 flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((value) => {
            const selected = value <= stars;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={stars === value}
                aria-label={`${value} star${value === 1 ? "" : "s"}`}
                className="rounded-md p-1 text-slate-300 hover:text-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => {
                  setStars(value);
                  setError(null);
                }}
              >
                <Star className={`h-7 w-7 ${selected ? "fill-yellow-400 text-yellow-400" : ""}`} />
              </button>
            );
          })}
        </div>

        <Textarea
          className="mt-4"
          rows={3}
          maxLength={500}
          value={comment}
          placeholder="Share what helped (optional)"
          onChange={(event) => setComment(event.target.value)}
        />

        {error ? (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="button" className="mt-4 w-full" onClick={handleSubmit}>
          Submit review
        </Button>
        <button
          type="button"
          className="mt-3 w-full text-sm text-slate-500 hover:text-slate-800"
          onClick={onClose}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
