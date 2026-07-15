import { motion } from "framer-motion";

export interface ExperienceCardProps {
  id: string;
  label: string;
  subtitle: string;
  image: string;
  isActive: boolean;
  side: "left" | "right";
  index: number;
  accentColor: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ExperienceCard({
  id,
  label,
  subtitle,
  image,
  isActive,
  side,
  index,
  accentColor,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ExperienceCardProps) {
  return (
    <motion.button
      id={`experience-card-${id}`}
      role="button"
      aria-pressed={isActive}
      aria-label={`${label} — ${subtitle}`}
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-[18px]"
      style={{ focusVisibleRingColor: accentColor } as React.CSSProperties}
    >
      <motion.div
        animate={{
          y: isActive ? -3 : 0,
          boxShadow: isActive
            ? "0 20px 48px -12px rgba(0,0,0,0.18), 0 4px 16px -4px rgba(0,0,0,0.08)"
            : "0 2px 12px -4px rgba(0,0,0,0.08)",
        }}
        whileHover={{
          y: -4,
          boxShadow: "0 24px 56px -12px rgba(0,0,0,0.16), 0 4px 16px -4px rgba(0,0,0,0.08)",
        }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className="relative flex overflow-hidden rounded-[18px] bg-white"
        style={{
          border: isActive ? `1.5px solid ${accentColor}30` : "1.5px solid #EBEBEB",
          height: 118,
        }}
      >
        {/* Active left accent line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full z-10"
          animate={{
            opacity: isActive ? 1 : 0,
            scaleY: isActive ? 1 : 0.4,
          }}
          transition={{ duration: 0.35 }}
          style={{ backgroundColor: accentColor, transformOrigin: "center" }}
        />

        {/* Photo thumbnail — 36% width */}
        <div className="relative shrink-0 overflow-hidden" style={{ width: "36%" }}>
          <motion.img
            src={image}
            alt={label}
            className="w-full h-full object-cover"
            animate={{ scale: isActive ? 1.06 : 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          />
          {/* Warm overlay on inactive state */}
          <div
            className="absolute inset-0 transition-opacity duration-400"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.0) 60%, rgba(255,255,255,0.18) 100%)",
              opacity: isActive ? 0 : 0.35,
            }}
          />
        </div>

        {/* Text — 64% width */}
        <div className="flex flex-col justify-center px-4 flex-1 min-w-0">
          <p
            className="font-display text-[15px] leading-tight mb-1.5 transition-colors duration-300"
            style={{
              color: isActive ? accentColor : "#1F2937",
              letterSpacing: "-0.01em",
            }}
          >
            {label}
          </p>
          <p
            className="text-[11px] leading-snug transition-colors duration-300"
            style={{
              color: isActive ? "#6B7280" : "#9CA3AF",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {subtitle}
          </p>

          {/* Subtle arrow */}
          <motion.span
            className="mt-2.5 text-[10px] uppercase tracking-[0.2em] font-medium"
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : -4,
            }}
            transition={{ duration: 0.3 }}
            style={{ color: accentColor }}
          >
            Explore →
          </motion.span>
        </div>
      </motion.div>
    </motion.button>
  );
}
