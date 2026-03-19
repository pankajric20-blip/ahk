-- ============================================================
-- AIHKYA: Add Hinglish columns to task_categories
-- Migration 0008
-- Safe to re-run (IF NOT EXISTS guards)
-- ============================================================

-- PART 1: Add Hinglish columns to task_categories
ALTER TABLE public.task_categories
  ADD COLUMN IF NOT EXISTS name_hinglish VARCHAR(255),
  ADD COLUMN IF NOT EXISTS description_hinglish TEXT;

-- PART 2: Populate name_hinglish for all 18 categories
UPDATE public.task_categories SET name_hinglish = CASE slug
  WHEN 'content-creation'    THEN 'Content Banao'
  WHEN 'business-tools'      THEN 'Business Tools'
  WHEN 'image-design'        THEN 'Photo aur Design'
  WHEN 'video-reels'         THEN 'Video aur Reels'
  WHEN 'productivity'        THEN 'Productivity'
  WHEN 'marketing-seo'       THEN 'Marketing aur SEO'
  WHEN 'education-learning'  THEN 'Padhai aur Seekhna'
  WHEN 'coding-dev'          THEN 'Coding aur Development'
  WHEN 'music-audio'         THEN 'Music aur Audio'
  WHEN 'chat-assistants'     THEN 'Chat aur AI Assistants'
  WHEN 'gst-tax'             THEN 'GST aur Tax'
  WHEN 'whatsapp-business'   THEN 'WhatsApp Business'
  WHEN 'regional-language'   THEN 'Regional Language Content'
  WHEN 'dukaan-management'   THEN 'Dukaan Management'
  WHEN 'exam-prep'           THEN 'Exam ki Taiyaari'
  WHEN 'government-schemes'  THEN 'Sarkari Yojanaen'
  WHEN 'agriculture'         THEN 'Krishi aur Kheti'
  WHEN 'freelancing-india'   THEN 'Freelancing India'
  ELSE name_en
END
WHERE name_hinglish IS NULL;

-- PART 3: Populate description_hinglish for all 18 categories
UPDATE public.task_categories SET description_hinglish = CASE slug
  WHEN 'content-creation'    THEN 'Blogs, social media posts, aur marketing copy likhne ke liye best AI tools.'
  WHEN 'business-tools'      THEN 'Aapke business ko grow karne ke liye AI-powered tools aur platforms.'
  WHEN 'image-design'        THEN 'Text se stunning images, logos aur graphics banane ke liye AI design tools.'
  WHEN 'video-reels'         THEN 'Short videos, reels aur professional films banane ke liye AI video tools.'
  WHEN 'productivity'        THEN 'Apna kaam tezi se khatam karne ke liye AI productivity tools.'
  WHEN 'marketing-seo'       THEN 'Website ki ranking badhane aur marketing campaigns run karne ke liye AI tools.'
  WHEN 'education-learning'  THEN 'Students aur professionals ke liye AI se seekhne ke tools.'
  WHEN 'coding-dev'          THEN 'Code likhne, debug karne aur web apps banane ke liye AI coding tools.'
  WHEN 'music-audio'         THEN 'AI se original music, voiceover aur audio content banao.'
  WHEN 'chat-assistants'     THEN 'Questions ke jawab, research aur conversations ke liye AI chatbots.'
  WHEN 'gst-tax'             THEN 'GST filing, tax calculation aur compliance ke liye India-specific AI tools.'
  WHEN 'whatsapp-business'   THEN 'WhatsApp par customer service aur marketing automate karne ke liye AI tools.'
  WHEN 'regional-language'   THEN 'Hindi, Tamil, Telugu aur doosri Indian languages mein content banao.'
  WHEN 'dukaan-management'   THEN 'Apni dukaan ya small business manage karne ke liye AI tools.'
  WHEN 'exam-prep'           THEN 'JEE, NEET, UPSC aur doosri exams ki taiyaari ke liye AI tools.'
  WHEN 'government-schemes'  THEN 'Sarkari yojanaon ki jankari aur documents banane mein AI ki madad lo.'
  WHEN 'agriculture'         THEN 'Kheti, crop planning aur agri business ke liye AI tools.'
  WHEN 'freelancing-india'   THEN 'Indian freelancers ke liye proposals likhne, clients milane aur kaam manage karne ke liye AI tools.'
  ELSE description_en
END
WHERE description_hinglish IS NULL;

-- ============================================================
-- Verification
-- ============================================================
SELECT slug, name_en, name_hinglish,
  CASE WHEN description_hinglish IS NULL THEN 'MISSING' ELSE 'OK' END AS desc_status
FROM public.task_categories
ORDER BY display_order;
