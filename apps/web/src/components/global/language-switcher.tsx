"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LANG_OPTIONS = [
  { code: "hi", label: "हिंदी", sublabel: "Hindi" },
  { code: "hinglish", label: "Hinglish", sublabel: "Hindi + English" },
  { code: "en", label: "English", sublabel: "English Only" },
] as const;

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current =
    LANG_OPTIONS.find((l) => l.code === language) ?? LANG_OPTIONS[0];

  const displayLabel =
    language === "hi" ? "हिंदी" : language === "hinglish" ? "Hinglish" : "EN";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm font-medium hover:text-foreground text-muted-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span>{displayLabel}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border bg-popover shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {LANG_OPTIONS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              className={`w-full flex flex-col items-start px-4 py-2.5 text-sm transition-colors hover:bg-muted ${
                language === lang.code
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground"
              }`}
            >
              <span className="font-medium">{lang.label}</span>
              <span className="text-xs text-muted-foreground">
                {lang.sublabel}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
