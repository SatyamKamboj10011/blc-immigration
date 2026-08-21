import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import SuccessStoryCard from '../components/SuccessStoryCard';
import CTASection from '../components/CTASection';
import Button from '../components/Button';
import { successStories, testimonials } from '../data/site';

type Filter = 'all' | 'visa' | 'english';

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All Stories' },
  { key: 'visa', label: 'Visa Approvals' },
  { key: 'english', label: 'English Test Results' },
];

export default function SuccessStories() {
  const [filter, setFilter] = useState<Filter>('all');

  const items = useMemo(() => {
    if (filter === 'visa') return successStories;
    if (filter === 'english') return testimonials;
    return [...successStories, ...testimonials];
  }, [filter]);

  return (
    <Layout
      title="Success Stories | Blossom Learning Centre"
      description="Real student outcomes shared by Blossom Learning Centre (BLC) — visa approvals and PTE results, from BLC's own YouTube channel."
    >
      <Hero
        eyebrow="Success Stories"
        headline="Students We've Supported"
        supportingText="Real outcomes shared by BLC students on our YouTube channel — visa approvals and English test results, in their own words."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Graduating students celebrating together"
        compact
      />
      <Breadcrumbs items={[{ label: 'Success Stories' }]} />

      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow="Real Outcomes" heading="Browse Student Stories" align="center" />

          <div role="tablist" aria-label="Filter success stories" className="mx-auto flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`focus-ring rounded-sm border px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === f.key
                    ? 'border-brand-800 bg-brand-800 text-paper'
                    : 'border-brand-800/25 bg-white text-brand-800 hover:border-brand-800/60'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((s) => (
              <SuccessStoryCard key={s.youtubeId} {...s} />
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Ready to Start Your Own Journey?" text="Speak with the BLC team about your study and overseas education options.">
        <Button to="/contact" variant="accent">Book a Consultation</Button>
      </CTASection>
    </Layout>
  );
}
