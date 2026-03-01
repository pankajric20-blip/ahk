-- ============================================================
-- AIHKYA COMPLETE DATABASE SCHEMA
-- Database: Supabase PostgreSQL (ap-south-1 Mumbai)
-- Version: 2.0 (Post-TAAFT Enhancement)
-- Migration 0002
-- ============================================================

-- Enable these PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- ============================================================
-- SECTION 1: CORE TABLES
-- ============================================================

-- 1.1 AI Tools Catalog (Primary Table)
CREATE TABLE IF NOT EXISTS public.ai_tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Identity
    name_en VARCHAR(255) NOT NULL,
    name_hi VARCHAR(255),
    slug VARCHAR(255) UNIQUE NOT NULL,
    tagline_en VARCHAR(300),
    tagline_hi VARCHAR(300),
    
    -- Description
    description_en TEXT,
    description_hi TEXT,
    
    -- Links & Media
    website_url VARCHAR(500) NOT NULL,
    logo_url VARCHAR(500),
    demo_video_url VARCHAR(500),
    
    -- Pricing (Indian Context)
    pricing_model VARCHAR(30) NOT NULL DEFAULT 'free'
        CHECK (pricing_model IN ('free', 'freemium', 'free_trial', 'paid', 'contact_sales')),
    price_inr_monthly DECIMAL(10,2),
    price_inr_yearly DECIMAL(10,2),
    price_usd_monthly DECIMAL(10,2),
    free_tier_details TEXT,
    trial_days INT,
    
    -- Indian Context Badges (Boolean Flags)
    supports_hindi BOOLEAN DEFAULT false,
    supports_regional_languages JSONB DEFAULT '[]',
    made_in_india BOOLEAN DEFAULT false,
    mobile_friendly BOOLEAN DEFAULT true,
    works_offline BOOLEAN DEFAULT false,
    low_data_usage BOOLEAN DEFAULT false,
    upi_payment_accepted BOOLEAN DEFAULT false,
    gst_compliant BOOLEAN DEFAULT false,
    works_with_tally BOOLEAN DEFAULT false,
    works_on_jio_phone BOOLEAN DEFAULT false,
    whatsapp_integration BOOLEAN DEFAULT false,
    
    -- Access & Technical
    access_type VARCHAR(20) DEFAULT 'open'
        CHECK (access_type IN ('open', 'closed_beta', 'waitlist', 'api_only', 'invite_only')),
    platform JSONB DEFAULT '["web"]',
    api_available BOOLEAN DEFAULT false,
    
    -- Metrics (Auto-calculated)
    rating_avg DECIMAL(3,2) DEFAULT 0.00,
    rating_count INT DEFAULT 0,
    review_count INT DEFAULT 0,
    save_count INT DEFAULT 0,
    click_count INT DEFAULT 0,
    share_count INT DEFAULT 0,
    trending_score DECIMAL(10,2) DEFAULT 0.00,
    
    -- Admin & Moderation
    submitted_by UUID REFERENCES auth.users(id),
    verified_by UUID,
    is_verified BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_sponsored BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'pending'
        CHECK (status IN ('pending', 'approved', 'rejected', 'archived', 'flagged')),
    rejection_reason TEXT,
    admin_notes TEXT,
    
    -- SEO & Discovery
    seo_keywords JSONB DEFAULT '[]',
    search_vector tsvector,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    featured_at TIMESTAMPTZ
);

-- Search index for fast Hinglish search
CREATE INDEX IF NOT EXISTS idx_tools_search ON public.ai_tools USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON public.ai_tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_status ON public.ai_tools(status);
CREATE INDEX IF NOT EXISTS idx_tools_pricing ON public.ai_tools(pricing_model);
CREATE INDEX IF NOT EXISTS idx_tools_trending ON public.ai_tools(trending_score DESC);
CREATE INDEX IF NOT EXISTS idx_tools_rating ON public.ai_tools(rating_avg DESC);
CREATE INDEX IF NOT EXISTS idx_tools_hindi ON public.ai_tools(supports_hindi) WHERE supports_hindi = true;
CREATE INDEX IF NOT EXISTS idx_tools_india ON public.ai_tools(made_in_india) WHERE made_in_india = true;

