-- ============================================================
-- AIHKYA: Add Hinglish columns + populate Hinglish content
-- Migration 0007
-- Run this in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- PART 1: Add new columns for Hinglish content
-- ============================================================
ALTER TABLE public.ai_tools
  ADD COLUMN IF NOT EXISTS name_hinglish VARCHAR(255),
  ADD COLUMN IF NOT EXISTS description_hinglish TEXT;

-- ============================================================
-- PART 2: Populate name_hinglish for all tools
-- Hinglish = Roman script transliteration of the tool name
-- (most tool names are already English brands — keep as-is)
-- ============================================================
UPDATE public.ai_tools SET name_hinglish = CASE slug
  WHEN 'chatgpt'               THEN 'ChatGPT'
  WHEN 'claude'                THEN 'Claude'
  WHEN 'gemini'                THEN 'Gemini'
  WHEN 'perplexity-ai'         THEN 'Perplexity AI'
  WHEN 'microsoft-copilot'     THEN 'Microsoft Copilot'
  WHEN 'meta-ai'               THEN 'Meta AI'
  WHEN 'grok'                  THEN 'Grok'
  WHEN 'you-com'               THEN 'You.com'
  WHEN 'character-ai'          THEN 'Character AI'
  WHEN 'poe'                   THEN 'Poe'
  WHEN 'jasper-ai'             THEN 'Jasper AI'
  WHEN 'writesonic'            THEN 'Writesonic'
  WHEN 'copy-ai'               THEN 'Copy.AI'
  WHEN 'rytr'                  THEN 'Rytr'
  WHEN 'quillbot'              THEN 'QuillBot'
  WHEN 'midjourney'            THEN 'Midjourney'
  WHEN 'dall-e-3'              THEN 'DALL-E 3'
  WHEN 'leonardo-ai'           THEN 'Leonardo AI'
  WHEN 'ideogram'              THEN 'Ideogram'
  WHEN 'canva-ai-magic-studio' THEN 'Canva AI Magic Studio'
  WHEN 'canva'                 THEN 'Canva'
  WHEN 'adobe-firefly'         THEN 'Adobe Firefly'
  WHEN 'stable-diffusion'      THEN 'Stable Diffusion'
  WHEN 'playground-ai'         THEN 'Playground AI'
  WHEN 'clipdrop'              THEN 'ClipDrop'
  WHEN 'remove-bg'             THEN 'Remove.bg'
  WHEN 'photoshop-ai'          THEN 'Photoshop AI'
  WHEN 'runway-ml'             THEN 'Runway ML'
  WHEN 'pika'                  THEN 'Pika'
  WHEN 'sora'                  THEN 'Sora'
  WHEN 'luma-ai'               THEN 'Luma AI'
  WHEN 'kling-ai'              THEN 'Kling AI'
  WHEN 'invideo-ai'            THEN 'InVideo AI'
  WHEN 'descript'              THEN 'Descript'
  WHEN 'opus-clip'             THEN 'Opus Clip'
  WHEN 'vidyo-ai'              THEN 'Vidyo AI'
  WHEN 'pictory-ai'            THEN 'Pictory AI'
  WHEN 'synthesia'             THEN 'Synthesia'
  WHEN 'heygen'                THEN 'HeyGen'
  WHEN 'd-id'                  THEN 'D-ID'
  WHEN 'capcut'                THEN 'CapCut'
  WHEN 'notion-ai'             THEN 'Notion AI'
  WHEN 'grammarly'             THEN 'Grammarly'
  WHEN 'hemingway-editor'      THEN 'Hemingway Editor'
  WHEN 'surfer-seo'            THEN 'Surfer SEO'
  WHEN 'semrush-ai'            THEN 'SEMrush AI'
  WHEN 'frase-io'              THEN 'Frase.io'
  WHEN 'wordtune'              THEN 'Wordtune'
  WHEN 'github-copilot'        THEN 'GitHub Copilot'
  WHEN 'cursor'                THEN 'Cursor'
  WHEN 'tabnine'               THEN 'Tabnine'
  WHEN 'codeium'               THEN 'Codeium'
  WHEN 'replit'                THEN 'Replit'
  WHEN 'v0-dev'                THEN 'V0 by Vercel'
  WHEN 'bolt-new'              THEN 'Bolt.new'
  WHEN 'lovable'               THEN 'Lovable'
  WHEN 'windsurf'              THEN 'Windsurf'
  WHEN 'devin'                 THEN 'Devin AI'
  WHEN 'cline'                 THEN 'Cline'
  WHEN 'otter-ai'              THEN 'Otter AI'
  WHEN 'fireflies-ai'          THEN 'Fireflies AI'
  WHEN 'circleback'            THEN 'Circleback'
  WHEN 'reclaim-ai'            THEN 'Reclaim AI'
  WHEN 'motion-ai'             THEN 'Motion AI'
  WHEN 'mem-ai'                THEN 'Mem AI'
  WHEN 'anyword'               THEN 'Anyword'
  WHEN 'beehiiv'               THEN 'Beehiiv'
  WHEN 'taskade'               THEN 'Taskade'
  WHEN 'suno-ai'               THEN 'Suno AI'
  WHEN 'udio'                  THEN 'Udio'
  WHEN 'elevenlabs'            THEN 'ElevenLabs'
  WHEN 'murf-ai'               THEN 'Murf AI'
  WHEN 'descript-overdub'      THEN 'Descript Overdub'
  WHEN 'adobe-podcast'         THEN 'Adobe Podcast'
  WHEN 'soundraw'              THEN 'Soundraw'
  WHEN 'aiva'                  THEN 'AIVA'
  WHEN 'mubert'                THEN 'Mubert'
  WHEN 'beautiful-ai'          THEN 'Beautiful.ai'
  WHEN 'gamma-app'             THEN 'Gamma'
  WHEN 'tome-ai'               THEN 'Tome AI'
  WHEN 'salesforce-einstein'   THEN 'Salesforce Einstein'
  WHEN 'hubspot-ai'            THEN 'HubSpot AI'
  WHEN 'zoho-zia'              THEN 'Zoho Zia'
  WHEN 'khanmigo'              THEN 'Khanmigo'
  WHEN 'duolingo-max'          THEN 'Duolingo Max'
  WHEN 'photomath'             THEN 'Photomath'
  WHEN 'wolfram-alpha'         THEN 'Wolfram Alpha'
  WHEN 'socratic'              THEN 'Socratic by Google'
  WHEN 'chegg-ai'              THEN 'Chegg AI'
  WHEN 'brainly'               THEN 'Brainly'
  WHEN 'byju-ai'               THEN 'Byju''s AI'
  ELSE name_en
