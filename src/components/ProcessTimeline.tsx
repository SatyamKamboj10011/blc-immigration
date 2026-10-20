import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { processSteps } from '../data/site';
import { useT } from '../i18n';

export default function ProcessTimeline() {
  const t = useT();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="overflow-hidden rounded-xl2 border border-brand-900/15 bg-brand-950 shadow-card">
      <div className="flex items-center justify-between border-b border-white/10 bg-brand-900 px-5 py-3">
        <span className="eyebrow text-gold-500">{t("Journey Board")}</span>
        <span className="hidden items-center gap-2 font-mono text-[0.65rem] text-brand-300 sm:flex">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-gold-500"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          {t("STATUS: IN PROGRESS")}
        </span>
      </div>
      <ol ref={listRef} className="relative">
        {/* progress rail that fills as the list scrolls past */}
        <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-1 bg-white/5" />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-1 origin-top bg-gold-500"
          style={{ scaleY: fill }}
        />
        {processSteps.map((step, i) => (
          <motion.li
            key={step.number}
            className={`flex flex-col gap-1 px-5 py-5 sm:flex-row sm:items-center sm:gap-6 ${
              i !== processSteps.length - 1 ? 'border-b border-white/10' : ''
            }`}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-display text-sm font-semibold text-gold-500 sm:w-12">{step.number}</span>
            <span className="font-display text-base font-semibold tracking-[-0.03em] text-white sm:w-64 sm:shrink-0">
              {t(step.title)}
            </span>
            <span className="text-sm leading-relaxed text-brand-200">{t(step.description)}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
