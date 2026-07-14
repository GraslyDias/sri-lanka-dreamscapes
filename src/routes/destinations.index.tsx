import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingConcierge } from "@/components/site/FloatingConcierge";
import { destinations, destinationCategories, filterDestinations } from "@/data/destinations";

export const Route = createFileRoute("/destinations/")(({
  head: () => ({
    meta: [
      { title: "Destinations — Sri Lanka · Vaya Ceylon" },
      {
        name: "description",
        content: `Explore ${destinations.length} iconic Sri Lanka destinations — from misty highlands and ancient ruins to pristine beaches and leopard-rich safari parks.`,
      },
      { property: "og:title", content: "Sri Lanka Destinations · Vaya Ceylon" },
      { property: "og:description", content: "Discover the finest regions of Sri Lanka, curated for private luxury travel." },
    ],
    links: [{ rel: "canonical", href: "/destinations" }],
  }),
  component: DestinationsIndex,
} as any));

function DestinationsIndex() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => filterDestinations(category, query), [category, query]);

  return (
    <main className="bg-paper text-ink font-sans">
      <SiteNav />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-16 px-6 md:px-10 bg-gradient-to-b from-secondary to-paper">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">
            Regions of Ceylon
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-balance mb-6">
            Islands within <span className="italic text-ocean">the Island</span>.
          </h1>
          <p className="text-ink/60 max-w-xl leading-relaxed">
            Six climates, one small country. From mist-wrapped highlands to leopard-filled savanna
            and colonial forts by the sea.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-[68px] z-30 bg-paper/95 backdrop-blur-xl border-y border-ink/5 py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
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
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations, regions…"
              maxLength={80}
              className="w-full pl-11 pr-4 py-3 bg-secondary/60 border border-ink/10 rounded-full text-sm focus:outline-none focus:border-ocean transition-colors"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 mt-4 overflow-x-auto no-scrollbar">
          {destinationCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
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
            {results.length} {results.length === 1 ? "destination" : "destinations"} found
          </div>

          {results.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-ink/60 text-lg mb-4">No destinations match your search.</p>
              <button
                onClick={() => { setCategory("All"); setQuery(""); }}
                className="text-sunset uppercase text-[11px] tracking-[0.22em] font-semibold"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {results.map((dest) => (
                <Link
                  key={dest.slug}
                  to="/destinations/$slug"
                  params={{ slug: dest.slug }}
                  className="group flex flex-col bg-paper border border-ink/5 rounded-2xl overflow-hidden hover:shadow-lift transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-stone-100 relative">
                    <img
                      src={dest.coverImage}
                      alt={dest.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1.5 bg-paper/95 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-semibold text-ocean rounded-full">
                      {dest.category}
                    </span>
                    <span className="absolute bottom-4 right-4 px-3 py-1.5 bg-ink/70 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-medium text-paper rounded-full">
                      {dest.region}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-2xl md:text-[1.65rem] leading-tight mb-2 group-hover:text-ocean transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-ink/60 leading-relaxed line-clamp-3 mb-5 flex-1">
                      {dest.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-ink/5">
                      <div className="flex flex-wrap gap-1">
                        {dest.highlights.slice(0, 2).map((h) => (
                          <span key={h} className="text-[10px] uppercase tracking-[0.15em] text-ink/50 font-medium">
                            {h}
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-ink group-hover:text-sunset transition-colors shrink-0 ml-3">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-10 bg-ocean text-paper text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.35em] text-sunset font-medium mb-6 block">
            Craft your itinerary
          </span>
          <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">
            Can't choose? Let us design your route.
          </h2>
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-sunset text-ink font-semibold rounded-full text-[11px] uppercase tracking-[0.22em] hover:scale-[1.03] transition-transform"
          >
            Plan My Journey
          </Link>
        </div>
      </section>

      <SiteFooter />
      <FloatingConcierge />
    </main>
  );
}
