-- ============================================================
-- AIHKYA: Fix and verify Hindi content quality for ALL 100 tools
-- Migration 0006 (complete — all 100 tools)
-- Fills any remaining gaps from 0004/0005 and corrects bad fallbacks
-- ============================================================

-- Fix any tools where name_hi was accidentally set to the English name
UPDATE public.ai_tools SET name_hi = NULL
WHERE name_hi IS NOT NULL AND name_hi = name_en;

-- Re-apply corrected Hindi names for known edge cases
UPDATE public.ai_tools SET name_hi = CASE slug
  WHEN 'chatgpt'                   THEN 'चैटजीपीटी'
  WHEN 'claude'                    THEN 'क्लॉड'
  WHEN 'gemini'                    THEN 'जेमिनाई'
  WHEN 'perplexity-ai'             THEN 'परप्लेक्सिटी AI'
  WHEN 'notebooklm'                THEN 'नोटबुकLM'
  WHEN 'midjourney'                THEN 'मिडजर्नी'
  WHEN 'dall-e-3'                  THEN 'DALL-E 3'
  WHEN 'leonardo-ai'               THEN 'लियोनार्डो AI'
  WHEN 'ideogram'                  THEN 'आइडियोग्राम'
  WHEN 'canva-ai-magic-studio'     THEN 'कैनवा AI मैजिक स्टूडियो'
  WHEN 'removebg'                  THEN 'बैकग्राउंड हटाएं'
  WHEN 'clipdrop'                  THEN 'क्लिपड्रॉप'
  WHEN 'figma-ai'                  THEN 'फिग्मा AI'
  WHEN 'photoroom'                 THEN 'फोटोरूम'
  WHEN 'looka'                     THEN 'लूका'
  WHEN 'pixelcut'                  THEN 'पिक्सेलकट'
  WHEN 'spline'                    THEN 'स्प्लाइन'
  WHEN 'brandmark'                 THEN 'ब्रांडमार्क'
  WHEN 'penpot'                    THEN 'पेनपॉट'
  WHEN 'krea-ai'                   THEN 'क्रिया AI'
  WHEN 'runway-ml'                 THEN 'रनवे ML'
  WHEN 'pika'                      THEN 'पिका'
  WHEN 'luma-ai'                   THEN 'लूमा AI'
  WHEN 'descript'                  THEN 'डिस्क्रिप्ट'
  WHEN 'opus-clip'                 THEN 'ओपस क्लिप'
  WHEN 'pictory'                   THEN 'पिक्टोरी'
  WHEN 'synthesia'                 THEN 'सिंथेसिया'
  WHEN 'heygen'                    THEN 'हेयजेन'
  WHEN 'capcut'                    THEN 'कैपकट'
  WHEN 'fliki'                     THEN 'फ्लिकी'
  WHEN 'lumen5'                    THEN 'ल्यूमेन 5'
  WHEN 'grammarly'                 THEN 'ग्रामरली'
  WHEN 'jasper'                    THEN 'जैस्पर'
  WHEN 'writesonic'                THEN 'राइटसोनिक'
  WHEN 'copyai'                    THEN 'कॉपी.AI'
  WHEN 'quillbot'                  THEN 'क्विलबॉट'
  WHEN 'napkin-ai'                 THEN 'नैपकिन AI'
  WHEN 'gamma'                     THEN 'गामा'
  WHEN 'tome'                      THEN 'टोम'
  WHEN 'beautiful-ai'              THEN 'ब्यूटीफुल AI'
  WHEN 'jenni-ai'                  THEN 'जेनी AI'
  WHEN 'github-copilot'            THEN 'गिटहब कोपाइलट'
  WHEN 'cursor'                    THEN 'कर्सर'
  WHEN 'replit'                    THEN 'रेप्लिट'
  WHEN 'v0-by-vercel'              THEN 'V0 by Vercel'
  WHEN 'boltnew'                   THEN 'बोल्ट.न्यू'
  WHEN 'lovable'                   THEN 'लवेबल'
  WHEN 'windsurf'                  THEN 'विंडसर्फ'
  WHEN 'claude-code'               THEN 'क्लॉड कोड'
  WHEN 'framer'                    THEN 'फ्रेमर'
  WHEN 'supabase'                  THEN 'सुपाबेस'
  WHEN 'railway'                   THEN 'रेलवे'
  WHEN 'n8n'                       THEN 'N8N'
  WHEN 'otterai'                   THEN 'ओटर AI'
  WHEN 'fireflies-ai'              THEN 'फायरफ्लाइज़ AI'
  WHEN 'reclaim-ai'                THEN 'रिक्लेम AI'
  WHEN 'motion'                    THEN 'मोशन'
  WHEN 'mem-ai'                    THEN 'मेम AI'
  WHEN 'clickup-ai'                THEN 'क्लिकअप AI'
  WHEN 'zapier'                    THEN 'ज़ैपियर'
  WHEN 'make-com'                  THEN 'मेक.कॉम'
  WHEN 'superhuman'                THEN 'सुपरह्यूमन'
  WHEN 'mymind'                    THEN 'माईमाइंड'
  WHEN 'speechify'                 THEN 'स्पीचिफाई'
  WHEN 'krisp'                     THEN 'क्रिस्प'
  WHEN 'bing-image-creator'        THEN 'बिंग इमेज क्रिएटर'
  WHEN 'suno-ai'                   THEN 'सुनो AI'
  WHEN 'elevenlabs'                THEN 'इलेवनलैब्स'
  WHEN 'murf-ai'                   THEN 'मर्फ AI'
  WHEN 'soundraw'                  THEN 'साउंड्रॉ'
  WHEN 'tidio'                     THEN 'टिडियो'
  WHEN 'intercom'                  THEN 'इंटरकॉम'
  WHEN 'vyapar'                    THEN 'व्यापार'
  WHEN 'hootsuite-owlywriter-ai'   THEN 'हूटसुईट AI'
  WHEN 'buffer'                    THEN 'बफर'
  WHEN 'later'                     THEN 'लेटर'
  WHEN 'apollo-io'                 THEN 'अपोलो.IO'
  WHEN 'instantly-ai'              THEN 'इंस्टेंटली AI'
  WHEN 'mailchimp-ai'              THEN 'मेलचिम्प AI'
  WHEN 'ahrefs'                    THEN 'अहरेफ्स'
  WHEN 'predis-ai'                 THEN 'प्रेडिस AI'
  WHEN 'brevo'                     THEN 'ब्रेवो'
  WHEN 'adcreativeai'              THEN 'एड क्रिएटिव AI'
  WHEN 'semrush'                   THEN 'सेमरश'
  WHEN 'kahoot-ai'                 THEN 'काहूट AI'
  WHEN 'consensus'                 THEN 'कंसेंसस'
  WHEN 'quizlet-ai'                THEN 'क्विज़लेट AI'
  WHEN 'teachable'                 THEN 'टीचेबल'
  WHEN 'elicit'                    THEN 'एलिसिट'
  WHEN 'mentimeter'                THEN 'मेंटिमीटर'
  WHEN 'scholarcy'                 THEN 'स्कॉलर्सी'
  WHEN 'socratic'                  THEN 'सुकराती'
  WHEN 'julius-ai'                 THEN 'जूलियस AI'
  WHEN 'rows-ai'                   THEN 'रोज़ AI'
  WHEN 'polymer'                   THEN 'पॉलिमर'
  WHEN 'monkeylearn'               THEN 'मंकीलर्न'
  WHEN 'coefficient'               THEN 'कोएफिशिएंट'
  WHEN 'sheet+-/-sheetgpt'         THEN 'शीट+ / शीटGPT'
  WHEN 'notion-ai'                 THEN 'नोशन AI'
  WHEN 'surfer-seo'                THEN 'सर्फर SEO'
  ELSE name_hi
