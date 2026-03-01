// Migration script: Copy data from old `tools` table into new `ai_tools` + `tool_tasks`
require("dotenv").config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function api(path, options = {}) {
  const res = await fetch(SUPABASE_URL + "/rest/v1/" + path, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: "Bearer " + SUPABASE_KEY,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
      ...(options.headers || {}),
    },
  });

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    console.error("Non-JSON response:", text.substring(0, 300));
    return null;
  }
}

async function main() {
  const oldTools = await api("tools?select=*&order=id.asc");
  if (!oldTools || !Array.isArray(oldTools)) {
    console.error("Failed to fetch old tools");
    return;
  }
  console.log(`Found ${oldTools.length} tools to migrate.`);

  const categories = await api("task_categories?select=id,name_en,slug");
  if (!categories || !Array.isArray(categories)) {
    console.error("Failed to fetch task_categories");
    return;
  }
  console.log(`Found ${categories.length} task_categories.`);

  const catLookup = {};
  for (const c of categories) {
    catLookup[c.name_en.toLowerCase()] = c.id;
    catLookup[c.slug.toLowerCase()] = c.id;
  }

  let successCount = 0;
  let failCount = 0;

  for (const t of oldTools) {
    const pricingMap = {
      free: "free",
      freemium: "freemium",
      free_trial: "free_trial",
      "free trial": "free_trial",
      paid: "paid",
      contact_sales: "contact_sales",
      "contact sales": "contact_sales",
    };
    const pricingModel =
      pricingMap[(t.pricing_model || "free").toLowerCase()] || "freemium";

    const newTool = {
      name_en: t.name,
      name_hi: null,
      slug: t.slug,
      tagline_en: null,
      tagline_hi: null,
      description_en: t.description_en || null,
      description_hi: t.description_hi || null,
      website_url: t.website_url,
      logo_url: t.logo_url || null,
      demo_video_url: null,
      pricing_model: pricingModel,
      price_inr_monthly: t.price_inr_monthly || null,
      price_inr_yearly: null,
      price_usd_monthly: t.price_usd_monthly || null,
      free_tier_details: t.free_tier_details || null,
      trial_days: null,
      supports_hindi: true,
      supports_regional_languages: "[]",
      made_in_india: false,
      upi_payment_accepted: false,
      gst_compliant: false,
      works_offline: false,
      low_bandwidth_mode: false,
      works_with_tally: false,
      works_on_jio_phone: false,
      whatsapp_integration: false,
      access_type: "open",
      platform: JSON.stringify(
        t.platform ? t.platform.split(",").map((s) => s.trim()) : [],
      ),
      api_available: t.api_available || false,
      rating_avg: t.rating || 0,
      review_count: t.review_count || 0,
      is_verified: t.is_verified || false,
      is_featured: t.is_featured || false,
      is_sponsored: t.is_sponsored || false,
      status: t.status === "published" ? "approved" : t.status || "approved",
    };

    const result = await api("ai_tools", {
      method: "POST",
      body: JSON.stringify(newTool),
    });

    if (result && result.length > 0 && result[0].id) {
      successCount++;
      const newToolId = result[0].id;
      console.log(`  ✓ ${t.name} -> ${newToolId}`);

      const catName = (t.category || "").toLowerCase();
      const catId = catLookup[catName];
      if (catId) {
        const mapping = await api("tool_tasks", {
          method: "POST",
          body: JSON.stringify({ tool_id: newToolId, task_id: catId }),
        });
        if (mapping && !mapping.code) {
          console.log(`    → Category: ${t.category}`);
        } else {
          console.log(
            `    ⚠ Category map failed:`,
            mapping?.message || mapping?.code,
          );
        }
      } else {
        console.log(`    ⚠ No match for category: "${t.category}"`);
      }
    } else {
      failCount++;
      console.error(
        `  ✗ ${t.name}:`,
        result?.message || result?.code || result,
      );
    }
  }

  console.log(`\nDone! Success: ${successCount}, Failed: ${failCount}`);
}

main().catch(console.error);
