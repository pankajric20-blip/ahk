/**
 * JSON-LD structured data for AI tool detail pages.
 * Implements Schema.org SoftwareApplication + AggregateRating.
 * Improves AEO (AI Engine Optimization) and Google rich results.
 */

interface ToolJsonLdProps {
  tool: {
    name_en: string;
    description_en?: string | null;
    tagline_en?: string | null;
    logo_url?: string | null;
    screenshot_url?: string | null;
    website_url?: string | null;
    pricing_model?: string | null;
    price_inr_monthly?: number | null;
    rating_avg?: number | null;
    rating_count?: number | null;
    review_count?: number | null;
    slug: string;
    platform?: string[] | null;
    api_available?: boolean | null;
    access_type?: string | null;
  };
}

const PRICING_TO_SCHEMA: Record<string, string> = {
  free: "https://schema.org/Free",
  freemium: "https://schema.org/Freemium",
  paid: "https://schema.org/Paid",
  free_trial: "https://schema.org/Free",
  enterprise: "https://schema.org/Paid",
  contact_sales: "https://schema.org/Paid",
  open_source: "https://schema.org/Free",
};

export function ToolJsonLd({ tool }: ToolJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aihkya.com";
  const toolUrl = `${baseUrl}/tool/${tool.slug}`;
  const description =
    tool.description_en || tool.tagline_en || `${tool.name_en} AI tool`;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name_en,
    description,
    url: tool.website_url || toolUrl,
    applicationCategory: "AIApplication",
    operatingSystem: "Web",
    ...(tool.logo_url && { image: tool.logo_url }),
    ...(tool.screenshot_url && {
      screenshot: tool.screenshot_url,
    }),
    ...(tool.pricing_model && {
      offers: {
        "@type": "Offer",
        price: tool.price_inr_monthly ?? 0,
        priceCurrency: "INR",
        availability: "https://schema.org/OnlineOnly",
        ...(PRICING_TO_SCHEMA[tool.pricing_model] && {
          category: PRICING_TO_SCHEMA[tool.pricing_model],
        }),
      },
    }),
    ...(tool.rating_avg &&
      tool.rating_avg > 0 &&
      tool.rating_count &&
      tool.rating_count > 0 && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: tool.rating_avg.toFixed(1),
          bestRating: "5",
          worstRating: "1",
          ratingCount: tool.rating_count,
          reviewCount: tool.review_count ?? tool.rating_count,
        },
      }),
    inLanguage: ["en", "hi", "hinglish"],
    isAccessibleForFree:
      tool.pricing_model === "free" ||
      tool.pricing_model === "freemium" ||
      tool.pricing_model === "free_trial",
    ...(tool.access_type && {
      featureList: [tool.access_type],
    }),
    // Publisher info
    publisher: {
      "@type": "Organization",
      name: "AihKya",
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
    },
    // Page-level URL for this tool's listing on AihKya
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": toolUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  toolName: string;
  toolSlug: string;
  categoryName?: string | null;
  categorySlug?: string | null;
}

export function BreadcrumbJsonLd({
  toolName,
  toolSlug,
  categoryName,
  categorySlug,
}: BreadcrumbJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aihkya.com";

  const items = [
    { name: "Home", url: baseUrl },
    ...(categoryName && categorySlug
      ? [{ name: categoryName, url: `${baseUrl}/categories/${categorySlug}` }]
      : []),
    { name: toolName, url: `${baseUrl}/tool/${toolSlug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
