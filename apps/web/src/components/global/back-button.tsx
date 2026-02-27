"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  /** Fallback href used when there's no browser history (e.g. direct link). */
  fallbackHref?: string;
  /** Label shown next to the arrow. */
  label?: string;
}

/**
 * A proper back button that uses browser history (router.back()).
 * Falls back to a hardcoded Link when there's no history entry (e.g. the user
 * opened the page in a new tab or arrived from an external site).
 */
export function BackButton({
  fallbackHref = "/",
  label = "Back",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        // If there's a previous page in the session history, go back.
        // Otherwise navigate to the fallback.
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </button>
  );
}
