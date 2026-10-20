import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import Button from './Button';
import QuickSearchBar from './QuickSearchBar';
import BackgroundVideo from './BackgroundVideo';
import { destinations } from '../data/site';
import { useT } from '../i18n';

const ease = [0.22, 1, 0.36, 1] as const;
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80';

// Each line slides up out of a clipping mask, one after another.
function MaskLine({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.12em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '115%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Cycles through the study destinations in the headline.
function RotatingDestination() {
  const t = useT();
  // short form keeps the line from overflowing on phones
  const names = destinations.map((d) => t(d.slug === 'uk' ? 'the UK' : d.name));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % names.length), 2600);
    return () => clearInterval(id);
  }, [names.length]);

  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={names[index]}
          className="inline-block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          {names[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function HomeHero() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const cardY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const glowX = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-brand-950 text-white">
      {/* layered glows and drawn rings behind the content */}
      <motion.div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 h-[42rem] w-[42rem] rounded-full bg-brand-600/40 blur-[120px]"
        style={{ x: glowX }}
      />
      <div aria-hidden="true" className="absolute -bottom-48 -left-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-[120px]" />
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full opacity-[0.08]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <motion.circle
          cx="1180" cy="980" r="620" stroke="white" strokeWidth="1.2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease, delay: 0.8 }}
        />
        <motion.circle
          cx="1180" cy="980" r="460" stroke="white" strokeWidth="1.2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease, delay: 1.1 }}
        />
      </svg>

      <div className="container-page grid items-center gap-14 pb-20 pt-32 sm:pt-40 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-28">
        <div className="flex flex-col gap-8">
          <motion.p
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-white/75 sm:text-[13px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.9 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
            </span>
            {t("Free first consultation")}
            <span className="text-white/30">/</span>
            {t("Ladwa, Kurukshetra, Haryana")}
          </motion.p>

          <h1 className="font-serif text-[3.1rem] font-medium leading-[0.98] tracking-[-0.02em] min-[400px]:text-[3.5rem] sm:text-7xl xl:text-[5.4rem]">
            <MaskLine delay={1.0}>{t("Your future")}</MaskLine>
            <MaskLine delay={1.12}>{t("abroad starts")}</MaskLine>
            <MaskLine delay={1.24} className="whitespace-nowrap italic text-gold-500">
              {(() => {
                const [before, after = ''] = t('in {country}.').split('{country}');
                return (
                  <>
                    {before}
                    <RotatingDestination />
                    {after}
                  </>
                );
              })()}
            </MaskLine>
          </h1>

          <motion.p
            className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.45 }}
          >
            {t("From choosing the right destination to securing your visa, BLC helps you achieve your international education dream with personalised support and expert advice.")}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.6 }}
          >
            <Button to="/contact" size="lg" variant="accent" showArrow>{t("Get free counselling")}</Button>
            <Button to="/study-abroad" size="lg" variant="ghost" showArrow>{t("Explore destinations")}</Button>
          </motion.div>
        </div>

        <motion.figure className="flex flex-col gap-3" style={{ y: cardY }}>
          <motion.div
            className="relative h-[32rem] overflow-hidden rounded-[2rem] border border-white/10 sm:h-[36rem]"
            initial={{ clipPath: 'inset(12% 12% 12% 12% round 2rem)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)', opacity: 1 }}
            transition={{ duration: 1.4, ease, delay: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 h-[115%] w-full"
              style={{ y: imageY }}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease, delay: 0.9 }}
            >
              <BackgroundVideo name="campus" poster={HERO_IMAGE} className="h-full w-full" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/10 to-transparent" />
            <motion.div
              className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 1.8 }}
            >
              <QuickSearchBar layout="card" />
            </motion.div>
          </motion.div>
          <motion.figcaption
            className="flex justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <span>{t("Australia / UK / NZ / Canada")}</span>
            <span className="text-right">{t("Study abroad guidance")}</span>
          </motion.figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
