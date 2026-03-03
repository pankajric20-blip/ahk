"use client";

import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function HomeBadge() {
  const { ui } = useLanguage();
  return (
    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <Sparkles className="mr-2 h-4 w-4" />
      <span>{ui("home_badge")}</span>
    </div>
  );
}

export function FeaturedSectionHeader() {
  const { ui } = useLanguage();
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-2">
        {ui("home_featured_title")}
      </h2>
      <p className="text-muted-foreground">{ui("home_featured_subtitle")}</p>
    </div>
  );
}

export function HeroSection() {
  const { ui } = useLanguage();
  return (
    <>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
        {ui("home_hero_title")}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
        {ui("home_hero_subtitle")}
      </p>
    </>
  );
}

export function HomeSearchBar() {
  const { ui } = useLanguage();
  return (
    <div className="w-full max-w-2xl relative flex items-center animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
      <form action="/search" className="w-full relative flex items-center">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          name="q"
          placeholder={ui("home_search_placeholder")}
          className="w-full h-14 pl-12 pr-4 rounded-full border-2 border-input bg-background/50 backdrop-blur-sm text-lg shadow-sm transition-all focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground h-10 px-6 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          {ui("home_search_btn")}
        </button>
      </form>
    </div>
  );
}
