-- ============================================================
-- AIHKYA: Update name_hi for ALL 100 tools + Re-map tool_tasks
-- Migration 0004 (complete — all 100 tools)
-- ============================================================

-- STEP 1: Update name_hi for all 100 tools
UPDATE public.ai_tools SET name_hi = CASE slug
  -- Chat & AI Assistants
  WHEN 'chatgpt'              THEN 'चैटजीपीटी'
  WHEN 'claude'               THEN 'क्लॉड'
  WHEN 'gemini'               THEN 'जेमिनाई'
  WHEN 'perplexity-ai'        THEN 'परप्लेक्सिटी AI'
  WHEN 'notebooklm'           THEN 'नोटबुकLM'

  -- Image & Design
  WHEN 'midjourney'           THEN 'मिडजर्नी'
  WHEN 'dall-e-3'             THEN 'DALL-E 3'
  WHEN 'leonardo-ai'          THEN 'लियोनार्डो AI'
  WHEN 'ideogram'             THEN 'आइडियोग्राम'
  WHEN 'canva-ai-magic-studio' THEN 'कैनवा AI मैजिक स्टूडियो'
  WHEN 'adobe-firefly'        THEN 'एडोबी फायरफ्लाई'
  WHEN 'stable-diffusion'     THEN 'स्टेबल डिफ्यूजन'
  WHEN 'playground-ai'        THEN 'प्लेग्राउंड AI'
  WHEN 'clipdrop'             THEN 'क्लिपड्रॉप'
  WHEN 'removebg'             THEN 'बैकग्राउंड हटाएं'
  WHEN 'photoshop-ai'         THEN 'फ़ोटोशॉप AI'
  WHEN 'figma-ai'             THEN 'फिग्मा AI'
  WHEN 'photoroom'            THEN 'फोटोरूम'
  WHEN 'looka'                THEN 'लूका'
  WHEN 'pixelcut'             THEN 'पिक्सेलकट'
  WHEN 'spline'               THEN 'स्प्लाइन'
  WHEN 'brandmark'            THEN 'ब्रांडमार्क'
  WHEN 'penpot'               THEN 'पेनपॉट'
  WHEN 'krea-ai'              THEN 'क्रिया AI'

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
  WHEN 'pictory'              THEN 'पिक्टोरी'
  WHEN 'synthesia'            THEN 'सिंथेसिया'
  WHEN 'heygen'               THEN 'हेयजेन'
  WHEN 'd-id'                 THEN 'D-ID'
  WHEN 'capcut'               THEN 'कैपकट'
  WHEN 'fliki'                THEN 'फ्लिकी'
  WHEN 'lumen5'               THEN 'ल्यूमेन 5'
  WHEN 'opus-clip'            THEN 'ओपस क्लिप'

  -- Content Creation & Writing
  WHEN 'notion-ai'            THEN 'नोशन AI'
  WHEN 'grammarly'            THEN 'ग्रामरली'
  WHEN 'hemingway-editor'     THEN 'हेमिंगवे एडिटर'
  WHEN 'surfer-seo'           THEN 'सर्फर एसईओ'
  WHEN 'semrush-ai'           THEN 'सेमरश AI'
  WHEN 'semrush'              THEN 'सेमरश'
  WHEN 'frase-io'             THEN 'फ्रेज़ IO'
  WHEN 'wordtune'             THEN 'वर्डट्यून'
  WHEN 'jasper-ai'            THEN 'जैस्पर AI'
  WHEN 'jasper'               THEN 'जैस्पर'
  WHEN 'writesonic'           THEN 'राइटसोनिक'
  WHEN 'copy-ai'              THEN 'कॉपी.AI'
  WHEN 'copyai'               THEN 'कॉपी.AI'
  WHEN 'rytr'                 THEN 'राइटर'
  WHEN 'quillbot'             THEN 'क्विलबॉट'
  WHEN 'napkin-ai'            THEN 'नैपकिन AI'
  WHEN 'gamma-app'            THEN 'गामा ऐप'
  WHEN 'gamma'                THEN 'गामा'
  WHEN 'tome-ai'              THEN 'टोम AI'
  WHEN 'tome'                 THEN 'टोम'
  WHEN 'beautiful-ai'         THEN 'ब्यूटीफुल AI'
  WHEN 'jenni-ai'             THEN 'जेनी AI'
  WHEN 'quizlet-ai'           THEN 'क्विज़लेट AI'

  -- Coding & Development
  WHEN 'github-copilot'       THEN 'गिटहब कोपाइलट'
  WHEN 'cursor'               THEN 'कर्सर'
  WHEN 'tabnine'              THEN 'टैबनाइन'
  WHEN 'codeium'              THEN 'कोडियम'
  WHEN 'replit'               THEN 'रेप्लिट'
  WHEN 'v0-dev'               THEN 'V0 Dev'
  WHEN 'v0-by-vercel'         THEN 'V0 by Vercel'
  WHEN 'bolt-new'             THEN 'बोल्ट.न्यू'
  WHEN 'boltnew'              THEN 'बोल्ट.न्यू'
  WHEN 'lovable'              THEN 'लवेबल'
  WHEN 'windsurf'             THEN 'विंडसर्फ'
  WHEN 'devin'                THEN 'डेविन'
  WHEN 'cline'                THEN 'क्लाइन'
  WHEN 'claude-code'          THEN 'क्लॉड कोड'
  WHEN 'framer'               THEN 'फ्रेमर'
  WHEN 'supabase'             THEN 'सुपाबेस'
  WHEN 'railway'              THEN 'रेलवे'
  WHEN 'n8n'                  THEN 'N8N'

  -- Productivity
  WHEN 'otter-ai'             THEN 'ओटर AI'
  WHEN 'otterai'              THEN 'ओटर AI'
  WHEN 'fireflies-ai'         THEN 'फायरफ्लाइज़ AI'
  WHEN 'circleback'           THEN 'सर्कलबैक'
  WHEN 'reclaim-ai'           THEN 'रिक्लेम AI'
  WHEN 'motion-ai'            THEN 'मोशन AI'
  WHEN 'motion'               THEN 'मोशन'
  WHEN 'mem-ai'               THEN 'मेम AI'
  WHEN 'mem-ai'               THEN 'मेम AI'
  WHEN 'anyword'              THEN 'एनीवर्ड'
  WHEN 'beehiiv'              THEN 'बीहाइव'
  WHEN 'taskade'              THEN 'टास्केड'
  WHEN 'clickup-ai'           THEN 'क्लिकअप AI'
  WHEN 'notion-ai'            THEN 'नोशन AI'
  WHEN 'zapier'               THEN 'ज़ैपियर'
  WHEN 'make-com'             THEN 'मेक.कॉम'
  WHEN 'superhuman'           THEN 'सुपरह्यूमन'
  WHEN 'mymind'               THEN 'माईमाइंड'
  WHEN 'mem-ai'               THEN 'मेम AI'
  WHEN 'speechify'            THEN 'स्पीचिफाई'
  WHEN 'bing-image-creator'   THEN 'बिंग इमेज क्रिएटर'
  WHEN 'krisp'                THEN 'क्रिस्प'

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
  WHEN 'salesforce-einstein'  THEN 'सेल्सफोर्स आइंस्टीन'
  WHEN 'hubspot-ai'           THEN 'हबस्पॉट AI'
  WHEN 'zoho-zia'             THEN 'जोहो जिया'
  WHEN 'tidio'                THEN 'टिडियो'
  WHEN 'intercom'             THEN 'इंटरकॉम'
  WHEN 'vyapar'               THEN 'व्यापार'
  WHEN 'hootsuite-owlywriter-ai' THEN 'हूटसुईट AI'
  WHEN 'buffer'               THEN 'बफर'
  WHEN 'later'                THEN 'लेटर'
  WHEN 'apollo-io'            THEN 'अपोलो.IO'
  WHEN 'instantly-ai'         THEN 'इंस्टेंटली AI'
  WHEN 'mailchimp-ai'         THEN 'मेलचिम्प AI'
  WHEN 'ahrefs'               THEN 'अहरेफ्स'
  WHEN 'predis-ai'            THEN 'प्रेडिस AI'
  WHEN 'brevo'                THEN 'ब्रेवो'
  WHEN 'adcreativeai'         THEN 'एड क्रिएटिव AI'
  WHEN 'surfer-seo'           THEN 'सर्फर SEO'

  -- Education
  WHEN 'khanmigo'             THEN 'खानमिगो'
  WHEN 'duolingo-max'         THEN 'डुओलिंगो मैक्स'
  WHEN 'photomath'            THEN 'फोटोमैथ'
  WHEN 'wolfram-alpha'        THEN 'वोल्फ्राम अल्फा'
  WHEN 'socratic'             THEN 'सुकराती'
  WHEN 'chegg-ai'             THEN 'चेग AI'
  WHEN 'brainly'              THEN 'ब्रेनली'
  WHEN 'byju-ai'              THEN 'बायजू AI'
  WHEN 'kahoot-ai'            THEN 'काहूट AI'
  WHEN 'consensus'            THEN 'कंसेंसस'
  WHEN 'quizlet-ai'           THEN 'क्विज़लेट AI'
  WHEN 'jenni-ai'             THEN 'जेनी AI'
  WHEN 'teachable'            THEN 'टीचेबल'
  WHEN 'elicit'               THEN 'एलिसिट'
  WHEN 'mentimeter'           THEN 'मेंटिमीटर'
  WHEN 'scholarcy'            THEN 'स्कॉलर्सी'

  -- Data & Analytics
  WHEN 'julius-ai'            THEN 'जूलियस AI'
  WHEN 'rows-ai'              THEN 'रोज़ AI'
  WHEN 'polymer'              THEN 'पॉलिमर'
  WHEN 'monkeylearn'          THEN 'मंकीलर्न'
  WHEN 'coefficient'          THEN 'कोएफिशिएंट'

  ELSE name_en
