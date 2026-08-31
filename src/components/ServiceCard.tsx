import { Link } from 'react-router-dom';
import Icon from './Icon';

interface ServiceCardProps {
  title: string;
  description: string;
  to: string;
  icon?: string;
}

export default function ServiceCard({ title, description, to, icon = 'compass' }: ServiceCardProps) {
  return (
    <Link
      to={to}
      className="focus-ring group flex h-full flex-col gap-4 rounded-xl2 border border-brand-900/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-card-hover"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-500 text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-brand-950">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-brand-950">{title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-brand-500">{description}</p>
      </div>
      <span className="link-underline mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-gold-700">
        Learn More
        <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
