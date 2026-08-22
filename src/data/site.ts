export const siteInfo = {
  name: 'Blossom Learning Centre',
  shortName: 'BLC',
  tagline: 'Your Journey Abroad Starts Here',
  phone: '+91 94667 88470',
  phoneHref: 'tel:+919466788470',
  email: 'ankush@blossomlearning.co',
  emailHref: 'mailto:ankush@blossomlearning.co',
  emailSecondary: 'admin@blossomlearning.com',
  emailSecondaryHref: 'mailto:admin@blossomlearning.com',
  location: 'Ladwa, Kurukshetra, Haryana, India',
  addressLine: 'Blossom Learning Centre, Ladwa, Kurukshetra, Haryana, India',
};

// Verified active accounts found independently (blcimmigration.com's own social
// links were unconfigured placeholders, so these were sourced directly).
export const socialLinks = {
  instagram: 'https://www.instagram.com/blossom_learning_centre/',
  // Confirmed video from BLC's channel — used since the exact channel handle
  // could not be independently verified.
  youtube: 'https://www.youtube.com/watch?v=iz0ZlrrDy_A',
  // TODO: replace with BLC's actual Facebook page URL.
  facebook: 'https://www.facebook.com/blossomlearningcentre/',
};

// Public Instagram posts to feature in the "Follow Us" gallery, via
// Instagram's official oEmbed embed — no account login required since these
// are public post URLs. Update this list whenever there's a new post to
// feature (grab the post's permalink, e.g. https://www.instagram.com/p/POST_ID/).
export const instagramPosts: string[] = [];

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Study Abroad', to: '/study-abroad' },
  { label: 'IELTS & PTE', to: '/services/ielts' },
  { label: 'Success Stories', to: '/success-stories' },
  { label: 'Contact', to: '/contact' },
];

export type ServiceSlug =
  | 'student-visa'
  | 'immigration'
  | 'ielts'
  | 'pte'
  | 'spoken-english';

