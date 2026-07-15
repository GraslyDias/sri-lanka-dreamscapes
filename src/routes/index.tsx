import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingConcierge } from "@/components/site/FloatingConcierge";
import { TourCard } from "@/components/site/TourCard";
import { SriLankaMapSection } from "@/components/site/sri-lanka-map-section";
import { tours, tourCategories, filterTours } from "@/data/tours";
import { destinations } from "@/data/destinations";

import heroHighlands from "@/assets/hero-highlands.jpg";
import destSigiriya from "@/assets/dest-sigiriya.jpg";
import destGalle from "@/assets/dest-galle.jpg";
import galTea from "@/assets/gal-tea.jpg";
import galBreakfast from "@/assets/gal-breakfast.jpg";
import galTemple from "@/assets/gal-temple.jpg";
import galYacht from "@/assets/gal-yacht.jpg";
import pkgYala from "@/assets/pkg-yala.jpg";
import pkgCoast from "@/assets/pkg-coast.jpg";

export const Route = createFileRoute("/")(({
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
} as any));

const pillars = [
  {
    tone: "jungle",
    title: "Handpicked Sanctuaries",
    body: "From Geoffrey Bawa villas to boutique tea bungalows, only properties that embody the soul of the island.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tone: "ocean",
    title: "Local Stewardship",
    body: "Our guides are historians, naturalists and friends who unlock doors closed to the public.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tone: "sunset",
    title: "Seamless Transit",
    body: "Private chauffeur-guides and exclusive air transfers keep your focus on the landscape.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote: "Vaya Ceylon didn't just show us Sri Lanka — they introduced us to it. Every transition was choreographed; every moment felt like a private gift.",
    author: "Helena & Marcus T.",
    origin: "Zurich, Switzerland",
    tour: "Beyond the Ordinary",
    rating: 5,
  },
  {
    quote: "The naturalist guide in Yala was the most knowledgeable person I've ever met in the field. He found a leopard in minutes.",
    author: "James A.",
    origin: "London, United Kingdom",
    tour: "Ultimate Wildlife Adventure",
    rating: 5,
  },
  {
    quote: "Our honeymoon was everything we dreamed — tea fields at night, champagne at sunrise, and a team that anticipated every wish.",
    author: "Priya & Arjun N.",
    origin: "Mumbai, India",
    tour: "Luxury Honeymoon Journey",
    rating: 5,
  },
];

// Featured destinations for homepage preview
const featuredDestinations = [
  { slug: "ella", name: "Ella", region: "Hill Country", img: galTea, emoji: "🏔" },
  { slug: "sigiriya", name: "Sigiriya", region: "Cultural Triangle", img: destSigiriya, emoji: "🏯" },
  { slug: "kandy", name: "Kandy", region: "Central Province", img: galTemple, emoji: "🛕" },
  { slug: "yala", name: "Yala", region: "Southern Province", img: pkgYala, emoji: "🐆" },
  { slug: "mirissa", name: "Mirissa", region: "Southern Coast", img: galYacht, emoji: "🐋" },
  { slug: "galle", name: "Galle", region: "Southern Province", img: destGalle, emoji: "⛵" },
];

