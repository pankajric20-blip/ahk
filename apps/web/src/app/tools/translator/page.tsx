"use client";

import { useState } from "react";
import {
  Languages,
  ArrowLeftRight,
  Copy,
  Check,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const LANGUAGES = [
  { code: "hi", label: "Hindi (हिंदी)" },
  { code: "en", label: "English" },
  { code: "ta", label: "Tamil (தமிழ்)" },
  { code: "te", label: "Telugu (తెలుగు)" },
  { code: "bn", label: "Bengali (বাংলা)" },
  { code: "mr", label: "Marathi (मराठी)" },
  { code: "gu", label: "Gujarati (ગુજરાતી)" },
  { code: "kn", label: "Kannada (ಕನ್ನಡ)" },
  { code: "ml", label: "Malayalam (മലയാളം)" },
  { code: "pa", label: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "de", label: "German" },
  { code: "ja", label: "Japanese" },
  { code: "zh", label: "Chinese" },
  { code: "ar", label: "Arabic" },
];

export default function TranslatorPage() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      // Use MyMemory Translation API (free, no key required)
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceText)}&langpair=${sourceLang}|${targetLang}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        setError("Translation failed. Please try a shorter text.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        href="/tools"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Mini Tools
      </Link>

      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 mb-4">
          <Languages className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          AI Translator
        </h1>
        <p className="text-muted-foreground">
          AI अनुवादक — Translate between Hindi, English, and 15+ languages
        </p>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm p-6 space-y-6">
        {/* Language Selectors */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              From
            </label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background/50 px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwapLanguages}
            className="mt-5 p-2 rounded-full border hover:bg-muted transition-colors"
            title="Swap languages"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>

          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">
              To
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background/50 px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Source Text */}
        <div>
          <textarea
            placeholder="Type or paste text to translate..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            rows={4}
            maxLength={2000}
            className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
          />
          <span className="text-xs text-muted-foreground">
            {sourceText.length} / 2000 characters
          </span>
        </div>

        {/* Translate Button */}
        <button
          onClick={handleTranslate}
          disabled={!sourceText.trim() || isLoading}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Translating...
            </>
          ) : (
            <>
              <Languages className="h-5 w-5" /> Translate
            </>
          )}
        </button>

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm text-center">
            {error}
          </div>
        )}

        {/* Result */}
        {translatedText && (
          <div className="relative rounded-xl border bg-muted/30 p-4 min-h-[100px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                Translation
              </span>
              <button
                onClick={handleCopy}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-lg leading-relaxed whitespace-pre-wrap">
              {translatedText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
