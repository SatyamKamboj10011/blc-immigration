import { processSteps } from '../data/site';

export default function ProcessTimeline() {
  return (
    <div className="overflow-hidden rounded-xl2 border border-brand-900/15 bg-brand-950 shadow-card">
      <div className="flex items-center justify-between border-b border-white/10 bg-brand-900 px-5 py-3">
        <span className="eyebrow text-gold-400">Journey Board</span>
        <span className="hidden font-mono text-[0.65rem] text-brand-300 sm:block">STATUS: IN PROGRESS</span>
      </div>
      <ol>
        {processSteps.map((step, i) => (
          <li
            key={step.number}
            className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 ${
              i !== processSteps.length - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            <span className="font-mono text-sm font-semibold text-gold-400 sm:w-12">{step.number}</span>
            <span className="font-display text-base font-semibold text-white sm:w-64 sm:shrink-0">
              {step.title}
            </span>
            <span className="text-sm leading-relaxed text-brand-200">{step.description}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
