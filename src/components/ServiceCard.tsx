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
      className="focus-ring group flex h-full flex-col gap-4 rounded-xl2 border border-brand-900/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-700/30 hover:shadow-card-hover"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-brand-800/15 bg-brand-50 text-brand-700 transition-colors group-hover:border-brand-700 group-hover:bg-brand-700 group-hover:text-white">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-display text-lg font-semibold text-brand-950">{title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-brand-800/75">{description}</p>
      </div>
      <span className="link-underline mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-700">
        Learn More
        <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
