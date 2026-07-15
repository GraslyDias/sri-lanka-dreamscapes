import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mapImage from "@/assets/map-sri-lanka.png";

// Destination photos for tooltip previews
import destSigiriya from "@/assets/dest-sigiriya.jpg";
import destGalle from "@/assets/dest-galle.jpg";
import galTemple from "@/assets/gal-temple.jpg";
import galTea from "@/assets/gal-tea.jpg";
import galYacht from "@/assets/gal-yacht.jpg";
import pkgYala from "@/assets/pkg-yala.jpg";
import pkgCoast from "@/assets/pkg-coast.jpg";
import actSafari from "@/assets/act-safari.jpg";
import heroHighlands from "@/assets/hero-highlands.jpg";

/**
 * Marker coordinates: percentages of the rendered image container.
 * Calibrated to the illustrated Sri Lanka map PNG.
 *
 * Reference anchors:
 *   Jaffna (north tip)    x:49, y:7
 *   Colombo (west coast)  x:22, y:60
 *   Galle (south)         x:29, y:86
 *   Trinco (east coast)   x:76, y:24
 */
export interface MarkerData {
  id: string;
  name: string;
  x: number;
  y: number;
  category: string;
  image?: string;
  description?: string;
}

export const categoryMarkers: Record<string, MarkerData[]> = {
  beaches: [
    { id: "mirissa",    name: "Mirissa",    x: 38, y: 88, category: "beaches",  image: pkgCoast,      description: "Blue whales & golden crescent bay" },
    { id: "unawatuna",  name: "Unawatuna",  x: 30, y: 85, category: "beaches",  image: galYacht,      description: "Coral reef snorkelling & calm waters" },
    { id: "arugam-bay", name: "Arugam Bay", x: 77, y: 74, category: "beaches",  image: galYacht,      description: "World-class surf point, east coast" },
    { id: "bentota",    name: "Bentota",    x: 22, y: 73, category: "beaches",  image: pkgCoast,      description: "Lagoon waterways & beach retreat" },
    { id: "nilaveli",   name: "Nilaveli",   x: 76, y: 24, category: "beaches",  image: galYacht,      description: "Pristine white sands, Pigeon Island reefs" },
  ],
  "history-culture": [
    { id: "sigiriya",      name: "Sigiriya",      x: 58, y: 34, category: "history-culture", image: destSigiriya,  description: "5th-century Lion Rock fortress" },
    { id: "anuradhapura",  name: "Anuradhapura",  x: 46, y: 21, category: "history-culture", image: galTemple,     description: "Ancient sacred city, 3rd century BC" },
    { id: "polonnaruwa",   name: "Polonnaruwa",   x: 66, y: 31, category: "history-culture", image: galTemple,     description: "Medieval royal capital, UNESCO site" },
    { id: "dambulla",      name: "Dambulla",      x: 53, y: 37, category: "history-culture", image: galTemple,     description: "Cave temples with golden Buddhas" },
    { id: "kandy",         name: "Kandy",         x: 46, y: 51, category: "history-culture", image: galTemple,     description: "Sacred Temple of the Tooth Relic" },
  ],
  wildlife: [
    { id: "yala",          name: "Yala",          x: 65, y: 84, category: "wildlife", image: actSafari,    description: "World's highest leopard density" },
    { id: "udawalawe",     name: "Udawalawe",     x: 49, y: 79, category: "wildlife", image: pkgYala,      description: "Wild elephant herds at close range" },
    { id: "wilpattu",      name: "Wilpattu",      x: 30, y: 21, category: "wildlife", image: pkgYala,      description: "Sri Lanka's largest national park" },
    { id: "horton-plains", name: "Horton Plains", x: 46, y: 63, category: "wildlife", image: heroHighlands, description: "Cloud-forest plateau & World's End" },
    { id: "sinharaja",     name: "Sinharaja",     x: 36, y: 79, category: "wildlife", image: heroHighlands, description: "UNESCO rainforest, endemic species" },
  ],
  "hidden-gems": [
    { id: "jaffna",     name: "Jaffna",     x: 49, y: 7,  category: "hidden-gems", image: galTemple,     description: "Ancient Tamil culture, Nallur Kovil" },
    { id: "mannar",     name: "Mannar",     x: 23, y: 17, category: "hidden-gems", image: pkgCoast,      description: "Flamingo flats & Adam's Bridge" },
    { id: "kalpitiya",  name: "Kalpitiya",  x: 18, y: 31, category: "hidden-gems", image: galYacht,      description: "Kitesurfing & spinner dolphins" },
    { id: "knuckles",   name: "Knuckles",   x: 53, y: 49, category: "hidden-gems", image: heroHighlands, description: "Mist-shrouded highland wilderness" },
    { id: "belihuloya", name: "Belihuloya", x: 43, y: 68, category: "hidden-gems", image: heroHighlands, description: "Remote river valley, tea estate trails" },
  ],
  adventure: [
    { id: "ella",       name: "Ella",       x: 55, y: 68, category: "adventure", image: galTea,        description: "Nine Arch Bridge & highland hikes" },
    { id: "kitulgala",  name: "Kitulgala",  x: 36, y: 58, category: "adventure", image: heroHighlands, description: "White-water rafting, jungle canopy" },
    { id: "adams-peak", name: "Adam's Peak",x: 41, y: 64, category: "adventure", image: heroHighlands,  description: "Pre-dawn pilgrimage, sacred summit" },
    { id: "knuckles-a", name: "Knuckles",   x: 53, y: 49, category: "adventure", image: heroHighlands, description: "Multi-day wilderness trekking" },
    { id: "riverston",  name: "Riverston",  x: 49, y: 45, category: "adventure", image: heroHighlands, description: "Highland viewpoint, cloud forest" },
  ],
  gastronomy: [
    { id: "colombo",  name: "Colombo",  x: 22, y: 60, category: "gastronomy", image: destGalle,    description: "Modern Sri Lankan fine dining scene" },
    { id: "galle-g",  name: "Galle",    x: 29, y: 86, category: "gastronomy", image: destGalle,    description: "Fort restaurants, Dutch-era heritage" },
    { id: "kandy-g",  name: "Kandy",    x: 46, y: 51, category: "gastronomy", image: galTemple,    description: "Kandyan cuisine & cooking classes" },
    { id: "jaffna-g", name: "Jaffna",   x: 49, y: 7,  category: "gastronomy", image: galTemple,    description: "Chettinad spices, crab curry, hoppers" },
    { id: "negombo",  name: "Negombo",  x: 21, y: 53, category: "gastronomy", image: pkgCoast,     description: "Seafood lagoon, fish market culture" },
  ],
};

