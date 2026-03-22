import { cookies } from "next/headers";

export type Locale = "hi" | "en" | "hinglish";

/**
 * Read the user's preferred locale from their cookie.
 * Defaults to "hi" (Hindi-first platform).
 * Call this in server components to get the locale for DB queries.
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get("user_language")?.value;
  if (value === "en" || value === "hi" || value === "hinglish") return value;
  return "hi";
}

/**
 * Pick the localized value from three parallel columns (e.g. name_en / name_hi / name_hinglish).
 * Mirrors the t() logic in LanguageContext so server and client produce identical output.
 */
export function pickLocale(
  en: string | null | undefined,
  hi: string | null | undefined,
  hinglish: string | null | undefined,
  locale: Locale,
): string {
  if (locale === "hi") {
    const hiTrimmed = hi?.trim();
    const enTrimmed = en?.trim();
    return (hiTrimmed && hiTrimmed !== enTrimmed ? hiTrimmed : enTrimmed) ?? "";
  }
  if (locale === "hinglish") {
    return hinglish?.trim() || en || "";
  }
  return en || hi || "";
}

/**
 * Adds pre-computed `name`, `tagline`, and `description` fields to a tool row
 * fetched from ai_tools. Use this in server components that query ai_tools directly.
 */
export function localizeToolFields<T extends Record<string, any>>(
  tool: T,
  locale: Locale,
): T & { name: string; tagline: string | null; description: string | null } {
  return {
    ...tool,
    name: pickLocale(tool.name_en, tool.name_hi, tool.name_hinglish, locale),
    tagline:
      pickLocale(
        tool.tagline_en,
        tool.tagline_hi,
        tool.tagline_hinglish,
        locale,
      ) || null,
    description:
      pickLocale(
        tool.description_en,
        tool.description_hi,
        tool.description_hinglish,
        locale,
      ) || null,
  };
}

export function localizeTools<T extends Record<string, any>>(
  tools: T[],
  locale: Locale,
): (T & {
  name: string;
  tagline: string | null;
  description: string | null;
})[] {
  return tools.map((t) => localizeToolFields(t, locale));
}
