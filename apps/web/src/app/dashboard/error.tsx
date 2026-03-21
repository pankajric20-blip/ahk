"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Dashboard error]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
      <h2 className="text-xl font-semibold">
        Something went wrong loading the dashboard.
      </h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        {error?.message || "An unexpected error occurred."}
      </p>
      {error?.digest && (
        <p className="text-xs text-muted-foreground font-mono">
          digest: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
