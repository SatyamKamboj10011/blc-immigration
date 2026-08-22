import { Link } from 'react-router-dom';
import { siteInfo, services, destinations, socialLinks } from '../data/site';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="focus-ring inline-flex w-fit items-center rounded-sm bg-white p-2">
            <img src="/logo.png" alt="Blossom Learning Centre logo" className="h-10 w-auto" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-brand-200">
            {siteInfo.name} (BLC) supports students with study abroad guidance, visa and
            immigration consultancy, and English-language preparation.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BLC on Instagram"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-brand-200 transition-colors hover:border-white/40 hover:text-white"
            >
              <Icon name="instagram" className="h-4 w-4" />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BLC on YouTube"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-brand-200 transition-colors hover:border-white/40 hover:text-white"
            >
              <Icon name="youtube" className="h-4 w-4" />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BLC on Facebook"
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-brand-200 transition-colors hover:border-white/40 hover:text-white"
            >
              <Icon name="facebook" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-white/70">Quick Links</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-brand-200">
            <li><Link className="focus-ring rounded hover:text-white" to="/about">About Us</Link></li>
            <li><Link className="focus-ring rounded hover:text-white" to="/services">Services</Link></li>
            <li><Link className="focus-ring rounded hover:text-white" to="/study-abroad">Study Abroad</Link></li>
            <li><Link className="focus-ring rounded hover:text-white" to="/success-stories">Success Stories</Link></li>
            <li><Link className="focus-ring rounded hover:text-white" to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-white/70">Services</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-brand-200">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="focus-ring rounded hover:text-white" to={`/services/${s.slug}`}>
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-white/70">Study Destinations</h3>
          <ul className="mb-6 flex flex-col gap-2.5 text-sm text-brand-200">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link className="focus-ring rounded hover:text-white" to={`/study-abroad/${d.slug}`}>
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="eyebrow mb-3 text-white/70">Contact</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-brand-200">
            <li className="flex items-center gap-2">
              <Icon name="phone" className="h-4 w-4 shrink-0 text-brand-300" />
              <a className="focus-ring rounded hover:text-white" href={siteInfo.phoneHref}>{siteInfo.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" className="h-4 w-4 shrink-0 text-brand-300" />
              <a className="focus-ring rounded hover:text-white" href={siteInfo.emailHref}>{siteInfo.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
              <span>{siteInfo.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-brand-300 sm:flex-row">
          <p>© {new Date().getFullYear()} Blossom Learning Centre. All rights reserved. &middot; Designed by Satyam Kamboj</p>
          <p>Ladwa, Haryana, India</p>
        </div>
      </div>
    </footer>
  );
}
