/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Check,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Users,
  Image as ImageIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ToolLogo } from "@/components/tool/tool-logo";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Pick the right language array from a JSONB {en, hi, hinglish} object */
function getLangArray(jsonb: any, lang: string): string[] {
  if (!jsonb) return [];
  return (jsonb[lang] as string[]) || (jsonb["en"] as string[]) || [];
}

// ─── Back Link ────────────────────────────────────────────────────────────────

export function ToolDetailBackLink() {
  const { ui } = useLanguage();
  return (
    <Link
      href="/"
      className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {ui("tool_back")}
    </Link>
  );
}

// ─── Names & Short Description ────────────────────────────────────────────────

export function ToolName({ tool }: { tool: any }) {
  const { t } = useLanguage();
  return (
    <>{t(tool.name_en, tool.name_hi, tool.name_hinglish) || tool.name_en}</>
  );
}

export function ToolShortDescription({ tool }: { tool: any }) {
  const { t } = useLanguage();
  // Show tagline under the header — shorter marketing line
  const tagline = t(tool.tagline_en, tool.tagline_hi, tool.tagline_hinglish);
  if (tagline) return <>{tagline}</>;
  // Fallback: first sentence of description
  const desc =
    t(tool.description_en, tool.description_hi, tool.description_hinglish) ||
    tool.description_en ||
    "";
  const firstSentence = desc.split(/[.।]/)[0].trim();
  return <>{firstSentence || desc}</>;
}

// ─── Category Badge ───────────────────────────────────────────────────────────

export function ToolCategoryBadge({ toolCategory }: { toolCategory: any }) {
  const { t } = useLanguage();
  if (!toolCategory) return null;
  return (
    <Link
      href={`/categories/${toolCategory.slug}`}
      className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-accent text-accent-foreground hover:bg-accent/80"
    >
      {t(
        toolCategory.name_en,
        toolCategory.name_hi,
        toolCategory.name_hinglish,
      )}
    </Link>
  );
}

// ─── About / Description (shown ONCE) ────────────────────────────────────────

export function ToolDescription({ tool }: { tool: any }) {
  const { t, ui } = useLanguage();
  const name =
    t(tool.name_en, tool.name_hi, tool.name_hinglish) || tool.name_en;
  const desc =
    t(tool.description_en, tool.description_hi, tool.description_hinglish) ||
    tool.description_en;

  if (!desc) return null;

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <h3 className="text-xl font-bold mb-3">
        {ui("tool_about_prefix")} {name}
      </h3>
      <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
        {desc}
      </div>
    </div>
  );
}

// ─── Screenshot ───────────────────────────────────────────────────────────────

