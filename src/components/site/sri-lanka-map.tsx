import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mapImage from "@/assets/map-sri-lanka.png";

import destSigiriya from "@/assets/dest-sigiriya.jpg";
import destGalle from "@/assets/dest-galle.jpg";
import galTemple from "@/assets/gal-temple.jpg";
import galTea from "@/assets/gal-tea.jpg";
import galYacht from "@/assets/gal-yacht.jpg";
import pkgYala from "@/assets/pkg-yala.jpg";
import pkgCoast from "@/assets/pkg-coast.jpg";
import actSafari from "@/assets/act-safari.jpg";
import heroHighlands from "@/assets/hero-highlands.jpg";

// ─── Map Configuration ────────────────────────────────────────────────────────
/**
 * Adjust these values after visual calibration.
 *
 * scale     – map size multiplier (1 = original size)
 * offsetX   – horizontal shift in px (positive = right)
 * offsetY   – vertical shift in px  (positive = down)
 * markerScale – dot size multiplier for all markers
 */
export const MAP_CONFIG = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  markerScale: 1,
};

/**
 * Set to false before deploying to production.
 * When true: shows calibration panel, debug overlay, keyboard shortcuts.
 */
export const DEBUG_MAP_MODE = true;

// ─── Types ────────────────────────────────────────────────────────────────────
interface MapConfig {
  scale: number;
  offsetX: number;
  offsetY: number;
  markerScale: number;
}

export interface MarkerData {
  id: string;
  name: string;
  /** % from left of image container */
  x: number;
  /** % from top of image container */
  y: number;
  category: string;
  /** Fine-tune this marker's horizontal position by px without touching others */
  adjustX?: number;
  /** Fine-tune this marker's vertical position by px without touching others */
  adjustY?: number;
  image?: string;
  description?: string;
}

