-- ============================================================
-- AIHKYA: Hindi descriptions for ALL 100 tools
-- Migration 0005 (complete — all 100 tools)
-- ============================================================

-- Chat & AI Assistants
UPDATE public.ai_tools SET description_hi = 'OpenAI का शक्तिशाली AI चैटबॉट जो सवालों के जवाब दे सकता है, कंटेंट लिख सकता है और कोडिंग में मदद करता है।' WHERE slug = 'chatgpt' ;
UPDATE public.ai_tools SET description_hi = 'Anthropic का सुरक्षित और सटीक AI असिस्टेंट जो बड़े दस्तावेज़ पढ़ने और जटिल कोडिंग कार्यों के लिए सबसे अच्छा है।' WHERE slug = 'claude' ;
UPDATE public.ai_tools SET description_hi = 'Google का सबसे उन्नत AI मॉडल जो टेक्स्ट, कोड, इमेज और ऑडियो समझकर प्रोसेस कर सकता है।' WHERE slug = 'gemini' ;
UPDATE public.ai_tools SET description_hi = 'सटीक इंटरनेट खोज के लिए एक AI सर्च इंजन जो हर जवाब के साथ रियल-टाइम स्रोत और लिंक देता है।' WHERE slug = 'perplexity-ai' ;
UPDATE public.ai_tools SET description_hi = 'Google का AI रिसर्च असिस्टेंट जो आपके दस्तावेज़ों का विश्लेषण करता है और नोट्स से पॉडकास्ट बना सकता है।' WHERE slug = 'notebooklm' ;
UPDATE public.ai_tools SET description_hi = 'X (Twitter) का AI चैटबॉट जो रियल-टाइम डेटा और खुलकर जवाब देने के लिए जाना जाता है।' WHERE slug = 'grok' ;
UPDATE public.ai_tools SET description_hi = 'एक AI-संचालित सर्च इंजन जो हर सवाल का जवाब स्रोत के साथ देता है।' WHERE slug = 'you-com' ;
UPDATE public.ai_tools SET description_hi = 'एक इंटरैक्टिव AI प्लेटफॉर्म जहाँ आप काल्पनिक पात्रों और मशहूर हस्तियों जैसे बॉट्स से बात कर सकते हैं।' WHERE slug = 'character-ai' ;
UPDATE public.ai_tools SET description_hi = 'एक मल्टी-मॉडल AI प्लेटफॉर्म जो ChatGPT, Claude, Gemini और कई AI मॉडल एक जगह पर उपलब्ध कराता है।' WHERE slug = 'poe' ;
UPDATE public.ai_tools SET description_hi = 'Microsoft का AI असिस्टेंट जो वेब सर्च, कंटेंट क्रिएशन और प्रोडक्टिविटी में मदद करता है।' WHERE slug = 'microsoft-copilot' ;
UPDATE public.ai_tools SET description_hi = 'Meta का मुफ़्त AI असिस्टेंट जो WhatsApp, Instagram और Facebook पर उपलब्ध है।' WHERE slug = 'meta-ai' ;

