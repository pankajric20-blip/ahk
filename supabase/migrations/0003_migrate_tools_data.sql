-- ============================================================
-- AIHKYA DATA MIGRATION: tools -> ai_tools
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Step 1: Insert all tools from old `tools` table into new `ai_tools`
INSERT INTO public.ai_tools (
    name_en,
    name_hi,
    slug,
    description_en,
    description_hi,
    website_url,
    logo_url,
    pricing_model,
    price_inr_monthly,
    price_usd_monthly,
    free_tier_details,
    supports_hindi,
    made_in_india,
    upi_payment_accepted,
    gst_compliant,
    access_type,
    api_available,
    rating_avg,
    review_count,
    is_verified,
    is_featured,
    is_sponsored,
    status
)
SELECT
    t.name,
    NULL,
    t.slug,
    t.description_en,
    t.description_hi,
    t.website_url,
    t.logo_url,
    CASE LOWER(t.pricing_model)
        WHEN 'free' THEN 'free'
        WHEN 'freemium' THEN 'freemium'
        WHEN 'free_trial' THEN 'free_trial'
        WHEN 'free trial' THEN 'free_trial'
        WHEN 'paid' THEN 'paid'
        WHEN 'contact_sales' THEN 'contact_sales'
        ELSE 'freemium'
    END,
    t.price_inr_monthly,
    t.price_usd_monthly,
    t.free_tier_details,
    true,
    false,
    false,
    false,
    'open',
    COALESCE(t.api_available, false),
    COALESCE(t.rating, 0),
    COALESCE(t.review_count, 0),
    COALESCE(t.is_verified, false),
    COALESCE(t.is_featured, false),
    COALESCE(t.is_sponsored, false),
    CASE t.status
        WHEN 'published' THEN 'approved'
        ELSE COALESCE(t.status, 'approved')
    END
FROM public.tools t
WHERE NOT EXISTS (
    SELECT 1 FROM public.ai_tools a WHERE a.slug = t.slug
);

-- Step 2: Map tools to categories via tool_tasks  
-- This maps each ai_tool to its corresponding task_category based on the old category name
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
JOIN public.tools t ON t.slug = a.slug
JOIN public.task_categories tc ON LOWER(tc.name_en) = LOWER(t.category)
WHERE NOT EXISTS (
    SELECT 1 FROM public.tool_tasks tt WHERE tt.tool_id = a.id AND tt.task_id = tc.id
);

-- Verify the migration
SELECT 'ai_tools count: ' || COUNT(*) FROM public.ai_tools;
SELECT 'tool_tasks count: ' || COUNT(*) FROM public.tool_tasks;
