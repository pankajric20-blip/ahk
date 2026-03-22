-- ============================================================
-- AIHKYA: Future-Proof Schema — Phase 1
-- Pure additions. Zero existing columns dropped.
-- Zero frontend changes required.
-- Migration 0012
-- ============================================================


-- ============================================================
-- SECTION 1: ai_tools_i18n
-- All translatable content, one row per tool per locale.
-- Adding a new language = INSERT rows only. No schema changes.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.ai_tools_i18n (
  tool_id  UUID NOT NULL REFERENCES public.ai_tools(id) ON DELETE CASCADE,
  locale   VARCHAR(10) NOT NULL,
  -- Supported now : 'en' | 'hi' | 'hinglish'
  -- Future         : 'ta' | 'te' | 'bn' | 'mr' | 'gu' | 'pa' | 'kn' | 'ml'

  -- Core text (migrated from name_en/hi/hinglish, tagline_*, description_*)
  name        VARCHAR(255) NOT NULL,
  tagline     VARCHAR(300),
  description TEXT,
  summary     TEXT,   -- was hindi_summary; now per-locale, not Hindi-only

  -- Structured content arrays
  -- Each is TEXT[] for THIS locale only — no more {"en":[],"hi":[]} nesting
  features  TEXT[] DEFAULT '{}',
  pros      TEXT[] DEFAULT '{}',
  cons      TEXT[] DEFAULT '{}',
  use_cases TEXT[] DEFAULT '{}',

  -- Translation quality tracking
  is_machine_translated BOOLEAN      NOT NULL DEFAULT false,
  translated_by         UUID         REFERENCES auth.users(id),
  translation_quality   SMALLINT     CHECK (translation_quality BETWEEN 1 AND 5),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  PRIMARY KEY (tool_id, locale)
);

-- "get all tools in locale X" — used by ai_tools_list view
CREATE INDEX IF NOT EXISTS idx_i18n_locale
  ON public.ai_tools_i18n(locale);

-- name full-text search (supplementary to parent search_vector)
CREATE INDEX IF NOT EXISTS idx_i18n_name_gin
  ON public.ai_tools_i18n USING gin(to_tsvector('simple', name));


-- ============================================================
-- SECTION 2: Seed ai_tools_i18n
-- Three INSERT statements (en / hi / hinglish).
-- ARRAY(SELECT jsonb_array_elements_text(...)) extracts TEXT[]
-- from the existing JSONB columns. Returns '{}' when NULL.
-- ON CONFLICT DO NOTHING makes this safe to re-run.
-- ============================================================

-- 2A: English rows
INSERT INTO public.ai_tools_i18n
  (tool_id, locale, name, tagline, description, summary,
   features, pros, cons, use_cases, is_machine_translated)
SELECT
  id,
  'en',
  name_en,
  tagline_en,
  description_en,
  NULL,
  ARRAY(SELECT jsonb_array_elements_text(features->'en')),
  ARRAY(SELECT jsonb_array_elements_text(pros->'en')),
  ARRAY(SELECT jsonb_array_elements_text(cons->'en')),
  ARRAY(SELECT jsonb_array_elements_text(use_cases->'en')),
  false
FROM public.ai_tools
WHERE name_en IS NOT NULL
ON CONFLICT (tool_id, locale) DO NOTHING;

-- 2B: Hindi rows  (hindi_summary becomes summary on the 'hi' row)
INSERT INTO public.ai_tools_i18n
  (tool_id, locale, name, tagline, description, summary,
   features, pros, cons, use_cases, is_machine_translated)
SELECT
  id,
  'hi',
  COALESCE(NULLIF(name_hi, ''),          name_en),
  COALESCE(NULLIF(tagline_hi, ''),       tagline_en),
  COALESCE(NULLIF(description_hi, ''),   description_en),
  hindi_summary,
  ARRAY(SELECT jsonb_array_elements_text(features->'hi')),
  ARRAY(SELECT jsonb_array_elements_text(pros->'hi')),
  ARRAY(SELECT jsonb_array_elements_text(cons->'hi')),
  ARRAY(SELECT jsonb_array_elements_text(use_cases->'hi')),
  false