-- Image & Design
UPDATE public.ai_tools SET description_hi = 'टेक्स्ट से अत्यधिक यथार्थवादी और कलात्मक इमेज बनाने के लिए सबसे अच्छा AI टूल।' WHERE slug = 'midjourney' ;
UPDATE public.ai_tools SET description_hi = 'OpenAI का इमेज जनरेटर जो आपके टेक्स्ट विवरण को शानदार इमेज में बदल देता है।' WHERE slug = 'dall-e-3' ;
UPDATE public.ai_tools SET description_hi = 'प्रोफेशनल क्वालिटी AI इमेज और आर्ट बनाने के लिए एक बेहतरीन टूल।' WHERE slug = 'leonardo-ai' ;
UPDATE public.ai_tools SET description_hi = 'टेक्स्ट से हाई-क्वालिटी लोगो, पोस्टर और ग्राफिक्स बनाने के लिए एक AI इमेज टूल।' WHERE slug = 'ideogram' ;
UPDATE public.ai_tools SET description_hi = 'Canva में बिल्ट-इन AI फीचर जो मैजिक एडिट, बैकग्राउंड रिमूवल और ऑटो-डिज़ाइन को संभव बनाते हैं।' WHERE slug = 'canva-ai-magic-studio' ;
UPDATE public.ai_tools SET description_hi = 'एक लोकप्रिय ग्राफिक डिज़ाइन टूल जिसमें अब पावरफुल AI फीचर भी शामिल हैं।' WHERE slug = 'canva' ;
UPDATE public.ai_tools SET description_hi = 'Adobe का AI इमेज जनरेटर जो पेशेवर डिज़ाइनरों के लिए बनाया गया है।' WHERE slug = 'adobe-firefly' ;
UPDATE public.ai_tools SET description_hi = 'ओपन-सोर्स AI इमेज जनरेटर जो लोकल और ऑनलाइन दोनों तरीकों से उपयोग किया जा सकता है।' WHERE slug = 'stable-diffusion' ;
UPDATE public.ai_tools SET description_hi = 'डिज़ाइनरों के लिए एक मुफ़्त AI इमेज जनरेटर।' WHERE slug = 'playground-ai' ;
UPDATE public.ai_tools SET description_hi = 'एक ऑल-इन-वन AI इमेज एडिटिंग टूल जो बैकग्राउंड हटाने, रिलाइटिंग और क्लीनअप के लिए बना है।' WHERE slug = 'clipdrop' ;
UPDATE public.ai_tools SET description_hi = 'किसी भी इमेज का बैकग्राउंड सेकंड में हटाने के लिए सबसे आसान और तेज़ ऑनलाइन टूल।' WHERE slug = 'removebg' ;
UPDATE public.ai_tools SET description_hi = 'Adobe Photoshop में जोड़े गए AI फीचर जो जेनरेटिव फिल, रिमूवल और स्मार्ट एडिटिंग को आसान बनाते हैं।' WHERE slug = 'photoshop-ai' ;
UPDATE public.ai_tools SET description_hi = 'Figma के अंदर AI फीचर डिज़ाइन जनरेशन और एडिटिंग के लिए।' WHERE slug = 'figma-ai' ;
UPDATE public.ai_tools SET description_hi = 'AI फोटो स्टूडियो प्रोडक्ट फोटोग्राफी और सोशल कंटेंट के लिए।' WHERE slug = 'photoroom' ;
UPDATE public.ai_tools SET description_hi = 'AI लोगो जनरेटर जो मिनटों में पूरी ब्रांड किट बनाता है।' WHERE slug = 'looka' ;
UPDATE public.ai_tools SET description_hi = 'AI फोटो एडिटर ई-कॉमर्स प्रोडक्ट फोटोग्राफी के लिए।' WHERE slug = 'pixelcut' ;
UPDATE public.ai_tools SET description_hi = 'वेब और ऐप्स के लिए AI जनरेशन के साथ मुफ़्त 3D डिज़ाइन टूल।' WHERE slug = 'spline' ;
UPDATE public.ai_tools SET description_hi = 'फ़ॉन्ट और रंग की सिफारिशों के साथ AI लोगो मेकर।' WHERE slug = 'brandmark' ;
UPDATE public.ai_tools SET description_hi = 'मुफ़्त ओपन सोर्स डिज़ाइन और प्रोटोटाइपिंग प्लेटफॉर्म।' WHERE slug = 'penpot' ;
UPDATE public.ai_tools SET description_hi = 'रियल-टाइम AI इमेज जनरेशन और एन्हांसमेंट टूल।' WHERE slug = 'krea-ai' ;
UPDATE public.ai_tools SET description_hi = 'Microsoft का मुफ़्त AI इमेज जनरेटर जो DALL-E 3 का उपयोग करता है।' WHERE slug = 'bing-image-creator' ;

