import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { whyChooseBLC, aboutContent, siteInfo, leadership } from '../data/site';
import { useT } from '../i18n';

export default function About() {
  const t = useT();
  return (
    <Layout
      title={t("About Us | Blossom Learning Centre")}
      description={t("Learn about Blossom Learning Centre (BLC), an education and immigration consultancy in Ladwa, Haryana supporting students with study abroad and English-language preparation.")}
    >
      <Hero
        eyebrow={t("About BLC")}
        headline={t("Guidance You Can Trust, Every Step of the Way")}
        supportingText={t(aboutContent.who)}
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
        imageAlt={t("Consultant discussing study plans with a student")}
        compact
      />
      <Breadcrumbs items={[{ label: 'About' }]} />

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow={t("Who We Are")} heading={t("Supporting Students in Ladwa and Beyond")} />
            <p className="text-base leading-relaxed text-brand-800/80">{t(aboutContent.who)}</p>
            <p className="text-base leading-relaxed text-brand-800/80">{t(aboutContent.who2)}</p>
          </div>
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow={t("What We Do")} heading={t("Guidance Across Your Whole Journey")} />
            <p className="text-base leading-relaxed text-brand-800/80">{t(aboutContent.what)}</p>
            <p className="text-base leading-relaxed text-brand-800/80">{t(aboutContent.how)}</p>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow={t("Why BLC")} heading={t("What Sets BLC Apart")} align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseBLC.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={t(f.title)} description={t(f.description)} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow={t("Leadership")} heading={t("Meet the Directors")} align="center" />
          <div className="mx-auto grid w-full max-w-2xl gap-6 sm:grid-cols-2">
            {leadership.map((person) => (
              <div key={person.name} className="flex flex-col items-center gap-3 rounded-xl2 border border-brand-900/10 bg-white p-6 text-center shadow-card">
                {person.photo ? (
                  <img src={person.photo} alt={t(person.name)} className="h-20 w-20 rounded-full object-cover" />
                ) : (
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-950 font-display text-2xl font-semibold text-gold-500">
                    {person.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                )}
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-[-0.03em] text-brand-950">{t(person.name)}</h3>
                  <p className="eyebrow text-gold-700">{t(person.title)}</p>
                </div>
                <a href={person.phoneHref} className="focus-ring flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900">
                  <Icon name="phone" className="h-4 w-4" />
                  {person.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <img
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80"
            alt={t("BLC team supporting a group of students")}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-xl2 object-cover shadow-card"
          />
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow={t("Where We Are")} heading={t("Based in Ladwa, Haryana")} />
            <p className="text-base leading-relaxed text-brand-800/80">
              {siteInfo.addressLine}. We welcome students and families to reach out with any questions about
              study abroad, visas, immigration guidance, or English-language preparation.
            </p>
          </div>
        </div>
      </section>

      <CTASection headline={t("Ready to Start Your Journey?")} text={t("Speak with the BLC team about your study and overseas education options.")}>
        <Button to="/contact" variant="accent">{t("Book a Consultation")}</Button>
        <Button to="/contact" variant="ghost">{t("Contact Us")}</Button>
      </CTASection>
    </Layout>
  );
}
