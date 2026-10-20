import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useScroll, useSpring } from 'motion/react';
import Button from './Button';
import BackgroundVideo from './BackgroundVideo';
import { destinations, services } from '../data/site';
import { useT } from '../i18n';

const englishProgramCount = services.filter((s) => ['ielts', 'pte', 'spoken-english'].includes(s.slug)).length;

const stats = [
  { value: destinations.length, suffix: '', title: 'Study destinations', note: 'Australia, the UK, New Zealand and Canada.' },
  { value: englishProgramCount, suffix: '', title: 'English programs', note: 'IELTS, PTE and Spoken English preparation.' },
  { value: 100, suffix: '%', title: 'Personalised guidance', note: 'One-to-one advice based on your circumstances.' },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const t = useT();
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
    <span ref={ref} className="font-sans text-6xl font-semibold tracking-[-0.04em] text-gold-500 tabular-nums sm:text-7xl">
      {value}
      {suffix}
    </span>
  );
}

// Dark split section: statement on the left, big counted stats strung along a
// wavy line that draws itself as you scroll.
export default function ImpactSection() {
  const t = useT();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 60%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section className="relative isolate overflow-hidden bg-brand-950 text-white">
      <BackgroundVideo name="hero" className="absolute inset-0 -z-20 h-full w-full opacity-25" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-950/60" />
      <div aria-hidden="true" className="absolute -right-32 top-1/3 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-600/30 blur-[120px]" />
      <div className="container-page grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <div className="flex flex-col gap-6 lg:sticky lg:top-36 lg:self-start">
          <motion.h2
            className="font-serif text-5xl font-medium leading-[1] tracking-[-0.02em] sm:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("A clear plan.")}
            <br />
            <span className="italic text-gold-500">{t("A real path abroad.")}</span>
          </motion.h2>
          <p className="max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
            {t("From your first consultation to your first day on campus, BLC guides each step — destination, course, documents, application and English preparation.")}
          </p>
          <Button to="/about" variant="ghost" className="w-fit" showArrow>
            {t("Understand how we work")}
          </Button>
        </div>

        <div ref={listRef} className="relative pl-10 sm:pl-14">
          <svg aria-hidden="true" className="absolute left-0 top-0 h-full w-8" viewBox="0 0 32 600" preserveAspectRatio="none" fill="none">
            <path d="M16 0 C 2 100, 30 200, 16 300 S 2 500, 16 600" stroke="rgba(255,255,255,0.1)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <motion.path
              d="M16 0 C 2 100, 30 200, 16 300 S 2 500, 16 600"
              stroke="#FEF200"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: draw }}
            />
          </svg>
          {stats.map((s, i) => (
            <motion.div
              key={s.title}
              className={`flex flex-col gap-2 py-8 ${i !== stats.length - 1 ? 'border-b border-white/10' : ''}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-semibold text-white/40">0{i + 1}</span>
              <CountUp value={s.value} suffix={s.suffix} />
              <span className="text-lg font-semibold">{t(s.title)}</span>
              <span className="max-w-xs text-sm text-white/55">{t(s.note)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