END
WHERE name_hi IS NULL OR name_hi = name_en;

-- STEP 2: Ensure each category has tools mapped in tool_tasks
-- Content Creation
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'content-creation'
  AND a.slug IN (
    'chatgpt','claude','jasper-ai','jasper','writesonic','copy-ai','copyai','rytr','quillbot',
    'grammarly','wordtune','anyword','notion-ai','surfer-seo','hemingway-editor','frase-io',
    'napkin-ai','gamma','gamma-app','tome','tome-ai','beautiful-ai','jenni-ai'
  )
ON CONFLICT DO NOTHING;

-- Business Tools
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'business-tools'
  AND a.slug IN (
    'chatgpt','claude','beautiful-ai','gamma-app','gamma','tome','tome-ai',
    'salesforce-einstein','hubspot-ai','zoho-zia','microsoft-copilot','reclaim-ai',
    'motion','motion-ai','taskade','jasper-ai','jasper','grammarly','tidio','intercom',
    'zapier','make-com','superhuman','vyapar','hootsuite-owlywriter-ai','buffer','later',
    'mailchimp-ai','brevo','predis-ai','adcreativeai','ahrefs'
  )
ON CONFLICT DO NOTHING;

-- Image & Design
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'image-design'
  AND a.slug IN (
    'midjourney','dall-e-3','leonardo-ai','ideogram','canva-ai-magic-studio',
    'adobe-firefly','stable-diffusion','playground-ai','clipdrop','removebg',
    'photoshop-ai','chatgpt','figma-ai','photoroom','looka','pixelcut','spline',
    'brandmark','penpot','krea-ai','bing-image-creator'
  )
