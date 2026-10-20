import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import DestinationCard from '../components/DestinationCard';
import { destinationVideos } from '../components/BackgroundVideo';
import DestinationCompare from '../components/DestinationCompare';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import { destinations } from '../data/site';
import { useT } from '../i18n';

export default function StudyAbroad() {
  const t = useT();
  return (
    <Layout
      title={t("Study Abroad | Blossom Learning Centre")}
      description={t("Explore and compare study abroad destinations with BLC, including Australia, the United Kingdom, New Zealand and Canada.")}
    >
      <Hero
        eyebrow={t("Study Abroad")}
        headline={t("Explore Your Study Abroad Options")}
        supportingText={t("BLC helps students explore courses and institutions across several popular study destinations, and provides guidance through each step of the application process.")}
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80"
        imageAlt={t("Students exploring study abroad options")}
        video="campus"
        compact
      />
      <Breadcrumbs items={[{ label: 'Study Abroad' }]} />

      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow={t("Destinations")} heading={t("Where Would You Like to Study?")} align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <DestinationCard key={d.slug} name={t(d.name)} description={t(d.summary)} image={d.image} to={`/study-abroad/${d.slug}`} video={destinationVideos[d.slug]} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow={t("Side by Side")} heading={t("Compare Destinations")} align="center" />
          <DestinationCompare />
        </div>
      </section>

      <CTASection headline={t("Not Sure Which Destination Fits You?")} text={t("Book a consultation and we'll help you weigh your options.")}>
        <Button to="/contact" variant="accent">{t("Book a Consultation")}</Button>
      </CTASection>
    </Layout>
  );
}
