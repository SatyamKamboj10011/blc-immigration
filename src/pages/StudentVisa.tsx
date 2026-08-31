import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import Icon from '../components/Icon';
import SuccessStoryCard from '../components/SuccessStoryCard';
import { services, successStories, serviceFeatures } from '../data/site';

const service = services.find((s) => s.slug === 'student-visa')!;

export default function StudentVisa() {
  return (
    <Layout
      title={`${service.title} | Blossom Learning Centre`}
      description={service.summary}
    >
      {/* Hero — split headline + photo collage */}
      <section className="relative overflow-hidden bg-paper-dim">
        <div className="container-page relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="eyebrow flex items-center gap-2 text-gold-700">
              <span className="h-px w-6 bg-gold-600" aria-hidden="true" />
              Student Visa Guidance
            </span>
            <h1 className="max-w-lg font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-brand-950 sm:text-5xl">
              Clear, Honest Guidance for Your Student Visa
            </h1>
            <p className="max-w-md text-base leading-relaxed text-brand-500">{service.heroText}</p>
            <div className="flex flex-wrap gap-4">
              <Button to="/contact" size="lg" variant="accent">Schedule a Consultation</Button>
              <Button to="/services" variant="secondary" size="lg">All Services</Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <span
              className="pointer-events-none absolute -left-4 -top-4 h-10 w-10 rounded-full border-4 border-dotted border-gold-500/50"
              aria-hidden="true"
            />
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
              alt="Consultant reviewing a student's visa documents"
              loading="eager"
              className="aspect-[4/5] w-full rounded-xl2 object-cover shadow-card-hover"
            />
            <div className="absolute -bottom-8 -left-8 hidden w-48 overflow-hidden rounded-xl2 border-4 border-white shadow-card-hover sm:block">
              <div className="relative aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=800&q=80"
                  alt="Passport and travel documents ready for a student visa application"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-950/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat strip + service note, dark band like the reference */}
      <section className="bg-brand-950">
        <div className="container-page grid gap-8 py-10 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1.4fr] lg:gap-0 lg:py-0">
          {[
            { value: 'Free', label: 'Initial Consultation' },
            { value: service.process.length.toString(), label: 'Guided Application Steps' },
            { value: service.faqs.length.toString(), label: 'Common Questions Answered' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center gap-1 text-center lg:py-10">
              <span className="font-display text-3xl font-black text-gold-500">{stat.value}</span>
              <span className="text-sm font-semibold uppercase tracking-wide text-white/60">{stat.label}</span>
            </div>
          ))}
          <div className="flex flex-col justify-center gap-2 bg-brand-800 px-6 py-8 text-center lg:px-10 lg:py-10 lg:text-left">
            <h3 className="eyebrow text-gold-400">Student Visa Guidance</h3>
            <p className="text-sm leading-relaxed text-brand-100">
              Requirements vary widely by destination country — always confirm current rules with official government sources. BLC helps you prepare with confidence.
            </p>
          </div>
        </div>
      </section>

      <Breadcrumbs items={[{ label: 'Services', to: '/services' }, { label: service.shortTitle }]} />

      {/* Welcome / introduction */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80"
            alt="Student receiving guidance from a BLC consultant"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-xl2 object-cover shadow-card"
          />
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="About This Service" heading="Where Your Student Visa Journey Begins" description={service.intro} />
            <ul className="flex flex-col gap-3">
              {service.whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  <span className="text-sm leading-relaxed text-brand-800/85">{item}</span>
                </li>
              ))}
            </ul>
            <Button to="/contact" variant="secondary" className="w-fit" showArrow>Book a Consultation</Button>
          </div>
        </div>
      </section>

      {/* How BLC Helps */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="Support" heading="How BLC Helps" align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.howWeHelp.map((item) => (
              <div key={item} className="flex flex-col gap-3 rounded-xl2 border border-brand-900/10 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-brand-950">
                  <Icon name="compass" className="h-5 w-5" />
                </span>
                <p className="text-sm leading-relaxed text-brand-800/85">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="Process" heading="How It Works" align="center" />
          <ol className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {service.process.map((step, i) => (
              <li key={step} className="flex items-start gap-4 rounded-xl2 border border-brand-900/10 bg-white p-5 shadow-card">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-950 text-sm font-bold text-gold-500">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-brand-800/85">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="What You Get" heading="Every Consultation Includes" align="center" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceFeatures.map((f) => (
              <div key={f.title} className="flex items-start gap-3 rounded-xl2 border border-brand-900/10 bg-white p-5 shadow-card">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-brand-950">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-sm font-extrabold uppercase tracking-tight text-brand-950">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-500">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client outcomes — real video testimonials, matching the reference's "Our Clients" section */}
      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            eyebrow="Our Clients"
            heading="What Students Say About Their Student Visa Journey"
            description="Real visa outcomes shared by BLC students on our YouTube channel."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {successStories.map((s) => (
              <SuccessStoryCard key={s.youtubeId} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-10">
          <SectionHeading eyebrow="FAQ" heading="Frequently Asked Questions" align="center" />
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl2 border border-brand-900/10 bg-white p-5 shadow-card">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-brand-950">
                  {faq.q}
                  <Icon name="arrow" className="h-4 w-4 shrink-0 rotate-90 text-gold-700 transition-transform group-open:rotate-[-90deg]" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-brand-800/80">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact block */}
      <section className="relative overflow-hidden bg-brand-950">
        <div className="container-page relative flex flex-col items-center gap-8 py-16 text-center sm:py-20">
          <SectionHeading
            light
            align="center"
            eyebrow="Get In Touch"
            heading="Our Team Is Ready to Help With Your Student Visa"
            description="Reach out with questions about documentation, timelines or your specific destination."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="accent">Book a Consultation</Button>
            <Button to="/services" variant="ghost">View All Services</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
