import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import CallbackPanel from './CallbackPanel';
import { trackPageview } from '../lib/analytics';

interface LayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setCanonical(pathname);
    setOg('og:title', title);
    setOg('og:description', description);
    setOg('og:type', 'website');
    setOg('og:url', `https://blcimmigration.com${pathname}`);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    window.scrollTo({ top: 0, behavior: 'auto' });
    trackPageview(pathname);
  }, [title, description, pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <CallbackPanel />
      <WhatsAppButton />
    </div>
  );
}

function setMeta(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setOg(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(pathname: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', `https://blcimmigration.com${pathname}`);
}
