-- ============================================================
-- AIHKYA: Fix Hindi names & Add missing Hindi descriptions
-- Migration 0006
-- Run this in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- PART 1: Fix name_hi for tools where name_hi was set to
-- the English value as a fallback (ELSE name_en in migration 0004)
-- We update ALL tools to ensure correct Hindi transliterations.
-- ============================================================

UPDATE public.ai_tools SET name_hi = CASE slug
  -- Chat & AI Assistants
  WHEN 'chatgpt'               THEN 'चैटजीपीटी'
  WHEN 'claude'                THEN 'क्लॉड'
  WHEN 'gemini'                THEN 'जेमिनाई'
  WHEN 'perplexity-ai'         THEN 'परप्लेक्सिटी AI'
  WHEN 'microsoft-copilot'     THEN 'माइक्रोसॉफ्ट कोपाइलट'
  WHEN 'meta-ai'               THEN 'मेटा AI'
  WHEN 'grok'                  THEN 'ग्रोक'
  WHEN 'you-com'               THEN 'यू.कॉम'
  WHEN 'character-ai'          THEN 'कैरेक्टर AI'
  WHEN 'poe'                   THEN 'पो'
  WHEN 'jasper-ai'             THEN 'जैस्पर AI'
  WHEN 'writesonic'            THEN 'राइटसोनिक'
  WHEN 'copy-ai'               THEN 'कॉपी.AI'
  WHEN 'rytr'                  THEN 'राइटर'
  WHEN 'quillbot'              THEN 'क्विलबॉट'

  -- Image & Design
  WHEN 'midjourney'            THEN 'मिडजर्नी'
  WHEN 'dall-e-3'              THEN 'DALL-E 3'
  WHEN 'leonardo-ai'           THEN 'लियोनार्डो AI'
  WHEN 'ideogram'              THEN 'आइडियोग्राम'
  WHEN 'canva-ai-magic-studio' THEN 'कैनवा AI मैजिक स्टूडियो'
  WHEN 'canva'                 THEN 'कैनवा'
  WHEN 'adobe-firefly'         THEN 'एडोबी फायरफ्लाई'
  WHEN 'stable-diffusion'      THEN 'स्टेबल डिफ्यूजन'
  WHEN 'playground-ai'         THEN 'प्लेग्राउंड AI'
  WHEN 'clipdrop'              THEN 'क्लिपड्रॉप'
  WHEN 'remove-bg'             THEN 'बैकग्राउंड हटाएं'
  WHEN 'photoshop-ai'          THEN 'फ़ोटोशॉप AI'

  -- Video & Reels
  WHEN 'runway-ml'             THEN 'रनवे ML'
  WHEN 'pika'                  THEN 'पिका'
  WHEN 'sora'                  THEN 'सोरा'
  WHEN 'luma-ai'               THEN 'लूमा AI'
  WHEN 'kling-ai'              THEN 'क्लिंग AI'
  WHEN 'invideo-ai'            THEN 'इनवीडियो AI'
  WHEN 'descript'              THEN 'डिस्क्रिप्ट'
  WHEN 'opus-clip'             THEN 'ओपस क्लिप'
  WHEN 'vidyo-ai'              THEN 'विड्यो AI'
  WHEN 'pictory-ai'            THEN 'पिक्टोरी AI'
  WHEN 'synthesia'             THEN 'सिंथेसिया'
  WHEN 'heygen'                THEN 'हेयजेन'
  WHEN 'd-id'                  THEN 'D-ID'
  WHEN 'capcut'                THEN 'कैपकट'

  -- Content Creation & Writing
  WHEN 'notion-ai'             THEN 'नोशन AI'
  WHEN 'grammarly'             THEN 'ग्रामरली'
  WHEN 'hemingway-editor'      THEN 'हेमिंगवे एडिटर'
  WHEN 'surfer-seo'            THEN 'सर्फर एसईओ'
  WHEN 'semrush-ai'            THEN 'सेमरश AI'
  WHEN 'frase-io'              THEN 'फ्रेज़ IO'
  WHEN 'wordtune'              THEN 'वर्डट्यून'

  -- Coding & Development
  WHEN 'github-copilot'        THEN 'गिटहब कोपाइलट'
  WHEN 'cursor'                THEN 'कर्सर'
  WHEN 'tabnine'               THEN 'टैबनाइन'
  WHEN 'codeium'               THEN 'कोडियम'
  WHEN 'replit'                THEN 'रेप्लिट'
  WHEN 'v0-dev'                THEN 'V0 Dev'
  WHEN 'bolt-new'              THEN 'बोल्ट.न्यू'
  WHEN 'lovable'               THEN 'लवेबल'
  WHEN 'windsurf'              THEN 'विंडसर्फ'
  WHEN 'devin'                 THEN 'डेविन'
  WHEN 'cline'                 THEN 'क्लाइन'

  -- Productivity
  WHEN 'otter-ai'              THEN 'ओटर AI'
  WHEN 'fireflies-ai'          THEN 'फायरफ्लाइज़ AI'
  WHEN 'circleback'            THEN 'सर्कलबैक'
  WHEN 'reclaim-ai'            THEN 'रिक्लेम AI'
  WHEN 'motion-ai'             THEN 'मोशन AI'
  WHEN 'mem-ai'                THEN 'मेम AI'
  WHEN 'anyword'               THEN 'एनीवर्ड'
  WHEN 'beehiiv'               THEN 'बीहाइव'
  WHEN 'taskade'               THEN 'टास्केड'

  -- Music & Audio
  WHEN 'suno-ai'               THEN 'सुनो AI'
  WHEN 'udio'                  THEN 'उडियो'
  WHEN 'elevenlabs'            THEN 'इलेवनलैब्स'
  WHEN 'murf-ai'               THEN 'मर्फ AI'
  WHEN 'descript-overdub'      THEN 'डिस्क्रिप्ट ओवरडब'
  WHEN 'adobe-podcast'         THEN 'एडोबी पॉडकास्ट'
  WHEN 'soundraw'              THEN 'साउंड्रॉ'
  WHEN 'aiva'                  THEN 'आइवा'
  WHEN 'mubert'                THEN 'म्यूबर्ट'

  -- Business & Finance
  WHEN 'beautiful-ai'          THEN 'ब्यूटीफुल AI'
  WHEN 'gamma-app'             THEN 'गामा ऐप'
  WHEN 'tome-ai'               THEN 'टोम AI'
  WHEN 'salesforce-einstein'   THEN 'सेल्सफोर्स आइंस्टीन'
  WHEN 'hubspot-ai'            THEN 'हबस्पॉट AI'
  WHEN 'zoho-zia'              THEN 'जोहो जिया'

  -- Education
  WHEN 'khanmigo'              THEN 'खानमिगो'
  WHEN 'duolingo-max'          THEN 'डुओलिंगो मैक्स'
  WHEN 'photomath'             THEN 'फोटोमैथ'
  WHEN 'wolfram-alpha'         THEN 'वोल्फ्राम अल्फा'
  WHEN 'socratic'              THEN 'सुकराती'
  WHEN 'chegg-ai'              THEN 'चेग AI'
  WHEN 'brainly'               THEN 'ब्रेनली'
  WHEN 'byju-ai'               THEN 'बायजू AI'

  ELSE name_en
