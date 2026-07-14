import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingConcierge } from "@/components/site/FloatingConcierge";
import { getTourBySlug, tours, type Tour } from "@/data/tours";

export const Route = createFileRoute("/tours/$slug")({
  loader: ({ params }) => {
    const tour = getTourBySlug(params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Tour not found · Vaya Ceylon" }, { name: "robots", content: "noindex" }] };
    }
    const { tour } = loaderData;
    return {
      meta: [
        { title: tour.seo.title },
        { name: "description", content: tour.seo.description },
        { property: "og:title", content: tour.seo.title },
        { property: "og:description", content: tour.seo.description },
        { property: "og:image", content: tour.heroImage },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/tours/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/tours/${params.slug}` }],
    };
  },
  notFoundComponent: TourNotFound,
  component: TourDetail,
});

function TourNotFound() {
  return (
    <main className="bg-paper text-ink min-h-screen flex flex-col">
      <SiteNav />
      <div className="flex-1 grid place-items-center px-6 py-32">
        <div className="text-center max-w-md">
          <span className="text-[11px] uppercase tracking-[0.35em] text-sunset font-medium mb-6 block">
            404
          </span>
          <h1 className="font-display text-5xl mb-6">We can't find that journey.</h1>
          <p className="text-ink/60 mb-8">The tour you're looking for may have moved or been renamed.</p>
          <Link
            to="/tours"
            className="inline-block px-8 py-3 bg-ocean text-paper rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold"
          >
            Browse All Tours
          </Link>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}

function TourDetail() {
  const data = Route.useLoaderData();
  const tour: Tour = data.tour;
  const [openDay, setOpenDay] = useState(0);
  const [gLightbox, setGLightbox] = useState<string | null>(null);

  return (
    <main className="bg-paper text-ink font-sans">
      <SiteNav />

      {/* HERO — full bleed */}
      <section className="relative min-h-[90vh] w-full flex items-end">
        <div className="absolute inset-0">
          <img
            src={tour.heroImage}
            alt={tour.title}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/40" />
        </div>
        <div className="relative z-10 w-full px-6 md:px-14 pb-16 md:pb-24 max-w-7xl mx-auto text-paper">
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/tours"
              className="text-[11px] uppercase tracking-[0.22em] text-paper/70 hover:text-sunset transition-colors"
            >
              ← All Tours
            </Link>
            <span className="text-paper/30">·</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-sunset font-medium">
              {tour.category}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-4xl text-balance mb-6">
            {tour.title}
          </h1>
          <p className="text-lg text-paper/80 max-w-2xl font-light mb-8">{tour.tagline}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.25em] text-paper/80 mb-8">
            <span>⧗ {tour.duration}</span>
            <span>◎ {tour.destinations.length} destinations</span>
            <span className="text-sunset">★ {tour.rating.toFixed(1)} ({tour.reviewsCount} reviews)</span>
            <span className="text-sunset">From ${tour.startingPrice.toLocaleString()} pp</span>
          </div>
          <a
            href="#inquire"
            className="inline-block px-10 py-4 bg-sunset text-ink font-semibold rounded-full text-[11px] uppercase tracking-[0.22em] hover:scale-[1.03] transition-transform"
          >
            Inquire About This Journey
          </a>
        </div>
      </section>

      {/* MAP FIRST ON MOBILE */}
      <section className="lg:hidden bg-paper py-8 px-6">
        <MapCard tour={tour} />
      </section>

      {/* BODY */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 lg:col-span-8 space-y-20">
          {/* Overview */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">
              The Journey
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
              {tour.destinations.join(" · ")}
            </h2>
            <p className="text-ink/70 leading-relaxed text-lg font-light max-w-2xl">
              {tour.longDescription}
            </p>
          </div>

          {/* Inclusions */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-4 block">
              What's Included
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-10">Everything considered.</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tour.inclusions.map((i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-jungle/5 border border-jungle/10">
                  <span className="size-6 mt-0.5 rounded-full bg-jungle/15 text-jungle grid place-items-center shrink-0">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-sm text-ink/80 font-medium">{i}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40 font-semibold mb-4 block">
                Not Included
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/50">
                {tour.exclusions.map((n) => (
                  <span key={n}>· {n}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">
              Day by Day
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-10">A rhythm, not a schedule.</h3>
            <div className="space-y-2">
              {tour.itinerary.map((d, i) => {
                const open = openDay === i;
                return (
                  <div key={i} className="border border-ink/8 rounded-xl overflow-hidden bg-paper">
                    <button
                      onClick={() => setOpenDay(open ? -1 : i)}
                      className="w-full text-left grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 p-5 group hover:bg-secondary/40 transition-colors"
                    >
                      <span className="size-12 rounded-full bg-ocean text-paper grid place-items-center font-display text-lg shrink-0">
                        {d.day}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-sunset font-semibold block mb-1">
                          Day {d.day}
                        </span>
                        <h4 className="font-display text-xl md:text-2xl truncate group-hover:text-ocean transition-colors">
                          {d.title}
                        </h4>
                      </div>
                      <span
                        className={`size-9 rounded-full border border-ink/15 grid place-items-center shrink-0 text-ink/70 transition-transform ${
                          open ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    {open && (
                      <div className="px-5 pb-6 pt-1 md:pl-[76px] animate-reveal">
                        <p className="text-ink/70 leading-relaxed max-w-2xl mb-5">{d.body}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-ink/40 block mb-1">Activities</span>
                            <span className="text-ink/80">{d.activities.join(", ")}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-ink/40 block mb-1">Meals</span>
                            <span className="text-ink/80">{d.meals}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-ink/40 block mb-1">Stay</span>
                            <span className="text-ink/80">{d.accommodation}</span>
                          </div>
                        </div>
                        {d.notes && <p className="mt-4 text-xs text-ink/50 italic">{d.notes}</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Accommodation */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-4 block">
              Where You'll Rest
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-10">Sanctuaries, not hotels.</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {tour.hotels.map((h) => (
                <div key={h.name} className="group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 mb-4">
                    <img
                      src={h.image}
                      alt={h.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-sunset text-xs mb-2">
                    {Array.from({ length: h.stars }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <h4 className="font-display text-2xl">{h.name}</h4>
                  <p className="text-xs uppercase tracking-widest text-ink/50 mt-1 mb-3">{h.location}</p>
                  <div className="flex flex-wrap gap-2">
                    {h.amenities.map((a) => (
                      <span key={a} className="px-3 py-1 text-[10px] uppercase tracking-[0.18em] bg-ink/5 text-ink/60 rounded-full">
                        {a}
                      </span>
                    ))}
                  </div>
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
              {tour.activities.map((a) => (
                <div key={a.title} className="group relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-sunset font-medium">
                      {a.category}
                    </span>
                    <h4 className="font-display text-2xl md:text-3xl mt-2">{a.title}</h4>
                    <span className="text-xs text-paper/70 mt-2 block">{a.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">
              Gallery
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-10">Scenes from the journey.</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {tour.gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setGLightbox(src)}
                  className="aspect-square overflow-hidden rounded-xl bg-stone-100 group"
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky sidebar (desktop) */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-6">
            {/* Map — desktop */}
            <div className="hidden lg:block">
              <MapCard tour={tour} />
            </div>

            {/* Booking */}
            <div className="bg-paper border border-ink/10 rounded-2xl p-8 shadow-soft">
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50 font-semibold block mb-2">
                Starting from
              </span>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-display text-4xl text-ocean">
                  ${tour.startingPrice.toLocaleString()}
                </span>
                <span className="text-sm text-ink/50 italic">/ guest</span>
              </div>
              <dl className="space-y-3 text-sm border-t border-ink/10 pt-5 mb-6">
                <Row k="Duration" v={tour.duration} />
                <Row k="Type" v={tour.category} />
                <Row k="Group" v="Private" />
                <Row k="Rating" v={`★ ${tour.rating.toFixed(1)} (${tour.reviewsCount})`} />
              </dl>
              <a
                href="#inquire"
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
      <InquirySection tour={tour} />

      {/* RELATED */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-3 block">
                You may also love
              </span>
              <h3 className="font-display text-3xl md:text-4xl">Other signature journeys.</h3>
            </div>
            <Link to="/tours" className="text-[11px] uppercase tracking-[0.22em] border-b border-ink/25 pb-1 hover:border-sunset hover:text-sunset transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tours.filter((t) => t.slug !== tour.slug).slice(0, 3).map((t) => (
              <Link
                key={t.slug}
                to="/tours/$slug"
                params={{ slug: t.slug }}
                className="group block"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-stone-100">
                  <img src={t.coverImage} alt={t.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-jungle font-semibold">{t.category} · {t.duration}</span>
                <h4 className="font-display text-2xl mt-2 group-hover:text-ocean transition-colors">{t.title}</h4>
                <span className="font-display text-lg text-ocean mt-2 block">From ${t.startingPrice.toLocaleString()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {gLightbox && (
        <button
          onClick={() => setGLightbox(null)}
          className="fixed inset-0 z-50 bg-ink/95 grid place-items-center p-6"
          aria-label="Close image"
        >
          <img src={gLightbox} alt="" className="max-w-full max-h-full object-contain rounded-xl" />
        </button>
      )}

      <SiteFooter />
      <FloatingConcierge />
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-ink/50">{k}</dt>
      <dd className="font-medium text-right">{v}</dd>
    </div>
  );
}

function MapCard({ tour }: { tour: Tour }) {
  return (
    <div className="bg-paper border border-ink/10 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-ink/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-jungle font-semibold block">
            The Route
          </span>
          <span className="font-display text-lg mt-1 block">{tour.routeDistanceKm} km · {tour.destinations.length} regions</span>
        </div>
        <a
          href={tour.googleMapsLink || `https://www.google.com/maps/search/${encodeURIComponent(tour.destinations.join(","))}`}
          target="_blank"
          rel="noreferrer"
          className="text-[10px] uppercase tracking-[0.22em] text-ocean font-semibold"
        >
          Open Maps →
        </a>
      </div>
      <div className="relative aspect-[4/3] bg-ink">
        <iframe
          title={`${tour.title} route map`}
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={tour.googleMapsEmbedUrl}
        />
      </div>
      <div className="p-4 text-[11px] text-ink/60 leading-relaxed border-t border-ink/10">
        {tour.routeSummary}
      </div>
    </div>
  );
}

/* ---------- Inquiry ---------- */

const inquirySchema = z.object({
  firstName: z.string().trim().min(1, "Required").max(60),
  lastName: z.string().trim().min(1, "Required").max(60),
  email: z.string().trim().email("Invalid email").max(120),
  phone: z.string().trim().min(5, "Required").max(30),
  country: z.string().trim().min(1, "Required").max(80),
  startDate: z.string().min(1, "Required"),
  endDate: z.string().min(1, "Required"),
  adults: z.coerce.number().int().min(1).max(20),
  kids: z.coerce.number().int().min(0).max(20),
  infants: z.coerce.number().int().min(0).max(10),
  accommodation: z.string().max(60),
  budget: z.string().max(60),
  notes: z.string().max(1500).optional(),
});

function InquirySection({ tour }: { tour: Tour }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const result = inquirySchema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="inquire" className="bg-ink text-paper py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.35em] text-sunset font-medium mb-6 block">
          Plan This Journey
        </span>
        <h2 className="font-display text-4xl md:text-6xl leading-tight mb-4 text-balance">
          Design your <span className="italic">{tour.title}</span>.
        </h2>
        <p className="text-paper/60 max-w-xl mb-12">
          Share a few details and a Vaya specialist will design a preliminary itinerary within 48 hours — no obligation.
        </p>

        {submitted ? (
          <div className="p-10 rounded-2xl bg-jungle/20 border border-jungle/40 text-center">
            <h3 className="font-display text-3xl mb-3">Thank you.</h3>
            <p className="text-paper/70">Your inquiry has been received. A specialist will reach out within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field name="firstName" label="First name" error={errors.firstName} />
            <Field name="lastName" label="Last name" error={errors.lastName} />
            <Field name="email" label="Email" type="email" error={errors.email} />
            <Field name="phone" label="Phone" type="tel" error={errors.phone} />
            <Field name="country" label="Country" error={errors.country} />
            <SelectField
              name="accommodation"
              label="Accommodation type"
              options={["Luxury 5-star", "Boutique", "Heritage", "Mixed"]}
              error={errors.accommodation}
            />
            <Field name="startDate" label="Travel start date" type="date" error={errors.startDate} />
            <Field name="endDate" label="Travel end date" type="date" error={errors.endDate} />
            <Field name="adults" label="Adults" type="number" defaultValue="2" min={1} error={errors.adults} />
            <Field name="kids" label="Kids" type="number" defaultValue="0" min={0} error={errors.kids} />
            <Field name="infants" label="Infants" type="number" defaultValue="0" min={0} error={errors.infants} />
            <SelectField
              name="budget"
              label="Budget per guest (USD)"
              options={["< $5,000", "$5,000 – $10,000", "$10,000 – $20,000", "$20,000+"]}
              error={errors.budget}
            />
            <label className="md:col-span-2 block space-y-2">
              <span className="text-[10px] uppercase tracking-[0.22em] text-paper/60 block font-semibold">
                Additional notes
              </span>
              <textarea
                name="notes"
                rows={4}
                maxLength={1500}
                className="w-full bg-transparent border border-paper/20 rounded-lg p-4 text-sm text-paper focus:outline-none focus:border-sunset transition-colors"
                placeholder="Anniversaries, dietary needs, must-see moments…"
              />
            </label>
            <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-2">
              <p className="text-[11px] text-paper/50">
                By submitting you agree to be contacted by a Vaya specialist.
              </p>
              <button
                type="submit"
                className="px-10 py-4 bg-sunset text-ink font-semibold rounded-full text-[11px] uppercase tracking-[0.22em] hover:scale-[1.03] transition-transform"
              >
                Send Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
  defaultValue,
  min,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
  defaultValue?: string;
  min?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[10px] uppercase tracking-[0.22em] text-paper/60 block font-semibold">
        {label}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        min={min}
        className={`w-full bg-transparent border-b p-3 text-sm text-paper focus:outline-none transition-colors ${
          error ? "border-destructive" : "border-paper/20 focus:border-sunset"
        }`}
      />
      {error && <span className="text-[11px] text-destructive">{error}</span>}
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
  error,
}: {
  name: string;
  label: string;
  options: string[];
  error?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-[10px] uppercase tracking-[0.22em] text-paper/60 block font-semibold">
        {label}
      </span>
      <select
        name={name}
        className={`w-full bg-transparent border-b p-3 text-sm text-paper focus:outline-none transition-colors ${
          error ? "border-destructive" : "border-paper/20 focus:border-sunset"
        }`}
      >
        {options.map((o) => (
          <option key={o} className="bg-ink">
            {o}
          </option>
        ))}
      </select>
      {error && <span className="text-[11px] text-destructive">{error}</span>}
    </label>
  );
}
