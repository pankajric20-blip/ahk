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
  ToolHindiSummary,
  ToolFeatures,
  ToolProscons,
  ToolUseCases,
  ToolAlternatives,
  ToolScreenshot,
} from "./tool-content";
import { cache } from "react";
import { getLoggedInUser } from "@/components/global/navbar";
import { getLocale, localizeTools } from "@/lib/get-locale";
import { ToolJsonLd, BreadcrumbJsonLd } from "@/components/tool/tool-jsonld";

// Cache tool pages for 10 minutes — serves from edge cache between revalidations
export const revalidate = 600;

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Shared, deduplicated tool fetch.
 * React cache() ensures generateMetadata and the page body
 * share ONE Supabase query per request instead of two.
 */
const fetchTool = cache(async (slug: string) => {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );
  const { data } = await supabase
    .from("ai_tools")
    .select(
      "id, name_en, name_hi, name_hinglish, slug, logo_url, status, " +
        "tagline_en, tagline_hi, tagline_hinglish, " +
        "description_en, description_hi, description_hinglish, " +
        "website_url, pricing_model, price_inr_monthly, price_inr_yearly, " +
        "price_usd_monthly, free_tier_details, trial_days, " +
        "rating_avg, rating_count, review_count, save_count, " +
        "made_in_india, supports_hindi, mobile_friendly, works_offline, " +
        "upi_payment_accepted, gst_compliant, whatsapp_integration, " +
        "access_type, platform, api_available, is_verified, is_featured, " +
        "demo_video_url, is_sponsored, screenshot_url, " +
        "features, pros, cons, use_cases, alternatives, hindi_summary",
    )
    .eq("slug", slug)
    .single();
  return data as any;
});

export async function generateMetadata({ params }: Props) {
  const p = await params;
  const tool = await fetchTool(p.slug);
  if (!tool) return { title: "Tool Not Found - AihKya" };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aihkya.com";
  const title = `${tool.name_en} - AI Tool Reviews & Hindi Guide | AihKya`;
  const description =
    tool.description_en ||
    tool.tagline_en ||
    `${tool.name_en} review, pricing in India, Hindi guide on AihKya.`;
  const toolUrl = `${baseUrl}/tool/${tool.slug}`;

  return {
    title,
    description,
    alternates: { canonical: toolUrl },
    openGraph: {
      title,
      description,
      url: toolUrl,
      siteName: "AihKya",
      type: "website",
      locale: "hi_IN",
      ...(tool.logo_url && {
        images: [
          { url: tool.logo_url, width: 512, height: 512, alt: tool.name_en },
        ],
      }),
    },
    twitter: {
      card: "summary",
      title,
      description,
      ...(tool.logo_url && { images: [tool.logo_url] }),
    },
  };
}

