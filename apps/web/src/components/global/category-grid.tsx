"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Category {
  id: string;
  slug: string;
  name_en: string | null;
  name_hi: string | null;
}

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  const { t, language } = useLanguage();

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          {language === "hi"
            ? "श्रेणी के अनुसार खोजें"
            : language === "hinglish"
              ? "Category ke hisaab se browse karein"
              : "Browse by Category"}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === "hi"
            ? "हमारे संगठित संग्रह में वह खोजें जो आपको चाहिए।"
            : language === "hinglish"
              ? "Apni zaroorat ke hisaab se best AI tools dhundho."
              : "Find exactly what you need by exploring our organized collections."}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group flex flex-col items-center justify-center p-6 rounded-xl border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all text-center"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">
              {t(category.name_en, category.name_hi)}
            </h3>
          </Link>
        ))}
      </div>
    </>
  );
}
