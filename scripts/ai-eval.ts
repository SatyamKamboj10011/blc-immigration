// Measures how often the Quick Help assistant picks the right answer.
//   npm run ai:eval
// Uses the same matcher and the same embedding model as the browser.
import { pipeline } from '@huggingface/transformers';
import hi from '../src/i18n/hi.json';
import pa from '../src/i18n/pa.json';
import { knowledge } from '../src/lib/knowledge';
import { buildPhrasings, decide, detectScript, LexicalIndex, rank, toEnglishish } from '../src/lib/matcher';

// [question, acceptable entry ids] — 'none' means the assistant should decline.
const cases: [string, string[]][] = [
  // English
  ['What services do you offer?', ['services']],
  ['which countries can i go to', ['destinations']],
  ['ielts or pte which is better', ['ielts-vs-pte', 'service-pte-faq-0']],
  ['is the counselling free', ['consultation']],
  ['where is your office', ['location-hours']],
  ['are you open on sunday', ['location-hours']],
  ['what time do you open', ['location-hours']],
  ['phone number', ['contact']],
  ['how do i contact you', ['contact']],
  ['who is the owner of blc', ['directors']],
  ['what are the steps', ['process']],
  ['do you have reviews', ['success']],
  ['how much is the fee', ['fees']],
  ['ielts coaching fees', ['fees']],
  ['price of pte classes', ['fees']],
  ['do you give scholarships', ['scholarship']],
  ['am i eligible', ['eligibility']],
  ['i have a 3 year gap can i apply', ['eligibility']],
  ['can i get PR in canada', ['pr', 'destination-canada-faq-2']],
  ['will my visa get approved for sure', ['guarantee', 'service-student-visa-faq-1']],
  ['what documents are needed for student visa', ['service-student-visa-faq-0']],
  ['how long does visa processing take', ['service-student-visa-faq-2']],
  ['tell me about australia', ['destination-australia']],
  ['i want to study in the uk', ['destination-uk']],
  ['new zealand study', ['destination-new-zealand']],
  ['canada study visa', ['destination-canada']],
  ['which english test for australia', ['destination-australia-faq-0']],
  ['english test for canada', ['destination-canada-faq-0']],
  ['do you teach spoken english', ['service-spoken-english']],
  ['ielts classes', ['service-ielts']],
  ['pte coaching', ['service-pte']],
  ['immigration help', ['service-immigration', 'pr']],
  ['how long does ielts preparation take', ['service-ielts-faq-1']],
  ['is spoken english ok for beginners', ['service-spoken-english-faq-0']],
  ['hello', ['greeting']],
  ['thanks a lot', ['thanks']],
  // typos
  ['wat servises do u ofer', ['services']],
  ['ofice adress', ['location-hours']],
  ['scholarshp', ['scholarship']],
  ['australlia visa', ['destination-australia']],
  ['canda', ['destination-canada']],
  ['ilets coching', ['service-ielts', 'fees']],
  // Hinglish
  ['fees kitni hai', ['fees']],
  ['ielts ki fees kitni hai', ['fees']],
  ['office kahan hai', ['location-hours']],
  ['sunday ko office khula hai kya', ['location-hours']],
  ['canada jana hai', ['destination-canada']],
  ['australia ka visa kaise lagega', ['destination-australia', 'service-student-visa']],
  ['visa pakka lagega kya', ['guarantee', 'service-student-visa-faq-1']],
  ['ielts ya pte kaunsa better hai', ['ielts-vs-pte', 'service-pte-faq-0']],
  ['student visa ke liye kya documents chahiye', ['service-student-visa-faq-0']],
  ['scholarship milegi kya', ['scholarship']],
  ['english bolna seekhna hai', ['service-spoken-english']],
  ['pr kaise milega', ['pr']],
  ['aapka number kya hai', ['contact']],
  ['kam marks hai kya main ja sakta hu', ['eligibility']],
  ['uk me padhai karni hai', ['destination-uk']],
  ['new zealand jana hai', ['destination-new-zealand']],
  ['konsa desh best hai padhai ke liye', ['destinations']],
  ['pte ki class lagti hai', ['service-pte']],
  // Hindi (Devanagari)
  ['फीस कितनी है?', ['fees']],
  ['आईईएलटीएस की फीस कितनी है', ['fees']],
  ['ऑफिस कहाँ है', ['location-hours']],
  ['रविवार को ऑफिस खुला है?', ['location-hours']],
  ['कनाडा जाना है', ['destination-canada']],
  ['ऑस्ट्रेलिया में पढ़ाई', ['destination-australia']],
  ['स्टूडेंट वीज़ा के लिए कौन से दस्तावेज़ चाहिए', ['service-student-visa-faq-0']],
  ['क्या वीज़ा की गारंटी है', ['guarantee', 'service-student-visa-faq-1']],
  ['IELTS या PTE कौन सा बेहतर है', ['ielts-vs-pte', 'service-pte-faq-0']],
  ['आप कौन सी सेवाएं देते हैं', ['services']],
  ['फ़ोन नंबर', ['contact']],
  ['स्कॉलरशिप मिलेगी क्या', ['scholarship']],
  ['अंग्रेज़ी बोलना सीखना है', ['service-spoken-english']],
  ['नमस्ते', ['greeting']],
  ['क्या पहली काउंसलिंग फ्री है', ['consultation']],
  ['न्यूज़ीलैंड के बारे में बताइए', ['destination-new-zealand']],
  ['यूके में पढ़ाई के लिए कौन सी अंग्रेज़ी परीक्षा', ['destination-uk-faq-0']],
  ['मालिक कौन है', ['directors']],
  // Punjabi (Gurmukhi)
  ['ਫੀਸ ਕਿੰਨੀ ਹੈ', ['fees']],
  ['ਦਫ਼ਤਰ ਕਿੱਥੇ ਹੈ', ['location-hours']],
  ['ਕੈਨੇਡਾ ਜਾਣਾ ਹੈ', ['destination-canada']],
  ['ਆਸਟ੍ਰੇਲੀਆ ਵਿੱਚ ਪੜ੍ਹਾਈ', ['destination-australia']],
  ['ਸਟੂਡੈਂਟ ਵੀਜ਼ੇ ਲਈ ਕਿਹੜੇ ਦਸਤਾਵੇਜ਼ ਚਾਹੀਦੇ ਹਨ', ['service-student-visa-faq-0']],
  ['ਕੀ ਵੀਜ਼ੇ ਦੀ ਗਾਰੰਟੀ ਹੈ', ['guarantee', 'service-student-visa-faq-1']],
  ['ਤੁਸੀਂ ਕਿਹੜੀਆਂ ਸੇਵਾਵਾਂ ਦਿੰਦੇ ਹੋ', ['services']],
  ['ਸਤ ਸ੍ਰੀ ਅਕਾਲ', ['greeting']],
  ['ਫ਼ੋਨ ਨੰਬਰ ਕੀ ਹੈ', ['contact']],
  ['ਸਕਾਲਰਸ਼ਿਪ ਮਿਲੇਗੀ', ['scholarship']],
  ['ਅੰਗਰੇਜ਼ੀ ਬੋਲਣਾ ਸਿੱਖਣਾ ਹੈ', ['service-spoken-english']],
  ['ਨਿਊਜ਼ੀਲੈਂਡ ਬਾਰੇ ਦੱਸੋ', ['destination-new-zealand']],
  ['ਕੀ ਪਹਿਲੀ ਸਲਾਹ ਮੁਫ਼ਤ ਹੈ', ['consultation']],
  ['ਪੀਆਰ ਕਿਵੇਂ ਮਿਲੇਗੀ', ['pr']],
  // off-topic — should decline
  ['best pizza near me', ['none']],
  ['what is the weather today', ['none']],
  ['who won the cricket match', ['none']],
  ['write me a poem', ['none']],
  ['how to cook rice', ['none']],
  ['what is 2 plus 2', ['none']],
  ['bitcoin price', ['none']],
  ['movie dekhni hai', ['none']],
  ['आज मौसम कैसा है', ['none']],
  ['ਕ੍ਰਿਕਟ ਮੈਚ ਕੌਣ ਜਿੱਤਿਆ', ['none']],
];