export interface Service {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  summary: string;
  icon: string;
  heroText: string;
  intro: string;
  whoFor: string[];
  howWeHelp: string[];
  process: string[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'student-visa',
    title: 'Student Visa Guidance',
    shortTitle: 'Student Visa',
    summary: 'Guidance through documentation and application steps for your student visa.',
    icon: 'passport',
    heroText: 'Clear, organised support to help you prepare a complete student visa application.',
    intro:
      'Applying for a student visa involves multiple documents, deadlines and requirements that vary by country. BLC helps you understand the process, organise your paperwork and prepare a complete application to submit with confidence.',
    whoFor: [
      'Students who have received or are working towards a confirmed offer letter',
      'Applicants unsure which documents are required for their destination country',
      'Students who want a structured checklist and timeline for their application',
    ],
    howWeHelp: [
      'Explaining the general student visa process for your chosen destination',
      'Helping you organise financial, academic and identity documentation',
      'Reviewing your application for completeness before submission',
      'Answering questions as immigration requirements are publicly updated',
    ],
    process: [
      'Initial consultation to understand your study plans',
      'Document checklist tailored to your destination',
      'Document collection and review support',
      'Application form guidance and submission support',
      'Preparation tips for any required interview',
    ],
    faqs: [
      {
        q: 'What documents are normally required for a student visa?',
        a: 'Requirements vary by country and change over time, but commonly include a confirmed offer letter, proof of funds, academic records, identity documents and English test results. We help you confirm the current requirements for your specific destination.',
      },
      {
        q: 'Can BLC guarantee my visa will be approved?',
        a: 'No. Visa decisions are made solely by the relevant government authority. BLC provides guidance and documentation support only, and does not guarantee any visa outcome.',
      },
      {
        q: 'How long does the process usually take?',
        a: 'Processing times are set by immigration authorities and can change. We recommend starting preparation as early as possible and will keep you informed based on current published guidance.',
      },
    ],
  },
  {
    slug: 'immigration',
    title: 'Immigration Consultancy',
    shortTitle: 'Immigration Consultancy',
    summary: 'Considered guidance on overseas immigration pathways and next steps.',
    icon: 'globe',
    heroText: 'Considered, honest guidance to help you understand your overseas options.',
    intro:
      'Immigration pathways can be complex and change frequently. BLC offers guidance to help you understand publicly available options relevant to your circumstances, so you can make informed decisions about your next steps.',
    whoFor: [
      'Individuals exploring overseas study or migration options',
      'Families wanting a clearer understanding of the general process',
      'Students planning ahead beyond their study period',
    ],
    howWeHelp: [
      'Explaining general immigration pathways relevant to your goals',
      'Helping you understand documentation commonly requested by authorities',
      'Pointing you towards official, up-to-date government resources',
      'Ongoing support as your plans and circumstances develop',
    ],
    process: [
      'Initial consultation about your goals',
      'Discussion of publicly available pathways',
      'Documentation guidance',
      'Ongoing support and check-ins',
    ],
    faqs: [
      {
        q: 'Does BLC offer legal immigration advice?',
        a: 'BLC provides general guidance and support. For matters requiring registered legal or migration agent advice, we encourage you to consult an appropriately licensed professional in the relevant country.',
      },
      {
        q: 'Can you guarantee permanent residency or a work outcome?',
        a: 'No. Immigration outcomes are determined by government authorities based on their own criteria, which change over time. We do not make guarantees about any outcome.',
      },
      {
        q: 'How does BLC support students?',
        a: 'We offer structured, honest guidance based on publicly available information, helping you prepare thoroughly and understand what to expect at each stage.',
      },
    ],
  },
  {
    slug: 'ielts',
    title: 'IELTS Preparation',
    shortTitle: 'IELTS',
    summary: 'Structured sessions covering Listening, Reading, Writing and Speaking.',
    icon: 'book',
    heroText: 'Structured IELTS preparation from foundation to advanced level.',
    intro:
      'Our IELTS preparation covers all four modules — Listening, Reading, Writing and Speaking — through structured, regular sessions designed for students at basic to advanced levels.',
    whoFor: [
      'Students preparing for IELTS Academic or General Training',
      'Beginners building foundational English skills',
      'Advanced students refining exam technique and band score',
    ],
    howWeHelp: [
      'Regular practice across all four IELTS modules',
      'Individual feedback on writing and speaking tasks',
      'Mock tests to build familiarity with exam format and timing',
      'Guidance on common mistakes and how to address them',
    ],
    process: [
      'Assessment of your current English level',
      'Personalised study plan across all four modules',
      'Regular practice sessions and mock tests',
      'Ongoing feedback and progress review',
    ],
    faqs: [
      {
        q: 'What score do I need for my chosen destination?',
        a: 'Required band scores vary by institution, course and country, and can change. We help you check current requirements for your specific application.',
      },
      {
        q: 'How long does IELTS preparation usually take?',
        a: 'This depends on your starting level and target score. We assess your level in the first session and recommend a realistic timeline.',
      },
      {
        q: 'Do you prepare students for Academic and General Training?',
        a: 'Yes, our sessions are tailored to the module relevant to your study or migration goal.',
      },
    ],
  },
  {
    slug: 'pte',
    title: 'PTE Preparation',
    shortTitle: 'PTE',
    summary: 'Daily practice across Reading, Listening, Speaking and Writing.',
    icon: 'headset',
    heroText: 'Focused PTE Academic preparation with daily module practice.',
    intro:
      'PTE preparation at BLC covers all four modules every day — Reading, Listening, Speaking and Writing — helping you build consistency, confidence and familiarity with the computer-based test format.',
    whoFor: [
      'Students who prefer a computer-based English test',
      'Applicants needing a fast, reliable turnaround on results',
      'Students wanting focused, daily structured practice',
    ],
    howWeHelp: [
      'Daily practice across all four PTE modules',
      'Familiarisation with the computer-based test format',
      'Individual feedback on speaking and writing responses',
      'Mock tests under timed exam conditions',
    ],
    process: [
      'Initial level assessment',
      'Daily module-based practice schedule',
      'Mock tests under exam conditions',
      'Feedback and targeted improvement',
    ],
    faqs: [
      {
        q: 'How is PTE different from IELTS?',
        a: 'PTE is a fully computer-based test, while IELTS offers computer-based or paper-based options with a face-to-face speaking component. Your choice may depend on your institution\'s requirements and personal preference.',
      },
      {
        q: 'What score do I need?',
        a: 'Required scores vary by institution and country, and can change. We help you confirm current requirements for your application.',
      },
      {
        q: 'How often are sessions held?',
        a: 'PTE practice covering all four modules is offered daily to help you build consistency ahead of your test date.',
      },
    ],
  },
  {
    slug: 'spoken-english',
    title: 'Spoken English Training',
    shortTitle: 'Spoken English',
    summary: 'Building grammar, confidence and everyday communication skills.',
    icon: 'chat',
    heroText: 'Practical spoken English training to build everyday confidence.',
    intro:
      'Spoken English at BLC goes beyond grammar. Sessions cover grammar through practical use, creative and constructive ideas, regular debates, creative writing, vocabulary development and interview practice — helping students overcome stage fear and confidently frame their own sentences, for both academic and everyday settings abroad.',
    whoFor: [
      'Students wanting to build general English confidence',
      'Beginners strengthening grammar and vocabulary basics',
      'Anyone who feels held back by stage fear or hesitation speaking English',
    ],
    howWeHelp: [
      'Grammar taught through practical, conversational use',
      'Confidence built through regular debates and discussion',
      'Vocabulary development and creative writing practice',
      'Interview sessions to prepare for real academic and social settings',
    ],
    process: [
      'Initial conversation to assess your current level',
      'Grammar and vocabulary foundation building',
      'Regular guided speaking practice',
      'Ongoing confidence-building feedback',
    ],
    faqs: [
      {
        q: 'Is this suitable for complete beginners?',
        a: 'Yes, sessions are structured to build from basic grammar and vocabulary through to confident everyday communication.',
      },
      {
        q: 'Will this help with IELTS or PTE speaking?',
        a: 'Building general spoken confidence supports exam preparation, though we recommend our dedicated IELTS or PTE sessions for exam-specific technique.',
      },
      {
        q: 'How does BLC support students?',
        a: 'Through a supportive, structured environment with regular practice and constructive, individual feedback.',
      },
    ],
  },
];

