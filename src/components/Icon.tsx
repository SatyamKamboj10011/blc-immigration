import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
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
  'chevron-down': ChevronDown,
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
  facebook: (className) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className} aria-hidden="true">
      <path d="M14 8.5h2.5V5.5h-2.5c-2 0-3.5 1.5-3.5 3.5v2H8.5v3H11v7h2.5v-7h2.2l.5-3h-2.7v-2c0-.6.4-1 1-1z" fill="currentColor" stroke="none" />
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
