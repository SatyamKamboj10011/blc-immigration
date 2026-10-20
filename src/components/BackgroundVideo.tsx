import { useEffect, useRef, useState } from 'react';

// Background clips, re-encoded from the Mixkit Stock Video Free License
// (commercial use allowed, no attribution required).
export const destinationVideos: Record<string, string> = {
  australia: 'australia',
  uk: 'uk',
  'new-zealand': 'new-zealand',
  canada: 'canada',
};

interface BackgroundVideoProps {
  // base name of a clip in /public/videos — expects {name}.mp4, {name}-sm.mp4 and {name}.jpg
  name: string;
  // shown before the clip loads, and instead of it when motion/data should be saved
  poster?: string;
  className?: string;
}

function prefersStill() {
  if (typeof window === 'undefined') return true;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return reduced || !!conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g';
}

// Muted, looping, decorative video. It only starts downloading when it nears
// the viewport, pauses when scrolled away, and serves a smaller file on phones.
export default function BackgroundVideo({ name, poster, className = '' }: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [still] = useState(prefersStill);
  const posterSrc = poster ?? `/videos/${name}.jpg`;

  useEffect(() => {
    const video = ref.current;
    if (!video || still) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc((current) => current ?? `/videos/${name}${window.innerWidth < 768 ? '-sm' : ''}.mp4`);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [name, still]);

  if (still) {
    return <img src={posterSrc} alt="" aria-hidden="true" className={`object-cover ${className}`} loading="lazy" />;
  }

  return (
    <video
      ref={ref}
      src={src ?? undefined}
      poster={posterSrc}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className={`object-cover ${className}`}
    />
  );
}
