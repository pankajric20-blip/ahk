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
    hi: "भारत की पहली हिंदी-प्रथम AI डायरेक्टरी",
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
  home_view_all_tools: {
    en: "View all tools",
    hi: "सभी टूल्स देखें",
    hinglish: "Sab tools dekho",
  },
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
  filter_active: { en: "active", hi: "चालू", hinglish: "active" },

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
  tool_features: {
    en: "Key Features",
    hi: "मुख्य फीचर्स",
    hinglish: "Key Features",
  },
  tool_pros: { en: "Pros", hi: "फायदे", hinglish: "Fayde" },
  tool_cons: { en: "Cons", hi: "नुकसान", hinglish: "Nuksaan" },
  tool_pros_cons: {
    en: "Pros & Cons",
    hi: "फायदे और नुकसान",
    hinglish: "Fayde aur Nuksaan",
  },
  tool_use_cases: {
    en: "Who Is It For?",
    hi: "यह टूल किसके लिए है?",
    hinglish: "Yeh Tool Kiske Liye Hai?",
  },
  tool_hindi_summary: {
    en: "For Indian Users",
    hi: "भारतीय यूज़र्स के लिए",
    hinglish: "Indian Users ke Liye",
  },
  tool_alternatives: {
    en: "Explore Alternatives",
    hi: "विकल्प देखें",
    hinglish: "Alternatives Dekho",
  },
  tool_screenshot: {
    en: "Screenshot",
    hi: "स्क्रीनशॉट",
    hinglish: "Screenshot",
  },
  tool_no_alternatives: {
    en: "No alternatives listed yet.",
    hi: "अभी कोई विकल्प नहीं है।",
    hinglish: "Abhi koi alternative nahi hai.",
  },

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

  // ── Dashboard — Profile & Stats ───────────────────────────
  dashboard_your_activity: {
    en: "Your Activity",
    hi: "आपकी गतिविधि",
    hinglish: "Aapki Activity",
  },
  dashboard_stat_saved: {
    en: "Tools Saved",
    hi: "सेव किए टूल्स",
    hinglish: "Saved Tools",
  },
  dashboard_stat_reviews: {
    en: "Reviews Written",
    hi: "लिखी गई समीक्षाएं",
    hinglish: "Reviews Likhe",
  },
  dashboard_stat_karma: {
    en: "Karma Score",
    hi: "कर्मा स्कोर",
    hinglish: "Karma Score",
  },
  dashboard_stat_helpful: {
    en: "Helpful Votes",
    hi: "सहायक वोट",
    hinglish: "Helpful Votes",
  },
  dashboard_sign_out: {
    en: "Sign Out",
    hi: "साइन आउट",
    hinglish: "Sign Out Karo",
  },

  // ── Dashboard — Quick Actions ─────────────────────────────
  dashboard_quick_actions: {
    en: "Quick Actions",
    hi: "त्वरित क्रियाएं",
    hinglish: "Quick Actions",
  },
  dashboard_explore_tools: {
    en: "Explore Tools",
    hi: "टूल्स खोजें",
    hinglish: "Tools Explore Karo",
  },
  dashboard_browse_categories: {
    en: "Browse Categories",
    hi: "श्रेणियां देखें",
    hinglish: "Categories Dekho",
  },
  dashboard_submit_tool: {
    en: "Submit a Tool",
    hi: "टूल जोड़ें",
    hinglish: "Tool Submit Karo",
  },
  dashboard_free_tools: {
    en: "Free Tools",
    hi: "मुफ़्त टूल्स",
    hinglish: "Free Tools",
  },

  // ── Dashboard — Trending Card ─────────────────────────────
  dashboard_trending_now: {
    en: "Trending Now",
    hi: "अभी ट्रेंडिंग",
    hinglish: "Abhi Trending",
  },
  dashboard_trending_desc: {
    en: "Discover the hottest AI tools being used across India right now.",
    hi: "अभी पूरे भारत में उपयोग किए जा रहे सबसे लोकप्रिय AI टूल्स खोजें।",
    hinglish: "Abhi India mein sabse zyada use ho rahe AI tools dekho.",
  },
  dashboard_see_trending: {
    en: "See trending",
    hi: "ट्रेंडिंग देखें",
    hinglish: "Trending Dekho",
  },

  // ── Dashboard — Tabs ──────────────────────────────────────
  dashboard_tab_saved: {
    en: "Saved Tools",
    hi: "सेव किए टूल्स",
    hinglish: "Saved Tools",
  },
  dashboard_tab_reviews: {
    en: "My Reviews",
    hi: "मेरी समीक्षाएं",
    hinglish: "Meri Reviews",
  },

  // ── Dashboard — Saved Tools Panel ────────────────────────
  dashboard_saved_empty_title: {
    en: "No saved tools yet",
    hi: "अभी तक कोई सेव किया टूल नहीं",
    hinglish: "Abhi tak koi saved tool nahi",
  },
  dashboard_saved_empty_desc: {
    en: "Start exploring and save AI tools that interest you. They'll appear here.",
    hi: "AI टूल्स खोजें और जो पसंद आए उन्हें सेव करें। वे यहां दिखेंगे।",
    hinglish: "AI tools explore karo aur jo pasand aaye unhe save karo.",
  },
  dashboard_explore_ai_tools: {
    en: "Explore AI Tools",
    hi: "AI टूल्स खोजें",
    hinglish: "AI Tools Explore Karo",
  },
  dashboard_showing_of: {
    en: "Showing 6 of {n} saved tools",
    hi: "{n} सेव किए टूल्स में से 6 दिखाए जा रहे हैं",
    hinglish: "{n} saved tools mein se 6 dikh rahe hain",
  },

  // ── Dashboard — Reviews Panel ─────────────────────────────
  dashboard_reviews_empty_title: {
    en: "No reviews yet",
    hi: "अभी तक कोई समीक्षा नहीं",
    hinglish: "Abhi tak koi review nahi",
  },
  dashboard_reviews_empty_desc: {
    en: "Share your experience with AI tools. Your review helps others in the community.",
    hi: "AI टूल्स के साथ अपना अनुभव साझा करें। आपकी समीक्षा समुदाय की मदद करती है।",
    hinglish:
      "AI tools ke baare mein apna experience share karo. Teri review community ki madad karti hai.",
  },
  dashboard_find_tools_to_review: {
    en: "Find Tools to Review",
    hi: "समीक्षा के लिए टूल्स खोजें",
    hinglish: "Review Karne ke liye Tools Dhundho",
  },

  // ── Dashboard — Badge Labels ──────────────────────────────
  dashboard_badge_india: {
    en: "India",
    hi: "भारत",
    hinglish: "India",
  },
  dashboard_badge_featured: {
    en: "Featured",
    hi: "चुनिंदा",
    hinglish: "Featured",
  },
  dashboard_badge_champion: {
    en: "AI Champion",
    hi: "AI चैम्पियन",
    hinglish: "AI Champion",
  },

  // ── Dashboard — Review Status Labels ──────────────────────
  dashboard_status_published: {
    en: "Published",
    hi: "प्रकाशित",
    hinglish: "Published",
  },
  dashboard_status_pending: {
    en: "Pending",
    hi: "लंबित",
    hinglish: "Pending",
  },
  dashboard_status_flagged: {
    en: "Flagged",
    hi: "फ्लैग किया",
    hinglish: "Flagged",
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
  new_tool_name_label: {
    en: "Tool Name",
    hi: "टूल का नाम",
    hinglish: "Tool ka naam",
  },
  new_tool_name_placeholder: {
    en: "e.g., ChatGPT, Midjourney",
    hi: "उदाहरण: चैटजीपीटी, मिडजर्नी",
    hinglish: "Jaise: ChatGPT, Midjourney",
  },
  new_tool_desc_label: {
    en: "Short Description",
    hi: "संक्षिप्त विवरण",
    hinglish: "Chhota description",
  },
  new_tool_desc_placeholder: {
    en: "A brief summary of what the tool does.",
    hi: "टूल क्या करता है, इसका संक्षिप्त सारांश।",
    hinglish: "Tool kya karta hai, uska chhota sa summary.",
  },
  new_tool_url_label: {
    en: "Tool Website URL",
    hi: "टूल की वेबसाइट का यूआरएल",
    hinglish: "Tool ki website ka URL",
  },
  new_tool_url_placeholder: {
    en: "https://example.com",
    hi: "https://उदाहरण.कॉम",
    hinglish: "https://example.com",
  },
  new_tool_category_label: {
    en: "Category",
    hi: "श्रेणी",
    hinglish: "Category",
  },
  new_tool_category_placeholder: {
    en: "Select a category",
    hi: "एक श्रेणी चुनें",
    hinglish: "Ek category chuno",
  },
  new_tool_pricing_label: {
    en: "Pricing Model",
    hi: "मूल्य योजना",
    hinglish: "Pricing Model",
  },
  new_tool_pricing_placeholder: {
    en: "Select pricing model",
    hi: "मूल्य योजना चुनें",
    hinglish: "Pricing model chuno",
  },
  new_tool_submit_btn: {
    en: "Submit Tool",
    hi: "टूल जमा करें",
    hinglish: "Tool Submit Karo",
  },
  new_tool_footer_text: {
    en: "By submitting, you agree to our Terms of Service and Privacy Policy.",
    hi: "जमा करके, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत हैं।",
    hinglish:
      "Submit karke, aap hamari Terms of Service aur Privacy Policy se sehmat hain.",
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
  footer_all_tools: { en: "All Tools", hi: "सभी टूल्स", hinglish: "All Tools" },
  footer_sponsor: {
    en: "Sponsor a Listing",
    hi: "लिस्टिंग प्रायोजित करें",
    hinglish: "Sponsor a Listing",
  },
  footer_legal: { en: "Legal", hi: "कानूनी", hinglish: "Legal" },
  footer_privacy: {
    en: "Privacy Policy",
    hi: "गोपनीयता नीति",
    hinglish: "Privacy Policy",
  },
  footer_terms: {
    en: "Terms of Service",
    hi: "सेवा की शर्तें",
    hinglish: "Terms of Service",
  },
  footer_rights: {
    en: "Aihkya Platform. All rights reserved.",
    hi: "Aihkya प्लैटफ़ॉर्म। सर्वाधिकार सुरक्षित।",
    hinglish: "Aihkya Platform. All rights reserved.",
  },
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
  common_per_month: { en: "/ month", hi: "/ महीना", hinglish: "/ month" },

  // ── Review Form ───────────────────────────────────────────────────────────
  review_form_title: {
    en: "Leave a Review",
    hi: "समीक्षा दें",
    hinglish: "Review Do",
  },
  review_form_login_required: {
    en: "You must be logged in to leave a rich review.",
    hi: "समीक्षा देने के लिए कृपया लॉग इन करें।",
    hinglish: "Rich review ke liye login karo.",
  },
  review_form_sign_in: {
    en: "Sign In Now",
    hi: "अभी साइन इन करें",
    hinglish: "Sign In Karo",
  },
  review_form_rating_label: {
    en: "Your Rating",
    hi: "आपकी रेटिंग",
    hinglish: "Aapki Rating",
  },
  review_form_title_label: {
    en: "Review Title",
    hi: "समीक्षा का शीर्षक",
    hinglish: "Review Title",
  },
  review_form_title_placeholder: {
    en: "Sum up your experience",
    hi: "अपना अनुभव संक्षेप में बताएं",
    hinglish: "Apna experience short mein batao",
  },
  review_form_text_label: {
    en: "Your Review",
    hi: "आपकी समीक्षा",
    hinglish: "Aapki Review",
  },
  review_form_text_placeholder: {
    en: "How did this tool help your business or workflow? Did you face any issues?",
    hi: "यह टूल आपके काम में कैसे मदद करता है? कोई समस्या आई?",
    hinglish: "Ye tool aapke kaam mein kaise helpful raha? Koi dikkat aayi?",
  },
  review_form_use_case_label: {
    en: "Use Case",
    hi: "उपयोग का क्षेत्र",
    hinglish: "Use Case",
  },
  review_form_use_case_placeholder: {
    en: "e.g. Sales Calls, Graphic Design",
    hi: "जैसे: बिक्री, ग्राफिक डिज़ाइन",
    hinglish: "jaise: Sales, Graphic Design",
  },
  review_form_duration_label: {
    en: "Usage Duration",
    hi: "कितने समय से उपयोग कर रहे हैं",
    hinglish: "Kitne time se use kar rahe ho",
  },
  review_form_duration_select: {
    en: "Select duration...",
    hi: "अवधि चुनें...",
    hinglish: "Duration chuno...",
  },
  review_form_duration_testing: {
    en: "Just testing",
    hi: "बस आज़मा रहा/रही हूं",
    hinglish: "Abhi try kar raha/rahi hoon",
  },
  review_form_duration_less1m: {
    en: "Less than 1 month",
    hi: "1 महीने से कम",
    hinglish: "1 mahine se kam",
  },
  review_form_duration_1to6m: {
    en: "1–6 months",
    hi: "1–6 महीने",
    hinglish: "1–6 mahine",
  },
  review_form_duration_over6m: {
    en: "Over 6 months",
    hi: "6 महीने से अधिक",
    hinglish: "6 mahine se zyada",
  },
  review_form_submit: {
    en: "Publish Review",
    hi: "समीक्षा प्रकाशित करें",
    hinglish: "Review Publish Karo",
  },
  review_form_submitting: {
    en: "Submitting...",
    hi: "जमा हो रहा है...",
    hinglish: "Submit ho raha hai...",
  },
  review_form_success: {
    en: "Review submitted! Thank you for sharing your thoughts.",
    hi: "समीक्षा जमा हो गई! आपके विचार साझा करने के लिए धन्यवाद।",
    hinglish: "Review submit ho gayi! Share karne ke liye shukriya.",
  },
  review_form_error_login: {
    en: "Please log in to leave a review.",
    hi: "समीक्षा देने के लिए लॉग इन करें।",
    hinglish: "Review dene ke liye login karo.",
  },
  review_form_error_rating: {
    en: "Please select a rating.",
    hi: "कृपया रेटिंग चुनें।",
    hinglish: "Please rating chuno.",
  },

  // ── Review List ───────────────────────────────────────────────────────────
  review_list_empty_title: {
    en: "No reviews yet. Be the first!",
    hi: "अभी तक कोई समीक्षा नहीं। पहले बनें!",
    hinglish: "Abhi koi review nahi. Pehle bano!",
  },
  review_list_empty_desc: {
    en: "Your feedback helps other creators and founders in India make better software decisions.",
    hi: "आपकी राय भारत के क्रिएटर्स और उद्यमियों को बेहतर सॉफ्टवेयर चुनने में मदद करती है।",
    hinglish:
      "Aapki feedback India ke creators aur founders ko better decisions lene mein help karti hai.",
  },
  review_list_used_for: {
    en: "Used for:",
    hi: "इस्तेमाल किया:",
    hinglish: "Use kiya:",
  },
  review_list_use_case: {
    en: "Use Case:",
    hi: "उपयोग क्षेत्र:",
    hinglish: "Use Case:",
  },

  // Pricing model labels (maps DB values → localized display)
  pricing_free: { en: "Free", hi: "मुफ़्त", hinglish: "Free" },
  pricing_freemium: { en: "Freemium", hi: "फ्रीमियम", hinglish: "Freemium" },
  pricing_paid: { en: "Paid", hi: "सशुल्क", hinglish: "Paid" },
  pricing_free_trial: {
    en: "Free Trial",
    hi: "मुफ़्त परीक्षण",
    hinglish: "Free Trial",
  },
  pricing_enterprise: {
    en: "Enterprise",
    hi: "एंटरप्राइज",
    hinglish: "Enterprise",
  },
  pricing_contact_sales: {
    en: "Contact Sales",
    hi: "बिक्री से संपर्क करें",
    hinglish: "Sales se Contact Karo",
  },
  pricing_open_source: {
    en: "Open Source",
    hi: "ओपन सोर्स",
    hinglish: "Open Source",
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function translate(key: TranslationKey, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry["en"];
}

export { translations };
