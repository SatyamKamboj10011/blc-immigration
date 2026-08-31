import { useState } from 'react';
import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import Icon from '../components/Icon';
import SuccessStoryCard from '../components/SuccessStoryCard';
import { services, testimonials, ServiceSlug } from '../data/site';

const heroImages: Record<string, string> = {
  ielts: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  pte: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'spoken-english': 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80',
};

const englishSlugs: ServiceSlug[] = ['ielts', 'pte', 'spoken-english'];

export default function EnglishProgram({ slug }: { slug: ServiceSlug }) {
  const service = services.find((s) => s.slug === slug)!;
  const englishServices = services.filter((s) => englishSlugs.includes(s.slug));
  const relevantTestimonials = slug === 'pte' ? testimonials : testimonials.slice(0, 3);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Layout title={`${service.title} | Blossom Learning Centre`} description={service.summary}>
      {/* Hero */}
      <section className="bg-paper-dim">
        <div className="container-page flex flex-col gap-10 py-16 sm:py-20">
          <div className="flex flex-col gap-5">
            <span className="eyebrow flex items-center gap-2 text-gold-700">
              <span className="h-px w-6 bg-gold-600" aria-hidden="true" />
              English Language Preparation
            </span>
            <h1 className="max-w-2xl font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-brand-950 sm:text-5xl">
              <span className="text-brand-700">{service.shortTitle}</span> Preparation, Built Around Real Practice
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-brand-500">{service.heroText}</p>
            <div className="flex flex-wrap gap-4">
              <Button to="/contact" size="lg" variant="accent">Book a Free Assessment</Button>
              <Button to="#methodology" variant="secondary" size="lg">See Our Approach</Button>
            </div>
            <Button to="/exam-strategies" variant="secondary" showArrow className="w-fit">
              View {service.shortTitle} Exam Strategies
            </Button>
          </div>

          {/* Photo + stat card row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            <div className="relative overflow-hidden rounded-xl2 shadow-card lg:row-span-2">
              <img
                src={heroImages[slug]}
                alt={`${service.shortTitle} preparation session at BLC`}
                loading="eager"
                className="h-full min-h-[16rem] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white">
                Our {service.shortTitle} sessions focus on consistent, structured practice — not shortcuts.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3 rounded-xl2 bg-gold-500 p-6 text-brand-950 shadow-card">
              <div>
                <p className="font-display text-2xl font-black">4 / 4</p>
                <p className="text-xs font-semibold uppercase tracking-wide">Modules Covered Every Session</p>
              </div>
              <div>
                <p className="font-display text-2xl font-black">{service.process.length}-Step</p>
                <p className="text-xs font-semibold uppercase tracking-wide">Structured Preparation Plan</p>
              </div>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${relevantTestimonials[0]?.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group relative overflow-hidden rounded-xl2 shadow-card lg:col-span-2"
            >
              <img
                src={`https://img.youtube.com/vi/${relevantTestimonials[0]?.youtubeId}/hqdefault.jpg`}
                alt={`${relevantTestimonials[0]?.name} — ${relevantTestimonials[0]?.outcome}`}
                loading="lazy"
                className="h-full min-h-[9.5rem] w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-brand-950/35" />
              <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-950 shadow-md">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white">
                See how {relevantTestimonials[0]?.name} prepared with BLC — watch on YouTube
              </p>
            </a>

            <div className="flex flex-col justify-center gap-3 rounded-xl2 bg-brand-950 p-6 text-white shadow-card lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {relevantTestimonials.slice(0, 4).map((t) => (
                    <span
                      key={t.youtubeId}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-950 bg-gold-500 text-xs font-bold text-brand-950"
                    >
                      {t.name.charAt(0)}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-semibold">
                  Real results from {relevantTestimonials.length}+ students on our YouTube channel
                </p>
              </div>
              <Button href={`https://www.youtube.com/watch?v=${relevantTestimonials[0]?.youtubeId}`} variant="ghost" className="w-fit">
                View Results
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs items={[{ label: 'Services', to: '/services' }, { label: service.shortTitle }]} />

      {/* Methodology tabs */}
      <section id="methodology" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow="Our Approach" heading="How BLC Prepares You" />
          <div className="flex flex-wrap gap-3">
            {service.howWeHelp.map((step, i) => (
              <button
                key={step}
                type="button"
                onClick={() => setActiveStep(i)}
                className={`focus-ring rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                  activeStep === i
                    ? 'border-gold-500 bg-gold-500 text-brand-950'
                    : 'border-brand-900/15 text-brand-700 hover:border-brand-900/30'
                }`}
              >
                <span className="mr-1.5">{i + 1}</span>
                {step.split(' ').slice(0, 3).join(' ')}
              </button>
            ))}
          </div>
          <div className="grid items-center gap-8 rounded-xl2 border border-brand-900/10 bg-white p-6 shadow-card sm:p-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500 text-brand-950">
                <Icon name="clipboard" className="h-5 w-5" />
              </span>
              <p className="text-base leading-relaxed text-brand-800/85">{service.howWeHelp[activeStep]}</p>
            </div>
            <img
              src={heroImages[slug]}
              alt={`${service.shortTitle} practice session`}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl2 object-cover"
            />
          </div>
        </div>
      </section>

      {/* English programs — explore the others */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="English Programs" heading="Programs for Every Goal" align="center" />
          <div className="grid gap-6 sm:grid-cols-3">
            {englishServices.map((s) => (
              <div
                key={s.slug}
                className={`flex flex-col gap-4 rounded-xl2 border-2 p-6 shadow-card transition-all ${
                  s.slug === slug ? 'border-brand-950 bg-brand-950 text-white' : 'border-brand-900/10 bg-white'
                }`}
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    s.slug === slug ? 'bg-gold-500 text-brand-950' : 'bg-gold-500/90 text-brand-950'
                  }`}
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className={`font-display text-lg font-extrabold uppercase tracking-tight ${s.slug === slug ? 'text-white' : 'text-brand-950'}`}>
                  {s.shortTitle}
                </h3>
                <p className={`flex-1 text-sm leading-relaxed ${s.slug === slug ? 'text-brand-100' : 'text-brand-500'}`}>
                  {s.summary}
                </p>
                <Button
                  to={`/services/${s.slug}`}
                  variant={s.slug === slug ? 'accent' : 'secondary'}
                  className="w-fit"
                >
                  {s.slug === slug ? "You're Viewing This" : 'Explore'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Overview" heading="Introduction" description={service.intro} />
          </div>
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Is This For You" heading="Who It Is For" />
            <ul className="flex flex-col gap-3">
              {service.whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  <span className="text-sm leading-relaxed text-brand-800/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            eyebrow="Real Results"
            heading="Results Shared by Our Students"
            description="Genuine outcomes posted by BLC students on our YouTube channel — not paid endorsements."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relevantTestimonials.map((t) => (
              <SuccessStoryCard key={t.youtubeId} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow="FAQ" heading="Frequently Asked Questions" align="center" />
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl2 border border-brand-900/10 bg-white p-5 shadow-card">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-brand-950">
                  {faq.q}
                  <Icon name="arrow" className="h-4 w-4 shrink-0 rotate-90 text-gold-700 transition-transform group-open:rotate-[-90deg]" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-brand-800/80">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact band */}
      <section className="relative overflow-hidden bg-brand-950">
        <div className="container-page relative flex flex-col items-center gap-8 py-16 text-center sm:py-20">
          <SectionHeading
            light
            align="center"
            eyebrow="Get Started"
            heading={`Ready to Begin Your ${service.shortTitle} Preparation?`}
            description="Book a free assessment and we'll recommend a realistic study plan."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="accent">Book a Free Assessment</Button>
            <Button to="/services" variant="ghost">View All Services</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