export type DestinationSlug = 'australia' | 'uk' | 'new-zealand' | 'canada';

export interface Destination {
  slug: DestinationSlug;
  name: string;
  summary: string;
  image: string;
  intro: string;
  whyConsider: string[];
  studyOptions: string[];
  support: string[];
  applicationProcess: string[];
  faqs: { q: string; a: string }[];
}

export const destinations: Destination[] = [
  {
    slug: 'australia',
    name: 'Australia',
    summary: 'A leading study destination known for its universities and student lifestyle.',
    image:
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80',
    intro:
      'Australia is home to a wide range of universities and colleges offering courses across many fields. BLC helps students understand the general study pathway to Australia and prepare a well-organised application.',
    whyConsider: [
      'A broad range of internationally recognised institutions',
      'Courses across diverse fields of study',
      'An established and diverse international student community',
      'Multiple intake periods across the academic year',
    ],
    studyOptions: [
      'Undergraduate degree programmes',
      'Postgraduate degree programmes',
      'Vocational and diploma-level courses',
      'English-language pathway programmes',
    ],
    support: [
      'Guidance on choosing an institution and course',
      'Support with application documentation',
      'General information on the student visa process',
      'Pre-departure guidance and preparation',
    ],
    applicationProcess: [
      'Consultation to understand your goals and eligibility',
      'Shortlisting institutions and courses',
      'Application submission support',
      'Offer letter review and next steps',
      'Visa documentation guidance',
    ],
    faqs: [
      {
        q: 'What English test do I need for Australia?',
        a: 'Most institutions accept IELTS or PTE, though requirements vary by course and institution. We help you confirm current requirements for your chosen course.',
      },
      {
        q: 'Can BLC guarantee my visa approval?',
        a: 'No. Visa decisions are made solely by Australian immigration authorities. We provide guidance and documentation support only.',
      },
      {
        q: 'How do I choose the right institution?',
        a: 'We discuss your academic background, budget and goals to help you shortlist suitable options, and encourage you to verify details directly with institutions.',
      },
    ],
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    summary: 'Home to historic universities and a wide variety of internationally respected courses.',
    image:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    intro:
      'The United Kingdom offers a long-established higher education system with a wide choice of universities and courses. BLC supports students through each stage of preparing a UK study application.',
    whyConsider: [
      'A long-established and internationally respected education system',
      'Shorter-duration postgraduate courses compared to some countries',
      'A wide variety of universities across cities and regions',
      'A large, established international student community',
    ],
    studyOptions: [
      'Undergraduate degree programmes',
      'Postgraduate degree programmes',
      'Foundation and pathway programmes',
      'English-language preparation courses',
    ],
    support: [
      'Guidance on institution and course selection',
      'Application and documentation support',
      'General information on the student visa process',
      'Pre-departure preparation guidance',
    ],
    applicationProcess: [
      'Initial consultation about your study goals',
      'Course and university shortlisting',
      'Application submission support',
      'Offer letter and CAS guidance',
      'Visa documentation support',
    ],
    faqs: [
      {
        q: 'What English test is accepted for UK study visas?',
        a: 'Requirements depend on the institution and course; commonly accepted tests include IELTS and PTE. We help confirm current requirements for your application.',
      },
      {
        q: 'How far in advance should I apply?',
        a: 'We recommend starting preparation well ahead of your intended intake, as processing and document collection can take time.',
      },
      {
        q: 'Does BLC guarantee visa approval?',
        a: 'No. Visa decisions rest solely with UK immigration authorities. We provide guidance and support only.',
      },
    ],
  },
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    summary: 'A welcoming study environment known for its quality of education and lifestyle.',
    image:
      'https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=80',
    intro:
      'New Zealand offers a range of quality institutions in a welcoming environment. BLC helps students understand the general study pathway and prepare a complete, organised application.',
    whyConsider: [
      'A range of recognised institutions and course options',
      'A welcoming, close-knit international student community',
      'Courses across academic and vocational fields',
      'A generally safe and student-friendly environment',
    ],
    studyOptions: [
      'Undergraduate degree programmes',
      'Postgraduate degree programmes',
      'Diploma and vocational courses',
      'English-language pathway programmes',
    ],
    support: [
      'Institution and course selection guidance',
      'Application documentation support',
      'General information on the student visa process',
      'Pre-departure guidance',
    ],
    applicationProcess: [
      'Consultation on your study goals',
      'Course and institution shortlisting',
      'Application submission support',
      'Offer letter review',
      'Visa documentation guidance',
    ],
    faqs: [
      {
        q: 'What English test does New Zealand accept?',
        a: 'Commonly accepted tests include IELTS and PTE, though requirements vary by institution and course. We help confirm current requirements.',
      },
      {
        q: 'Can BLC guarantee a visa outcome?',
        a: 'No. Visa decisions are made solely by New Zealand immigration authorities.',
      },
      {
        q: 'How does BLC support my application?',
        a: 'We guide you through documentation, course selection and general preparation based on current, publicly available information.',
      },
    ],
  },
  {
    slug: 'canada',
    name: 'Canada',
    summary: 'A popular destination offering diverse programmes and a welcoming student community.',
    image:
      'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80',
    intro:
      'Canada is a popular study destination with a wide range of colleges and universities. BLC supports students through the general study pathway, from course selection to application preparation.',
    whyConsider: [
      'A wide choice of colleges and universities across provinces',
      'Diverse programme options across academic levels',
      'An established and growing international student community',
      'Multiple intake periods throughout the year',
    ],
    studyOptions: [
      'Undergraduate degree and diploma programmes',
      'Postgraduate degree and diploma programmes',
      'College certificate programmes',
      'English-language pathway programmes',
    ],
    support: [
      'Guidance on institution and programme selection',
      'Application documentation support',
      'General information on the study permit process',
      'Pre-departure preparation guidance',
    ],
    applicationProcess: [
      'Initial consultation on your goals and eligibility',
      'Institution and programme shortlisting',
      'Application submission support',
      'Letter of acceptance review',
      'Study permit documentation guidance',
    ],
    faqs: [
      {
        q: 'What English test is accepted for Canadian study permits?',
        a: 'Commonly accepted tests include IELTS and PTE, though requirements vary by institution and programme. We help confirm current requirements.',
      },
      {
        q: 'Does BLC guarantee study permit approval?',
        a: 'No. Study permit decisions are made solely by Canadian immigration authorities.',
      },
      {
        q: 'How do I decide between provinces or institutions?',
        a: 'We discuss your academic background, budget and goals to help you shortlist suitable options based on publicly available information.',
      },
    ],
  },
];