END;

-- ============================================================
-- PART 2: Add description_hi for all tools not already covered
-- (Migration 0005 covered: chatgpt, claude, gemini,
--  perplexity-ai, microsoft-copilot, midjourney, dall-e-3,
--  canva, adobe-firefly, notion-ai, grammarly, jasper-ai,
--  quillbot, elevenlabs, runway-ml, synthesia, descript,
--  github-copilot, cursor, v0-dev)
-- ============================================================

-- Chat & AI Assistants (remaining)
UPDATE public.ai_tools SET description_hi = 'मेटा द्वारा विकसित एक मुफ़्त एआई असिस्टेंट जो व्हाट्सएप, इंस्टाग्राम और फेसबुक पर उपलब्ध है।'
  WHERE slug = 'meta-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'एक्स (ट्विटर) द्वारा बनाया गया एक एआई चैटबॉट जो रियल-टाइम डेटा और खुलकर जवाब देने के लिए जाना जाता है।'
  WHERE slug = 'grok' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'एक एआई-पावर्ड सर्च इंजन जो हर सवाल का जवाब सोर्स के साथ देता है और वास्तविक समय में खोज करता है।'
  WHERE slug = 'you-com' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'एक इंटरैक्टिव एआई प्लेटफ़ॉर्म जहाँ आप काल्पनिक पात्रों और सेलिब्रिटी-स्टाइल बॉट्स के साथ बातचीत कर सकते हैं।'
  WHERE slug = 'character-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'एक मल्टी-मॉडल एआई प्लेटफ़ॉर्म जो ChatGPT, Claude, Gemini और कई अन्य एआई मॉडल्स को एक जगह पर उपलब्ध कराता है।'
  WHERE slug = 'poe' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'मार्केटिंग, ब्लॉगिंग और व्यावसायिक कंटेंट लिखने के लिए एक शक्तिशाली एआई राइटिंग टूल।'
  WHERE slug = 'writesonic' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'मार्केटिंग कॉपी, विज्ञापन और सोशल मीडिया पोस्ट तुरंत लिखने के लिए एक लोकप्रिय एआई राइटिंग टूल।'
  WHERE slug = 'copy-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'ब्लॉग, ईमेल और सोशल मीडिया के लिए कम लागत में एआई-जेनरेटेड कंटेंट बनाने वाला एक उपयोगी टूल।'
  WHERE slug = 'rytr' AND (description_hi IS NULL OR description_hi = description_en);

