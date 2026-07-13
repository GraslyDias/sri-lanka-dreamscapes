import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingConcierge } from "@/components/site/FloatingConcierge";

import heroHighlands from "@/assets/hero-highlands.jpg";
import destSigiriya from "@/assets/dest-sigiriya.jpg";
import destGalle from "@/assets/dest-galle.jpg";
import pkgYala from "@/assets/pkg-yala.jpg";
import pkgCoast from "@/assets/pkg-coast.jpg";
import galTea from "@/assets/gal-tea.jpg";
import galBreakfast from "@/assets/gal-breakfast.jpg";
import galTemple from "@/assets/gal-temple.jpg";
import galYacht from "@/assets/gal-yacht.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const pillars = [
  {
    tone: "jungle",
    title: "Handpicked Sanctuaries",
    body: "From Geoffrey Bawa villas to boutique tea bungalows, we only partner with properties that embody the soul of the island.",
  },
  {
    tone: "ocean",
    title: "Local Stewardship",
    body: "Our guides are historians, naturalists and friends who unlock doors closed to the public.",
  },
  {
    tone: "sunset",
    title: "Seamless Transit",
    body: "Private chauffeur-guides and exclusive air transfers keep your focus on the landscape, not the logistics.",
  },
];

const packages = [
  {
    slug: "cultural-triangle-and-coast",
    img: pkgYala,
    tagTone: "text-sunset",
    tag: "12 Days · Wild & Wellness",
    title: "The Wild Heart & Sacred Soul",
    price: "$8,400",
  },
  {
    slug: "cultural-triangle-and-coast",
    img: pkgCoast,
    tagTone: "text-jungle",
    tag: "9 Days · Coastal Escape",
    title: "Golden Shores & Galle Fort",
    price: "$6,200",
  },
  {
    slug: "cultural-triangle-and-coast",
    img: destSigiriya,
    tagTone: "text-paper/60",
    tag: "10 Days · Heritage",
    title: "The Ancient Triangle",
    price: "$7,100",
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
  return (
    <main className="bg-paper text-ink font-sans selection:bg-sunset/30 overflow-x-hidden">
      <SiteNav />

      {/* HERO */}
      <section className="relative h-screen w-full flex items-center justify-center pt-20">
        <div className="absolute inset-0 px-4 md:px-8 py-4 md:py-8">
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
            <img
              src={heroHighlands}
              alt="Misty tea plantations at dawn in Sri Lanka"
              className="w-full h-full object-cover"
              width={1920}
              height={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20" />
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 animate-reveal">
          <span className="text-paper/80 text-[11px] uppercase tracking-[0.35em] font-medium mb-6 block">
            Est. 1994 · Private Ceylon Journeys
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-paper leading-[0.95] text-balance mb-8">
            Sri Lanka <span className="italic font-light text-sunset">Beyond</span> the Ordinary
          </h1>
          <p className="text-base md:text-lg text-paper/80 max-w-xl mx-auto font-light leading-relaxed text-pretty">
            Private, handcrafted expeditions through the teardrop isle, designed by those who call
            its emerald hills home.
          </p>
        </div>

        {/* Floating planner */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 md:px-8 z-20 animate-reveal [animation-delay:400ms]">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-paper/95 backdrop-blur-xl ring-1 ring-ink/5 p-6 md:p-8 rounded-2xl shadow-lift grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-6 items-end"
          >
            {[
              { label: "Destination", options: ["Cultural Triangle", "Southern Coast", "Hill Country", "Wild Yala"] },
              { label: "Travel Style", options: ["Heritage & Wellness", "Wildlife & Safari", "Private Honeymoon", "Family Adventure"] },
              { label: "Season", options: ["Dec – Mar", "Apr – Jun", "Jul – Sep", "Oct – Nov"] },
            ].map((f) => (
              <label key={f.label} className="block space-y-2 min-w-0">
                <span className="text-[10px] uppercase tracking-[0.22em] text-ink/50 block ml-1 font-semibold">
                  {f.label}
                </span>
                <select className="w-full bg-transparent border-b border-ink/15 py-2 text-sm focus:outline-none focus:border-ocean transition-colors">
                  {f.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            ))}
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-sunset text-ink font-medium text-sm rounded-lg hover:brightness-95 transition-all shadow-md shadow-sunset/20 whitespace-nowrap"
            >
              Personalize Itinerary
            </button>
          </form>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="pt-40 pb-20 px-6 md:px-10 border-b border-ink/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-ink/50">
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

      {/* PILLARS */}
      <section id="experiences" className="py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto">
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
                    p.tone === "jungle"
                      ? "bg-jungle"
                      : p.tone === "ocean"
                      ? "bg-ocean"
                      : "bg-sunset"
                  }`}
                />
              </div>
              <h3 className="font-display text-3xl">{p.title}</h3>
              <p className="text-ink/60 leading-relaxed text-sm">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PACKAGES */}
      <section className="py-24 md:py-28 bg-ink text-paper overflow-hidden">
        <div className="px-6 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-sunset font-semibold mb-4 block">
              Signature Journeys
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Masterfully paced itineraries.
            </h2>
          </div>
          <Link
            to="/tours/$slug"
            params={{ slug: "cultural-triangle-and-coast" }}
            className="text-[11px] uppercase tracking-[0.22em] border-b border-paper/25 pb-1 hover:border-sunset hover:text-sunset transition-colors self-start md:self-auto"
          >
            View All Collections
          </Link>
        </div>

        <div className="flex gap-6 md:gap-8 px-6 md:px-10 overflow-x-auto pb-8 snap-x no-scrollbar">
          {packages.map((p, i) => (
            <Link
              key={i}
              to="/tours/$slug"
              params={{ slug: p.slug }}
              className="flex-none w-[320px] md:w-[440px] snap-center group"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-5 bg-paper/5">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <span
                    className={`text-[10px] uppercase tracking-[0.22em] font-semibold block mb-2 ${p.tagTone}`}
                  >
                    {p.tag}
                  </span>
                  <h4 className="font-display text-2xl md:text-3xl truncate">{p.title}</h4>
                </div>
                <span className="font-display text-xl md:text-2xl shrink-0">
                  {p.price} <span className="text-xs text-paper/40 font-sans italic">pp</span>
                </span>
              </div>
            </Link>
          ))}
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
      <section id="journal" className="py-20 md:py-24 bg-paper">
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
      <section id="plan" className="py-32 md:py-48 px-6 md:px-10 text-center bg-ocean text-paper">
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
          <Link
            to="/tours/$slug"
            params={{ slug: "cultural-triangle-and-coast" }}
            className="inline-block px-12 py-5 bg-sunset text-ink font-semibold rounded-full hover:scale-[1.03] transition-transform text-sm tracking-widest uppercase"
          >
            Start Private Consultation
          </Link>
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