export const categoryColors: Record<string, { color: string; glow: string }> = {
  beaches:           { color: "#0369A1", glow: "#BAE6FD" },
  "history-culture": { color: "#92400E", glow: "#FDE68A" },
  wildlife:          { color: "#166534", glow: "#BBF7D0" },
  "hidden-gems":     { color: "#92400E", glow: "#FEF3C7" },
  adventure:         { color: "#991B1B", glow: "#FECACA" },
  gastronomy:        { color: "#9A3412", glow: "#FED7AA" },
};

/* ─── Luxury Destination Tooltip ──────────────────────────── */

interface TooltipProps {
  marker: MarkerData;
  color: string;
}

function DestinationTooltip({ marker, color }: TooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.95 }}
      transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
      className="absolute z-50 pointer-events-none"
      style={{
        bottom: "calc(100% + 14px)",
        left: "50%",
        transform: "translateX(-50%)",
        width: 190,
      }}
    >
      {/* Tail */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-[6px] w-3 h-3 rotate-45"
        style={{ backgroundColor: "white", boxShadow: "2px 2px 4px rgba(0,0,0,0.07)" }}
      />

      {/* Card */}
      <div
        className="overflow-hidden rounded-[14px]"
        style={{ boxShadow: "0 16px 40px -8px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.06)" }}
      >
        {/* Image */}
        {marker.image && (
          <div className="h-[90px] overflow-hidden">
            <img
              src={marker.image}
              alt={marker.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient over image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" style={{position:"absolute",top:0,left:0,right:0,height:90}} />
          </div>
        )}

        {/* Text */}
        <div className="bg-white px-3 py-2.5">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span
              className="block w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: color }}
            />
            <p
              className="font-display text-[13px] leading-tight text-[#1F2937]"
              style={{ letterSpacing: "-0.01em" }}
            >
              {marker.name}
            </p>
          </div>
          {marker.description && (
            <p className="text-[10px] leading-snug text-[#9CA3AF] pl-3">
              {marker.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Premium Destination Marker ─────────────────────────── */

interface PremiumMarkerProps {
  marker: MarkerData;
  isActive: boolean;
  color: string;
  glowColor: string;
}

function PremiumMarker({ marker, isActive, color, glowColor }: PremiumMarkerProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${marker.x}%`, top: `${marker.y}%`, zIndex: tooltipOpen ? 50 : isActive ? 20 : 10 }}
      animate={{
        opacity: isActive ? 1 : 0.22,
        scale: isActive ? 1 : 0.75,
      }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      onMouseEnter={() => isActive && setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
    >
      {/* Pulse ring when active */}
      {isActive && (
        <motion.span
          className="absolute rounded-full pointer-events-none"
          style={{ backgroundColor: glowColor, inset: -6 }}
          animate={{ scale: [1, 2.2], opacity: [0.65, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", repeatDelay: 0.4 }}
        />
      )}

      {/* Marker dot: white center + colored ring */}
      <motion.div
        className="relative flex items-center justify-center rounded-full cursor-default"
        animate={{
          width: isActive ? (tooltipOpen ? 14 : 11) : 7,
          height: isActive ? (tooltipOpen ? 14 : 11) : 7,
          backgroundColor: isActive ? "white" : "#D1D5DB",
          borderColor: isActive ? color : "#9CA3AF",
          borderWidth: isActive ? 2 : 1.5,
          boxShadow: isActive
            ? `0 0 0 3px ${glowColor}88, 0 2px 8px rgba(0,0,0,0.16)`
            : "0 1px 4px rgba(0,0,0,0.12)",
        }}
        style={{ borderStyle: "solid" }}
        transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* Inner colored dot */}
        {isActive && (
          <motion.span
            className="block rounded-full"
            animate={{ width: tooltipOpen ? 5 : 4, height: tooltipOpen ? 5 : 4 }}
            style={{ backgroundColor: color }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      {/* Name label — appears when active */}
      <AnimatePresence>
        {isActive && !tooltipOpen && (
          <motion.span
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none select-none"
            style={{
              bottom: "calc(100% + 5px)",
              fontSize: 9,
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              color: color,
              letterSpacing: "0.04em",
              textShadow: "0 1px 4px rgba(255,255,255,0.9)",
            }}
          >
            {marker.name}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Tooltip on marker hover */}
      <AnimatePresence>
        {tooltipOpen && (
          <DestinationTooltip marker={marker} color={color} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Sri Lanka Map Component ────────────────────────────── */

interface SriLankaMapProps {
  activeCategory: string | null;
}

export function SriLankaMap({ activeCategory }: SriLankaMapProps) {
  // Flatten and deduplicate all markers
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
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ overflow: "visible" }}
    >
      {/* Soft glow behind the map */}
      {activeCategory && (
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-[-12%] rounded-full pointer-events-none blur-3xl"
          style={{ backgroundColor: colors?.glow ?? "transparent", opacity: 0.18 }}
        />
      )}

      {/* Illustrated map PNG */}
      <img
        src={mapImage}
        alt="Illustrated map of Sri Lanka showing travel regions"
        className="w-full h-auto pointer-events-none relative z-10"
        draggable={false}
      />

      {/* Marker overlay */}
      <div className="absolute inset-0 z-20" style={{ overflow: "visible" }}>
        {allMarkers.map((marker) => {
          const isActive =
            activeIds.length === 0 ? false : activeIds.includes(marker.id);

          const markerColors =
            activeCategory && activeIds.includes(marker.id)
              ? colors!
              : { color: "#9CA3AF", glow: "#F3F4F6" };

          return (
            <PremiumMarker
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
