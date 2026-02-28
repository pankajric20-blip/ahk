import { Star } from "lucide-react";
import Image from "next/image";

interface Review {
  id: number;
  rating: number;
  review_text: string | null;
  created_at: string;
  user: {
    name: string | null;
    avatar_url: string | null;
  } | null;
}

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-8 text-center border rounded-xl border-dashed bg-muted/10">
        <p className="text-muted-foreground">
          No reviews yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0 border">
                {review.user?.avatar_url ? (
                  <Image
                    src={review.user.avatar_url}
                    alt={review.user?.name || "User"}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-muted-foreground font-semibold">
                    {review.user?.name
                      ? review.user.name.charAt(0).toUpperCase()
                      : "A"}
                  </span>
                )}
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {review.user?.name || "Anonymous User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating
                      ? "fill-amber-500 text-amber-500"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {review.review_text && (
            <div className="mt-4 text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
              "{review.review_text}"
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