export default async function ToolDetailsPage({ params }: Props) {
  const p = await params;

  const tool = await fetchTool(p.slug);
  if (!tool) notFound();

  const [user, locale, cookieStore] = await Promise.all([
    getLoggedInUser(),
    getLocale(),
    cookies(),
  ]);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookieStore,
  );

  // Fetch locale-specific i18n content (name, tagline, description, summary, arrays)
  // Cast to any — ai_tools_i18n is not yet in the generated Supabase types
  const i18nResult = await (supabase as any)
    .from("ai_tools_i18n")
    .select("name, tagline, description, summary")
    .eq("tool_id", tool.id)
    .eq("locale", locale)
    .maybeSingle();
  const i18n = i18nResult?.data as Record<string, any> | null;

  // Merge pre-localized text fields — keep original JSONB features/pros/cons/use_cases
  // so tool-content.tsx can extract the right locale client-side on language switch.
  const localizedTool = {
    ...tool,
    name: i18n?.name || tool.name_en,
    tagline: i18n?.tagline || tool.tagline_en,
    description: i18n?.description || tool.description_en,
    summary: i18n?.summary || tool.hindi_summary,
    // features/pros/cons/use_cases intentionally NOT overwritten —
    // they remain as JSONB {en:[...], hi:[...], hinglish:[...]} from ai_tools,
    // which lets getLangArray() in tool-content.tsx react to language changes.
  };

  // Build alternatives slug list
  const alternativeSlugs: string[] = Array.isArray(tool.alternatives)
    ? tool.alternatives.filter(Boolean)
    : [];

  // Fetch category, bookmark, reviews, and alternative tools in parallel
  const [catResult, bookmarkResult, reviewsResult, altResult] =
    await Promise.all([
      supabase
        .from("tool_tasks")
        .select("task_categories(name_en, name_hi, name_hinglish, slug)")
        .eq("tool_id", tool.id)
        .limit(1)
        .single(),

      user
        ? supabase
            .from("saved_tools")
            .select("tool_id")
            .eq("user_id", user.id)
            .eq("tool_id", tool.id)
            .maybeSingle()
        : (Promise.resolve({ data: null }) as any),

      supabase
        .from("reviews")
        .select(
          "id, rating, title, review_text, use_case, usage_duration, created_at, user_id, user:profiles(display_name, avatar_url)",
        )
        .eq("tool_id", tool.id)
        .order("created_at", { ascending: false }),

      alternativeSlugs.length > 0
        ? supabase
            .from("ai_tools")
            .select(
              "id, slug, name_en, name_hi, name_hinglish, tagline_en, tagline_hi, tagline_hinglish, logo_url, pricing_model, rating_avg",
            )
            .in("slug", alternativeSlugs)
            .eq("status", "approved")
        : (Promise.resolve({ data: [] }) as any),
    ]);

  let toolCategory: any = null;
  if ((catResult as any).data?.task_categories) {
    toolCategory = (catResult as any).data.task_categories;
  }

  const initialBookmarked = !!bookmarkResult.data;
  const reviews: any[] = (reviewsResult.data as any[]) || [];
  const alternativeTools = localizeTools(
    (altResult.data as any[]) || [],
    locale,
  );

  let currentUserReview: any = null;
  if (user) {
    currentUserReview = reviews.find((r: any) => r.user_id === user.id) || null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Structured data for AEO / Google Rich Results */}
      <ToolJsonLd tool={tool} />
      <BreadcrumbJsonLd
        toolName={tool.name_en}
        toolSlug={tool.slug}
        categoryName={toolCategory?.name_en}
        categorySlug={toolCategory?.slug}
      />

      <ToolDetailBackLink />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ── Main Content ── */}
        <div className="col-span-1 md:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-2xl bg-muted flex items-center justify-center border shrink-0 overflow-hidden">
              <ToolLogo
                logoUrl={localizedTool.logo_url}
                name={localizedTool.name}
                size="lg"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl font-bold">
                  <ToolName tool={localizedTool} />
                </h1>
                {localizedTool.status === "approved" && (
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-amber-500 font-semibold gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 text-sm">
                  <Star className="h-4 w-4 fill-amber-500" />
                  {localizedTool.rating_avg > 0
                    ? localizedTool.rating_avg.toFixed(1)
                    : "New"}
                </div>
                {localizedTool.review_count > 0 && (
                  <span className="text-sm text-muted-foreground">
                    ({localizedTool.review_count} review
                    {localizedTool.review_count !== 1 && "s"})
                  </span>
                )}
              </div>

              {/* Tagline / Short description — shown ONCE here under the header */}
              <p className="text-lg text-muted-foreground mb-4">
                <ToolShortDescription tool={localizedTool} />
              </p>

              <div className="flex flex-wrap gap-2">
                <ToolCategoryBadge toolCategory={toolCategory} />
                {localizedTool.made_in_india && (
                  <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-orange-100 text-orange-800">
                    🇮🇳 Made in India
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Screenshot — only when available */}
          <ToolScreenshot tool={localizedTool} />

          {/* Tutorial video — only when demo_video_url is set */}
          {localizedTool.demo_video_url && (
            <YoutubeTutorialWidget url={localizedTool.demo_video_url} />
          )}

          {/* Summary card (was Hindi-only; now per-locale from ai_tools_i18n) */}
          <ToolHindiSummary tool={localizedTool} />

          {/* About — full description, shown exactly once */}
          <ToolDescription tool={localizedTool} />

          {/* Key Features */}
          <ToolFeatures tool={localizedTool} />

          {/* Pros & Cons */}
          <ToolProscons tool={localizedTool} />

          {/* Use Cases */}
          <ToolUseCases tool={localizedTool} />

          {/* Alternative Tools */}
          {alternativeTools.length > 0 && (
            <ToolAlternatives tools={alternativeTools} />
          )}

          {/* Reviews */}
          <div className="pt-8 border-t mt-8">
            <ReviewsSectionTitle />
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 shrink-0">
                <div className="sticky top-6">
                  <RatingForm
                    toolId={localizedTool.id}
                    slug={localizedTool.slug}
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

        {/* ── Sidebar ── */}
        <div className="col-span-1 border-t md:border-t-0 md:border-l pt-8 md:pt-0 md:pl-8 space-y-6">
          <ToolSidebar tool={localizedTool} />
          <BookmarkButton
            toolId={localizedTool.id}
            initialBookmarked={initialBookmarked}
            slug={localizedTool.slug}
          />
        </div>
      </div>
    </div>
  );
}
