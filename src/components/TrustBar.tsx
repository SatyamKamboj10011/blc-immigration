import { destinations, services } from '../data/site';

const englishProgramCount = services.filter((s) => ['ielts', 'pte', 'spoken-english'].includes(s.slug)).length;

const stats = [
  { value: String(destinations.length), label: 'Study Destinations' },
  { value: String(englishProgramCount), label: 'English Programs' },
  { value: String(services.length), label: 'Services Offered' },
  { value: '100%', label: 'Personalised Guidance' },
];

export default function TrustBar() {
  return (
    <section className="border-y border-brand-900/10 bg-white">
      <div className="container-page grid grid-cols-2 gap-6 py-8 lg:grid-cols-4 lg:py-10">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <span className="font-display text-3xl font-bold text-brand-700 lg:text-4xl">{stat.value}</span>
            <span className="mt-1 text-sm text-brand-800/60">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
