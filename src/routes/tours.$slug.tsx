import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingConcierge } from "@/components/site/FloatingConcierge";

import tourHero from "@/assets/tour-hero.jpg";
import destSigiriya from "@/assets/dest-sigiriya.jpg";
import destGalle from "@/assets/dest-galle.jpg";
import hotelBungalow from "@/assets/hotel-bungalow.jpg";
import actSafari from "@/assets/act-safari.jpg";
import actAyurveda from "@/assets/act-ayurveda.jpg";
import heroHighlands from "@/assets/hero-highlands.jpg";

export const Route = createFileRoute("/tours/$slug")({
  head: () => ({
    meta: [
      { title: "The Cultural Triangle & Coast — 12 Day Journey · Vaya Ceylon" },
      {
        name: "description",
        content:
          "A 12-day private journey through Sri Lanka's ancient heart and southern shores. Heritage stays, safaris, wellness rituals.",
      },
      {
        property: "og:title",
        content: "The Cultural Triangle & Coast — 12 Day Journey",
      },
      {
        property: "og:description",
        content:
          "A 12-day private journey through Sri Lanka's ancient heart and southern shores.",
      },
    ],
  }),
  component: TourDetail,
});

const days = [
  {
    range: "Day 01 – 02",
    title: "Arrival · Colombo Heritage",
    body: "Private airport transfer, an evening walking tour of 19th-century mansions with a resident historian, and dinner at a private colonial residence.",
    stay: "Galle Face Hotel · Heritage Wing",
  },
  {
    range: "Day 03 – 05",
    title: "Sacred Heights · Sigiriya & Dambulla",
    body: "Ascend the Lion Rock at dawn before the crowds arrive. Sunset picnic overlooking the plains. Private access to the Dambulla cave temples.",
    stay: "Water Garden Sigiriya",
  },
  {
    range: "Day 06 – 07",
    title: "Mist & Tea · Nuwara Eliya",
    body: "A private tea-plucking morning with the estate manager, followed by an afternoon on the vintage first-class carriage of the hill-country railway.",
    stay: "Ceylon Tea Trails · Norwood Bungalow",
  },
  {
    range: "Day 08 – 10",
    title: "Wild Interior · Yala Reserve",
    body: "Two full-day private jeep safaris with a specialist naturalist, tracking leopard, sloth bear and endemic birdlife.",
    stay: "Wild Coast Tented Lodge",
  },
  {
    range: "Day 11 – 12",
    title: "Southern Shore · Galle Fort",
    body: "Colonial rampart walks at golden hour, a private lunch with a local artist, and time to slow at the water's edge.",
    stay: "Amangalla · Galle",
  },
];

const inclusions = [
  "Private airport transfers",
  "5-star heritage accommodation",
  "All breakfasts & 6 signature dinners",
  "Chauffeur-guide throughout",
  "Private safari with specialist naturalist",
  "Ayurvedic wellness ritual",
  "24/7 in-country concierge",
  "All service taxes & tips",
];

const notIncluded = ["International flights", "Personal travel insurance", "Visa fees"];

