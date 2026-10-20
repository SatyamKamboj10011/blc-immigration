import { motion } from 'motion/react';
import { destinations } from '../data/site';
import { useT } from '../i18n';

const items = [
  { label: 'Based in', value: 'Ladwa, Haryana' },
  { label: 'Study destinations', value: '{count} countries' },
  { label: 'English programs', value: 'IELTS · PTE · Spoken' },
  { label: 'First consultation', value: 'Free, one-to-one' },
];

// White strip of quick facts directly under the dark hero.
export default function HeroStats() {
  const t = useT();
  return (
    <section className="border-b border-brand-950/10 bg-white">
      <div className="container-page grid grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className={`relative flex flex-col gap-1.5 py-7 pr-4 sm:py-9 ${i % 2 === 1 ? 'pl-5 sm:pl-8' : ''} ${
              i > 0 ? 'lg:border-l lg:border-brand-950/10 lg:pl-8' : ''
            } ${i < 2 ? 'border-b border-brand-950/10 lg:border-b-0' : ''} ${i % 2 === 1 ? 'border-l border-brand-950/10' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
          >
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand-900/50">{t(item.label)}</span>
            <span className="text-lg font-semibold tracking-[-0.02em] text-brand-950 sm:text-2xl">{t(item.value, { count: destinations.length })}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