// ─── Markers ──────────────────────────────────────────────────────────────────
export const categoryMarkers: Record<string, MarkerData[]> = {
  beaches: [
    { id: "mirissa",    name: "Mirissa",    x: 38, y: 88, category: "beaches",        image: pkgCoast,      description: "Blue whales & golden crescent bay" },
    { id: "unawatuna",  name: "Unawatuna",  x: 30, y: 85, category: "beaches",        image: galYacht,      description: "Coral reef snorkelling & calm waters" },
    { id: "arugam-bay", name: "Arugam Bay", x: 77, y: 74, category: "beaches",        image: galYacht,      description: "World-class surf point, east coast" },
    { id: "bentota",    name: "Bentota",    x: 22, y: 73, category: "beaches",        image: pkgCoast,      description: "Lagoon waterways & beach retreat" },
    { id: "nilaveli",   name: "Nilaveli",   x: 76, y: 24, category: "beaches",        image: galYacht,      description: "Pristine white sands, Pigeon Island reefs" },
  ],
  "history-culture": [
    { id: "sigiriya",     name: "Sigiriya",     x: 58, y: 34, category: "history-culture", image: destSigiriya, description: "5th-century Lion Rock fortress" },
    { id: "anuradhapura", name: "Anuradhapura", x: 46, y: 21, category: "history-culture", image: galTemple,    description: "Ancient sacred city, 3rd century BC" },
    { id: "polonnaruwa",  name: "Polonnaruwa",  x: 66, y: 31, category: "history-culture", image: galTemple,    description: "Medieval royal capital, UNESCO site" },
    { id: "dambulla",     name: "Dambulla",     x: 53, y: 37, category: "history-culture", image: galTemple,    description: "Cave temples with golden Buddhas" },
    { id: "kandy",        name: "Kandy",        x: 46, y: 51, category: "history-culture", image: galTemple,    description: "Sacred Temple of the Tooth Relic" },
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
    { id: "ella",       name: "Ella",        x: 55, y: 68, category: "adventure", image: galTea,        description: "Nine Arch Bridge & highland hikes" },
    { id: "kitulgala",  name: "Kitulgala",   x: 36, y: 58, category: "adventure", image: heroHighlands, description: "White-water rafting, jungle canopy" },
    { id: "adams-peak", name: "Adam's Peak", x: 41, y: 64, category: "adventure", image: heroHighlands, description: "Pre-dawn pilgrimage, sacred summit" },
    { id: "knuckles-a", name: "Knuckles",    x: 53, y: 49, category: "adventure", image: heroHighlands, description: "Multi-day wilderness trekking" },
    { id: "riverston",  name: "Riverston",   x: 49, y: 45, category: "adventure", image: heroHighlands, description: "Highland viewpoint, cloud forest" },
  ],
  gastronomy: [
    { id: "colombo",  name: "Colombo",  x: 22, y: 60, category: "gastronomy", image: destGalle,  description: "Modern Sri Lankan fine dining scene" },
    { id: "galle-g",  name: "Galle",    x: 29, y: 86, category: "gastronomy", image: destGalle,  description: "Fort restaurants, Dutch-era heritage" },
    { id: "kandy-g",  name: "Kandy",    x: 46, y: 51, category: "gastronomy", image: galTemple,  description: "Kandyan cuisine & cooking classes" },
    { id: "jaffna-g", name: "Jaffna",   x: 49, y: 7,  category: "gastronomy", image: galTemple,  description: "Chettinad spices, crab curry, hoppers" },
    { id: "negombo",  name: "Negombo",  x: 21, y: 53, category: "gastronomy", image: pkgCoast,   description: "Seafood lagoon, fish market culture" },
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

// ─── Calibration Panel ────────────────────────────────────────────────────────

const BTN: React.CSSProperties = {
  width: 24, height: 24,
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 6,
  color: "#E2E8F0",
  cursor: "pointer",
  fontSize: 14,
  lineHeight: 1,
  display: "flex", alignItems: "center", justifyContent: "center",
  userSelect: "none",
};

interface CalibPanelProps {
  config: MapConfig;
  onDelta: (key: keyof MapConfig, delta: number) => void;
  onReset: () => void;
}

function CalibrationPanel({ config, onDelta, onReset }: CalibPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text =
`// Paste into sri-lanka-map.tsx → MAP_CONFIG
export const MAP_CONFIG = {
  scale: ${config.scale.toFixed(3)},
  offsetX: ${config.offsetX},
  offsetY: ${config.offsetY},
  markerScale: ${config.markerScale.toFixed(3)},
};`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const rows: { label: string; key: keyof MapConfig; step: number; dec: number; unit?: string }[] = [
    { label: "Scale",    key: "scale",       step: 0.02, dec: 3 },
    { label: "Offset X", key: "offsetX",     step: 5,    dec: 0, unit: "px" },
    { label: "Offset Y", key: "offsetY",     step: 5,    dec: 0, unit: "px" },
    { label: "Markers",  key: "markerScale", step: 0.05, dec: 2 },
  ];

  return (
    <div
      style={{
        position: "fixed", bottom: 20, right: 20, zIndex: 9999,
        background: "rgba(10, 15, 30, 0.96)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: "14px 16px",
        width: 232,
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        fontFamily: "ui-monospace, 'Cascadia Code', monospace",
        color: "#E2E8F0",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#10B981" }}>
          ◎ Map Calibration
        </span>
        <span style={{ fontSize: 9, color: "#475569" }}>DEV ONLY</span>
      </div>

      {/* Control rows */}
      {rows.map(({ label, key, step, dec, unit }) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 10, color: "#64748B", width: 58, flexShrink: 0 }}>{label}</span>
          <button style={BTN} onClick={() => onDelta(key, -step)}>−</button>
          <span style={{ fontSize: 11, color: "#F1F5F9", width: 60, textAlign: "center", flexShrink: 0 }}>
            {(config[key] as number).toFixed(dec)}{unit ?? ""}
          </span>
          <button style={BTN} onClick={() => onDelta(key, step)}>+</button>
        </div>
      ))}

      {/* Keyboard hint */}
      <div style={{ fontSize: 9, color: "#334155", marginTop: 6, marginBottom: 10, lineHeight: 1.8 }}>
        ←↑↓→ offset (5px) · +/− scale (0.02)
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 6 }}>
        <button
          onClick={onReset}
          style={{
            flex: 1, padding: "6px 0", fontSize: 10, borderRadius: 8, cursor: "pointer",
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#94A3B8",
          }}
        >
          Reset
        </button>
        <button
          onClick={handleCopy}
          style={{
            flex: 2, padding: "6px 0", fontSize: 10, borderRadius: 8, cursor: "pointer",
            background: copied ? "rgba(16,185,129,0.2)" : "rgba(99,102,241,0.2)",
            border: copied ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(99,102,241,0.3)",
            color: copied ? "#10B981" : "#A5B4FC",
            transition: "all 0.3s",
          }}
        >
          {copied ? "✓ Copied!" : "Copy Config"}
        </button>
      </div>
    </div>
  );
}