-- Video & Reels
UPDATE public.ai_tools SET description_hi = 'AI की मदद से वीडियो बनाने और एडिट करने का एक उन्नत टूल।' WHERE slug = 'runway-ml' ;
UPDATE public.ai_tools SET description_hi = 'एक AI वीडियो जनरेटर जो टेक्स्ट और इमेज को सिनेमेटिक वीडियो क्लिप में बदल देता है।' WHERE slug = 'pika' ;
UPDATE public.ai_tools SET description_hi = 'OpenAI का वीडियो जनरेशन मॉडल जो टेक्स्ट से हाई-क्वालिटी वीडियो बनाता है।' WHERE slug = 'sora' ;
UPDATE public.ai_tools SET description_hi = 'फोटो या टेक्स्ट से 3D और सिनेमेटिक वीडियो बनाने के लिए एक पावरफुल AI वीडियो प्लेटफॉर्म।' WHERE slug = 'luma-ai' ;
UPDATE public.ai_tools SET description_hi = 'उच्च गुणवत्ता वाले यथार्थवादी AI वीडियो बनाने के लिए एक लोकप्रिय टूल।' WHERE slug = 'kling-ai' ;
UPDATE public.ai_tools SET description_hi = 'स्क्रिप्ट से पेशेवर मार्केटिंग वीडियो और रील्स मिनटों में बनाने के लिए एक भारतीय AI टूल।' WHERE slug = 'invideo-ai' ;
UPDATE public.ai_tools SET description_hi = 'ऑडियो और वीडियो को टेक्स्ट की तरह एडिट करने के लिए एक सरल लेकिन पावरफुल AI टूल।' WHERE slug = 'descript' ;
UPDATE public.ai_tools SET description_hi = 'लंबे वीडियो को सोशल मीडिया के लिए छोटे और आकर्षक क्लिप में बदलने वाला AI टूल।' WHERE slug = 'opus-clip' ;
UPDATE public.ai_tools SET description_hi = 'YouTube और पॉडकास्ट कंटेंट को छोटे सोशल मीडिया क्लिप में स्वचालित रूप से काटने वाला AI टूल।' WHERE slug = 'vidyo-ai' ;
UPDATE public.ai_tools SET description_hi = 'ब्लॉग या स्क्रिप्ट से AI वॉयसओवर के साथ पेशेवर वीडियो बनाने का एक आसान प्लेटफॉर्म।' WHERE slug IN ('pictory-ai','pictory') ;
UPDATE public.ai_tools SET description_hi = 'टेक्स्ट या स्क्रिप्ट से कस्टम अवतार के साथ पेशेवर वीडियो बनाने के लिए एक AI वीडियो जनरेटर।' WHERE slug = 'synthesia' ;
UPDATE public.ai_tools SET description_hi = 'टेक्स्ट या स्क्रिप्ट से बोलने वाले यथार्थवादी अवतार वीडियो बनाने के लिए एक AI वीडियो प्लेटफॉर्म।' WHERE slug = 'heygen' ;
UPDATE public.ai_tools SET description_hi = 'फोटो से एनिमेटेड अवतार और वीडियो बनाने वाला AI टूल।' WHERE slug = 'd-id' ;
UPDATE public.ai_tools SET description_hi = 'TikTok और Instagram Reels जैसे शॉर्ट वीडियो बनाने के लिए एक लोकप्रिय मुफ़्त ऐप।' WHERE slug = 'capcut' ;
UPDATE public.ai_tools SET description_hi = 'AI वीडियो मेकर जिसमें टेक्स्ट-टू-वीडियो और वॉयस जनरेशन है। हिंदी सहित 75+ भाषाएं सपोर्ट करता है।' WHERE slug = 'fliki' ;
UPDATE public.ai_tools SET description_hi = 'AI वीडियो क्रिएटर जो ब्लॉग पोस्ट को मार्केटिंग वीडियो में बदलता है।' WHERE slug = 'lumen5' ;
UPDATE public.ai_tools SET description_hi = 'AI प्रेजेंटेशन मेकर जिसमें स्मार्ट टेम्पलेट और ऑटो-डिज़ाइन है।' WHERE slug = 'beautiful-ai' ;