-- Image & Design (remaining)
UPDATE public.ai_tools SET description_hi = 'प्रोफेशनल क्वालिटी की एआई इमेज और आर्ट बनाने के लिए एक बेहतरीन टूल जो कई स्टाइल ऑप्शन देता है।'
  WHERE slug = 'leonardo-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'टेक्स्ट से हाई-क्वालिटी लोगो, पोस्टर और ग्राफिक्स बनाने के लिए एक उभरता हुआ एआई इमेज टूल।'
  WHERE slug = 'ideogram' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'कैनवा में बिल्ट-इन एआई फीचर्स जो मैजिक एडिट, बैकग्राउंड रिमूवल और ऑटो-डिजाइन को संभव बनाते हैं।'
  WHERE slug = 'canva-ai-magic-studio' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'ओपन-सोर्स एआई इमेज जेनरेटर जो लोकल और ऑनलाइन दोनों तरह से इस्तेमाल किया जा सकता है।'
  WHERE slug = 'stable-diffusion' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'डिजाइनर्स के लिए एक फ्री एआई इमेज जेनरेटर जो DALL-E और स्टेबल डिफ्यूजन दोनों को सपोर्ट करता है।'
  WHERE slug = 'playground-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'एक ऑल-इन-वन एआई इमेज एडिटिंग टूल जो बैकग्राउंड हटाने, रिलाइटिंग और क्लीनअप के लिए बना है।'
  WHERE slug = 'clipdrop' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'किसी भी इमेज का बैकग्राउंड सेकंडों में हटाने के लिए सबसे आसान और तेज़ ऑनलाइन टूल।'
  WHERE slug = 'remove-bg' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'एडोबी फोटोशॉप में जोड़े गए एआई फीचर्स जो जेनरेटिव फिल, रिमूवल और स्मार्ट एडिटिंग को आसान बनाते हैं।'
  WHERE slug = 'photoshop-ai' AND (description_hi IS NULL OR description_hi = description_en);