-- Auto-update search vector
CREATE OR REPLACE FUNCTION update_tool_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.name_en, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.name_hi, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.tagline_en, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.tagline_hi, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.description_en, '')), 'C');
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_search_vector ON public.ai_tools;
CREATE TRIGGER trigger_update_search_vector
    BEFORE INSERT OR UPDATE ON public.ai_tools
    FOR EACH ROW EXECUTE FUNCTION update_tool_search_vector();


-- 1.2 Task Categories
CREATE TABLE IF NOT EXISTS public.task_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en VARCHAR(255) NOT NULL,
    name_hi VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description_en TEXT,
    description_hi TEXT,
    icon VARCHAR(50),
    
    parent_id UUID REFERENCES public.task_categories(id),
    level INT DEFAULT 0,
    
    is_india_specific BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    
    tool_count INT DEFAULT 0,
    search_count INT DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_parent ON public.task_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.task_categories(slug);


-- 1.3 Tool ↔ Task Mapping
CREATE TABLE IF NOT EXISTS public.tool_tasks (
    tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
    task_id UUID REFERENCES public.task_categories(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    relevance_score DECIMAL(3,2) DEFAULT 1.00,
    PRIMARY KEY (tool_id, task_id)
);


-- 1.4 Indian Business Context Tags
CREATE TABLE IF NOT EXISTS public.business_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tag_name_en VARCHAR(100) NOT NULL,
    tag_name_hi VARCHAR(100),
    tag_type VARCHAR(50) NOT NULL
        CHECK (tag_type IN (
            'compliance', 'payment', 'compatibility', 'platform', 
            'language', 'connectivity', 'industry', 'audience'
        )),
    icon VARCHAR(50),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.5 Tool ↔ Tag Mapping
CREATE TABLE IF NOT EXISTS public.tool_business_tags (
    tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.business_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (tool_id, tag_id)
);


-- 1.6 Tool Screenshots
CREATE TABLE IF NOT EXISTS public.tool_screenshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    caption_en VARCHAR(255),
    caption_hi VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- SECTION 2: USER TABLES
-- ============================================================

-- 2.1 Extended User Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    
    display_name VARCHAR(100),
    avatar_url VARCHAR(500),
    bio TEXT,
    phone_verified BOOLEAN DEFAULT false,
    
    city VARCHAR(100),
    state VARCHAR(100),
    preferred_language VARCHAR(10) DEFAULT 'hi'
        CHECK (preferred_language IN ('hi', 'en', 'hinglish', 'ta', 'te', 'bn', 'mr')),
    
    user_type VARCHAR(50)
        CHECK (user_type IN ('student', 'business_owner', 'creator', 'teacher',
                             'developer', 'freelancer', 'professional', 'other')),
    business_type VARCHAR(100),
    business_name VARCHAR(255),
    
    karma_score INT DEFAULT 0,
    is_ai_champion BOOLEAN DEFAULT false,
    champion_since TIMESTAMPTZ,
    tools_reviewed INT DEFAULT 0,
    tools_saved INT DEFAULT 0,
    helpful_votes_received INT DEFAULT 0,
    
    email_notifications BOOLEAN DEFAULT true,
    whatsapp_notifications BOOLEAN DEFAULT false,
    weekly_digest BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', 'User'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- 2.2 Saved Tools
CREATE TABLE IF NOT EXISTS public.saved_tools (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
    collection_name VARCHAR(100) DEFAULT 'default',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, tool_id)
);

-- 2.3 User Activity Log
CREATE TABLE IF NOT EXISTS public.user_activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type VARCHAR(30) NOT NULL
        CHECK (activity_type IN ('view', 'click', 'save', 'unsave', 'review',
                                  'search', 'share', 'submit_tool')),
    tool_id UUID REFERENCES public.ai_tools(id),
    category_id UUID REFERENCES public.task_categories(id),
    search_query TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_activity_user ON public.user_activity_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_tool ON public.user_activity_log(tool_id);