END
WHERE slug IN (
  'chatgpt','claude','gemini','perplexity-ai','notebooklm','midjourney','dall-e-3',
  'leonardo-ai','ideogram','canva-ai-magic-studio','removebg','clipdrop','figma-ai',
  'photoroom','looka','pixelcut','spline','brandmark','penpot','krea-ai','runway-ml',
  'pika','luma-ai','descript','opus-clip','pictory','synthesia','heygen','capcut','fliki',
  'lumen5','grammarly','jasper','writesonic','copyai','quillbot','napkin-ai','gamma','tome',
  'beautiful-ai','jenni-ai','github-copilot','cursor','replit','v0-by-vercel','boltnew',
  'lovable','windsurf','claude-code','framer','supabase','railway','n8n','otterai',
  'fireflies-ai','reclaim-ai','motion','mem-ai','clickup-ai','zapier','make-com',
  'superhuman','mymind','speechify','krisp','bing-image-creator','suno-ai','elevenlabs',
  'murf-ai','soundraw','tidio','intercom','vyapar','hootsuite-owlywriter-ai','buffer',
  'later','apollo-io','instantly-ai','mailchimp-ai','ahrefs','predis-ai','brevo',
  'adcreativeai','semrush','kahoot-ai','consensus','quizlet-ai','teachable','elicit',
  'mentimeter','scholarcy','socratic','julius-ai','rows-ai','polymer','monkeylearn',
  'coefficient','sheet+-/-sheetgpt','notion-ai','surfer-seo'
);

-- Ensure no tool has an empty string for Hindi — fall back to English if needed
UPDATE public.ai_tools
SET description_hi = description_en
WHERE (description_hi IS NULL OR description_hi = '') AND description_en IS NOT NULL;

UPDATE public.ai_tools
SET name_hi = name_en
WHERE (name_hi IS NULL OR name_hi = '') AND name_en IS NOT NULL;

-- Verification summary
SELECT
  'Total tools' AS metric, COUNT(*) AS count FROM public.ai_tools
UNION ALL
SELECT 'Has Hindi name', COUNT(*) FROM public.ai_tools WHERE name_hi IS NOT NULL AND name_hi != name_en
UNION ALL
SELECT 'Has Hindi description', COUNT(*) FROM public.ai_tools WHERE description_hi IS NOT NULL AND description_hi != description_en;