FROM public.ai_tools
WHERE name_en IS NOT NULL
ON CONFLICT (tool_id, locale) DO NOTHING;

-- 2C: Hinglish rows
INSERT INTO public.ai_tools_i18n
  (tool_id, locale, name, tagline, description, summary,
   features, pros, cons, use_cases, is_machine_translated)
SELECT
  id,
  'hinglish',
  COALESCE(NULLIF(name_hinglish, ''),      name_en),
  COALESCE(NULLIF(tagline_hinglish, ''),   tagline_en),
  COALESCE(NULLIF(description_hinglish, ''), description_en),
  NULL,
  ARRAY(SELECT jsonb_array_elements_text(features->'hinglish')),
  ARRAY(SELECT jsonb_array_elements_text(pros->'hinglish')),
  ARRAY(SELECT jsonb_array_elements_text(cons->'hinglish')),
  ARRAY(SELECT jsonb_array_elements_text(use_cases->'hinglish')),
  false
FROM public.ai_tools
WHERE name_en IS NOT NULL
ON CONFLICT (tool_id, locale) DO NOTHING;


-- ============================================================
-- SECTION 3: ai_tools_meta
-- Supplementary data only needed on the tool detail page.
-- Strict 1:1 with ai_tools. Never loaded on list/search pages.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.ai_tools_meta (
  tool_id UUID PRIMARY KEY REFERENCES public.ai_tools(id) ON DELETE CASCADE,

  -- Media
  demo_video_url  VARCHAR(500),
  screenshot_url  VARCHAR(500),

  -- Pricing detail (English-only technical text; can move to i18n later)
  free_tier_details TEXT,

  -- Admin internal — never shown to end users
  admin_notes      TEXT,
  rejection_reason TEXT,

  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- SECTION 4: Seed ai_tools_meta
-- ============================================================

INSERT INTO public.ai_tools_meta
  (tool_id, demo_video_url, screenshot_url,
   free_tier_details, admin_notes, rejection_reason)
SELECT
  id,
  demo_video_url,
  screenshot_url,
  free_tier_details,
  admin_notes,
  rejection_reason
FROM public.ai_tools
ON CONFLICT (tool_id) DO NOTHING;


-- ============================================================
-- SECTION 5: india_context JSONB column
-- Consolidates 11 boolean columns into one structured object.
-- Old boolean columns are NOT dropped here (Phase 3 cleanup).
-- ============================================================

ALTER TABLE public.ai_tools
  ADD COLUMN IF NOT EXISTS india_context JSONB DEFAULT '{}';

UPDATE public.ai_tools
SET india_context = jsonb_build_object(
  'hindi',         COALESCE(supports_hindi,           false),
  'made_in_india', COALESCE(made_in_india,             false),
  'mobile',        COALESCE(mobile_friendly,           true),
  'offline',       COALESCE(works_offline,             false),
  'low_data',      COALESCE(low_data_usage,            false),
  'upi',           COALESCE(upi_payment_accepted,      false),
  'gst',           COALESCE(gst_compliant,             false),
  'tally',         COALESCE(works_with_tally,          false),
  'jio_phone',     COALESCE(works_on_jio_phone,        false),
  'whatsapp',      COALESCE(whatsapp_integration,      false),
  'regional_langs', COALESCE(supports_regional_languages, '[]'::jsonb)
)
WHERE india_context = '{}' OR india_context IS NULL;

-- GIN index enables fast filtering like: india_context @> '{"upi":true}'
CREATE INDEX IF NOT EXISTS idx_tools_india_context
  ON public.ai_tools USING gin(india_context);


-- ============================================================
-- SECTION 6: task_categories_i18n
-- Same i18n pattern as ai_tools_i18n, applied to categories.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.task_categories_i18n (
  category_id UUID        NOT NULL REFERENCES public.task_categories(id) ON DELETE CASCADE,
  locale      VARCHAR(10) NOT NULL,

  name        VARCHAR(255) NOT NULL,
  description TEXT,

  is_machine_translated BOOLEAN NOT NULL DEFAULT false,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),

  PRIMARY KEY (category_id, locale)
);

