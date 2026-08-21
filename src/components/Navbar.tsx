import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks, siteInfo } from '../data/site';
import Button from './Button';
import Icon from './Icon';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled ? 'border-brand-900/10 bg-paper/95 backdrop-blur shadow-card' : 'border-transparent bg-paper/70 backdrop-blur-sm'
      }`}
    >
      <nav className="container-page flex h-18 items-center justify-between py-3" aria-label="Primary">
        <Link to="/" className="focus-ring flex items-center gap-2 rounded-md">
          <img src="/logo.png" alt="Blossom Learning Centre logo" className="h-11 w-auto" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `focus-ring rounded-sm px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-brand-800 bg-brand-50'
                      : 'text-brand-900/75 hover:text-brand-800 hover:bg-brand-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={siteInfo.phoneHref}
            className="focus-ring flex items-center gap-2 rounded-sm text-sm font-medium text-brand-900/75 transition-colors hover:text-brand-800"
          >
            <Icon name="phone" className="h-4 w-4" />
            {siteInfo.phone}
          </a>
          <Button to="/contact" size="md" variant="accent">
            Book a Consultation
          </Button>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex items-center justify-center rounded-full p-2 text-brand-800 lg:hidden"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Icon name="menu" className="h-7 w-7" />
        </button>
      </nav>
    </header>
    <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
