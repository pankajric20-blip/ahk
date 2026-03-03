-- ============================================================
-- AIHKYA: Update name_hi for all tools + Ensure 10+ tools per category
-- Run this in Supabase SQL Editor
-- ============================================================

-- STEP 1: Update name_hi for all migrated tools
UPDATE public.ai_tools SET name_hi = CASE slug
  -- Chat & AI Assistants
  WHEN 'chatgpt'              THEN 'चैटजीपीटी'
  WHEN 'claude'               THEN 'क्लॉड'
  WHEN 'gemini'               THEN 'जेमिनाई'
  WHEN 'perplexity-ai'        THEN 'परप्लेक्सिटी AI'
  WHEN 'microsoft-copilot'    THEN 'माइक्रोसॉफ्ट कोपाइलट'
  WHEN 'meta-ai'              THEN 'मेटा AI'
  WHEN 'grok'                 THEN 'ग्रोक'
  WHEN 'you-com'              THEN 'यू.कॉम'
  WHEN 'character-ai'         THEN 'कैरेक्टर AI'
  WHEN 'poe'                  THEN 'पो'
  WHEN 'jasper-ai'            THEN 'जैस्पर AI'
  WHEN 'writesonic'           THEN 'राइटसोनिक'
  WHEN 'copy-ai'              THEN 'कॉपी.AI'
  WHEN 'rytr'                 THEN 'राइटर'
  WHEN 'quillbot'             THEN 'क्विलबॉट'

  -- Image & Design
  WHEN 'midjourney'           THEN 'मिडजर्नी'
  WHEN 'dall-e-3'             THEN 'DALL-E 3'
  WHEN 'leonardo-ai'          THEN 'लियोनार्डो AI'
  WHEN 'ideogram'             THEN 'आइडियोग्राम'
  WHEN 'canva-ai-magic-studio' THEN 'कैनवा AI मैजिक स्टूडियो'
  WHEN 'canva'                THEN 'कैनवा'
  WHEN 'adobe-firefly'        THEN 'एडोबी फायरफ्लाई'
  WHEN 'stable-diffusion'     THEN 'स्टेबल डिफ्यूजन'
  WHEN 'playground-ai'        THEN 'प्लेग्राउंड AI'
  WHEN 'clipdrop'             THEN 'क्लिपड्रॉप'
  WHEN 'remove-bg'            THEN 'बैकग्राउंड हटाएं'
  WHEN 'photoshop-ai'         THEN 'फ़ोटोशॉप AI'

  -- Video & Reels
  WHEN 'runway-ml'            THEN 'रनवे ML'
  WHEN 'pika'                 THEN 'पिका'
  WHEN 'sora'                 THEN 'सोरा'
  WHEN 'luma-ai'              THEN 'लूमा AI'
  WHEN 'kling-ai'             THEN 'क्लिंग AI'
  WHEN 'invideo-ai'           THEN 'इनवीडियो AI'
  WHEN 'descript'             THEN 'डिस्क्रिप्ट'
  WHEN 'opus-clip'            THEN 'ओपस क्लिप'
  WHEN 'vidyo-ai'             THEN 'विड्यो AI'
  WHEN 'pictory-ai'           THEN 'पिक्टोरी AI'
  WHEN 'synthesia'            THEN 'सिंथेसिया'
  WHEN 'heygen'               THEN 'हेयजेन'
  WHEN 'd-id'                 THEN 'D-ID'
  WHEN 'capcut'               THEN 'कैपकट'

  -- Content Creation & Writing
  WHEN 'notion-ai'            THEN 'नोशन AI'
  WHEN 'grammarly'            THEN 'ग्रामरली'
  WHEN 'hemingway-editor'     THEN 'हेमिंगवे एडिटर'
  WHEN 'surfer-seo'           THEN 'सर्फर एसईओ'
  WHEN 'semrush-ai'           THEN 'सेमरश AI'
  WHEN 'frase-io'             THEN 'फ्रेज़ IO'
  WHEN 'wordtune'             THEN 'वर्डट्यून'

  -- Coding & Development
  WHEN 'github-copilot'       THEN 'गिटहब कोपाइलट'
  WHEN 'cursor'               THEN 'कर्सर'
  WHEN 'tabnine'              THEN 'टैबनाइन'
  WHEN 'codeium'              THEN 'कोडियम'
  WHEN 'replit'               THEN 'रेप्लिट'
  WHEN 'v0-dev'               THEN 'V0 Dev'
  WHEN 'bolt-new'             THEN 'बोल्ट.न्यू'
  WHEN 'lovable'              THEN 'लवेबल'
  WHEN 'windsurf'             THEN 'विंडसर्फ'
  WHEN 'devin'                THEN 'डेविन'
  WHEN 'cline'                THEN 'क्लाइन'

  -- Productivity
  WHEN 'otter-ai'             THEN 'ओटर AI'
  WHEN 'fireflies-ai'         THEN 'फायरफ्लाइज़ AI'
  WHEN 'circleback'           THEN 'सर्कलबैक'
  WHEN 'reclaim-ai'           THEN 'रिक्लेम AI'
  WHEN 'motion-ai'            THEN 'मोशन AI'
  WHEN 'mem-ai'               THEN 'मेम AI'
  WHEN 'anyword'              THEN 'एनीवर्ड'
  WHEN 'beehiiv'              THEN 'बीहाइव'
  WHEN 'taskade'              THEN 'टास्केड'

  -- Music & Audio
  WHEN 'suno-ai'              THEN 'सुनो AI'
  WHEN 'udio'                 THEN 'उडियो'
  WHEN 'elevenlabs'           THEN 'इलेवनलैब्स'
  WHEN 'murf-ai'              THEN 'मर्फ AI'
  WHEN 'descript-overdub'     THEN 'डिस्क्रिप्ट ओवरडब'
  WHEN 'adobe-podcast'        THEN 'एडोबी पॉडकास्ट'
  WHEN 'soundraw'             THEN 'साउंड्रॉ'
  WHEN 'aiva'                 THEN 'आइवा'
  WHEN 'mubert'               THEN 'म्यूबर्ट'

  -- Business & Finance
  WHEN 'beautiful-ai'         THEN 'ब्यूटीफुल AI'
  WHEN 'gamma-app'            THEN 'गामा ऐप'
  WHEN 'tome-ai'              THEN 'टोम AI'
  WHEN 'salesforce-einstein'  THEN 'सेल्सफोर्स आइंस्टीन'
  WHEN 'hubspot-ai'           THEN 'हबस्पॉट AI'
  WHEN 'zoho-zia'             THEN 'जोहो जिया'

  -- Education
  WHEN 'khanmigo'             THEN 'खानमिगो'
  WHEN 'duolingo-max'         THEN 'डुओलिंगो मैक्स'
  WHEN 'photomath'            THEN 'फोटोमैथ'
  WHEN 'wolfram-alpha'        THEN 'वोल्फ्राम अल्फा'
  WHEN 'socratic'             THEN 'सुकराती'
  WHEN 'chegg-ai'             THEN 'चेग AI'
  WHEN 'brainly'              THEN 'ब्रेनली'
  WHEN 'byju-ai'              THEN 'बायजू AI'

  ELSE name_en  -- fallback: keep English name if no Hindi provided