-- Video & Reels (remaining)
UPDATE public.ai_tools SET description_hi = 'एक एआई वीडियो जनरेटर जो टेक्स्ट और इमेज को सिनेमाई वीडियो क्लिप्स में बदल देता है।'
  WHERE slug = 'pika' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'ओपनएआई का वीडियो जेनरेशन मॉडल जो टेक्स्ट से हाई-क्वालिटी और रियलिस्टिक वीडियो बनाता है।'
  WHERE slug = 'sora' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'फोटो या टेक्स्ट से 3D और सिनेमाई वीडियो बनाने के लिए एक शक्तिशाली एआई वीडियो प्लेटफ़ॉर्म।'
  WHERE slug = 'luma-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'हाई-क्वालिटी रियलिस्टिक एआई वीडियो बनाने के लिए एक चीनी एआई टूल जो दुनियाभर में लोकप्रिय है।'
  WHERE slug = 'kling-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'स्क्रिप्ट से प्रोफेशनल मार्केटिंग वीडियो और रील्स मिनटों में बनाने के लिए एक भारतीय एआई टूल।'
  WHERE slug = 'invideo-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'लंबे वीडियो को सोशल मीडिया के लिए शॉर्ट और एंगेजिंग क्लिप्स में बदलने वाला एआई टूल।'
  WHERE slug = 'opus-clip' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'यूट्यूब और पॉडकास्ट कंटेंट को छोटे सोशल मीडिया क्लिप्स में ऑटोमेटिकली काटने वाला एआई टूल।'
  WHERE slug = 'vidyo-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'ब्लॉग या स्क्रिप्ट से एआई वॉयसओवर के साथ प्रोफेशनल वीडियो बनाने का एक आसान प्लेटफ़ॉर्म।'
  WHERE slug = 'pictory-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'टिकटॉक और इंस्टाग्राम रील्स जैसे शॉर्ट वीडियो और सोशल मीडिया कंटेंट बनाने के लिए एक लोकप्रिय ऐप।'
  WHERE slug = 'capcut' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'फोटो से एनिमेटेड अवतार और वीडियो बनाने वाला एआई टूल जो डिजिटल ह्यूमन टेक्नोलॉजी पर काम करता है।'
  WHERE slug = 'd-id' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'टेक्स्ट या स्क्रिप्ट से बोलने वाले रियलिस्टिक अवतार वीडियो बनाने के लिए एक एआई वीडियो प्लेटफ़ॉर्म।'
  WHERE slug = 'heygen' AND (description_hi IS NULL OR description_hi = description_en);

-- Content Creation & Writing (remaining)
UPDATE public.ai_tools SET description_hi = 'आपकी लेखन शैली को सरल, स्पष्ट और प्रभावी बनाने के लिए एक फ्री ऑनलाइन एडिटिंग टूल।'
  WHERE slug = 'hemingway-editor' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'एसईओ-ऑप्टिमाइज़्ड कंटेंट और कीवर्ड रिसर्च के लिए एक शक्तिशाली एआई राइटिंग और एसईओ टूल।'
  WHERE slug = 'surfer-seo' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'डिजिटल मार्केटिंग और एसईओ के लिए एक ऑल-इन-वन एआई प्लेटफ़ॉर्म जो रैंकिंग बढ़ाने में मदद करता है।'
  WHERE slug = 'semrush-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'एसईओ-फ्रेंडली ब्लॉग और आर्टिकल लिखने के लिए एआई रिसर्च और राइटिंग का एक संपूर्ण टूल।'
  WHERE slug = 'frase-io' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'किसी भी लिखे हुए टेक्स्ट को बेहतर, सरल और प्रभावी तरीके से फिर से लिखने वाला एआई राइटिंग असिस्टेंट।'
  WHERE slug = 'wordtune' AND (description_hi IS NULL OR description_hi = description_en);

-- Coding & Development (remaining)
UPDATE public.ai_tools SET description_hi = 'कोड ऑटोकम्पलीशन और सुझाव देने वाला एक एआई टूल जो वीएस कोड और अन्य एडिटर्स में काम करता है।'
  WHERE slug = 'tabnine' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'एक फ्री एआई कोड असिस्टेंट जो GitHub Copilot का बेहतरीन विकल्प है और कई IDE को सपोर्ट करता है।'
  WHERE slug = 'codeium' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'ब्राउज़र में कोड लिखने, रन करने और शेयर करने के लिए एक ऑनलाइन कोडिंग प्लेटफ़ॉर्म।'
  WHERE slug = 'replit' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'टेक्स्ट से पूरे वेब ऐप और प्रोजेक्ट बनाने के लिए एक एआई-पावर्ड फुल-स्टैक डेवलपमेंट प्लेटफ़ॉर्म।'
  WHERE slug = 'bolt-new' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'आइडिया से पूरी तरह काम करने वाली वेब एप्प बनाने वाला एक एआई-फर्स्ट ऐप बिल्डर।'
  WHERE slug = 'lovable' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'कर्सर की तरह एक एआई-पावर्ड कोड एडिटर जो आपके पूरे कोडबेस को समझकर स्मार्ट सुझाव देता है।'
  WHERE slug = 'windsurf' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'एक स्वायत्त एआई सॉफ्टवेयर इंजीनियर जो बग फिक्स करने से लेकर पूरे फीचर डेवलप करने तक का काम खुद कर सकता है।'
  WHERE slug = 'devin' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'वीएस कोड एक्सटेंशन जो क्लॉड एआई को आपके एडिटर में जोड़कर कोडिंग, डिबगिंग और रिफैक्टरिंग में मदद करता है।'
  WHERE slug = 'cline' AND (description_hi IS NULL OR description_hi = description_en);

