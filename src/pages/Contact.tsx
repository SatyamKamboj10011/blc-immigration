import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';
import Icon from '../components/Icon';
import { siteInfo } from '../data/site';

export default function Contact() {
  return (
    <Layout
      title="Contact | Blossom Learning Centre"
      description="Contact Blossom Learning Centre (BLC) in Ladwa, Haryana to book a consultation about study abroad, visas, immigration or IELTS/PTE preparation."
    >
      <Hero
        eyebrow="Contact"
        headline="Let's Talk About Your Journey"
        supportingText="Reach out with any questions, or book a consultation with the BLC team."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
        imageAlt="BLC team member on a phone consultation"
        compact
      />
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Get In Touch" heading="Contact Details" />
            <div className="flex flex-col gap-4">
              <a href={siteInfo.phoneHref} className="focus-ring flex items-center gap-3 rounded-md border border-brand-900/10 bg-white p-4 shadow-card">
                <Icon name="phone" className="h-5 w-5 text-brand-700" />
                <span className="text-sm font-semibold text-brand-900">{siteInfo.phone}</span>
              </a>
              <a href={siteInfo.emailHref} className="focus-ring flex items-center gap-3 rounded-md border border-brand-900/10 bg-white p-4 shadow-card">
                <Icon name="mail" className="h-5 w-5 text-brand-700" />
                <span className="text-sm font-semibold text-brand-900">{siteInfo.email}</span>
              </a>
              <a href={siteInfo.emailSecondaryHref} className="focus-ring flex items-center gap-3 rounded-md border border-brand-900/10 bg-white p-4 shadow-card">
                <Icon name="mail" className="h-5 w-5 text-brand-700" />
                <span className="text-sm font-semibold text-brand-900">{siteInfo.emailSecondary}</span>
              </a>
              <div className="flex items-center gap-3 rounded-md border border-brand-900/10 bg-white p-4 shadow-card">
                <Icon name="pin" className="h-5 w-5 text-brand-700" />
                <span className="text-sm font-semibold text-brand-900">{siteInfo.addressLine}</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-brand-800/70">
              We aim to respond to all enquiries as quickly as possible. For urgent matters, please call us directly.
            </p>
            <div className="overflow-hidden rounded-xl2 border border-brand-900/10 shadow-card">
              <iframe
                title="Blossom Learning Centre location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(siteInfo.addressLine)}&output=embed`}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
