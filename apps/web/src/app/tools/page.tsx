"use client";

import Link from "next/link";
import { Sparkles, Languages, Mic, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const miniTools = [
  {
    id: "text-to-speech",
    titleKey: "tts_title",
    titleEnFallback: "Text to Speech",
    titleHi: "टेक्स्ट से आवाज़",
    descKey: "tts_desc",
    descEnFallback:
      "Convert any text to natural sounding speech. Supports Hindi!",
    descHi:
      "किसी भी टेक्स्ट को स्वाभाविक आवाज़ में बदलें। हिंदी सपोर्ट के साथ!",
    descHinglish:
      "Koi bhi text ko natural speech mein badlo. Hindi support ke saath!",
    icon: Mic,
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
    href: "/tools/text-to-speech",
  },
  {
    id: "translator",
    titleKey: "translator_title",
    titleEnFallback: "AI Translator",
    titleHi: "AI अनुवादक",
    descKey: "translator_desc",
    descEnFallback:
      "Translate between Hindi, English, and 100+ languages instantly.",
    descHi: "हिंदी, अंग्रेजी और 100+ भाषाओं के बीच तुरंत अनुवाद करें।",
    descHinglish:
      "Hindi, English aur 100+ languages mein instantly translate karo.",
    icon: Languages,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
    href: "/tools/translator",
  },
] as const;

export default function ToolsPage() {
  const { ui, language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
          <Sparkles className="mr-2 h-4 w-4" />
          {ui("minitools_badge")}
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {ui("minitools_title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {ui("minitools_subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {miniTools.map((tool) => {
          const Icon = tool.icon;
          const title = language === "hi" ? tool.titleHi : tool.titleEnFallback;
          const desc =
            language === "hi"
              ? tool.descHi
              : language === "hinglish"
                ? tool.descHinglish
                : tool.descEnFallback;

          return (
            <Link
              key={tool.id}
              href={tool.href}
              className="group relative p-6 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative z-10">
                <div
                  className={`h-14 w-14 rounded-xl bg-muted flex items-center justify-center mb-4 ${tool.iconColor} group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{desc}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
                  {ui("minitool_try")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