// ─── Debug Overlay ────────────────────────────────────────────────────────────

function DebugOverlay({ allMarkers, config }: { allMarkers: MarkerData[]; config: MapConfig }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 100 }}>
      {/* Map boundary */}
      <div style={{
        position: "absolute", inset: 0,
        border: "1.5px dashed rgba(239,68,68,0.55)",
      }} />
      {/* Center crosshairs */}
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(239,68,68,0.3)" }} />
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(239,68,68,0.3)" }} />

      {/* Config readout */}
      <div style={{
        position: "absolute", top: 6, left: 6,
        background: "rgba(0,0,0,0.75)", color: "#10B981",
        fontSize: 8, fontFamily: "monospace",
        padding: "4px 7px", borderRadius: 5, lineHeight: 1.8,
      }}>
        scale: {config.scale.toFixed(3)}<br />
        x: {config.offsetX}px &nbsp; y: {config.offsetY}px
      </div>

      {/* Per-marker coordinate labels */}
      {allMarkers.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            left: `calc(${m.x}% + ${m.adjustX ?? 0}px)`,
            top: `calc(${m.y}% + ${m.adjustY ?? 0}px)`,
            transform: "translate(-50%, -50%)",
            background: "rgba(239,68,68,0.88)",
            color: "white",
            fontSize: 7,
            fontFamily: "monospace",
            padding: "1px 4px",
            borderRadius: 3,
            whiteSpace: "nowrap",
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          {m.id}<br />{m.x}, {m.y}
        </div>
      ))}
    </div>
  );
}

// ─── Destination Tooltip ──────────────────────────────────────────────────────

