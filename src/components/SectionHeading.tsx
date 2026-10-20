import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  // heading on the left, description pushed to the right on wide screens
  split?: boolean;
}

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = 'left',
  light = false,
  split = false,
}: SectionHeadingProps) {
  const eyebrowEl = eyebrow && (
    <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${light ? 'text-gold-400' : 'text-brand-600'}`}>
      {eyebrow}
    </span>
  );
  const headingEl = (
    <h2
      className={`font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem] ${
        light ? 'text-white' : 'text-brand-950'
      }`}
    >
      {heading}
    </h2>
  );
  const descriptionEl = description && (
    <p className={`text-base leading-relaxed sm:text-lg ${light ? 'text-brand-100' : 'text-brand-900/60'}`}>{description}</p>
  );

  if (split) {
    return (
      <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="flex max-w-3xl flex-col gap-4">
          {eyebrowEl}
          {headingEl}
        </div>
        {description && <div className="max-w-sm lg:pb-2">{descriptionEl}</div>}
      </Reveal>
    );
  }

  const alignClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignClass}`}>
      {eyebrowEl}
      {headingEl}
      {descriptionEl}
    </Reveal>
  );
}
