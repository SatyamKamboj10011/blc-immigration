import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import DestinationCard from '../components/DestinationCard';
import DestinationCompare from '../components/DestinationCompare';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import { destinations } from '../data/site';

export default function StudyAbroad() {
  return (
    <Layout
      title="Study Abroad | Blossom Learning Centre"
      description="Explore and compare study abroad destinations with BLC, including Australia, the United Kingdom, New Zealand and Canada."
    >
      <Hero
        eyebrow="Study Abroad"
        headline="Explore Your Study Abroad Options"
        supportingText="BLC helps students explore courses and institutions across several popular study destinations, and provides guidance through each step of the application process."
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Students exploring study abroad options"
        compact
      />
      <Breadcrumbs items={[{ label: 'Study Abroad' }]} />

      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="Destinations" heading="Where Would You Like to Study?" align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <DestinationCard key={d.slug} name={d.name} description={d.summary} image={d.image} to={`/study-abroad/${d.slug}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow="Side by Side" heading="Compare Destinations" align="center" />
          <DestinationCompare />
        </div>
      </section>

      <CTASection headline="Not Sure Which Destination Fits You?" text="Book a consultation and we'll help you weigh your options.">
        <Button to="/contact" variant="accent">Book a Consultation</Button>
      </CTASection>
    </Layout>
  );
}
