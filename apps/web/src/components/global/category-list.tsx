"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Category {
  id: string;
  slug: string;
  name_en: string | null;
  name_hi: string | null;
  icon?: string | null;
}

export function CategoryList({ categories }: { categories: Category[] }) {
  const { t, ui } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => {
        const name = t(category.name_en, category.name_hi);
        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group flex flex-col p-6 rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all text-card-foreground"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform text-xl">
                {category.icon || <Sparkles className="h-5 w-5" />}
              </div>
              <h3 className="font-semibold text-lg">{name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-auto line-clamp-2">
              {ui("cats_discover_desc").replace("{name}", name)}
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
              {ui("cats_explore_label")} <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
