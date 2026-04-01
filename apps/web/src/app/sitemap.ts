import { MetadataRoute } from "next";
import { createServerClient } from "@aihkya/db";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aihkya.com";

export const revalidate = 3600; // Rebuild sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use an empty cookie store — sitemap only reads public data
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { getAll: () => [] },
  );

  // Fetch all approved tool slugs — cast to any as updated_at may not be in generated types
  const { data: toolsRaw } = await (supabase as any)
    .from("ai_tools")
    .select("slug, updated_at")
    .eq("status", "approved")
    .order("updated_at", { ascending: false });
  const tools: Array<{ slug: string; updated_at: string | null }> =
    toolsRaw ?? [];

  // Fetch all category slugs
  const { data: categoriesRaw } = await (supabase as any)
    .from("task_categories")
    .select("slug, updated_at");
  const categories: Array<{ slug: string; updated_at: string | null }> =
    categoriesRaw ?? [];

  const toolUrls: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: tool.updated_at ? new Date(tool.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/free`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  return [...staticPages, ...toolUrls, ...categoryUrls];
}
