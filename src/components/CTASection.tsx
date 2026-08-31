import { ReactNode } from 'react';

interface CTASectionProps {
  headline: string;
  text?: string;
  children: ReactNode;
}

export default function CTASection({ headline, text, children }: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div
        className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold-500/10"
        aria-hidden="true"
      />
      <div className="container-page relative flex flex-col items-center gap-6 py-16 text-center sm:py-20">
        <h2 className="max-w-2xl font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">{headline}</h2>
        {text && <p className="max-w-xl text-lg text-brand-100">{text}</p>}
        <div className="flex flex-wrap justify-center gap-4">{children}</div>
      </div>
    </section>
  );
}
