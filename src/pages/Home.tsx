import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import ServiceCard from '../components/ServiceCard';
import DestinationCard from '../components/DestinationCard';
import ProcessTimeline from '../components/ProcessTimeline';
import TrustBar from '../components/TrustBar';
import QuickSearchBar from '../components/QuickSearchBar';
import EligibilityCheck from '../components/EligibilityCheck';
import SuccessStoryCard from '../components/SuccessStoryCard';
import SocialGallery from '../components/SocialGallery';
import NewsletterCTA from '../components/NewsletterCTA';
import ContactForm from '../components/ContactForm';
import Icon from '../components/Icon';
import {
  whyChooseBLC,
  homeServiceCards,
  destinations,
  services,
  testimonials,
  successStories,
  aboutContent,
  siteInfo,
  serviceFeatures,
} from '../data/site';

export default function Home() {
  const english = services.filter((s) => ['ielts', 'pte', 'spoken-english'].includes(s.slug));

  return (
    <Layout
      title="Blossom Learning Centre | Study Abroad & Immigration Guidance"
      description="Blossom Learning Centre (BLC) provides study abroad guidance, student visa and immigration consultancy, and IELTS, PTE and Spoken English preparation in Ladwa, Haryana."
    >
      <Hero
        eyebrow="Blossom Learning Centre"
        headline="Study Abroad Made Simple — Get Expert Guidance Every Step of the Way"
        supportingText="From choosing the right destination to securing your visa, BLC helps you achieve your international education dream with personalised support and expert advice."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
        imageAlt="International student ready to study abroad"
        actions={
          <>
            <Button to="/contact" size="lg" variant="accent">Get Free Counselling</Button>
            <Button to="/study-abroad" variant="secondary" size="lg" showArrow>Explore Destinations</Button>
          </>
        }
      />

      <QuickSearchBar />

      {/* Find Your Perfect Destination */}
      <section className="pb-14 pt-10 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading
            eyebrow="Study Abroad"
            heading="Find Your Perfect Destination"
            description="Explore popular study destinations — each offering recognised institutions and real career opportunities."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <DestinationCard
                key={d.slug}
                name={d.name}
                description={d.summary}
                image={d.image}
                to={`/study-abroad/${d.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading
            eyebrow="Why BLC"
            heading="Why Choose Us as Your Study Abroad Agency?"
            description="We make your study abroad journey stress-free and successful — from your first consultation to your first day on campus."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseBLC.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading eyebrow="Our Services" heading="How We Can Help" align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeServiceCards.map((card) => (
              <ServiceCard
                key={card.slug}
                title={card.title}
                description={card.description}
                to={'isStudyAbroad' in card && card.isStudyAbroad ? '/study-abroad' : `/services/${card.slug}`}
                icon={services.find((s) => s.slug === card.slug)?.icon ?? 'map'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Save More — image collage + checklist */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
              alt="Two students ready to travel abroad for their studies"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-xl2 object-cover shadow-card"
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-3 rounded-2xl border border-brand-900/10 bg-white px-5 py-4 shadow-card-hover">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-brand-950">
                <Icon name="check" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-black text-brand-950">1000+</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">Students Guided</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="About Blossom Learning Centre"
              heading="Save More While You Study Abroad"
              description="Stay ahead with exclusive scholarship guidance and honest, best-value advice — whichever study destination you're considering."
            />
            <ul className="grid grid-cols-2 gap-3">
              {destinations.map((d) => (
                <li key={d.slug} className="flex items-center gap-2 text-sm font-semibold text-brand-900">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {d.name}
                </li>
              ))}
            </ul>
            <Button to="/about" variant="secondary" className="w-fit" showArrow>
              Learn More About BLC
            </Button>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* English Programs */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading eyebrow="English Programs" heading="Build Your English Confidence" align="center" />
          <div className="grid gap-6 sm:grid-cols-3">
            {english.map((s) => (
              <ServiceCard key={s.slug} title={s.shortTitle} description={s.summary} to={`/services/${s.slug}`} icon={s.icon} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/services" variant="secondary" showArrow>Explore Programs</Button>
            <Button to="/exam-strategies" variant="secondary" showArrow>View Exam Strategies</Button>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading
            eyebrow="What You Get"
            heading="Every Consultation Includes"
            description="A clear, checkable set of support — not vague promises."
            align="center"
          />
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

      {/* Eligibility Check */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <SectionHeading
            eyebrow="Quick Check"
            heading="Where Should You Start?"
            description="Answer three quick questions for general guidance on your likely next step. This isn't a formal assessment — a consultation will confirm what applies to you."
          />
          <EligibilityCheck />
        </div>
      </section>

      {/* Process */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading eyebrow="Our Process" heading="Your Journey, Simplified" align="center" />
          <ProcessTimeline />
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading
            eyebrow="Success Stories"
            heading="See What Our Students Say About Their Experience With BLC"
            description="Real visa outcomes shared by BLC students on our YouTube channel."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {successStories.map((s) => (
              <SuccessStoryCard key={s.youtubeId} {...s} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button to="/success-stories" variant="secondary" showArrow>View Success Stories</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading
            eyebrow="Testimonials"
            heading="What Students Say"
            description="Real PTE results shared by BLC students on our YouTube channel."
            align="center"
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <SuccessStoryCard key={t.youtubeId} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Gallery */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading
            eyebrow="Follow Us"
            heading="Latest From Instagram & Facebook"
            description="A running feed of our recent posts, events and student updates."
            align="center"
          />
          <SocialGallery />
        </div>
      </section>

      {/* About BLC */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <SectionHeading eyebrow="About BLC" heading="Who We Are, How We Help" align="center" description={aboutContent.who2} />
          <p className="max-w-2xl text-base leading-relaxed text-brand-800/80">{aboutContent.how}</p>
          <Button to="/contact" showArrow>Talk to Our Team</Button>
        </div>
      </section>

      <NewsletterCTA />

      {/* Contact */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Get In Touch" heading="Contact Blossom Learning Centre" />
            <div className="flex flex-col gap-4">
              <a href={siteInfo.phoneHref} className="focus-ring flex items-center gap-3 rounded-sm border border-brand-900/10 bg-white p-4 shadow-card">
                <Icon name="phone" className="h-5 w-5 text-brand-600" />
                <span className="text-sm font-semibold text-brand-900">{siteInfo.phone}</span>
              </a>
              <a href={siteInfo.emailHref} className="focus-ring flex items-center gap-3 rounded-sm border border-brand-900/10 bg-white p-4 shadow-card">
                <Icon name="mail" className="h-5 w-5 text-brand-600" />
                <span className="text-sm font-semibold text-brand-900">{siteInfo.email}</span>
              </a>
              <div className="flex items-center gap-3 rounded-sm border border-brand-900/10 bg-white p-4 shadow-card">
                <Icon name="pin" className="h-5 w-5 text-brand-600" />
                <span className="text-sm font-semibold text-brand-900">{siteInfo.location}</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl2 border border-brand-900/10 bg-white p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