CREATE INDEX IF NOT EXISTS idx_cat_i18n_locale
  ON public.task_categories_i18n(locale);


-- ============================================================
-- SECTION 7: Seed task_categories_i18n
-- ============================================================

INSERT INTO public.task_categories_i18n (category_id, locale, name, description)
SELECT id, 'en', name_en, description_en
FROM public.task_categories
ON CONFLICT (category_id, locale) DO NOTHING;

INSERT INTO public.task_categories_i18n (category_id, locale, name, description)
SELECT id, 'hi',
  COALESCE(NULLIF(name_hi, ''),          name_en),
  COALESCE(NULLIF(description_hi, ''),   description_en)
FROM public.task_categories
ON CONFLICT (category_id, locale) DO NOTHING;

INSERT INTO public.task_categories_i18n (category_id, locale, name, description)
SELECT id, 'hinglish',
  COALESCE(NULLIF(name_hinglish, ''),        name_en),
  COALESCE(NULLIF(description_hinglish, ''), description_en)
FROM public.task_categories
ON CONFLICT (category_id, locale) DO NOTHING;


-- ============================================================
-- SECTION 8: Views
-- ai_tools_list — lean view for card/listing queries (Phase 2).
-- Caller adds .eq('locale','hi') to get one language's text.
-- ============================================================

CREATE OR REPLACE VIEW public.ai_tools_list AS
SELECT
  -- Language-neutral columns from ai_tools
  t.id,
  t.slug,
  t.logo_url,
  t.website_url,
  t.pricing_model,
  t.price_inr_monthly,
  t.price_inr_yearly,
  t.price_usd_monthly,
  t.trial_days,
  t.india_context,
  -- Legacy booleans kept for backward-compat during Phase 2 transition
  t.made_in_india,
  t.upi_payment_accepted,
  t.gst_compliant,
  t.supports_hindi,
  t.access_type,
  t.platform,
  t.api_available,
  t.alternatives,
  t.rating_avg,
  t.rating_count,
  t.review_count,
  t.save_count,
  t.trending_score,
  t.is_featured,
  t.is_sponsored,
  t.is_verified,
  t.status,
  t.seo_keywords,
  t.created_at,
  t.approved_at,
  -- i18n fields — one locale per row (filtered by caller)
  i.locale,
  i.name,
  i.tagline,
  i.is_machine_translated
FROM public.ai_tools t
JOIN public.ai_tools_i18n i ON i.tool_id = t.id;


-- ============================================================
-- SECTION 9: Search vector — i18n-aware rebuild
-- Replaces the old trigger that read name_en/name_hi etc.
-- Now builds search_vector from ALL locales combined, using
-- 'simple' config (no English stemming on Hindi/Hinglish text).
-- ============================================================

-- Helper: rebuilds search_vector for one tool from all i18n rows
CREATE OR REPLACE FUNCTION public.rebuild_tool_search_vector(p_tool_id UUID)
RETURNS void AS $$
DECLARE
  rec RECORD;
  vec tsvector := ''::tsvector;
BEGIN
  FOR rec IN
    SELECT name, tagline, description, summary
    FROM public.ai_tools_i18n
    WHERE tool_id = p_tool_id
  LOOP
    vec := vec
      || setweight(to_tsvector('simple', COALESCE(rec.name,        '')), 'A')
      || setweight(to_tsvector('simple', COALESCE(rec.tagline,     '')), 'B')
      || setweight(to_tsvector('simple', COALESCE(rec.description, '')), 'C')
      || setweight(to_tsvector('simple', COALESCE(rec.summary,     '')), 'C');
  END LOOP;

  UPDATE public.ai_tools
  SET search_vector = vec,
      updated_at    = NOW()
  WHERE id = p_tool_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger function: called when any i18n row changes
