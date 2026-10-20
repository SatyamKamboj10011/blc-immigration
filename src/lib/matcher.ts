import type { Dictionary } from '../i18n';
import { knowledge, type KnowledgeEntry } from './knowledge';
import { services, destinations } from '../data/site';

// Thresholds tuned against the test set in scripts/ai-eval.ts.
export const ANSWER_AT = 0.62;
export const SUGGEST_AT = 0.5;

export type Script = 'latin' | 'hi' | 'pa';

export function detectScript(text: string): Script {
  if (/[ऀ-ॿ]/.test(text)) return 'hi';
  if (/[਀-੿]/.test(text)) return 'pa';
  return 'latin';
}

// Common Hinglish / Punjabi-in-Latin words → English, so the English embedding
// model understands "ielts ki fees kitni hai" as "ielts fees how much".
const hinglish: Record<string, string> = {
  kitna: 'how much', kitni: 'how much', kitne: 'how much', kinna: 'how much', kinni: 'how much',
  kab: 'when', kado: 'when', kahan: 'where', kaha: 'where', kidhar: 'where', kithe: 'where',
  kaise: 'how', kaisa: 'how', kive: 'how', kya: 'what', ki: '', ka: '', ke: '', ko: '', me: 'in', mein: 'in', vich: 'in',
  hai: '', hain: '', ho: '', hu: '', hoon: '', aa: '', se: 'from', aur: 'and', ya: 'or', te: 'and', jan: 'go',
  chahiye: 'need', chahida: 'need', karna: 'do', karni: 'do', karwana: 'get', lagwana: 'get', lagega: 'approved',
  milega: 'get', milegi: 'get', jana: 'go', jaana: 'go', jaana_hai: 'want to go', padhai: 'study', padhna: 'study',
  parhai: 'study', videsh: 'abroad', bahar: 'abroad', baahar: 'abroad', paise: 'money cost', kharcha: 'cost',
  kharch: 'cost', fees: 'fees', fee: 'fees', fess: 'fees', feez: 'fees', khula: 'open', khulta: 'open', band: 'closed',
  baje: 'time', timing: 'hours', din: 'day', aaj: 'today', kal: 'tomorrow', naukri: 'job', kaam: 'work',
  kagaz: 'documents', kagzaat: 'documents', documents: 'documents', docs: 'documents', dastavez: 'documents',
  pakka: 'guaranteed', guarantee: 'guarantee', marks: 'marks', number: 'number', baat: 'talk', bolna: 'speak',
  seekhna: 'learn', sikhna: 'learn', class: 'class', classes: 'classes', tayari: 'preparation', taiyari: 'preparation',
  kaun: 'which who', kaunsa: 'which', konsa: 'which', kehda: 'which', fark: 'difference', farak: 'difference',
  behtar: 'better', accha: 'good', sasta: 'cheap', mehnga: 'expensive', saal: 'year', mahine: 'months',
  // frequent misspellings
  ilets: 'ielts', ielt: 'ielts', ilts: 'ielts', ilet: 'ielts', coching: 'coaching', choching: 'coaching',
  cochng: 'coaching', vise: 'visa', visaa: 'visa', canda: 'canada', austrailia: 'australia', australlia: 'australia',
  scholarshp: 'scholarship', scolarship: 'scholarship', adress: 'address', ofice: 'office', servises: 'services',
  dekhni: 'watch', dekhna: 'watch', khana: 'food', khelna: 'play', gaana: 'song', mausam: 'weather',
  shuru: 'start', process: 'process', apply: 'apply', bhejte: 'send', desh: 'country', mulk: 'country',
};

const normalise = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFC')
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// English rewrite used for the semantic model (only applied to Latin script).
export function toEnglishish(text: string): string {
  const words = normalise(text).split(' ');
  if (!words.some((w) => w in hinglish)) return text;
  return words
    .map((w) => (w in hinglish ? hinglish[w] : w))
    .filter(Boolean)
    .join(' ');
}

export interface Phrasing {
  text: string;
  entryIndex: number;
  script: Script;
}

