import { Navigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { services } from '../data/site';

const heroImages: Record<string, string> = {
  'student-visa': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
  immigration: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=1600&q=80',
  ielts: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80',
  pte: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
  'spoken-english': 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1600&q=80',
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <Layout
      title={`${service.title} | Blossom Learning Centre`}
      description={service.summary}
    >
      <Hero
        eyebrow="Services"
        headline={service.title}
        supportingText={service.heroText}
        image={heroImages[service.slug]}
        imageAlt={`${service.title} guidance session`}
        compact
      />
      <Breadcrumbs items={[{ label: 'Services', to: '/services' }, { label: service.shortTitle }]} />

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Overview" heading="Introduction" />
            <p className="text-base leading-relaxed text-brand-800/80">{service.intro}</p>
          </div>
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Is This For You" heading="Who It Is For" />
            <ul className="flex flex-col gap-3">
              {service.whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-sm leading-relaxed text-brand-800/85">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-20">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow="Support" heading="How BLC Helps" align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.howWeHelp.map((item) => (
              <div key={item} className="flex flex-col gap-3 rounded-xl2 border border-brand-900/10 bg-white p-5 shadow-card">
                <Icon name="compass" className="h-6 w-6 text-brand-600" />
                <p className="text-sm leading-relaxed text-brand-800/85">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow="Process" heading="How It Works" align="center" />
          <ol className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {service.process.map((step, i) => (
              <li key={step} className="flex items-start gap-4 rounded-xl2 border border-brand-900/10 bg-white p-5 shadow-card">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-800 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-brand-800/85">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper-dim py-20">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow="FAQ" heading="Frequently Asked Questions" align="center" />
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl2 border border-brand-900/10 bg-white p-5 shadow-card">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-brand-950">
                  {faq.q}
                  <Icon name="arrow" className="h-4 w-4 shrink-0 rotate-90 text-brand-600 transition-transform group-open:rotate-[-90deg]" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-brand-800/80">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Ready to Take the Next Step?" text="Book a consultation to discuss your goals with the BLC team.">
        <Button to="/contact" variant="accent">Book a Consultation</Button>
        <Button to="/services" variant="ghost">View All Services</Button>
      </CTASection>
    </Layout>
  );
}
