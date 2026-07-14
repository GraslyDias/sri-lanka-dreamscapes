import { Link } from "@tanstack/react-router";
import type { Tour } from "@/data/tours";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      to="/tours/$slug"
      params={{ slug: tour.slug }}
      className="group flex flex-col bg-paper border border-ink/5 rounded-2xl overflow-hidden hover:shadow-lift transition-all duration-500 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] overflow-hidden bg-stone-100 relative">
        <img
          src={tour.coverImage}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 px-3 py-1.5 bg-paper/95 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-semibold text-ocean rounded-full">
          {tour.category}
        </span>
        <span className="absolute top-4 right-4 px-3 py-1.5 bg-ink/70 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-medium text-paper rounded-full flex items-center gap-1.5">
          <span className="text-sunset">★</span> {tour.rating.toFixed(1)}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-ink/50 font-semibold mb-3">
          <span>{tour.duration}</span>
          <span className="size-1 rounded-full bg-ink/20" />
          <span>{tour.destinations.length} destinations</span>
        </div>
        <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight mb-3 group-hover:text-ocean transition-colors">
          {tour.title}
        </h3>
        <p className="text-sm text-ink/60 leading-relaxed line-clamp-3 mb-6 flex-1">
          {tour.shortDescription}
        </p>
        <div className="flex items-end justify-between pt-5 border-t border-ink/5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40 block">From</span>
            <span className="font-display text-2xl text-ocean">
              ${tour.startingPrice.toLocaleString()}
              <span className="text-xs text-ink/40 font-sans italic ml-1">pp</span>
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-ink group-hover:text-sunset transition-colors">
            View Tour →
          </span>
        </div>
      </div>
    </Link>
  );
}
