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
    <section className="bg-brand-950">
      <div className="container-page grid grid-cols-2 gap-6 py-10 lg:grid-cols-4 lg:py-12">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center text-center ${i !== 0 ? 'lg:border-l lg:border-white/10' : ''}`}
          >
            <span className="font-display text-3xl font-black text-gold-500 lg:text-4xl">{stat.value}</span>
            <span className="mt-1 text-sm font-semibold uppercase tracking-wide text-white/60">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
