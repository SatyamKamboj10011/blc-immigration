import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';
  return (
    <Reveal className={`flex flex-col gap-3 ${alignClass} max-w-2xl`}>
      {eyebrow && (
        <span className={`eyebrow flex items-center gap-2 ${light ? 'text-gold-300' : 'text-gold-600'}`}>
          <span className={`h-px w-6 ${light ? 'bg-gold-300' : 'bg-gold-600'}`} aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl font-semibold leading-[1.1] tracking-tight ${
          light ? 'text-white' : 'text-brand-950'
        }`}
      >
        {heading}
      </h2>
      {description && (
        <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-brand-100' : 'text-brand-800/75'}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
