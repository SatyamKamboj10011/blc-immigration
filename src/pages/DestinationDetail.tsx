import { Navigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import { destinationVideos } from '../components/BackgroundVideo';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { destinations } from '../data/site';
import { useT } from '../i18n';

export default function DestinationDetail() {
  const t = useT();
  const { slug } = useParams();
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) return <Navigate to="/study-abroad" replace />;

  return (
    <Layout
      title={`${t('Study in {country}', { country: t(destination.name) })} | Blossom Learning Centre`}
      description={t(destination.summary)}
    >
      <Hero
        eyebrow={t("Study Abroad")}
        headline={t('Study in {country}', { country: t(destination.name) })}
        supportingText={t(destination.intro)}
        image={destination.image}
        imageAlt={`Study destination: ${t(destination.name)}`}
        video={destinationVideos[destination.slug]}
        compact
      />
      <Breadcrumbs items={[{ label: 'Study Abroad', to: '/study-abroad' }, { label: destination.name }]} />

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow={t("Why Consider It")} heading={t('Why Students Consider {country}', { country: t(destination.name) })} />
            <ul className="flex flex-col gap-3">
              {destination.whyConsider.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-sm leading-relaxed text-brand-800/85">{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow={t("Options")} heading={t("Study Options")} />
            <ul className="flex flex-col gap-3">
              {destination.studyOptions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="book" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-sm leading-relaxed text-brand-800/85">{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-20">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow={t("Support")} heading={t("How BLC Supports You")} align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destination.support.map((item) => (
              <div key={item} className="flex flex-col gap-3 rounded-xl2 border border-brand-900/10 bg-white p-5 shadow-card">
                <Icon name="compass" className="h-6 w-6 text-brand-600" />
                <p className="text-sm leading-relaxed text-brand-800/85">{t(item)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow={t("Process")} heading={t("Application Process")} align="center" />
          <ol className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {destination.applicationProcess.map((step, i) => (
              <li key={step} className="flex items-start gap-4 rounded-xl2 border border-brand-900/10 bg-white p-5 shadow-card">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-800 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-brand-800/85">{t(step)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper-dim py-20">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow={t("FAQ")} heading={t("Frequently Asked Questions")} align="center" />
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
            {destination.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl2 border border-brand-900/10 bg-white p-5 shadow-card">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-brand-950">
                  {t(faq.q)}
                  <Icon name="arrow" className="h-4 w-4 shrink-0 rotate-90 text-brand-600 transition-transform group-open:rotate-[-90deg]" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-brand-800/80">{t(faq.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline={t('Ready to Explore Studying in {country}?', { country: t(destination.name) })} text={t("Book a consultation to discuss your options with the BLC team.")}>
        <Button to="/contact" variant="accent">{t("Book a Consultation")}</Button>
        <Button to="/study-abroad" variant="ghost">{t("View All Destinations")}</Button>
      </CTASection>
    </Layout>
  );
}
