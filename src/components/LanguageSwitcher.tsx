import { languages, useLanguage } from '../i18n';

interface LanguageSwitcherProps {
  // 'compact' is the small pill in the navbar; 'full' shows full language names (mobile menu)
  variant?: 'compact' | 'full';
}

export default function LanguageSwitcher({ variant = 'compact' }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label={t('Choose language')}
      className={`flex items-center gap-0.5 rounded-full border border-brand-950/10 bg-brand-950/[0.04] p-0.5 ${variant === 'full' ? 'w-full' : ''}`}
    >
      {languages.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            role="radio"
            aria-checked={active}
            lang={l.code}
            title={l.label}
            onClick={() => setLang(l.code)}
            className={`focus-ring rounded-full font-semibold transition-colors duration-300 ${
              variant === 'full' ? 'flex-1 px-3 py-2 text-sm' : 'px-2.5 py-1.5 text-xs'
            } ${active ? 'bg-brand-950 text-white' : 'text-brand-900/60 hover:text-brand-950'}`}
          >
            {variant === 'full' ? l.label : l.short}
          </button>
        );
      })}
    </div>
  );
}
