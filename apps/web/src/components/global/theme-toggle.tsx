"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className="relative flex items-center justify-center h-8 w-8 rounded-full border border-border/60 bg-muted/40 hover:bg-muted hover:border-border transition-all duration-300 text-muted-foreground hover:text-foreground group"
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {/* Sun icon — shown when in dark mode (click to go light) */}
      <Sun
        className={`h-4 w-4 absolute transition-all duration-300 ${
          theme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-90 scale-75"
        }`}
      />
      {/* Moon icon — shown when in light mode (click to go dark) */}
      <Moon
        className={`h-4 w-4 absolute transition-all duration-300 ${
          theme === "light"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-75"
        }`}
      />
    </button>
  );
}
