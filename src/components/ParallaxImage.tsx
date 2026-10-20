import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

// Image that drifts inside its frame while scrolling and wipes in from the bottom on first view.
export default function ParallaxImage({ src, alt, className = '' }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  // observe the unclipped wrapper — a fully clip-pathed element never counts as intersecting
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[inherit]"
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ y, scale: 1.25 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