export const processSteps = [
  { number: '01', title: 'Initial Consultation', description: 'We start by understanding your goals, background and preferences.' },
  { number: '02', title: 'Profile Assessment', description: 'A review of your academic and personal profile to identify suitable options.' },
  { number: '03', title: 'Course & Destination Selection', description: 'Guidance to help you shortlist courses and destinations that fit your goals.' },
  { number: '04', title: 'Documentation', description: 'Support organising the documents required for your application.' },
  { number: '05', title: 'Application Support', description: 'Assistance preparing and submitting a complete application.' },
  { number: '06', title: 'Outcome & Next Steps', description: 'Guidance on next steps once a decision is received.' },
];

export const whyChooseBLC = [
  {
    icon: 'compass',
    title: 'Personalised Guidance',
    description: 'One-to-one consultations tailored to your academic background, goals and circumstances.',
  },
  {
    icon: 'clipboard',
    title: 'Complete Application Support',
    description: 'Structured help with documentation and applications, from first consultation to submission.',
  },
  {
    icon: 'book-open',
    title: 'English Language Preparation',
    description: 'Structured IELTS, PTE and spoken English sessions to help you meet language requirements with confidence.',
  },
  {
    icon: 'map',
    title: 'Study Abroad Guidance',
    description: 'Support exploring destinations including Australia, the UK, New Zealand and Canada.',
  },
];