CREATE OR REPLACE FUNCTION public.trigger_i18n_sync_search()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.rebuild_tool_search_vector(COALESCE(NEW.tool_id, OLD.tool_id));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_i18n_sync_search ON public.ai_tools_i18n;
CREATE TRIGGER trg_i18n_sync_search
  AFTER INSERT OR UPDATE OR DELETE ON public.ai_tools_i18n
  FOR EACH ROW EXECUTE FUNCTION public.trigger_i18n_sync_search();

-- Rebuild all approved tools now (fixes broken Hindi search immediately)
SELECT public.rebuild_tool_search_vector(id)
FROM public.ai_tools
WHERE status = 'approved';


-- ============================================================
-- SECTION 10: Missing performance indexes
-- ============================================================

-- 10A: Partial composite indexes for "approved tools" queries
--      These are tiny (only ~100 approved rows) and blazing fast.

-- Covers: homepage, search page, free tools page
CREATE INDEX IF NOT EXISTS idx_tools_approved_rating
  ON public.ai_tools(rating_avg DESC)
  WHERE status = 'approved';

-- Covers: homepage featured + sponsored sort
CREATE INDEX IF NOT EXISTS idx_tools_approved_featured
  ON public.ai_tools(is_featured DESC, is_sponsored DESC, rating_avg DESC)
  WHERE status = 'approved';

-- Covers: free tools page filter (pricing_model IN ('free','freemium','free_trial'))
CREATE INDEX IF NOT EXISTS idx_tools_approved_pricing
  ON public.ai_tools(pricing_model, rating_avg DESC)
  WHERE status = 'approved';

-- 10B: tool_tasks — category page does a full table scan without this
--      PK is (tool_id, task_id) so filtering by task_id alone can't use it
CREATE INDEX IF NOT EXISTS idx_tool_tasks_task_id
  ON public.tool_tasks(task_id);

-- 10C: reviews — dashboard user reviews query (only tool_id index existed)
CREATE INDEX IF NOT EXISTS idx_reviews_user
  ON public.reviews(user_id, created_at DESC);

-- 10D: saved_tools — PK is (user_id, tool_id), not ordered by created_at
CREATE INDEX IF NOT EXISTS idx_saved_tools_user
  ON public.saved_tools(user_id, created_at DESC);

-- 10E: Previously unindexed tables
CREATE INDEX IF NOT EXISTS idx_screenshots_tool
  ON public.tool_screenshots(tool_id, display_order);

CREATE INDEX IF NOT EXISTS idx_deals_active
  ON public.deals(tool_id, is_active, expires_at)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_sponsored_active
  ON public.sponsored_listings(is_active, campaign_end)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_affiliate_tool
  ON public.affiliate_clicks(tool_id, clicked_at DESC);

CREATE INDEX IF NOT EXISTS idx_affiliate_champion
  ON public.affiliate_clicks(champion_id);


-- ============================================================
-- SECTION 11: Counter sync triggers
-- rating_avg, rating_count, review_count, save_count are kept
-- accurate by DB triggers. App code no longer needs to UPDATE
-- ai_tools manually after a review or bookmark action.
-- ============================================================

-- 11A: Review stats
CREATE OR REPLACE FUNCTION public.sync_tool_review_stats()
RETURNS TRIGGER AS $$
DECLARE
  v_tool_id UUID;
BEGIN
  v_tool_id := COALESCE(NEW.tool_id, OLD.tool_id);

  UPDATE public.ai_tools SET
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE tool_id = v_tool_id AND status = 'published'
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE tool_id = v_tool_id AND status = 'published'
        AND rating IS NOT NULL
    ),
    rating_avg = (
      SELECT COALESCE(ROUND(AVG(rating)::NUMERIC, 2), 0.00)
      FROM public.reviews
      WHERE tool_id = v_tool_id AND status = 'published'
    )
  WHERE id = v_tool_id;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_review_stats ON public.reviews;
CREATE TRIGGER trg_sync_review_stats
  AFTER INSERT OR UPDATE OF rating, status OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.sync_tool_review_stats();

