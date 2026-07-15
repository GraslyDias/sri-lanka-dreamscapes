import { motion, AnimatePresence } from "framer-motion";
import mapImage from "@/assets/map-sri-lanka.png";

/**
 * Marker coordinates are expressed as percentages (0–100) of the
 * rendered image container (width × height), calibrated to the
 * illustrated Sri Lanka map PNG.
 *
 * Image dimensions: ~545 × 760 (portrait), island roughly fills:
 *   x: 18% – 84%,  y: 6% – 94%
 *
 * Geographic calibration points:
 *   Jaffna    (north tip)   ≈ x:49, y:6
 *   Colombo   (west coast)  ≈ x:22, y:60
 *   Galle     (south)       ≈ x:29, y:85
 *   Trinco    (east coast)  ≈ x:75, y:23
 */
export interface MarkerData {
  id: string;
  name: string;
  x: number; // % of container width
  y: number; // % of container height
  category: string;
}

export const categoryMarkers: Record<string, MarkerData[]> = {
  beaches: [
    { id: "mirissa",     name: "Mirissa",     x: 38, y: 88, category: "beaches" },
    { id: "unawatuna",   name: "Unawatuna",   x: 31, y: 85, category: "beaches" },
    { id: "arugam-bay",  name: "Arugam Bay",  x: 77, y: 74, category: "beaches" },
    { id: "bentota",     name: "Bentota",     x: 22, y: 73, category: "beaches" },
    { id: "nilaveli",    name: "Nilaveli",    x: 76, y: 24, category: "beaches" },
  ],
  "history-culture": [
    { id: "sigiriya",     name: "Sigiriya",     x: 58, y: 34, category: "history-culture" },
    { id: "anuradhapura", name: "Anuradhapura", x: 46, y: 21, category: "history-culture" },
    { id: "polonnaruwa",  name: "Polonnaruwa",  x: 66, y: 31, category: "history-culture" },
    { id: "dambulla",     name: "Dambulla",     x: 53, y: 36, category: "history-culture" },
    { id: "kandy",        name: "Kandy",        x: 46, y: 51, category: "history-culture" },
  ],
  wildlife: [
    { id: "yala",          name: "Yala",          x: 65, y: 84, category: "wildlife" },
    { id: "udawalawe",     name: "Udawalawe",     x: 49, y: 79, category: "wildlife" },
    { id: "wilpattu",      name: "Wilpattu",      x: 30, y: 21, category: "wildlife" },
    { id: "horton-plains", name: "Horton Plains", x: 46, y: 63, category: "wildlife" },
    { id: "sinharaja",     name: "Sinharaja",     x: 37, y: 79, category: "wildlife" },
  ],
  "hidden-gems": [
    { id: "jaffna",     name: "Jaffna",     x: 49, y: 6,  category: "hidden-gems" },
    { id: "mannar",     name: "Mannar",     x: 23, y: 17, category: "hidden-gems" },
    { id: "kalpitiya",  name: "Kalpitiya",  x: 18, y: 31, category: "hidden-gems" },
    { id: "knuckles",   name: "Knuckles",   x: 53, y: 49, category: "hidden-gems" },
    { id: "belihuloya", name: "Belihuloya", x: 43, y: 68, category: "hidden-gems" },
  ],
  adventure: [
    { id: "ella",       name: "Ella",       x: 55, y: 68, category: "adventure" },
    { id: "kitulgala",  name: "Kitulgala",  x: 36, y: 58, category: "adventure" },
    { id: "adams-peak", name: "Adam's Peak", x: 41, y: 64, category: "adventure" },
    { id: "knuckles-a", name: "Knuckles",   x: 53, y: 49, category: "adventure" },
    { id: "riverston",  name: "Riverston",  x: 49, y: 45, category: "adventure" },
  ],
  gastronomy: [
    { id: "colombo",  name: "Colombo",  x: 22, y: 60, category: "gastronomy" },
    { id: "galle-g",  name: "Galle",    x: 29, y: 85, category: "gastronomy" },
    { id: "kandy-g",  name: "Kandy",    x: 46, y: 51, category: "gastronomy" },
    { id: "jaffna-g", name: "Jaffna",   x: 49, y: 6,  category: "gastronomy" },
    { id: "negombo",  name: "Negombo",  x: 21, y: 53, category: "gastronomy" },
  ],
};