-- Content Creation & Writing
UPDATE public.ai_tools SET description_hi = 'नोट्स लेने, प्रोजेक्ट मैनेज करने और स्वचालित रूप से कंटेंट लिखने के लिए AI के साथ एकीकृत एक ऑल-इन-वन वर्कस्पेस।' WHERE slug = 'notion-ai' ;
UPDATE public.ai_tools SET description_hi = 'ग्रामर, स्पेलिंग और स्पष्टता सुधारकर आपकी लेखनी को बेहतर बनाने वाला एक AI लेखन सहायक।' WHERE slug = 'grammarly' ;
UPDATE public.ai_tools SET description_hi = 'आपकी लेखनी शैली को सरल, स्पष्ट और प्रभावी बनाने के लिए एक मुफ़्त ऑनलाइन एडिटिंग टूल।' WHERE slug = 'hemingway-editor' ;
UPDATE public.ai_tools SET description_hi = 'SEO-ऑप्टिमाइज़ड आर्टिकल, ब्लॉग पोस्ट और मार्केटिंग कंटेंट लिखने के लिए एक उन्नत AI टूल।' WHERE slug = 'surfer-seo' ;
UPDATE public.ai_tools SET description_hi = 'डिजिटल मार्केटिंग और SEO के लिए एक ऑल-इन-वन AI प्लेटफॉर्म।' WHERE slug IN ('semrush-ai','semrush') ;
UPDATE public.ai_tools SET description_hi = 'SEO-फ्रेंडली ब्लॉग और आर्टिकल लिखने के लिए AI रिसर्च और राइटिंग का एक कम्प्लीट टूल।' WHERE slug = 'frase-io' ;
UPDATE public.ai_tools SET description_hi = 'किसी भी लिखे हुए टेक्स्ट को बेहतर और प्रभावी तरीके से दोबारा लिखने वाला AI लेखन सहायक।' WHERE slug = 'wordtune' ;
UPDATE public.ai_tools SET description_hi = 'मार्केटिंग, ब्लॉगिंग और बिज़नेस कंटेंट लिखने के लिए एक पावरफुल AI राइटिंग टूल।' WHERE slug IN ('jasper-ai','jasper') ;
UPDATE public.ai_tools SET description_hi = 'मार्केटिंग कॉपी, विज्ञापन और सोशल मीडिया पोस्ट जल्दी लिखने के लिए एक लोकप्रिय AI राइटिंग टूल।' WHERE slug = 'writesonic' ;
UPDATE public.ai_tools SET description_hi = 'ब्लॉग, ईमेल और सोशल मीडिया के लिए कम लागत में AI-जनरेटेड कंटेंट बनाने वाला एक उपयोगी टूल।' WHERE slug IN ('rytr','copy-ai','copyai') ;
UPDATE public.ai_tools SET description_hi = 'किसी भी लिखे हुए टेक्स्ट को बेहतर और प्रभावी तरीके से रिराइट करने वाला AI राइटिंग सहायक।' WHERE slug = 'quillbot' ;
UPDATE public.ai_tools SET description_hi = 'टेक्स्ट को विज़ुअल डायग्राम और इलस्ट्रेशन में बदलने वाला AI टूल।' WHERE slug = 'napkin-ai' ;
UPDATE public.ai_tools SET description_hi = 'टेक्स्ट से इंटरैक्टिव प्रेजेंटेशन, दस्तावेज़ और वेबपेज बनाने वाला एक लोकप्रिय AI टूल।' WHERE slug IN ('gamma-app','gamma') ;
UPDATE public.ai_tools SET description_hi = 'स्टोरी-स्टाइल प्रेजेंटेशन और पिच डेक बनाने के लिए एक AI-असिस्टेड नैरेटिव प्लेटफॉर्म।' WHERE slug IN ('tome-ai','tome') ;
UPDATE public.ai_tools SET description_hi = 'शैक्षणिक पेपर और रिसर्च के लिए AI राइटिंग असिस्टेंट।' WHERE slug = 'jenni-ai' ;

