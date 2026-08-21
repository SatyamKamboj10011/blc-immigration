import { VideoTestimonial } from '../data/site';

export default function SuccessStoryCard({ name, outcome, youtubeId }: VideoTestimonial) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring group flex h-full flex-col overflow-hidden rounded-xl2 border border-brand-900/10 bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-brand-950">
        <img
          src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
          alt={`${name} — ${outcome}`}
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-brand-950/25 transition-colors group-hover:bg-brand-950/10">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/60 bg-brand-950/80 text-gold-400 shadow-md backdrop-blur-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="font-display text-base font-semibold text-brand-950">{name}</h3>
        <p className="text-sm leading-relaxed text-brand-800/75">{outcome}</p>
        <span className="eyebrow mt-auto pt-2 text-brand-600">Watch on YouTube</span>
      </div>
    </a>
  );
}
