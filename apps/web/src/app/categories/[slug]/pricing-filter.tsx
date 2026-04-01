"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPricingKey } from "@/lib/pricing";

// DB/URL values stay in English — only display labels are translated
const PRICING_OPTIONS = [
  { value: "Free", dbKey: "free" },
  { value: "Freemium", dbKey: "freemium" },
  { value: "Paid", dbKey: "paid" },
] as const;

interface PricingFilterProps {
  selected: string[];
}

/**
 * Pricing filter checkboxes that update the URL search params.
 * The server component reads `?pricing=Free,Paid` and filters the tool list.
 * Display labels are translated; URL/DB values remain English.
 */
export function PricingFilter({ selected }: PricingFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { ui } = useLanguage();

  const toggle = useCallback(
    (value: string) => {
      const current = new URLSearchParams(searchParams.toString());
      const existing = current.get("pricing")?.split(",").filter(Boolean) ?? [];

      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];

      if (next.length > 0) {
        current.set("pricing", next.join(","));
      } else {
        current.delete("pricing");
      }

      router.push(`${pathname}?${current.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="space-y-2">
      {PRICING_OPTIONS.map(({ value, dbKey }) => (
        <label
          key={value}
          className="flex items-center gap-2 text-sm cursor-pointer select-none"
        >
          <input
            type="checkbox"
            checked={selected.includes(value)}
            onChange={() => toggle(value)}
            className="rounded border-input text-primary focus:ring-primary h-4 w-4"
          />
          {ui(getPricingKey(dbKey))}
          {selected.includes(value) && (
            <span className="ml-auto text-[10px] text-primary font-semibold uppercase tracking-wide">
              {ui("filter_active")}
            </span>
          )}
        </label>
      ))}
      {selected.length > 0 && (
        <button
          type="button"
          onClick={() => {
            const current = new URLSearchParams(searchParams.toString());
            current.delete("pricing");
            router.push(`${pathname}?${current.toString()}`);
          }}
          className="text-xs text-muted-foreground hover:text-destructive transition-colors mt-1"
        >
          {ui("cat_clear_filters")}
        </button>
      )}
    </div>
  );
}
