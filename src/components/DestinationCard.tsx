import { Link } from 'react-router-dom';
import Icon from './Icon';

interface DestinationCardProps {
  name: string;
  description: string;
  image: string;
  to: string;
}

export default function DestinationCard({ name, description, image, to }: DestinationCardProps) {
  return (
    <Link
      to={to}
      className="focus-ring group relative flex h-72 flex-col justify-end overflow-hidden rounded-xl2 border border-brand-900/10 shadow-card transition-shadow duration-200 hover:shadow-card-hover"
    >
      <img
        src={image}
        alt={`Students studying in ${name}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <div className="relative flex flex-col gap-1.5 p-6 text-white">
        <h3 className="font-display text-xl font-extrabold uppercase tracking-tight">{name}</h3>
        <p className="text-sm text-white/80">{description}</p>
        <span className="link-underline mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-gold-400">
          Explore
          <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