function DestinationTooltip({ marker, color }: { marker: MarkerData; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.95 }}
      transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
      className="absolute z-50 pointer-events-none"
      style={{ bottom: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)", width: 190 }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-[6px] w-3 h-3 rotate-45"
        style={{ backgroundColor: "white", boxShadow: "2px 2px 4px rgba(0,0,0,0.07)" }}
      />
      <div className="overflow-hidden rounded-[14px]" style={{ boxShadow: "0 16px 40px -8px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.06)" }}>
        {marker.image && (
          <div className="relative h-[88px] overflow-hidden">
            <img src={marker.image} alt={marker.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}
        <div className="bg-white px-3 py-2.5">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="block w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
            <p className="font-display text-[13px] leading-tight text-[#1F2937]" style={{ letterSpacing: "-0.01em" }}>
              {marker.name}
            </p>
          </div>
          {marker.description && (
            <p className="text-[10px] leading-snug text-[#9CA3AF] pl-3">{marker.description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Premium Marker ───────────────────────────────────────────────────────────

interface PremiumMarkerProps {
  marker: MarkerData;
  isActive: boolean;
  color: string;
  glowColor: string;
  markerScale: number;
}

function PremiumMarker({ marker, isActive, color, glowColor, markerScale }: PremiumMarkerProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const s = markerScale;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(${marker.x}% + ${marker.adjustX ?? 0}px)`,
        top: `calc(${marker.y}% + ${marker.adjustY ?? 0}px)`,
        transform: "translate(-50%, -50%)",
        zIndex: tooltipOpen ? 50 : isActive ? 20 : 10,
      }}
      animate={{ opacity: isActive ? 1 : 0.22, scale: isActive ? 1 : 0.75 }}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      onMouseEnter={() => isActive && setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
    >
      {/* Pulse ring */}
      {isActive && (
        <motion.span
          className="absolute rounded-full pointer-events-none"
          style={{ backgroundColor: glowColor, inset: -6 * s }}
          animate={{ scale: [1, 2.2], opacity: [0.65, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", repeatDelay: 0.4 }}
        />
      )}

      {/* Dot */}
      <motion.div
        className="relative flex items-center justify-center rounded-full cursor-default"
        animate={{
          width:  isActive ? (tooltipOpen ? 14 * s : 11 * s) : 7 * s,
          height: isActive ? (tooltipOpen ? 14 * s : 11 * s) : 7 * s,
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
        {isActive && (
          <motion.span
            className="block rounded-full"
            animate={{ width: tooltipOpen ? 5 * s : 4 * s, height: tooltipOpen ? 5 * s : 4 * s }}
            style={{ backgroundColor: color }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      {/* Name label */}
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

      {/* Tooltip */}
      <AnimatePresence>
        {tooltipOpen && <DestinationTooltip marker={marker} color={color} />}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Sri Lanka Map ────────────────────────────────────────────────────────────

interface SriLankaMapProps {
  activeCategory: string | null;
}

export function SriLankaMap({ activeCategory }: SriLankaMapProps) {
  const [config, setConfig] = useState<MapConfig>(MAP_CONFIG);

  // Flat deduplicated marker list
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

  // Calibration helpers
  const applyDelta = useCallback((key: keyof MapConfig, delta: number) => {
    setConfig((prev) => {
      const next = parseFloat((prev[key] + delta).toFixed(4));
      return { ...prev, [key]: next };
    });
  }, []);

  const resetConfig = useCallback(() => setConfig(MAP_CONFIG), []);

  // Keyboard shortcuts (only in debug mode)
  useEffect(() => {
    if (!DEBUG_MAP_MODE) return;
    const OFFSET_STEP = 5;
    const SCALE_STEP = 0.02;

    const onKey = (e: KeyboardEvent) => {
      // Don't hijack typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case "ArrowLeft":  e.preventDefault(); applyDelta("offsetX", -OFFSET_STEP); break;
        case "ArrowRight": e.preventDefault(); applyDelta("offsetX",  OFFSET_STEP); break;
        case "ArrowUp":    e.preventDefault(); applyDelta("offsetY", -OFFSET_STEP); break;
        case "ArrowDown":  e.preventDefault(); applyDelta("offsetY",  OFFSET_STEP); break;
        case "+":
        case "=":                              applyDelta("scale",  SCALE_STEP);  break;
        case "-":                              applyDelta("scale", -SCALE_STEP);  break;
        case "0":                              resetConfig();                      break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [applyDelta, resetConfig]);

  return (
    <>
      {/* Outer: floating animation */}
      <motion.div
        className="relative w-full select-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ overflow: "visible" }}
      >
        {/* Ambient category glow (behind map, outside transform group) */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-[-12%] rounded-full pointer-events-none blur-3xl"
              style={{ backgroundColor: colors?.glow ?? "transparent", opacity: 0.18 }}
            />
          )}
        </AnimatePresence>

        {/* Calibration-transformed group — map image + markers move together */}
        <div
          className="relative"
          style={{
            transform: `translate(${config.offsetX}px, ${config.offsetY}px) scale(${config.scale})`,
            transformOrigin: "center center",
          }}
        >
          <img
            src={mapImage}
            alt="Illustrated map of Sri Lanka showing travel regions"
            className="w-full h-auto pointer-events-none"
            draggable={false}
          />

          {/* Marker overlay — % coords are relative to this container */}
          <div className="absolute inset-0" style={{ overflow: "visible", zIndex: 20 }}>
            {allMarkers.map((marker) => {
              const isActive = activeIds.length > 0 && activeIds.includes(marker.id);
              const mc = activeCategory && activeIds.includes(marker.id)
                ? colors!
                : { color: "#9CA3AF", glow: "#F3F4F6" };

              return (
                <PremiumMarker
                  key={marker.id}
                  marker={marker}
                  isActive={isActive}
                  color={mc.color}
                  glowColor={mc.glow}
                  markerScale={config.markerScale}
                />
              );
            })}
          </div>

          {/* Debug overlay (inside transform group so it aligns with the map) */}
          {DEBUG_MAP_MODE && <DebugOverlay allMarkers={allMarkers} config={config} />}
        </div>
      </motion.div>

      {/* Calibration panel — fixed position, outside floating animation */}
      {DEBUG_MAP_MODE && (
        <CalibrationPanel config={config} onDelta={applyDelta} onReset={resetConfig} />
      )}
    </>
  );
}
