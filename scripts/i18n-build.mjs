// Builds src/i18n/{hi,pa}.json from scripts/translations/{lang}.tsv.
// Each TSV line is "<index>\t<translation>", where index refers to the sorted
// key list in scripts/i18n-keys.json (written by `npm run i18n:check -- --write`).
// Translations are merged into the existing dictionary, and every {placeholder}
// must survive translation.
import { readFileSync, writeFileSync } from 'node:fs';

const keys = JSON.parse(readFileSync('scripts/i18n-keys.json', 'utf8'));
let failed = false;

for (const lang of ['hi', 'pa']) {
  const dictPath = `src/i18n/${lang}.json`;
  const dict = JSON.parse(readFileSync(dictPath, 'utf8'));
  const lines = readFileSync(`scripts/translations/${lang}.tsv`, 'utf8').split(/\r?\n/).filter(Boolean);
  let added = 0;
  for (const line of lines) {
    const tab = line.indexOf('\t');
    const index = Number(line.slice(0, tab));
    const text = line.slice(tab + 1).trim();
    const key = keys[index];
    if (key === undefined) {
      console.error(`${lang}: no key at index ${index}`);
      failed = true;
      continue;
    }
    const want = (key.match(/\{\w+\}/g) ?? []).sort().join();
    const got = (text.match(/\{\w+\}/g) ?? []).sort().join();
    if (want !== got) {
      console.error(`${lang}[${index}] placeholder mismatch: "${key}" → "${text}"`);
      failed = true;
      continue;
    }
    dict[key] = text;
    added++;
  }
  const sorted = Object.fromEntries(Object.entries(dict).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(dictPath, JSON.stringify(sorted, null, 2) + '\n');
  console.log(`${lang}: merged ${added} translations (${Object.keys(sorted).length} total)`);
}

if (failed) process.exit(1);
