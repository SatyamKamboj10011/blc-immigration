import { Link } from 'react-router-dom';
import { siteInfo, services, destinations, socialLinks } from '../data/site';
import Icon from './Icon';
import { useT } from '../i18n';

export default function Footer() {
  const t = useT();
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="focus-ring inline-flex w-fit items-center rounded-sm bg-white p-2">
            <img src="/logo.png" alt={t("Blossom Learning Centre logo")} className="h-10 w-auto" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-brand-200">
            {t(siteInfo.name)} (BLC) supports students with study abroad guidance, visa and
            immigration consultancy, and English-language preparation.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("BLC on Instagram")}
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-brand-200 transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-brand-950"
            >
              <Icon name="instagram" className="h-4 w-4" />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("BLC on YouTube")}
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-brand-200 transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-brand-950"
            >
              <Icon name="youtube" className="h-4 w-4" />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("BLC on Facebook")}
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-brand-200 transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-brand-950"
            >
              <Icon name="facebook" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-gold-500">{t("Quick Links")}</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-brand-200">
            <li><Link className="focus-ring rounded hover:text-white" to="/about">{t("About Us")}</Link></li>
            <li><Link className="focus-ring rounded hover:text-white" to="/services">{t("Services")}</Link></li>
            <li><Link className="focus-ring rounded hover:text-white" to="/study-abroad">{t("Study Abroad")}</Link></li>
            <li><Link className="focus-ring rounded hover:text-white" to="/success-stories">{t("Success Stories")}</Link></li>
            <li><Link className="focus-ring rounded hover:text-white" to="/contact">{t("Contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-gold-500">{t("Services")}</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-brand-200">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="focus-ring rounded hover:text-white" to={`/services/${s.slug}`}>
                  {t(s.shortTitle)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4 text-gold-500">{t("Study Destinations")}</h3>
          <ul className="mb-6 flex flex-col gap-2.5 text-sm text-brand-200">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link className="focus-ring rounded hover:text-white" to={`/study-abroad/${d.slug}`}>
                  {t(d.name)}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="eyebrow mb-3 text-gold-500">{t("Contact")}</h3>
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
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-brand-300 sm:flex-row">
          <p>© {new Date().getFullYear()} Blossom Learning Centre. All rights reserved. &middot; Designed by Satyam Kamboj</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link className="focus-ring rounded hover:text-white" to="/privacy-policy">{t("Privacy Policy")}</Link>
            <Link className="focus-ring rounded hover:text-white" to="/terms-conditions">Terms &amp; Conditions</Link>
            <Link className="focus-ring rounded hover:text-white" to="/refund-policy">{t("Refund Policy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