export const homeServiceCards = [
  { slug: 'student-visa' as ServiceSlug, title: 'Student Visa', description: 'Guidance through documentation and the student visa application process.' },
  { slug: 'immigration' as ServiceSlug, title: 'Immigration Consultancy', description: 'Considered guidance on overseas immigration pathways.' },
  { slug: 'study-abroad' as const, title: 'Study Abroad', description: 'Support exploring courses and institutions in your destination of choice.', isStudyAbroad: true },
  { slug: 'ielts' as ServiceSlug, title: 'IELTS', description: 'Structured preparation across all four IELTS modules.' },
  { slug: 'pte' as ServiceSlug, title: 'PTE', description: 'Daily practice across all four PTE modules.' },
  { slug: 'spoken-english' as ServiceSlug, title: 'Spoken English', description: 'Building grammar, confidence and everyday communication skills.' },
];

export interface VideoTestimonial {
  name: string;
  outcome: string;
  youtubeId: string;
}

// Genuine student outcome videos published on BLC's own YouTube channel
// (youtube.com/@BlossomLearningCentre). Linked directly rather than quoted,
// since no permissioned written testimonials were available to transcribe.
export const successStories: VideoTestimonial[] = [
  { name: 'Harshit', outcome: 'Australia student visa approved', youtubeId: 'iz0ZlrrDy_A' },
  { name: 'Bhawna Kamboj', outcome: 'Australia student visa approved', youtubeId: 'M6J-L16YMQc' },
  { name: 'Vishu & Mukul', outcome: 'Canada student visa approved', youtubeId: '9solvdeA76A' },
  { name: 'Sangam, Prikshit & Nikhil', outcome: 'Australia student visa approved', youtubeId: 'oOjwsjmYO28' },
];

export const testimonials: VideoTestimonial[] = [
  { name: 'Aanchal', outcome: 'PTE: 83 in Writing, overall 76 — first attempt', youtubeId: '3pegCahUiGE' },
  { name: 'Dipanshu', outcome: 'PTE: 90 in Listening, Reading & Speaking, overall 90 — first attempt', youtubeId: 'N8WKrqoPsAo' },
  { name: 'Muskan', outcome: 'PTE: overall 8 bands — first attempt', youtubeId: 'WN8m-jz4cYc' },
  { name: 'Shivani', outcome: 'PTE: 88 in Speaking, overall 75 — first attempt', youtubeId: 'uGDt9o5JPX0' },
  { name: 'Arab Kumari', outcome: 'PTE: overall 6.5 bands — first attempt', youtubeId: 'bMl_-qNbklQ' },
  { name: 'Reetu Devi', outcome: 'PTE: 73 in Writing, overall 65 — first attempt', youtubeId: '33FnOnBgR-k' },
];

export const aboutContent = {
  who: 'Blossom Learning Centre (BLC) is an education and immigration consultancy based in Ladwa, Haryana, supporting students who want to study abroad and build their future overseas.',
  what: 'BLC offers guidance across student visas, immigration consultancy, and English-language preparation through IELTS, PTE and spoken English training, helping students prepare thoroughly for each step of their journey.',
  who2: 'We work with students at every stage — from those just beginning to explore their options, to those preparing final documentation for submission.',
  how: 'Our approach is personal and structured: one-to-one consultations, honest guidance based on your individual circumstances, and consistent support from initial enquiry through to application outcome.',
};
