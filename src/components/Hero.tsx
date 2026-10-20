import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import BackgroundVideo from './BackgroundVideo';

interface HeroProps {
  eyebrow?: string;
  headline: ReactNode;
  supportingText?: string;
  image: string;
  imageAlt: string;
  actions?: ReactNode;
  compact?: boolean;
  // optional looping background clip from /public/videos, played over the image
  video?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, ease, delay },
});

export default function Hero({ eyebrow, headline, supportingText, image, imageAlt, actions, compact, video }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute -right-24 top-16 h-[26rem] w-[26rem] rounded-[42%_58%_63%_37%/45%_40%_60%_55%] bg-brand-700/10 sm:h-[34rem] sm:w-[34rem]"
        style={{ rotate: blobRotate }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease, delay: 0.3 }}
        aria-hidden="true"
      />
      <div className={`container-page relative grid items-center gap-10 lg:grid-cols-2 ${compact ? 'py-16 sm:py-20' : 'py-16 sm:py-24'}`}>
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          {eyebrow && (
            <motion.span className="eyebrow flex items-center gap-2 text-brand-600" {...rise(0.45)}>
              <motion.span
                className="h-px w-6 origin-left bg-brand-600"
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease, delay: 0.6 }}
              />
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            className="max-w-xl font-serif text-[2.8rem] font-medium leading-[1] tracking-[-0.02em] text-brand-950 sm:text-6xl lg:text-[4.2rem]"
            {...rise(0.55)}
          >
            {headline}
          </motion.h1>
          {supportingText && (
            <motion.p className="max-w-lg text-base leading-relaxed text-brand-900/65 sm:text-lg" {...rise(0.7)}>
              {supportingText}
            </motion.p>
          )}
          {actions && (
            <motion.div className="mt-2 flex flex-wrap gap-4" {...rise(0.85)}>
              {actions}
            </motion.div>
          )}
        </div>

        <div className="relative order-1 flex justify-center lg:order-2">
          <motion.div
            className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-brand-700/10 sm:aspect-[5/5] sm:max-w-lg"
            initial={{ clipPath: 'inset(15% 15% 15% 15% round 2rem)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}
            transition={{ duration: 1.3, ease, delay: 0.4 }}
          >
            {video ? (
              <motion.div
                className="h-[120%] w-full"
                style={{ y: imageY }}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease, delay: 0.4 }}
              >
                <BackgroundVideo name={video} poster={image} className="h-full w-full" />
                <span className="sr-only">{imageAlt}</span>
              </motion.div>
            ) : (
              <motion.img
                src={image}
                alt={imageAlt}
                className="h-[120%] w-full object-cover"
                loading="eager"
                style={{ y: imageY }}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease, delay: 0.4 }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