END;

-- ============================================================
-- PART 3: Populate description_hinglish for all tools
-- Hinglish = Mix of Hindi and English in Roman script
-- ============================================================

-- Chat & AI Assistants
UPDATE public.ai_tools SET description_hinglish = 'OpenAI ka powerful AI chatbot jo questions ka jawab de sakta hai, content likh sakta hai aur coding mein help karta hai.'
  WHERE slug = 'chatgpt';
UPDATE public.ai_tools SET description_hinglish = 'Anthropic ka safe aur accurate AI assistant jo bade documents padhne aur complex coding tasks ke liye best hai.'
  WHERE slug = 'claude';
UPDATE public.ai_tools SET description_hinglish = 'Google ka most advanced AI model jo text, code, images aur audio samajh ke process kar sakta hai.'
  WHERE slug = 'gemini';
UPDATE public.ai_tools SET description_hinglish = 'Accurate internet searches ke liye ek AI search engine jo har answer ke saath real-time sources aur links deta hai.'
  WHERE slug = 'perplexity-ai';
UPDATE public.ai_tools SET description_hinglish = 'Microsoft ka AI assistant jo web searches, content creation aur productivity mein help karta hai.'
  WHERE slug = 'microsoft-copilot';
UPDATE public.ai_tools SET description_hinglish = 'Meta ka free AI assistant jo WhatsApp, Instagram aur Facebook par available hai.'
  WHERE slug = 'meta-ai';
UPDATE public.ai_tools SET description_hinglish = 'X (Twitter) ka AI chatbot jo real-time data aur openly jawab dene ke liye jaana jaata hai.'
  WHERE slug = 'grok';
UPDATE public.ai_tools SET description_hinglish = 'Ek AI-powered search engine jo har sawaal ka jawab source ke saath deta hai aur real-time search karta hai.'
  WHERE slug = 'you-com';