ON CONFLICT DO NOTHING;

-- Video & Reels
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'video-reels'
  AND a.slug IN (
    'runway-ml','pika','sora','luma-ai','kling-ai','invideo-ai','descript',
    'opus-clip','vidyo-ai','pictory-ai','pictory','synthesia','heygen','d-id','capcut',
    'fliki','lumen5','beautiful-ai','soundraw'
  )
ON CONFLICT DO NOTHING;

-- Productivity
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'productivity'
  AND a.slug IN (
    'notion-ai','otter-ai','otterai','fireflies-ai','circleback','reclaim-ai','motion','motion-ai',
    'mem-ai','taskade','microsoft-copilot','grammarly','chatgpt','claude',
    'beehiiv','perplexity-ai','clickup-ai','zapier','make-com','superhuman','speechify','krisp','mymind'
  )
ON CONFLICT DO NOTHING;

-- Marketing & SEO
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'marketing-seo'
  AND a.slug IN (
    'surfer-seo','semrush','semrush-ai','ahrefs','frase-io','hootsuite-owlywriter-ai',
    'buffer','later','predis-ai','canva-ai-magic-studio','jasper-ai','jasper',
    'mailchimp-ai','brevo','apollo-io','instantly-ai','adcreativeai'
  )
ON CONFLICT DO NOTHING;

-- Education & Learning
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'education-learning'
  AND a.slug IN (
    'khanmigo','duolingo-max','photomath','wolfram-alpha','socratic','chegg-ai',
    'brainly','byju-ai','chatgpt','claude','gemini','perplexity-ai',
    'quillbot','grammarly','kahoot-ai','consensus','quizlet-ai','jenni-ai',
    'teachable','elicit','mentimeter','scholarcy','notebooklm'
  )
ON CONFLICT DO NOTHING;

-- Coding & Development
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'coding-dev'
  AND a.slug IN (
    'github-copilot','cursor','tabnine','codeium','replit','v0-dev','v0-by-vercel',
    'bolt-new','boltnew','lovable','windsurf','devin','cline','chatgpt','claude','gemini',
    'claude-code','framer','supabase','railway','n8n'
  )
