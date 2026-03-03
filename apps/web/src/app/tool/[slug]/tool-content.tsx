/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ToolShortDescription({ tool }: { tool: any }) {
  const { t } = useLanguage();
  return (
    <>{t(tool.description_en, tool.description_hi) || tool.description_en}</>
  );
}

interface ToolHeaderProps {
  tool: any;
  toolCategory: any;
  reviewCount: number;
  ratingAvg: number;
}

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

export function ToolDescription({ tool }: { tool: any }) {
  const { t, ui } = useLanguage();
  const name = t(tool.name_en, tool.name_hi) || tool.name_en;
  const desc =
    t(tool.description_en, tool.description_hi) || tool.description_en;

  return (
    <>
      {/* Short description under header */}
      <p className="text-lg text-muted-foreground mb-4">{desc}</p>

      {/* Detailed About section */}
      {desc && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h3 className="text-xl font-bold mb-4">
            {ui("tool_about_prefix")} {name}
          </h3>
          <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {desc}
          </div>
        </div>
      )}
    </>
  );
}

export function ToolName({ tool }: { tool: any }) {
  const { t } = useLanguage();
  return <>{t(tool.name_en, tool.name_hi) || tool.name_en}</>;
}

export function ToolCategoryBadge({ toolCategory }: { toolCategory: any }) {
  const { t } = useLanguage();
  if (!toolCategory) return null;
  return (
    <Link
      href={`/categories/${toolCategory.slug}`}
      className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-accent text-accent-foreground hover:bg-accent/80"
    >
      {t(toolCategory.name_en, toolCategory.name_hi)}
    </Link>
  );
}

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

export function ReviewsSectionTitle() {
  const { ui } = useLanguage();
  return <h2 className="text-2xl font-bold mb-6">{ui("tool_reviews")}</h2>;
}
