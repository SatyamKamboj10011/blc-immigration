import Icon from './Icon';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl2 border border-brand-900/10 bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-gold-500/40 bg-brand-900 text-gold-400">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="font-display text-lg font-semibold text-brand-950">{title}</h3>
      <p className="text-sm leading-relaxed text-brand-800/75">{description}</p>
    </div>
  );
}
