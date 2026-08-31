import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';
import NewsletterCTA from '../components/NewsletterCTA';
import Icon from '../components/Icon';
import { siteInfo, officeHours, socialLinks } from '../data/site';

const infoCards = [
  { icon: 'pin', title: 'Our Office', lines: [siteInfo.addressLine] },
  { icon: 'mail', title: 'Email Support', lines: [siteInfo.email, siteInfo.emailSecondary] },
  { icon: 'phone', title: "Let's Talk", lines: [siteInfo.phone] },
  { icon: 'clipboard', title: 'Office Hours', lines: officeHours.map((h) => `${h.day}: ${h.hours}`) },
];

const socialRow = [
  { icon: 'instagram', href: socialLinks.instagram, label: 'Instagram' },
  { icon: 'youtube', href: socialLinks.youtube, label: 'YouTube' },
  { icon: 'facebook', href: socialLinks.facebook, label: 'Facebook' },
];

export default function Contact() {
  return (
    <Layout
      title="Contact | Blossom Learning Centre"
      description="Contact Blossom Learning Centre (BLC) in Ladwa, Haryana to book a consultation about study abroad, visas, immigration or IELTS/PTE preparation."
    >
      {/* Rounded hero banner */}
      <section className="container-page pt-8 sm:pt-10">
        <div className="relative overflow-hidden rounded-xl2">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
            alt="BLC team member on a phone consultation"
            loading="eager"
            className="h-64 w-full object-cover sm:h-80"
          />
          <div className="absolute inset-0 bg-brand-950/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <h1 className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">Contact Us</h1>
            <p className="max-w-md text-sm font-medium text-white/85 sm:text-base">
              Reach out and take the first step towards studying abroad
            </p>
          </div>
        </div>
      </section>

      <Breadcrumbs items={[{ label: 'Contact' }]} />

      {/* Get in touch heading + info cards */}
      <section className="py-16 sm:py-20">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading
            eyebrow="Get In Touch"
            heading="Connect With the BLC Team and Start Your Journey"
            align="center"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {infoCards.map((card) => (
              <div key={card.title} className="flex flex-col items-center gap-3 rounded-xl2 bg-paper-dim p-6 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-brand-950">
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-brand-950">{card.title}</h3>
                <div className="flex flex-col gap-0.5">
                  {card.lines.map((line) => (
                    <p key={line} className="text-sm text-brand-500">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + form */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden rounded-xl2 border border-brand-900/10 shadow-card">
              <iframe
                title="Blossom Learning Centre location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(siteInfo.addressLine)}&output=embed`}
                className="h-full min-h-[24rem] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteInfo.addressLine)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline"
            >
              <Icon name="pin" className="h-4 w-4" />
              Get directions on Google Maps
            </a>
          </div>
          <div className="rounded-xl2 border border-brand-900/10 bg-white p-6 shadow-card sm:p-8">
            <span className="eyebrow text-gold-700">Send Us a Message</span>
            <h2 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-brand-950 sm:text-3xl">
              Talk to Our Team About Your Journey Abroad
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-500">
              We aim to respond to all enquiries as quickly as possible. For urgent matters, please call us directly.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Follow us */}
      <section className="pb-16 sm:pb-20">
        <div className="container-page flex flex-col items-center justify-center gap-4 sm:flex-row">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-500">Follow our social media</span>
          <span className="hidden h-px w-16 bg-brand-900/15 sm:block" aria-hidden="true" />
          <div className="flex items-center gap-3">
            {socialRow.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`BLC on ${s.label}`}
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-brand-950 text-white transition-colors hover:bg-gold-500 hover:text-brand-950"
              >
                <Icon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </Layout>
  );
}