UPDATE public.ai_tools SET description_hinglish = 'Ek interactive AI platform jahan aap fictional characters aur celebrity-style bots ke saath baat kar sakte hain.'
  WHERE slug = 'character-ai';
UPDATE public.ai_tools SET description_hinglish = 'Ek multi-model AI platform jo ChatGPT, Claude, Gemini aur kaafi AI models ek jagah par provide karta hai.'
  WHERE slug = 'poe';
UPDATE public.ai_tools SET description_hinglish = 'Marketing, blogging aur business content likhne ke liye ek powerful AI writing tool.'
  WHERE slug = 'jasper-ai';
UPDATE public.ai_tools SET description_hinglish = 'Marketing copy, ads aur social media posts jaldi likhne ke liye ek popular AI writing tool.'
  WHERE slug = 'writesonic';
UPDATE public.ai_tools SET description_hinglish = 'Blog, email aur social media ke liye kam cost mein AI-generated content banane wala ek useful tool.'
  WHERE slug = 'rytr';
UPDATE public.ai_tools SET description_hinglish = 'Copy.AI blog, email aur social media ke liye AI-generated content banane ka ek useful aur low-cost tool hai.'
  WHERE slug = 'copy-ai';
UPDATE public.ai_tools SET description_hinglish = 'Kisi bhi likhe hue text ko better aur effective tarike se rewrite karne wala AI writing assistant.'
  WHERE slug = 'quillbot';

-- Image & Design
UPDATE public.ai_tools SET description_hinglish = 'Text se highly realistic aur artistic images banane ke liye ek best AI tool jo prompt se seedha kaam karta hai.'
  WHERE slug = 'midjourney';
UPDATE public.ai_tools SET description_hinglish = 'OpenAI ka image generator jo aapke text descriptions ko stunning aur accurate images mein badal deta hai.'
  WHERE slug = 'dall-e-3';
UPDATE public.ai_tools SET description_hinglish = 'Professional quality AI images aur art banane ke liye ek behtareen tool jo kaafi style options deta hai.'
  WHERE slug = 'leonardo-ai';
UPDATE public.ai_tools SET description_hinglish = 'Text se high-quality logos, posters aur graphics banane ke liye ek upcoming AI image tool.'
  WHERE slug = 'ideogram';
UPDATE public.ai_tools SET description_hinglish = 'Canva mein built-in AI features jo magic edit, background removal aur auto-design ko possible banate hain.'
  WHERE slug = 'canva-ai-magic-studio';
UPDATE public.ai_tools SET description_hinglish = 'Ek popular graphic design tool jisme ab Magic Studio jaise powerful AI features shamil hain.'
  WHERE slug = 'canva';
UPDATE public.ai_tools SET description_hinglish = 'Adobe ka AI image generator jo professional designers ke liye banaya gaya hai aur commercial use ke liye safe hai.'
  WHERE slug = 'adobe-firefly';
UPDATE public.ai_tools SET description_hinglish = 'Open-source AI image generator jo local aur online dono tarike se use kiya ja sakta hai.'
  WHERE slug = 'stable-diffusion';
UPDATE public.ai_tools SET description_hinglish = 'Designers ke liye ek free AI image generator jo DALL-E aur Stable Diffusion dono ko support karta hai.'
  WHERE slug = 'playground-ai';
UPDATE public.ai_tools SET description_hinglish = 'Ek all-in-one AI image editing tool jo background hatane, relighting aur cleanup ke liye bana hai.'
  WHERE slug = 'clipdrop';
UPDATE public.ai_tools SET description_hinglish = 'Kisi bhi image ka background seconds mein hatane ke liye sabse easy aur fast online tool.'
  WHERE slug = 'remove-bg';
UPDATE public.ai_tools SET description_hinglish = 'Adobe Photoshop mein add kiye gaye AI features jo Generative Fill, removal aur smart editing ko aasan banate hain.'
  WHERE slug = 'photoshop-ai';

-- Video & Reels
UPDATE public.ai_tools SET description_hinglish = 'AI ki madad se video banane aur edit karne ka ek advanced tool.'
  WHERE slug = 'runway-ml';