-- Coding & Development
UPDATE public.ai_tools SET description_hi = 'डेवलपर्स के लिए एक AI कोडिंग असिस्टेंट जो रियल टाइम में कोड स्निपेट और फंक्शन सुझाता है।' WHERE slug = 'github-copilot' ;
UPDATE public.ai_tools SET description_hi = 'VS Code पर आधारित एक उन्नत AI कोड एडिटर जो आपकी पूरी कोडिंग प्रक्रिया को सुपरचार्ज करता है।' WHERE slug = 'cursor' ;
UPDATE public.ai_tools SET description_hi = 'कोड ऑटोकम्प्लीट और सुझाव देने वाला एक AI टूल जो VS Code और अन्य एडिटर में काम करता है।' WHERE slug = 'tabnine' ;
UPDATE public.ai_tools SET description_hi = 'एक मुफ़्त AI कोड असिस्टेंट जो GitHub Copilot का एक बेहतरीन विकल्प है।' WHERE slug = 'codeium' ;
UPDATE public.ai_tools SET description_hi = 'ब्राउज़र में कोड लिखने, रन करने और शेयर करने के लिए एक ऑनलाइन कोडिंग प्लेटफॉर्म।' WHERE slug = 'replit' ;
UPDATE public.ai_tools SET description_hi = 'सेकंड में आधुनिक UI कॉम्पोनेंट और वेब डिज़ाइन बनाने के लिए एक AI टूल।' WHERE slug IN ('v0-dev','v0-by-vercel') ;
UPDATE public.ai_tools SET description_hi = 'टेक्स्ट से पूरे वेब ऐप्स और प्रोजेक्ट बनाने के लिए एक AI-संचालित फुल-स्टैक डेवलपमेंट प्लेटफॉर्म।' WHERE slug IN ('bolt-new','boltnew') ;
UPDATE public.ai_tools SET description_hi = 'आइडिया से पूरी तरह काम करने वाला वेब ऐप बनाने वाला एक AI-फर्स्ट ऐप बिल्डर।' WHERE slug = 'lovable' ;
UPDATE public.ai_tools SET description_hi = 'Cursor की तरह एक AI-संचालित कोड एडिटर जो आपका पूरा कोडबेस समझकर स्मार्ट सुझाव देता है।' WHERE slug = 'windsurf' ;
UPDATE public.ai_tools SET description_hi = 'एक स्वायत्त AI सॉफ्टवेयर इंजीनियर जो बग फिक्स से लेकर पूरे फीचर डेवलप करने तक का काम खुद कर सकता है।' WHERE slug = 'devin' ;
UPDATE public.ai_tools SET description_hi = 'VS Code एक्सटेंशन जो Claude AI को आपके एडिटर में जोड़कर कोडिंग, डिबगिंग और रिफैक्टरिंग में मदद करता है।' WHERE slug = 'cline' ;
UPDATE public.ai_tools SET description_hi = 'Anthropic का CLI कोडिंग एजेंट जो स्वायत्त डेवलपमेंट कार्य करता है।' WHERE slug = 'claude-code' ;
UPDATE public.ai_tools SET description_hi = 'AI-संचालित वेबसाइट बिल्डर जिसमें सुंदर टेम्पलेट और एनिमेशन हैं।' WHERE slug = 'framer' ;
UPDATE public.ai_tools SET description_hi = 'PostgreSQL, ऑथ और स्टोरेज के साथ ओपन सोर्स Firebase विकल्प।' WHERE slug = 'supabase' ;
UPDATE public.ai_tools SET description_hi = 'ऐप्स, डेटाबेस और सेवाओं को डिप्लॉय करने के लिए एक सरल क्लाउड प्लेटफॉर्म।' WHERE slug = 'railway' ;
UPDATE public.ai_tools SET description_hi = '400+ इंटीग्रेशन और AI नोड्स के साथ ओपन सोर्स वर्कफ्लो ऑटोमेशन।' WHERE slug = 'n8n' ;

-- Productivity
UPDATE public.ai_tools SET description_hi = 'मीटिंग रिकॉर्ड करने, ट्रांसक्राइब करने और सारांश बनाने के लिए एक AI नोट-टेकिंग असिस्टेंट।' WHERE slug IN ('otter-ai','otterai') ;
UPDATE public.ai_tools SET description_hi = 'मीटिंग को स्वचालित रूप से रिकॉर्ड और ट्रांसक्राइब करने वाला AI टूल जो एक्शन आइटम भी निकालता है।' WHERE slug = 'fireflies-ai' ;
UPDATE public.ai_tools SET description_hi = 'मीटिंग के बाद स्वचालित रूप से फॉलो-अप और एक्शन आइटम ट्रैक करने वाला AI प्रोडक्टिविटी टूल।' WHERE slug = 'circleback' ;
UPDATE public.ai_tools SET description_hi = 'आपके कैलेंडर को AI से ऑप्टिमाइज़ करने और समय की बर्बादी रोकने वाला एक स्मार्ट शेड्यूलिंग टूल।' WHERE slug = 'reclaim-ai' ;
UPDATE public.ai_tools SET description_hi = 'आपके टास्क और कैलेंडर को AI से मैनेज करके काम और फोकस टाइम को बैलेंस करने वाला टूल।' WHERE slug IN ('motion-ai','motion') ;
UPDATE public.ai_tools SET description_hi = 'आपके नोट्स और आइडिया को AI से कनेक्ट करके एक स्मार्ट सेकंड ब्रेन बनाने वाला टूल।' WHERE slug = 'mem-ai' ;
UPDATE public.ai_tools SET description_hi = 'मार्केटिंग कंटेंट को ऑडियंस के हिसाब से ऑप्टिमाइज़ करने वाला एक AI राइटिंग और परफॉर्मेंस टूल।' WHERE slug = 'anyword' ;
UPDATE public.ai_tools SET description_hi = 'न्यूज़लेटर लिखने और ईमेल ऑडियंस बनाने के लिए एक लोकप्रिय AI-असिस्टेड पब्लिशिंग प्लेटफॉर्म।' WHERE slug = 'beehiiv' ;
UPDATE public.ai_tools SET description_hi = 'टीम कोलैबोरेशन, टास्क मैनेजमेंट और AI से प्रोजेक्ट प्लानिंग के लिए एक ऑल-इन-वन वर्कस्पेस।' WHERE slug = 'taskade' ;
UPDATE public.ai_tools SET description_hi = 'ऑल-इन-वन प्रोजेक्ट मैनेजमेंट जिसमें AI राइटिंग और टास्क ऑटोमेशन है।' WHERE slug = 'clickup-ai' ;
UPDATE public.ai_tools SET description_hi = '7000+ ऐप को बिना कोड के कनेक्ट करने वाला ऑटोमेशन प्लेटफॉर्म।' WHERE slug = 'zapier' ;
UPDATE public.ai_tools SET description_hi = '1000+ ऐप को ड्रैग-एंड-ड्रॉप से कनेक्ट करने वाला विज़ुअल ऑटोमेशन प्लेटफॉर्म।' WHERE slug = 'make-com' ;
UPDATE public.ai_tools SET description_hi = 'AI-संचालित ईमेल क्लाइंट जो ईमेल लिखने की स्पीड दोगुनी कर देता है।' WHERE slug = 'superhuman' ;
UPDATE public.ai_tools SET description_hi = 'AI-संचालित बुकमार्क और फाइल ऑर्गनाइज़र जो ऑटो-कैटेगोराइज़ करता है।' WHERE slug = 'mymind' ;
UPDATE public.ai_tools SET description_hi = 'AI टेक्स्ट-टू-स्पीच रीडर जो कोई भी टेक्स्ट प्राकृतिक रूप से पढ़कर सुनाता है।' WHERE slug = 'speechify' ;
UPDATE public.ai_tools SET description_hi = 'AI नॉइज़ कैंसलेशन और मीटिंग ट्रांसक्रिप्शन कॉल्स के लिए।' WHERE slug = 'krisp' ;

