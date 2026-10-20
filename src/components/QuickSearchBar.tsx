import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from './Icon';
import { destinations, services } from '../data/site';
import { useT } from '../i18n';

const programOptions = services.map((s) => s.shortTitle);

interface QuickSearchBarProps {
  // 'card' renders the stacked glass version used inside the homepage hero
  layout?: 'bar' | 'card';
}

export default function QuickSearchBar({ layout = 'bar' }: QuickSearchBarProps) {
  const t = useT();
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [program, setProgram] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = destinations.find((d) => d.name === destination);
    if (dest) {
      navigate(`/study-abroad/${dest.slug}`);
      return;
    }
    const service = services.find((s) => s.shortTitle === program);
    navigate(service ? `/services/${service.slug}` : '/contact');
  };

  const selectClass =
    layout === 'card'
      ? 'focus-ring w-full appearance-none rounded-full border border-white/20 bg-white/10 px-4 py-3 pr-9 text-sm font-medium text-white [&>option]:text-brand-950'
      : 'focus-ring w-full appearance-none rounded-full border border-brand-900/15 bg-paper px-4 py-2.5 pr-9 text-sm font-medium text-brand-900';
  const chevronClass = `pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${
    layout === 'card' ? 'text-white/70' : 'text-brand-500'
  }`;

  if (layout === 'card') {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3 rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        <p className="eyebrow text-gold-400">{t("Plan your move")}</p>
        <p className="font-display text-2xl font-semibold leading-tight text-white">{t("Where are you headed?")}</p>
        <label className="relative mt-1">
          <span className="sr-only">{t("Choose destination")}</span>
          <select value={destination} onChange={(e) => setDestination(e.target.value)} className={selectClass}>
            <option value="">{t("Select Country")}</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.name}>{t(d.name)}</option>
            ))}
          </select>
          <Icon name="chevron-down" className={chevronClass} />
        </label>
        <label className="relative">
          <span className="sr-only">{t("Choose program")}</span>
          <select value={program} onChange={(e) => setProgram(e.target.value)} className={selectClass}>
            <option value="">{t("Pick Your Program")}</option>
            {programOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <Icon name="chevron-down" className={chevronClass} />
        </label>
        <Button type="submit" variant="accent" className="mt-1 w-full" showArrow>
          {t("Send Request")}
        </Button>
      </form>
    );
  }

  return (
    <div className="relative z-10 mx-auto -mt-10 w-full max-w-4xl px-5 sm:-mt-14 sm:px-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-xl2 border border-brand-900/10 bg-white p-4 shadow-card-hover sm:flex-row sm:items-center sm:gap-2 sm:p-3"
      >
        <p className="hidden shrink-0 pl-2 text-xs font-semibold uppercase tracking-wide text-brand-500 sm:block">
          {t("Trusted by students across")} <span className="text-gold-700">{t("multiple destinations")}</span>
        </p>
        <label className="relative flex-1">
          <span className="sr-only">{t("Choose destination")}</span>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={selectClass}
          >
            <option value="">{t("Select Country")}</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.name}>{t(d.name)}</option>
            ))}
          </select>
          <Icon name="chevron-down" className={chevronClass} />
        </label>
        <label className="relative flex-1">
          <span className="sr-only">{t("Choose program")}</span>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className={selectClass}
          >
            <option value="">{t("Pick Your Program")}</option>
            {programOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <Icon name="chevron-down" className={chevronClass} />
        </label>
        <Button type="submit" variant="accent" className="sm:shrink-0">
          {t("Send Request")}
        </Button>
      </form>
    </div>
  );
}
