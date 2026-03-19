-- ============================================================
-- AIHKYA: Update description_hi for Popular Tools
-- Run this in Supabase SQL Editor
-- This will fix the "English showing in tools description" issue
-- ============================================================

-- Chat & Assistants
UPDATE public.ai_tools SET description_hi = 'ओपनएआई द्वारा विकसित एक शक्तिशाली एआई चैटबॉट जो सवालों के जवाब दे सकता है, कंटेंट लिख सकता है और कोडिंग में मदद कर सकता है।' WHERE slug = 'chatgpt';
UPDATE public.ai_tools SET description_hi = 'एंथ्रोपिक द्वारा निर्मित एक सुरक्षित और सटीक एआई सहायक, जो लंबे दस्तावेज़ों को पढ़ने और जटिल कोडिंग कार्यों के लिए उत्कृष्ट है।' WHERE slug = 'claude';
UPDATE public.ai_tools SET description_hi = 'गूगल का सबसे उन्नत और सक्षम एआई मॉडल जो टेक्स्ट, कोड, छवियों और ऑडियो को समझ सकता है और प्रोसेस कर सकता है।' WHERE slug = 'gemini';
UPDATE public.ai_tools SET description_hi = 'सटीक इंटरनेट खोजों के लिए डिज़ाइन किया गया एक एआई खोज इंजन जो हर उत्तर के लिए वास्तविक समय के स्रोत और लिंक प्रदान करता है।' WHERE slug = 'perplexity-ai';
UPDATE public.ai_tools SET description_hi = 'माइक्रोसॉफ्ट का एआई परिचर जो वेब खोजों, सामग्री निर्माण और उत्पादकता में सहायता करता है।' WHERE slug = 'microsoft-copilot';

-- Image & Design
UPDATE public.ai_tools SET description_hi = 'अत्यधिक यथार्थवादी और कलात्मक चित्र बनाने के लिए एक बेहतरीन एआई टूल जो टेक्स्ट प्रॉम्प्ट से सीधे काम करता है।' WHERE slug = 'midjourney';
UPDATE public.ai_tools SET description_hi = 'ओपनएआई का इमेज जनरेटर जो आपके टेक्स्ट विवरणों को आश्चर्यजनक और सटीक छवियों में बदल देता है।' WHERE slug = 'dall-e-3';
UPDATE public.ai_tools SET description_hi = 'एक लोकप्रिय ग्राफिक डिजाइन टूल जिसमें अब मैजिक स्टूडियो जैसे शक्तिशाली एआई फीचर्स शामिल हैं।' WHERE slug = 'canva';
UPDATE public.ai_tools SET description_hi = 'एडोबी का एआई इमेज जनरेटर जो पेशेवर डिजाइनरों के लिए बनाया गया है और वाणिज्यिक उपयोग के लिए सुरक्षित है।' WHERE slug = 'adobe-firefly';

-- Content & Writing
UPDATE public.ai_tools SET description_hi = 'नोट्स लेने, प्रोजेक्ट्स को प्रबंधित करने और स्वचालित रूप से कंटेंट लिखने के लिए एआई के साथ एकीकृत एक ऑल-इन-वन वर्कस्पेस।' WHERE slug = 'notion-ai';
UPDATE public.ai_tools SET description_hi = 'व्याकरण, वर्तनी और स्पष्टता में सुधार करके आपके लेखन को बेहतर बनाने वाला एक एआई लेखन सहायक।' WHERE slug = 'grammarly';
UPDATE public.ai_tools SET description_hi = 'एसईओ अनुकूलित लेख, ब्लॉग पोस्ट और विपणन सामग्री लिखने के लिए एक उन्नत एआई टूल।' WHERE slug = 'jasper-ai';
UPDATE public.ai_tools SET description_hi = 'वाक्यों को फिर से लिखने और सामग्री को बेहतर बनाने के लिए एक उत्कृष्ट पैराफ्रेजिंग टूल।' WHERE slug = 'quillbot';

-- Video & Audio
UPDATE public.ai_tools SET description_hi = 'एक पेशेवर टेक्स्ट-टू-स्पीच एआई जो बेहद यथार्थवादी और मानवीय आवाज़ें उत्पन्न करता है।' WHERE slug = 'elevenlabs';
UPDATE public.ai_tools SET description_hi = 'एआई की मदद से वीडियो बनाने और संपादित करने का एक उन्नत टूल।' WHERE slug = 'runway-ml';
UPDATE public.ai_tools SET description_hi = 'टेक्स्ट या स्क्रिप्ट से कस्टम अवतारों के साथ पेशेवर वीडियो बनाने के लिए एक एआई वीडियो जनरेटर।' WHERE slug = 'synthesia';
UPDATE public.ai_tools SET description_hi = 'ऑडियो और वीडियो को टेक्स्ट की तरह संपादित करने के लिए एक सरल लेकिन शक्तिशाली एआई उपकरण।' WHERE slug = 'descript';

-- Coding
UPDATE public.ai_tools SET description_hi = 'डेवलपर्स के लिए एक एआई कोडिंग सहायक जो वास्तविक समय में कोड स्निपेट्स और फ़ंक्शंस का सुझाव देता है।' WHERE slug = 'github-copilot';
UPDATE public.ai_tools SET description_hi = 'वीएस कोड पर आधारित एक उन्नत एआई कोड संपादक जो आपकी पूरी कोडिंग प्रक्रिया को सुपरचार्ज करता है।' WHERE slug = 'cursor';
UPDATE public.ai_tools SET description_hi = 'सेकंडों में आधुनिक यूआई घटक और वेब डिज़ाइन बनाने के लिए एक एआई टूल।' WHERE slug = 'v0-dev';

-- ============================================================
-- Verification: Check what was updated
-- ============================================================
SELECT name_en, description_hi 
FROM public.ai_tools 
WHERE description_hi IS NOT NULL;
