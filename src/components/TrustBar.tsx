import { useEffect, useRef } from 'react';
import { animate, motion, useInView } from 'motion/react';
import { destinations, services } from '../data/site';

const englishProgramCount = services.filter((s) => ['ielts', 'pte', 'spoken-english'].includes(s.slug)).length;

const stats = [
  { value: destinations.length, suffix: '', label: 'Study Destinations' },
  { value: englishProgramCount, suffix: '', label: 'English Programs' },
  { value: services.length, suffix: '', label: 'Services Offered' },
  { value: 100, suffix: '%', label: 'Personalised Guidance' },
];

// Counts up from zero the first time it scrolls into view.
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span ref={ref} className="font-display text-5xl font-semibold tabular-nums text-gold-500 lg:text-6xl">
      {value}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
        animate={{ x: [0, 600, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="container-page relative grid grid-cols-2 gap-8 py-14 lg:grid-cols-4 lg:py-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={`flex flex-col items-center text-center ${i !== 0 ? 'lg:border-l lg:border-white/10' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <CountUp value={stat.value} suffix={stat.suffix} />
            <span className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/60">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
