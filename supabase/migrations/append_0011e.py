# -*- coding: utf-8 -*-
import os

path = os.path.join(os.path.dirname(__file__), "0011_tool_content_seed_remaining.sql")

sql = """
-- ============================================================
-- BATCH E: Productivity (mem-ai, anyword, beehiiv, taskade,
--          clickup-ai, superhuman, mymind, speechify, krisp)
--          Business (salesforce-einstein, hubspot-ai, zoho-zia,
--          intercom, hootsuite-owlywriter-ai, buffer, later,
--          apollo-io, instantly-ai, mailchimp-ai, ahrefs, brevo,
--          adcreativeai)
--          Education (duolingo-max, chegg-ai, brainly, byju-ai,
--          kahoot-ai, quizlet-ai, teachable, mentimeter, scholarcy)
--          Data (rows-ai, polymer, monkeylearn, coefficient)
--          Music (descript-overdub)
-- ============================================================

UPDATE public.ai_tools SET
  features = '{"en":["AI-powered memory and note organisation","Automatic linking of related notes","Smart search across all saved content","Browser extension for web clipping","Integrates with Slack, email, calendar"],"hi":["AI-संचालित मेमोरी और नोट संगठन","संबंधित नोट्स की स्वचालित लिंकिंग","सहेजी गई सामग्री में स्मार्ट खोज","वेब क्लिपिंग के लिए ब्राउजर एक्सटेंशन","Slack, ईमेल, कैलेंडर के साथ एकीकरण"],"hinglish":["AI-powered memory aur note organisation","Related notes ki automatic linking","Saved content mein smart search","Web clipping ke liye browser extension","Slack, email, calendar ke saath integration"]}',
  pros = '{"en":["Effortless knowledge capture","Surfaces relevant notes automatically","Clean distraction-free interface","Works across devices"],"hi":["सहज ज्ञान संग्रह","प्रासंगिक नोट्स स्वचालित रूप से सामने आते हैं","स्वच्छ विचलन-मुक्त इंटरफेस","सभी डिवाइस पर काम करता है"],"hinglish":["Effortless knowledge capture","Relevant notes automatically surface hote hain","Clean distraction-free interface","Sabhi devices par kaam karta hai"]}',
  cons = '{"en":["Limited free tier","Less powerful than Notion for structured docs","Mobile app needs improvement"],"hi":["सीमित मुफ्त स्तर","संरचित दस्तावेज़ों के लिए Notion से कम शक्तिशाली","मोबाइल ऐप में सुधार की जरूरत"],"hinglish":["Limited free tier","Structured docs ke liye Notion se kam powerful","Mobile app mein improvement chahiye"]}',
  use_cases = '{"en":["Personal knowledge management","Research note-taking","Bookmark organisation","Daily journaling"],"hi":["व्यक्तिगत ज्ञान प्रबंधन","शोध नोट लेना","बुकमार्क संगठन","दैनिक जर्नलिंग"],"hinglish":["Personal knowledge management","Research note-taking","Bookmark organisation","Daily journaling"]}',
  alternatives = ARRAY['notion-ai','obsidian','evernote'],
  hindi_summary = 'Mem AI एक स्मार्ट नोट्स और मेमोरी ऐप है जो आपकी सभी जानकारी को AI से जोड़ता और व्यवस्थित करता है।'
WHERE slug = 'mem-ai';

UPDATE public.ai_tools SET
  features = '{"en":["AI copywriting for ads, emails, landing pages","Brand voice customisation","Performance prediction scores","A/B testing support","100+ templates"],"hi":["विज्ञापन, ईमेल, लैंडिंग पेज के लिए AI कॉपीराइटिंग","ब्रांड वॉयस कस्टमाइजेशन","प्रदर्शन पूर्वानुमान स्कोर","A/B टेस्टिंग सपोर्ट","100+ टेम्पलेट"],"hinglish":["Ads, emails, landing pages ke liye AI copywriting","Brand voice customisation","Performance prediction scores","A/B testing support","100+ templates"]}',
  pros = '{"en":["Conversion-focused content","Brand voice consistency","Performance scoring differentiates it","Good for marketing teams"],"hi":["रूपांतरण-केंद्रित सामग्री","ब्रांड वॉयस स्थिरता","प्रदर्शन स्कोरिंग इसे अलग बनाती है","मार्केटिंग टीमों के लिए अच्छा"],"hinglish":["Conversion-focused content","Brand voice consistency","Performance scoring ise alag banata hai","Marketing teams ke liye acha"]}',
  cons = '{"en":["Expensive for small teams","Output needs editing","Focused mainly on ads"],"hi":["छोटी टीमों के लिए महंगा","आउटपुट को संपादन की जरूरत","मुख्यतः विज्ञापनों पर केंद्रित"],"hinglish":["Chhoti teams ke liye mahenga","Output ko editing ki zarurat","Mainly ads par focused"]}',
  use_cases = '{"en":["Ad copywriting","Email marketing","Landing page optimisation","Social media content"],"hi":["विज्ञापन कॉपीराइटिंग","ईमेल मार्केटिंग","लैंडिंग पेज अनुकूलन","सोशल मीडिया सामग्री"],"hinglish":["Ad copywriting","Email marketing","Landing page optimisation","Social media content"]}',
  alternatives = ARRAY['jasper','copy-ai','writesonic'],
  hindi_summary = 'Anyword एक AI मार्केटिंग कॉपीराइटिंग टूल है जो प्रदर्शन स्कोर के साथ बेहतर विज्ञापन और ईमेल लिखने में मदद करता है।'
WHERE slug = 'anyword';

UPDATE public.ai_tools SET
  features = '{"en":["Email newsletter platform with AI writing","Audience growth tools","Paid newsletter monetisation","Analytics dashboard","Custom domains"],"hi":["AI लेखन के साथ ईमेल न्यूज़लेटर प्लेटफॉर्म","दर्शक वृद्धि टूल","पेड न्यूज़लेटर मुद्रीकरण","विश्लेषण डैशबोर्ड","कस्टम डोमेन"],"hinglish":["AI writing ke saath email newsletter platform","Audience growth tools","Paid newsletter monetisation","Analytics dashboard","Custom domains"]}',
  pros = '{"en":["Best-in-class newsletter tooling","Easy monetisation","Strong creator community","Good deliverability"],"hi":["श्रेणी में सर्वश्रेष्ठ न्यूज़लेटर टूलिंग","आसान मुद्रीकरण","मजबूत क्रिएटर समुदाय","अच्छी डिलिवरेबिलिटी"],"hinglish":["Best-in-class newsletter tooling","Easy monetisation","Strong creator community","Achi deliverability"]}',
  cons = '{"en":["AI features still maturing","Not a full CMS","Limited design customisation"],"hi":["AI फीचर अभी भी विकसित हो रहे हैं","पूर्ण CMS नहीं","सीमित डिजाइन कस्टमाइजेशन"],"hinglish":["AI features abhi bhi mature ho rahe hain","Full CMS nahi","Limited design customisation"]}',
  use_cases = '{"en":["Creator newsletters","Paid subscription content","Brand newsletters","Community building"],"hi":["क्रिएटर न्यूज़लेटर","पेड सब्सक्रिप्शन सामग्री","ब्रांड न्यूज़लेटर","समुदाय निर्माण"],"hinglish":["Creator newsletters","Paid subscription content","Brand newsletters","Community building"]}',
  alternatives = ARRAY['mailchimp-ai','brevo','substack'],
  hindi_summary = 'Beehiiv एक आधुनिक ईमेल न्यूज़लेटर प्लेटफॉर्म है जो AI लेखन और मुद्रीकरण टूल के साथ creators को आगे बढ़ने में मदद करता है।'
WHERE slug = 'beehiiv';

UPDATE public.ai_tools SET
  features = '{"en":["AI task and project management","Team collaboration workspace","Mind mapping and whiteboard","Goal tracking","100+ integrations"],"hi":["AI कार्य और परियोजना प्रबंधन","टीम सहयोग कार्यस्थान","माइंड मैपिंग और व्हाइटबोर्ड","लक्ष्य ट्रैकिंग","100+ एकीकरण"],"hinglish":["AI task aur project management","Team collaboration workspace","Mind mapping aur whiteboard","Goal tracking","100+ integrations"]}',
  pros = '{"en":["All-in-one workspace","Generous free plan","Good for solopreneurs and small teams","AI writing built-in"],"hi":["ऑल-इन-वन कार्यस्थान","उदार मुफ्त योजना","सोलोप्रेन्योर और छोटी टीमों के लिए अच्छा","AI लेखन अंतर्निहित"],"hinglish":["All-in-one workspace","Generous free plan","Solopreneurs aur chhoti teams ke liye acha","AI writing built-in"]}',
  cons = '{"en":["Can feel overwhelming","Less powerful than dedicated PM tools","Performance issues on large projects"],"hi":["भारी लग सकता है","समर्पित PM टूल से कम शक्तिशाली","बड़ी परियोजनाओं पर प्रदर्शन समस्याएं"],"hinglish":["Overwhelming lag sakta hai","Dedicated PM tools se kam powerful","Large projects par performance issues"]}',
  use_cases = '{"en":["Project management","Team task tracking","Content planning","Goal setting"],"hi":["परियोजना प्रबंधन","टीम कार्य ट्रैकिंग","सामग्री योजना","लक्ष्य निर्धारण"],"hinglish":["Project management","Team task tracking","Content planning","Goal setting"]}',
  alternatives = ARRAY['notion-ai','clickup-ai','asana'],
  hindi_summary = 'Taskade एक AI-संचालित ऑल-इन-वन टास्क और प्रोजेक्ट मैनेजमेंट टूल है जो टीम सहयोग को आसान बनाता है।'
WHERE slug = 'taskade';

UPDATE public.ai_tools SET
  features = '{"en":["AI task prioritisation","Automated project summaries","Smart goal tracking","Natural language task creation","Integrates with 1000+ apps"],"hi":["AI कार्य प्राथमिकता","स्वचालित परियोजना सारांश","स्मार्ट लक्ष्य ट्रैकिंग","प्राकृतिक भाषा कार्य निर्माण","1000+ ऐप्स के साथ एकीकरण"],"hinglish":["AI task prioritisation","Automated project summaries","Smart goal tracking","Natural language task creation","1000+ apps ke saath integration"]}',
  pros = '{"en":["Feature-rich platform","Strong automation","AI makes project management faster","Scales from solo to enterprise"],"hi":["फीचर-समृद्ध प्लेटफॉर्म","मजबूत स्वचालन","AI प्रोजेक्ट मैनेजमेंट तेज करता है","सोलो से एंटरप्राइज तक स्केल होता है"],"hinglish":["Feature-rich platform","Strong automation","AI project management faster banata hai","Solo se enterprise tak scale hota hai"]}',
  cons = '{"en":["Steep learning curve","Can be overwhelming","Expensive higher tiers"],"hi":["तीव्र सीखने की अवस्था","भारी हो सकता है","महंगे उच्च स्तर"],"hinglish":["Steep learning curve","Overwhelming ho sakta hai","Expensive higher tiers"]}',
  use_cases = '{"en":["Project management","Team collaboration","OKR tracking","Workflow automation"],"hi":["परियोजना प्रबंधन","टीम सहयोग","OKR ट्रैकिंग","वर्कफ्लो स्वचालन"],"hinglish":["Project management","Team collaboration","OKR tracking","Workflow automation"]}',
  alternatives = ARRAY['notion-ai','taskade','asana'],
  hindi_summary = 'ClickUp AI एक शक्तिशाली प्रोजेक्ट मैनेजमेंट प्लेटफॉर्म है जिसमें AI सुविधाएं टास्क प्रबंधन और टीम सहयोग को स्वचालित करती हैं।'
WHERE slug = 'clickup-ai';

UPDATE public.ai_tools SET
  features = '{"en":["AI email prioritisation and summarisation","Blazing fast email interface","Smart reminders","One-click unsubscribe","Split inbox"],"hi":["AI ईमेल प्राथमिकता और सारांश","अत्यंत तेज ईमेल इंटरफेस","स्मार्ट रिमाइंडर","एक-क्लिक अनसब्सक्राइब","स्प्लिट इनबॉक्स"],"hinglish":["AI email prioritisation aur summarisation","Blazing fast email interface","Smart reminders","One-click unsubscribe","Split inbox"]}',
  pros = '{"en":["Fastest email client available","AI summaries save time","Excellent keyboard shortcuts","Reduces email anxiety"],"hi":["उपलब्ध सबसे तेज ईमेल क्लाइंट","AI सारांश समय बचाते हैं","उत्कृष्ट कीबोर्ड शॉर्टकट","ईमेल चिंता कम करता है"],"hinglish":["Sabse fast email client","AI summaries time bachate hain","Excellent keyboard shortcuts","Email anxiety kam karta hai"]}',
  cons = '{"en":["Very expensive","Gmail/Outlook only","Overkill for casual users"],"hi":["बहुत महंगा","केवल Gmail/Outlook","आकस्मिक उपयोगकर्ताओं के लिए अधिक"],"hinglish":["Bahut mahenga","Sirf Gmail/Outlook","Casual users ke liye zyada"]}',
  use_cases = '{"en":["Email productivity for busy professionals","Executive email management","Sales email triage","Inbox zero achievement"],"hi":["व्यस्त पेशेवरों के लिए ईमेल उत्पादकता","कार्यकारी ईमेल प्रबंधन","सेल्स ईमेल ट्राइज","इनबॉक्स जीरो प्राप्ति"],"hinglish":["Busy professionals ke liye email productivity","Executive email management","Sales email triage","Inbox zero achieve karna"]}',
  alternatives = ARRAY['notion-ai','microsoft-copilot','gmail'],
  hindi_summary = 'Superhuman एक AI-संचालित प्रीमियम ईमेल क्लाइंट है जो ईमेल को तेजी से पढ़ने, उत्तर देने और प्रबंधित करने में मदद करता है।'
WHERE slug = 'superhuman';

UPDATE public.ai_tools SET
  features = '{"en":["AI-powered visual bookmarking","Automatic tagging and organisation","Private by default","Image, link, and note saving","Smart search"],"hi":["AI-संचालित विजुअल बुकमार्किंग","स्वचालित टैगिंग और संगठन","डिफ़ॉल्ट रूप से निजी","छवि, लिंक और नोट सहेजना","स्मार्ट खोज"],"hinglish":["AI-powered visual bookmarking","Automatic tagging aur organisation","Private by default","Image, link aur note saving","Smart search"]}',
  pros = '{"en":["Beautiful visual interface","Privacy-focused","AI makes organisation effortless","Great for creative professionals"],"hi":["सुंदर विजुअल इंटरफेस","गोपनीयता-केंद्रित","AI संगठन को सहज बनाता है","क्रिएटिव पेशेवरों के लिए बढ़िया"],"hinglish":["Beautiful visual interface","Privacy-focused","AI organisation ko effortless banata hai","Creative professionals ke liye great"]}',
  cons = '{"en":["No collaboration features","Limited integrations","Niche use case"],"hi":["कोई सहयोग सुविधाएं नहीं","सीमित एकीकरण","विशिष्ट उपयोग मामला"],"hinglish":["Koi collaboration features nahi","Limited integrations","Niche use case"]}',
  use_cases = '{"en":["Personal knowledge curation","Creative inspiration saving","Research bookmarking","Visual mood boarding"],"hi":["व्यक्तिगत ज्ञान संग्रह","रचनात्मक प्रेरणा सहेजना","शोध बुकमार्किंग","विजुअल मूड बोर्डिंग"],"hinglish":["Personal knowledge curation","Creative inspiration saving","Research bookmarking","Visual mood boarding"]}',
  alternatives = ARRAY['mem-ai','notion-ai','raindrop'],
  hindi_summary = 'MyMind एक AI-संचालित प्राइवेट बुकमार्किंग ऐप है जो आपके विचारों, लिंक और छवियों को स्वचालित रूप से व्यवस्थित करता है।'
WHERE slug = 'mymind';

UPDATE public.ai_tools SET
  features = '{"en":["Text-to-speech reading app","AI voice narration","Speed reading up to 4.5x","Supports PDF, web, ebooks","Dyslexia-friendly fonts"],"hi":["टेक्स्ट-टू-स्पीच पढ़ने का ऐप","AI वॉयस नरेशन","4.5x तक स्पीड रीडिंग","PDF, वेब, ईबुक का समर्थन","डिस्लेक्सिया-अनुकूल फ़ॉन्ट"],"hinglish":["Text-to-speech reading app","AI voice narration","4.5x tak speed reading","PDF, web, ebooks support","Dyslexia-friendly fonts"]}',
  pros = '{"en":["Saves reading time dramatically","Natural-sounding AI voices","Works on all content types","Accessibility-focused"],"hi":["पढ़ने का समय नाटकीय रूप से बचाता है","प्राकृतिक ध्वनि वाली AI आवाजें","सभी सामग्री प्रकारों पर काम करता है","पहुंच-केंद्रित"],"hinglish":["Reading time dramatically bachata hai","Natural-sounding AI voices","Sabhi content types par kaam karta hai","Accessibility-focused"]}',
  cons = '{"en":["Expensive premium plan","Voice quality varies","Not ideal for technical content"],"hi":["महंगी प्रीमियम योजना","आवाज की गुणवत्ता भिन्न होती है","तकनीकी सामग्री के लिए आदर्श नहीं"],"hinglish":["Mahenga premium plan","Voice quality vary karti hai","Technical content ke liye ideal nahi"]}',
  use_cases = '{"en":["Consuming long articles quickly","Audiobook alternatives","Learning while commuting","Accessibility for visual impairments"],"hi":["लंबे लेख जल्दी पढ़ना","ऑडियोबुक विकल्प","यात्रा के दौरान सीखना","दृष्टि बाधाओं के लिए पहुंच"],"hinglish":["Long articles jaldi consume karna","Audiobook alternatives","Commute mein learning","Visual impairments ke liye accessibility"]}',
  alternatives = ARRAY['elevenlabs','murf-ai','naturaltts'],
  hindi_summary = 'Speechify एक AI text-to-speech ऐप है जो किसी भी टेक्स्ट, PDF या वेबपेज को प्राकृतिक आवाज में पढ़ता है और आपकी पढ़ने की गति बढ़ाता है।'
WHERE slug = 'speechify';

UPDATE public.ai_tools SET
  features = '{"en":["AI background noise cancellation","Echo removal","Voice clarity enhancement","Works with any app","Meeting and call integration"],"hi":["AI बैकग्राउंड शोर रद्दीकरण","इको हटाना","वॉयस स्पष्टता वृद्धि","किसी भी ऐप के साथ काम करता है","मीटिंग और कॉल एकीकरण"],"hinglish":["AI background noise cancellation","Echo removal","Voice clarity enhancement","Kisi bhi app ke saath kaam karta hai","Meeting aur call integration"]}',
  pros = '{"en":["Real-time noise cancellation","Works system-wide","Essential for remote workers","Easy to set up"],"hi":["रियल-टाइम शोर रद्दीकरण","सिस्टम-व्यापी काम करता है","रिमोट वर्कर्स के लिए जरूरी","सेट अप करना आसान"],"hinglish":["Real-time noise cancellation","System-wide kaam karta hai","Remote workers ke liye zaroori","Setup karna aasan"]}',
  cons = '{"en":["Uses CPU/RAM","Free tier limited to 120 min/week","Occasional audio glitches"],"hi":["CPU/RAM का उपयोग करता है","मुफ्त स्तर 120 मिनट/सप्ताह तक सीमित","कभी-कभी ऑडियो गड़बड़ी"],"hinglish":["CPU/RAM use karta hai","Free tier 120 min/week tak limited","Kabhi kabhi audio glitches"]}',
  use_cases = '{"en":["Remote work calls","Podcasting","Online teaching","Gaming voice chat"],"hi":["रिमोट वर्क कॉल","पॉडकास्टिंग","ऑनलाइन शिक्षण","गेमिंग वॉयस चैट"],"hinglish":["Remote work calls","Podcasting","Online teaching","Gaming voice chat"]}',
  alternatives = ARRAY['adobe-podcast','nvidia-rtx-voice','descript'],
  hindi_summary = 'Krisp एक AI नॉयज़ कैंसलेशन ऐप है जो किसी भी कॉल या मीटिंग में बैकग्राउंड शोर को रियल-टाइम में हटाता है।'
WHERE slug = 'krisp';

-- ============================================================
-- BUSINESS TOOLS
-- ============================================================

UPDATE public.ai_tools SET
  features = '{"en":["AI CRM with lead scoring","Predictive analytics","Automated email and activity capture","Einstein GPT for sales insights","Pipeline forecasting"],"hi":["लीड स्कोरिंग के साथ AI CRM","पूर्वानुमानित विश्लेषण","स्वचालित ईमेल और गतिविधि कैप्चर","बिक्री अंतर्दृष्टि के लिए Einstein GPT","पाइपलाइन पूर्वानुमान"],"hinglish":["Lead scoring ke saath AI CRM","Predictive analytics","Automated email aur activity capture","Sales insights ke liye Einstein GPT","Pipeline forecasting"]}',
  pros = '{"en":["Industry-leading CRM","Deep AI integration","Comprehensive data insights","Scales to enterprise"],"hi":["उद्योग-अग्रणी CRM","गहन AI एकीकरण","व्यापक डेटा अंतर्दृष्टि","एंटरप्राइज तक स्केल"],"hinglish":["Industry-leading CRM","Deep AI integration","Comprehensive data insights","Enterprise tak scale"]}',
  cons = '{"en":["Very expensive","Complex setup","Steep learning curve","Overkill for small teams"],"hi":["बहुत महंगा","जटिल सेटअप","तीव्र सीखने की अवस्था","छोटी टीमों के लिए अधिक"],"hinglish":["Bahut mahenga","Complex setup","Steep learning curve","Chhoti teams ke liye zyada"]}',
  use_cases = '{"en":["Enterprise sales management","Customer data analysis","Sales forecasting","Marketing automation"],"hi":["एंटरप्राइज बिक्री प्रबंधन","ग्राहक डेटा विश्लेषण","बिक्री पूर्वानुमान","मार्केटिंग स्वचालन"],"hinglish":["Enterprise sales management","Customer data analysis","Sales forecasting","Marketing automation"]}',
  alternatives = ARRAY['hubspot-ai','zoho-zia','pipedrive'],
  hindi_summary = 'Salesforce Einstein एक AI-संचालित एंटरप्राइज CRM है जो बिक्री पूर्वानुमान, लीड स्कोरिंग और ग्राहक अंतर्दृष्टि प्रदान करता है।'
WHERE slug = 'salesforce-einstein';

UPDATE public.ai_tools SET
  features = '{"en":["AI-powered CRM and marketing hub","Content Assistant for emails and blogs","ChatSpot AI assistant","Lead scoring and forecasting","Free CRM tier"],"hi":["AI-संचालित CRM और मार्केटिंग हब","ईमेल और ब्लॉग के लिए Content Assistant","ChatSpot AI सहायक","लीड स्कोरिंग और पूर्वानुमान","मुफ्त CRM स्तर"],"hinglish":["AI-powered CRM aur marketing hub","Emails aur blogs ke liye Content Assistant","ChatSpot AI assistant","Lead scoring aur forecasting","Free CRM tier"]}',
  pros = '{"en":["Strong free tier","All-in-one marketing+sales+service","AI features well-integrated","Great for SMBs"],"hi":["मजबूत मुफ्त स्तर","ऑल-इन-वन मार्केटिंग+सेल्स+सर्विस","AI सुविधाएं अच्छी तरह एकीकृत","SMBs के लिए बढ़िया"],"hinglish":["Strong free tier","All-in-one marketing+sales+service","AI features well-integrated","SMBs ke liye great"]}',
  cons = '{"en":["Gets expensive at scale","Customisation limited vs Salesforce","Reporting can be complex"],"hi":["स्केल पर महंगा हो जाता है","Salesforce की तुलना में कस्टमाइजेशन सीमित","रिपोर्टिंग जटिल हो सकती है"],"hinglish":["Scale par mahenga ho jata hai","Salesforce vs customisation limited","Reporting complex ho sakti hai"]}',
  use_cases = '{"en":["SMB CRM","Inbound marketing","Email campaigns","Sales pipeline management"],"hi":["SMB CRM","इनबाउंड मार्केटिंग","ईमेल अभियान","बिक्री पाइपलाइन प्रबंधन"],"hinglish":["SMB CRM","Inbound marketing","Email campaigns","Sales pipeline management"]}',
  alternatives = ARRAY['salesforce-einstein','zoho-zia','pipedrive'],
  hindi_summary = 'HubSpot AI एक ऑल-इन-वन CRM और मार्केटिंग प्लेटफॉर्म है जो AI से कंटेंट लिखने, लीड स्कोर करने और बिक्री बढ़ाने में मदद करता है।'
WHERE slug = 'hubspot-ai';

UPDATE public.ai_tools SET
  features = '{"en":["AI CRM assistant Zia","Sales predictions","Anomaly detection","Workflow automation","Omnichannel communication"],"hi":["AI CRM सहायक Zia","बिक्री पूर्वानुमान","विसंगति पहचान","वर्कफ्लो स्वचालन","ओमनीचैनल संचार"],"hinglish":["AI CRM assistant Zia","Sales predictions","Anomaly detection","Workflow automation","Omnichannel communication"]}',
  pros = '{"en":["Affordable vs Salesforce/HubSpot","Comprehensive feature set","Good for Indian SMBs","Strong automation"],"hi":["Salesforce/HubSpot की तुलना में किफायती","व्यापक फीचर सेट","भारतीय SMBs के लिए अच्छा","मजबूत स्वचालन"],"hinglish":["Salesforce/HubSpot vs affordable","Comprehensive feature set","Indian SMBs ke liye acha","Strong automation"]}',
  cons = '{"en":["UI feels dated","Zia AI less mature than Einstein","Customer support can be slow"],"hi":["UI पुराना लगता है","Zia AI Einstein से कम परिपक्व","ग्राहक सहायता धीमी हो सकती है"],"hinglish":["UI dated lagta hai","Zia AI Einstein se less mature","Customer support slow ho sakta hai"]}',
  use_cases = '{"en":["SMB sales management","Email marketing","Customer support","Lead nurturing"],"hi":["SMB बिक्री प्रबंधन","ईमेल मार्केटिंग","ग्राहक सहायता","लीड पोषण"],"hinglish":["SMB sales management","Email marketing","Customer support","Lead nurturing"]}',
  alternatives = ARRAY['hubspot-ai','salesforce-einstein','freshsales'],
  hindi_summary = 'Zoho Zia एक AI-संचालित CRM सहायक है जो बिक्री पूर्वानुमान, विसंगति पहचान और वर्कफ्लो स्वचालन प्रदान करता है।'
WHERE slug = 'zoho-zia';

UPDATE public.ai_tools SET
  features = '{"en":["AI-powered customer messaging","Fin AI chatbot for support","Automated workflows","Shared team inbox","Product tours and banners"],"hi":["AI-संचालित ग्राहक मैसेजिंग","सहायता के लिए Fin AI चैटबॉट","स्वचालित वर्कफ्लो","साझा टीम इनबॉक्स","प्रोडक्ट टूर और बैनर"],"hinglish":["AI-powered customer messaging","Support ke liye Fin AI chatbot","Automated workflows","Shared team inbox","Product tours aur banners"]}',
  pros = '{"en":["Fin AI resolves 50%+ queries automatically","Best-in-class customer messaging","Strong product analytics","Modern UI"],"hi":["Fin AI 50%+ प्रश्न स्वचालित रूप से हल करता है","श्रेणी में सर्वश्रेष्ठ ग्राहक मैसेजिंग","मजबूत प्रोडक्ट एनालिटिक्स","आधुनिक UI"],"hinglish":["Fin AI 50%+ queries automatically resolve karta hai","Best-in-class customer messaging","Strong product analytics","Modern UI"]}',
  cons = '{"en":["Very expensive","Complex pricing","Overwhelming for small teams"],"hi":["बहुत महंगा","जटिल मूल्य निर्धारण","छोटी टीमों के लिए भारी"],"hinglish":["Bahut mahenga","Complex pricing","Chhoti teams ke liye overwhelming"]}',
  use_cases = '{"en":["Customer support automation","Onboarding new users","SaaS product support","Live chat"],"hi":["ग्राहक सहायता स्वचालन","नए उपयोगकर्ताओं को ऑनबोर्ड करना","SaaS प्रोडक्ट सहायता","लाइव चैट"],"hinglish":["Customer support automation","Naye users ko onboard karna","SaaS product support","Live chat"]}',
  alternatives = ARRAY['tidio','zendesk','freshdesk'],
  hindi_summary = 'Intercom एक AI-संचालित कस्टमर मैसेजिंग प्लेटफॉर्म है जिसका Fin AI चैटबॉट स्वचालित रूप से ग्राहक प्रश्नों का उत्तर देता है।'
WHERE slug = 'intercom';

UPDATE public.ai_tools SET
  features = '{"en":["OwlyWriter AI for social captions","Content scheduling across platforms","Social listening","Analytics and reporting","Team collaboration"],"hi":["सोशल कैप्शन के लिए OwlyWriter AI","प्लेटफार्मों में कंटेंट शेड्यूलिंग","सोशल लिस्निंग","विश्लेषण और रिपोर्टिंग","टीम सहयोग"],"hinglish":["Social captions ke liye OwlyWriter AI","Platforms mein content scheduling","Social listening","Analytics aur reporting","Team collaboration"]}',
  pros = '{"en":["Comprehensive social media management","AI writing saves time","Best analytics in category","Trusted by enterprises"],"hi":["व्यापक सोशल मीडिया प्रबंधन","AI लेखन समय बचाता है","श्रेणी में सर्वश्रेष्ठ एनालिटिक्स","एंटरप्राइज द्वारा विश्वसनीय"],"hinglish":["Comprehensive social media management","AI writing time bachata hai","Category mein best analytics","Enterprises ka trusted"]}',
  cons = '{"en":["Expensive","Interface feels complex","Free plan very limited"],"hi":["महंगा","इंटरफेस जटिल लगता है","मुफ्त योजना बहुत सीमित"],"hinglish":["Mahenga","Interface complex lagta hai","Free plan bahut limited"]}',
  use_cases = '{"en":["Social media management","Content scheduling","Brand monitoring","Agency social management"],"hi":["सोशल मीडिया प्रबंधन","कंटेंट शेड्यूलिंग","ब्रांड मॉनिटरिंग","एजेंसी सोशल प्रबंधन"],"hinglish":["Social media management","Content scheduling","Brand monitoring","Agency social management"]}',
  alternatives = ARRAY['buffer','later','sprout-social'],
  hindi_summary = 'Hootsuite OwlyWriter AI एक एंटरप्राइज सोशल मीडिया मैनेजमेंट टूल है जो AI से सोशल कैप्शन लिखता और शेड्यूल करता है।'
WHERE slug = 'hootsuite-owlywriter-ai';

UPDATE public.ai_tools SET
  features = '{"en":["AI post writing suggestions","Multi-platform scheduling","Analytics dashboard","Link in bio tool","Team collaboration"],"hi":["AI पोस्ट लेखन सुझाव","मल्टी-प्लेटफॉर्म शेड्यूलिंग","विश्लेषण डैशबोर्ड","Link in bio टूल","टीम सहयोग"],"hinglish":["AI post writing suggestions","Multi-platform scheduling","Analytics dashboard","Link in bio tool","Team collaboration"]}',
  pros = '{"en":["Simple clean interface","Good free plan","Affordable pricing","Easy to use"],"hi":["सरल स्वच्छ इंटरफेस","अच्छी मुफ्त योजना","किफायती मूल्य निर्धारण","उपयोग में आसान"],"hinglish":["Simple clean interface","Achi free plan","Affordable pricing","Use mein aasan"]}',
  cons = '{"en":["Fewer features than Hootsuite","Limited analytics","No social listening"],"hi":["Hootsuite से कम फीचर","सीमित एनालिटिक्स","कोई सोशल लिस्निंग नहीं"],"hinglish":["Hootsuite se kam features","Limited analytics","Koi social listening nahi"]}',
  use_cases = '{"en":["Small business social media","Content scheduling","Solopreneur social management","Agency client management"],"hi":["छोटे व्यवसाय सोशल मीडिया","कंटेंट शेड्यूलिंग","सोलोप्रेन्योर सोशल प्रबंधन","एजेंसी क्लाइंट प्रबंधन"],"hinglish":["Small business social media","Content scheduling","Solopreneur social management","Agency client management"]}',
  alternatives = ARRAY['later','hootsuite-owlywriter-ai','sprout-social'],
  hindi_summary = 'Buffer एक सरल और किफायती सोशल मीडिया शेड्यूलिंग टूल है जो AI पोस्ट सुझावों के साथ आता है।'
WHERE slug = 'buffer';

UPDATE public.ai_tools SET
  features = '{"en":["Visual Instagram and TikTok planner","AI caption writer","Best time to post suggestions","Link in bio tool","Hashtag suggestions"],"hi":["विजुअल Instagram और TikTok प्लानर","AI कैप्शन राइटर","पोस्ट करने का सबसे अच्छा समय सुझाव","Link in bio टूल","हैशटैग सुझाव"],"hinglish":["Visual Instagram aur TikTok planner","AI caption writer","Best time to post suggestions","Link in bio tool","Hashtag suggestions"]}',
  pros = '{"en":["Best visual content planner","Great for Instagram and TikTok","AI captions save time","Easy drag-and-drop"],"hi":["सर्वश्रेष्ठ विजुअल कंटेंट प्लानर","Instagram और TikTok के लिए बढ़िया","AI कैप्शन समय बचाते हैं","आसान ड्रैग-एंड-ड्रॉप"],"hinglish":["Best visual content planner","Instagram aur TikTok ke liye great","AI captions time bachate hain","Easy drag-and-drop"]}',
  cons = '{"en":["Limited to visual platforms","No Twitter/X scheduling on free plan","Analytics basic on free tier"],"hi":["विजुअल प्लेटफॉर्म तक सीमित","मुफ्त योजना पर Twitter/X शेड्यूलिंग नहीं","मुफ्त स्तर पर बेसिक एनालिटिक्स"],"hinglish":["Visual platforms tak limited","Free plan par Twitter/X scheduling nahi","Free tier par basic analytics"]}',
  use_cases = '{"en":["Instagram content planning","TikTok scheduling","E-commerce social media","Brand visual planning"],"hi":["Instagram कंटेंट प्लानिंग","TikTok शेड्यूलिंग","ई-कॉमर्स सोशल मीडिया","ब्रांड विजुअल प्लानिंग"],"hinglish":["Instagram content planning","TikTok scheduling","E-commerce social media","Brand visual planning"]}',
  alternatives = ARRAY['buffer','hootsuite-owlywriter-ai','planoly'],
  hindi_summary = 'Later एक विजुअल सोशल मीडिया प्लानिंग टूल है जो Instagram और TikTok के लिए AI कैप्शन और बेस्ट टाइम सुझाव देता है।'
WHERE slug = 'later';

UPDATE public.ai_tools SET
  features = '{"en":["AI-powered B2B sales intelligence","Contact and company database","Email sequencing automation","Chrome extension for LinkedIn","Intent data signals"],"hi":["AI-संचालित B2B सेल्स इंटेलिजेंस","संपर्क और कंपनी डेटाबेस","ईमेल सीक्वेंसिंग स्वचालन","LinkedIn के लिए Chrome एक्सटेंशन","इंटेंट डेटा सिग्नल"],"hinglish":["AI-powered B2B sales intelligence","Contact aur company database","Email sequencing automation","LinkedIn ke liye Chrome extension","Intent data signals"]}',
  pros = '{"en":["Massive contact database","Strong outreach automation","Intent data is powerful","Good Chrome extension"],"hi":["विशाल संपर्क डेटाबेस","मजबूत आउटरीच स्वचालन","इंटेंट डेटा शक्तिशाली है","अच्छा Chrome एक्सटेंशन"],"hinglish":["Massive contact database","Strong outreach automation","Intent data powerful hai","Acha Chrome extension"]}',
  cons = '{"en":["Data accuracy varies","Can feel spammy if misused","Expensive enterprise plans"],"hi":["डेटा सटीकता भिन्न होती है","दुरुपयोग होने पर स्पैमी लग सकता है","महंगी एंटरप्राइज योजनाएं"],"hinglish":["Data accuracy vary karta hai","Misuse hone par spammy lag sakta hai","Mahenga enterprise plans"]}',
  use_cases = '{"en":["B2B lead generation","Sales prospecting","Email outreach","Account-based marketing"],"hi":["B2B लीड जनरेशन","सेल्स प्रॉस्पेक्टिंग","ईमेल आउटरीच","अकाउंट-बेस्ड मार्केटिंग"],"hinglish":["B2B lead generation","Sales prospecting","Email outreach","Account-based marketing"]}',
  alternatives = ARRAY['instantly-ai','hubspot-ai','salesforce-einstein'],
  hindi_summary = 'Apollo.io एक AI-संचालित B2B सेल्स इंटेलिजेंस प्लेटफॉर्म है जो लीड खोजने और ईमेल आउटरीच ऑटोमेट करने में मदद करता है।'
WHERE slug = 'apollo-io';

UPDATE public.ai_tools SET
  features = '{"en":["Cold email automation at scale","AI email personalisation","Unlimited sending accounts","Warm-up tool","Deliverability analytics"],"hi":["बड़े पैमाने पर कोल्ड ईमेल स्वचालन","AI ईमेल व्यक्तिगतकरण","असीमित भेजने के खाते","वार्म-अप टूल","डिलिवरेबिलिटी एनालिटिक्स"],"hinglish":["Scale par cold email automation","AI email personalisation","Unlimited sending accounts","Warm-up tool","Deliverability analytics"]}',
  pros = '{"en":["Best cold email deliverability","Unlimited sending accounts","AI personalisation at scale","Affordable"],"hi":["सर्वश्रेष्ठ कोल्ड ईमेल डिलिवरेबिलिटी","असीमित भेजने के खाते","बड़े पैमाने पर AI व्यक्तिगतकरण","किफायती"],"hinglish":["Best cold email deliverability","Unlimited sending accounts","Scale par AI personalisation","Affordable"]}',
  cons = '{"en":["Focused only on cold email","Can enable spam if misused","Setup requires technical knowledge"],"hi":["केवल कोल्ड ईमेल पर केंद्रित","दुरुपयोग होने पर स्पैम सक्षम कर सकता है","सेटअप के लिए तकनीकी ज्ञान आवश्यक"],"hinglish":["Sirf cold email par focused","Misuse hone par spam enable kar sakta hai","Setup ke liye technical knowledge chahiye"]}',
  use_cases = '{"en":["Cold email outreach","Sales prospecting","Agency client acquisition","Lead generation campaigns"],"hi":["कोल्ड ईमेल आउटरीच","सेल्स प्रॉस्पेक्टिंग","एजेंसी क्लाइंट अधिग्रहण","लीड जनरेशन अभियान"],"hinglish":["Cold email outreach","Sales prospecting","Agency client acquisition","Lead generation campaigns"]}',
  alternatives = ARRAY['apollo-io','mailchimp-ai','brevo'],
  hindi_summary = 'Instantly AI एक कोल्ड ईमेल स्वचालन प्लेटफॉर्म है जो AI से ईमेल को पर्सनलाइज़ करता है और बड़े पैमाने पर आउटरीच चलाता है।'
WHERE slug = 'instantly-ai';

UPDATE public.ai_tools SET
  features = '{"en":["AI email campaign builder","Audience segmentation","A/B testing","Marketing automation workflows","E-commerce integrations"],"hi":["AI ईमेल अभियान बिल्डर","दर्शक विभाजन","A/B टेस्टिंग","मार्केटिंग स्वचालन वर्कफ्लो","ई-कॉमर्स एकीकरण"],"hinglish":["AI email campaign builder","Audience segmentation","A/B testing","Marketing automation workflows","E-commerce integrations"]}',
  pros = '{"en":["Industry standard for email marketing","Generous free plan","Strong automation","Wide integrations"],"hi":["ईमेल मार्केटिंग के लिए उद्योग मानक","उदार मुफ्त योजना","मजबूत स्वचालन","व्यापक एकीकरण"],"hinglish":["Email marketing ke liye industry standard","Generous free plan","Strong automation","Wide integrations"]}',
  cons = '{"en":["AI features less advanced than competitors","Gets expensive at scale","Limited landing pages on free"],"hi":["AI सुविधाएं प्रतिस्पर्धियों से कम उन्नत","स्केल पर महंगा","मुफ्त पर सीमित लैंडिंग पेज"],"hinglish":["AI features competitors se less advanced","Scale par mahenga","Free par limited landing pages"]}',
  use_cases = '{"en":["Email newsletters","E-commerce campaigns","Lead nurturing","Event marketing"],"hi":["ईमेल न्यूज़लेटर","ई-कॉमर्स अभियान","लीड पोषण","इवेंट मार्केटिंग"],"hinglish":["Email newsletters","E-commerce campaigns","Lead nurturing","Event marketing"]}',
  alternatives = ARRAY['brevo','beehiiv','instantly-ai'],
  hindi_summary = 'Mailchimp AI एक लोकप्रिय ईमेल मार्केटिंग प्लेटफॉर्म है जो AI से अभियान बनाने, ऑटोमेट करने और विश्लेषण करने में मदद करता है।'
WHERE slug = 'mailchimp-ai';

UPDATE public.ai_tools SET
  features = '{"en":["AI SEO audit and recommendations","Keyword research","Backlink analysis","Rank tracker","Site explorer"],"hi":["AI SEO ऑडिट और सिफारिशें","कीवर्ड रिसर्च","बैकलिंक विश्लेषण","रैंक ट्रैकर","साइट एक्सप्लोरर"],"hinglish":["AI SEO audit aur recommendations","Keyword research","Backlink analysis","Rank tracker","Site explorer"]}',
  pros = '{"en":["Industry-leading backlink database","Comprehensive SEO toolkit","Accurate keyword data","Trusted by SEO professionals"],"hi":["उद्योग-अग्रणी बैकलिंक डेटाबेस","व्यापक SEO टूलकिट","सटीक कीवर्ड डेटा","SEO पेशेवरों द्वारा विश्वसनीय"],"hinglish":["Industry-leading backlink database","Comprehensive SEO toolkit","Accurate keyword data","SEO professionals ka trusted"]}',
  cons = '{"en":["Expensive","Steep learning curve for beginners","No free plan (only $7 trial)"],"hi":["महंगा","शुरुआती लोगों के लिए तीव्र सीखने की अवस्था","कोई मुफ्त योजना नहीं (केवल $7 ट्रायल)"],"hinglish":["Mahenga","Beginners ke liye steep learning curve","Free plan nahi (sirf $7 trial)"]}',
  use_cases = '{"en":["SEO auditing","Competitor backlink analysis","Keyword research","Content gap analysis"],"hi":["SEO ऑडिटिंग","प्रतिस्पर्धी बैकलिंक विश्लेषण","कीवर्ड रिसर्च","कंटेंट गैप विश्लेषण"],"hinglish":["SEO auditing","Competitor backlink analysis","Keyword research","Content gap analysis"]}',
  alternatives = ARRAY['semrush','surfer-seo','moz'],
  hindi_summary = 'Ahrefs एक शक्तिशाली AI SEO टूल है जो बैकलिंक विश्लेषण, कीवर्ड रिसर्च और साइट ऑडिट के लिए उद्योग में अग्रणी है।'
WHERE slug = 'ahrefs';

UPDATE public.ai_tools SET
  features = '{"en":["Email marketing with AI","SMS marketing","Transactional emails","Marketing automation","Free plan up to 300 emails/day"],"hi":["AI के साथ ईमेल मार्केटिंग","SMS मार्केटिंग","ट्रांसेक्शनल ईमेल","मार्केटिंग स्वचालन","300 ईमेल/दिन तक मुफ्त योजना"],"hinglish":["AI ke saath email marketing","SMS marketing","Transactional emails","Marketing automation","300 emails/day tak free plan"]}',
  pros = '{"en":["Generous free plan","Email + SMS in one platform","Good deliverability","Affordable paid plans"],"hi":["उदार मुफ्त योजना","एक प्लेटफॉर्म में ईमेल + SMS","अच्छी डिलिवरेबिलिटी","किफायती पेड योजनाएं"],"hinglish":["Generous free plan","Ek platform mein email + SMS","Achi deliverability","Affordable paid plans"]}',
  cons = '{"en":["AI features limited","Less powerful automation than Mailchimp","Template design basic"],"hi":["AI सुविधाएं सीमित","Mailchimp से कम शक्तिशाली स्वचालन","टेम्पलेट डिजाइन बेसिक"],"hinglish":["AI features limited","Mailchimp se less powerful automation","Template design basic"]}',
  use_cases = '{"en":["SMB email campaigns","Transactional emails","SMS notifications","Newsletter marketing"],"hi":["SMB ईमेल अभियान","ट्रांसेक्शनल ईमेल","SMS सूचनाएं","न्यूज़लेटर मार्केटिंग"],"hinglish":["SMB email campaigns","Transactional emails","SMS notifications","Newsletter marketing"]}',
  alternatives = ARRAY['mailchimp-ai','instantly-ai','beehiiv'],
  hindi_summary = 'Brevo एक किफायती ईमेल और SMS मार्केटिंग प्लेटफॉर्म है जो छोटे व्यवसायों के लिए उदार मुफ्त योजना और मार्केटिंग ऑटोमेशन प्रदान करता है।'
WHERE slug = 'brevo';

UPDATE public.ai_tools SET
  features = '{"en":["AI ad creative generation","Performance score prediction","Background remover","Ad copy generation","Multi-format export"],"hi":["AI विज्ञापन क्रिएटिव जनरेशन","प्रदर्शन स्कोर पूर्वानुमान","बैकग्राउंड रिमूवर","विज्ञापन कॉपी जनरेशन","मल्टी-फॉर्मेट एक्सपोर्ट"],"hinglish":["AI ad creative generation","Performance score prediction","Background remover","Ad copy generation","Multi-format export"]}',
  pros = '{"en":["AI predicts ad performance before launch","Fast creative generation","Multiple ad sizes at once","Good for e-commerce"],"hi":["AI लॉन्च से पहले विज्ञापन प्रदर्शन का अनुमान लगाता है","तेज क्रिएटिव जनरेशन","एक साथ कई विज्ञापन साइज","ई-कॉमर्स के लिए अच्छा"],"hinglish":["AI launch se pehle ad performance predict karta hai","Fast creative generation","Ek saath multiple ad sizes","E-commerce ke liye acha"]}',
  cons = '{"en":["Output quality inconsistent","Expensive for small budgets","Limited design customisation"],"hi":["आउटपुट गुणवत्ता असंगत","छोटे बजट के लिए महंगा","सीमित डिजाइन कस्टमाइजेशन"],"hinglish":["Output quality inconsistent","Chhote budget ke liye mahenga","Limited design customisation"]}',
  use_cases = '{"en":["Facebook and Google ad creatives","E-commerce product ads","Performance marketing","Social media ads"],"hi":["Facebook और Google विज्ञापन क्रिएटिव","ई-कॉमर्स प्रोडक्ट विज्ञापन","परफॉर्मेंस मार्केटिंग","सोशल मीडिया विज्ञापन"],"hinglish":["Facebook aur Google ad creatives","E-commerce product ads","Performance marketing","Social media ads"]}',
  alternatives = ARRAY['canva-ai-magic-studio','predis-ai','adobe-firefly'],
  hindi_summary = 'AdCreative.ai एक AI विज्ञापन क्रिएटिव जनरेटर है जो प्रदर्शन स्कोर के साथ उच्च-रूपांतरण वाले विज्ञापन डिज़ाइन बनाता है।'
WHERE slug = 'adcreativeai';

-- ============================================================
-- EDUCATION TOOLS
-- ============================================================

UPDATE public.ai_tools SET
  features = '{"en":["AI-powered personalised language learning","Duolingo Max with GPT-4","Roleplay conversations","Explain My Answer feature","Adaptive learning paths"],"hi":["AI-संचालित व्यक्तिगत भाषा सीखना","GPT-4 के साथ Duolingo Max","रोलप्ले बातचीत","Explain My Answer फीचर","अनुकूली सीखने के पथ"],"hinglish":["AI-powered personalised language learning","GPT-4 ke saath Duolingo Max","Roleplay conversations","Explain My Answer feature","Adaptive learning paths"]}',
  pros = '{"en":["Gamified and engaging","AI conversations feel natural","Free version available","Works for 40+ languages"],"hi":["गेमिफाइड और आकर्षक","AI बातचीत प्राकृतिक लगती है","मुफ्त संस्करण उपलब्ध","40+ भाषाओं के लिए काम करता है"],"hinglish":["Gamified aur engaging","AI conversations natural lagti hai","Free version available","40+ languages ke liye kaam karta hai"]}',
  cons = '{"en":["Max subscription expensive","Grammar explanations shallow","Not suitable for advanced learners"],"hi":["Max सब्सक्रिप्शन महंगा","व्याकरण स्पष्टीकरण उथले","उन्नत शिक्षार्थियों के लिए उपयुक्त नहीं"],"hinglish":["Max subscription mahenga","Grammar explanations shallow","Advanced learners ke liye suitable nahi"]}',
  use_cases = '{"en":["Daily language practice","Vocabulary building","Conversational practice","Travel language prep"],"hi":["दैनिक भाषा अभ्यास","शब्दावली निर्माण","संवादात्मक अभ्यास","यात्रा भाषा तैयारी"],"hinglish":["Daily language practice","Vocabulary building","Conversational practice","Travel language prep"]}',
  alternatives = ARRAY['khanmigo','speechify','babbel'],
  hindi_summary = 'Duolingo Max एक AI-संचालित भाषा सीखने का ऐप है जो GPT-4 से रोलप्ले बातचीत और व्यक्तिगत सीखने का अनुभव देता है।'
WHERE slug = 'duolingo-max';

UPDATE public.ai_tools SET
  features = '{"en":["AI homework help and tutoring","Step-by-step solutions","Expert Q&A","Textbook solutions","Practice problems"],"hi":["AI होमवर्क सहायता और ट्यूटरिंग","चरण-दर-चरण समाधान","विशेषज्ञ Q&A","पाठ्यपुस्तक समाधान","अभ्यास समस्याएं"],"hinglish":["AI homework help aur tutoring","Step-by-step solutions","Expert Q&A","Textbook solutions","Practice problems"]}',
  pros = '{"en":["Covers most subjects","Step-by-step explanations","Fast answers","Large solution database"],"hi":["अधिकांश विषयों को कवर करता है","चरण-दर-चरण स्पष्टीकरण","तेज उत्तर","बड़ा समाधान डेटाबेस"],"hinglish":["Adhiktar subjects cover karta hai","Step-by-step explanations","Fast answers","Bada solution database"]}',
  cons = '{"en":["Subscription required for AI features","Can enable cheating","Accuracy not always perfect"],"hi":["AI सुविधाओं के लिए सब्सक्रिप्शन आवश्यक","धोखाधड़ी सक्षम कर सकता है","सटीकता हमेशा सही नहीं"],"hinglish":["AI features ke liye subscription required","Cheating enable kar sakta hai","Accuracy hamesha perfect nahi"]}',
  use_cases = '{"en":["Homework help","Exam preparation","Concept clarification","Textbook problem solving"],"hi":["होमवर्क सहायता","परीक्षा तैयारी","अवधारणा स्पष्टीकरण","पाठ्यपुस्तक समस्या समाधान"],"hinglish":["Homework help","Exam preparation","Concept clarification","Textbook problem solving"]}',
  alternatives = ARRAY['khanmigo','socratic','wolfram-alpha'],
  hindi_summary = 'Chegg AI एक ऑनलाइन शिक्षा प्लेटफॉर्म है जो AI और विशेषज्ञों की मदद से होमवर्क के चरण-दर-चरण समाधान देता है।'
WHERE slug = 'chegg-ai';

UPDATE public.ai_tools SET
  features = '{"en":["AI homework and question answering","Peer community answers","Step-by-step explanations","Covers all school subjects","Available in multiple languages"],"hi":["AI होमवर्क और प्रश्न उत्तर","पीयर समुदाय उत्तर","चरण-दर-चरण स्पष्टीकरण","सभी स्कूल विषयों को कवर करता है","कई भाषाओं में उपलब्ध"],"hinglish":["AI homework aur question answering","Peer community answers","Step-by-step explanations","Sabhi school subjects cover karta hai","Multiple languages mein available"]}',
  pros = '{"en":["Free to use","Large community","Covers regional languages including Hindi","Fast answers from community and AI"],"hi":["उपयोग करने के लिए मुफ्त","बड़ा समुदाय","हिंदी सहित क्षेत्रीय भाषाओं को कवर करता है","समुदाय और AI से तेज उत्तर"],"hinglish":["Use karne ke liye free","Bada community","Hindi sahit regional languages cover karta hai","Community aur AI se fast answers"]}',
  cons = '{"en":["Answer quality varies","Can enable cheating","AI answers need verification"],"hi":["उत्तर की गुणवत्ता भिन्न होती है","धोखाधड़ी सक्षम कर सकता है","AI उत्तरों को सत्यापन की जरूरत"],"hinglish":["Answer quality vary karti hai","Cheating enable kar sakta hai","AI answers ko verification ki zarurat"]}',
  use_cases = '{"en":["School homework help","Exam prep","Concept doubt clearing","Study group discussions"],"hi":["स्कूल होमवर्क सहायता","परीक्षा तैयारी","अवधारणा संदेह निवारण","अध्ययन समूह चर्चा"],"hinglish":["School homework help","Exam prep","Concept doubt clearing","Study group discussions"]}',
  alternatives = ARRAY['chegg-ai','khanmigo','socratic'],
  hindi_summary = 'Brainly एक AI-सहायता प्राप्त पीयर लर्निंग प्लेटफॉर्म है जहाँ छात्र होमवर्क के सवाल पूछ सकते हैं और AI तथा समुदाय से उत्तर पा सकते हैं।'
WHERE slug = 'brainly';

UPDATE public.ai_tools SET
  features = '{"en":["AI-powered adaptive learning","Personalised study plans","Live tutoring","Gamified learning content","Test prep for competitive exams"],"hi":["AI-संचालित अनुकूली शिक्षा","व्यक्तिगत अध्ययन योजनाएं","लाइव ट्यूटरिंग","गेमिफाइड लर्निंग कंटेंट","प्रतियोगी परीक्षा की तैयारी"],"hinglish":["AI-powered adaptive learning","Personalised study plans","Live tutoring","Gamified learning content","Competitive exams ke liye test prep"]}',
  pros = '{"en":["Widely used in India","Covers K-12 curriculum","Adaptive to learning speed","Rich multimedia content"],"hi":["भारत में व्यापक रूप से उपयोग किया जाता है","K-12 पाठ्यक्रम को कवर करता है","सीखने की गति के अनुकूल","समृद्ध मल्टीमीडिया कंटेंट"],"hinglish":["India mein widely used","K-12 curriculum cover karta hai","Learning speed ke anukool","Rich multimedia content"]}',
  cons = '{"en":["Expensive subscription","Heavy app","Customer support issues reported","Too focused on test prep"],"hi":["महंगी सब्सक्रिप्शन","भारी ऐप","ग्राहक सहायता समस्याएं रिपोर्ट","टेस्ट प्रेप पर बहुत केंद्रित"],"hinglish":["Mahenga subscription","Heavy app","Customer support issues report hue","Test prep par zyada focused"]}',
  use_cases = '{"en":["K-12 learning in India","JEE/NEET preparation","Concept learning","School exam prep"],"hi":["भारत में K-12 सीखना","JEE/NEET की तैयारी","अवधारणा सीखना","स्कूल परीक्षा तैयारी"],"hinglish":["India mein K-12 learning","JEE/NEET preparation","Concept learning","School exam prep"]}',
  alternatives = ARRAY['khanmigo','chegg-ai','brainly'],
  hindi_summary = 'BYJU\'S AI एक भारतीय एडटेक प्लेटफॉर्म है जो K-12 छात्रों के लिए AI-संचालित अनुकूली शिक्षा और प्रतियोगी परीक्षा तैयारी प्रदान करता है।'
WHERE slug = 'byju-ai';

UPDATE public.ai_tools SET
  features = '{"en":["AI quiz and game creation","Interactive presentations","Real-time student engagement","Learning analytics","1000+ ready-made games"],"hi":["AI क्विज़ और गेम निर्माण","इंटरेक्टिव प्रेजेंटेशन","रियल-टाइम छात्र जुड़ाव","लर्निंग एनालिटिक्स","1000+ रेडीमेड गेम"],"hinglish":["AI quiz aur game creation","Interactive presentations","Real-time student engagement","Learning analytics","1000+ ready-made games"]}',
  pros = '{"en":["Makes learning fun","Easy to create quizzes","Teachers love it","Works for all ages"],"hi":["सीखने को मजेदार बनाता है","क्विज़ बनाना आसान","शिक्षक इसे पसंद करते हैं","सभी उम्र के लिए काम करता है"],"hinglish":["Learning fun banata hai","Quiz banana aasan","Teachers ise pasand karte hain","Sabhi umra ke liye kaam karta hai"]}',
  cons = '{"en":["Free version limited","AI features still basic","Distraction risk in class"],"hi":["मुफ्त संस्करण सीमित","AI सुविधाएं अभी भी बुनियादी","कक्षा में विचलन जोखिम"],"hinglish":["Free version limited","AI features abhi bhi basic","Class mein distraction risk"]}',
  use_cases = '{"en":["Classroom quizzes","Employee training","Student engagement","Knowledge assessment"],"hi":["कक्षा क्विज़","कर्मचारी प्रशिक्षण","छात्र जुड़ाव","ज्ञान मूल्यांकन"],"hinglish":["Classroom quizzes","Employee training","Student engagement","Knowledge assessment"]}',
  alternatives = ARRAY['mentimeter','quizlet-ai','kahoot-ai'],
  hindi_summary = 'Kahoot AI एक गेम-आधारित लर्निंग प्लेटफॉर्म है जो AI से क्विज़ और इंटरेक्टिव गेम बनाकर छात्रों की सीखने की प्रक्रिया को मजेदार बनाता है।'
WHERE slug = 'kahoot-ai';

UPDATE public.ai_tools SET
  features = '{"en":["AI flashcard generation","Spaced repetition learning","Practice tests","Q-Chat AI tutor","Study guides"],"hi":["AI फ्लैशकार्ड जनरेशन","स्पेस्ड रिपिटीशन लर्निंग","अभ्यास परीक्षण","Q-Chat AI ट्यूटर","अध्ययन गाइड"],"hinglish":["AI flashcard generation","Spaced repetition learning","Practice tests","Q-Chat AI tutor","Study guides"]}',
  pros = '{"en":["Best flashcard platform","AI generates cards from notes","Proven spaced repetition","Large shared content library"],"hi":["सर्वश्रेष्ठ फ्लैशकार्ड प्लेटफॉर्म","AI नोट्स से कार्ड बनाता है","सिद्ध स्पेस्ड रिपिटीशन","बड़ी साझा सामग्री लाइब्रेरी"],"hinglish":["Best flashcard platform","AI notes se cards generate karta hai","Proven spaced repetition","Badi shared content library"]}',
  cons = '{"en":["Some features behind paywall","Q-Chat accuracy varies","Can enable passive learning"],"hi":["कुछ सुविधाएं पेवॉल के पीछे","Q-Chat सटीकता भिन्न होती है","निष्क्रिय सीखना सक्षम कर सकता है"],"hinglish":["Kuch features paywall ke peecha","Q-Chat accuracy vary karti hai","Passive learning enable kar sakta hai"]}',
  use_cases = '{"en":["Exam revision","Vocabulary memorisation","Language learning","Medical/law exam prep"],"hi":["परीक्षा पुनरीक्षण","शब्दावली याद करना","भाषा सीखना","चिकित्सा/कानून परीक्षा तैयारी"],"hinglish":["Exam revision","Vocabulary memorisation","Language learning","Medical/law exam prep"]}',
  alternatives = ARRAY['kahoot-ai','chegg-ai','anki'],
  hindi_summary = 'Quizlet AI एक AI-संचालित स्टडी प्लेटफॉर्म है जो फ्लैशकार्ड, प्रैक्टिस टेस्ट और स्पेस्ड रिपिटीशन से परीक्षा की तैयारी आसान बनाता है।'
WHERE slug = 'quizlet-ai';

UPDATE public.ai_tools SET
  features = '{"en":["Online course creation platform","AI course builder","Student management","Certificate generation","Affiliate marketing support"],"hi":["ऑनलाइन कोर्स निर्माण प्लेटफॉर्म","AI कोर्स बिल्डर","छात्र प्रबंधन","सर्टिफिकेट जनरेशन","एफिलिएट मार्केटिंग सपोर्ट"],"hinglish":["Online course creation platform","AI course builder","Student management","Certificate generation","Affiliate marketing support"]}',
  pros = '{"en":["Trusted course platform","Good student management","Customisable school","Built-in marketing tools"],"hi":["विश्वसनीय कोर्स प्लेटफॉर्म","अच्छा छात्र प्रबंधन","कस्टमाइज़ेबल स्कूल","अंतर्निहित मार्केटिंग टूल"],"hinglish":["Trusted course platform","Ache student management","Customisable school","Built-in marketing tools"]}',
  cons = '{"en":["AI features limited","Revenue share on lower tiers","Less flexible than Kajabi"],"hi":["AI सुविधाएं सीमित","निचले स्तरों पर राजस्व हिस्सेदारी","Kajabi से कम लचीला"],"hinglish":["AI features limited","Lower tiers par revenue share","Kajabi se less flexible"]}',
  use_cases = '{"en":["Online course selling","Coaching programs","Membership sites","Corporate training"],"hi":["ऑनलाइन कोर्स बेचना","कोचिंग प्रोग्राम","मेंबरशिप साइट","कॉर्पोरेट प्रशिक्षण"],"hinglish":["Online course selling","Coaching programs","Membership sites","Corporate training"]}',
  alternatives = ARRAY['kajabi','thinkific','udemy'],
  hindi_summary = 'Teachable एक ऑनलाइन कोर्स प्लेटफॉर्म है जो AI बिल्डर और मार्केटिंग टूल के साथ creators को अपने कोर्स बेचने में मदद करता है।'
WHERE slug = 'teachable';

UPDATE public.ai_tools SET
  features = '{"en":["Interactive presentation tool","Live polls and quizzes","AI slide generator","Word cloud and Q&A","Audience response system"],"hi":["इंटरेक्टिव प्रेजेंटेशन टूल","लाइव पोल और क्विज़","AI स्लाइड जनरेटर","वर्ड क्लाउड और Q&A","ऑडियंस रिस्पॉन्स सिस्टम"],"hinglish":["Interactive presentation tool","Live polls aur quizzes","AI slide generator","Word cloud aur Q&A","Audience response system"]}',
  pros = '{"en":["Audience engagement is its superpower","Easy to use","Works with any presentation tool","Real-time responses"],"hi":["दर्शक जुड़ाव इसकी खासियत है","उपयोग में आसान","किसी भी प्रेजेंटेशन टूल के साथ काम करता है","रियल-टाइम प्रतिक्रियाएं"],"hinglish":["Audience engagement iska superpower hai","Use mein aasan","Kisi bhi presentation tool ke saath kaam karta hai","Real-time responses"]}',
  cons = '{"en":["Free plan limits responses","AI features still basic","Not a full presentation builder"],"hi":["मुफ्त योजना प्रतिक्रियाएं सीमित करती है","AI सुविधाएं अभी भी बुनियादी","पूर्ण प्रेजेंटेशन बिल्डर नहीं"],"hinglish":["Free plan responses limit karti hai","AI features abhi bhi basic","Full presentation builder nahi"]}',
  use_cases = '{"en":["Conference presentations","Classroom engagement","Corporate workshops","Live event polling"],"hi":["सम्मेलन प्रेजेंटेशन","कक्षा जुड़ाव","कॉर्पोरेट वर्कशॉप","लाइव इवेंट पोलिंग"],"hinglish":["Conference presentations","Classroom engagement","Corporate workshops","Live event polling"]}',
  alternatives = ARRAY['kahoot-ai','gamma','beautiful-ai'],
  hindi_summary = 'Mentimeter एक इंटरेक्टिव प्रेजेंटेशन टूल है जो लाइव पोल, क्विज़ और AI स्लाइड जनरेटर से दर्शकों को प्रस्तुति में शामिल करता है।'
WHERE slug = 'mentimeter';

UPDATE public.ai_tools SET
  features = '{"en":["AI research paper summarisation","Key points extraction","Citation generation","PDF upload support","Literature review assistance"],"hi":["AI शोध पत्र सारांश","मुख्य बिंदु निष्कर्षण","उद्धरण जनरेशन","PDF अपलोड सपोर्ट","साहित्य समीक्षा सहायता"],"hinglish":["AI research paper summarisation","Key points extraction","Citation generation","PDF upload support","Literature review assistance"]}',
  pros = '{"en":["Saves hours of reading","Accurate academic summaries","Citation ready","Great for researchers"],"hi":["पढ़ने के घंटे बचाता है","सटीक अकादमिक सारांश","उद्धरण तैयार","शोधकर्ताओं के लिए बढ़िया"],"hinglish":["Padhne ke ghante bachata hai","Accurate academic summaries","Citation ready","Researchers ke liye great"]}',
  cons = '{"en":["May miss nuanced arguments","Limited free usage","Not a substitute for deep reading"],"hi":["सूक्ष्म तर्क छूट सकते हैं","सीमित मुफ्त उपयोग","गहरी पढ़ाई का विकल्प नहीं"],"hinglish":["Subtle arguments miss ho sakte hain","Limited free usage","Deep reading ka substitute nahi"]}',
  use_cases = '{"en":["Literature reviews","Research paper screening","Academic study","Grant proposal background research"],"hi":["साहित्य समीक्षा","शोध पत्र स्क्रीनिंग","अकादमिक अध्ययन","अनुदान प्रस्ताव पृष्ठभूमि शोध"],"hinglish":["Literature reviews","Research paper screening","Academic study","Grant proposal background research"]}',
  alternatives = ARRAY['consensus','elicit','semantic-scholar'],
  hindi_summary = 'Scholarcy एक AI रिसर्च पेपर समराइजर है जो लंबे अकादमिक पेपर को मुख्य बिंदुओं और उद्धरणों के साथ तेजी से सारांशित करता है।'
WHERE slug = 'scholarcy';

-- ============================================================
-- DATA TOOLS
-- ============================================================

UPDATE public.ai_tools SET
  features = '{"en":["AI-powered spreadsheet with natural language queries","Formula generation","Data visualisation","Integrations with databases","No-code data analysis"],"hi":["प्राकृतिक भाषा प्रश्नों के साथ AI-संचालित स्प्रेडशीट","फॉर्मूला जनरेशन","डेटा विज़ुअलाइजेशन","डेटाबेस के साथ एकीकरण","नो-कोड डेटा विश्लेषण"],"hinglish":["Natural language queries ke saath AI-powered spreadsheet","Formula generation","Data visualisation","Databases ke saath integrations","No-code data analysis"]}',
  pros = '{"en":["Natural language to data queries","No SQL needed","Good visualisations","Team collaboration"],"hi":["डेटा प्रश्नों के लिए प्राकृतिक भाषा","SQL की जरूरत नहीं","अच्छे विज़ुअलाइजेशन","टीम सहयोग"],"hinglish":["Data queries ke liye natural language","SQL ki zarurat nahi","Ache visualisations","Team collaboration"]}',
  cons = '{"en":["Limited data size","Less powerful than dedicated BI tools","Newer product, still maturing"],"hi":["सीमित डेटा आकार","समर्पित BI टूल से कम शक्तिशाली","नया प्रोडक्ट, अभी विकसित हो रहा है"],"hinglish":["Limited data size","Dedicated BI tools se less powerful","Naya product, abhi mature ho raha hai"]}',
  use_cases = '{"en":["Business data analysis","Sales reporting","Marketing analytics","Non-technical team data work"],"hi":["व्यवसाय डेटा विश्लेषण","बिक्री रिपोर्टिंग","मार्केटिंग एनालिटिक्स","गैर-तकनीकी टीम डेटा कार्य"],"hinglish":["Business data analysis","Sales reporting","Marketing analytics","Non-technical team data work"]}',
  alternatives = ARRAY['julius-ai','polymer','coefficient'],
  hindi_summary = 'Rows AI एक AI-संचालित स्प्रेडशीट है जो प्राकृतिक भाषा में डेटा प्रश्न करने, फॉर्मूला बनाने और विज़ुअलाइजेशन बनाने की सुविधा देता है।'
WHERE slug = 'rows-ai';

UPDATE public.ai_tools SET
  features = '{"en":["No-code AI data analysis","Auto-generated insights","Interactive charts","CSV and Google Sheets import","AI-powered pivot tables"],"hi":["नो-कोड AI डेटा विश्लेषण","ऑटो-जेनरेटेड अंतर्दृष्टि","इंटरेक्टिव चार्ट","CSV और Google Sheets आयात","AI-संचालित पिवट टेबल"],"hinglish":["No-code AI data analysis","Auto-generated insights","Interactive charts","CSV aur Google Sheets import","AI-powered pivot tables"]}',
  pros = '{"en":["No coding needed","Instant insights","Beautiful visualisations","Accessible to non-analysts"],"hi":["कोडिंग की जरूरत नहीं","तत्काल अंतर्दृष्टि","सुंदर विज़ुअलाइजेशन","गैर-विश्लेषकों के लिए सुलभ"],"hinglish":["Coding ki zarurat nahi","Instant insights","Beautiful visualisations","Non-analysts ke liye accessible"]}',
  cons = '{"en":["Limited for advanced analysis","Data size restrictions","Less control than Power BI or Tableau"],"hi":["उन्नत विश्लेषण के लिए सीमित","डेटा आकार प्रतिबंध","Power BI या Tableau से कम नियंत्रण"],"hinglish":["Advanced analysis ke liye limited","Data size restrictions","Power BI ya Tableau se less control"]}',
  use_cases = '{"en":["Quick business analytics","Sales data analysis","Marketing performance review","SMB reporting"],"hi":["त्वरित व्यवसाय एनालिटिक्स","बिक्री डेटा विश्लेषण","मार्केटिंग प्रदर्शन समीक्षा","SMB रिपोर्टिंग"],"hinglish":["Quick business analytics","Sales data analysis","Marketing performance review","SMB reporting"]}',
  alternatives = ARRAY['julius-ai','rows-ai','tableau'],
  hindi_summary = 'Polymer एक नो-कोड AI डेटा एनालिसिस टूल है जो आपके CSV डेटा को इंटरेक्टिव चार्ट और स्वचालित अंतर्दृष्टि में बदलता है।'
WHERE slug = 'polymer';

UPDATE public.ai_tools SET
  features = '{"en":["No-code text classification","Sentiment analysis","Entity extraction","Custom model training","API access"],"hi":["नो-कोड टेक्स्ट वर्गीकरण","भावना विश्लेषण","एंटिटी निष्कर्षण","कस्टम मॉडल प्रशिक्षण","API एक्सेस"],"hinglish":["No-code text classification","Sentiment analysis","Entity extraction","Custom model training","API access"]}',
  pros = '{"en":["No ML expertise needed","Good accuracy","Easy to train custom models","REST API available"],"hi":["ML विशेषज्ञता की जरूरत नहीं","अच्छी सटीकता","कस्टम मॉडल प्रशिक्षित करना आसान","REST API उपलब्ध"],"hinglish":["ML expertise ki zarurat nahi","Achi accuracy","Custom models train karna aasan","REST API available"]}',
  cons = '{"en":["Limited free tier","Slower than custom ML","Not for complex NLP tasks"],"hi":["सीमित मुफ्त स्तर","कस्टम ML से धीमा","जटिल NLP कार्यों के लिए नहीं"],"hinglish":["Limited free tier","Custom ML se slow","Complex NLP tasks ke liye nahi"]}',
  use_cases = '{"en":["Customer feedback analysis","Support ticket classification","Social media monitoring","Survey analysis"],"hi":["ग्राहक फीडबैक विश्लेषण","सपोर्ट टिकट वर्गीकरण","सोशल मीडिया मॉनिटरिंग","सर्वेक्षण विश्लेषण"],"hinglish":["Customer feedback analysis","Support ticket classification","Social media monitoring","Survey analysis"]}',
  alternatives = ARRAY['julius-ai','rows-ai','hugging-face'],
  hindi_summary = 'MonkeyLearn एक नो-कोड AI टेक्स्ट विश्लेषण प्लेटफॉर्म है जो टेक्स्ट वर्गीकरण, भावना विश्लेषण और एंटिटी निष्कर्षण बिना कोडिंग के करता है।'
WHERE slug = 'monkeylearn';

UPDATE public.ai_tools SET
  features = '{"en":["Live Google Sheets sync with databases","AI formula generation","Two-way data sync","Scheduled refreshes","No-code data pipelines"],"hi":["डेटाबेस के साथ लाइव Google Sheets सिंक","AI फॉर्मूला जनरेशन","दो-तरफा डेटा सिंक","शेड्यूल्ड रिफ्रेश","नो-कोड डेटा पाइपलाइन"],"hinglish":["Databases ke saath live Google Sheets sync","AI formula generation","Two-way data sync","Scheduled refreshes","No-code data pipelines"]}',
  pros = '{"en":["Works inside Google Sheets","Live database connection","No SQL required for basic use","Saves hours of manual data work"],"hi":["Google Sheets के अंदर काम करता है","लाइव डेटाबेस कनेक्शन","बुनियादी उपयोग के लिए SQL आवश्यक नहीं","मैनुअल डेटा कार्य के घंटे बचाता है"],"hinglish":["Google Sheets ke andar kaam karta hai","Live database connection","Basic use ke liye SQL required nahi","Manual data work ke ghante bachata hai"]}',
  cons = '{"en":["Google Sheets only","Limited to connected data sources","Complex queries need SQL"],"hi":["केवल Google Sheets","जुड़े डेटा स्रोतों तक सीमित","जटिल प्रश्नों के लिए SQL चाहिए"],"hinglish":["Sirf Google Sheets","Connected data sources tak limited","Complex queries ke liye SQL chahiye"]}',
  use_cases = '{"en":["Live sales reporting","Database to Sheets sync","Marketing data dashboards","Inventory tracking"],"hi":["लाइव बिक्री रिपोर्टिंग","Sheets से डेटाबेस सिंक","मार्केटिंग डेटा डैशबोर्ड","इन्वेंटरी ट्रैकिंग"],"hinglish":["Live sales reporting","Database to Sheets sync","Marketing data dashboards","Inventory tracking"]}',
  alternatives = ARRAY['rows-ai','julius-ai','supermetrics'],
  hindi_summary = 'Coefficient एक Google Sheets ऐड-ऑन है जो डेटाबेस को लाइव सिंक करता है और AI फॉर्मूला जनरेशन से डेटा विश्लेषण को स्वचालित करता है।'
WHERE slug = 'coefficient';

-- ============================================================
-- MUSIC TOOLS
-- ============================================================

UPDATE public.ai_tools SET
  features = '{"en":["AI voice replacement in audio","Overdub personal voice cloning","Podcast editing with text","Background noise removal","Filler word removal"],"hi":["ऑडियो में AI वॉयस रिप्लेसमेंट","Overdub व्यक्तिगत वॉयस क्लोनिंग","टेक्स्ट के साथ पॉडकास्ट संपादन","बैकग्राउंड शोर हटाना","फिलर वर्ड हटाना"],"hinglish":["Audio mein AI voice replacement","Overdub personal voice cloning","Text ke saath podcast editing","Background noise removal","Filler word removal"]}',
  pros = '{"en":["Revolutionary text-based editing","Overdub voice is convincing","All-in-one podcast tool","Saves re-recording time"],"hi":["क्रांतिकारी टेक्स्ट-आधारित संपादन","Overdub आवाज़ विश्वसनीय है","ऑल-इन-वन पॉडकास्ट टूल","पुनः रिकॉर्डिंग समय बचाता है"],"hinglish":["Revolutionary text-based editing","Overdub voice convincing hai","All-in-one podcast tool","Re-recording time bachata hai"]}',
  cons = '{"en":["Expensive for solo creators","Voice cloning accuracy not perfect","Large file processing slow"],"hi":["एकल creators के लिए महंगा","वॉयस क्लोनिंग सटीकता सही नहीं","बड़ी फाइल प्रोसेसिंग धीमी"],"hinglish":["Solo creators ke liye mahenga","Voice cloning accuracy perfect nahi","Large file processing slow"]}',
  use_cases = '{"en":["Podcast production","Audio course editing","Voice correction in recordings","Video dubbing"],"hi":["पॉडकास्ट प्रोडक्शन","ऑडियो कोर्स संपादन","रिकॉर्डिंग में वॉयस सुधार","वीडियो डबिंग"],"hinglish":["Podcast production","Audio course editing","Recordings mein voice correction","Video dubbing"]}',
  alternatives = ARRAY['adobe-podcast','elevenlabs','murf-ai'],
  hindi_summary = 'Descript Overdub एक AI वॉयस क्लोनिंग फीचर है जो टेक्स्ट एडिटिंग के जरिए पॉडकास्ट और वीडियो में ऑडियो को बदलने की सुविधा देता है।'
WHERE slug = 'descript-overdub';
"""

with open(path, 'a', encoding='utf-8') as f:
    f.write(sql)

print("Final batch appended successfully.")
