import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import ServiceCard from '../components/ServiceCard';
import DestinationCard from '../components/DestinationCard';
import ProcessTimeline from '../components/ProcessTimeline';
import TrustBar from '../components/TrustBar';
import EligibilityCheck from '../components/EligibilityCheck';
import SuccessStoryCard from '../components/SuccessStoryCard';
import SocialGallery from '../components/SocialGallery';
import CTASection from '../components/CTASection';
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
        headline="Your Journey Abroad Starts Here"
        supportingText="BLC provides education, English-language preparation and overseas study and immigration guidance — helping students prepare thoroughly and move forward with confidence."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
        imageAlt="International students walking together on a university campus"
        stub
        actions={
          <>
            <Button to="/contact" size="lg" variant="accent">Book a Consultation</Button>
            <Button to="/services" variant="ghost" size="lg" showArrow>Explore Services</Button>
          </>
        }
      />

      <TrustBar />

      {/* Introduction */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80"
            alt="Student receiving guidance from a BLC consultant"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-xl2 object-cover shadow-card"
          />
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="About BLC"
              heading="Guidance for Your Next Step"
              description={aboutContent.who}
            />
            <p className="text-base leading-relaxed text-brand-800/80">{aboutContent.what}</p>
            <Button to="/about" variant="secondary" className="w-fit" showArrow>
              Learn More About BLC
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose BLC */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="Why BLC" heading="Why Choose BLC" align="center" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseBLC.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
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

      {/* Eligibility Check */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <SectionHeading
            eyebrow="Quick Check"
            heading="Where Should You Start?"
            description="Answer three quick questions for general guidance on your likely next step. This isn't a formal assessment — a consultation will confirm what applies to you."
          />
          <EligibilityCheck />
        </div>
      </section>

      {/* Study Abroad */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="Study Abroad" heading="Explore Your Study Abroad Options" align="center" />
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

      {/* English Programs */}
      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="English Programs" heading="Build Your English Confidence" align="center" />
          <div className="grid gap-6 sm:grid-cols-3">
            {english.map((s) => (
              <ServiceCard key={s.slug} title={s.shortTitle} description={s.summary} to={`/services/${s.slug}`} icon={s.icon} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button to="/services" variant="secondary" showArrow>Explore Programs</Button>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="Our Process" heading="Your Journey, Simplified" align="center" />
          <ProcessTimeline />
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            eyebrow="Success Stories"
            heading="Students We've Supported"
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
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
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
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="container-page flex flex-col gap-12">
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
      <section className="py-20 sm:py-28">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <SectionHeading eyebrow="About BLC" heading="Who We Are, How We Help" align="center" description={aboutContent.who2} />
          <p className="max-w-2xl text-base leading-relaxed text-brand-800/80">{aboutContent.how}</p>
          <Button to="/contact" showArrow>Talk to Our Team</Button>
        </div>
      </section>

      <CTASection headline="Ready to Start Your Journey?" text="Speak with the BLC team about your study and overseas education options.">
        <Button to="/contact" variant="accent">Book a Consultation</Button>
        <Button to="/contact" variant="ghost">Contact Us</Button>
      </CTASection>

      {/* Contact */}
      <section className="py-20 sm:py-28">
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
