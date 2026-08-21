import {
  ArrowRight,
  BookOpen,
  Check,
  Clipboard,
  Compass,
  Globe2,
  Headphones,
  Mail,
  MapPin,
  MessagesSquare,
  Menu,
  Stamp,
  Star,
  Map as MapIcon,
  Phone,
  Quote,
  X,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  compass: Compass,
  clipboard: Clipboard,
  'book-open': BookOpen,
  map: MapIcon,
  passport: Stamp,
  globe: Globe2,
  book: BookOpen,
  headset: Headphones,
  chat: MessagesSquare,
  phone: Phone,
  mail: Mail,
  pin: MapPin,
  arrow: ArrowRight,
  check: Check,
  menu: Menu,
  close: X,
  quote: Quote,
  star: Star,
};

// Official brand marks — not part of lucide-react, kept minimal and exact.
const brandIcons: Record<string, (className: string) => JSX.Element> = {
  instagram: (className) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (className) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className} aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="3.5" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
    </svg>
  ),
};

interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className = 'h-6 w-6' }: IconProps) {
  if (brandIcons[name]) return brandIcons[name](className);
  const Cmp = icons[name] ?? Compass;
  return <Cmp className={className} strokeWidth={1.75} aria-hidden="true" />;
}
