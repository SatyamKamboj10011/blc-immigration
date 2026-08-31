import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { destinations, services } from '../data/site';

const programOptions = services.map((s) => s.shortTitle);

export default function QuickSearchBar() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [program, setProgram] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = destinations.find((d) => d.name === destination);
    if (dest) {
      navigate(`/study-abroad/${dest.slug}`);
      return;
    }
    const service = services.find((s) => s.shortTitle === program);
    navigate(service ? `/services/${service.slug}` : '/contact');
  };

  return (
    <div className="relative z-10 mx-auto -mt-10 w-full max-w-4xl px-5 sm:-mt-14 sm:px-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-xl2 border border-brand-900/10 bg-white p-4 shadow-card-hover sm:flex-row sm:items-center sm:gap-2 sm:p-3"
      >
        <p className="hidden shrink-0 pl-2 text-xs font-semibold uppercase tracking-wide text-brand-500 sm:block">
          Trusted by students across <span className="text-gold-700">multiple destinations</span>
        </p>
        <label className="flex-1">
          <span className="sr-only">Choose destination</span>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="focus-ring w-full rounded-full border border-brand-900/15 bg-paper px-4 py-2.5 text-sm font-medium text-brand-900"
          >
            <option value="">Select Country</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.name}>{d.name}</option>
            ))}
          </select>
        </label>
        <label className="flex-1">
          <span className="sr-only">Choose program</span>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="focus-ring w-full rounded-full border border-brand-900/15 bg-paper px-4 py-2.5 text-sm font-medium text-brand-900"
          >
            <option value="">Pick Your Program</option>
            {programOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <Button type="submit" variant="accent" className="sm:shrink-0">
          Send Request
        </Button>
      </form>
    </div>
  );
}
