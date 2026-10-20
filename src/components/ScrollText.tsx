import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';

interface ScrollTextProps {
  text: string;
  // words to paint brand green once lit
  highlight?: string[];
}

// A large statement whose words light up one by one as it scrolls through the viewport.
export default function ScrollText({ text, highlight = [] }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-[0.28em] text-center font-display text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          gold={highlight.includes(word.replace(/[^\w]/g, ''))}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  gold,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  gold: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span aria-hidden="true" style={{ opacity }} className={gold ? 'text-brand-500' : 'text-brand-950'}>
      {children}
    </motion.span>
  );
}
