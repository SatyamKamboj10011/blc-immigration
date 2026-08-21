import { siteInfo } from '../data/site';

const digitsOnly = siteInfo.phone.replace(/[^0-9]/g, '');
const whatsappHref = `https://wa.me/${digitsOnly}?text=${encodeURIComponent(
  'Hi BLC, I would like to know more about your study abroad and immigration services.'
)}`;

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Blossom Learning Centre on WhatsApp"
      className="focus-ring fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.4 1.33-1.93 1.4-.49.07-1.11.1-1.79-.11a16.5 16.5 0 01-1.65-.6c-2.9-1.25-4.79-4.15-4.94-4.34-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.13 1.01-2.42.27-.28.58-.35.78-.35l.55.01c.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.6-.07.16-.18.68-.79.87-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.87.27.13.45.2.51.31.07.12.07.68-.17 1.36z" />
      </svg>
    </a>
  );
}
