"use client";

import { useState, useRef } from "react";
import {
  Mic,
  Pause,
  Play,
  Volume2,
  Copy,
  Check,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const VOICES_MAP: Record<string, string> = {
  "hi-IN": "Hindi (India)",
  "en-IN": "English (India)",
  "en-US": "English (US)",
  "ta-IN": "Tamil",
  "te-IN": "Telugu",
  "bn-IN": "Bengali",
  "mr-IN": "Marathi",
};

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [selectedLang, setSelectedLang] = useState("hi-IN");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleSpeak = () => {
    if (!text.trim()) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Try to find a matching voice
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) => v.lang === selectedLang);
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/10 text-violet-500 mb-4">
          <Mic className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Text to Speech
        </h1>
        <p className="text-muted-foreground">
          टेक्स्ट से आवाज़ — Type or paste any text and hear it spoken aloud
        </p>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm p-6 space-y-6">
        {/* Language Selector */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Language / भाषा
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(VOICES_MAP).map(([code, label]) => (
              <button
                key={code}
                onClick={() => setSelectedLang(code)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  selectedLang === code
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div className="relative">
          <textarea
            placeholder="Type or paste your text here... Hindi ya English mein likho..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            maxLength={5000}
            className="w-full rounded-xl border border-input bg-transparent px-4 py-3 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {text.length} / 5000 characters
            </span>
            <button
              onClick={handleCopy}
              disabled={!text.trim()}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 disabled:opacity-50"
            >
              {copied ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSpeak}
            disabled={!text.trim()}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            {isSpeaking ? (
              <>
                <Pause className="h-5 w-5" /> Stop
              </>
            ) : (
              <>
                <Play className="h-5 w-5" /> Speak
              </>
            )}
          </button>
          {isSpeaking && (
            <div className="flex items-center gap-1 text-primary animate-pulse">
              <Volume2 className="h-5 w-5" />
              <span className="text-sm font-medium">Speaking...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
