// Central translations dictionary for all UI strings
// Format: { key: { en: string; hi: string; hinglish: string } }

export type Lang = "en" | "hi" | "hinglish";

const translations = {
  // ── Navbar ──────────────────────────────────────────────
  nav_categories: { en: "Categories", hi: "श्रेणियाँ", hinglish: "Categories" },
  nav_mini_tools: {
    en: "Mini Tools",
    hi: "मिनी टूल्स",
    hinglish: "Mini Tools",
  },
  nav_submit_tool: {
    en: "Submit Tool",
    hi: "टूल जोड़ें",
    hinglish: "Tool Submit Karein",
  },
  nav_dashboard: { en: "Dashboard", hi: "डैशबोर्ड", hinglish: "Dashboard" },
  nav_login: { en: "Login", hi: "लॉगिन", hinglish: "Login Karein" },

  // ── Homepage ─────────────────────────────────────────────
  home_badge: {
    en: "India's First Hindi-First AI Directory",
    hi: "भारत की पहली हिंदी-पहली AI डायरेक्टरी",
    hinglish: "India ka pehla Hindi-First AI Directory",
  },
  home_hero_title: {
    en: "Discover the Best AI Tools for Your Workflow",
    hi: "अपने काम के लिए सबसे अच्छे AI टूल खोजें",
    hinglish: "Apne workflow ke liye best AI Tools dhundho",
  },
  home_hero_subtitle: {
    en: "Explore carefully curated AI tools with full Hindi language support, detailed pricing, and Indian alternative recommendations.",
    hi: "पूरी हिंदी भाषा के समर्थन, विस्तृत मूल्य निर्धारण और भारतीय विकल्पों के साथ सावधानीपूर्वक चुने गए AI टूल्स खोजें।",
    hinglish:
      "Hindi support ke saath carefully curated AI tools, detailed pricing, aur Indian alternatives ke recommendations.",
  },
  home_search_placeholder: {
    en: "Search for AI writing, video generation, chatbots...",
    hi: "AI लेखन, वीडियो जनरेशन, चैटबॉट खोजें...",
    hinglish: "AI tools search karein...",
  },
  home_search_btn: { en: "Search", hi: "खोजें", hinglish: "Khojo" },
  home_featured_title: {
    en: "Featured Tools",
    hi: "चुनिंदा AI टूल्स",
    hinglish: "Featured AI Tools",
  },
  home_featured_subtitle: {
    en: "Hand-picked AI tools for maximum productivity.",
    hi: "अधिकतम उत्पादकता के लिए हाथ से चुने गए AI टूल्स।",
    hinglish: "Maximum productivity ke liye hand-picked AI tools.",
  },
  home_view_all: { en: "View all", hi: "सभी देखें", hinglish: "Sab dekho" },
  home_categories_title: {
    en: "Browse by Category",
    hi: "श्रेणी के अनुसार खोजें",
    hinglish: "Category ke hisaab se browse karein",
  },
  home_categories_subtitle: {
    en: "Find exactly what you need by exploring our organized collections.",
    hi: "हमारे संगठित संग्रह में वह खोजें जो आपको चाहिए।",
    hinglish: "Apni zaroorat ke hisaab se best AI tools dhundho.",
  },

  // ── Categories List Page ─────────────────────────────────
  cats_title: {
    en: "All Categories",
    hi: "सभी श्रेणियाँ",
    hinglish: "Saari Categories",
  },
  cats_subtitle: {
    en: "Explore our comprehensive directory of AI tools structured by use-case to help you find precisely what you need.",
    hi: "अपनी ज़रूरत के अनुसार AI टूल्स खोजने के लिए हमारी व्यापक डायरेक्टरी देखें।",
    hinglish: "Use-case ke hisaab se best AI tools dhundho.",
  },
  cats_explore_label: {
    en: "Explore tools",
    hi: "टूल्स देखें",
    hinglish: "Tools dekho",
  },
  cats_discover_desc: {
    en: "Discover {name} tools for your creative and professional workflows.",
    hi: "{name} के लिए AI टूल्स खोजें।",
    hinglish: "{name} ke liye AI tools dhundho.",
  },

  // ── Category Detail Page ─────────────────────────────────
  cat_back: {
    en: "All Categories",
    hi: "सभी श्रेणियाँ",
    hinglish: "Saari Categories",
  },
  cat_tools_suffix: { en: "Tools", hi: "टूल्स", hinglish: "Tools" },
  cat_browse_desc: {
    en: "Browse our curated collection of {n} AI platforms specifically targeted for {cat} workflows.",
    hi: "{cat} के लिए {n} AI प्लेटफ़ॉर्म का हमारा चुना हुआ संग्रह देखें।",
    hinglish: "{cat} ke liye {n} AI platforms ka collection dekho.",
  },
  cat_filters: { en: "Filters", hi: "फ़िल्टर", hinglish: "Filters" },
  cat_pricing: { en: "Pricing", hi: "मूल्य निर्धारण", hinglish: "Pricing" },
  cat_filtered: { en: "filtered:", hi: "फ़िल्टर:", hinglish: "filtered:" },
  cat_no_tools: {
    en: "No tools found in this category yet.",
    hi: "इस श्रेणी में अभी तक कोई टूल नहीं है।",
    hinglish: "Is category mein abhi koi tool nahi hai.",
  },
  cat_no_tools_filtered: {
    en: "No {pricing} tools found in this category.",
    hi: "इस श्रेणी में {pricing} टूल नहीं मिले।",
    hinglish: "Is category mein {pricing} tools nahi mile.",
  },
  cat_clear_filters: {
    en: "Clear filters",
    hi: "फ़िल्टर हटाएं",
    hinglish: "Filters hatao",
  },

  // ── Tool Detail Page ─────────────────────────────────────
  tool_back: { en: "Back to Discover", hi: "वापस जाएं", hinglish: "Wapas jao" },
  tool_details: { en: "Details", hi: "विवरण", hinglish: "Details" },
  tool_pricing_model: {
    en: "Pricing Model",
    hi: "मूल्य योजना",
    hinglish: "Pricing Model",
  },
  tool_starting_price: {
    en: "Starting Price",
    hi: "शुरुआती कीमत",
    hinglish: "Starting Price",
  },
  tool_free_tier: {
    en: "Free Tier",
    hi: "मुफ़्त सुविधाएं",
    hinglish: "Free Tier",
  },
  tool_visit_website: {
    en: "Visit Website",
    hi: "वेबसाइट देखें",
    hinglish: "Website Dekho",
  },
  tool_save: { en: "Save Tool", hi: "टूल सेव करें", hinglish: "Save Karo" },
  tool_saved: { en: "Saved!", hi: "सेव हो गया!", hinglish: "Saved!" },
  tool_reviews: {
    en: "Reviews & Ratings",
    hi: "समीक्षाएं और रेटिंग",
    hinglish: "Reviews aur Ratings",
  },
  tool_new: { en: "New", hi: "नया", hinglish: "New" },
  tool_tutorial: {
    en: "Hindi Tutorial",
    hi: "हिंदी ट्यूटोरियल",
    hinglish: "Hindi Tutorial",
  },
  tool_related_tutorials: {
    en: "Related Tutorials",
    hi: "संबंधित ट्यूटोरियल",
    hinglish: "Related Tutorials",
  },
  tool_about_prefix: { en: "About", hi: "के बारे में", hinglish: "About" },

  // ── Search Page ──────────────────────────────────────────
  search_title: {
    en: "Search AI Tools",
    hi: "AI टूल खोजें",
    hinglish: "AI Tools Search Karo",
  },
  search_results_for: {
    en: "Results for",
    hi: "के नतीजे",
    hinglish: "ke results",
  },
  search_results_count: {
    en: "{n} tools found",
    hi: "{n} टूल मिले",
    hinglish: "{n} tools mile",
  },
  search_no_results: {
    en: "No tools found for",
    hi: "के लिए कोई टूल नहीं मिला",
    hinglish: "ke liye koi tool nahi mila",
  },
  search_try_different: {
    en: "Try a different keyword or browse categories.",
    hi: "कोई और कीवर्ड आज़माएं या श्रेणियां देखें।",
    hinglish: "Koi aur keyword try karo ya categories browse karo.",
  },
  search_browse_categories: {
    en: "Browse Categories",
    hi: "श्रेणियाँ देखें",
    hinglish: "Categories Dekho",
  },
  search_placeholder: {
    en: "Search AI tools...",
    hi: "AI टूल खोजें...",
    hinglish: "AI tools dhundho...",
  },

  // ── Dashboard ────────────────────────────────────────────
  dashboard_title: {
    en: "My Dashboard",
    hi: "मेरा डैशबोर्ड",
    hinglish: "Mera Dashboard",
  },
  dashboard_saved: {
    en: "Saved Tools",
    hi: "सेव किए टूल्स",
    hinglish: "Saved Tools",
  },
  dashboard_no_saved: {
    en: "You haven't saved any tools yet.",
    hi: "आपने अभी तक कोई टूल सेव नहीं किया।",
    hinglish: "Abhi tak koi tool save nahi kiya.",
  },
  dashboard_discover: {
    en: "Discover Tools",
    hi: "टूल्स खोजें",
    hinglish: "Tools Dhundho",
  },

  // ── Submit Tool ─────────────────────────────────────────
  new_title: {
    en: "Submit a Tool",
    hi: "टूल जोड़ें",
    hinglish: "Tool Submit Karo",
  },
  new_subtitle: {
    en: "Share an AI tool with the AIHKYA community.",
    hi: "AIHKYA समुदाय के साथ एक AI टूल शेयर करें।",
    hinglish: "AIHKYA community ke saath AI tool share karo.",
  },

  // ── Review Form ──────────────────────────────────────────
  review_title: {
    en: "Write a Review",
    hi: "समीक्षा लिखें",
    hinglish: "Review Likho",
  },
  review_login_prompt: {
    en: "Login to write a review",
    hi: "समीक्षा लिखने के लिए लॉगिन करें",
    hinglish: "Review likhne ke liye login karo",
  },
  review_submit: {
    en: "Submit Review",
    hi: "समीक्षा जमा करें",
    hinglish: "Review Submit Karo",
  },
  review_update: {
    en: "Update Review",
    hi: "समीक्षा अपडेट करें",
    hinglish: "Review Update Karo",
  },

  // ── Mini Tools ───────────────────────────────────────────
  minitools_title: {
    en: "Mini AI Tools",
    hi: "मिनी AI टूल्स",
    hinglish: "Mini AI Tools",
  },
  minitools_subtitle: {
    en: "Powerful AI utilities built right into AIHKYA. No sign-ups, no downloads — just use them instantly.",
    hi: "शक्तिशाली AI उपकरण जो AIHKYA में ही बने हैं। कोई साइनअप नहीं — बस इस्तेमाल करें।",
    hinglish:
      "AIHKYA ke andar built-in AI utilities. No sign-up — bas use karo.",
  },
  minitools_badge: {
    en: "Built-in AI Tools",
    hi: "बिल्ट-इन AI टूल्स",
    hinglish: "Built-in AI Tools",
  },
  minitool_try: { en: "Try Now", hi: "अभी आज़माएं", hinglish: "Try Karo" },
  minitool_back: {
    en: "Back to Mini Tools",
    hi: "मिनी टूल्स पर वापस",
    hinglish: "Mini Tools pe wapas",
  },

  // ── Footer / Common ──────────────────────────────────────
  footer_tagline: {
    en: "India's Hindi-First AI Tool Directory",
    hi: "भारत की हिंदी-प्रथम AI टूल डायरेक्टरी",
    hinglish: "India ka Hindi-First AI Tool Directory",
  },
  common_back: { en: "Back", hi: "वापस", hinglish: "Wapas" },
  common_free: { en: "Free", hi: "मुफ़्त", hinglish: "Free" },
  common_bilkul_free: {
    en: "Completely Free",
    hi: "बिल्कुल मुफ़्त",
    hinglish: "Bilkul Free",
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function translate(key: TranslationKey, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry["en"];
}

export { translations };
