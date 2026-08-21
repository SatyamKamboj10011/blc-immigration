import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import { whyChooseBLC, aboutContent, siteInfo } from '../data/site';

export default function About() {
  return (
    <Layout
      title="About Us | Blossom Learning Centre"
      description="Learn about Blossom Learning Centre (BLC), an education and immigration consultancy in Ladwa, Haryana supporting students with study abroad and English-language preparation."
    >
      <Hero
        eyebrow="About BLC"
        headline="Guidance You Can Trust, Every Step of the Way"
        supportingText={aboutContent.who}
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Consultant discussing study plans with a student"
        compact
      />
      <Breadcrumbs items={[{ label: 'About' }]} />

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="Who We Are" heading="Supporting Students in Ladwa and Beyond" />
            <p className="text-base leading-relaxed text-brand-800/80">{aboutContent.who}</p>
            <p className="text-base leading-relaxed text-brand-800/80">{aboutContent.who2}</p>
          </div>
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="What We Do" heading="Guidance Across Your Whole Journey" />
            <p className="text-base leading-relaxed text-brand-800/80">{aboutContent.what}</p>
            <p className="text-base leading-relaxed text-brand-800/80">{aboutContent.how}</p>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="Why BLC" heading="What Sets BLC Apart" align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseBLC.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <img
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80"
            alt="BLC team supporting a group of students"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-xl2 object-cover shadow-card"
          />
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Where We Are" heading="Based in Ladwa, Haryana" />
            <p className="text-base leading-relaxed text-brand-800/80">
              {siteInfo.addressLine}. We welcome students and families to reach out with any questions about
              study abroad, visas, immigration guidance, or English-language preparation.
            </p>
          </div>
        </div>
      </section>

      <CTASection headline="Ready to Start Your Journey?" text="Speak with the BLC team about your study and overseas education options.">
        <Button to="/contact" variant="accent">Book a Consultation</Button>
        <Button to="/contact" variant="ghost">Contact Us</Button>
      </CTASection>
    </Layout>
  );
}
