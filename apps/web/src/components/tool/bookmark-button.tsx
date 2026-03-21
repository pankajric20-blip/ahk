"use client";

import { useState, useTransition } from "react";
import { Bookmark, BookmarkPlus } from "lucide-react";
import { toggleBookmark } from "@/app/actions/bookmark";
import { useRouter } from "next/navigation";

interface BookmarkButtonProps {
  toolId: string;
  initialBookmarked: boolean;
  slug: string;
}

export function BookmarkButton({
  toolId,
  initialBookmarked,
  slug,
}: BookmarkButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleBookmark = () => {
    setErrorMsg(null);
    // Optimistic UI update
    setIsBookmarked((prev) => !prev);

    startTransition(async () => {
      const result = await toggleBookmark(toolId, `/tool/${slug}`);

      if (result?.error && result.error.includes("logged in")) {
        // Revert optimistic update and redirect to login
        setIsBookmarked(initialBookmarked);
        router.push(`/login?next=/tool/${encodeURIComponent(slug)}`);
      } else if (result?.error) {
        // Revert and show inline error — no alert() for better UX and security
        setIsBookmarked(initialBookmarked);
        setErrorMsg(result.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleBookmark}
        disabled={isPending}
        aria-label={isBookmarked ? "Remove bookmark" : "Save this tool"}
        className={`w-full flex items-center justify-center gap-2 border h-10 rounded-md font-medium transition-colors disabled:opacity-60 ${
          isBookmarked
            ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
            : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        {isBookmarked ? (
          <>
            <Bookmark className="h-4 w-4 fill-primary" />
            Saved
          </>
        ) : (
          <>
            <BookmarkPlus className="h-4 w-4" />
            Save Tool
          </>
        )}
      </button>
      {errorMsg && (
        <p className="text-xs text-destructive text-center mt-1" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
