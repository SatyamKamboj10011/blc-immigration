import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import BackgroundVideo, { destinationVideos } from './BackgroundVideo';
import { destinations } from '../data/site';
import { useT } from '../i18n';

// Vertical scroll drives a pinned horizontal track of destination cards on desktop;
// on small screens it falls back to a swipeable row.
export default function DestinationScroller() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const pinned = window.matchMedia('(min-width: 1024px)').matches;
      setDistance(pinned ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progress = useTransform(smooth, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="relative bg-paper lg:h-[320vh]">
      <div className="flex flex-col gap-10 overflow-hidden py-16 sm:py-20 lg:sticky lg:top-0 lg:h-screen lg:justify-center lg:py-0">
        <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t("Study Abroad")}
            heading={t("Find your perfect destination.")}
            description={t("Explore popular study destinations — each offering recognised institutions and real career opportunities.")}
          />
          <div className="hidden w-48 shrink-0 flex-col gap-2 lg:flex">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-900/50">{t("Keep scrolling")}</span>
            <div className="h-1 w-full overflow-hidden rounded-full bg-brand-900/10">
              <motion.div className="h-full rounded-full bg-gold-500" style={{ width: progress }} />
            </div>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-8 lg:w-max lg:overflow-visible lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pb-0"
        >
          {destinations.map((d, i) => (
            <DestinationPanel key={d.slug} index={i} name={t(d.name)} summary={t(d.summary)} image={d.image} slug={d.slug} />
          ))}
          <Link
            to="/study-abroad"
            className="focus-ring group flex h-[26rem] w-[80vw] shrink-0 snap-start flex-col items-start justify-end gap-4 rounded-[2rem] bg-brand-900 p-8 text-white sm:w-[22rem] lg:h-[32rem]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-brand-950 transition-transform duration-500 group-hover:rotate-[-45deg] group-hover:scale-110">
              <Icon name="arrow" className="h-7 w-7" />
            </span>
            <span className="font-display text-3xl font-semibold leading-none">{t("Compare all destinations")}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

interface PanelProps {
  index: number;
  name: string;
  summary: string;
  image: string;
  slug: string;
}

function DestinationPanel({ index, name, summary, image, slug }: PanelProps) {
  const t = useT();
  return (
    <Link
      to={`/study-abroad/${slug}`}
      className="focus-ring group relative flex h-[26rem] w-[80vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[2rem] sm:w-[30rem] lg:h-[32rem] lg:w-[38rem]"
    >
      <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-110">
        <BackgroundVideo name={destinationVideos[slug]} poster={image} className="h-full w-full" />
      </div>
      <span className="sr-only">{`Video of ${name}`}</span>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
      <span className="absolute right-6 top-6 font-display text-7xl font-semibold text-white/20 transition-colors duration-500 group-hover:text-gold-500/60">
        0{index + 1}
      </span>
      <div className="relative flex flex-col gap-2 p-8 text-white">
        <h3 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{name}</h3>
        <p className="max-w-sm text-sm text-white/80">{summary}</p>
        <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-brand-950">
          {t('Explore {country}', { country: name })}
          <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
