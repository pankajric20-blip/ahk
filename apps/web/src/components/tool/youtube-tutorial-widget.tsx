import { PlayCircle } from "lucide-react";

interface Props {
  url?: string | null;
}

export function YoutubeTutorialWidget({ url }: Props) {
  if (!url) return null;

  let embedUrl = "";
  let isSearch = false;

  try {
    const parsedUrl = new URL(url);

    // Handle youtube.com/results?search_query=...
    if (
      parsedUrl.pathname === "/results" &&
      parsedUrl.searchParams.has("search_query")
    ) {
      const query = parsedUrl.searchParams.get("search_query") || "";
      const encodedQuery = encodeURIComponent(query);
      embedUrl = `https://www.youtube.com/embed?listType=search&list=${encodedQuery}`;
      isSearch = true;
    } else {
      // Handle standard video URLs
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        const videoId = match[2];
        embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
      }
    }
  } catch (e) {
    // If URL parsing fails, we could try the regex as fallback or just return null
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      const videoId = match[2];
      embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
    }
  }

  if (!embedUrl) return null;

  return (
    <div className="rounded-xl overflow-hidden border bg-card shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-muted p-4 border-b flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">
            {isSearch ? "Related Tutorials" : "Hindi Tutorial"}
          </h3>
        </div>
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
