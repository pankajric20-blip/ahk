/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@aihkya/db";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { CheckCircle2, Star } from "lucide-react";
import { BookmarkButton } from "@/components/tool/bookmark-button";
import { ToolLogo } from "@/components/tool/tool-logo";
import { RatingForm } from "@/components/tool/rating-form";
import { ReviewList } from "@/components/tool/review-list";
import { YoutubeTutorialWidget } from "@/components/tool/youtube-tutorial-widget";
import {
  ToolDetailBackLink,
  ToolDescription,
  ToolName,
  ToolShortDescription,
  ToolCategoryBadge,
  ToolSidebar,
  ReviewsSectionTitle,
} from "./tool-content";

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

  const { data: dbTool } = await supabase
    .from("ai_tools")
    .select("*")
    .eq("slug", p.slug)
    .single();
  const tool: any = dbTool;
  if (!tool) notFound();

  let toolCategory: any = null;
  const { data: catMapping } = await supabase
    .from("tool_tasks")
    .select("task_categories(name_en, name_hi, slug)")
    .eq("tool_id", tool.id)
    .limit(1)
    .single();
  if (catMapping && (catMapping as any).task_categories) {
    toolCategory = (catMapping as any).task_categories;
  }

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

  const { data: reviewsData } = await supabase
    .from("reviews")
    .select(
      `id, rating, title, review_text, use_case, usage_duration, created_at, user_id, user:profiles(display_name, avatar_url)`,
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
      <ToolDetailBackLink />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-1 md:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-2xl bg-muted flex items-center justify-center border shrink-0 overflow-hidden">
              <ToolLogo logoUrl={tool.logo_url} name={tool.name_en} size="lg" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">
                  <ToolName tool={tool} />
                </h1>
                {tool.status === "approved" && (
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                )}
              </div>
              {/* Rating */}
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
              {/* Short description — language-reactive */}
              <p className="text-lg text-muted-foreground mb-4">
                <ToolShortDescription tool={tool} />
              </p>
              <div className="flex flex-wrap gap-2">
                <ToolCategoryBadge toolCategory={toolCategory} />
                {tool.made_in_india && (
                  <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-orange-100 text-orange-800">
                    🇮🇳 Made in India
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tutorial Video */}
          <YoutubeTutorialWidget
            url={
              tool.demo_video_url ||
              `https://www.youtube.com/results?search_query=${encodeURIComponent(
                tool.name_en + " hindi tutorial",
              )}`
            }
          />

          {/* Full About section — language-reactive */}
          <ToolDescription tool={tool} />

          {/* Reviews */}
          <div className="pt-8 border-t mt-8">
            <ReviewsSectionTitle />
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

        {/* Sidebar */}
        <div className="col-span-1 border-t md:border-t-0 md:border-l pt-8 md:pt-0 md:pl-8 space-y-6">
          <ToolSidebar tool={tool} />
          <BookmarkButton
            toolId={tool.id}
            initialBookmarked={initialBookmarked}
            slug={tool.slug}
          />
        </div>
      </div>
    </div>
  );
}