ON CONFLICT DO NOTHING;

-- Music & Audio
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'music-audio'
  AND a.slug IN (
    'suno-ai','udio','elevenlabs','murf-ai','adobe-podcast','soundraw',
    'aiva','mubert','descript','chatgpt','runway-ml',
    'adobe-firefly','capcut','krisp'
  )
ON CONFLICT DO NOTHING;

-- Chat & AI Assistants
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'chat-assistants'
  AND a.slug IN (
    'chatgpt','claude','gemini','perplexity-ai','microsoft-copilot','meta-ai',
    'grok','you-com','character-ai','poe','mem-ai','notion-ai',
    'salesforce-einstein','hubspot-ai','tidio','intercom'
  )
ON CONFLICT DO NOTHING;

-- GST & Tax
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'gst-tax'
  AND a.slug IN (
    'zoho-zia','chatgpt','claude','gemini','perplexity-ai','microsoft-copilot',
    'wolfram-alpha','notion-ai','grammarly','taskade','vyapar',
    'salesforce-einstein','hubspot-ai'
  )
ON CONFLICT DO NOTHING;

-- WhatsApp Business
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'whatsapp-business'
  AND a.slug IN (
    'chatgpt','claude','gemini','meta-ai','salesforce-einstein','hubspot-ai',
    'zoho-zia','microsoft-copilot','jasper-ai','jasper','writesonic',
    'copy-ai','copyai','rytr','elevenlabs','murf-ai','brevo','intercom'
  )
ON CONFLICT DO NOTHING;

-- Regional Language Content
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'regional-language'
  AND a.slug IN (
    'chatgpt','claude','gemini','meta-ai','elevenlabs','murf-ai',
    'writesonic','rytr','quillbot','grammarly',
    'invideo-ai','capcut','descript','suno-ai','fliki','murf-ai'
  )
ON CONFLICT DO NOTHING;

-- Dukaan Management
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'dukaan-management'
  AND a.slug IN (
    'chatgpt','claude','zoho-zia','salesforce-einstein','hubspot-ai',
    'notion-ai','beautiful-ai','gamma-app','gamma','microsoft-copilot','grammarly',
    'canva-ai-magic-studio','vyapar','tidio','intercom'
  )
ON CONFLICT DO NOTHING;

-- Exam Preparation
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'exam-prep'
  AND a.slug IN (
    'chatgpt','claude','gemini','khanmigo','duolingo-max','photomath',
    'wolfram-alpha','socratic','chegg-ai','brainly','byju-ai',
    'perplexity-ai','notion-ai','grammarly','quizlet-ai','mentimeter','kahoot-ai'
  )
ON CONFLICT DO NOTHING;

-- Government & Schemes
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'government-schemes'
  AND a.slug IN (
    'chatgpt','claude','gemini','perplexity-ai','microsoft-copilot',
    'notion-ai','grammarly','wolfram-alpha','zoho-zia','meta-ai',
    'quillbot','wordtune'
  )
ON CONFLICT DO NOTHING;

-- Agriculture & Farming
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'agriculture'
  AND a.slug IN (
    'chatgpt','claude','gemini','perplexity-ai','wolfram-alpha',
    'notion-ai','microsoft-copilot','meta-ai','zoho-zia',
    'grammarly','soundraw','elevenlabs'
  )
ON CONFLICT DO NOTHING;

-- Freelancing India
INSERT INTO public.tool_tasks (tool_id, task_id)
SELECT a.id, tc.id FROM public.ai_tools a CROSS JOIN public.task_categories tc
WHERE tc.slug = 'freelancing-india'
  AND a.slug IN (
    'chatgpt','claude','grammarly','canva-ai-magic-studio','jasper-ai','jasper',
    'writesonic','copy-ai','copyai','quillbot','notion-ai','beautiful-ai',
    'gamma-app','gamma','anyword','rytr','elevenlabs','framer'
  )
ON CONFLICT DO NOTHING;

-- STEP 3: Update tool_count in task_categories
UPDATE public.task_categories tc
SET tool_count = (
  SELECT COUNT(*) FROM public.tool_tasks tt WHERE tt.task_id = tc.id
);

-- Verification
SELECT tc.name_en, tc.tool_count FROM public.task_categories tc ORDER BY tc.display_order;
SELECT COUNT(*) as tools_with_hindi_name FROM public.ai_tools WHERE name_hi IS NOT NULL AND name_hi != name_en;
