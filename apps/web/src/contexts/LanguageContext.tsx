"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translate, type TranslationKey } from "@/i18n/translations";

type LanguageType = "hi" | "en" | "hinglish";

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  // Pick db content string based on language preference
  // hinglishText is optional — falls back to enText if not provided
  t: (
    enText: string | null | undefined,
    hiText: string | null | undefined,
    hinglishText?: string | null | undefined,
  ) => string;
  // Pick UI string from central translations dictionary
  ui: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageType>("hi");

  useEffect(() => {
    const saved = localStorage.getItem("user_language");
    // Default to "hi" if no preference saved — this is a Hindi-first platform
    const lang: LanguageType =
      saved === "en" || saved === "hi" || saved === "hinglish" ? saved : "hi";
    setLanguage(lang);
    // Always write the cookie so server components can read the locale
    // from the very first navigation after hydration
    document.cookie = `user_language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    if (!saved) {
      localStorage.setItem("user_language", lang);
    }
  }, []);

  const handleSetLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    localStorage.setItem("user_language", lang);
    // Also set a cookie so server components can read the locale without waiting for hydration
    document.cookie = `user_language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  };

  // For database bilingual content (name_en / name_hi / description_hinglish)
  const t = (
    enText: string | null | undefined,
    hiText: string | null | undefined,
    hinglishText?: string | null | undefined,
  ): string => {
    if (language === "hi") {
      // Only use Hindi text if it's actually different from English
      // (guards against migration fallback that set name_hi = name_en)
      const hi = hiText?.trim();
      const en = enText?.trim();
      return (hi && hi !== en ? hi : en) ?? "";
    }
    if (language === "hinglish") {
      // Use hinglish if provided, otherwise fall back to English
      return hinglishText?.trim() || enText || "";
    }
    return enText || hiText || "";
  };

  // For UI strings from the central translation dictionary
  const ui = (key: TranslationKey): string => {
    return translate(key, language);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t, ui }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
