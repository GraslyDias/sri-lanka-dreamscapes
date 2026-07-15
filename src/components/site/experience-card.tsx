import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ExperienceCardProps {
  id: string;
  label: string;
  icon: ReactNode;
  description: string;
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
  icon,
  description,
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
      aria-label={`${label} — ${description}`}
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ scale: 1.03 }}
      whileFocus={{ scale: 1.03 }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        relative w-full text-left rounded-2xl px-5 py-4 border transition-all duration-300 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${isActive
          ? "bg-white border-transparent shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)] scale-[1.02]"
          : "bg-white/60 border-[#E5E7EB] hover:bg-white hover:shadow-soft"
        }
      `}
      style={isActive ? { borderColor: accentColor + "33" } as React.CSSProperties : {}}
    >
      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="activeBar"
          className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
          style={{ backgroundColor: accentColor }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <div className="flex items-start gap-4 pl-2">
        {/* Icon */}
        <div
          className="size-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 text-lg"
          style={{
            backgroundColor: isActive ? accentColor + "18" : "#F3F4F6",
            color: isActive ? accentColor : "#6B7280",
          }}
        >
          {icon}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p
            className="font-semibold text-sm leading-tight transition-colors duration-300"
            style={{ color: isActive ? accentColor : "#111827" }}
          >
            {label}
          </p>
          <p className="text-[12px] text-gray-500 mt-1 leading-snug line-clamp-2">
            {description}
          </p>
        </div>

        {/* Arrow */}
        <motion.span
          className="text-sm transition-colors duration-200 shrink-0 mt-1"
          style={{ color: isActive ? accentColor : "#D1D5DB" }}
          animate={{ x: isActive ? 2 : 0 }}
        >
          →
        </motion.span>
      </div>
    </motion.button>
  );
}
