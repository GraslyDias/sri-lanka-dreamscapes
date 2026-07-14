import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingConcierge } from "@/components/site/FloatingConcierge";
import { TourCard } from "@/components/site/TourCard";
import { tours, tourCategories, filterTours, type Tour } from "@/data/tours";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tours/")({
  head: () => ({
    meta: [
      { title: "All Tours — Vaya Ceylon" },
      {
        name: "description",
        content: `Browse ${tours.length} curated private tour packages across Sri Lanka — luxury, wellness, wildlife, honeymoon and family journeys.`,
      },
      { property: "og:title", content: "All Tour Packages · Vaya Ceylon" },
      { property: "og:description", content: "Curated private tours across Sri Lanka." },
      { property: "og:url", content: "/tours" },
    ],
    links: [{ rel: "canonical", href: "/tours" }],
  }),
  component: ToursIndex,
});

type SortKey = "featured" | "price-asc" | "price-desc" | "duration" | "rating";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price · Low to High" },
  { key: "price-desc", label: "Price · High to Low" },
  { key: "duration", label: "Duration" },
  { key: "rating", label: "Rating" },
];

const PAGE_SIZE = 6;

function ToursIndex() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  const results = useMemo(() => {
    const filtered = filterTours(category, query);
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.startingPrice - b.startingPrice;
        case "price-desc":
          return b.startingPrice - a.startingPrice;
        case "duration":
          return a.days - b.days;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    return sorted;
  }, [category, query, sort]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <main className="bg-paper text-ink font-sans">
      <SiteNav />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-10 bg-gradient-to-b from-secondary to-paper">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-4 block">
            All Journeys
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-balance mb-6">
            Every path through <span className="italic text-ocean">Ceylon</span>.
          </h1>
          <p className="text-ink/60 max-w-xl leading-relaxed">
            {tours.length} curated private tour packages — from wildlife expeditions to honeymoon
            sanctuaries. Every journey fully customisable.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-[68px] z-30 bg-paper/95 backdrop-blur-xl border-y border-ink/5 py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <svg
              viewBox="0 0 24 24"
              className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-ink/40"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search destinations, packages…"
              maxLength={80}
              className="w-full pl-11 pr-4 py-3 bg-secondary/60 border border-ink/10 rounded-full text-sm focus:outline-none focus:border-ocean transition-colors"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="px-5 py-3 bg-secondary/60 border border-ink/10 rounded-full text-sm focus:outline-none focus:border-ocean transition-colors"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 bg-secondary/60 border border-ink/10 rounded-full">
            <button
              onClick={() => setView("grid")}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.22em] rounded-full transition-colors ${
                view === "grid" ? "bg-ink text-paper" : "text-ink/60"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.22em] rounded-full transition-colors ${
                view === "list" ? "bg-ink text-paper" : "text-ink/60"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Category chips */}
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 mt-4 overflow-x-auto no-scrollbar">
          {tourCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.22em] font-semibold rounded-full transition-all border whitespace-nowrap ${
                category === cat
                  ? "bg-ink text-paper border-ink"
                  : "bg-transparent text-ink/70 border-ink/15 hover:border-ink/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="py-14 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.22em] text-ink/50 mb-8">
            {results.length} {results.length === 1 ? "tour" : "tours"} found
          </div>

          {pageItems.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-ink/60 text-lg mb-4">No tours match your search.</p>
              <button
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
                className="text-sunset uppercase text-[11px] tracking-[0.22em] font-semibold"
              >
                Reset filters
              </button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {pageItems.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {pageItems.map((t) => (
                <TourListRow key={t.slug} tour={t} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.22em] border border-ink/15 rounded-full disabled:opacity-30 hover:border-ink"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`size-10 rounded-full text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? "bg-ink text-paper"
                      : "text-ink/60 hover:bg-ink/5"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.22em] border border-ink/15 rounded-full disabled:opacity-30 hover:border-ink"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
      <FloatingConcierge />
    </main>
  );
}

function TourListRow({ tour }: { tour: Tour }) {
  return (
    <Link
      to="/tours/$slug"
      params={{ slug: tour.slug }}
      className="group grid grid-cols-1 md:grid-cols-[280px_1fr_auto] gap-6 md:gap-8 items-stretch bg-paper border border-ink/5 rounded-2xl overflow-hidden hover:shadow-lift transition-all p-4"
    >
      <div className="aspect-[4/3] md:aspect-auto overflow-hidden rounded-xl bg-stone-100 relative">
        <img
          src={tour.coverImage}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-ocean/10 text-ocean text-[10px] uppercase tracking-[0.2em] font-semibold rounded-full">
            {tour.category}
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-ink/50">
            {tour.duration}
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-sunset">
            ★ {tour.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="font-display text-3xl mb-3 group-hover:text-ocean transition-colors">
          {tour.title}
        </h3>
        <p className="text-sm text-ink/60 mb-3 line-clamp-2">{tour.shortDescription}</p>
        <div className="text-[11px] text-ink/50">{tour.routeSummary}</div>
      </div>
      <div className="flex md:flex-col items-end justify-between md:justify-center gap-4 md:min-w-[140px] md:pr-4">
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40 block">From</span>
          <span className="font-display text-3xl text-ocean">
            ${tour.startingPrice.toLocaleString()}
          </span>
        </div>
        <span className="text-[11px] uppercase tracking-[0.22em] font-semibold group-hover:text-sunset transition-colors">
          View Tour →
        </span>
      </div>
    </Link>
  );
}
