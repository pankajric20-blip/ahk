"use client";

import { useState, useTransition } from "react";
import { Star, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

// The server action
import { submitReview } from "@/actions/reviews";

interface RatingFormProps {
  toolId: number;
  slug: string;
  initialRating?: number;
  initialReview?: string;
  isLoggedIn: boolean;
}

export function RatingForm({
  toolId,
  slug,
  initialRating = 0,
  initialReview = "",
  isLoggedIn,
}: RatingFormProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState(initialReview);
  const [isPending, startTransition] = useTransition();

  const handleRatingClick = (newRating: number) => {
    if (!isLoggedIn) {
      toast.error("Please log in to leave a review.");
      return;
    }
    setRating(newRating);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please log in to leave a review.");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    const formData = new FormData();
    formData.append("tool_id", toolId.toString());
    formData.append("rating", rating.toString());
    formData.append("review_text", reviewText);
    formData.append("slug", slug);

    startTransition(async () => {
      const result = await submitReview(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Review submitted successfully!");
      }
    });
  };

  return (
    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Leave a Review</h3>

      {!isLoggedIn && (
        <div className="mb-4 text-sm text-muted-foreground bg-muted p-3 rounded-md border border-dashed">
          You must be logged in to leave a review and rate this tool.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Your Rating <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
                disabled={!isLoggedIn || isPending}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRatingClick(star)}
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    (hoverRating || rating) >= star
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Your Review (Optional)
          </label>
          <textarea
            placeholder="What did you like or dislike about this tool?"
            value={reviewText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setReviewText(e.target.value)
            }
            disabled={!isLoggedIn || isPending}
            className="min-h-[100px] resize-y w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={!isLoggedIn || isPending || rating === 0}
          className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}