UPDATE public.ai_tools SET description_hinglish = 'Ek AI video generator jo text aur images ko cinematic video clips mein badal deta hai.'
  WHERE slug = 'pika';
UPDATE public.ai_tools SET description_hinglish = 'OpenAI ka video generation model jo text se high-quality aur realistic videos banata hai.'
  WHERE slug = 'sora';
UPDATE public.ai_tools SET description_hinglish = 'Photo ya text se 3D aur cinematic videos banane ke liye ek powerful AI video platform.'
  WHERE slug = 'luma-ai';
UPDATE public.ai_tools SET description_hinglish = 'High-quality realistic AI videos banane ke liye ek Chinese AI tool jo worldwide popular hai.'
  WHERE slug = 'kling-ai';
UPDATE public.ai_tools SET description_hinglish = 'Script se professional marketing videos aur reels minutes mein banane ke liye ek Indian AI tool.'
  WHERE slug = 'invideo-ai';
UPDATE public.ai_tools SET description_hinglish = 'Audio aur video ko text ki tarah edit karne ke liye ek simple lekin powerful AI tool.'
  WHERE slug = 'descript';
UPDATE public.ai_tools SET description_hinglish = 'Lambe videos ko social media ke liye short aur engaging clips mein badalne wala AI tool.'
  WHERE slug = 'opus-clip';
UPDATE public.ai_tools SET description_hinglish = 'YouTube aur podcast content ko chhote social media clips mein automatically kaatne wala AI tool.'
  WHERE slug = 'vidyo-ai';
UPDATE public.ai_tools SET description_hinglish = 'Blog ya script se AI voiceover ke saath professional video banane ka ek aasan platform.'
  WHERE slug = 'pictory-ai';
UPDATE public.ai_tools SET description_hinglish = 'Text ya script se custom avatars ke saath professional videos banane ke liye ek AI video generator.'
  WHERE slug = 'synthesia';
UPDATE public.ai_tools SET description_hinglish = 'Text ya script se bolne wale realistic avatar videos banane ke liye ek AI video platform.'
  WHERE slug = 'heygen';
UPDATE public.ai_tools SET description_hinglish = 'Photo se animated avatars aur videos banane wala AI tool jo digital human technology par kaam karta hai.'
  WHERE slug = 'd-id';
UPDATE public.ai_tools SET description_hinglish = 'TikTok aur Instagram Reels jaise short videos aur social media content banane ke liye ek popular app.'
  WHERE slug = 'capcut';

-- Content & Writing
UPDATE public.ai_tools SET description_hinglish = 'Notes lene, projects manage karne aur automatically content likhne ke liye AI ke saath integrated ek all-in-one workspace.'
  WHERE slug = 'notion-ai';
UPDATE public.ai_tools SET description_hinglish = 'Grammar, spelling aur clarity improve karke aapki writing ko better banane wala ek AI writing assistant.'
  WHERE slug = 'grammarly';
UPDATE public.ai_tools SET description_hinglish = 'Aapki writing style ko simple, clear aur effective banane ke liye ek free online editing tool.'
  WHERE slug = 'hemingway-editor';
UPDATE public.ai_tools SET description_hinglish = 'SEO-optimized articles, blog posts aur marketing content likhne ke liye ek advanced AI tool.'
  WHERE slug = 'surfer-seo';
UPDATE public.ai_tools SET description_hinglish = 'Digital marketing aur SEO ke liye ek all-in-one AI platform jo ranking badhane mein help karta hai.'
  WHERE slug = 'semrush-ai';
UPDATE public.ai_tools SET description_hinglish = 'SEO-friendly blogs aur articles likhne ke liye AI research aur writing ka ek complete tool.'
  WHERE slug = 'frase-io';
UPDATE public.ai_tools SET description_hinglish = 'Kisi bhi likhe hue text ko better, simple aur effective tarike se dobara likhne wala AI writing assistant.'
  WHERE slug = 'wordtune';

-- Coding & Development
UPDATE public.ai_tools SET description_hinglish = 'Developers ke liye ek AI coding assistant jo real time mein code snippets aur functions suggest karta hai.'
  WHERE slug = 'github-copilot';
UPDATE public.ai_tools SET description_hinglish = 'VS Code par based ek advanced AI code editor jo aapki poori coding process ko supercharge karta hai.'
  WHERE slug = 'cursor';
