"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

interface BackButtonProps {
  /** The href to navigate to (e.g., /dashboard, /categories). */
  fallbackHref?: string;
  /** Static label — used when no translationKey provided (e.g. category name). */
  label?: string;
  /** Translation key — takes priority over label when provided. */
  translationKey?: TranslationKey;
}

/**
 * A proper back navigation link that supports language switching.
 */
export function BackButton({
  fallbackHref = "/",
  label = "Back",
  translationKey,
}: BackButtonProps) {
  const { ui } = useLanguage();
  const text = translationKey ? ui(translationKey) : label;

  return (
    <Link
      href={fallbackHref}
      className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {text}
    </Link>
  );
}
