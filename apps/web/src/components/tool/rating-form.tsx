"use client";

import { useState, useTransition } from "react";
import { Star, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { submitReview } from "@/actions/reviews";
import { useLanguage } from "@/contexts/LanguageContext";

interface RatingFormProps {
  toolId: string;
  slug: string;
  initialRating?: number;
  initialReview?: string;
  initialTitle?: string;
  initialUseCase?: string;
  initialUsageDuration?: string;
  isLoggedIn: boolean;
}

export function RatingForm({
  toolId,
  slug,
  initialRating = 0,
  initialReview = "",
  initialTitle = "",
  initialUseCase = "",
  initialUsageDuration = "",
  isLoggedIn,
}: RatingFormProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState(initialTitle);
  const [reviewText, setReviewText] = useState(initialReview);
  const [useCase, setUseCase] = useState(initialUseCase);
  const [usageDuration, setUsageDuration] = useState(initialUsageDuration);
  const [isPending, startTransition] = useTransition();
  const { language } = useLanguage();

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
    formData.append("tool_id", toolId);
    formData.append("rating", rating.toString());
    formData.append("title", title);
    formData.append("review_text", reviewText);
    formData.append("use_case", useCase);
    formData.append("usage_duration", usageDuration);
    formData.append("language", language);
    formData.append("slug", slug);

    startTransition(async () => {
      const result = await submitReview(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          "Review submitted successfully! Thank you for sharing your thoughts.",
        );
      }
    });
  };

  return (
    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Leave a Review</h3>

      {!isLoggedIn && (
        <div className="mb-4 text-sm text-amber-600 bg-amber-500/10 p-3 rounded-md border border-amber-500/20 flex flex-col items-start gap-2">
          You must be logged in to leave a rich review.
          <a
            href="/login"
            className="px-3 py-1 bg-amber-500/20 text-amber-700 font-semibold rounded text-xs hover:bg-amber-500/30"
          >
            Sign In Now
          </a>
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
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Review Title
          </label>
          <input
            type="text"
            placeholder="Sum up your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!isLoggedIn || isPending}
            className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Your Review
          </label>
          <textarea
            placeholder="How did this tool help your business or workflow? Did you face any issues?"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            disabled={!isLoggedIn || isPending}
            className="min-h-[100px] resize-y w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Use Case
            </label>
            <input
              type="text"
              placeholder="e.g. Sales Calls, Graphic Design"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              disabled={!isLoggedIn || isPending}
              className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Usage Duration
            </label>
            <select
              value={usageDuration}
              onChange={(e) => setUsageDuration(e.target.value)}
              disabled={!isLoggedIn || isPending}
              className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select duration...</option>
              <option value="Just testing">Just testing</option>
              <option value="Less than 1 month">Less than 1 month</option>
              <option value="1-6 months">1-6 months</option>
              <option value="Over 6 months">Over 6 months</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isLoggedIn || isPending || rating === 0}
          className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2 mt-4"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Publish Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}