function Home() {
  const [activeCat, setActiveCat] = useState<string>("All");
  const visibleTours = filterTours(activeCat).slice(0, 6);

  return (
    <main className="bg-paper text-ink font-sans selection:bg-sunset/30 overflow-x-hidden">
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroHighlands}
            alt="Misty tea plantations at dawn in Sri Lanka"
            className="w-full h-full object-cover"
            width={1920}
            height={1200}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/65" />
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

      {/* ── TRUST BAR ─────────────────────────────────────────── */}
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

      {/* ── TOUR PACKAGES ─────────────────────────────────────── */}
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
            View All Tours →
          </Link>
        </div>
      </section>

      {/* ── WHY TRAVEL WITH US ────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-4 block">
              The Vaya Difference
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
              A quieter, more considered way to see Ceylon.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {pillars.map((p) => (
              <div key={p.title} className="group">
                <div
                  className={`size-14 rounded-2xl border flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${
                    p.tone === "jungle"
                      ? "border-jungle/25 text-jungle bg-jungle/5"
                      : p.tone === "ocean"
                      ? "border-ocean/25 text-ocean bg-ocean/5"
                      : "border-sunset/40 text-sunset bg-sunset/5"
                  }`}
                >
                  {p.icon}
                </div>
                <h3 className="font-display text-2xl md:text-3xl mb-4">{p.title}</h3>
                <p className="text-ink/60 leading-relaxed text-sm">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-ink/10">
            {[
              { value: "30+", label: "Years of experience" },
              { value: "4,200+", label: "Guests served" },
              { value: "4.9★", label: "Average rating" },
              { value: "100%", label: "Private journeys" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="font-display text-4xl md:text-5xl text-ocean block mb-2">{s.value}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-ink/60">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS ─────────────────────────────── */}
      <section id="destinations" className="py-28 md:py-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">
                Regions
              </span>
              <h2 className="font-display text-5xl md:text-6xl text-ink leading-[1.05] text-balance">
                Islands within <br />
                <span className="italic text-ocean">the Island</span>
              </h2>
              <p className="mt-8 text-ink/60 leading-relaxed max-w-md">
                Six distinct climates, one small country. We chart the routes so you inhabit each
                one at its most magical hour.
              </p>
            </div>
            <Link
              to="/destinations"
              className="text-[11px] uppercase tracking-[0.22em] border-b border-ink/25 pb-1 hover:border-ocean hover:text-ocean transition-colors self-start md:self-auto whitespace-nowrap"
            >
              Explore All Destinations →
            </Link>
          </div>

          {/* Destination Card Grid — 50/50 left info + right mosaic grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Highlight card with details */}
            <div className="space-y-4">
              {featuredDestinations.slice(0, 3).map((dest, i) => (
                <Link
                  key={dest.slug}
                  to="/destinations/$slug"
                  params={{ slug: dest.slug }}
                  className="group flex items-center gap-5 p-4 rounded-2xl bg-secondary border border-ink/5 hover:border-ocean/30 hover:shadow-soft transition-all"
                >
                  <div className="size-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-2xl leading-tight group-hover:text-ocean transition-colors">{dest.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-ink/50 mt-1">{dest.region}</p>
                  </div>
                  <span className="text-ink/30 group-hover:text-ocean transition-colors text-lg">→</span>
                </Link>
              ))}
            </div>

            {/* Right: Destination photo mosaic */}
            <div className="grid grid-cols-2 gap-4">
              {featuredDestinations.slice(0, 4).map((dest, i) => (
                <Link
                  key={dest.slug}
                  to="/destinations/$slug"
                  params={{ slug: dest.slug }}
                  className={`group relative overflow-hidden rounded-2xl bg-stone-100 ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
                >
                  <img
                    src={dest.img}
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-paper">
                    <p className="font-display text-xl leading-tight">{dest.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-paper/70 mt-0.5">{dest.region}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* More destinations row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {featuredDestinations.slice(2).map((dest) => (
              <Link
                key={dest.slug}
                to="/destinations/$slug"
                params={{ slug: dest.slug }}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-100"
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-3 text-paper">
                  <p className="font-display text-lg leading-tight">{dest.name}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className="inline-block px-10 py-4 bg-ink text-paper rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold hover:bg-ocean transition-colors"
            >
              Explore All Destinations →
            </Link>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE MAP SECTION ──────────────────────────── */}
      <SriLankaMapSection />

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-ink text-paper">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-sunset font-semibold mb-4 block">
              Guest Stories
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
              Words from the road.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-paper/5 border border-paper/10 rounded-2xl p-8 flex flex-col hover:bg-paper/8 transition-colors">
                <div className="flex gap-1 text-sunset mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <blockquote className="font-light text-paper/80 leading-relaxed flex-1 mb-6 text-[15px]">
                  "{t.quote}"
                </blockquote>
                <div className="pt-6 border-t border-paper/10">
                  <p className="font-display text-lg text-paper">{t.author}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-paper/40 mt-1">{t.origin}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-sunset mt-1">{t.tour}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────── */}
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
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="py-32 md:py-48 px-6 md:px-10 text-center bg-ocean text-paper">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tours"
              className="inline-block px-12 py-5 bg-sunset text-ink font-semibold rounded-full hover:scale-[1.03] transition-transform text-sm tracking-widest uppercase"
            >
              Explore Tours
            </Link>
            <Link
              to="/contact"
              className="inline-block px-12 py-5 bg-transparent border border-paper/30 text-paper rounded-full hover:bg-paper hover:text-ink transition-colors text-sm tracking-widest uppercase"
            >
              Speak to a Specialist
            </Link>
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
