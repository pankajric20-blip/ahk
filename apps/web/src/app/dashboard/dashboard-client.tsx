"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  Star,
  Zap,
  ThumbsUp,
  LogOut,
  ExternalLink,
  ChevronRight,
  Trophy,
  Flame,
  User,
  MapPin,
  Briefcase,
  Calendar,
  Search,
  Plus,
  ArrowUpRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────
interface UserInfo {
  id: string;
  email: string;
  avatar_url: string | null;
  display_name: string;
  user_type: string | null;
  city: string | null;
  state: string | null;
  business_name: string | null;
  is_ai_champion: boolean;
  member_since: string | null;
}

interface Stats {
  saved: number;
  reviews: number;
  karma: number;
  helpful_votes: number;
}

interface SavedTool {
  id: string;
  name_en: string;
  name_hi: string | null;
  name_hinglish: string | null;
  slug: string;
  logo_url: string | null;
  pricing_model: string;
  rating_avg: number | null;
  tagline_en: string | null;
  tagline_hi: string | null;
  tagline_hinglish: string | null;
  made_in_india: boolean | null;
  is_featured: boolean | null;
}

interface Review {
  id: string;
  rating: number;
  title: string | null;
  review_text: string;
  created_at: string | null;
  status: string | null;
  tool: {
    id: string;
    name_en: string;
    slug: string;
    logo_url: string | null;
  } | null;
}

interface DashboardClientProps {
  user: UserInfo;
  stats: Stats;
  savedTools: SavedTool[];
  reviews: Review[];
}

// ─── Avatar component ─────────────────────────────────────────────────────────
function Avatar({ user }: { user: UserInfo }) {
  const initials = user.display_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (user.avatar_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.avatar_url}
        alt={user.display_name}
        className="w-full h-full object-cover"
      />
    );
  }
  return <span className="text-2xl font-bold text-primary">{initials}</span>;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border bg-card px-6 py-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all group"
      style={{ borderColor: `color-mix(in oklch, ${color} 30%, transparent)` }}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `color-mix(in oklch, ${color} 15%, transparent)` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
      </div>
      <div
        className="absolute inset-y-0 right-0 w-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: color }}
      />
    </div>
  );
}

