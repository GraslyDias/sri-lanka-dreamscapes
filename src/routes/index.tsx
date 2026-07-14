import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingConcierge } from "@/components/site/FloatingConcierge";
import { TourCard } from "@/components/site/TourCard";
import { tours, tourCategories, filterTours } from "@/data/tours";

import heroHighlands from "@/assets/hero-highlands.jpg";
import destSigiriya from "@/assets/dest-sigiriya.jpg";
import destGalle from "@/assets/dest-galle.jpg";
import galTea from "@/assets/gal-tea.jpg";
import galBreakfast from "@/assets/gal-breakfast.jpg";
import galTemple from "@/assets/gal-temple.jpg";
import galYacht from "@/assets/gal-yacht.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaya Ceylon — Private Luxury Journeys Through Sri Lanka" },
      {
        name: "description",
        content:
          "Handcrafted private expeditions across Sri Lanka. Browse curated luxury, wellness, wildlife, honeymoon and family tour packages.",
      },
      { property: "og:title", content: "Vaya Ceylon — Private Luxury Journeys Through Sri Lanka" },
      {
        property: "og:description",
        content: "Curated multi-day private tours across the teardrop isle.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    tone: "jungle",
    title: "Handpicked Sanctuaries",
    body: "From Geoffrey Bawa villas to boutique tea bungalows, only properties that embody the soul of the island.",
  },
  {
    tone: "ocean",
    title: "Local Stewardship",
    body: "Our guides are historians, naturalists and friends who unlock doors closed to the public.",
  },
  {
    tone: "sunset",
    title: "Seamless Transit",
    body: "Private chauffeur-guides and exclusive air transfers keep your focus on the landscape.",
  },
];

const destinations = [
  {
    img: destSigiriya,
    title: "Sigiriya & The North",
    body: "The cradle of Sinhalese civilization. Ascend the Lion Rock at sunrise before exploring the secret ruins of Ritigala by candlelight.",
  },
  {
    img: destGalle,
    title: "The Galle Riviera",
    body: "Cobblestones and sea spray. A living UNESCO heritage site where 17th-century ramparts meet avant-garde design.",
  },
  {
    img: heroHighlands,
    title: "The Central Highlands",
    body: "Emerald tea terraces, colonial bungalows and hushed dawns. The island's contemplative heart.",
  },
];

