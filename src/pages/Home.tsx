import Layout from '../components/Layout';
import HomeHero from '../components/HomeHero';
import DestinationScroller from '../components/DestinationScroller';
import ScrollMarquee from '../components/ScrollMarquee';
import ScrollText from '../components/ScrollText';
import ParallaxImage from '../components/ParallaxImage';
import { Stagger, StaggerItem } from '../components/Reveal';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import ProcessTimeline from '../components/ProcessTimeline';
import HeroStats from '../components/HeroStats';
import ImpactSection from '../components/ImpactSection';
import WaysIn from '../components/WaysIn';
import EligibilityCheck from '../components/EligibilityCheck';
import SuccessStoryCard from '../components/SuccessStoryCard';
import SocialGallery from '../components/SocialGallery';
import NewsletterCTA from '../components/NewsletterCTA';
import ContactForm from '../components/ContactForm';
import Icon from '../components/Icon';
import {
  whyChooseBLC,
  destinations,
  testimonials,
  successStories,
  aboutContent,
  siteInfo,
  serviceFeatures,
} from '../data/site';
import { useT } from '../i18n';

export default function Home() {
  const t = useT();
  return (
    <Layout
      title={t("Blossom Learning Centre | Study Abroad & Immigration Guidance")}
      description={t("Blossom Learning Centre (BLC) provides study abroad guidance, student visa and immigration consultancy, and IELTS, PTE and Spoken English preparation in Ladwa, Haryana.")}
      underNav
    >
      <HomeHero />

      <HeroStats />

      <ImpactSection />

      <WaysIn />

      <ScrollMarquee />

      <DestinationScroller />

      {/* Why Choose Us */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading
            eyebrow={t("Why BLC")}
            heading={t("Honest guidance. Every step of the way.")}
            description={t("We make your study abroad journey stress-free and successful — from your first consultation to your first day on campus.")}
            split
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseBLC.map((f) => (
              <StaggerItem key={f.title}>
                <FeatureCard icon={f.icon} title={t(f.title)} description={t(f.description)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Save More — image collage + checklist */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
              alt={t("Two students ready to travel abroad for their studies")}
              className="aspect-[4/5] w-full rounded-[1.75rem] shadow-card"
            />
            <div className="animate-float absolute bottom-4 right-4 flex items-center gap-3 rounded-2xl border border-brand-900/10 bg-white px-5 py-4 shadow-card-hover">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-brand-950">
                <Icon name="check" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-brand-950">1000+</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">{t("Students Guided")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow={t("About Blossom Learning Centre")}
              heading={t("Save more while you study abroad.")}
              description={t("Stay ahead with exclusive scholarship guidance and honest, best-value advice — whichever study destination you're considering.")}
            />
            <ul className="grid grid-cols-2 gap-3">
              {destinations.map((d) => (
                <li key={d.slug} className="flex items-center gap-2 text-sm font-semibold text-brand-900">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {t(d.name)}
                </li>
              ))}
            </ul>
            <Button to="/about" variant="secondary" className="w-fit" showArrow>
              {t("Learn more about BLC")}
            </Button>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading
            eyebrow={t("What You Get")}
            heading={t("Every consultation includes.")}
            description={t("A clear, checkable set of support — not vague promises.")}
            split
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceFeatures.map((f) => (
              <StaggerItem key={f.title} className="flex h-full items-start gap-3 rounded-[1.75rem] border border-brand-900/10 bg-white p-5 shadow-card">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-brand-950">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-sm font-semibold tracking-[-0.03em] text-brand-950">{t(f.title)}</h3>
                  <p className="text-sm leading-relaxed text-brand-500">{t(f.description)}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Eligibility Check */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <SectionHeading
            eyebrow={t("Quick Check")}
            heading={t("Where should you start?")}
            description={t("Answer three quick questions for general guidance on your likely next step. This isn't a formal assessment — a consultation will confirm what applies to you.")}
          />
          <EligibilityCheck />
        </div>
      </section>

      {/* Scroll-lit statement */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="container-page">
          <ScrollText
            text={t("From your first consultation to your first day on campus — we make your study abroad journey simple.")}
            highlight={['first', 'campus', 'simple']}
          />
        </div>
      </section>

      {/* Process */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading eyebrow={t("Our Process")} heading={t("Your journey, simplified.")} split />
          <ProcessTimeline />
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading
            eyebrow={t("Success Stories")}
            heading={t("Real students. Real visa outcomes.")}
            description={t("Visa approvals shared by BLC students on our YouTube channel.")}
            split
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {successStories.map((s) => (
              <StaggerItem key={s.youtubeId}>
                <SuccessStoryCard {...s} />
              </StaggerItem>
            ))}
          </Stagger>
          <div className="flex justify-center">
            <Button to="/success-stories" variant="secondary" showArrow>{t("View success stories")}</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading
            eyebrow={t("Testimonials")}
            heading={t("Results that speak for themselves.")}
            description={t("Real PTE results shared by BLC students on our YouTube channel.")}
            split
          />
          <Stagger className="grid gap-6 sm:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <StaggerItem key={t.youtubeId}>
                <SuccessStoryCard {...t} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Social Gallery */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col gap-8 sm:gap-12">
          <SectionHeading
            eyebrow={t("Follow Us")}
            heading={t("BLC in the room.")}
            description={t("A running feed of our recent posts, events and student updates.")}
            split
          />
          <SocialGallery />
        </div>
      </section>

      {/* About BLC */}
      <section className="bg-paper-dim py-14 sm:py-20 lg:py-28">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <SectionHeading eyebrow={t("About BLC")} heading={t("Who we are, how we help.")} align="center" description={t(aboutContent.who2)} />
          <p className="max-w-2xl text-base leading-relaxed text-brand-800/80">{t(aboutContent.how)}</p>
          <Button to="/contact" showArrow>{t("Talk to our team")}</Button>
        </div>
      </section>

      <NewsletterCTA />

      {/* Contact */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow={t("Get In Touch")} heading={t("Talk to Blossom Learning Centre.")} />
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
          <div className="rounded-[1.75rem] border border-brand-900/10 bg-white p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