function TourDetail() {
  const [openDay, setOpenDay] = useState(0);

  return (
    <main className="bg-paper text-ink font-sans">
      <SiteNav />

      {/* HERO */}
      <section className="relative h-[85vh] w-full flex items-end pt-20">
        <div className="absolute inset-0 px-4 md:px-8 py-4 md:py-8">
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
            <img
              src={tourHero}
              alt="Nine Arch Bridge Ella at dawn"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
          </div>
        </div>
        <div className="relative z-10 w-full px-6 md:px-14 pb-16 md:pb-20 max-w-7xl mx-auto text-paper">
          <span className="text-[11px] uppercase tracking-[0.35em] text-sunset font-medium mb-6 block">
            Signature Journey · 12 Days
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-4xl text-balance">
            The Cultural Triangle <span className="italic">& The Southern Coast</span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-[11px] uppercase tracking-[0.25em] text-paper/80">
            <span>Colombo → Sigiriya → Nuwara Eliya → Yala → Galle</span>
            <span className="text-sunset">From $8,400 per guest</span>
          </div>
        </div>
      </section>

      {/* BODY WITH STICKY BOOKING */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 lg:col-span-8 space-y-24">
          {/* Overview */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">
              The Journey
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
              Twelve days between the ancient heart and the salt-washed shore.
            </h2>
            <p className="text-ink/70 leading-relaxed text-lg font-light max-w-2xl">
              This itinerary is our most requested — a masterfully paced study of Sri Lanka's four
              essential moods. Sacred ruins at dawn. Cool tea-country mist. Private leopard
              tracking. The final week unfolds slowly along the southern coast, in villas designed
              for stillness.
            </p>
          </div>

          {/* Route Map */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-4 block">
              The Route
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-8">The path you'll trace.</h3>
            <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden bg-ink border border-ink/10">
              <iframe
                title="Tour route map"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1013419.0!2d80.2!3d7.8731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe1edcfbc82f13a35!2sSri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000"
              />
              <div className="absolute bottom-4 right-4 bg-paper/90 backdrop-blur-md px-4 py-3 rounded-xl border border-ink/10 text-[10px] tracking-[0.22em] uppercase text-ink font-medium">
                842 km · 5 regions
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">
              Day by Day
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-10">A rhythm, not a schedule.</h3>
            <div className="space-y-4">
              {days.map((d, i) => {
                const open = openDay === i;
                return (
                  <div key={i} className="border-b border-ink/10 pb-4 last:border-b-0">
                    <button
                      onClick={() => setOpenDay(open ? -1 : i)}
                      className="w-full text-left grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-4 group"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-sunset font-semibold block mb-2">
                          {d.range}
                        </span>
                        <h4 className="font-display text-2xl md:text-3xl truncate group-hover:text-ocean transition-colors">
                          {d.title}
                        </h4>
                      </div>
                      <span
                        className={`size-10 rounded-full border border-ink/15 grid place-items-center shrink-0 text-ink/70 transition-transform ${
                          open ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    {open && (
                      <div className="pb-6 pl-0 md:pl-1 animate-reveal">
                        <p className="text-ink/70 leading-relaxed max-w-2xl mb-4">{d.body}</p>
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-ink/5 text-xs">
                          <span className="text-[10px] uppercase tracking-widest text-ink/50">
                            Stay
                          </span>
                          <span className="font-medium text-ink">{d.stay}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inclusions */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">
              What's Included
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-10">
              Everything considered, nothing hidden.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {inclusions.map((i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-ink/5">
                  <span className="size-5 mt-0.5 rounded-full bg-jungle/10 text-jungle grid place-items-center shrink-0">
                    <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-sm text-ink/80">{i}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40 font-semibold mb-3 block">
                Not Included
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/50">
                {notIncluded.map((n) => (
                  <span key={n}>· {n}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Accommodations */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-4 block">
              Where You'll Rest
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-10">Sanctuaries, not hotels.</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                { img: hotelBungalow, name: "Ceylon Tea Trails", loc: "Norwood Bungalow · Highlands" },
                { img: destGalle, name: "Amangalla", loc: "Galle Fort · Southern Coast" },
                { img: destSigiriya, name: "Water Garden Sigiriya", loc: "Cultural Triangle" },
                { img: heroHighlands, name: "Wild Coast Tented Lodge", loc: "Yala Reserve Border" },
              ].map((h) => (
                <div key={h.name} className="group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 mb-4">
                    <img
                      src={h.img}
                      alt={h.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-sunset text-xs mb-2">
                    {"★★★★★".split("").map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <h4 className="font-display text-2xl">{h.name}</h4>
                  <p className="text-xs uppercase tracking-widest text-ink/50 mt-1">{h.loc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-sunset font-semibold mb-4 block">
              Signature Experiences
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-10">Moments composed by hand.</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                { img: actSafari, cat: "Wildlife · Private", title: "Leopard Tracking at First Light", meta: "Half day · Yala" },
                { img: actAyurveda, cat: "Wellness · Private", title: "Ayurvedic Awakening Ritual", meta: "90 minutes · In-villa" },
              ].map((a) => (
                <div key={a.title} className="group relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src={a.img} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-sunset font-medium">
                      {a.cat}
                    </span>
                    <h4 className="font-display text-2xl md:text-3xl mt-2">{a.title}</h4>
                    <span className="text-xs text-paper/70 mt-2 block">{a.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky booking */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-paper border border-ink/10 rounded-2xl p-8 shadow-soft">
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50 font-semibold block mb-2">
                Starting from
              </span>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-display text-4xl text-ocean">$8,400</span>
                <span className="text-sm text-ink/50 italic">/ guest</span>
              </div>
              <dl className="space-y-3 text-sm border-t border-ink/10 pt-5 mb-6">
                {[
                  ["Duration", "12 Days / 11 Nights"],
                  ["Group", "Private (2 – 6 guests)"],
                  ["Season", "Nov – Apr"],
                  ["Pace", "Considered"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-ink/50">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#plan"
                className="block w-full text-center px-6 py-4 bg-ocean text-paper font-medium text-sm rounded-lg hover:bg-ink transition-all mb-3"
              >
                Request This Journey
              </a>
              <a
                href="https://wa.me/94000000000"
                className="block w-full text-center px-6 py-4 bg-jungle/10 text-jungle font-medium text-sm rounded-lg hover:bg-jungle hover:text-paper transition-all"
              >
                Speak to a Specialist
              </a>
              <div className="mt-6 pt-6 border-t border-ink/10 text-[11px] text-ink/50 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-jungle" /> Fully customisable
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-jungle" /> No booking fee
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-jungle" /> 24/7 in-country support
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* INQUIRY FORM */}
      <section id="plan" className="bg-ink text-paper py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.35em] text-sunset font-medium mb-6 block">
            Plan Your Journey
          </span>
          <h2 className="font-display text-4xl md:text-6xl leading-tight mb-4 text-balance">
            Start planning your <span className="italic">dream journey</span>.
          </h2>
          <p className="text-paper/60 max-w-xl mb-14">
            Share a few details and a Vaya specialist will design a preliminary itinerary within 48
            hours — no obligation.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "First name", type: "text" },
              { label: "Last name", type: "text" },
              { label: "Email", type: "email" },
              { label: "Country", type: "text" },
              { label: "Preferred start date", type: "date" },
              { label: "Preferred end date", type: "date" },
              { label: "Adults", type: "number" },
              { label: "Children", type: "number" },
            ].map((f) => (
              <label key={f.label} className="block space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-paper/60 font-semibold block">
                  {f.label}
                </span>
                <input
                  type={f.type}
                  className="w-full bg-transparent border-b border-paper/20 py-3 text-paper placeholder-paper/30 focus:outline-none focus:border-sunset transition-colors"
                />
              </label>
            ))}
            <label className="block space-y-2 md:col-span-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-paper/60 font-semibold block">
                Accommodation style
              </span>
              <select className="w-full bg-transparent border-b border-paper/20 py-3 text-paper focus:outline-none focus:border-sunset transition-colors">
                <option className="bg-ink">Heritage & boutique</option>
                <option className="bg-ink">Ultra-luxury villas</option>
                <option className="bg-ink">Tented safari camps</option>
                <option className="bg-ink">A mix, please advise</option>
              </select>
            </label>
            <label className="block space-y-2 md:col-span-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-paper/60 font-semibold block">
                Tell us about your dream trip
              </span>
              <textarea
                rows={5}
                className="w-full bg-transparent border-b border-paper/20 py-3 text-paper placeholder-paper/30 focus:outline-none focus:border-sunset transition-colors resize-none"
                placeholder="Anniversaries, dietary needs, must-see moments, pace…"
              />
            </label>
            <button
              type="submit"
              className="md:col-span-2 justify-self-start mt-6 px-12 py-5 bg-sunset text-ink font-semibold rounded-full hover:scale-[1.02] transition-transform text-sm tracking-widest uppercase"
            >
              Get My Personalized Plan
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
      <FloatingConcierge />

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-paper/95 backdrop-blur-xl border-t border-ink/10 px-4 py-3 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] uppercase tracking-[0.22em] text-ink/50 block">From</span>
          <span className="font-display text-xl text-ocean">
            $8,400 <span className="text-xs text-ink/50 italic font-sans">/ guest</span>
          </span>
        </div>
        <a
          href="#plan"
          className="px-5 py-3 bg-ocean text-paper text-sm font-medium rounded-lg whitespace-nowrap"
        >
          Request Journey
        </a>
      </div>
    </main>
  );
}
