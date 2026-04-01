"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error tracking service in production
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="mb-6 h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>

      <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
      <p className="text-muted-foreground max-w-sm mb-8">
        एक अनजानी गड़बड़ी हुई। कृपया दोबारा कोशिश करें।
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground h-10 px-6 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-md border bg-background h-10 px-6 text-sm font-medium hover:bg-accent transition-colors"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