END
WHERE name_hi IS NULL;

-- ============================================================
-- STEP 2: Ensure each category has tools mapped in tool_tasks
-- We use slugs to look up IDs dynamically (safe & portable)
-- ============================================================

-- Content Creation (content-creation) - add writing/content tools
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'content-creation'
  AND a.slug IN (
    'chatgpt','claude','jasper-ai','writesonic','copy-ai','rytr','quillbot',
    'grammarly','wordtune','anyword','notion-ai','surfer-seo','hemingway-editor','frase-io'
  )
ON CONFLICT DO NOTHING;

-- Business Tools (business-tools)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'business-tools'
  AND a.slug IN (
    'chatgpt','claude','beautiful-ai','gamma-app','tome-ai','salesforce-einstein',
    'hubspot-ai','zoho-zia','microsoft-copilot','reclaim-ai','motion-ai','taskade',
    'jasper-ai','grammarly'
  )
ON CONFLICT DO NOTHING;

-- Image & Design (image-design)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'image-design'
  AND a.slug IN (
    'midjourney','dall-e-3','leonardo-ai','ideogram','canva-ai-magic-studio','canva',
    'adobe-firefly','stable-diffusion','playground-ai','clipdrop','remove-bg',
    'photoshop-ai','chatgpt'
  )
ON CONFLICT DO NOTHING;

-- Video & Reels (video-reels)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'video-reels'
  AND a.slug IN (
    'runway-ml','pika','sora','luma-ai','kling-ai','invideo-ai','descript',
    'opus-clip','vidyo-ai','pictory-ai','synthesia','heygen','d-id','capcut'
  )
ON CONFLICT DO NOTHING;

-- Productivity (productivity)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'productivity'
  AND a.slug IN (
    'notion-ai','otter-ai','fireflies-ai','circleback','reclaim-ai','motion-ai',
    'mem-ai','taskade','microsoft-copilot','grammarly','chatgpt','claude',
    'beehiiv','perplexity-ai'
  )
ON CONFLICT DO NOTHING;

-- Finance & Accounting (finance-accounting)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'finance-accounting'
  AND a.slug IN (
    'zoho-zia','salesforce-einstein','hubspot-ai','microsoft-copilot','chatgpt',
    'claude','gemini','perplexity-ai','notion-ai','beautiful-ai',
    'gamma-app','wolfram-alpha'
  )
ON CONFLICT DO NOTHING;

