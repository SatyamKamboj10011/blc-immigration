import { useState } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { examStrategies, legalUpdatedOn } from '../data/site';

export default function ExamStrategies() {
  const [active, setActive] = useState<'IELTS' | 'PTE'>('IELTS');
  const guide = examStrategies.find((g) => g.exam === active)!;

  return (
    <Layout
      title="IELTS & PTE Exam Strategies | Blossom Learning Centre"
      description="Practical, module-by-module IELTS and PTE exam strategies from Blossom Learning Centre — updated guidance to help you prepare with confidence."
    >
      <Hero
        eyebrow="Study Resources"
        headline="IELTS & PTE Exam Strategy Guide"
        supportingText="Practical, module-by-module techniques our students use to prepare — updated as we refine our teaching approach. This complements structured practice; it isn't a substitute for it."
        image="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Student studying with notes and a laptop"
        compact
      />
      <Breadcrumbs items={[{ label: 'Exam Strategies' }]} />

      <section className="py-16 sm:py-20">
        <div className="container-page flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="eyebrow text-gold-700">Last updated: {legalUpdatedOn}</p>
            <SectionHeading heading="Choose an Exam" />
          </div>

          <div className="flex gap-3">
            {examStrategies.map((g) => (
              <button
                key={g.exam}
                type="button"
                onClick={() => setActive(g.exam)}
                className={`focus-ring rounded-full border-2 px-6 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                  active === g.exam
                    ? 'border-gold-500 bg-gold-500 text-brand-950'
                    : 'border-brand-900/15 text-brand-700 hover:border-brand-900/30'
                }`}
              >
                {g.exam}
              </button>
            ))}
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-brand-500">{guide.summary}</p>

          <div className="grid gap-6 sm:grid-cols-2">
            {guide.modules.map((m) => (
              <div key={m.module} className="flex flex-col gap-4 rounded-xl2 border border-brand-900/10 bg-white p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-brand-950">
                    <Icon name={m.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-brand-950">{m.module}</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {m.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-800/85">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-950">
        <div className="container-page relative flex flex-col items-center gap-8 py-16 text-center sm:py-20">
          <SectionHeading
            light
            align="center"
            eyebrow="Want the Full Picture?"
            heading="These Tips Work Best With Structured Practice"
            description="Book a free assessment and we'll build a realistic study plan around your target score and timeline."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="accent">Book a Free Assessment</Button>
            <Button to={active === 'PTE' ? '/services/pte' : '/services/ielts'} variant="ghost">
              {active === 'PTE' ? 'Explore PTE Program' : 'Explore IELTS Program'}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