-- ============================================================
-- SECTION 3: COMMUNITY TABLES
-- ============================================================

DROP TABLE IF EXISTS public.reviews CASCADE;

CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(200),
    review_text TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'hi'
        CHECK (language IN ('hi', 'en', 'hinglish')),
    image_urls JSONB DEFAULT '[]',
    video_url VARCHAR(500),
    user_city VARCHAR(100),
    user_type VARCHAR(50),
    usage_duration VARCHAR(30),
    use_case TEXT,
    helpful_count INT DEFAULT 0,
    not_helpful_count INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'published'
        CHECK (status IN ('published', 'pending', 'flagged', 'removed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tool_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_reviews_tool ON public.reviews(tool_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(tool_id, rating);


CREATE TABLE IF NOT EXISTS public.review_helpful_votes (
    review_id UUID REFERENCES public.reviews(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    is_helpful BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (review_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.tool_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submitted_by UUID REFERENCES auth.users(id),
    tool_name VARCHAR(255) NOT NULL,
    tool_website VARCHAR(500) NOT NULL,
    tool_description TEXT,
    suggested_category VARCHAR(255),
    pricing_info VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending'
        CHECK (status IN ('pending', 'approved', 'rejected', 'duplicate')),
    reviewed_by UUID,
    review_notes TEXT,
    approved_tool_id UUID REFERENCES public.ai_tools(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.ai_champions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    champion_name VARCHAR(100),
    city VARCHAR(100),
    specialization VARCHAR(255),
    bio TEXT,
    reviews_written INT DEFAULT 0,
    tutorials_created INT DEFAULT 0,
    tools_submitted INT DEFAULT 0,
    referral_count INT DEFAULT 0,
    total_helpful_votes INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'suspended')),
    tier VARCHAR(20) DEFAULT 'bronze'
        CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
    affiliate_code VARCHAR(50) UNIQUE,
    total_earnings_inr DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- SECTION 4: CONTENT TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.curated_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_en VARCHAR(255) NOT NULL,
    title_hi VARCHAR(255),
    description_en TEXT,
    description_hi TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    cover_image_url VARCHAR(500),
    list_type VARCHAR(30) DEFAULT 'editorial'
        CHECK (list_type IN ('editorial', 'weekly_top', 'trending', 'community', 'seasonal')),
    created_by UUID REFERENCES auth.users(id),
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    view_count INT DEFAULT 0,
    save_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.list_items (
    list_id UUID REFERENCES public.curated_lists(id) ON DELETE CASCADE,
    tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
    position INT NOT NULL,
    note_en TEXT,
    note_hi TEXT,
    PRIMARY KEY (list_id, tool_id)
);


CREATE TABLE IF NOT EXISTS public.education_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_en VARCHAR(255) NOT NULL,
    title_hi VARCHAR(255),
    slug VARCHAR(255) UNIQUE NOT NULL,
    content_en TEXT,
    content_hi TEXT,
    thumbnail_url VARCHAR(500),
    video_url VARCHAR(500),
    content_type VARCHAR(30) NOT NULL
        CHECK (content_type IN ('article', 'tutorial', 'glossary', 'video', 'infographic')),
    difficulty_level VARCHAR(20) DEFAULT 'beginner'
        CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    target_audience VARCHAR(50),
    related_tool_ids JSONB DEFAULT '[]',
    related_category_ids JSONB DEFAULT '[]',
    tags JSONB DEFAULT '[]',
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);


CREATE TABLE IF NOT EXISTS public.deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
    title_en VARCHAR(255) NOT NULL,
    title_hi VARCHAR(255),
    description TEXT,
    deal_type VARCHAR(30) NOT NULL
        CHECK (deal_type IN ('discount', 'coupon', 'free_trial_extended', 'bundle', 'cashback')),
    discount_percentage INT,
    coupon_code VARCHAR(50),
    original_price_inr DECIMAL(10,2),
    deal_price_inr DECIMAL(10,2),
    deal_url VARCHAR(500),
    starts_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN DEFAULT true,
    festival_tag VARCHAR(50),
    is_student_deal BOOLEAN DEFAULT false,
    claim_count INT DEFAULT 0,
    click_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- SECTION 5: MONETIZATION TABLES
-- ============================================================

DROP TABLE IF EXISTS public.sponsored_listings CASCADE;

CREATE TABLE IF NOT EXISTS public.sponsored_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES public.ai_tools(id),
    sponsor_name VARCHAR(255),
    sponsor_contact_email VARCHAR(255),
    placement VARCHAR(30) NOT NULL
        CHECK (placement IN ('homepage_banner', 'category_top', 'search_top',
                             'sidebar', 'newsletter', 'weekly_digest')),
    campaign_start TIMESTAMPTZ NOT NULL,
    campaign_end TIMESTAMPTZ NOT NULL,
    budget_inr DECIMAL(12,2),
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES public.ai_tools(id),
    user_id UUID REFERENCES auth.users(id),
    champion_id UUID REFERENCES public.ai_champions(id),
    source VARCHAR(50),
    ip_hash VARCHAR(64),
    converted BOOLEAN DEFAULT false,
    conversion_value_inr DECIMAL(10,2),
    clicked_at TIMESTAMPTZ DEFAULT NOW(),
    converted_at TIMESTAMPTZ
);


-- ============================================================
-- SECTION 6: ANALYTICS TABLES
-- ============================================================

DROP TABLE IF EXISTS public.tool_clicks CASCADE;
DROP TABLE IF EXISTS public.search_logs CASCADE;

CREATE TABLE IF NOT EXISTS public.tool_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES public.ai_tools(id),
    user_id UUID REFERENCES auth.users(id),
    source VARCHAR(50),
    clicked_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_clicks_tool_date ON public.tool_clicks(tool_id, clicked_at DESC);

CREATE TABLE IF NOT EXISTS public.search_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    query TEXT NOT NULL,
    language_detected VARCHAR(10),
    results_count INT DEFAULT 0,
    clicked_tool_id UUID REFERENCES public.ai_tools(id),
    filters_used JSONB DEFAULT '{}',
    searched_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_search_query ON public.search_logs(searched_at DESC);


DROP MATERIALIZED VIEW IF EXISTS public.trending_tools;
CREATE MATERIALIZED VIEW public.trending_tools AS
SELECT 
    t.id,
    t.name_en,
    t.name_hi,
    t.slug,
    t.logo_url,
    t.pricing_model,
    t.rating_avg,
    t.made_in_india,
    t.supports_hindi,
    (
        COALESCE(click_24h.count, 0) * 3 +
        COALESCE(save_24h.count, 0) * 5 +
        COALESCE(review_7d.count, 0) * 10 +
        COALESCE(share_24h.count, 0) * 4 +
        t.rating_avg * 2
    ) AS trending_score
FROM public.ai_tools t
LEFT JOIN (
    SELECT tool_id, COUNT(*) as count 
    FROM public.tool_clicks 
    WHERE clicked_at > NOW() - INTERVAL '24 hours' 
    GROUP BY tool_id
) click_24h ON t.id = click_24h.tool_id
LEFT JOIN (
    SELECT tool_id, COUNT(*) as count 
    FROM public.saved_tools 
    WHERE created_at > NOW() - INTERVAL '24 hours' 
    GROUP BY tool_id
) save_24h ON t.id = save_24h.tool_id
LEFT JOIN (
    SELECT tool_id, COUNT(*) as count 
    FROM public.reviews 
    WHERE created_at > NOW() - INTERVAL '7 days' 
    GROUP BY tool_id
) review_7d ON t.id = review_7d.tool_id
LEFT JOIN (
    SELECT tool_id, COUNT(*) as count 
    FROM public.user_activity_log 
    WHERE activity_type = 'share' AND created_at > NOW() - INTERVAL '24 hours' 
    GROUP BY tool_id
) share_24h ON t.id = share_24h.tool_id
WHERE t.status = 'approved'
ORDER BY trending_score DESC
LIMIT 100;
CREATE UNIQUE INDEX IF NOT EXISTS idx_trending_id ON public.trending_tools(id);


-- ============================================================
-- SECTION 7: ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;

-- AI Tools: Public read, admin write
DROP POLICY IF EXISTS "Tools are viewable by everyone" ON public.ai_tools;
CREATE POLICY "Tools are viewable by everyone" ON public.ai_tools
    FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Admins can manage tools" ON public.ai_tools;
CREATE POLICY "Admins can manage tools" ON public.ai_tools
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND karma_score >= 1000
        )
    );

