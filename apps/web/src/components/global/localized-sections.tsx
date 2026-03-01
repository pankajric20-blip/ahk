"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function FeaturedSectionHeader() {
  const { language } = useLanguage();

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-2">
        {language === "hi"
          ? "चुनिंदा AI टूल्स"
          : language === "hinglish"
            ? "Featured AI Tools"
            : "Featured Tools"}
      </h2>
      <p className="text-muted-foreground">
        {language === "hi"
          ? "अधिकतम उत्पादकता के लिए हाथ से चुने गए AI टूल्स।"
          : language === "hinglish"
            ? "Maximum productivity ke liye hand-picked AI tools."
            : "Hand-picked AI tools for maximum productivity."}
      </p>
    </div>
  );
}

export function HeroSection() {
  const { language } = useLanguage();

  if (language === "hi") {
    return (
      <>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
          अपने काम के लिए सबसे{" "}
          <span className="text-primary">अच्छे AI टूल</span> खोजें
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          पूरी हिंदी भाषा के समर्थन, विस्तृत मूल्य निर्धारण और भारतीय विकल्पों
          के साथ सावधानीपूर्वक चुने गए AI टूल्स खोजें।
        </p>
      </>
    );
  }

  if (language === "hinglish") {
    return (
      <>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
          Apne workflow ke liye best{" "}
          <span className="text-primary">AI Tools</span> dhundho
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          Hindi support ke saath carefully curated AI tools, detailed pricing,
          aur Indian alternatives ke recommendations.
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
        Discover the Best <span className="text-primary">AI Tools</span> for
        Your Workflow
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
        Explore carefully curated AI tools with full Hindi language support,
        detailed pricing, and Indian alternative recommendations.
      </p>
    </>
  );
}
