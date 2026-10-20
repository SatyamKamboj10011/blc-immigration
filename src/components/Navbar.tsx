import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { navLinks } from '../data/site';
import Button from './Button';
import Icon from './Icon';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { setScrollLocked } from './SmoothScroll';
import { useT } from '../i18n';

// Floating frosted "pill" navbar with a scroll-progress line along its bottom edge.
export default function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    setScrollLocked(mobileOpen);
    return () => {
      document.body.style.overflow = '';
      setScrollLocked(false);
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      >
        <nav
          aria-label={t("Primary")}
          className={`relative mx-auto flex h-16 max-w-7xl items-center justify-between overflow-hidden rounded-2xl border pl-4 pr-2.5 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500 sm:h-[4.5rem] sm:pl-5 ${
            scrolled
              ? 'border-white/60 bg-white/85 shadow-[0_18px_50px_rgba(0,23,16,0.14)]'
              : 'border-white/40 bg-white/75 shadow-[0_10px_30px_rgba(0,23,16,0.08)]'
          }`}
        >
          <Link to="/" className="focus-ring flex shrink-0 items-center rounded-md">
            <img src="/logo.png" alt={t("Blossom Learning Centre logo")} className="h-10 w-auto sm:h-11" />
          </Link>

          <ul className="hidden items-center lg:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `focus-ring group relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3.5 ${
                      isActive ? 'text-brand-950' : 'text-brand-900/65 hover:text-brand-950'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {t(link.label)}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-2.5 bottom-0.5 h-px origin-left bg-brand-950 transition-transform duration-300 xl:inset-x-3.5 ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <Button to="/contact" size="md" variant="primary" className="whitespace-nowrap" showArrow>
              {t("Free Consultation")}
            </Button>
          </div>

          <div className="ml-auto mr-2 lg:hidden">
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-950 text-white lg:hidden"
            aria-label={t("Open menu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>

          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-brand-700 via-brand-400 to-gold-500"
            style={{ scaleX: progress }}
          />
        </nav>
      </motion.header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