-- Music & Audio
UPDATE public.ai_tools SET description_hi = 'टेक्स्ट प्रॉम्प्ट से ओरिजिनल गाने और म्यूजिक बनाने के लिए सबसे लोकप्रिय AI म्यूजिक जनरेटर।' WHERE slug = 'suno-ai' ;
UPDATE public.ai_tools SET description_hi = 'हाई-क्वालिटी AI-जनरेटेड म्यूजिक बनाने के लिए एक पावरफुल ऑडियो जनरेशन प्लेटफॉर्म।' WHERE slug = 'udio' ;
UPDATE public.ai_tools SET description_hi = 'एक प्रोफेशनल टेक्स्ट-टू-स्पीच AI जो बहुत यथार्थवादी और मानव-जैसी आवाजें उत्पन्न करता है।' WHERE slug = 'elevenlabs' ;
UPDATE public.ai_tools SET description_hi = 'AI वॉयसओवर और टेक्स्ट-टू-स्पीच जिसमें प्राकृतिक आवाजें हैं। हिंदी वॉयस सपोर्ट करता है।' WHERE slug = 'murf-ai' ;
UPDATE public.ai_tools SET description_hi = 'किसी भी आवाज़ को दूसरी आवाज़ में बदलकर प्रोफेशनल वॉयसओवर बनाने वाला AI ऑडियो टूल।' WHERE slug = 'descript-overdub' ;
UPDATE public.ai_tools SET description_hi = 'वीडियो और पॉडकास्ट के लिए AI से बैकग्राउंड नॉइज़ हटाने और ऑडियो क्वालिटी सुधारने का टूल।' WHERE slug = 'adobe-podcast' ;
UPDATE public.ai_tools SET description_hi = 'वीडियो और पॉडकास्ट के लिए रॉयल्टी-फ्री AI-जनरेटेड बैकग्राउंड म्यूजिक बनाने का टूल।' WHERE slug = 'soundraw' ;
UPDATE public.ai_tools SET description_hi = 'फिल्म, गेम और विज्ञापनों के लिए ओरिजिनल AI-कम्पोज़ड म्यूजिक बनाने वाला प्लेटफॉर्म।' WHERE slug = 'aiva' ;
UPDATE public.ai_tools SET description_hi = 'वीडियो कंटेंट, पॉडकास्ट और स्ट्रीमिंग के लिए कस्टम AI म्यूजिक जेनरेट करने वाला टूल।' WHERE slug = 'mubert' ;

