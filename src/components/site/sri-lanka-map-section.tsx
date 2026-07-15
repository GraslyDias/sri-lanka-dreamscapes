import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ExperienceCard } from "./experience-card";
import { SriLankaMap, categoryColors } from "./sri-lanka-map";

interface Experience {
  id: string;
  label: string;
  description: string;
  icon: string;
  route: string;
}

const experiences: Experience[] = [
  {
    id: "beaches",
    label: "Popular Beaches",
    description: "Mirissa whales, Arugam surf, Nilaveli coral — the coast in every mood.",
    icon: "🏖️",
    route: "/experiences/beaches",
  },
  {
    id: "history-culture",
    label: "History & Culture",
    description: "Sigiriya, Anuradhapura and sacred Kandy — 2,500 years alive in stone.",
    icon: "🏯",
    route: "/experiences/history-culture",
  },
  {
    id: "wildlife",
    label: "Wildlife & Nature",
    description: "Leopards at Yala, elephants at Udawalawe, rare birds at Sinharaja.",
    icon: "🐆",
    route: "/experiences/wildlife",
  },
  {
    id: "hidden-gems",
    label: "Lesser Travelled",
    description: "Jaffna, Mannar, Kalpitiya — the roads less taken reward richly.",
    icon: "✨",
    route: "/experiences/hidden-gems",
  },
  {
    id: "adventure",
    label: "Adventure",
    description: "Ella hiking, Kitulgala rapids, Adam's Peak at dawn — pulse-quickening.",
    icon: "🧗",
    route: "/experiences/adventure",
  },
  {
    id: "gastronomy",
    label: "Gastronomy",
    description: "From Colombo's modern kitchens to Jaffna's ancient Chettinad table.",
    icon: "🍛",
    route: "/experiences/gastronomy",
  },
];

// Split into left (3) and right (3) columns
const leftExperiences = experiences.slice(0, 3);
const rightExperiences = experiences.slice(3, 6);

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
    hoverTimeout.current = setTimeout(() => setHovered(null), 150);
  };

  const handleClick = (id: string) => {
    setActive((prev) => (prev === id ? null : id));
  };

  const getAccentColor = (id: string) => categoryColors[id]?.color ?? "#16A34A";

  return (
    <section
      className="py-24 md:py-36 px-4 md:px-6 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
      aria-labelledby="map-section-heading"
    >
      {/* Subtle background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(22,163,74,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-[#16A34A] mb-4 block">
            Discover Sri Lanka
          </span>
          <h2
            id="map-section-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[#111827] leading-tight mb-4"
          >
            Explore Our Island
          </h2>
          <p className="text-[#6B7280] text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Every destination tells a different story.
          </p>
        </motion.div>

        {/* ── Desktop layout: left cards | map | right cards ── */}
        <div className="hidden lg:grid lg:grid-cols-[280px_1fr_280px] gap-8 xl:gap-12 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-3">
            {leftExperiences.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                id={exp.id}
                label={exp.label}
                icon={<span className="text-xl">{exp.icon}</span>}
                description={exp.description}
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

          {/* Map (center) */}
          <div className="relative flex items-center justify-center py-8">
            {/* Connector lines (decorative) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {leftExperiences.map((_, i) => (
                <line
                  key={`l-${i}`}
                  x1="2"
                  y1={`${20 + i * 28}%`}
                  x2="16"
                  y2="50%"
                  stroke="#E5E7EB"
                  strokeWidth="0.3"
                  strokeDasharray="3 3"
                />
              ))}
              {rightExperiences.map((_, i) => (
                <line
                  key={`r-${i}`}
                  x1="84"
                  y1="50%"
                  x2="98"
                  y2={`${20 + i * 28}%`}
                  stroke="#E5E7EB"
                  strokeWidth="0.3"
                  strokeDasharray="3 3"
                />
              ))}
            </svg>

            <div className="w-full max-w-[280px] xl:max-w-[320px]">
              <SriLankaMap activeCategory={currentCategory} />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3">
            {rightExperiences.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                id={exp.id}
                label={exp.label}
                icon={<span className="text-xl">{exp.icon}</span>}
                description={exp.description}
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

        {/* ── Mobile / Tablet layout: horizontal scroll cards + map below ── */}
        <div className="lg:hidden">
          {/* Horizontal scroll cards */}
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
            <div className="flex gap-3 w-max pb-2">
              {experiences.map((exp, i) => (
                <motion.button
                  key={exp.id}
                  id={`mobile-experience-card-${exp.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  onClick={() => handleClick(exp.id)}
                  aria-pressed={currentCategory === exp.id}
                  aria-label={exp.label}
                  className={`flex flex-col items-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-300 shrink-0 w-[130px] focus:outline-none focus-visible:ring-2`}
                  style={
                    currentCategory === exp.id
                      ? {
                          backgroundColor: getAccentColor(exp.id) + "14",
                          borderColor: getAccentColor(exp.id) + "55",
                          boxShadow: `0 4px 20px -4px ${getAccentColor(exp.id)}44`,
                        }
                      : {
                          backgroundColor: "#FAFAFA",
                          borderColor: "#E5E7EB",
                        }
                  }
                >
                  <span className="text-2xl">{exp.icon}</span>
                  <span
                    className="text-[11px] font-semibold text-center leading-tight"
                    style={{
                      color: currentCategory === exp.id ? getAccentColor(exp.id) : "#374151",
                    }}
                  >
                    {exp.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 mx-auto max-w-[260px]">
            <SriLankaMap activeCategory={currentCategory} />
          </div>
        </div>

        {/* ── Active category info panel ── */}
        {currentCategory && (
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
            className="mt-8 mx-auto max-w-md text-center"
          >
            <p className="text-sm text-[#6B7280] leading-relaxed">
              {experiences.find((e) => e.id === currentCategory)?.description}
            </p>
          </motion.div>
        )}

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-14"
        >
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#111827] text-white rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold hover:bg-[#16A34A] transition-colors duration-300 shadow-lift"
          >
            View All Experiences
            <span className="text-sm">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
