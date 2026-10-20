import {
  services,
  destinations,
  serviceFeatures,
  siteInfo,
  officeHours,
  leadership,
  processSteps,
} from '../data/site';

// Everything the Quick Help assistant is allowed to say. Answers are always
// BLC's own wording — the model only picks which entry matches, it never writes
// text, so it can't invent fees, rules or promises.
//
// Answers and link labels are English strings that double as translation keys
// (see src/i18n), so the same entry answers in English, Hindi or Punjabi.
export interface KnowledgeEntry {
  id: string;
  // phrasings a student might use — English, Hinglish, Hindi and Punjabi.
  // Translated FAQ questions from the dictionaries are added at runtime.
  questions: string[];
  answer: string;
  // values substituted into {placeholders}; arrays are translated item by item and joined
  params?: Record<string, string | string[]>;
  link?: { to: string; label: string };
}

const pteVsIelts = services.find((s) => s.slug === 'pte')?.faqs.find((f) => f.q.includes('different'))?.a ?? '';

const general: KnowledgeEntry[] = [
  {
    id: 'services',
    questions: [
      'What services do you offer?', 'What do you do?', 'How can BLC help me?', 'What help do you provide?', 'Who are you?', 'What is BLC?',
      'aap kya kya services dete ho', 'kya help milegi', 'आप कौन सी सेवाएं देते हैं?', 'ਤੁਸੀਂ ਕਿਹੜੀਆਂ ਸੇਵਾਵਾਂ ਦਿੰਦੇ ਹੋ?',
    ],
    answer: 'We help with: {list}. Every service starts with a free initial consultation.',
    params: { list: services.map((s) => s.shortTitle) },
    link: { to: '/services', label: 'See all services' },
  },
  {
    id: 'destinations',
    questions: [
      'Which countries can I study in?', 'Which countries do you cover?', 'Where can I go to study abroad?', 'study abroad destinations',
      'kaun kaun se country me bhejte ho', 'kis desh me padhai kar sakte hain', 'videsh me padhai ke liye kaun se desh',
      'किन देशों में पढ़ाई कर सकते हैं?', 'ਕਿਹੜੇ ਦੇਸ਼ਾਂ ਵਿੱਚ ਪੜ੍ਹਾਈ ਕਰ ਸਕਦੇ ਹਾਂ?',
    ],
    answer: 'We currently guide students towards {list}.',
    params: { list: destinations.map((d) => d.name) },
    link: { to: '/study-abroad', label: 'Compare destinations' },
  },
  {
    id: 'ielts-vs-pte',
    questions: [
      "IELTS vs PTE — what's the difference?", 'Should I take IELTS or PTE?', 'Which is easier, IELTS or PTE?', 'ielts or pte which is better',
      'ielts ya pte kaunsa better hai', 'pte aur ielts me kya fark hai', 'IELTS या PTE कौन सा बेहतर है?', 'IELTS ਜਾਂ PTE ਕਿਹੜਾ ਵਧੀਆ ਹੈ?',
    ],
    answer: pteVsIelts,
    link: { to: '/exam-strategies', label: 'Exam strategies' },
  },
  {
    id: 'consultation',
    questions: [
      "What's included in a consultation?", 'Is the first consultation free?', 'What do I get if I sign up?', 'free counselling',
      'consultation free hai kya', 'counselling ka kya milega', 'क्या पहली काउंसलिंग फ्री है?', 'ਕੀ ਪਹਿਲੀ ਸਲਾਹ ਮੁਫ਼ਤ ਹੈ?',
    ],
    answer: "Your first consultation is free. BLC's support includes: {list}.",
    params: { list: serviceFeatures.map((f) => f.title) },
    link: { to: '/contact', label: 'Book a free consultation' },
  },
  {
    id: 'location-hours',
    questions: [
      'Where are you located?', 'What are your office hours?', 'When are you open?', 'office address', 'Are you open on Sunday?',
      'office kahan hai', 'aapka office kidhar hai', 'kitne baje khulta hai', 'sunday ko khula hai kya', 'timing kya hai',
      'ऑफिस कहाँ है?', 'ऑफिस कब खुलता है?', 'ਦਫ਼ਤਰ ਕਿੱਥੇ ਹੈ?', 'ਦਫ਼ਤਰ ਕਦੋਂ ਖੁੱਲ੍ਹਦਾ ਹੈ?',
    ],
    answer: '{address}. Hours — {hours}.',
    params: { address: siteInfo.addressLine, hours: officeHours.map((h) => `${h.day}: ${h.hours}`) },
    link: { to: '/contact', label: 'Contact & map' },
  },
  {
    id: 'contact',
    questions: [
      'How can I contact you?', 'What is your phone number?', 'What is your email?', 'Can I talk to someone?', 'call me',
      'number do', 'phone number kya hai', 'baat karni hai', 'contact kaise karein', 'फ़ोन नंबर क्या है?', 'संपर्क कैसे करें?',
      'ਫ਼ੋਨ ਨੰਬਰ ਕੀ ਹੈ?', 'ਸੰਪਰਕ ਕਿਵੇਂ ਕਰੀਏ?',
    ],
    answer: 'Call or WhatsApp {phone}, or email {email}. You can also request a call back from any page.',
    params: { phone: siteInfo.phone, email: siteInfo.email },
    link: { to: '/contact', label: 'Contact page' },
  },
  {
    id: 'directors',
    questions: [
      'Who runs BLC?', 'Who are the directors?', 'Who is the owner?', 'owner kaun hai', 'malik kaun hai',
      'मालिक कौन है?', 'ਮਾਲਕ ਕੌਣ ਹੈ?',
    ],
    answer: 'BLC is led by its directors {list}.',
    params: { list: leadership.map((l) => `${l.name} (${l.phone})`) },
    link: { to: '/about', label: 'About BLC' },
  },
  {
    id: 'process',
    questions: [
      'What is the process?', 'What are the steps to study abroad?', 'How does it work?', 'Where do I start?',
      'process kya hai', 'kaise shuru karein', 'videsh jane ka process', 'प्रक्रिया क्या है?', 'ਪ੍ਰਕਿਰਿਆ ਕੀ ਹੈ?',
    ],
    answer: 'Our process: {steps}.',
    params: { steps: processSteps.map((s) => s.title) },
    link: { to: '/study-abroad', label: 'Study abroad guide' },
  },
  {
    id: 'success',
    questions: [
      'Do you have success stories?', 'Have your students got visas?', 'Show me results', 'reviews', 'visa approvals',
      'kitne logon ka visa aaya', 'result dikhao', 'सफल छात्रों के बारे में बताइए', 'ਨਤੀਜੇ ਦਿਖਾਓ',
    ],
    answer: 'Yes — BLC students have shared visa approvals and PTE results on our YouTube channel.',
    link: { to: '/success-stories', label: 'View success stories' },
  },
  {
    id: 'fees',
    questions: [
      'What are your fees?', 'How much do you charge?', 'What is the cost?', 'How much is the fee for IELTS coaching?',
      'How much is the fee for PTE coaching?', 'course fees', 'fees kitni hai', 'kitne paise lagte hain', 'ielts ki fees kitni hai',
      'pte coaching fees', 'charges kya hai', 'फीस कितनी है?', 'कितना खर्च आएगा?', 'ਫੀਸ ਕਿੰਨੀ ਹੈ?', 'ਕਿੰਨਾ ਖਰਚਾ ਆਵੇਗਾ?',
    ],
    answer:
      "Fees depend on the service and course you choose, so we don't list them online. Your first consultation is free — ask us for current fees on WhatsApp or during the consultation.",
    link: { to: '/contact', label: 'Ask about fees' },
  },
  {
    id: 'greeting',
    questions: ['hello', 'hi', 'hey there', 'good morning', 'namaste', 'sat sri akal', 'नमस्ते', 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ'],
    answer: 'Hi! Ask me anything about study visas, destinations, IELTS/PTE or our office — or pick a question below.',
  },
  {
    id: 'thanks',
    questions: ['thank you', 'thanks', 'ok thanks', 'dhanyavaad', 'shukriya', 'धन्यवाद', 'ਧੰਨਵਾਦ'],
    answer: "You're welcome! If you'd like personal advice, our team is a WhatsApp message away.",
  },
  {
    id: 'scholarship',
    questions: [
      'Do you help with scholarships?', 'scholarship available?', 'Can I get a scholarship?', 'scholarship milegi kya',
      'क्या स्कॉलरशिप मिल सकती है?', 'ਕੀ ਸਕਾਲਰਸ਼ਿਪ ਮਿਲ ਸਕਦੀ ਹੈ?',
    ],
    answer:
      "We offer scholarship guidance as part of our consultation. Availability depends on the institution and your profile, so we'll go through options that fit you in a free consultation.",
    link: { to: '/contact', label: 'Book a free consultation' },
  },
  {
    id: 'eligibility',
    questions: [
      'Am I eligible to study abroad?', 'Can I study abroad with low marks?', 'I have a study gap, can I apply?', 'eligibility',
      'kam marks hai kya main ja sakta hu', 'gap hai kya visa lagega', '12th fail', 'क्या मैं विदेश पढ़ने जा सकता हूँ?',
      'ਕੀ ਮੈਂ ਵਿਦੇਸ਼ ਪੜ੍ਹਨ ਜਾ ਸਕਦਾ ਹਾਂ?',
    ],
    answer:
      'Eligibility depends on your academic record, English score and chosen destination. Try the quick check on our homepage for a first idea — a free consultation will confirm what applies to you.',
    link: { to: '/', label: 'Quick eligibility check' },
  },
  {
    id: 'pr',
    questions: [
      'Can I get PR?', 'permanent residency abroad', 'How can I settle abroad permanently?', 'immigration to Canada',
      'pr kaise milega', 'wahan settle kaise ho', 'पीआर कैसे मिलेगा?', 'ਪੀਆਰ ਕਿਵੇਂ ਮਿਲੇਗੀ?',
    ],
    answer: services.find((s) => s.slug === 'immigration')?.intro ?? '',
    link: { to: '/services/immigration', label: 'Immigration consultancy' },
  },
  {
    id: 'guarantee',
    questions: [
      'Will my visa be approved?', 'Do you guarantee a visa?', '100% visa guarantee', 'visa pakka lagega kya',
      'क्या वीज़ा की गारंटी है?', 'ਕੀ ਵੀਜ਼ੇ ਦੀ ਗਾਰੰਟੀ ਹੈ?',
    ],
    answer: services.find((s) => s.slug === 'student-visa')?.faqs.find((f) => f.q.includes('guarantee'))?.a ?? '',
    link: { to: '/services/student-visa', label: 'Student Visa Guidance' },
  },
];

// Extra phrasings for the per-service and per-country entries (Hinglish / Hindi / Punjabi).
const serviceExtra: Record<string, string[]> = {
  'student-visa': ['student visa kaise lagega', 'study visa', 'visa lagwana hai', 'स्टूडेंट वीज़ा', 'ਸਟੂਡੈਂਟ ਵੀਜ਼ਾ'],
  immigration: ['immigration kaise kare', 'videsh me basna hai', 'इमिग्रेशन', 'ਇਮੀਗ੍ਰੇਸ਼ਨ'],
  ielts: ['ielts coaching', 'ielts ki class', 'ielts tayari', 'आईईएलटीएस कोचिंग', 'ਆਈਲਟਸ ਕੋਚਿੰਗ'],
  pte: ['pte coaching', 'pte ki class', 'pte tayari', 'पीटीई कोचिंग', 'ਪੀਟੀਈ ਕੋਚਿੰਗ'],
  'spoken-english': ['english bolna seekhna hai', 'spoken english class', 'english speaking course', 'अंग्रेज़ी बोलना सीखना है', 'ਅੰਗਰੇਜ਼ੀ ਬੋਲਣਾ ਸਿੱਖਣਾ ਹੈ'],
};
const destinationExtra: Record<string, string[]> = {
  australia: ['australia jana hai', 'australia study visa', 'ऑस्ट्रेलिया जाना है', 'ਆਸਟ੍ਰੇਲੀਆ ਜਾਣਾ ਹੈ'],
  uk: ['uk jana hai', 'england me padhai', 'london study', 'यूके जाना है', 'ਯੂਕੇ ਜਾਣਾ ਹੈ'],
  'new-zealand': ['new zealand jana hai', 'nz study visa', 'न्यूज़ीलैंड जाना है', 'ਨਿਊਜ਼ੀਲੈਂਡ ਜਾਣਾ ਹੈ'],
  canada: ['canada jana hai', 'canada study visa', 'कनाडा जाना है', 'ਕੈਨੇਡਾ ਜਾਣਾ ਹੈ'],
};

// Extra phrasings for specific FAQ entries, keyed by entry id.
const faqExtra: Record<string, string[]> = {
  'service-spoken-english-faq-0': ['Is spoken English OK for beginners?', 'beginner english class', 'mujhe bilkul english nahi aati'],
  'service-ielts-faq-1': ['How many months for IELTS?', 'ielts tayari me kitna time lagta hai'],
  'service-student-visa-faq-2': ['visa kitne din me aata hai', 'visa processing time'],
};

const fromServices: KnowledgeEntry[] = services.flatMap((s) => [
  {
    id: `service-${s.slug}`,
    questions: [`Tell me about ${s.shortTitle}`, s.title, `Do you offer ${s.shortTitle}?`, `${s.shortTitle} coaching`, ...(serviceExtra[s.slug] ?? [])],
    answer: s.intro,
    link: { to: `/services/${s.slug}`, label: s.title },
  },
  ...s.faqs.map((f, i) => ({
    id: `service-${s.slug}-faq-${i}`,
    questions: [f.q, ...(faqExtra[`service-${s.slug}-faq-${i}`] ?? [])],
    answer: f.a,
    link: { to: `/services/${s.slug}`, label: s.title },
  })),
]);

const fromDestinations: KnowledgeEntry[] = destinations.flatMap((d) => [
  {
    id: `destination-${d.slug}`,
    questions: [`Study in ${d.name}`, `Tell me about ${d.name}`, `Can you help me go to ${d.name}?`, `${d.name} student visa`, ...(destinationExtra[d.slug] ?? [])],
    answer: d.intro,
    link: { to: `/study-abroad/${d.slug}`, label: 'Studying in {country}' },
    params: { country: d.name },
  },
  ...d.faqs.map((f, i) => ({
    id: `destination-${d.slug}-faq-${i}`,
    questions: [f.q],
    answer: f.a,
    link: { to: `/study-abroad/${d.slug}`, label: 'Studying in {country}' },
    params: { country: d.name },
  })),
]);

export const knowledge: KnowledgeEntry[] = [...general, ...fromServices, ...fromDestinations];

// The chips shown before the student types anything.
export const starterIds = ['services', 'destinations', 'ielts-vs-pte', 'consultation', 'location-hours'];

// Chat interface copy, kept here so the i18n extractor picks it up.
export const chatCopy = {
  greeting:
    "Hi! I'm BLC's quick-help guide. Type a question in your own words — in English, Hindi or Punjabi — or pick one below. For anything personal, chat with a real person on WhatsApp.",
  suggest: 'I want to be sure I answer the right thing — did you mean one of these?',
  unsure:
    "I'm not sure about that one, and I'd rather not guess. Our team can answer it properly on WhatsApp, or in a free consultation.",
  unsureLink: 'Book a free consultation',
};

// Strings the extractor should include in the translation dictionaries.
export function translatableStrings(): string[] {
  const out: string[] = Object.values(chatCopy);
  for (const e of knowledge) {
    out.push(e.answer);
    if (e.link) out.push(e.link.label);
    if (starterIds.includes(e.id)) out.push(e.questions[0]);
    for (const v of Object.values(e.params ?? {})) if (Array.isArray(v)) out.push(...v);
  }
  // hours lines are rendered as "day: hours" — translate the parts
  officeHours.forEach((h) => out.push(h.day, h.hours));
  return out;
}