// --holdout evaluates questions that were never used for tuning
import { readFileSync } from 'node:fs';
if (process.argv.includes('--holdout')) {
  cases.length = 0;
  cases.push(...(JSON.parse(readFileSync('scripts/ai-holdout.json', 'utf8')) as [string, string[]][]));
}

const phrasings = buildPhrasings([hi, pa]);
const lexical = new LexicalIndex(phrasings);
const latin = phrasings.flatMap((p, i) => (p.script === 'latin' ? [i] : []));

const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', { dtype: 'q8' });
const embed = async (texts: string[]) => {
  const out = await extractor(texts, { pooling: 'mean', normalize: true });
  const dim = out.dims[1];
  const data = out.data as Float32Array;
  return texts.map((_, i) => data.slice(i * dim, (i + 1) * dim));
};
const dot = (a: Float32Array, b: Float32Array) => a.reduce((s, x, i) => s + x * b[i], 0);
const index = await embed(latin.map((i) => phrasings[i].text));

let correct = 0;
const okScores: number[] = [];
const offScores: number[] = [];
let wrongAnswer = 0;
let suggested = 0;
const byGroup: Record<string, [number, number]> = {};
const failures: string[] = [];

for (const [q, expected] of cases) {
  const script = detectScript(q);
  let semantic: number[] | undefined;
  if (script === 'latin') {
    const rewrite = toEnglishish(q);
    const [a] = await embed([q]);
    const [b] = rewrite !== q ? await embed([rewrite]) : [undefined];
    semantic = new Array(phrasings.length).fill(0);
    latin.forEach((pi, k) => (semantic![pi] = Math.max(dot(a, index[k]), b ? dot(b, index[k]) : 0)));
  }
  const ranked = rank(phrasings, lexical.scores(q), semantic, q);
  const result = decide(ranked);
  const got = result.kind === 'answer' ? result.entry.id : result.kind === 'none' ? 'none' : 'suggest';
  const ok = expected.includes(got) || (result.kind === 'suggest' && result.options.some((o) => expected.includes(o.id)));
  const group = expected[0] === 'none' ? 'off-topic' : script === 'latin' ? (/[a-z]/.test(q) && toEnglishish(q) !== q ? 'hinglish' : 'english') : script;
  byGroup[group] ??= [0, 0];
  byGroup[group][1]++;
  if (expected[0] === 'none') offScores.push(ranked[0]?.[1] ?? 0);
  else if (ok && result.kind === 'answer') okScores.push(ranked[0][1]);
  if (ok) {
    correct++;
    byGroup[group][0]++;
    if (result.kind === 'suggest') suggested++;
  } else {
    if (result.kind === 'answer') wrongAnswer++;
    const top = ranked.slice(0, 2).map(([i, s]) => `${knowledge[i].id}@${s.toFixed(2)}`).join(' ');
    failures.push(`  ✗ ${q}  → ${got}  (want ${expected.join('|')})  [${top}]`);
  }
}

console.log(`\nAccuracy: ${correct}/${cases.length} (${((correct / cases.length) * 100).toFixed(1)}%)`);
console.log(`  of which "did you mean" suggestions: ${suggested}`);
console.log(`  confidently wrong answers: ${wrongAnswer}`);
for (const [g, [ok, n]] of Object.entries(byGroup)) console.log(`  ${g.padEnd(10)} ${ok}/${n}`);
if (okScores.length && offScores.length) console.log(`  lowest correct answer score: ${Math.min(...okScores).toFixed(2)}   highest off-topic score: ${Math.max(...offScores).toFixed(2)}`);
if (failures.length) console.log('\nMisses:\n' + failures.join('\n'));