function Home() {
  const [activeCat, setActiveCat] = useState<string>("All");
  const visibleTours = filterTours(activeCat).slice(0, 6);

  return (
    <main className="bg-paper text-ink font-sans selection:bg-sunset/30 overflow-x-hidden">
      <SiteNav />

      {/* HERO — full bleed, edge to edge */}
      <section className="relative min-h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroHighlands}
            alt="Misty tea plantations at dawn in Sri Lanka"
            className="w-full h-full object-cover"
            width={1920}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/60" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 animate-reveal">
          <span className="text-paper/80 text-[11px] uppercase tracking-[0.35em] font-medium mb-6 block">
            Est. 1994 · Private Ceylon Journeys
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-paper leading-[0.95] text-balance mb-8">
            Sri Lanka <span className="italic font-light text-sunset">Beyond</span> the Ordinary
          </h1>
          <p className="text-base md:text-lg text-paper/80 max-w-xl mx-auto font-light leading-relaxed text-pretty mb-10">
            Private, handcrafted expeditions through the teardrop isle, designed by those who call
            its emerald hills home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              to="/tours"
              className="px-10 py-4 bg-sunset text-ink font-semibold rounded-full text-[11px] uppercase tracking-[0.22em] hover:scale-[1.03] transition-transform shadow-lift"
            >
              Explore Tours
            </Link>
            <a
              href="#packages"
              className="px-10 py-4 bg-paper/10 backdrop-blur-md border border-paper/30 text-paper rounded-full text-[11px] uppercase tracking-[0.22em] hover:bg-paper hover:text-ink transition-all"
            >
              Featured Journeys
            </a>
          </div>
        </div>

        <a
          href="#packages"
          aria-label="Scroll to tours"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-paper/70 text-[10px] uppercase tracking-[0.3em] flex flex-col items-center gap-3 animate-reveal [animation-delay:600ms]"
        >
          <span>Discover</span>
          <span className="w-px h-10 bg-paper/40" />
        </a>
      </section>

      {/* TRUST BAR */}
      <section className="py-14 px-6 md:px-10 border-b border-ink/5 bg-paper">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-ink/50">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-ink/70">
            As featured in
          </span>
          {["Condé Nast Traveller", "The Times Luxury", "Cereal Magazine", "Departures"].map((p) => (
            <span key={p} className="font-display text-xl md:text-2xl">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* PACKAGES — the main event */}
      <section id="packages" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-4 block">
              Signature Journeys
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
              Curated tour packages across the island.
            </h2>
            <p className="mt-6 text-ink/60 max-w-lg leading-relaxed">
              Every itinerary is private, considered and fully customisable — from cultural
              immersions to leopard safaris and honeymoon sanctuaries.
            </p>
          </div>
          <Link
            to="/tours"
            className="text-[11px] uppercase tracking-[0.22em] border-b border-ink/25 pb-1 hover:border-sunset hover:text-sunset transition-colors self-start md:self-auto whitespace-nowrap"
          >
            View All {tours.length} Tours →
          </Link>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {tourCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full transition-all border ${
                activeCat === cat
                  ? "bg-ink text-paper border-ink"
                  : "bg-transparent text-ink/70 border-ink/15 hover:border-ink/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {visibleTours.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {visibleTours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        ) : (
          <p className="text-center text-ink/50 py-16">No tours in this category yet.</p>
        )}

        <div className="text-center mt-14">
          <Link
            to="/tours"
            className="inline-block px-10 py-4 bg-ocean text-paper rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold hover:bg-ink transition-colors"
          >
            Browse All Tours
          </Link>
        </div>
      </section>

      {/* PILLARS */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-4 block">
              The Vaya Difference
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
              A quieter, more considered way to see Ceylon.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {pillars.map((p) => (
              <div key={p.title} className="space-y-6">
                <div
                  className={`size-12 rounded-full border grid place-items-center ${
                    p.tone === "jungle"
                      ? "border-jungle/25 text-jungle"
                      : p.tone === "ocean"
                      ? "border-ocean/25 text-ocean"
                      : "border-sunset/40 text-sunset"
                  }`}
                >
                  <div
                    className={`size-2 rounded-full ${
                      p.tone === "jungle" ? "bg-jungle" : p.tone === "ocean" ? "bg-ocean" : "bg-sunset"
                    }`}
                  />
                </div>
                <h3 className="font-display text-3xl">{p.title}</h3>
                <p className="text-ink/60 leading-relaxed text-sm">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS — sticky editorial */}
      <section id="destinations" className="py-28 md:py-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 md:col-span-5">
            <div className="md:sticky md:top-32">
              <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">
                Regions
              </span>
              <h2 className="font-display text-5xl md:text-6xl text-ink leading-[1.05] text-balance">
                Islands within <br />
                <span className="italic text-ocean">the Island</span>
              </h2>
              <p className="mt-8 text-ink/60 leading-relaxed max-w-sm">
                Six distinct climates, one small country. We chart the routes so you inhabit each
                one at its most magical hour.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 space-y-20 md:space-y-32">
            {destinations.map((d) => (
              <article key={d.title} className="group">
                <div className="aspect-video bg-stone-100 rounded-2xl overflow-hidden mb-8">
                  <img
                    src={d.img}
                    alt={d.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                </div>
                <h4 className="font-display text-3xl md:text-4xl mb-4">{d.title}</h4>
                <p className="text-ink/60 font-light leading-relaxed max-w-xl">{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 md:py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-3 block">
              @vayaceylon
            </span>
            <h2 className="font-display text-4xl md:text-5xl">Postcards from Ceylon.</h2>
          </div>
          <a
            href="#"
            className="text-[11px] uppercase tracking-[0.22em] border-b border-ink/20 pb-1 hover:border-ocean transition-colors self-start md:self-auto"
          >
            Follow the Journal
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-3 md:px-4">
          {[galTea, galBreakfast, galTemple, galYacht].map((src, i) => (
            <div
              key={i}
              className={`aspect-[3/4] rounded-xl overflow-hidden bg-stone-200 ${
                i % 2 === 1 ? "translate-y-6 md:translate-y-12" : ""
              }`}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="py-32 md:py-48 px-6 md:px-10 text-center bg-ocean text-paper">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.35em] text-sunset font-medium mb-8 block">
            Begin your consultation
          </span>
          <h2 className="font-display text-5xl md:text-6xl mb-10 leading-tight text-balance">
            Begin Your Story <br />
            in the Indian Ocean
          </h2>
          <p className="text-paper/70 mb-12 text-base md:text-lg max-w-xl mx-auto">
            Allow our consultants to craft a journey as unique as your own signature.
          </p>
          <div id="plan" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tours"
              className="inline-block px-12 py-5 bg-sunset text-ink font-semibold rounded-full hover:scale-[1.03] transition-transform text-sm tracking-widest uppercase"
            >
              Explore Tours
            </Link>
            <a
              href="mailto:concierge@vayaceylon.com"
              className="inline-block px-12 py-5 bg-transparent border border-paper/30 text-paper rounded-full hover:bg-paper hover:text-ink transition-colors text-sm tracking-widest uppercase"
            >
              Speak to a Specialist
            </a>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] uppercase tracking-[0.25em] font-medium text-paper/50">
            <span>WhatsApp Concierge</span>
            <span>+94 11 234 5678</span>
            <span>concierge@vayaceylon.com</span>
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatingConcierge />
    </main>
  );
}
