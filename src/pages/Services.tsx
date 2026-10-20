import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import { services } from '../data/site';
import { useT } from '../i18n';

export default function Services() {
  const t = useT();
  return (
    <Layout
      title={t("Services | Blossom Learning Centre")}
      description={t("Explore BLC's services: student visa guidance, immigration consultancy, IELTS, PTE and spoken English preparation.")}
    >
      <Hero
        eyebrow={t("Our Services")}
        headline={t("Support Across Every Step of Your Journey")}
        supportingText={t("From visa documentation to English-language preparation, BLC offers structured, honest guidance tailored to your goals.")}
        image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80"
        imageAlt={t("Student preparing application documents")}
        compact
      />
      <Breadcrumbs items={[{ label: 'Services' }]} />

      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow={t("What We Offer")} heading={t("How We Can Help")} align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} title={t(s.shortTitle)} description={t(s.summary)} to={`/services/${s.slug}`} icon={s.icon} />
            ))}
          </div>
        </div>
      </section>

      <CTASection headline={t("Not Sure Where to Start?")} text={t("Book a consultation and we'll help you find the right path forward.")}>
        <Button to="/contact" variant="accent">{t("Book a Consultation")}</Button>
      </CTASection>
    </Layout>
  );
}