-- Profiles: Own profile editable, public read
DROP POLICY IF EXISTS "Public profiles are viewable" ON public.profiles;
CREATE POLICY "Public profiles are viewable" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Reviews: Public read, own write
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Users can insert own reviews" ON public.reviews;
CREATE POLICY "Users can insert own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);

-- Saved Tools: Private to user
DROP POLICY IF EXISTS "Users can manage own saves" ON public.saved_tools;
CREATE POLICY "Users can manage own saves" ON public.saved_tools FOR ALL USING (auth.uid() = user_id);

-- Activity Log: Private to user
DROP POLICY IF EXISTS "Users can insert own activity" ON public.user_activity_log;
CREATE POLICY "Users can insert own activity" ON public.user_activity_log FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own activity" ON public.user_activity_log;
CREATE POLICY "Users can view own activity" ON public.user_activity_log FOR SELECT USING (auth.uid() = user_id);


-- ============================================================
-- SECTION 8: SEED DATA - TASK CATEGORIES
-- ============================================================
INSERT INTO public.task_categories (name_en, name_hi, slug, icon, level, display_order, is_india_specific) VALUES
('Content Creation', 'कंटेंट बनाओ', 'content-creation', '✏️', 0, 1, false),
('Business Tools', 'बिज़नेस टूल्स', 'business-tools', '💼', 0, 2, false),
('Image & Design', 'फोटो और डिज़ाइन', 'image-design', '🎨', 0, 3, false),
('Video & Reels', 'वीडियो और रील्स', 'video-reels', '🎥', 0, 4, false),
('Productivity', 'प्रोडक्टिविटी', 'productivity', '⚡', 0, 5, false),
('Marketing & SEO', 'मार्केटिंग और SEO', 'marketing-seo', '📈', 0, 6, false),
('Education & Learning', 'पढ़ाई और सीखना', 'education-learning', '📚', 0, 7, false),
('Coding & Development', 'कोडिंग और डेवलपमेंट', 'coding-dev', '💻', 0, 8, false),
('Music & Audio', 'म्यूजिक और ऑडियो', 'music-audio', '🎵', 0, 9, false),
('Chat & AI Assistants', 'चैट और AI असिस्टेंट', 'chat-assistants', '🤖', 0, 10, false),
('GST & Tax', 'GST और टैक्स', 'gst-tax', '🧾', 0, 11, true),
('WhatsApp Business', 'WhatsApp बिज़नेस', 'whatsapp-business', '📱', 0, 12, true),
('Regional Language Content', 'भारतीय भाषा कंटेंट', 'regional-language', '🗣️', 0, 13, true),
('Dukaan Management', 'दुकान मैनेजमेंट', 'dukaan-management', '🏪', 0, 14, true),
('Exam Preparation', 'परीक्षा तैयारी', 'exam-prep', '🎓', 0, 15, true),
('Government & Schemes', 'सरकारी योजनाएं', 'government-schemes', '🏛️', 0, 16, true),
('Agriculture & Farming', 'कृषि और खेती', 'agriculture', '🌾', 0, 17, true),
('Freelancing India', 'फ्रीलांसिंग इंडिया', 'freelancing-india', '💪', 0, 18, true)
ON CONFLICT (slug) DO NOTHING;
