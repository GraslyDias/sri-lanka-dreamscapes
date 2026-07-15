import { motion } from "framer-motion";
import { DestinationMarker, type MarkerData } from "./destination-marker";

/**
 * All destination markers keyed by experience category.
 * x/y are percentages (0–100) within the 300×480 viewBox.
 */
export const categoryMarkers: Record<string, MarkerData[]> = {
  beaches: [
    { id: "mirissa", name: "Mirissa", x: 37, y: 87, category: "beaches" },
    { id: "unawatuna", name: "Unawatuna", x: 32, y: 84, category: "beaches" },
    { id: "arugam-bay", name: "Arugam Bay", x: 78, y: 71, category: "beaches" },
    { id: "bentota", name: "Bentota", x: 24, y: 73, category: "beaches" },
    { id: "nilaveli", name: "Nilaveli", x: 74, y: 22, category: "beaches" },
  ],
  "history-culture": [
    { id: "sigiriya", name: "Sigiriya", x: 56, y: 34, category: "history-culture" },
    { id: "anuradhapura", name: "Anuradhapura", x: 44, y: 22, category: "history-culture" },
    { id: "polonnaruwa", name: "Polonnaruwa", x: 64, y: 32, category: "history-culture" },
    { id: "dambulla", name: "Dambulla", x: 51, y: 36, category: "history-culture" },
    { id: "kandy", name: "Kandy", x: 46, y: 50, category: "history-culture" },
  ],
  wildlife: [
    { id: "yala", name: "Yala", x: 64, y: 82, category: "wildlife" },
    { id: "udawalawe", name: "Udawalawe", x: 48, y: 78, category: "wildlife" },
    { id: "wilpattu", name: "Wilpattu", x: 30, y: 22, category: "wildlife" },
    { id: "horton-plains", name: "Horton Plains", x: 46, y: 62, category: "wildlife" },
    { id: "sinharaja", name: "Sinharaja", x: 38, y: 79, category: "wildlife" },
  ],
  "hidden-gems": [
    { id: "jaffna", name: "Jaffna", x: 46, y: 5, category: "hidden-gems" },
    { id: "mannar", name: "Mannar", x: 24, y: 15, category: "hidden-gems" },
    { id: "kalpitiya", name: "Kalpitiya", x: 18, y: 30, category: "hidden-gems" },
    { id: "knuckles", name: "Knuckles", x: 52, y: 48, category: "hidden-gems" },
    { id: "belihuloya", name: "Belihuloya", x: 42, y: 68, category: "hidden-gems" },
  ],
  adventure: [
    { id: "ella", name: "Ella", x: 54, y: 67, category: "adventure" },
    { id: "kitulgala", name: "Kitulgala", x: 36, y: 58, category: "adventure" },
    { id: "adams-peak", name: "Adam's Peak", x: 40, y: 64, category: "adventure" },
    { id: "knuckles-adv", name: "Knuckles", x: 52, y: 48, category: "adventure" },
    { id: "riverston", name: "Riverston", x: 48, y: 44, category: "adventure" },
  ],
  gastronomy: [
    { id: "colombo", name: "Colombo", x: 23, y: 60, category: "gastronomy" },
    { id: "galle-gast", name: "Galle", x: 28, y: 83, category: "gastronomy" },
    { id: "kandy-gast", name: "Kandy", x: 46, y: 50, category: "gastronomy" },
    { id: "jaffna-gast", name: "Jaffna", x: 46, y: 5, category: "gastronomy" },
    { id: "negombo", name: "Negombo", x: 22, y: 53, category: "gastronomy" },
  ],
};

export const categoryColors: Record<string, { color: string; glow: string }> = {
  beaches: { color: "#0EA5E9", glow: "#BAE6FD" },
  "history-culture": { color: "#B45309", glow: "#FDE68A" },
  wildlife: { color: "#16A34A", glow: "#BBF7D0" },
  "hidden-gems": { color: "#D97706", glow: "#FEF3C7" },
  adventure: { color: "#DC2626", glow: "#FECACA" },
  gastronomy: { color: "#EA580C", glow: "#FED7AA" },
};

interface SriLankaMapProps {
  activeCategory: string | null;
}