export function ToolScreenshot({ tool }: { tool: any }) {
  const { ui } = useLanguage();
  if (!tool.screenshot_url) return null;

  return (
    <div className="rounded-xl overflow-hidden border bg-card shadow-sm">
      <div className="bg-muted px-4 py-3 border-b flex items-center gap-2">
        <ImageIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">
          {ui("tool_screenshot")}
        </span>
      </div>
      <div className="relative w-full aspect-video bg-muted">
        <Image
          src={tool.screenshot_url}
          alt={`${tool.name_en} screenshot`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
    </div>
  );
}

// ─── Hindi Summary Card ───────────────────────────────────────────────────────

export function ToolHindiSummary({ tool }: { tool: any }) {
  const { ui } = useLanguage();
  if (!tool.hindi_summary) return null;

  return (
    <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🇮🇳</span>
        <h3 className="font-semibold text-orange-700 dark:text-orange-400">
          {ui("tool_hindi_summary")}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-foreground/90">
        {tool.hindi_summary}
      </p>
    </div>
  );
}

// ─── Key Features ─────────────────────────────────────────────────────────────

export function ToolFeatures({ tool }: { tool: any }) {
  const { language, ui } = useLanguage();
  const features = getLangArray(tool.features, language);
  if (!features.length) return null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        {ui("tool_features")}
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
            <span className="text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Pros & Cons ──────────────────────────────────────────────────────────────

export function ToolProscons({ tool }: { tool: any }) {
  const { language, ui } = useLanguage();
  const pros = getLangArray(tool.pros, language);
  const cons = getLangArray(tool.cons, language);
  if (!pros.length && !cons.length) return null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{ui("tool_pros_cons")}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pros.length > 0 && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <ThumbsUp className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-sm text-green-700 dark:text-green-400">
                {ui("tool_pros")}
              </span>
            </div>
            <ul className="space-y-2">
              {pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5 shrink-0">+</span>
                  <span className="text-foreground/90">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {cons.length > 0 && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <ThumbsDown className="h-4 w-4 text-red-600" />
              <span className="font-semibold text-sm text-red-700 dark:text-red-400">
                {ui("tool_cons")}
              </span>
            </div>
            <ul className="space-y-2">
              {cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-red-500 mt-0.5 shrink-0">−</span>
                  <span className="text-foreground/90">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Use Cases ────────────────────────────────────────────────────────────────

export function ToolUseCases({ tool }: { tool: any }) {
  const { language, ui } = useLanguage();
  const useCases = getLangArray(tool.use_cases, language);
  if (!useCases.length) return null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        {ui("tool_use_cases")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {useCases.map((uc, i) => (
          <span
            key={i}
            className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1.5 text-sm text-primary font-medium"
          >
            {uc}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Alternative Tools ────────────────────────────────────────────────────────

interface AlternativeToolData {
  id: string;
  slug: string;
  name_en: string;
  name_hi: string | null;
  name_hinglish: string | null;
  tagline_en: string | null;
  tagline_hi: string | null;
  tagline_hinglish: string | null;
  logo_url: string | null;
  pricing_model: string;
  rating_avg: number;
}

export function ToolAlternatives({ tools }: { tools: AlternativeToolData[] }) {
  const { t, ui } = useLanguage();
  if (!tools.length) return null;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">{ui("tool_alternatives")}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {tools.map((alt) => {
          const name =
            t(alt.name_en, alt.name_hi, alt.name_hinglish) || alt.name_en;
          const tagline = t(
            alt.tagline_en,
            alt.tagline_hi,
            alt.tagline_hinglish,
          );
          return (
            <Link
              key={alt.slug}
              href={`/tool/${alt.slug}`}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center hover:bg-accent/50 hover:border-primary/30 transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center border overflow-hidden shrink-0">
                <ToolLogo logoUrl={alt.logo_url} name={alt.name_en} size="sm" />
              </div>
              <div className="min-w-0 w-full">
                <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                  {name}
                </p>
                {tagline && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {tagline}
                  </p>
                )}
                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs mt-1.5 bg-secondary text-secondary-foreground">
                  {alt.pricing_model}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function ToolSidebar({ tool }: { tool: any }) {
  const { ui } = useLanguage();

  const isValidUrl = (() => {
    try {
      const parsed = new URL(tool.website_url || "");
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
      return false;
    }
  })();

  return (
    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
      <h3 className="font-semibold mb-4 text-lg border-b pb-2">
        {ui("tool_details")}
      </h3>
      <dl className="space-y-4 text-sm">
        <div>
          <dt className="text-muted-foreground mb-1">
            {ui("tool_pricing_model")}
          </dt>
          <dd className="font-medium flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold bg-secondary text-secondary-foreground">
              {tool.pricing_model}
            </span>
          </dd>
        </div>
        {tool.price_inr_monthly !== null && (
          <div>
            <dt className="text-muted-foreground mb-1">
              {ui("tool_starting_price")}
            </dt>
            <dd className="font-medium">₹{tool.price_inr_monthly} / month</dd>
          </div>
        )}
        {tool.free_tier_details && (
          <div>
            <dt className="text-muted-foreground mb-1">
              {ui("tool_free_tier")}
            </dt>
            <dd className="font-medium text-green-600 dark:text-green-500">
              {tool.free_tier_details}
            </dd>
          </div>
        )}
      </dl>

      <div className="flex flex-col gap-3 mt-6">
        {tool.website_url && isValidUrl && (
          <a
            href={tool.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground h-10 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            {ui("tool_visit_website")}
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Reviews Section Title ────────────────────────────────────────────────────

export function ReviewsSectionTitle() {
  const { ui } = useLanguage();
  return <h2 className="text-2xl font-bold mb-6">{ui("tool_reviews")}</h2>;
}
