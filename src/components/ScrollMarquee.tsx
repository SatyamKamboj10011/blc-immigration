import { destinations } from '../data/site';
import { useT } from '../i18n';

// Slim, endlessly scrolling ribbon of destinations and programs.
export default function ScrollMarquee() {
  const t = useT();
  const words = [...destinations.map((d) => d.name), 'IELTS', 'PTE', 'Student Visa', 'Spoken English'].map((w) => t(w));
  // two identical halves so the -50% loop is seamless
  const half = [...words, ...words];

  return (
    <section aria-hidden="true" className="overflow-hidden border-y border-brand-950/10 bg-white py-5">
      <div className="flex w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {[...half, ...half].map((w, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 text-sm font-semibold uppercase tracking-[0.2em] text-brand-900/70">
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          </span>
        ))}
      </div>
    </section>
  );
}
