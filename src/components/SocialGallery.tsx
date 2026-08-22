import { useEffect } from 'react';
import { socialLinks, instagramPosts } from '../data/site';
import Icon from './Icon';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function loadInstagramEmbedScript(onLoad: () => void) {
  const existing = document.getElementById('instagram-embed-script') as HTMLScriptElement | null;
  if (existing) {
    if (window.instgrm) onLoad();
    else existing.addEventListener('load', onLoad);
    return;
  }
  const script = document.createElement('script');
  script.id = 'instagram-embed-script';
  script.src = 'https://www.instagram.com/embed.js';
  script.async = true;
  script.onload = onLoad;
  document.body.appendChild(script);
}

export default function SocialGallery() {
  useEffect(() => {
    if (instagramPosts.length === 0) return;
    loadInstagramEmbedScript(() => window.instgrm?.Embeds.process());
  }, []);

  if (instagramPosts.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl2 border border-brand-900/10 bg-white shadow-card">
        <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
          <p className="max-w-md text-sm leading-relaxed text-brand-800/70">
            Our latest photos and updates from Instagram and Facebook will appear here shortly.
            In the meantime, follow us directly:
          </p>
          <div className="flex items-center gap-3">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-brand-900/15 px-4 py-2 text-sm font-semibold text-brand-900 transition-colors hover:border-brand-900/30"
            >
              <Icon name="instagram" className="h-4 w-4" />
              Instagram
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-brand-900/15 px-4 py-2 text-sm font-semibold text-brand-900 transition-colors hover:border-brand-900/30"
            >
              <Icon name="facebook" className="h-4 w-4" />
              Facebook
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {instagramPosts.map((url) => (
        <blockquote
          key={url}
          className="instagram-media w-full"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ margin: 0 }}
        />
      ))}
    </div>
  );
}
