// Google Analytics 4 — set VITE_GA_ID (e.g. G-XXXXXXXXXX) in .env to enable.
// No-op when unset, so the site works fully without an analytics account.
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export function initAnalytics() {
  if (!GA_ID || document.getElementById('ga4-script')) return;

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: false });

  // @ts-expect-error attach for pageview tracking below
  window.gtag = gtag;
}

export function trackPageview(path: string) {
  if (!GA_ID) return;
  // @ts-expect-error attached in initAnalytics
  window.gtag?.('event', 'page_view', { page_path: path });
}
