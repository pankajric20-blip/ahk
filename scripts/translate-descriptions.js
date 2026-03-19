import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Load environment variables from apps/web/.env.local and .env
dotenv.config({ path: "./apps/web/.env.local" });
dotenv.config({ path: "./.env.local" });
dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing Supabase URL or Key in environment variables!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Uses Google's Gemini API to translate text dynamically
 */
async function translateToHindi(englishText) {
  if (!GEMINI_API_KEY) {
    console.warn(
      "⚠️ No GEMINI_API_KEY found. Skipping AI translation and returning placeholder.",
    );
    return `[Translated] ${englishText}`;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    // We strictly ask it to ONLY return the translated text and nothing else
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Translate the following description of an AI tool to natural, professional Hindi. Do not include any surrounding quotes, notes, or explanations. Only return the final Hindi text.\n\nEnglish Text: "${englishText}"`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.1, // Keep it professional and deterministic
      },
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Gemini API Error:", data.error?.message);
      return null;
    }

    const translatedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return translatedText || null;
  } catch (err) {
    console.error("Failed to translate:", err.message);
    return null;
  }
}

async function run() {
  console.log("🔍 Fetching tools with missing description_hi...");

  // 1. Fetch AI tools missing description_hi
  const { data: tools, error: fetchErr } = await supabase
    .from("ai_tools")
    .select("id, name_en, description_en")
    .is("description_hi", null);

  if (fetchErr) {
    console.error("❌ Error fetching tools:", fetchErr);
    process.exit(1);
  }

  if (!tools || tools.length === 0) {
    console.log("✅ All tools already have description_hi! Nothing to do.");
    process.exit(0);
  }

  console.log(`🤖 Found ${tools.length} tools needing translation.`);
  if (!GEMINI_API_KEY) {
    console.log(
      "⚠️ HINT: To actually translate, run `export GEMINI_API_KEY=your_key` first!",
    );
  }

  // 2. Translate and Update
  let successCount = 0;

  for (const tool of tools) {
    if (!tool.description_en) continue;

    console.log(`\n⏳ Translating [${tool.name_en}]...`);
    const hindiText = await translateToHindi(tool.description_en);

    if (hindiText) {
      const { error: updateErr } = await supabase
        .from("ai_tools")
        .update({ description_hi: hindiText })
        .eq("id", tool.id);

      if (updateErr) {
        console.error(
          `❌ Failed to update ${tool.name_en}:`,
          updateErr.message,
        );
      } else {
        console.log(`✅ Updated ${tool.name_en}:\n"${hindiText}"`);
        successCount++;
      }
    } else {
      console.log(`⏭️ Skipped ${tool.name_en} due to translation failure.`);
    }

    // Add a tiny delay to respect Gemini rate limits
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log(
    `\n🎉 Finished! Successfully translated and updated ${successCount}/${tools.length} descriptions.`,
  );
}

run();
