import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks, siteInfo } from '../data/site';
import Button from './Button';
import Icon from './Icon';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open && rootRef.current?.contains(document.activeElement)) {
      (document.activeElement as HTMLElement).blur();
    }
  }, [open]);

  return (
    <div ref={rootRef} className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-paper shadow-card-hover transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-brand-900/10 px-5">
          <img src="/logo.png" alt="Blossom Learning Centre logo" className="h-9 w-auto" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-sm text-brand-800 hover:bg-brand-50"
          >
            <Icon name="close" className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-5 py-6" aria-label="Mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `focus-ring rounded-sm px-4 py-3 text-base font-semibold ${
                  isActive ? 'bg-brand-50 text-brand-800' : 'text-brand-900/85 hover:bg-brand-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-brand-900/10 px-5 py-6">
          <Button to="/contact" onClick={onClose} className="w-full" size="lg" variant="accent">
            Book a Consultation
          </Button>
          <a
            href={siteInfo.phoneHref}
            onClick={onClose}
            className="focus-ring flex items-center justify-center gap-2 rounded-sm py-2 text-sm font-medium text-brand-800"
          >
            <Icon name="phone" className="h-4 w-4" />
            {siteInfo.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