export const categoryColors: Record<string, { color: string; glow: string }> = {
  beaches:          { color: "#0EA5E9", glow: "#BAE6FD" },
  "history-culture":{ color: "#B45309", glow: "#FDE68A" },
  wildlife:         { color: "#16A34A", glow: "#BBF7D0" },
  "hidden-gems":    { color: "#D97706", glow: "#FEF3C7" },
  adventure:        { color: "#DC2626", glow: "#FECACA" },
  gastronomy:       { color: "#EA580C", glow: "#FED7AA" },
};

/* ─── Individual Marker ─────────────────────────────────────── */

interface DotMarkerProps {
  marker: MarkerData;
  isActive: boolean;
  color: string;
  glowColor: string;
}

function DotMarker({ marker, isActive, color, glowColor }: DotMarkerProps) {
  return (
    <motion.div
      key={marker.id}
      role="img"
      aria-label={marker.name}
      initial={{ opacity: 0, scale: 0 }}
      animate={
        isActive
          ? { opacity: 1, scale: 1 }
          : { opacity: 0.25, scale: 0.65 }
      }
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
    >
      {/* Outer pulse ring */}
      {isActive && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: glowColor }}
          animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* Glow halo */}
      {isActive && (
        <span
          className="absolute rounded-full"
          style={{
            width: 20,
            height: 20,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: glowColor,
            opacity: 0.4,
            filter: "blur(4px)",
          }}
        />
      )}

      {/* Core dot */}
      <motion.span
        className="relative block rounded-full border-2 border-white shadow-md"
        animate={{
          width:  isActive ? 12 : 7,
          height: isActive ? 12 : 7,
          backgroundColor: isActive ? color : "#9CA3AF",
        }}
        style={{ boxShadow: isActive ? `0 0 0 2px ${color}44` : undefined }}
        transition={{ duration: 0.3 }}
      />

      {/* Label */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.25, delay: 0.08 }}
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-white text-[9px] font-semibold tracking-wide shadow-lg pointer-events-none select-none"
            style={{
              bottom: "calc(100% + 6px)",
              backgroundColor: color,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {marker.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Map Component ─────────────────────────────────────────── */

interface SriLankaMapProps {
  activeCategory: string | null;
}

export function SriLankaMap({ activeCategory }: SriLankaMapProps) {
  // Flatten all markers, deduplicate by id
  const allMarkers = Object.values(categoryMarkers)
    .flat()
    .reduce<MarkerData[]>((acc, m) => {
      if (!acc.find((a) => a.id === m.id)) acc.push(m);
      return acc;
    }, []);

  const activeIds = activeCategory
    ? (categoryMarkers[activeCategory] ?? []).map((m) => m.id)
    : [];

  const colors = activeCategory ? categoryColors[activeCategory] : null;

  return (
    <motion.div
      className="relative w-full select-none"
      /* Soft floating animation */
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* The illustrated map PNG */}
      <img
        src={mapImage}
        alt="Illustrated map of Sri Lanka"
        className="w-full h-auto pointer-events-none"
        draggable={false}
      />

      {/* Marker overlay — absolutely positioned over the image */}
      <div className="absolute inset-0">
        {allMarkers.map((marker) => {
          const isActive =
            activeIds.length === 0 ? true : activeIds.includes(marker.id);

          const markerColors =
            activeCategory && activeIds.includes(marker.id)
              ? colors!
              : { color: "#6B7280", glow: "#E5E7EB" };

          return (
            <DotMarker
              key={marker.id}
              marker={marker}
              isActive={isActive}
              color={markerColors.color}
              glowColor={markerColors.glow}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