-- Productivity (remaining)
UPDATE public.ai_tools SET description_hi = 'मीटिंग रिकॉर्ड करने, ट्रांसक्राइब करने और सारांश बनाने के लिए एक एआई नोट-टेकिंग असिस्टेंट।'
  WHERE slug = 'otter-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'मीटिंग को ऑटोमेटिकली रिकॉर्ड और ट्रांसक्राइब करने वाला एआई टूल जो एक्शन आइटम भी निकालता है।'
  WHERE slug = 'fireflies-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'मीटिंग के बाद ऑटोमेटिकली फॉलो-अप और एक्शन आइटम ट्रैक करने वाला एआई प्रोडक्टिविटी टूल।'
  WHERE slug = 'circleback' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'आपके कैलेंडर को एआई से ऑप्टिमाइज़ करने और समय की बर्बादी रोकने वाला एक स्मार्ट शेड्यूलिंग टूल।'
  WHERE slug = 'reclaim-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'आपके टास्क और कैलेंडर को एआई से मैनेज करके काम और फोकस टाइम को बैलेंस करने वाला टूल।'
  WHERE slug = 'motion-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'आपके नोट्स और विचारों को एआई से कनेक्ट करके एक स्मार्ट सेकंड ब्रेन बनाने वाला टूल।'
  WHERE slug = 'mem-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'मार्केटिंग कंटेंट को ऑडियंस के अनुसार ऑप्टिमाइज़ करने वाला एक एआई राइटिंग और परफॉर्मेंस टूल।'
  WHERE slug = 'anyword' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'न्यूज़लेटर लिखने और ईमेल ऑडियंस बनाने के लिए एक लोकप्रिय एआई-असिस्टेड पब्लिशिंग प्लेटफ़ॉर्म।'
  WHERE slug = 'beehiiv' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'टीम कोलैबोरेशन, टास्क मैनेजमेंट और एआई से प्रोजेक्ट प्लानिंग के लिए एक ऑल-इन-वन वर्कस्पेस।'
  WHERE slug = 'taskade' AND (description_hi IS NULL OR description_hi = description_en);

-- Music & Audio (remaining)
UPDATE public.ai_tools SET description_hi = 'टेक्स्ट प्रॉम्प्ट से ओरिजिनल गाने और म्यूजिक बनाने के लिए सबसे लोकप्रिय एआई म्यूजिक जेनरेटर।'
  WHERE slug = 'suno-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'हाई-क्वालिटी एआई-जेनरेटेड म्यूजिक बनाने के लिए एक शक्तिशाली ऑडियो जेनरेशन प्लेटफ़ॉर्म।'
  WHERE slug = 'udio' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'पॉडकास्ट और वॉयसओवर के लिए एआई से बैकग्राउंड नॉइज़ हटाने और ऑडियो क्वालिटी सुधारने का टूल।'
  WHERE slug = 'adobe-podcast' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'वीडियो और पॉडकास्ट के लिए रॉयल्टी-फ्री एआई-जेनरेटेड बैकग्राउंड म्यूजिक बनाने का टूल।'
  WHERE slug = 'soundraw' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'फिल्म, गेम और विज्ञापनों के लिए ओरिजिनल एआई-कम्पोज़्ड म्यूजिक बनाने वाला प्लेटफ़ॉर्म।'
  WHERE slug = 'aiva' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'वीडियो कंटेंट, पॉडकास्ट और स्ट्रीमिंग के लिए कस्टम एआई म्यूजिक जेनरेट करने वाला टूल।'
  WHERE slug = 'mubert' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'किसी भी आवाज़ को दूसरी आवाज़ में बदलकर प्रोफेशनल वॉयसओवर बनाने वाला एआई ऑडियो टूल।'
  WHERE slug = 'descript-overdub' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'ह्यूमन-क्वालिटी वॉयस क्लोनिंग और हिंदी सहित कई भाषाओं में टेक्स्ट-टू-स्पीच बनाने वाला एआई टूल।'
  WHERE slug = 'murf-ai' AND (description_hi IS NULL OR description_hi = description_en);

