export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper/70 px-6 md:px-10 py-20">
      <div className="max-w-7xl mx-auto grid gap-16 md:grid-cols-12 border-b border-paper/10 pb-16">
        <div className="md:col-span-5 space-y-6">
          <span className="font-display text-3xl text-paper block tracking-tight">
            VAYA CEYLON
          </span>
          <p className="text-sm leading-relaxed max-w-sm text-paper/50">
            Private, handcrafted expeditions through the teardrop isle, designed by those who
            call its emerald hills home.
          </p>
          <div className="flex gap-3">
            {["IG", "FB", "IN"].map((s) => (
              <span
                key={s}
                className="size-9 rounded-full border border-paper/15 grid place-items-center text-[10px] font-medium tracking-widest hover:border-sunset hover:text-sunset transition-colors cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-paper font-semibold">
              Explore
            </h4>
            <ul className="space-y-3 text-paper/60">
              <li className="hover:text-sunset cursor-pointer transition-colors">The Portfolio</li>
              <li className="hover:text-sunset cursor-pointer transition-colors">Cultural Stays</li>
              <li className="hover:text-sunset cursor-pointer transition-colors">Private Safaris</li>
              <li className="hover:text-sunset cursor-pointer transition-colors">Ayurveda</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-paper font-semibold">
              Vaya
            </h4>
            <ul className="space-y-3 text-paper/60">
              <li className="hover:text-sunset cursor-pointer transition-colors">Our Story</li>
              <li className="hover:text-sunset cursor-pointer transition-colors">Sustainability</li>
              <li className="hover:text-sunset cursor-pointer transition-colors">Press</li>
              <li className="hover:text-sunset cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-paper font-semibold">
              Concierge
            </h4>
            <ul className="space-y-3 text-paper/60">
              <li>+94 11 234 5678</li>
              <li>concierge@vayaceylon.com</li>
              <li className="hover:text-sunset cursor-pointer transition-colors">
                WhatsApp Connect
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-paper/40">
        <span>© {new Date().getFullYear()} Vaya Ceylon Private Travels</span>
        <div className="flex gap-8">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Sustainability Charter</span>
        </div>
      </div>
    </footer>
  );
}
