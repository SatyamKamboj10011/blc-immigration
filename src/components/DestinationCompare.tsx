import { Link } from 'react-router-dom';
import { destinations } from '../data/site';
import Icon from './Icon';

const rows: { label: string; get: (d: (typeof destinations)[number]) => string }[] = [
  { label: 'Study options', get: (d) => d.studyOptions[0] },
  { label: 'Also offers', get: (d) => d.studyOptions[1] },
  { label: 'Common English tests', get: () => 'IELTS, PTE (confirm per institution)' },
  { label: 'BLC support', get: (d) => d.support[0] },
];

export default function DestinationCompare() {
  return (
    <div className="overflow-x-auto rounded-xl2 border border-brand-900/10 bg-white shadow-card">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="bg-brand-900 text-white">
            <th className="w-40 px-5 py-4 text-left eyebrow font-normal text-brand-200">Compare</th>
            {destinations.map((d) => (
              <th key={d.slug} className="px-5 py-4 text-left">
                <span className="font-display text-base font-semibold">{d.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? 'bg-paper-dim/40' : 'bg-white'}>
              <th scope="row" className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-brand-800/70">
                {row.label}
              </th>
              {destinations.map((d) => (
                <td key={d.slug} className="px-5 py-4 text-brand-800/85">
                  {row.get(d)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-brand-900/10">
            <th scope="row" className="px-5 py-4" />
            {destinations.map((d) => (
              <td key={d.slug} className="px-5 py-4">
                <Link
                  to={`/study-abroad/${d.slug}`}
                  className="focus-ring inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  View {d.name}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
