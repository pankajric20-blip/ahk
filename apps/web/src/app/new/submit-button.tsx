"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function SubmitButton() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="w-full h-11 flex items-center justify-center gap-2 rounded-md bg-green-600/10 border border-green-600/30 text-green-500 font-medium text-sm">
        ✅ Submitted! We&apos;ll review it within 2–3 business days.
      </div>
    );
  }

  return (
    <button
      type="button"
      className="w-full h-11 flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
      onClick={() => setSubmitted(true)}
    >
      <Send className="h-4 w-4" />
      Submit for Review
    </button>
  );
}
