"use client";

import { Star, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  review_text: string | null;
  use_case: string | null;
  usage_duration: string | null;
  created_at: string;
  user: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const { language, ui } = useLanguage();

  const dateLocale = language === "hi" ? "hi-IN" : "en-IN";

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-12 text-center border rounded-xl border-dashed bg-muted/10">
        <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
          <Star className="h-6 w-6 text-muted-foreground/50" />
        </div>
        <p className="text-muted-foreground font-medium text-lg">
          {ui("review_list_empty_title")}
        </p>
        <p className="text-muted-foreground/80 text-sm max-w-sm mx-auto mt-2">
          {ui("review_list_empty_desc")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0 border border-primary/20">
                {review.user?.avatar_url ? (
                  <Image
                    src={review.user.avatar_url}
                    alt={review.user?.display_name || "User"}
                    width={48}
                    height={48}
                    loading="lazy"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-primary font-bold text-lg">
                    {review.user?.display_name
                      ? review.user.display_name.charAt(0).toUpperCase()
                      : "A"}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-base flex items-center gap-1.5">
                  {review.user?.display_name || "Anonymous User"}
                  {review.user?.display_name && (
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  )}
                </p>
                <div className="flex items-center text-xs text-muted-foreground gap-2">
                  <span>
                    {new Date(review.created_at).toLocaleDateString(
                      dateLocale,
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                  {review.usage_duration && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <span>
                        {ui("review_list_used_for")} {review.usage_duration}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating
                      ? "fill-amber-500 text-amber-500"
                      : "text-amber-500/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-2 space-y-3">
            {review.title && (
              <h4 className="font-bold text-lg">{review.title}</h4>
            )}

            {review.use_case && (
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-muted/50 text-muted-foreground">
                {ui("review_list_use_case")} {review.use_case}
              </div>
            )}

            {review.review_text && (
              <div className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                {review.review_text}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