UPDATE public.ai_tools SET description_hinglish = 'Seconds mein modern UI components aur web designs banane ke liye ek AI tool.'
  WHERE slug = 'v0-dev';
UPDATE public.ai_tools SET description_hinglish = 'Code autocomplete aur suggestions dene wala ek AI tool jo VS Code aur other editors mein kaam karta hai.'
  WHERE slug = 'tabnine';
UPDATE public.ai_tools SET description_hinglish = 'Ek free AI code assistant jo GitHub Copilot ka behtareen alternative hai aur kaafi IDEs support karta hai.'
  WHERE slug = 'codeium';
UPDATE public.ai_tools SET description_hinglish = 'Browser mein code likhne, run karne aur share karne ke liye ek online coding platform.'
  WHERE slug = 'replit';
UPDATE public.ai_tools SET description_hinglish = 'Text se poore web apps aur projects banane ke liye ek AI-powered full-stack development platform.'
  WHERE slug = 'bolt-new';
UPDATE public.ai_tools SET description_hinglish = 'Idea se fully working web app banane wala ek AI-first app builder.'
  WHERE slug = 'lovable';
UPDATE public.ai_tools SET description_hinglish = 'Cursor ki tarah ek AI-powered code editor jo aapka poora codebase samajhkar smart suggestions deta hai.'
  WHERE slug = 'windsurf';
UPDATE public.ai_tools SET description_hinglish = 'Ek autonomous AI software engineer jo bug fix karne se lekar poore features develop karne tak ka kaam khud kar sakta hai.'
  WHERE slug = 'devin';
UPDATE public.ai_tools SET description_hinglish = 'VS Code extension jo Claude AI ko aapke editor mein jodhkar coding, debugging aur refactoring mein help karta hai.'
  WHERE slug = 'cline';

-- Productivity
UPDATE public.ai_tools SET description_hinglish = 'Meetings record karne, transcribe karne aur summary banane ke liye ek AI note-taking assistant.'
  WHERE slug = 'otter-ai';
UPDATE public.ai_tools SET description_hinglish = 'Meetings ko automatically record aur transcribe karne wala AI tool jo action items bhi nikalata hai.'
  WHERE slug = 'fireflies-ai';
UPDATE public.ai_tools SET description_hinglish = 'Meeting ke baad automatically follow-ups aur action items track karne wala AI productivity tool.'
  WHERE slug = 'circleback';
UPDATE public.ai_tools SET description_hinglish = 'Aapke calendar ko AI se optimize karne aur time ki barbadi rokne wala ek smart scheduling tool.'
  WHERE slug = 'reclaim-ai';
UPDATE public.ai_tools SET description_hinglish = 'Aapke tasks aur calendar ko AI se manage karke kaam aur focus time ko balance karne wala tool.'
  WHERE slug = 'motion-ai';
UPDATE public.ai_tools SET description_hinglish = 'Aapke notes aur ideas ko AI se connect karke ek smart second brain banane wala tool.'
  WHERE slug = 'mem-ai';
UPDATE public.ai_tools SET description_hinglish = 'Marketing content ko audience ke hisaab se optimize karne wala ek AI writing aur performance tool.'
  WHERE slug = 'anyword';
UPDATE public.ai_tools SET description_hinglish = 'Newsletter likhne aur email audience banane ke liye ek popular AI-assisted publishing platform.'
  WHERE slug = 'beehiiv';
UPDATE public.ai_tools SET description_hinglish = 'Team collaboration, task management aur AI se project planning ke liye ek all-in-one workspace.'
  WHERE slug = 'taskade';

-- Music & Audio
UPDATE public.ai_tools SET description_hinglish = 'Text prompt se original songs aur music banane ke liye sabse popular AI music generator.'
  WHERE slug = 'suno-ai';
UPDATE public.ai_tools SET description_hinglish = 'High-quality AI-generated music banane ke liye ek powerful audio generation platform.'
  WHERE slug = 'udio';
UPDATE public.ai_tools SET description_hinglish = 'Ek professional text-to-speech AI jo bahut realistic aur human-like voices generate karta hai.'
  WHERE slug = 'elevenlabs';