-- Education & Learning (education-learning)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'education-learning'
  AND a.slug IN (
    'khanmigo','duolingo-max','photomath','wolfram-alpha','socratic','chegg-ai',
    'brainly','byju-ai','chatgpt','claude','gemini','perplexity-ai',
    'quillbot','grammarly'
  )
ON CONFLICT DO NOTHING;

-- Coding & Development (coding-dev)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'coding-dev'
  AND a.slug IN (
    'github-copilot','cursor','tabnine','codeium','replit','v0-dev',
    'bolt-new','lovable','windsurf','devin','cline','chatgpt','claude','gemini'
  )
ON CONFLICT DO NOTHING;

-- Music & Audio (music-audio)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'music-audio'
  AND a.slug IN (
    'suno-ai','udio','elevenlabs','murf-ai','adobe-podcast','soundraw',
    'aiva','mubert','descript','chatgpt','runway-ml',
    'adobe-firefly','capcut'
  )
ON CONFLICT DO NOTHING;

-- Chat & AI Assistants (chat-assistants)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'chat-assistants'
  AND a.slug IN (
    'chatgpt','claude','gemini','perplexity-ai','microsoft-copilot','meta-ai',
    'grok','you-com','character-ai','poe','mem-ai','notion-ai',
    'salesforce-einstein','hubspot-ai'
  )
ON CONFLICT DO NOTHING;

-- GST & Tax (gst-tax) - India specific
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'gst-tax'
  AND a.slug IN (
    'zoho-zia','chatgpt','claude','gemini','perplexity-ai','microsoft-copilot',
    'wolfram-alpha','notion-ai','grammarly','taskade',
    'salesforce-einstein','hubspot-ai'
  )
ON CONFLICT DO NOTHING;

-- WhatsApp Business (whatsapp-business)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'whatsapp-business'
  AND a.slug IN (
    'chatgpt','claude','gemini','meta-ai','salesforce-einstein','hubspot-ai',
    'zoho-zia','microsoft-copilot','jasper-ai','writesonic',
    'copy-ai','rytr','elevenlabs','murf-ai'
  )
ON CONFLICT DO NOTHING;

-- Regional Language Content (regional-language)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'regional-language'
  AND a.slug IN (
    'chatgpt','claude','gemini','meta-ai','elevenlabs','murf-ai',
    'writesonic','rytr','quillbot','grammarly',
    'invideo-ai','capcut','descript','suno-ai'
  )
ON CONFLICT DO NOTHING;

-- Dukaan Management (dukaan-management)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'dukaan-management'
  AND a.slug IN (
    'chatgpt','claude','zoho-zia','salesforce-einstein','hubspot-ai',
    'notion-ai','beautiful-ai','gamma-app','microsoft-copilot','grammarly',
    'canva','canva-ai-magic-studio'
  )
ON CONFLICT DO NOTHING;

-- Exam Preparation (exam-prep)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'exam-prep'
  AND a.slug IN (
    'chatgpt','claude','gemini','khanmigo','duolingo-max','photomath',
    'wolfram-alpha','socratic','chegg-ai','brainly','byju-ai',
    'perplexity-ai','notion-ai','grammarly'
  )
ON CONFLICT DO NOTHING;

-- Government & Schemes (government-schemes)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'government-schemes'
  AND a.slug IN (
    'chatgpt','claude','gemini','perplexity-ai','microsoft-copilot',
    'notion-ai','grammarly','wolfram-alpha','zoho-zia','meta-ai',
    'quillbot','wordtune'
  )
ON CONFLICT DO NOTHING;

-- Agriculture & Farming (agriculture)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'agriculture'
  AND a.slug IN (
    'chatgpt','claude','gemini','perplexity-ai','wolfram-alpha',
    'notion-ai','microsoft-copilot','meta-ai','zoho-zia',
    'grammarly','soundraw','elevenlabs'
  )
ON CONFLICT DO NOTHING;

-- Freelancing India (freelancing-india)
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id
FROM public.ai_tools a
CROSS JOIN public.task_categories tc
WHERE tc.slug = 'freelancing-india'
  AND a.slug IN (
    'chatgpt','claude','grammarly','notionai','canva','jasper-ai',
    'writesonic','copy-ai','quillbot','notion-ai','beautiful-ai',
    'gamma-app','anyword','rytr','elevenlabs'
  )
ON CONFLICT DO NOTHING;

-- ============================================================
-- STEP 3: Update tool_count in task_categories
-- ============================================================
UPDATE public.task_categories tc
SET tool_count = (
  SELECT COUNT(*) FROM public.tool_tasks tt WHERE tt.task_id = tc.id
);

-- ============================================================
-- Verification
-- ============================================================
SELECT tc.name_en, tc.name_hi, tc.tool_count
FROM public.task_categories tc
ORDER BY tc.display_order;

SELECT COUNT(*) as tools_with_hindi_name
FROM public.ai_tools
WHERE name_hi IS NOT NULL AND name_hi != name_en;
