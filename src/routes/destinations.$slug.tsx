import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingConcierge } from "@/components/site/FloatingConcierge";
import { getDestinationBySlug, destinations, type Destination } from "@/data/destinations";
import { tours } from "@/data/tours";
import { TourCard } from "@/components/site/TourCard";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const dest = getDestinationBySlug(params.slug);
    if (!dest) throw notFound();
    return { dest };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Destination not found · Vaya Ceylon" }] };
    const { dest } = loaderData;
    return {
      meta: [
        { title: dest.seo.title },
        { name: "description", content: dest.seo.description },
        { property: "og:title", content: dest.seo.title },
        { property: "og:image", content: dest.heroImage },
      ],
      links: [{ rel: "canonical", href: `/destinations/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <main className="bg-paper text-ink min-h-screen flex flex-col">
      <SiteNav />
      <div className="flex-1 grid place-items-center px-6 py-32 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-5xl mb-6">Destination not found.</h1>
          <Link to="/destinations" className="inline-block px-8 py-3 bg-ocean text-paper rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold">All Destinations</Link>
        </div>
      </div>
      <SiteFooter />
    </main>
  ),
  component: DestinationDetail,
});

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().min(5, "Required"),
  message: z.string().trim().min(5, "Required").max(1500),
});

function DestinationDetail() {
  const { dest } = Route.useLoaderData() as { dest: Destination };
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const relatedTours = tours.filter((t) => dest.relatedTourSlugs.includes(t.slug)).slice(0, 3);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = inquirySchema.safeParse(Object.fromEntries(fd.entries()));
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <main className="bg-paper text-ink font-sans">
      <SiteNav />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end">
        <div className="absolute inset-0">
          <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 pb-16 md:pb-24 text-paper w-full">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/destinations" className="text-[11px] uppercase tracking-[0.22em] text-paper/70 hover:text-sunset transition-colors">
              ← All Destinations
            </Link>
            <span className="text-paper/30">·</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-sunset font-medium">{dest.category}</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-4xl text-balance mb-4">{dest.name}</h1>
          <p className="text-xl text-paper/80 font-light max-w-2xl mb-6">{dest.tagline}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-paper/70">
            <span>◎ {dest.region}</span>
            {dest.elevation && <span>▲ {dest.elevation}</span>}
            <span>⧗ Best: {dest.bestTime.split(".")[0]}</span>
            <span>✈ {dest.distanceFromColombo} from Colombo</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 lg:col-span-8 space-y-20">

          {/* Description */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">About {dest.name}</span>
            <p className="text-ink/70 leading-relaxed text-lg font-light">{dest.longDescription}</p>
          </div>

          {/* Highlights */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-4 block">Highlights</span>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Must-see moments.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dest.highlights.map((h) => (
                <div key={h} className="flex items-start gap-3 p-4 rounded-xl bg-jungle/5 border border-jungle/10">
                  <span className="size-6 mt-0.5 rounded-full bg-jungle/15 text-jungle grid place-items-center shrink-0">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <span className="text-sm text-ink/80 font-medium">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-sunset font-semibold mb-4 block">Experiences</span>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Things to do.</h2>
            <div className="flex flex-wrap gap-3">
              {dest.activities.map((a) => (
                <span key={a} className="px-4 py-2.5 bg-secondary border border-ink/8 rounded-full text-sm text-ink/70 font-medium">{a}</span>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">Gallery</span>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Scenes from {dest.name}.</h2>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {dest.gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(src)}
                  className={`overflow-hidden rounded-xl bg-stone-100 group ${i === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
                >
                  <img src={src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-secondary rounded-2xl p-6 border border-ink/5">
              <h3 className="font-display text-2xl mb-5">Quick facts</h3>
              <dl className="space-y-4 text-sm">
                {[
                  ["Region", dest.region],
                  ["Climate", dest.climate],
                  ["Best time", dest.bestTime.split(".")[0]],
                  ["From Colombo", dest.distanceFromColombo],
                  ["Nearest city", dest.nearestCity],
                  ...(dest.elevation ? [["Elevation", dest.elevation]] : []),
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="text-ink/50">{k}</dt>
                    <dd className="font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-ocean text-paper rounded-2xl p-6">
              <h3 className="font-display text-2xl mb-3">Plan a visit</h3>
              <p className="text-paper/70 text-sm mb-5">We design private itineraries through {dest.name} and across the island.</p>
              <Link to="/contact" className="block w-full text-center px-6 py-3 bg-sunset text-ink font-semibold text-[11px] uppercase tracking-[0.22em] rounded-full hover:scale-[1.03] transition-transform">
                Request Itinerary
              </Link>
              <a href="https://wa.me/94112345678" target="_blank" rel="noreferrer" className="block w-full text-center px-6 py-3 border border-paper/30 text-paper text-[11px] uppercase tracking-[0.22em] rounded-full hover:bg-paper/10 transition-colors mt-3">
                WhatsApp Us
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <section className="py-24 md:py-32 px-6 md:px-10 bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-3 block">Tour Packages</span>
                <h2 className="font-display text-3xl md:text-4xl">Tours visiting {dest.name}.</h2>
              </div>
              <Link to="/tours" className="text-[11px] uppercase tracking-[0.22em] border-b border-ink/25 pb-1 hover:border-sunset hover:text-sunset transition-colors">
                View All Tours →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTours.map((t) => <TourCard key={t.slug} tour={t} />)}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry */}
      <section className="bg-ink text-paper py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.35em] text-sunset font-medium mb-6 block">Plan Your Visit</span>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Visit <span className="italic">{dest.name}</span> in style.</h2>
          <p className="text-paper/60 max-w-xl mb-10">Share a few details and we'll design a bespoke itinerary within 24 hours.</p>

          {submitted ? (
            <div className="p-10 rounded-2xl bg-jungle/20 border border-jungle/40 text-center">
              <h3 className="font-display text-3xl mb-3">Thank you.</h3>
              <p className="text-paper/70">A specialist will reach out within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DF name="name" label="Full name" error={errors.name} />
              <DF name="email" label="Email" type="email" error={errors.email} />
              <DF name="phone" label="Phone / WhatsApp" type="tel" error={errors.phone} />
              <label className="block space-y-2 md:col-span-2">
                <span className="text-[10px] uppercase tracking-[0.22em] text-paper/60 block font-semibold">Tell us about your trip</span>
                <textarea name="message" rows={4} maxLength={1500} className={`w-full bg-transparent border rounded-lg p-4 text-sm text-paper focus:outline-none transition-colors resize-none ${errors.message ? "border-destructive" : "border-paper/20 focus:border-sunset"}`} placeholder="Travel dates, group size, interests…" />
                {errors.message && <span className="text-[11px] text-destructive">{errors.message}</span>}
              </label>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="px-10 py-4 bg-sunset text-ink font-semibold rounded-full text-[11px] uppercase tracking-[0.22em] hover:scale-[1.03] transition-transform">Send Inquiry</button>
              </div>
            </form>
          )}
        </div>
      </section>

      {lightbox && (
        <button onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-ink/95 grid place-items-center p-6" aria-label="Close image">
          <img src={lightbox} alt="" className="max-w-full max-h-full object-contain rounded-xl" />
        </button>
      )}

      <SiteFooter />
      <FloatingConcierge />
    </main>
  );
}

function DF({ name, label, type = "text", error }: { name: string; label: string; type?: string; error?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-[10px] uppercase tracking-[0.22em] text-paper/60 block font-semibold">{label}</span>
      <input name={name} type={type} className={`w-full bg-transparent border-b p-3 text-sm text-paper focus:outline-none transition-colors ${error ? "border-destructive" : "border-paper/20 focus:border-sunset"}`} />
      {error && <span className="text-[11px] text-destructive">{error}</span>}
    </label>
  );
}
