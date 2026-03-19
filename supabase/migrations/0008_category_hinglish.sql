-- ============================================================
-- AIHKYA: Add Hinglish columns to task_categories (complete)
-- Migration 0008 (complete — all 18 categories)
-- Safe to re-run (IF NOT EXISTS guards)
-- ============================================================

-- STEP 1: Add Hinglish columns to task_categories (idempotent)
ALTER TABLE public.task_categories
  ADD COLUMN IF NOT EXISTS name_hinglish VARCHAR(255),
  ADD COLUMN IF NOT EXISTS description_hinglish TEXT;

-- STEP 2: Update name_hinglish for all 18 categories
UPDATE public.task_categories SET
  name_hinglish = CASE slug
    WHEN 'content-creation'    THEN 'Content Banao'
    WHEN 'business-tools'      THEN 'Business Tools'
    WHEN 'image-design'        THEN 'Photo aur Design'
    WHEN 'video-reels'         THEN 'Video aur Reels'
    WHEN 'productivity'        THEN 'Productivity Badhao'
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
  END;

-- STEP 3: Update description_hinglish for all 18 categories
UPDATE public.task_categories SET
  description_hinglish = CASE slug
    WHEN 'content-creation'
      THEN 'Blogs, social media posts, aur marketing copy likhne ke liye best AI tools — bilkul free ya low cost mein.'
    WHEN 'business-tools'
      THEN 'Aapke business ko grow karne, customers manage karne aur operations streamline karne ke liye AI-powered tools.'
    WHEN 'image-design'
      THEN 'Text se stunning images, logos, graphics aur visual content banane ke liye best AI design tools.'
    WHEN 'video-reels'
      THEN 'Short videos, reels, marketing films aur professional video content banane ke liye top AI video tools.'
    WHEN 'productivity'
      THEN 'Apna kaam tezi se khatam karo aur time waste kam karo — productivity ke liye best AI tools.'
    WHEN 'marketing-seo'
      THEN 'Website ki Google ranking badhao aur effective marketing campaigns run karo in AI tools se.'
    WHEN 'education-learning'
      THEN 'Students, teachers aur professionals ke liye AI se seekhne, padhane aur research karne ke top tools.'
    WHEN 'coding-dev'
      THEN 'Code likhne, debug karne, apps banana aur deploy karne ke liye best AI coding aur development tools.'
    WHEN 'music-audio'
      THEN 'AI se original music, professional voiceovers aur audio content banao — royalty-free bhi milta hai.'
    WHEN 'chat-assistants'
      THEN 'Questions ke jawab pao, research karo aur kaam mein madad lo in popular AI chatbots aur assistants se.'
    WHEN 'gst-tax'
      THEN 'GST filing, tax calculation, invoice banana aur compliance ke liye India-specific AI tools.'
    WHEN 'whatsapp-business'
      THEN 'WhatsApp par customer service automate karo, bulk messages bhejo aur business grow karo in AI tools se.'
    WHEN 'regional-language'
      THEN 'Hindi, Tamil, Telugu, Marathi aur doosri Indian languages mein content likhne aur banane ke AI tools.'
    WHEN 'dukaan-management'
      THEN 'Apni physical ya online dukaan better manage karo — stock, sales, customers sab AI se handle karo.'
    WHEN 'exam-prep'
      THEN 'JEE, NEET, UPSC, SSC aur doosri exams ki smart taiyaari ke liye best AI study tools.'
    WHEN 'government-schemes'
      THEN 'Sarkari yojanaon ki jankari pao, applications fill karo aur documents banao in AI tools ki madad se.'
    WHEN 'agriculture'
      THEN 'Kheti ki planning, crop management, mandi prices aur agri business ke liye AI tools.'
    WHEN 'freelancing-india'
      THEN 'Indian freelancers ke liye — proposals likho, clients dhundho, kaam manage karo AI ki madad se.'
    ELSE description_en
  END;

-- STEP 4: Also ensure name_hi is set for all categories
UPDATE public.task_categories SET name_hi = CASE slug
  WHEN 'content-creation'    THEN 'कंटेंट क्रिएशन'
  WHEN 'business-tools'      THEN 'व्यापार उपकरण'
  WHEN 'image-design'        THEN 'फ़ोटो और डिज़ाइन'
  WHEN 'video-reels'         THEN 'वीडियो और रील्स'
  WHEN 'productivity'        THEN 'उत्पादकता'
  WHEN 'marketing-seo'       THEN 'मार्केटिंग और SEO'
  WHEN 'education-learning'  THEN 'शिक्षा और सीखना'
  WHEN 'coding-dev'          THEN 'कोडिंग और डेवलपमेंट'
  WHEN 'music-audio'         THEN 'संगीत और ऑडियो'
  WHEN 'chat-assistants'     THEN 'चैट और AI असिस्टेंट'
  WHEN 'gst-tax'             THEN 'GST और कर'
  WHEN 'whatsapp-business'   THEN 'WhatsApp बिज़नेस'
  WHEN 'regional-language'   THEN 'क्षेत्रीय भाषा कंटेंट'
  WHEN 'dukaan-management'   THEN 'दुकान प्रबंधन'
  WHEN 'exam-prep'           THEN 'परीक्षा की तैयारी'
  WHEN 'government-schemes'  THEN 'सरकारी योजनाएं'
  WHEN 'agriculture'         THEN 'कृषि और खेती'
  WHEN 'freelancing-india'   THEN 'फ्रीलांसिंग इंडिया'
  ELSE name_hi