UPDATE public.ai_tools SET description_hinglish = 'Video aur podcast ke liye AI se background noise hatane aur audio quality improve karne ka tool.'
  WHERE slug = 'adobe-podcast';
UPDATE public.ai_tools SET description_hinglish = 'Videos aur podcasts ke liye royalty-free AI-generated background music banane ka tool.'
  WHERE slug = 'soundraw';
UPDATE public.ai_tools SET description_hinglish = 'Films, games aur ads ke liye original AI-composed music banane wala platform.'
  WHERE slug = 'aiva';
UPDATE public.ai_tools SET description_hinglish = 'Video content, podcasts aur streaming ke liye custom AI music generate karne wala tool.'
  WHERE slug = 'mubert';
UPDATE public.ai_tools SET description_hinglish = 'Human-quality voice cloning aur Hindi samet kai languages mein text-to-speech banane wala AI tool.'
  WHERE slug = 'murf-ai';
UPDATE public.ai_tools SET description_hinglish = 'Kisi bhi awaaz ko doosri awaaz mein badal kar professional voiceover banane wala AI audio tool.'
  WHERE slug = 'descript-overdub';

-- Business & Finance
UPDATE public.ai_tools SET description_hinglish = 'Presentations aur pitch decks banane ke liye ek AI-powered tool jo automatically sundar slides taiyaar karta hai.'
  WHERE slug = 'beautiful-ai';
UPDATE public.ai_tools SET description_hinglish = 'Text se interactive presentations, documents aur webpages banane wala ek popular AI tool.'
  WHERE slug = 'gamma-app';
UPDATE public.ai_tools SET description_hinglish = 'Story-style presentations aur pitch decks banane ke liye ek AI-assisted narrative platform.'
  WHERE slug = 'tome-ai';
UPDATE public.ai_tools SET description_hinglish = 'Salesforce CRM mein built-in AI jo sales forecasting, customer intelligence aur automation provide karta hai.'
  WHERE slug = 'salesforce-einstein';
UPDATE public.ai_tools SET description_hinglish = 'HubSpot mein AI features jo marketing, sales aur customer service ko automate aur improve karte hain.'
  WHERE slug = 'hubspot-ai';
UPDATE public.ai_tools SET description_hinglish = 'Zoho CRM aur business suite mein AI assistant jo sales forecasting aur customer analysis karta hai.'
  WHERE slug = 'zoho-zia';

-- Education
UPDATE public.ai_tools SET description_hinglish = 'Khan Academy ka AI tutor jo students ko maths, science aur doosre subjects personally sikhane mein help karta hai.'
  WHERE slug = 'khanmigo';
UPDATE public.ai_tools SET description_hinglish = 'Duolingo ka AI-powered premium experience jo language sikhna aur bhi fun aur effective banata hai.'
  WHERE slug = 'duolingo-max';
UPDATE public.ai_tools SET description_hinglish = 'Camera se maths ke sawaal scan karke step-by-step solution batane wala AI math solver.'
  WHERE slug = 'photomath';
UPDATE public.ai_tools SET description_hinglish = 'Complex maths, science aur engineering sawaalon ke jawab ke liye duniya ka sabse powerful computational knowledge engine.'
  WHERE slug = 'wolfram-alpha';
UPDATE public.ai_tools SET description_hinglish = 'Google ka ek free AI homework helper jo photo se sawaal pehchaan kar step-by-step jawab deta hai.'
  WHERE slug = 'socratic';
UPDATE public.ai_tools SET description_hinglish = 'Students ko homework, assignments aur exams ki taiyaar mein AI se help karne wala ek education platform.'
  WHERE slug = 'chegg-ai';
UPDATE public.ai_tools SET description_hinglish = 'Duniyabhar ke students aur experts ka ek Q&A platform jo ab AI-assisted answers deta hai.'
  WHERE slug = 'brainly';
UPDATE public.ai_tools SET description_hinglish = 'Indian students ke liye ek popular EdTech platform jo AI se personalized learning experience deta hai.'
  WHERE slug = 'byju-ai';

-- ============================================================
-- Verification
-- ============================================================
SELECT
  slug,
  name_hinglish,
  CASE WHEN description_hinglish IS NULL THEN 'MISSING' ELSE 'OK' END as hinglish_status
FROM public.ai_tools
ORDER BY slug;
