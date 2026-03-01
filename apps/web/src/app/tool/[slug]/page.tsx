/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";
import { BookmarkButton } from "@/components/tool/bookmark-button";
import { ToolLogo } from "@/components/tool/tool-logo";
import { RatingForm } from "@/components/tool/rating-form";
import { ReviewList } from "@/components/tool/review-list";
import { Star } from "lucide-react";
import { YoutubeTutorialWidget } from "@/components/tool/youtube-tutorial-widget";

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
    .from("ai_tools")
    .select("name_en, description_en")
    .eq("slug", p.slug)
    .single();
  const tool: any = data;

  if (!tool) return { title: "Tool Not Found - Aihkya" };

  return {
    title: `${tool.name_en} - AI Tool Details | Aihkya`,
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

  // Fetch tool data
  const { data: dbTool } = await supabase
    .from("ai_tools")
    .select("*")
    .eq("slug", p.slug)
    .single();

  const tool: any = dbTool;

  if (!tool) {
    notFound();
  }

  let toolCategory: any = null;
  // Fetch first category for the tool if exists
  const { data: catMapping } = await supabase
    .from("tool_tasks")
    .select("task_categories(name_en, slug)")
    .eq("tool_id", tool.id)
    .limit(1)
    .single();

  if (catMapping && (catMapping as any).task_categories) {
    toolCategory = (catMapping as any).task_categories;
  }

  // Check if user has bookmarked this tool
  let initialBookmarked = false;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: bookmark } = await supabase
      .from("saved_tools")
      .select("tool_id")
      .eq("user_id", user.id)
      .eq("tool_id", tool.id)
      .single();
    if (bookmark) initialBookmarked = true;
  }

  // Fetch reviews for this tool
  const { data: reviewsData } = await supabase
    .from("reviews")
    .select(
      `
      id,
      rating,
      title,
      review_text,
      use_case,
      usage_duration,
      created_at,
      user_id,
      user:profiles(display_name, avatar_url)
    `,
    )
    .eq("tool_id", tool.id)
    .order("created_at", { ascending: false });

  const reviews: any[] = (reviewsData as any[]) || [];

  let currentUserReview: any = null;
  if (user) {
    currentUserReview = reviews.find((r: any) => r.user_id === user.id) || null;
  }

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
              <ToolLogo logoUrl={tool.logo_url} name={tool.name_en} size="lg" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{tool.name_en}</h1>
                {tool.status === "approved" && (
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                )}
              </div>
              {/* Rating Summary */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-amber-500 font-semibold gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 text-sm">
                  <Star className="h-4 w-4 fill-amber-500" />
                  {tool.rating_avg > 0 ? tool.rating_avg.toFixed(1) : "New"}
                </div>
                {tool.review_count > 0 && (
                  <span className="text-sm text-muted-foreground">
                    ({tool.review_count} review{tool.review_count !== 1 && "s"})
                  </span>
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
                  {toolCategory.name_en}
                </Link>
              )}
              {tool.made_in_india && (
                <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-orange-100 text-orange-800 ml-2">
                  🇮🇳 Made in India
                </span>
              )}
            </div>
          </div>

          {/* Hindi Tutorial Video */}
          <YoutubeTutorialWidget url={tool.demo_video_url} />

          {/* Detailed Description */}
          {tool.description_en && (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold mb-4">About {tool.name_en}</h3>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {tool.description_en}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="pt-8 border-t mt-8">
            <h2 className="text-2xl font-bold mb-6">Reviews & Ratings</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 shrink-0">
                <div className="sticky top-6">
                  <RatingForm
                    toolId={tool.id}
                    slug={tool.slug}
                    isLoggedIn={!!user}
                    initialRating={currentUserReview?.rating || 0}
                    initialTitle={currentUserReview?.title || ""}
                    initialReview={currentUserReview?.review_text || ""}
                    initialUseCase={currentUserReview?.use_case || ""}
                    initialUsageDuration={
                      currentUserReview?.usage_duration || ""
                    }
                  />
                </div>
              </div>
              <div className="flex-1 w-full">
                <ReviewList reviews={reviews as any} />
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
}