// ─── Tool Logo ────────────────────────────────────────────────────────────────
function ToolLogoSmall({
  logoUrl,
  name,
}: {
  logoUrl: string | null;
  name: string;
}) {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logoUrl} alt={name} className="w-full h-full object-contain" />
    );
  }
  return (
    <span className="text-sm font-bold text-primary">
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i <= rating ? "text-amber-400" : "text-muted-foreground/30"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Pricing label helper ─────────────────────────────────────────────────────
function pricingLabel(model: string, freeLabel: string) {
  if (model === "free") return freeLabel;
  return model.replace(/_/g, " ");
}

// ─── Review status badge helper ───────────────────────────────────────────────
function StatusBadge({
  status,
  publishedLabel,
  pendingLabel,
  flaggedLabel,
}: {
  status: string;
  publishedLabel: string;
  pendingLabel: string;
  flaggedLabel: string;
}) {
  const map: Record<string, { cls: string; label: string }> = {
    published: {
      cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      label: publishedLabel,
    },
    pending: {
      cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      label: pendingLabel,
    },
    flagged: {
      cls: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
      label: flaggedLabel,
    },
  };
  const entry = map[status] ?? {
    cls: "bg-muted text-muted-foreground",
    label: status,
  };
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${entry.cls}`}
    >
      {entry.label}
    </span>
  );
}

// ─── Main Dashboard Component ─────────────────────────────────────────────────
export function DashboardClient({
  user,
  stats,
  savedTools,
  reviews,
}: DashboardClientProps) {
  const { ui, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"saved" | "reviews">("saved");

  const tabs = [
    {
      key: "saved" as const,
      label: ui("dashboard_tab_saved"),
      icon: <Bookmark className="w-4 h-4" />,
      count: stats.saved,
    },
    {
      key: "reviews" as const,
      label: ui("dashboard_tab_reviews"),
      icon: <Star className="w-4 h-4" />,
      count: stats.reviews,
    },
  ];

  const quickActions = [
    {
      href: "/tools",
      icon: <Search className="w-4 h-4" />,
      label: ui("dashboard_explore_tools"),
    },
    {
      href: "/categories",
      icon: <BookOpen className="w-4 h-4" />,
      label: ui("dashboard_browse_categories"),
    },
    {
      href: "/new",
      icon: <Plus className="w-4 h-4" />,
      label: ui("dashboard_submit_tool"),
    },
    {
      href: "/free",
      icon: <Sparkles className="w-4 h-4" />,
      label: ui("dashboard_free_tools"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Top Hero Banner ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-border bg-card">
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 50%, oklch(0.62 0.2 270) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, oklch(0.65 0.18 200) 0%, transparent 60%)`,
          }}
        />
        <div className="relative container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* User info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl border-2 border-primary/20 bg-primary/10 flex items-center justify-center overflow-hidden shadow-md flex-shrink-0">
                <Avatar user={user} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold tracking-tight">
                    {user.display_name}
                  </h1>
                  {user.is_ai_champion && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      <Trophy className="w-3 h-3" />{" "}
                      {ui("dashboard_badge_champion")}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
                  {user.user_type && (
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {user.user_type.replace(/_/g, " ")}
                    </span>
                  )}
                  {(user.city || user.state) && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {[user.city, user.state].filter(Boolean).join(", ")}
                    </span>
                  )}
                  {user.business_name && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      {user.business_name}
                    </span>
                  )}
                  {user.member_since && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {user.member_since}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Sign out */}
            <form
              action="/auth/signout"
              method="post"
              className="flex-shrink-0"
            >
              <button
                type="submit"
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {ui("dashboard_sign_out")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ── LEFT SIDEBAR ──────────────────────────────────────────── */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {/* Stats */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {ui("dashboard_your_activity")}
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: <Bookmark className="w-4 h-4 text-primary" />,
                    label: ui("dashboard_stat_saved"),
                    value: stats.saved,
                  },
                  {
                    icon: <Star className="w-4 h-4 text-amber-500" />,
                    label: ui("dashboard_stat_reviews"),
                    value: stats.reviews,
                  },
                  {
                    icon: <Zap className="w-4 h-4 text-violet-500" />,
                    label: ui("dashboard_stat_karma"),
                    value: stats.karma,
                  },
                  {
                    icon: <ThumbsUp className="w-4 h-4 text-emerald-500" />,
                    label: ui("dashboard_stat_helpful"),
                    value: stats.helpful_votes,
                  },
                ].map((item, idx, arr) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between py-2 ${idx < arr.length - 1 ? "border-b border-border/50" : ""}`}
                  >
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      {item.icon}
                      {item.label}
                    </span>
                    <span className="font-bold text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {ui("dashboard_quick_actions")}
              </h2>
              <div className="flex flex-col gap-1">
                {quickActions.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-primary/8 hover:text-primary transition-all group"
                  >
                    <span className="group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    {item.label}
                    <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending badge */}
            <div className="rounded-2xl border bg-gradient-to-br from-primary/10 to-violet-500/10 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                  {ui("dashboard_trending_now")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {ui("dashboard_trending_desc")}
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                {ui("dashboard_see_trending")}{" "}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ── RIGHT MAIN PANEL ──────────────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Stats bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard
                icon={<Bookmark className="w-5 h-5" />}
                label={ui("dashboard_stat_saved")}
                value={stats.saved}
                color="oklch(0.52 0.18 270)"
              />
              <StatCard
                icon={<Star className="w-5 h-5" />}
                label={ui("dashboard_stat_reviews")}
                value={stats.reviews}
                color="oklch(0.75 0.18 50)"
              />
              <StatCard
                icon={<Zap className="w-5 h-5" />}
                label={ui("dashboard_stat_karma")}
                value={stats.karma}
                color="oklch(0.65 0.2 290)"
              />
              <StatCard
                icon={<ThumbsUp className="w-5 h-5" />}
                label={ui("dashboard_stat_helpful")}
                value={stats.helpful_votes}
                color="oklch(0.65 0.18 160)"
              />
            </div>

            {/* Tabs */}
            <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
              {/* Tab nav */}
              <div className="flex border-b border-border bg-muted/30">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all relative ${
                      activeTab === tab.key
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                    {tab.count > 0 && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          activeTab === tab.key
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                    {activeTab === tab.key && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-6">
                {/* ── Saved Tools Tab ─────────────────────────────────── */}
                {activeTab === "saved" && (
                  <>
                    {savedTools.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                          <Bookmark className="w-8 h-8 text-muted-foreground/40" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                          {ui("dashboard_saved_empty_title")}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-xs mb-6">
                          {ui("dashboard_saved_empty_desc")}
                        </p>
                        <Link
                          href="/tools"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          <Search className="w-4 h-4" />
                          {ui("dashboard_explore_ai_tools")}
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {savedTools.map((tool) => {
                            const toolName = t(
                              tool.name_en,
                              tool.name_hi,
                              tool.name_hinglish,
                            );
                            const toolTagline = t(
                              tool.tagline_en,
                              null,
                              tool.tagline_hinglish,
                            );
                            return (
                              <Link
                                key={tool.id}
                                href={`/tool/${tool.slug}`}
                                className="group flex items-start gap-4 p-4 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all"
                              >
                                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                                  <ToolLogoSmall
                                    logoUrl={tool.logo_url}
                                    name={toolName}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                                      {toolName}
                                    </h3>
                                    {tool.made_in_india && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 flex-shrink-0">
                                        🇮🇳 {ui("dashboard_badge_india")}
                                      </span>
                                    )}
                                    {tool.is_featured && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 flex-shrink-0">
                                        ✦ {ui("dashboard_badge_featured")}
                                      </span>
                                    )}
                                  </div>
                                  {toolTagline && (
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                      {toolTagline}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-3 mt-2">
                                    {tool.rating_avg && tool.rating_avg > 0 ? (
                                      <div className="flex items-center gap-1">
                                        <StarRating
                                          rating={Math.round(tool.rating_avg)}
                                        />
                                        <span className="text-[10px] text-muted-foreground font-medium">
                                          {tool.rating_avg.toFixed(1)}
                                        </span>
                                      </div>
                                    ) : null}
                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground capitalize">
                                      {pricingLabel(
                                        tool.pricing_model,
                                        ui("common_free"),
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary/60 flex-shrink-0 transition-colors mt-0.5" />
                              </Link>
                            );
                          })}
                        </div>
                        {stats.saved > 6 && (
                          <div className="mt-4 text-center">
                            <p className="text-sm text-muted-foreground">
                              {ui("dashboard_showing_of").replace(
                                "{n}",
                                String(stats.saved),
                              )}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* ── Reviews Tab ─────────────────────────────────────── */}
                {activeTab === "reviews" && (
                  <>
                    {reviews.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                          <Star className="w-8 h-8 text-muted-foreground/40" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                          {ui("dashboard_reviews_empty_title")}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-xs mb-6">
                          {ui("dashboard_reviews_empty_desc")}
                        </p>
                        <Link
                          href="/tools"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          <Star className="w-4 h-4" />
                          {ui("dashboard_find_tools_to_review")}
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {reviews.map((review) => (
                          <div
                            key={review.id}
                            className="p-4 rounded-xl border border-border/60 hover:border-primary/30 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              {review.tool && (
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                                  <ToolLogoSmall
                                    logoUrl={review.tool.logo_url}
                                    name={review.tool.name_en}
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <div>
                                    {review.tool ? (
                                      <Link
                                        href={`/tool/${review.tool.slug}`}
                                        className="text-sm font-semibold hover:text-primary transition-colors"
                                      >
                                        {review.tool.name_en}
                                      </Link>
                                    ) : (
                                      <span className="text-sm font-semibold">
                                        —
                                      </span>
                                    )}
                                    <div className="flex items-center gap-2 mt-1">
                                      <StarRating rating={review.rating} />
                                      <span className="text-xs text-muted-foreground">
                                        {review.rating}/5
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {review.status && (
                                      <StatusBadge
                                        status={review.status}
                                        publishedLabel={ui(
                                          "dashboard_status_published",
                                        )}
                                        pendingLabel={ui(
                                          "dashboard_status_pending",
                                        )}
                                        flaggedLabel={ui(
                                          "dashboard_status_flagged",
                                        )}
                                      />
                                    )}
                                    {review.created_at && (
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(
                                          review.created_at,
                                        ).toLocaleDateString("en-IN", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {review.title && (
                                  <p className="text-sm font-medium mt-2">
                                    {review.title}
                                  </p>
                                )}
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {review.review_text}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
