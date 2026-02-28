"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  /** The href to navigate to (e.g., /dashboard, /categories). */
  fallbackHref?: string;
  /** Label shown next to the arrow. */
  label?: string;
}

/**
 * A proper back navigation link.
 * Used to navigate explicitly to a parent or specific route.
 */
export function BackButton({
  fallbackHref = "/",
  label = "Back",
}: BackButtonProps) {
  return (
    <Link
      href={fallbackHref}
      className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Link>
  );
}