export function SriLankaMap({ activeCategory }: SriLankaMapProps) {
  // Get ALL markers to render, then determine active ones
  const allMarkersFlat = Object.values(categoryMarkers).flat();

  // Deduplicate by id so we don't render duplicates
  const uniqueMarkers = allMarkersFlat.reduce<MarkerData[]>((acc, m) => {
    if (!acc.find((a) => a.id === m.id)) acc.push(m);
    return acc;
  }, []);

  const activeMarkerIds = activeCategory
    ? (categoryMarkers[activeCategory] ?? []).map((m) => m.id)
    : [];

  const colors = activeCategory ? categoryColors[activeCategory] : null;

  return (
    <motion.div
      className="relative w-full"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 300 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full drop-shadow-2xl"
        role="img"
        aria-label="Interactive map of Sri Lanka showing travel destinations"
      >
        <defs>
          {/* Map body gradient */}
          <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4F1D4" />
            <stop offset="40%" stopColor="#B8E0B8" />
            <stop offset="100%" stopColor="#8FBF8F" />
          </linearGradient>

          {/* Ocean gradient */}
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.2" />
          </linearGradient>

          {/* Terrain texture */}
          <filter id="terrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" operator="in" />
          </filter>

          {/* Soft shadow for island */}
          <filter id="islandShadow">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0F4C81" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Ocean background */}
        <rect width="300" height="480" fill="url(#oceanGrad)" rx="12" />

        {/* Ocean wave lines (decorative) */}
        {[60, 120, 200, 280, 360, 430].map((y) => (
          <path
            key={y}
            d={`M 0 ${y} Q 75 ${y - 5} 150 ${y} Q 225 ${y + 5} 300 ${y}`}
            fill="none"
            stroke="#93C5FD"
            strokeWidth="0.5"
            opacity="0.35"
          />
        ))}

        {/* ── Sri Lanka island shape ─── */}
        {/*
          Simplified but geographically accurate outline.
          The island runs roughly north (Jaffna) to south (Dondra Head).
          viewBox: 300w × 480h
          North tip ~y=8%, South tip ~y=94%
        */}
        <g filter="url(#islandShadow)">
          <path
            d="
              M 148 14
              C 155 14, 165 16, 172 20
              C 180 25, 188 30, 192 38
              C 196 46, 197 55, 196 64
              C 195 73, 192 80, 194 88
              C 197 98, 205 105, 210 114
              C 216 124, 218 135, 216 145
              C 214 155, 208 162, 208 172
              C 208 182, 212 190, 214 200
              C 216 210, 215 220, 211 229
              C 207 238, 199 244, 196 253
              C 193 262, 195 272, 193 281
              C 191 290, 185 297, 180 305
              C 175 313, 170 320, 165 328
              C 160 336, 153 343, 147 350
              C 141 357, 135 363, 128 368
              C 121 373, 113 376, 106 380
              C 99 384, 93 388, 87 392
              C 81 396, 76 400, 72 406
              C 68 412, 67 419, 68 426
              C 69 433, 73 439, 76 445
              C 79 451, 80 457, 78 462
              C 76 467, 70 470, 64 470
              C 58 470, 52 467, 48 462
              C 44 457, 43 450, 42 443
              C 41 436, 42 429, 44 422
              C 46 415, 50 408, 52 401
              C 54 394, 54 387, 52 380
              C 50 373, 45 368, 41 361
              C 37 354, 34 346, 33 338
              C 32 330, 34 322, 37 314
              C 40 306, 45 299, 48 291
              C 51 283, 52 274, 51 266
              C 50 258, 47 251, 46 243
              C 45 235, 46 227, 49 219
              C 52 211, 57 204, 61 196
              C 65 188, 68 180, 70 171
              C 72 162, 72 153, 73 144
              C 74 135, 76 126, 80 118
              C 84 110, 90 103, 96 96
              C 102 89, 109 83, 114 76
              C 119 69, 122 61, 124 53
              C 126 45, 126 36, 128 28
              C 130 21, 138 14, 148 14
              Z
            "
            fill="url(#mapGrad)"
            stroke="#6B9F6B"
            strokeWidth="1.5"
          />
        </g>

        {/* Internal terrain shading — highlands */}
        <ellipse cx="130" cy="200" rx="38" ry="60" fill="#6B9F6B" opacity="0.18" />
        <ellipse cx="115" cy="165" rx="22" ry="30" fill="#5A8F5A" opacity="0.12" />

        {/* Compass rose (bottom right corner) */}
        <g transform="translate(260, 440)" opacity="0.5">
          <circle cx="0" cy="0" r="12" fill="white" fillOpacity="0.7" />
          <text x="0" y="-7" textAnchor="middle" fontSize="5" fontWeight="700" fill="#374151" fontFamily="Inter, sans-serif">N</text>
          <path d="M 0 -5 L 2.5 3 L 0 1.5 L -2.5 3 Z" fill="#0F4C81" />
          <path d="M 0 5 L 2.5 -3 L 0 -1.5 L -2.5 -3 Z" fill="#9CA3AF" />
        </g>

        {/* Scale label */}
        <g transform="translate(16, 458)" opacity="0.5">
          <rect x="0" y="0" width="40" height="2" fill="#374151" rx="1" />
          <text x="20" y="9" textAnchor="middle" fontSize="5" fill="#374151" fontFamily="Inter, sans-serif">100 km</text>
        </g>

        {/* ── Destination markers ── */}
        {uniqueMarkers.map((marker) => {
          const isActive = activeMarkerIds.length === 0
            ? true // default: all soft-visible
            : activeMarkerIds.includes(marker.id);

          const markerColors = activeCategory && activeMarkerIds.includes(marker.id)
            ? colors!
            : { color: "#6B7280", glow: "#E5E7EB" };

          return (
            <DestinationMarker
              key={marker.id}
              marker={marker}
              isActive={isActive}
              color={markerColors.color}
              glowColor={markerColors.glow}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}
