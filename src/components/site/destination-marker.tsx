import { motion, AnimatePresence } from "framer-motion";

export interface MarkerData {
  id: string;
  name: string;
  /** Percentage values (0–100) relative to the SVG viewBox */
  x: number;
  y: number;
  category: string;
}

interface DestinationMarkerProps {
  marker: MarkerData;
  isActive: boolean;
  color: string;
  glowColor: string;
}

export function DestinationMarker({ marker, isActive, color, glowColor }: DestinationMarkerProps) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={
        isActive
          ? { opacity: 1, scale: 1 }
          : { opacity: 0.25, scale: 0.7 }
      }
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ transformOrigin: `${marker.x}% ${marker.y}%` }}
      aria-label={marker.name}
      role="img"
    >
      {/* Outer pulse ring */}
      {isActive && (
        <motion.circle
          cx={`${marker.x}%`}
          cy={`${marker.y}%`}
          r="12"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          animate={{ r: [10, 18], opacity: [0.7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* Glow background */}
      {isActive && (
        <circle
          cx={`${marker.x}%`}
          cy={`${marker.y}%`}
          r="9"
          fill={glowColor}
          opacity={0.25}
        />
      )}

      {/* Core dot */}
      <motion.circle
        cx={`${marker.x}%`}
        cy={`${marker.y}%`}
        r={isActive ? 5 : 3}
        fill={isActive ? color : "#6B7280"}
        animate={{ r: isActive ? 5 : 3 }}
        transition={{ duration: 0.3 }}
      />

      {/* Label */}
      <AnimatePresence>
        {isActive && (
          <motion.g
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Label background pill */}
            <rect
              x={`${marker.x - 0.1}%`}
              y={`${marker.y - 12.5}%`}
              width={marker.name.length * 5.2 + 12}
              height="14"
              rx="7"
              fill={color}
              transform={`translate(-${(marker.name.length * 5.2 + 12) / 2}, -16)`}
            />
            <text
              x={`${marker.x}%`}
              y={`${marker.y}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="7"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
              fill="white"
              transform="translate(0, -24)"
              style={{ userSelect: "none", letterSpacing: "0.03em" }}
            >
              {marker.name}
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </motion.g>
  );
}
