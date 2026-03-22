"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolLogo } from "./tool-logo";
import { useLanguage } from "@/contexts/LanguageContext";

// Pre-localized shape — server components compute name/tagline before passing here.
// All list/search/dashboard pages pass this shape; t() is no longer needed for tool data.
export interface LocalizedTool {
  id: string;
  slug: string;
  logo_url?: string | null;
  pricing_model?: string | null;
  price_inr_monthly?: number | null;
  rating_avg?: number | null;
  rating_count?: number | null;
  name: string;
  tagline?: string | null;
  description?: string | null;
  made_in_india?: boolean | null;
  upi_payment_accepted?: boolean | null;
  gst_compliant?: boolean | null;
}

interface ToolCardProps {
  tool: LocalizedTool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { ui } = useLanguage();

  return (
    <div className="group relative rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
      <div className="flex flex-col p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden shrink-0">
            <ToolLogo logoUrl={tool.logo_url} name={tool.name} size="lg" />
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
              {tool.pricing_model === "free"
                ? ui("common_bilkul_free")
                : tool.pricing_model}
            </span>
            {tool.price_inr_monthly && (
              <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
                ₹{tool.price_inr_monthly} / mo
              </span>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          <Link
            href={`/tool/${tool.slug}`}
            className="before:absolute before:inset-0"
          >
            {tool.name}
          </Link>
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {tool.tagline || tool.description}
        </p>

        {/* Indian Context Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.made_in_india && (
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
              Made In India 🇮🇳
            </span>
          )}
          {tool.upi_payment_accepted && (
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              UPI Accepted
            </span>
          )}
          {tool.gst_compliant && (
            <span className="text-[10px] font-bold px-2 py-1 rounded border border-input text-muted-foreground">
              GST Bill
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center text-amber-500">
            <span className="text-sm font-medium mr-1">
              {tool.rating_avg && tool.rating_avg > 0
                ? tool.rating_avg.toFixed(1)
                : ui("tool_new")}
            </span>
            ★
          </div>
          <span className="text-sm font-medium text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
            {ui("tool_details")} <ArrowRight className="ml-1 h-3 w-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
