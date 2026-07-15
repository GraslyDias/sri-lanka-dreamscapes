import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ExperienceCard } from "./experience-card";
import { SriLankaMap, categoryColors } from "./sri-lanka-map";

// Real destination photography for each category card
import pkgCoast from "@/assets/pkg-coast.jpg";
import destSigiriya from "@/assets/dest-sigiriya.jpg";
import pkgYala from "@/assets/pkg-yala.jpg";
import heroHighlands from "@/assets/hero-highlands.jpg";
import galBreakfast from "@/assets/gal-breakfast.jpg";
import galTea from "@/assets/gal-tea.jpg";

interface Experience {
  id: string;
  label: string;
  subtitle: string;
  image: string;
  route: string;
}

const experiences: Experience[] = [
  {
    id: "beaches",
    label: "Popular Beaches",
    subtitle: "Golden coastlines and tropical escapes",
    image: pkgCoast,
    route: "/destinations",
  },
  {
    id: "history-culture",
    label: "History & Culture",
    subtitle: "Ancient kingdoms and UNESCO treasures",
    image: destSigiriya,
    route: "/destinations",
  },
  {
    id: "wildlife",
    label: "Wildlife & Nature",
    subtitle: "National parks and rainforest adventures",
    image: pkgYala,
    route: "/destinations",
  },
  {
    id: "hidden-gems",
    label: "Lesser Travelled",
    subtitle: "Hidden gems beyond the usual routes",
    image: galTea,
    route: "/destinations",
  },
  {
    id: "adventure",
    label: "Adventure",
    subtitle: "Mountains, hiking and adrenaline",
    image: heroHighlands,
    route: "/destinations",
  },
  {
    id: "gastronomy",
    label: "Gastronomy",
    subtitle: "Authentic Sri Lankan flavours",
    image: galBreakfast,
    route: "/destinations",
  },
];

const leftExperiences = experiences.slice(0, 3);
const rightExperiences = experiences.slice(3, 6);

/* ─── Mobile Category Chip ─────────────────────────────── */