// Every phrasing of every entry, including Hindi/Punjabi translations of the
// English questions taken from the site dictionaries.
export function buildPhrasings(dicts: Dictionary[]): Phrasing[] {
  const seen = new Set<string>();
  const out: Phrasing[] = [];
  const push = (text: string | undefined, entryIndex: number) => {
    if (!text) return;
    const key = `${entryIndex}|${text}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ text, entryIndex, script: detectScript(text) });
  };

  knowledge.forEach((entry, i) => {
    entry.questions.forEach((q) => {
      push(q, i);
      dicts.forEach((d) => push(d[q], i));
    });
    // translated names of the service / country also identify the entry
    const svc = services.find((s) => entry.id === `service-${s.slug}`);
    const dest = destinations.find((d) => entry.id === `destination-${d.slug}`);
    dicts.forEach((d) => {
      if (svc) (push(d[svc.title], i), push(d[svc.shortTitle], i));
      if (dest) push(d[dest.name], i);
    });
  });
  return out;
}

// --- lexical matcher: character trigram TF-IDF (script-agnostic, typo-tolerant) ---

// Filler words in English, Hinglish, Hindi and Punjabi — shared by almost every
// phrasing, so they only add noise to the letter-pattern match.
const stopwords = new Set(
  (
    'a an the is are am be do does did you your i me my we our to in on of for at it this that can could will would ' +
    'what how which who when where should please tell about with or and from get have has there any ' +
    'hai hain ho hu hoon kya ki ka ke ko me mein se aap aapka mujhe main karni karna kar raha rahi hi bhi to ' +
    'है हैं हो हूँ क्या की का के को में से आप आपका मुझे मैं करना करनी भी तो ' +
    'ਹੈ ਹਨ ਹੋ ਹਾਂ ਕੀ ਦਾ ਦੀ ਦੇ ਨੂੰ ਵਿੱਚ ਤੋਂ ਤੁਸੀਂ ਤੁਹਾਡਾ ਮੈਨੂੰ ਮੈਂ ਕਰਨਾ ਵੀ ਤਾਂ'
  ).split(' '),
);

function grams(text: string): Map<string, number> {
  const m = new Map<string, number>();
  const words = normalise(text).split(' ');
  const content = words.filter((w) => w && !stopwords.has(w));
  for (const word of content.length ? content : words) {
    if (!word) continue;
    const w = ` ${word} `;
    const chars = [...w];
    for (let i = 0; i + 3 <= chars.length; i++) {
      const g = chars.slice(i, i + 3).join('');
      m.set(g, (m.get(g) ?? 0) + 1);
    }
  }
  return m;
}

export class LexicalIndex {
  private idf = new Map<string, number>();
  private vectors: { v: Map<string, number>; norm: number }[] = [];

  constructor(private phrasings: Phrasing[]) {
    const df = new Map<string, number>();
    const raw = phrasings.map((p) => grams(p.text));
    raw.forEach((g) => g.forEach((_, k) => df.set(k, (df.get(k) ?? 0) + 1)));
    const n = phrasings.length;
    df.forEach((c, k) => this.idf.set(k, Math.log(1 + n / c)));
    this.vectors = raw.map((g) => this.weigh(g));
  }

  private weigh(g: Map<string, number>) {
    const v = new Map<string, number>();
    let sq = 0;
    g.forEach((tf, k) => {
      const w = (1 + Math.log(tf)) * (this.idf.get(k) ?? Math.log(1 + this.phrasings.length));
      v.set(k, w);
      sq += w * w;
    });
    return { v, norm: Math.sqrt(sq) || 1 };
  }

  scores(query: string): number[] {
    const q = this.weigh(grams(query));
    return this.vectors.map(({ v, norm }) => {
      let dot = 0;
      q.v.forEach((w, k) => {
        const o = v.get(k);
        if (o) dot += w * o;
      });
      return dot / (q.norm * norm);
    });
  }
}

export type SearchResult =
  | { kind: 'answer'; entry: KnowledgeEntry; related?: KnowledgeEntry }
  | { kind: 'suggest'; options: KnowledgeEntry[] }
  | { kind: 'none' };

// Strong, unambiguous cues in the question that should tip the balance.
const feeCue = /\b(fees?|fess|price|cost|charges?|kitni|kitna|kitne|paise|kharcha)\b|फ़?फीस|फ़ीस|खर्च|कितन|ਫ਼?ਫੀਸ|ਫ਼ੀਸ|ਖਰਚ|ਕਿੰਨ/i;
const testCue = /english test|\bielts\b|\bpte\b|band score|अंग्रेज़ी परीक्षा|ਅੰਗਰੇਜ਼ੀ ਪ੍ਰੀਖਿਆ/i;
const prCue = /\bpr\b|permanent resid|settle|पीआर|स्थायी निवास|ਪੀਆਰ|ਪੱਕੀ ਰਿਹਾਇਸ਼/i;
const countryCues: Record<string, RegExp> = {
  australia: /australi|aus\b|ऑस्ट्रेलिया|आस्ट्रेलिया|ਆਸਟ੍ਰੇਲੀਆ|ਆਸਟਰੇਲੀਆ/i,
  uk: /\buk\b|united kingdom|england|london|britain|यूके|इंग्लैंड|लंदन|ਯੂਕੇ|ਇੰਗਲੈਂਡ|ਲੰਡਨ/i,
  'new-zealand': /new ?zealand|\bnz\b|न्यूज़ीलैंड|न्यूजीलैंड|ਨਿਊਜ਼ੀਲੈਂਡ|ਨਿਊਜ਼ੀਲੈਂਡ/i,
  canada: /canad|kanada|canda|कनाडा|ਕੈਨੇਡਾ/i,
};

function intentBoosts(query: string): Map<number, number> {
  const boosts = new Map<number, number>();
  const add = (id: string | ((id: string) => boolean), v: number) =>
    knowledge.forEach((e, i) => {
      if (typeof id === 'string' ? e.id === id : id(e.id)) boosts.set(i, (boosts.get(i) ?? 0) + v);
    });
  if (feeCue.test(query)) add('fees', 0.18);
  const pr = prCue.test(query);
  if (pr) add('pr', 0.25);
  if (testCue.test(query)) add((id) => /English test/i.test(knowledge.find((e) => e.id === id)?.questions[0] ?? ''), 0.06);
  const countries = Object.entries(countryCues).filter(([, re]) => re.test(query)).map(([slug]) => slug);
  if (countries.length === 1 && !pr) {
    add((id) => id.startsWith(`destination-${countries[0]}`), 0.08);
    add('destinations', -0.06);
  }
  return boosts;
}

// Combine semantic (may be absent) and lexical scores per phrasing, keep the best per entry.
export function rank(phrasings: Phrasing[], lexical: number[], semantic?: number[], query = ''): [number, number][] {
  const best = new Map<number, number>();
  phrasings.forEach((p, i) => {
    // lexical trigram cosine runs lower than embedding similarity; map ~0.55 → 0.75
    const lex = Math.min(0.98, lexical[i] * 1.15 + (lexical[i] > 0.2 ? 0.12 : 0));
    const sem = semantic?.[i] ?? 0;
    // agreement between the two signals is strong evidence
    const score = Math.max(sem, lex) + (sem > 0.45 && lex > 0.3 ? 0.05 : 0);
    if ((best.get(p.entryIndex) ?? -1) < score) best.set(p.entryIndex, score);
  });
  // only nudge entries that already look relevant, so cues alone never create a match
  intentBoosts(query).forEach((v, i) => {
    const cur = best.get(i);
    if (cur !== undefined && cur > 0.5) best.set(i, cur + v);
  });
  return [...best].sort((a, b) => b[1] - a[1]);
}

export function decide(ranked: [number, number][]): SearchResult {
  const [first, second] = ranked;
  if (!first || first[1] < SUGGEST_AT) return { kind: 'none' };
  if (first[1] < ANSWER_AT) {
    return {
      kind: 'suggest',
      options: ranked.slice(0, 2).filter(([, s]) => s >= SUGGEST_AT - 0.05).map(([i]) => knowledge[i]),
    };
  }
  const related =
    second && second[1] >= 0.6 && knowledge[second[0]].link?.to !== knowledge[first[0]].link?.to ? knowledge[second[0]] : undefined;
  return { kind: 'answer', entry: knowledge[first[0]], related };
}
