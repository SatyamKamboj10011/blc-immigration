import { Link } from 'react-router-dom';
import Icon from './Icon';

interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-brand-900/10 bg-paper">
      <ol className="container-page flex flex-wrap items-center gap-1.5 py-3 text-xs text-brand-800/70">
        <li className="flex items-center gap-1.5">
          <Link to="/" className="focus-ring rounded hover:text-brand-800">Home</Link>
          <Icon name="arrow" className="h-3 w-3 rotate-0 text-brand-800/40" />
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.to ? (
              <Link to={item.to} className="focus-ring rounded hover:text-brand-800">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-brand-900" aria-current="page">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && <Icon name="arrow" className="h-3 w-3 text-brand-800/40" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