END
WHERE name_hi IS NULL OR name_hi = name_en;

-- STEP 5: Also ensure description_hi is set for all categories
UPDATE public.task_categories SET description_hi = CASE slug
  WHEN 'content-creation'
    THEN 'ब्लॉग, सोशल मीडिया पोस्ट और मार्केटिंग कॉपी लिखने के लिए सर्वश्रेष्ठ AI टूल।'
  WHEN 'business-tools'
    THEN 'आपके व्यवसाय को बढ़ाने, ग्राहकों को प्रबंधित करने और संचालन सुव्यवस्थित करने के लिए AI-संचालित उपकरण।'
  WHEN 'image-design'
    THEN 'टेक्स्ट से शानदार इमेज, लोगो, ग्राफिक्स और विज़ुअल कंटेंट बनाने के लिए सर्वश्रेष्ठ AI डिज़ाइन टूल।'
  WHEN 'video-reels'
    THEN 'शॉर्ट वीडियो, रील्स, मार्केटिंग फिल्म और प्रोफेशनल वीडियो कंटेंट बनाने के लिए टॉप AI वीडियो टूल।'
  WHEN 'productivity'
    THEN 'अपना काम तेज़ी से पूरा करें और समय की बर्बादी कम करें — प्रोडक्टिविटी के लिए बेहतरीन AI टूल।'
  WHEN 'marketing-seo'
    THEN 'वेबसाइट की Google रैंकिंग बढ़ाएं और प्रभावी मार्केटिंग अभियान चलाएं।'
  WHEN 'education-learning'
    THEN 'छात्रों, शिक्षकों और पेशेवरों के लिए AI से सीखने, पढ़ाने और शोध करने के शीर्ष उपकरण।'
  WHEN 'coding-dev'
    THEN 'कोड लिखने, डिबग करने, ऐप बनाने और डिप्लॉय करने के लिए सर्वश्रेष्ठ AI कोडिंग और विकास उपकरण।'
  WHEN 'music-audio'
    THEN 'AI से ओरिजिनल म्यूजिक, प्रोफेशनल वॉयसओवर और ऑडियो कंटेंट बनाएं।'
  WHEN 'chat-assistants'
    THEN 'सवालों के जवाब पाएं, रिसर्च करें और काम में मदद लें इन लोकप्रिय AI चैटबॉट और असिस्टेंट से।'
  WHEN 'gst-tax'
    THEN 'GST फाइलिंग, कर गणना, इनवॉइस बनाने और अनुपालन के लिए भारत-विशिष्ट AI टूल।'
  WHEN 'whatsapp-business'
    THEN 'WhatsApp पर कस्टमर सर्विस ऑटोमेट करें, बल्क मेसेज भेजें और बिज़नेस बढ़ाएं।'
  WHEN 'regional-language'
    THEN 'हिंदी, तमिल, तेलुगु, मराठी और अन्य भारतीय भाषाओं में कंटेंट बनाने के AI टूल।'
  WHEN 'dukaan-management'
    THEN 'अपनी फिजिकल या ऑनलाइन दुकान बेहतर तरीके से मैनेज करें — स्टॉक, सेल्स, कस्टमर सब AI से।'
  WHEN 'exam-prep'
    THEN 'JEE, NEET, UPSC, SSC और अन्य परीक्षाओं की स्मार्ट तैयारी के लिए सर्वश्रेष्ठ AI स्टडी टूल।'
  WHEN 'government-schemes'
    THEN 'सरकारी योजनाओं की जानकारी पाएं, आवेदन भरें और दस्तावेज़ बनाएं AI टूल की मदद से।'
  WHEN 'agriculture'
    THEN 'खेती की योजना, फसल प्रबंधन, मंडी कीमतें और कृषि व्यवसाय के लिए AI टूल।'
  WHEN 'freelancing-india'
    THEN 'भारतीय फ्रीलांसरों के लिए — प्रपोजल लिखें, क्लाइंट खोजें और काम AI की मदद से मैनेज करें।'
  ELSE description_en
END
WHERE description_hi IS NULL OR description_hi = '';

-- Verification
SELECT slug, name_en, name_hi, name_hinglish,
  CASE WHEN description_hinglish IS NULL THEN 'MISSING' ELSE 'OK' END AS hinglish_desc_status,
  CASE WHEN description_hi IS NULL THEN 'MISSING' ELSE 'OK' END AS hindi_desc_status
FROM public.task_categories
ORDER BY display_order;
