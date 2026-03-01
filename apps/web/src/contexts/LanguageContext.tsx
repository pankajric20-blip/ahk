"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type LanguageType = "hi" | "en" | "hinglish";

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  // A helper to pick a string based on the language preference
  t: (
    enText: string | null | undefined,
    hiText: string | null | undefined,
  ) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageType>("hi"); // Default Hindi-first

  // Optional: load user preference from local storage or profile on mount
  useEffect(() => {
    const saved = localStorage.getItem("user_language");
    if (saved === "en" || saved === "hi" || saved === "hinglish") {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    localStorage.setItem("user_language", lang);
  };

  const t = (
    enText: string | null | undefined,
    hiText: string | null | undefined,
  ): string => {
    if (language === "hi" || language === "hinglish") {
      // If Hindi/Hinglish is preferred, return Hindi text if available, fallback to English
      return hiText || enText || "";
    }
    // For English
    return enText || hiText || "";
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
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
