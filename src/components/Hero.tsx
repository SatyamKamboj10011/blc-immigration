import { ReactNode } from 'react';

interface HeroProps {
  eyebrow?: string;
  headline: ReactNode;
  supportingText?: string;
  image: string;
  imageAlt: string;
  actions?: ReactNode;
  compact?: boolean;
  stub?: boolean;
}

export default function Hero({ eyebrow, headline, supportingText, image, imageAlt, actions, compact, stub }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
      {/* Scrim only where the text sits, so the photo itself stays visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:bg-gradient-to-r sm:from-black/75 sm:via-black/45 sm:to-transparent" />
      <div className={`container-page relative flex flex-col gap-6 ${compact ? 'py-20 sm:py-24' : 'py-28 sm:py-40'}`}>
        {eyebrow && (
          <span className="eyebrow flex items-center gap-2 text-gold-400">
            <span className="h-px w-6 bg-gold-400" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
          {headline}
        </h1>
        {supportingText && (
          <p className="max-w-2xl text-lg leading-relaxed text-white/90">{supportingText}</p>
        )}
        {actions && <div className="mt-2 flex flex-wrap gap-4">{actions}</div>}
      </div>

      {stub && (
        <div className="pointer-events-none absolute bottom-0 right-0 hidden w-72 border-t border-l border-white/15 bg-black/45 px-6 py-5 backdrop-blur-sm lg:block">
          <p className="eyebrow text-gold-400/90">Boarding</p>
          <div className="mt-2 flex items-center gap-3 font-mono text-white">
            <span className="text-2xl font-semibold tracking-wider">LDW</span>
            <span className="h-px flex-1 bg-gold-400/50" aria-hidden="true" />
            <span className="text-2xl font-semibold tracking-wider">WLD</span>
          </div>
          <p className="mt-2 text-xs text-white/70">Ladwa, Haryana — study &amp; immigration guidance</p>
        </div>
      )}
    </section>
  );
}
