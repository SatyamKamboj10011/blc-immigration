import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import { services } from '../data/site';

export default function Services() {
  return (
    <Layout
      title="Services | Blossom Learning Centre"
      description="Explore BLC's services: student visa guidance, immigration consultancy, IELTS, PTE and spoken English preparation."
    >
      <Hero
        eyebrow="Our Services"
        headline="Support Across Every Step of Your Journey"
        supportingText="From visa documentation to English-language preparation, BLC offers structured, honest guidance tailored to your goals."
        image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Student preparing application documents"
        compact
      />
      <Breadcrumbs items={[{ label: 'Services' }]} />

      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="What We Offer" heading="How We Can Help" align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} title={s.shortTitle} description={s.summary} to={`/services/${s.slug}`} icon={s.icon} />
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Not Sure Where to Start?" text="Book a consultation and we'll help you find the right path forward.">
        <Button to="/contact" variant="accent">Book a Consultation</Button>
      </CTASection>
    </Layout>
  );
}
