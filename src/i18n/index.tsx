import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'en' | 'hi' | 'pa';

export const languages: { code: Lang; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'हिं' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', short: 'ਪੰ' },
];

// Dictionaries are keyed by the English text itself, so wrapping a string in t()
// is the only change a component needs, and anything not yet translated simply
// falls back to English. Hindi/Punjabi files load only when chosen.
export type Dictionary = Record<string, string>;

const loaders: Record<Exclude<Lang, 'en'>, () => Promise<{ default: Dictionary }>> = {
  hi: () => import('./hi.json'),
  pa: () => import('./pa.json'),
};

const STORAGE_KEY = 'blc-lang';

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'hi' || saved === 'pa' || saved === 'en') return saved;
  } catch {
    // storage blocked — fall through to English
  }
  return 'en';
}

export type TFunction = (text: string, params?: Record<string, string | number>) => string;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TFunction;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function interpolate(text: string, params?: Record<string, string | number>) {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (match, key) => (key in params ? String(params[key]) : match));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [dict, setDict] = useState<Dictionary>({});

  useEffect(() => {
    let cancelled = false;
    document.documentElement.lang = lang;
    if (lang === 'en') {
      setDict({});
      return;
    }
    loaders[lang]().then((mod) => {
      if (!cancelled) setDict(mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // not persisted, still switches for this visit
    }
  }, []);

  const t = useCallback<TFunction>((text, params) => interpolate(dict[text] ?? text, params), [dict]);

  const value = useMemo(() => ({ lang, setLang, t, dict }), [lang, setLang, t, dict]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

export function useT() {
  return useLanguage().t;
}
