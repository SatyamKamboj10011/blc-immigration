// Lists every string the site passes through t(), and reports which ones are
// missing from the Hindi / Punjabi dictionaries.
//   npm run i18n:check            → summary of missing keys
//   npm run i18n:check -- --write → also writes scripts/i18n-missing.json
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as site from '../src/data/site';

const keys = new Set<string>();
const add = (v: unknown) => {
  if (typeof v === 'string' && /[A-Za-z]/.test(v)) keys.add(v);
};

// 1. Content from site.ts that components render through t(). Legal policies and the
//    exam-technique guides are intentionally left in English.
for (const s of site.services) {
  [s.title, s.shortTitle, s.summary, s.heroText, s.intro, ...s.whoFor, ...s.howWeHelp, ...s.process].forEach(add);
  s.faqs.forEach((f) => (add(f.q), add(f.a)));
}
for (const d of site.destinations) {
  [d.name, d.summary, d.intro, ...d.whyConsider, ...d.studyOptions, ...d.support, ...d.applicationProcess].forEach(add);
  d.faqs.forEach((f) => (add(f.q), add(f.a)));
}
site.processSteps.forEach((p) => (add(p.title), add(p.description)));
site.whyChooseBLC.forEach((w) => (add(w.title), add(w.description)));
site.homeServiceCards.forEach((c) => (add(c.title), add(c.description)));
site.serviceFeatures.forEach((f) => (add(f.title), add(f.description)));
site.officeHours.forEach((h) => (add(h.day), add(h.hours)));
Object.values(site.aboutContent).forEach(add);
site.navLinks.forEach((n) => add(n.label));
site.leadership.forEach((l) => add(l.title));
[...site.successStories, ...site.testimonials].forEach((v) => add(v.outcome));
site.examStrategies.forEach((e) => add(e.exam));

// 2. Literal strings in components: t('...') calls, plus label/title/value/note
//    fields and option lists that are rendered through t(variable).
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.tsx') || p.endsWith('.ts') ? [p] : [];
  });

const literal = String.raw`(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')`;
const tCall = new RegExp(String.raw`\bt\(\s*` + literal, 'g');
const fieldLiteral = new RegExp(String.raw`\b(?:label|title|value|note|text)\s*:\s*` + literal, 'g');
const unescape = (s: string) => s.replace(/\\(["'\\])/g, '$1');

for (const file of walk('src')) {
  if (file.includes('i18n') || file.endsWith('site.ts') || file.endsWith('knowledge.ts')) continue;
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(tCall)) add(unescape(m[1] ?? m[2]));
  for (const m of src.matchAll(fieldLiteral)) add(unescape(m[1] ?? m[2]));
  // const xxxOptions = ['A', 'B'] arrays
  for (const m of src.matchAll(/const \w*Options\s*=\s*\[([^\]]*)\]/g)) {
    for (const o of m[1].matchAll(new RegExp(literal, 'g'))) add(unescape(o[1] ?? o[2]));
  }
}

// AI assistant: its knowledge base exposes its own translatable strings.
const { translatableStrings } = await import('../src/lib/knowledge');
translatableStrings().forEach(add);

const ignore = new Set(['noopener noreferrer', 'IELTS', 'PTE', 'BLC', 'YouTube', 'Instagram', 'Facebook', 'WhatsApp']);
const all = [...keys].filter((k) => !ignore.has(k)).sort();

const report: Record<string, string[]> = {};
for (const lang of ['hi', 'pa']) {
  const dict = JSON.parse(readFileSync(`src/i18n/${lang}.json`, 'utf8')) as Record<string, string>;
  report[lang] = all.filter((k) => !(k in dict));
  const unused = Object.keys(dict).filter((k) => !keys.has(k));
  console.log(`${lang}: ${all.length - report[lang].length}/${all.length} translated, ${report[lang].length} missing, ${unused.length} unused`);
}

if (process.argv.includes('--write')) {
  writeFileSync('scripts/i18n-missing.json', JSON.stringify(report, null, 2));
  console.log('wrote scripts/i18n-missing.json');
}
