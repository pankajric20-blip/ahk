/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  PlayCircle,
} from "lucide-react";
import { BookmarkButton } from "@/components/tool/bookmark-button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const p = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  const { data } = await supabase
    .from("tools")
    .select("name, description_en")
    .eq("slug", p.slug)
    .single();
  const tool: any = data;

  if (!tool) return { title: "Tool Not Found - Aihkya" };

  return {
    title: `${tool.name} - AI Tool Details | Aihkya`,
    description: tool.description_en,
  };
}

export default async function ToolDetailsPage({ params }: Props) {
  const p = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  // Fetch tool data with category info
  const { data: dbTool } = await supabase
    .from("tools")
    .select("*")
    .eq("slug", p.slug)
    .single();

  const anyTool: any = dbTool;
  let toolCategory: any = null;

  if (anyTool && anyTool.category) {
    const { data: catData } = await supabase
      .from("categories")
      .select("name, slug")
      .eq("name", anyTool.category)
      .single();
    toolCategory = catData;
  }

  const tool: any = dbTool;

  if (!tool) {
    notFound();
  }

  // Check if user has bookmarked this tool
  let initialBookmarked = false;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: bookmark } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", user.id)
      .eq("tool_id", tool.id)
      .single();
    if (bookmark) initialBookmarked = true;
  }

  // Helper to extract YouTube ID for generic embeds if full URL is given
  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = tool.youtube_hindi_url
    ? getYoutubeId(tool.youtube_hindi_url)
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Discover
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content (Left 2 columns) */}
        <div className="col-span-1 md:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-2xl bg-muted flex items-center justify-center border shrink-0 overflow-hidden">
              {tool.logo_url ? (
                <img
                  src={tool.logo_url}
                  alt={tool.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-bold text-4xl text-muted-foreground">
                  {tool.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{tool.name}</h1>
                {tool.status === "published" && (
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                )}
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                {tool.description_en}
              </p>
              {tool.description_hi && (
                <p className="text-base text-muted-foreground/80 font-hindi mb-4 italic border-l-2 border-primary/30 pl-3">
                  &quot;{tool.description_hi}&quot;
                </p>
              )}
              {toolCategory && (
                <Link
                  href={`/categories/${toolCategory.slug}`}
                  className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-accent text-accent-foreground hover:bg-accent/80"
                >
                  {toolCategory.name}
                </Link>
              )}
            </div>
          </div>

          {/* Hindi Tutorial Video */}
          {videoId && (
            <div className="rounded-xl overflow-hidden border bg-card shadow-sm">
              <div className="bg-muted p-4 border-b flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Hindi Tutorial</h3>
              </div>
              <div className="aspect-video w-full bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Detailed Description */}
          {tool.detailed_description_en && (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold mb-4">About {tool.name}</h3>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {tool.detailed_description_en}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (Right column) */}
        <div className="col-span-1 border-t md:border-t-0 md:border-l pt-8 md:pt-0 md:pl-8 space-y-6">
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            <h3 className="font-semibold mb-4 text-lg border-b pb-2">
              Details
            </h3>

            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground mb-1">Pricing Model</dt>
                <dd className="font-medium flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold bg-secondary text-secondary-foreground">
                    {tool.pricing_model}
                  </span>
                </dd>
              </div>

              {tool.price_inr_monthly !== null && (
                <div>
                  <dt className="text-muted-foreground mb-1">Starting Price</dt>
                  <dd className="font-medium">
                    ₹{tool.price_inr_monthly} / month
                  </dd>
                </div>
              )}

              {tool.free_tier_details && (
                <div>
                  <dt className="text-muted-foreground mb-1">Free Tier</dt>
                  <dd className="font-medium text-green-600 dark:text-green-500">
                    {tool.free_tier_details}
                  </dd>
                </div>
              )}
            </dl>

            <div className="flex flex-col gap-3 mt-6">
              {tool.website_url &&
                (() => {
                  // Only allow http/https URLs to prevent javascript: XSS
                  let isValidUrl = false;
                  try {
                    const parsed = new URL(tool.website_url);
                    isValidUrl =
                      parsed.protocol === "https:" ||
                      parsed.protocol === "http:";
                  } catch {
                    isValidUrl = false;
                  }
                  return isValidUrl ? (
                    <a
                      href={tool.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground h-10 rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </a>
                  ) : null;
                })()}

              <BookmarkButton
                toolId={tool.id}
                initialBookmarked={initialBookmarked}
                slug={tool.slug}
              />
            </div>
          </div>

          {tool.best_for_india && (
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-sm">
              <h4 className="font-semibold text-primary mb-2 flex items-center">
                🇮🇳 Why it&apos;s good for India
              </h4>
              <p className="text-muted-foreground">{tool.best_for_india}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
