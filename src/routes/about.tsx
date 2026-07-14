import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingConcierge } from "@/components/site/FloatingConcierge";
import heroHighlands from "@/assets/hero-highlands.jpg";
import hotelBungalow from "@/assets/hotel-bungalow.jpg";
import galTea from "@/assets/gal-tea.jpg";
import galTemple from "@/assets/gal-temple.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vaya Ceylon — Private Sri Lanka Travel" },
      { name: "description", content: "Since 1994, Vaya Ceylon has designed private handcrafted journeys across Sri Lanka. Meet our local expert team." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const stats = [
  { value: "30+", label: "Years of Crafting Journeys" },
  { value: "4,200+", label: "Guests Served" },
  { value: "8", label: "Tour Categories" },
  { value: "98%", label: "Would Return" },
];

const team = [
  { name: "Anura Perera", role: "Founder & Chief Experience Officer", bio: "Born in Colombo, Anura spent 15 years as a wildlife naturalist before founding Vaya Ceylon in 1994. He still leads the flagship expedition every January.", image: galTemple },
  { name: "Senani de Silva", role: "Head of Cultural Experiences", bio: "A graduate of Kelaniya University's Archaeology faculty, Senani has private access to temple ceremonies closed to the public.", image: hotelBungalow },
  { name: "Malini Rajapaksa", role: "Wellness & Ayurveda Director", bio: "Trained at Ayurveda College Colombo and interned in Kerala, Malini designs every wellness programme with a physician's precision.", image: galTea },
  { name: "Roshan Wickramasinghe", role: "Senior Safari Naturalist", bio: "Twenty-two years tracking leopards in Yala, Wilpattu and Sinharaja. Roshan's presence on any safari guarantees something extraordinary.", image: heroHighlands },
];

const testimonials = [
  { quote: "Vaya Ceylon didn't just show us Sri Lanka — they introduced us to it. Every moment felt like a private gift.", author: "Helena & Marcus T.", origin: "Zurich", tour: "Beyond the Ordinary" },
  { quote: "The naturalist guide who accompanied us through Yala was the most knowledgeable person I've ever met in the field.", author: "James A.", origin: "London", tour: "Ultimate Wildlife Adventure" },
  { quote: "Our honeymoon was everything we could have dreamed — tea fields at night, champagne at sunrise.", author: "Priya & Arjun N.", origin: "Mumbai", tour: "Luxury Honeymoon Journey" },
];

function About() {
  return (
    <main className="bg-paper text-ink font-sans">
      <SiteNav />

      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0">
          <img src={heroHighlands} alt="Sri Lanka highlands at dawn" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 text-paper">
          <span className="text-[11px] uppercase tracking-[0.35em] text-sunset font-medium mb-6 block">Est. 1994 · Colombo, Sri Lanka</span>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-4xl text-balance mb-6">
            We are Sri Lanka, <span className="italic font-light text-sunset">opened for you</span>.
          </h1>
          <p className="text-paper/80 max-w-xl text-lg font-light leading-relaxed">
            For three decades, Vaya Ceylon has been the private gateway to the island's most intimate experiences — designed by those who call its emerald hills home.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 md:px-10 bg-secondary border-b border-ink/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="font-display text-5xl md:text-6xl text-ocean block mb-2">{s.value}</span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-ink/60 font-semibold leading-relaxed">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-jungle font-semibold mb-4 block">Our Story</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance mb-8">A company built on access, not itineraries.</h2>
            <div className="space-y-5 text-ink/70 leading-relaxed">
              <p>Vaya Ceylon was founded in 1994 by Anura Perera, a wildlife naturalist and son of a Colombo tea merchant, who grew tired of watching visitors see his island through a bus window. He began offering small-group private expeditions — just him, a Land Rover, and a depth of local knowledge that no guidebook could replicate.</p>
              <p>Thirty years later, the philosophy is unchanged. Every member of our team is Sri Lankan. Every guide is a specialist — archaeologist, naturalist, Ayurvedic physician or culinary expert. We don't hire generalists.</p>
              <p>We have doors open to us that are closed to most visitors: private temple ceremonies, estate dinners in tea bungalows, after-hours access to Sigiriya. These are not advantages you can buy — they are the result of thirty years of trust-building.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={hotelBungalow} alt="Tea bungalow" className="rounded-2xl aspect-[3/4] object-cover" />
            <img src={galTea} alt="Tea estate" className="rounded-2xl aspect-[3/4] object-cover mt-8" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-10 bg-ink text-paper">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-sunset font-medium mb-8 block">Our Mission</span>
          <blockquote className="font-display text-3xl md:text-5xl leading-snug text-balance italic font-light">
            "To offer every guest the Sri Lanka that only insiders know — private, unhurried, and impossible to replicate."
          </blockquote>
          <cite className="text-paper/50 text-[11px] uppercase tracking-[0.25em] mt-8 block not-italic">— Anura Perera, Founder</cite>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-ocean font-semibold mb-4 block">The Team</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">Specialists, not guides.</h2>
            <p className="mt-6 text-ink/60 leading-relaxed">Every Vaya team member is a master of their discipline.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 mb-5">
                  <img src={member.image} alt={member.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="font-display text-2xl mb-1">{member.name}</h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ocean font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-ink/60 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-10 bg-paper">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-sunset font-semibold mb-4 block">Guest Words</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">Heard from the island.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-secondary rounded-2xl p-8 border border-ink/5 flex flex-col">
                <div className="text-sunset text-2xl mb-4">❝</div>
                <blockquote className="font-light text-ink/80 leading-relaxed flex-1 mb-6">{t.quote}</blockquote>
                <div className="pt-6 border-t border-ink/5">
                  <p className="font-display text-lg">{t.author}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ink/50 mt-1">{t.origin}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ocean mt-1">{t.tour}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 bg-ocean text-paper text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">Begin your private journey.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tours" className="inline-block px-10 py-4 bg-sunset text-ink font-semibold rounded-full text-[11px] uppercase tracking-[0.22em] hover:scale-[1.03] transition-transform">Explore Tours</Link>
            <Link to="/contact" className="inline-block px-10 py-4 border border-paper/30 text-paper rounded-full text-[11px] uppercase tracking-[0.22em] hover:bg-paper hover:text-ink transition-all">Contact a Specialist</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatingConcierge />
    </main>
  );
}
