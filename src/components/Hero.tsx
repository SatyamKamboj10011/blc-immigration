import { ReactNode } from 'react';
import Icon from './Icon';

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
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -right-24 top-16 h-[26rem] w-[26rem] rounded-full bg-brand-700/10 sm:h-[34rem] sm:w-[34rem]"
        aria-hidden="true"
      />
      <div className={`container-page relative grid items-center gap-10 lg:grid-cols-2 ${compact ? 'py-16 sm:py-20' : 'py-16 sm:py-24'}`}>
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          {eyebrow && (
            <span className="eyebrow flex items-center gap-2 text-gold-700">
              <span className="h-px w-6 bg-gold-600" aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h1 className="max-w-xl font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-brand-950 sm:text-5xl lg:text-[3.4rem]">
            {headline}
          </h1>
          {supportingText && (
            <p className="max-w-lg text-base leading-relaxed text-brand-500">{supportingText}</p>
          )}
          {actions && <div className="mt-2 flex flex-wrap gap-4">{actions}</div>}
        </div>

        <div className="relative order-1 flex justify-center lg:order-2">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-full bg-brand-700/10 sm:max-w-lg">
            <img src={image} alt={imageAlt} className="h-full w-full object-cover" loading="eager" />
          </div>
          {stub && (
            <div className="absolute -bottom-2 left-0 hidden rounded-2xl border border-brand-900/10 bg-white px-5 py-4 shadow-card-hover sm:block">
              <p className="eyebrow text-gold-700">Guiding You To</p>
              <div className="mt-1 flex items-center gap-2 font-display text-lg font-extrabold text-brand-950">
                <span>LDW</span>
                <Icon name="arrow" className="h-4 w-4 text-gold-700" />
                <span>Abroad</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
