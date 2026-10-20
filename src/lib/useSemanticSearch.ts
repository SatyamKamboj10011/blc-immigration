import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dictionary, Lang } from '../i18n';
import type { KnowledgeEntry } from './knowledge';
import { buildPhrasings, decide, detectScript, LexicalIndex, rank, toEnglishish, type Phrasing, type SearchResult } from './matcher';

export type ModelStatus = 'idle' | 'loading' | 'ready' | 'unavailable';
export type { SearchResult };

interface Index {
  phrasings: Phrasing[];
  lexical: LexicalIndex;
  // positions in `phrasings` of the Latin-script ones the embedding model understands
  latin: number[];
  dicts: Record<Exclude<Lang, 'en'>, Dictionary>;
}

// Render an entry's answer (and link label) in a language, using the site dictionaries.
export function localise(entry: KnowledgeEntry, dict: Dictionary) {
  const tr = (s: string) => dict[s] ?? s;
  const params: Record<string, string> = {};
  for (const [k, v] of Object.entries(entry.params ?? {})) params[k] = Array.isArray(v) ? v.map(tr).join(', ') : tr(v);
  const fill = (s: string) => tr(s).replace(/\{(\w+)\}/g, (m, k) => params[k] ?? m);
  return {
    question: tr(entry.questions[0]),
    answer: fill(entry.answer),
    link: entry.link ? { to: entry.link.to, label: fill(entry.link.label) } : undefined,
  };
}

export function useSemanticSearch() {
  const [status, setStatus] = useState<ModelStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState<Index | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const pending = useRef(new Map<number, (scores: number[]) => void>());
  const nextId = useRef(0);

  // Load lazily — only when the chat is opened — so normal page loads stay light.
  const load = useCallback(async () => {
    if (index) return;
    const [hi, pa] = await Promise.all([import('../i18n/hi.json'), import('../i18n/pa.json')]);
    const dicts = { hi: hi.default as Dictionary, pa: pa.default as Dictionary };
    const phrasings = buildPhrasings([dicts.hi, dicts.pa]);
    const latin = phrasings.flatMap((p, i) => (p.script === 'latin' ? [i] : []));
    setIndex({ phrasings, lexical: new LexicalIndex(phrasings), latin, dicts });

    if (typeof Worker === 'undefined') {
      setStatus('unavailable');
      return;
    }
    const worker = new Worker(new URL('./semanticWorker.ts', import.meta.url), { type: 'module' });
    workerRef.current = worker;
    setStatus('loading');
    worker.onmessage = (event) => {
      const msg = event.data;
      if (msg.type === 'progress') setProgress(msg.progress);
      else if (msg.type === 'ready') setStatus('ready');
      else if (msg.type === 'result') {
        pending.current.get(msg.id)?.(msg.scores);
        pending.current.delete(msg.id);
      } else if (msg.type === 'error') {
        console.warn('[QuickHelp] model unavailable, using text matching only:', msg.message);
        setStatus('unavailable');
        pending.current.forEach((resolve) => resolve([]));
        pending.current.clear();
      }
    };
    worker.onerror = () => setStatus('unavailable');
    worker.postMessage({ type: 'init', phrasings: latin.map((i) => phrasings[i].text) });
  }, [index]);

  useEffect(() => () => workerRef.current?.terminate(), []);

  const embedScores = useCallback((text: string) => {
    const id = nextId.current++;
    return new Promise<number[]>((resolve) => {
      pending.current.set(id, resolve);
      workerRef.current!.postMessage({ type: 'query', id, text });
    });
  }, []);

  const search = useCallback(
    async (text: string): Promise<{ result: SearchResult; script: ReturnType<typeof detectScript> }> => {
      const script = detectScript(text);
      if (!index) return { result: { kind: 'none' }, script };
      const lexical = index.lexical.scores(text);

      let semantic: number[] | undefined;
      if (script === 'latin' && status === 'ready' && workerRef.current) {
        // score both the raw text and its Hinglish→English rewrite, keep the better match
        const rewrite = toEnglishish(text);
        const runs = await Promise.all([embedScores(text), rewrite !== text ? embedScores(rewrite) : Promise.resolve([])]);
        const [a, b] = runs;
        if (a.length) {
          semantic = new Array(index.phrasings.length).fill(0);
          index.latin.forEach((pi, k) => (semantic![pi] = Math.max(a[k], b[k] ?? 0)));
        }
      }
      return { result: decide(rank(index.phrasings, lexical, semantic, text)), script };
    },
    [index, status, embedScores],
  );

  return { status, progress, load, search, dicts: index?.dicts };
}