-- Business & Finance (remaining)
UPDATE public.ai_tools SET description_hi = 'प्रेजेंटेशन और पिच डेक बनाने के लिए एक एआई-पावर्ड टूल जो ऑटोमेटिकली सुंदर स्लाइड्स तैयार करता है।'
  WHERE slug = 'beautiful-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'टेक्स्ट से इंटरेक्टिव प्रेजेंटेशन, डॉक्यूमेंट और वेबपेज बनाने वाला एक लोकप्रिय एआई टूल।'
  WHERE slug = 'gamma-app' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'स्टोरी-स्टाइल प्रेजेंटेशन और पिच डेक बनाने के लिए एक एआई-असिस्टेड नैरेटिव प्लेटफ़ॉर्म।'
  WHERE slug = 'tome-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'सेल्सफोर्स CRM में बिल्ट-इन एआई जो बिक्री अनुमान, ग्राहक इंटेलिजेंस और स्वचालन प्रदान करता है।'
  WHERE slug = 'salesforce-einstein' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'हबस्पॉट में एआई फीचर्स जो मार्केटिंग, सेल्स और कस्टमर सर्विस को ऑटोमेट और इम्प्रूव करते हैं।'
  WHERE slug = 'hubspot-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'जोहो CRM और बिज़नेस सूट में एआई असिस्टेंट जो बिक्री पूर्वानुमान और ग्राहक विश्लेषण करता है।'
  WHERE slug = 'zoho-zia' AND (description_hi IS NULL OR description_hi = description_en);

-- Education (remaining)
UPDATE public.ai_tools SET description_hi = 'खान अकादमी का एआई ट्यूटर जो छात्रों को गणित, विज्ञान और अन्य विषय सिखाने में व्यक्तिगत मदद करता है।'
  WHERE slug = 'khanmigo' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'डुओलिंगो का एआई-पावर्ड प्रीमियम अनुभव जो भाषा सीखने को और मज़ेदार और प्रभावी बनाता है।'
  WHERE slug = 'duolingo-max' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'कैमरे से गणित के सवाल स्कैन करके स्टेप-बाय-स्टेप हल बताने वाला एआई मैथ सॉल्वर।'
  WHERE slug = 'photomath' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'जटिल गणित, विज्ञान और इंजीनियरिंग सवालों के जवाब के लिए दुनिया का सबसे शक्तिशाली कम्प्यूटेशनल ज्ञान इंजन।'
  WHERE slug = 'wolfram-alpha' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'गूगल का एक फ्री एआई होमवर्क हेल्पर जो फोटो से सवाल पहचानकर स्टेप-बाय-स्टेप जवाब देता है।'
  WHERE slug = 'socratic' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'छात्रों को होमवर्क, असाइनमेंट और परीक्षा की तैयारी में एआई से मदद करने वाला एक शिक्षा प्लेटफ़ॉर्म।'
  WHERE slug = 'chegg-ai' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'दुनियाभर के छात्रों और विशेषज्ञों का एक प्रश्न-उत्तर प्लेटफ़ॉर्म जो अब एआई-असिस्टेड उत्तर देता है।'
  WHERE slug = 'brainly' AND (description_hi IS NULL OR description_hi = description_en);

UPDATE public.ai_tools SET description_hi = 'भारतीय छात्रों के लिए एक लोकप्रिय एडटेक प्लेटफ़ॉर्म जो एआई से पर्सनलाइज़्ड लर्निंग अनुभव देता है।'
  WHERE slug = 'byju-ai' AND (description_hi IS NULL OR description_hi = description_en);

-- ============================================================
-- Verification
-- ============================================================
SELECT
  slug,
  name_en,
  name_hi,
  CASE WHEN description_hi IS NULL THEN 'MISSING'
       WHEN description_hi = description_en THEN 'SAME AS EN'
       ELSE 'OK'
  END as desc_hi_status
FROM public.ai_tools
ORDER BY slug;