function MobileCategoryChip({
  exp,
  isActive,
  onPress,
}: {
  exp: Experience;
  isActive: boolean;
  onPress: () => void;
}) {
  const color = categoryColors[exp.id]?.color ?? "#1F2937";
  return (
    <motion.button
      id={`mobile-cat-${exp.id}`}
      aria-pressed={isActive}
      aria-label={exp.label}
      whileTap={{ scale: 0.97 }}
      onClick={onPress}
      className="relative shrink-0 overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2"
      style={{
        width: 110,
        height: 110,
        border: isActive ? `2px solid ${color}` : "2px solid transparent",
        boxShadow: isActive
          ? `0 8px 24px -6px ${color}50`
          : "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      {/* Photo */}
      <motion.img
        src={exp.image}
        alt={exp.label}
        className="w-full h-full object-cover"
        animate={{ scale: isActive ? 1.06 : 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p
          className="text-white font-display text-[11px] leading-tight"
          style={{ letterSpacing: "-0.01em" }}
        >
          {exp.label}
        </p>
      </div>
      {/* Active ring */}
      {isActive && (
        <motion.div
          layoutId="mobile-active-ring"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: `2px solid ${color}`, borderRadius: 16 }}
        />
      )}
    </motion.button>
  );
}

/* ─── Main Section ──────────────────────────────────────── */

export function SriLankaMapSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentCategory = hovered ?? active;

  const handleMouseEnter = (id: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHovered(id);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setHovered(null), 180);
  };

  const handleClick = (id: string) => {
    setActive((prev) => (prev === id ? null : id));
  };

  const getAccentColor = (id: string) => categoryColors[id]?.color ?? "#1F2937";

  /* Active category label for the section */
  const activeExp = experiences.find((e) => e.id === currentCategory);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#FAFAF8", paddingTop: "6rem", paddingBottom: "6rem" }}
      aria-labelledby="map-section-heading"
    >
      {/* Very subtle warm background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(22,101,52,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Section Header ──────────────────────────────── */}
      <div className="px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-14"
        >
          <span
            className="block text-[10px] uppercase tracking-[0.4em] font-semibold mb-4"
            style={{ color: "#16A34A" }}
          >
            Discover Sri Lanka
          </span>
          <h2
            id="map-section-heading"
            className="font-display text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem] leading-[1.05] text-[#1F2937] mb-4"
            style={{ letterSpacing: "-0.025em" }}
          >
            Explore Our Island
          </h2>
          <p
            className="text-[#9CA3AF] text-base md:text-lg max-w-sm mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 300 }}
          >
            Every destination tells a different story.
          </p>
        </motion.div>
      </div>

      {/* ── Desktop: 3-col layout ────────────────────────────── */}
      <div className="hidden lg:block px-6 xl:px-8">
        <div
          className="mx-auto"
          style={{
            display: "grid",
            gridTemplateColumns: "270px 1fr 270px",
            gap: "2rem",
            maxWidth: 1280,
            alignItems: "center",
          }}
        >
          {/* Left cards */}
          <div className="flex flex-col gap-3">
            {leftExperiences.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                id={exp.id}
                label={exp.label}
                subtitle={exp.subtitle}
                image={exp.image}
                isActive={currentCategory === exp.id}
                side="left"
                index={i}
                accentColor={getAccentColor(exp.id)}
                onClick={() => handleClick(exp.id)}
                onMouseEnter={() => handleMouseEnter(exp.id)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>

          {/* Map — center, large */}
          <div className="flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="w-full"
              style={{ maxWidth: 660, filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.12))" }}
            >
              <SriLankaMap activeCategory={currentCategory} />
            </motion.div>
          </div>

          {/* Right cards */}
          <div className="flex flex-col gap-3">
            {rightExperiences.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                id={exp.id}
                label={exp.label}
                subtitle={exp.subtitle}
                image={exp.image}
                isActive={currentCategory === exp.id}
                side="right"
                index={i}
                accentColor={getAccentColor(exp.id)}
                onClick={() => handleClick(exp.id)}
                onMouseEnter={() => handleMouseEnter(exp.id)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>

        {/* Active category subtitle strip */}
        <div className="mx-auto" style={{ maxWidth: 1280 }}>
          <AnimatePresence mode="wait">
            {activeExp ? (
              <motion.p
                key={activeExp.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="text-center mt-6 text-sm"
                style={{ color: "#9CA3AF", fontFamily: "Inter, sans-serif", fontWeight: 300 }}
              >
                {activeExp.subtitle}
              </motion.p>
            ) : (
              <motion.p
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center mt-6 text-sm"
                style={{ color: "#D1D5DB", fontFamily: "Inter, sans-serif", fontWeight: 300, fontStyle: "italic" }}
              >
                Hover an experience to illuminate its destinations
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile / Tablet ──────────────────────────────────── */}
      <div className="lg:hidden px-4">
        {/* Horizontal photo category chips */}
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 mb-8">
          <div className="flex gap-3 w-max pb-2">
            {experiences.map((exp) => (
              <MobileCategoryChip
                key={exp.id}
                exp={exp}
                isActive={currentCategory === exp.id}
                onPress={() => handleClick(exp.id)}
              />
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="mx-auto" style={{ maxWidth: 340 }}>
          <SriLankaMap activeCategory={currentCategory} />
        </div>

        {/* Active category label */}
        <AnimatePresence mode="wait">
          {activeExp && (
            <motion.p
              key={activeExp.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-5 text-sm"
              style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
            >
              {activeExp.subtitle}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
        className="text-center mt-14 px-6"
      >
        <Link
          to="/destinations"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.28em] font-semibold transition-all duration-500"
          style={{
            background: "#1F2937",
            color: "white",
            boxShadow: "0 8px 32px -8px rgba(31,41,55,0.4)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#166534";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px -8px rgba(22,101,52,0.45)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#1F2937";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px -8px rgba(31,41,55,0.4)";
          }}
        >
          View All Experiences
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
