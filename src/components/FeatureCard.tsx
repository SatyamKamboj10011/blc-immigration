import Icon from './Icon';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl2 border border-brand-900/10 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-brand-950">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-brand-950">{title}</h3>
      <p className="text-sm leading-relaxed text-brand-800/75">{description}</p>
    </div>
  );
}