-- 11B: Save count
CREATE OR REPLACE FUNCTION public.sync_tool_save_count()
RETURNS TRIGGER AS $$
DECLARE
  v_tool_id UUID;
BEGIN
  v_tool_id := COALESCE(NEW.tool_id, OLD.tool_id);

  UPDATE public.ai_tools SET
    save_count = (
      SELECT COUNT(*)
      FROM public.saved_tools
      WHERE tool_id = v_tool_id
    )
  WHERE id = v_tool_id;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_save_count ON public.saved_tools;
CREATE TRIGGER trg_sync_save_count
  AFTER INSERT OR DELETE ON public.saved_tools
  FOR EACH ROW EXECUTE FUNCTION public.sync_tool_save_count();


-- ============================================================
-- SECTION 12: pg_cron scheduled jobs
-- Wrapped in a DO block — skips gracefully if pg_cron is not enabled.
-- To enable: Supabase Dashboard → Database → Extensions → pg_cron → Enable
-- Then re-run this section or run the three cron.schedule() calls manually.
-- ============================================================

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'pg_cron'
  ) THEN
    -- 12A: Refresh trending_tools materialized view every 30 min
    PERFORM cron.schedule(
      'refresh-trending-tools',
      '*/30 * * * *',
      'REFRESH MATERIALIZED VIEW CONCURRENTLY public.trending_tools'
    );

    -- 12B: Archive raw tool_clicks older than 90 days (3:00 AM daily)
    PERFORM cron.schedule(
      'archive-old-tool-clicks',
      '0 3 * * *',
      'DELETE FROM public.tool_clicks WHERE clicked_at < NOW() - INTERVAL ''90 days'''
    );

    -- 12C: Archive old search_logs older than 90 days (3:15 AM daily)
    PERFORM cron.schedule(
      'archive-old-search-logs',
      '15 3 * * *',
      'DELETE FROM public.search_logs WHERE searched_at < NOW() - INTERVAL ''90 days'''
    );

    RAISE NOTICE 'pg_cron jobs scheduled successfully.';
  ELSE
    RAISE NOTICE 'pg_cron extension not enabled — skipping Section 12. Enable it in Supabase Dashboard → Database → Extensions → pg_cron, then re-run these cron.schedule() calls.';
  END IF;
END;
$$;


-- ============================================================
-- VERIFICATION QUERIES
-- Run these after applying the migration to confirm success.
-- ============================================================

-- 1. i18n row counts (expect N rows each where N = total tools)
-- SELECT locale, COUNT(*) FROM public.ai_tools_i18n GROUP BY locale ORDER BY locale;

-- 2. Spot-check ChatGPT i18n data
-- SELECT locale, name, tagline, array_length(features, 1) AS feature_count
-- FROM public.ai_tools_i18n
-- WHERE tool_id = (SELECT id FROM public.ai_tools WHERE slug = 'chatgpt')
-- ORDER BY locale;

-- 3. Meta table count (should equal ai_tools count)
-- SELECT COUNT(*) FROM public.ai_tools_meta;

-- 4. india_context populated
-- SELECT slug, india_context FROM public.ai_tools LIMIT 5;

-- 5. Category i18n (expect 18 rows each)
-- SELECT locale, COUNT(*) FROM public.task_categories_i18n GROUP BY locale;

-- 6. Hindi search now works
-- SELECT slug FROM public.ai_tools WHERE search_vector @@ to_tsquery('simple', 'चैट');

-- 7. New indexes present
-- SELECT indexname FROM pg_indexes WHERE tablename = 'ai_tools' AND indexname LIKE 'idx_tools_approved%';

-- 8. Triggers present (expect 3)
-- SELECT trigger_name FROM information_schema.triggers
-- WHERE trigger_name IN ('trg_sync_review_stats','trg_sync_save_count','trg_i18n_sync_search');

-- 9. View works
-- SELECT slug, name, locale FROM public.ai_tools_list WHERE locale = 'hi' AND status = 'approved' LIMIT 3;

-- 10. pg_cron jobs scheduled
-- SELECT jobname, schedule FROM cron.job;
