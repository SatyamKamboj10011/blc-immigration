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
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0 39px, rgba(199,154,62,0.6) 39px 40px)',
        }}
        aria-hidden="true"
      />
      <div className="container-page relative flex flex-col items-center gap-6 py-16 text-center sm:py-20">
        <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{headline}</h2>
        {text && <p className="max-w-xl text-lg text-brand-100">{text}</p>}
        <div className="flex flex-wrap justify-center gap-4">{children}</div>
      </div>
    </section>
  );
}