-- Business & Finance
UPDATE public.ai_tools SET description_hi = 'प्रेजेंटेशन और पिच डेक बनाने के लिए एक AI-संचालित टूल जो स्वचालित रूप से सुंदर स्लाइड तैयार करता है।' WHERE slug = 'beautiful-ai' ;
UPDATE public.ai_tools SET description_hi = 'Salesforce CRM में बिल्ट-इन AI जो सेल्स फोरकास्टिंग और कस्टमर इंटेलिजेंस प्रदान करता है।' WHERE slug = 'salesforce-einstein' ;
UPDATE public.ai_tools SET description_hi = 'HubSpot में AI फीचर जो मार्केटिंग, सेल्स और कस्टमर सर्विस को ऑटोमेट और सुधारते हैं।' WHERE slug = 'hubspot-ai' ;
UPDATE public.ai_tools SET description_hi = 'Zoho CRM और बिज़नेस सूट में AI असिस्टेंट जो सेल्स फोरकास्टिंग और कस्टमर एनालिसिस करता है।' WHERE slug = 'zoho-zia' ;
UPDATE public.ai_tools SET description_hi = 'वेबसाइटों के लिए AI कस्टमर सपोर्ट चैटबॉट।' WHERE slug = 'tidio' ;
UPDATE public.ai_tools SET description_hi = 'AI-फर्स्ट कस्टमर सर्विस प्लेटफॉर्म जिसमें चैटबॉट और हेल्प डेस्क है।' WHERE slug = 'intercom' ;
UPDATE public.ai_tools SET description_hi = 'भारत का #1 बिलिंग और अकाउंटिंग ऐप छोटे व्यवसायों के लिए।' WHERE slug = 'vyapar' ;
UPDATE public.ai_tools SET description_hi = 'AI कंटेंट सुझावों के साथ सोशल मीडिया मैनेजमेंट।' WHERE slug = 'hootsuite-owlywriter-ai' ;
UPDATE public.ai_tools SET description_hi = 'AI असिस्टेंट के साथ सरल सोशल मीडिया शेड्यूलर।' WHERE slug = 'buffer' ;
UPDATE public.ai_tools SET description_hi = 'AI कैप्शन राइटर और बेस्ट-टाइम पोस्टिंग के साथ सोशल मीडिया शेड्यूलिंग।' WHERE slug = 'later' ;
UPDATE public.ai_tools SET description_hi = 'AI-संचालित B2B लीड जनरेशन और सेल्स इंटेलिजेंस प्लेटफॉर्म।' WHERE slug = 'apollo-io' ;
UPDATE public.ai_tools SET description_hi = 'AI-संचालित ईमेल वार्मअप के साथ कोल्ड ईमेल आउटरीच प्लेटफॉर्म।' WHERE slug = 'instantly-ai' ;
UPDATE public.ai_tools SET description_hi = 'AI कंटेंट ऑप्टिमाइज़र और ऑडियंस सेग्मेंटेशन के साथ ईमेल मार्केटिंग।' WHERE slug = 'mailchimp-ai' ;
UPDATE public.ai_tools SET description_hi = 'बैकलिंक, कीवर्ड रिसर्च और साइट ऑडिट के लिए SEO टूलसेट।' WHERE slug = 'ahrefs' ;
UPDATE public.ai_tools SET description_hi = 'पोस्ट, रील्स और विज्ञापनों के लिए AI सोशल मीडिया कंटेंट जनरेटर।' WHERE slug = 'predis-ai' ;
UPDATE public.ai_tools SET description_hi = 'ईमेल, SMS, WhatsApp और CRM के साथ ऑल-इन-वन मार्केटिंग प्लेटफॉर्म।' WHERE slug = 'brevo' ;
UPDATE public.ai_tools SET description_hi = 'सोशल मीडिया और Google Ads के लिए AI-जनरेटेड एड क्रिएटिव।' WHERE slug = 'adcreativeai' ;

