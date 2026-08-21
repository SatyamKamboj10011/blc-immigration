import { useState } from 'react';
import Button from './Button';
import Icon from './Icon';
import { destinations } from '../data/site';

const educationOptions = ['Class 12 / Higher Secondary', "Bachelor's Degree", "Master's Degree", 'Diploma / Vocational'];
const englishOptions = ['Not started yet', 'Currently preparing', 'Already have a valid score'];

interface Result {
  headline: string;
  points: string[];
}

function buildResult(education: string, destination: string, english: string): Result {
  const dest = destinations.find((d) => d.name === destination);
  const points: string[] = [];

  if (english === 'Not started yet') {
    points.push('Start with an English test decision — BLC can help you choose between IELTS and PTE based on your target institutions.');
  } else if (english === 'Currently preparing') {
    points.push('Keep up structured practice — book a mock test with BLC to check your readiness before the real exam.');
  } else {
    points.push('With a valid score in hand, the next step is usually shortlisting institutions and preparing documentation.');
  }

  if (dest) {
    points.push(`For ${dest.name}, BLC can walk you through: ${dest.studyOptions[0].toLowerCase()} and ${dest.studyOptions[1].toLowerCase()}.`);
  }

  if (education === 'Class 12 / Higher Secondary') {
    points.push('Undergraduate pathway and foundation programmes are usually the starting point at your stage.');
  } else {
    points.push('Postgraduate programmes matching your existing qualification are usually the starting point at your stage.');
  }

  points.push('This is general guidance only — a one-to-one consultation will confirm what applies to your specific situation.');

  return {
    headline: `Here's where to start${dest ? ` — ${dest.name}` : ''}`,
    points,
  };
}

export default function EligibilityCheck() {
  const [education, setEducation] = useState('');
  const [destination, setDestination] = useState('');
  const [english, setEnglish] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const canCheck = education && destination && english;

  return (
    <div className="rounded-xl2 border border-brand-900/10 bg-white p-6 shadow-card sm:p-8">
      {!result ? (
        <div className="flex flex-col gap-6">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-brand-900">Your current education level</legend>
            <div className="flex flex-wrap gap-2">
              {educationOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setEducation(opt)}
                  className={`focus-ring rounded-sm border px-3.5 py-2 text-sm font-medium transition-colors ${
                    education === opt ? 'border-brand-800 bg-brand-800 text-paper' : 'border-brand-800/25 text-brand-800 hover:border-brand-800/60'
                  }`}
                  aria-pressed={education === opt}
                >
                  {opt}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-brand-900">Destination you're considering</legend>
            <div className="flex flex-wrap gap-2">
              {destinations.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => setDestination(d.name)}
                  className={`focus-ring rounded-sm border px-3.5 py-2 text-sm font-medium transition-colors ${
                    destination === d.name ? 'border-brand-800 bg-brand-800 text-paper' : 'border-brand-800/25 text-brand-800 hover:border-brand-800/60'
                  }`}
                  aria-pressed={destination === d.name}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-brand-900">English test status</legend>
            <div className="flex flex-wrap gap-2">
              {englishOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setEnglish(opt)}
                  className={`focus-ring rounded-sm border px-3.5 py-2 text-sm font-medium transition-colors ${
                    english === opt ? 'border-brand-800 bg-brand-800 text-paper' : 'border-brand-800/25 text-brand-800 hover:border-brand-800/60'
                  }`}
                  aria-pressed={english === opt}
                >
                  {opt}
                </button>
              ))}
            </div>
          </fieldset>

          <Button
            type="button"
            size="lg"
            onClick={() => canCheck && setResult(buildResult(education, destination, english))}
            className={`w-fit ${!canCheck ? 'pointer-events-none opacity-40' : ''}`}
          >
            See My Starting Point
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-brand-800 text-white">
              <Icon name="check" className="h-5 w-5" />
            </span>
            <h3 className="font-display text-xl font-semibold text-brand-950">{result.headline}</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {result.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-brand-800/85">
                <Icon name="arrow" className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button to="/contact" variant="accent">Book a Consultation</Button>
            <Button variant="secondary" onClick={() => setResult(null)}>Start Over</Button>
          </div>
        </div>
      )}
    </div>
  );
}
