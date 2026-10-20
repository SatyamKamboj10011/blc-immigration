import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { homeServiceCards, services } from '../data/site';
import { useT } from '../i18n';

// Bento layout: on desktop the rows are [wide, 1, 1] then [1, 1, wide].
const spans = ['lg:col-span-2', '', '', '', '', 'lg:col-span-2'];

export default function WaysIn() {
  const t = useT();
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <div className="container-page flex flex-col gap-12 sm:gap-16">
        <SectionHeading
          heading={t("One goal. Six ways in.")}
          description={t("Start with the question in front of you — a visa, a destination or an English test. Each path connects to the rest of your plan.")}
          split
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeServiceCards.map((card, i) => {
            const featured = i === 0;
            const to = 'isStudyAbroad' in card && card.isStudyAbroad ? '/study-abroad' : `/services/${card.slug}`;
            const icon = services.find((s) => s.slug === card.slug)?.icon ?? 'map';
            return (
              <motion.div
                key={card.slug}
                className={spans[i]}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
              >
                <Link
                  to={to}
                  className={`focus-ring group relative flex h-full min-h-[17rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-500 hover:-translate-y-1 sm:p-8 ${
                    featured
                      ? 'border-transparent bg-brand-950 text-white'
                      : 'border-brand-950/10 bg-white text-brand-950 hover:border-brand-950/25 hover:shadow-[0_24px_60px_rgba(0,23,16,0.10)]'
                  }`}
                >
                  {featured && (
                    <>
                      <span aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-600/40 blur-3xl" />
                      <span aria-hidden="true" className="absolute -bottom-40 -right-16 h-80 w-80 rounded-full border border-white/10" />
                    </>
                  )}
                  <div className="relative flex items-start justify-between">
                    <span className={`text-xs font-semibold ${featured ? 'text-gold-500' : 'text-brand-900/45'}`}>0{i + 1}</span>
                    <Icon
                      name={icon}
                      className={`h-6 w-6 transition-transform duration-500 group-hover:rotate-12 ${featured ? 'text-gold-500' : 'text-brand-600'}`}
                    />
                  </div>
                  <div className="relative mt-10 flex flex-col gap-3">
                    <h3 className={`font-semibold tracking-[-0.03em] ${featured || spans[i] ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-[1.7rem]'}`}>
                      {t(card.title)}
                    </h3>
                    <p className={`max-w-md text-sm leading-relaxed ${featured ? 'text-white/65' : 'text-brand-900/60'}`}>{t(card.description)}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                      {t("Explore")}
                      <Icon name="arrow" className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
