/**
 * fix-logos.js
 *
 * Updates logo_url for all tools in the database using the
 * Google Favicon CDN — a free, reliable service that returns
 * the favicon/logo for any domain. No API key required.
 *
 * Usage:
 *   node fix-logos.js
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in apps/web/.env.local
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load from apps/web/.env.local
const envPath = path.join(__dirname, "apps", "web", ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const env = Object.fromEntries(
  envContent
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => l.split("=").map((s) => s.trim())),
);

const supabase = createClient(
  env["NEXT_PUBLIC_SUPABASE_URL"],
  env["SUPABASE_SERVICE_ROLE_KEY"],
);

/**
 * Builds a logo URL from a website URL using Google's favicon CDN.
 * Works for any domain — no API key required.
 */
function getLogoUrl(websiteUrl) {
  if (!websiteUrl) return null;
  try {
    const url = new URL(websiteUrl);
    const domain = url.hostname.replace("www.", "");
    // Google's favicon service returns high-quality logos for most domains
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return null;
  }
}

async function run() {
  console.log("🔍 Fetching all tools from Supabase...");
  const { data: tools, error } = await supabase
    .from("tools")
    .select("id, name, website_url, logo_url");

  if (error) {
    console.error("❌ Error fetching tools:", error.message);
    process.exit(1);
  }

  console.log(`📦 Found ${tools.length} tools. Updating logos...\n`);

  let updated = 0;
  let skipped = 0;

  for (const tool of tools) {
    const newLogoUrl = getLogoUrl(tool.website_url);

    if (!newLogoUrl) {
      console.log(`  ⚠️  Skipping "${tool.name}" — no website_url`);
      skipped++;
      continue;
    }

    const { error: updateError } = await supabase
      .from("tools")
      .update({ logo_url: newLogoUrl })
      .eq("id", tool.id);

    if (updateError) {
      console.error(
        `  ❌ Failed to update "${tool.name}":`,
        updateError.message,
      );
    } else {
      console.log(`  ✅ Updated "${tool.name}" → ${newLogoUrl}`);
      updated++;
    }
  }

  console.log(`\n🎉 Done! Updated: ${updated}, Skipped: ${skipped}`);
}

run();
