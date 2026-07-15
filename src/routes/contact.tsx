import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingConcierge } from "@/components/site/FloatingConcierge";
import destGalle from "@/assets/dest-galle.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Vaya Ceylon — Plan Your Sri Lanka Journey" },
      { name: "description", content: "Reach out to Vaya Ceylon's private travel specialists. WhatsApp, email, phone or our online inquiry form — we respond within 24 hours." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Required").max(60),
  lastName: z.string().trim().min(1, "Required").max(60),
  email: z.string().trim().email("Invalid email").max(120),
  phone: z.string().trim().min(5, "Required").max(30),
  country: z.string().trim().min(1, "Required").max(80),
  message: z.string().trim().min(10, "Please tell us more").max(2000),
  travelDate: z.string().optional(),
  budget: z.string().optional(),
});

const hours = [
  { day: "Monday – Friday", hours: "8:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
  { day: "Sunday", hours: "By appointment" },
];

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const result = contactSchema.safeParse(data);
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

      {/* Hero Header */}
      <section className="relative min-h-[50vh] flex items-end">
        <div className="absolute inset-0">
          <img src={destGalle} alt="Galle Fort, Sri Lanka" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/25" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-14 md:pb-20 text-paper w-full">
          <span className="text-[11px] uppercase tracking-[0.35em] text-sunset font-medium mb-5 block">Get in Touch</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-balance mb-5">
            Let's plan your <span className="italic font-light text-sunset">perfect journey</span>.
          </h1>
          <p className="text-paper/75 max-w-xl leading-relaxed font-light">
            Our specialists are available 7 days a week. Share your travel dreams and we'll respond
            with a personalised proposal within 24 hours.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-10">

            {/* Contact Methods */}
            <div className="space-y-6">
              <h2 className="font-display text-3xl">Contact information</h2>

              <a
                href="https://wa.me/94112345678"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-5 p-5 rounded-2xl bg-jungle/5 border border-jungle/15 hover:bg-jungle/10 transition-colors group"
              >
                <div className="size-11 rounded-full bg-jungle/15 text-jungle grid place-items-center shrink-0">
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-jungle font-semibold mb-1">WhatsApp Concierge</p>
                  <p className="font-display text-xl text-ink group-hover:text-jungle transition-colors">+94 11 234 5678</p>
                  <p className="text-sm text-ink/60 mt-1">Fastest response — often within minutes</p>
                </div>
              </a>

              <a href="mailto:concierge@vayaceylon.com" className="flex items-start gap-5 p-5 rounded-2xl bg-ocean/5 border border-ocean/15 hover:bg-ocean/10 transition-colors group">
                <div className="size-11 rounded-full bg-ocean/15 text-ocean grid place-items-center shrink-0">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ocean font-semibold mb-1">Email</p>
                  <p className="font-display text-xl text-ink group-hover:text-ocean transition-colors">concierge@vayaceylon.com</p>
                  <p className="text-sm text-ink/60 mt-1">Response within 24 hours</p>
                </div>
              </a>

              <div className="flex items-start gap-5 p-5 rounded-2xl bg-sunset/5 border border-sunset/15">
                <div className="size-11 rounded-full bg-sunset/15 text-sunset grid place-items-center shrink-0">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.38 2 2 0 0 1 3.07 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-sunset font-semibold mb-1">Phone</p>
                  <p className="font-display text-xl text-ink">+94 11 234 5678</p>
                  <p className="text-sm text-ink/60 mt-1">Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="font-display text-2xl mb-6">Business hours</h3>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center py-3 border-b border-ink/5">
                    <span className="text-sm text-ink/70">{h.day}</span>
                    <span className="text-sm font-medium text-ocean">{h.hours}</span>
                  </div>
                ))}
                <p className="text-xs text-ink/50 mt-3">All times Sri Lanka Standard Time (UTC+5:30)</p>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-display text-2xl mb-4">Office location</h3>
              <p className="text-sm text-ink/70 leading-relaxed mb-4">
                12 Galle Road, Colombo 3<br />
                Sri Lanka 00300
              </p>
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-stone-200">
                <iframe
                  title="Vaya Ceylon office location"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.015!2d79.8428!3d6.9022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259251b0e3b91%3A0x7e9c9a1f5e7e5e5e!2sColombo%203%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000"
                />
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="bg-secondary rounded-3xl p-8 md:p-10 border border-ink/5">
              <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-3 block">Inquiry Form</span>
              <h2 className="font-display text-3xl md:text-4xl mb-2">Tell us about your trip</h2>
              <p className="text-ink/60 text-sm mb-8">A specialist will design a personalised proposal within 24 hours — no obligation.</p>

              {submitted ? (
                <div className="p-10 rounded-2xl bg-jungle/10 border border-jungle/20 text-center">
                  <div className="size-16 rounded-full bg-jungle/15 text-jungle grid place-items-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 className="font-display text-3xl mb-3">Thank you.</h3>
                  <p className="text-ink/70">Your inquiry has been received. A specialist will reach out within 24 hours.</p>
                  <Link to="/tours" className="inline-block mt-6 px-8 py-3 bg-ocean text-paper rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold">
                    Browse Tours
                  </Link>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field name="firstName" label="First name" error={errors.firstName} />
                  <Field name="lastName" label="Last name" error={errors.lastName} />
                  <Field name="email" label="Email address" type="email" error={errors.email} />
                  <Field name="phone" label="Phone / WhatsApp" type="tel" error={errors.phone} />
                  <Field name="country" label="Country of residence" error={errors.country} />
                  <Field name="travelDate" label="Preferred travel date" type="month" error={errors.travelDate} />
                  <div className="md:col-span-2">
                    <SelectField
                      name="budget"
                      label="Budget per person (USD)"
                      options={["< $3,000", "$3,000 – $6,000", "$6,000 – $12,000", "$12,000 – $20,000", "$20,000+"]}
                      error={errors.budget}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-ink/60 block font-semibold">Tell us about your dream journey</span>
                      <textarea
                        name="message"
                        rows={5}
                        maxLength={2000}
                        className={`w-full bg-paper border rounded-xl p-4 text-sm text-ink focus:outline-none transition-colors resize-none ${errors.message ? "border-destructive" : "border-ink/10 focus:border-ocean"}`}
                        placeholder="Destinations, dates, group size, interests, special occasions…"
                      />
                      {errors.message && <span className="text-[11px] text-destructive">{errors.message}</span>}
                    </label>
                  </div>
                  <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <p className="text-[11px] text-ink/50">By submitting you agree to be contacted by a Vaya specialist.</p>
                    <button type="submit" className="px-10 py-4 bg-ocean text-paper font-semibold rounded-full text-[11px] uppercase tracking-[0.22em] hover:bg-ink transition-colors">
                      Send Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatingConcierge />
    </main>
  );
}

function Field({ name, label, type = "text", error, defaultValue, min }: { name: string; label: string; type?: string; error?: string; defaultValue?: string; min?: number }) {
  return (
    <label className="block space-y-2">
      <span className="text-[10px] uppercase tracking-[0.22em] text-ink/60 block font-semibold">{label}</span>
      <input
        name={name} type={type} defaultValue={defaultValue} min={min}
        className={`w-full bg-paper border rounded-xl px-4 py-3 text-sm text-ink focus:outline-none transition-colors ${error ? "border-destructive" : "border-ink/10 focus:border-ocean"}`}
      />
      {error && <span className="text-[11px] text-destructive">{error}</span>}
    </label>
  );
}

function SelectField({ name, label, options, error }: { name: string; label: string; options: string[]; error?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-[10px] uppercase tracking-[0.22em] text-ink/60 block font-semibold">{label}</span>
      <select name={name} className={`w-full bg-paper border rounded-xl px-4 py-3 text-sm text-ink focus:outline-none transition-colors ${error ? "border-destructive" : "border-ink/10 focus:border-ocean"}`}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      {error && <span className="text-[11px] text-destructive">{error}</span>}
    </label>
  );
}
