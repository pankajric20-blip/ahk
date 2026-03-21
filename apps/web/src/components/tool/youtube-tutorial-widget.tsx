"use client";

import { PlayCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  url: string;
}

export function YoutubeTutorialWidget({ url }: Props) {
  const { ui } = useLanguage();

  let embedUrl = "";

  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.pathname === "/results" &&
      parsedUrl.searchParams.has("search_query")
    ) {
      // Search-based URL — we no longer use this as a fallback
      return null;
    } else {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        const videoId = match[2];
        embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
      }
    }
  } catch {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      embedUrl = `https://www.youtube.com/embed/${match[2]}?rel=0`;
    }
  }

  if (!embedUrl) return null;

  return (
    <div className="rounded-xl overflow-hidden border bg-card shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-muted p-4 border-b flex items-center gap-2">
        <PlayCircle className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">{ui("tool_tutorial")}</h3>
      </div>
      <div className="aspect-video w-full bg-black">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}
