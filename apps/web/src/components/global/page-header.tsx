"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

interface PageHeaderProps {
  titleKey: TranslationKey;
  subtitleKey?: TranslationKey;
  /** Extra raw string appended to title (e.g. category name, tool name) */
  titleSuffix?: string;
  className?: string;
}

/**
 * A client component that renders a page heading using the active language.
 * Use this at the top of any server-rendered page to get language-reactive headings.
 */
export function PageHeader({
  titleKey,
  subtitleKey,
  titleSuffix,
  className = "",
}: PageHeaderProps) {
  const { ui } = useLanguage();
  return (
    <div className={className}>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {ui(titleKey)}
        {titleSuffix ? ` ${titleSuffix}` : ""}
      </h1>
      {subtitleKey && (
        <p className="text-xl text-muted-foreground">{ui(subtitleKey)}</p>
      )}
    </div>
  );
}

interface LocalizedTextProps {
  translationKey: TranslationKey;
  className?: string;
  as?: React.ElementType;
}

/**
 * Render any single translated string inline as any HTML element.
 */
export function LocalizedText({
  translationKey,
  className,
  as: Tag = "span",
}: LocalizedTextProps) {
  const { ui } = useLanguage();
  return <Tag className={className}>{ui(translationKey)}</Tag>;
}