-- Education
UPDATE public.ai_tools SET description_hi = 'Khan Academy का AI ट्यूटर जो छात्रों को गणित, विज्ञान और अन्य विषयों को व्यक्तिगत रूप से सिखाने में मदद करता है।' WHERE slug = 'khanmigo' ;
UPDATE public.ai_tools SET description_hi = 'Duolingo का AI-संचालित प्रीमियम अनुभव जो भाषा सीखना और भी मज़ेदार बनाता है।' WHERE slug = 'duolingo-max' ;
UPDATE public.ai_tools SET description_hi = 'कैमरा से गणित के सवाल स्कैन करके चरण-दर-चरण समाधान बताने वाला AI गणित सॉल्वर।' WHERE slug = 'photomath' ;
UPDATE public.ai_tools SET description_hi = 'जटिल गणित, विज्ञान और इंजीनियरिंग सवालों के जवाब के लिए दुनिया का सबसे शक्तिशाली कम्प्यूटेशनल नॉलेज इंजन।' WHERE slug = 'wolfram-alpha' ;
UPDATE public.ai_tools SET description_hi = 'Google का एक मुफ़्त AI होमवर्क हेल्पर जो फोटो से सवाल पहचानकर चरण-दर-चरण जवाब देता है।' WHERE slug = 'socratic' ;
UPDATE public.ai_tools SET description_hi = 'छात्रों को होमवर्क, असाइनमेंट और परीक्षा की तैयारी में AI से मदद करने वाला एक शिक्षा प्लेटफॉर्म।' WHERE slug = 'chegg-ai' ;
UPDATE public.ai_tools SET description_hi = 'दुनियाभर के छात्रों और विशेषज्ञों का एक Q&A प्लेटफॉर्म जो अब AI-असिस्टेड जवाब देता है।' WHERE slug = 'brainly' ;
UPDATE public.ai_tools SET description_hi = 'भारतीय छात्रों के लिए एक लोकप्रिय EdTech प्लेटफॉर्म जो AI से व्यक्तिगत शिक्षा अनुभव देता है।' WHERE slug = 'byju-ai' ;
UPDATE public.ai_tools SET description_hi = 'शिक्षा के लिए AI-संचालित क्विज़ और गेम क्रिएशन।' WHERE slug = 'kahoot-ai' ;
UPDATE public.ai_tools SET description_hi = 'वैज्ञानिक रिसर्च पेपर के लिए AI सर्च इंजन।' WHERE slug = 'consensus' ;
UPDATE public.ai_tools SET description_hi = 'AI-संचालित फ्लैशकार्ड और स्टडी टूल छात्रों के लिए।' WHERE slug = 'quizlet-ai' ;
UPDATE public.ai_tools SET description_hi = 'ऑनलाइन कोर्स प्लेटफॉर्म जिसमें AI-संचालित करिकुलम बिल्डर है।' WHERE slug = 'teachable' ;
UPDATE public.ai_tools SET description_hi = 'AI रिसर्च असिस्टेंट जो academic papers ढूंढता और summarize करता है।' WHERE slug = 'elicit' ;
UPDATE public.ai_tools SET description_hi = 'लाइव पोल और क्विज़ के साथ AI-संचालित इंटरैक्टिव प्रेजेंटेशन।' WHERE slug = 'mentimeter' ;
UPDATE public.ai_tools SET description_hi = 'AI आर्टिकल समराइज़र जो papers से flashcards बनाता है।' WHERE slug = 'scholarcy' ;

-- Data & Analytics
UPDATE public.ai_tools SET description_hi = 'AI डेटा एनालिस्ट जो आपके डेटा के बारे में सवालों का जवाब देता है और बिना कोडिंग के चार्ट बनाता है।' WHERE slug = 'julius-ai' ;
UPDATE public.ai_tools SET description_hi = 'AI-संचालित स्प्रेडशीट जो आपके डेटा के बारे में सवालों का जवाब देती है।' WHERE slug = 'rows-ai' ;
UPDATE public.ai_tools SET description_hi = 'स्प्रेडशीट से AI-संचालित डेटा विज़ुअलाइज़ेशन और डैशबोर्ड बिल्डर।' WHERE slug = 'polymer' ;
UPDATE public.ai_tools SET description_hi = 'सेंटिमेंट, क्लासिफिकेशन और एक्सट्रैक्शन के लिए नो-कोड AI टेक्स्ट एनालिटिक्स।' WHERE slug = 'monkeylearn' ;
UPDATE public.ai_tools SET description_hi = 'AI-संचालित Google Sheets ऐड-ऑन जो लाइव डेटा कनेक्शन प्रदान करता है।' WHERE slug = 'coefficient' ;
UPDATE public.ai_tools SET description_hi = 'Google Sheets और Excel के लिए AI फॉर्मूला जनरेटर।' WHERE slug IN ('sheet+-/-sheetgpt') ;

-- Verification
SELECT COUNT(*) as tools_with_hindi_desc FROM public.ai_tools WHERE description_hi IS NOT NULL AND description_hi != description_en;
