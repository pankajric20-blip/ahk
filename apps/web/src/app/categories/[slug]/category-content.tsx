/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Link from "next/link";
import { Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ToolCard } from "@/components/tool/tool-card";

interface CategoryPageContentProps {
  category: { name_en: string; name_hi: string | null; slug: string };
  tools: any[];
  activePricing: string[];
  slug: string;
}

export function CategoryPageContent({
  category,
  tools,
  activePricing,
  slug,
}: CategoryPageContentProps) {
  const { t, ui } = useLanguage();
  const catName = t(category.name_en, category.name_hi);

  return (
    <div className="mb-12 space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">
        {catName} {ui("cat_tools_suffix")}
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl">
        {ui("cat_browse_desc")
          .replace("{n}", String(tools.length))
          .replace("{cat}", catName.toLowerCase())}
        {activePricing.length > 0 && (
          <span className="ml-1 text-sm text-primary">
            ({ui("cat_filtered")} {activePricing.join(", ")})
          </span>
        )}
      </p>
    </div>
  );
}

export function CategoryFiltersHeader() {
  const { ui } = useLanguage();
  return (
    <div className="flex items-center gap-2 font-semibold text-lg border-b pb-2">
      <Filter className="h-5 w-5" />
      {ui("cat_filters")}
    </div>
  );
}

export function CategoryPricingLabel() {
  const { ui } = useLanguage();
  return <h4 className="font-medium">{ui("cat_pricing")}</h4>;
}

export function CategoryEmptyState({
  activePricing,
  slug,
}: {
  activePricing: string[];
  slug: string;
}) {
  const { ui } = useLanguage();
  return (
    <div className="col-span-full py-12 text-center border rounded-xl border-dashed bg-muted/20">
      <p className="text-muted-foreground text-lg">
        {activePricing.length > 0
          ? ui("cat_no_tools_filtered").replace(
              "{pricing}",
              activePricing.join(" / "),
            )
          : ui("cat_no_tools")}
      </p>
      {activePricing.length > 0 && (
        <Link
          href={`/categories/${slug}`}
          className="mt-4 inline-flex items-center justify-center h-9 px-4 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent transition-colors"
        >
          {ui("cat_clear_filters")}
        </Link>
      )}
    </div>
  );
}
