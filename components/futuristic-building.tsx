"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface BuildingProps {
  height: number
  width: number
  x: number
  y: number
  color: string
  hasNeonSign?: boolean
  signText?: string
}

export function FuturisticBuilding({ height, width, x, y, color, hasNeonSign, signText }: BuildingProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: x, top: y, width, height }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Building Structure */}
      <motion.div
        className="relative w-full h-full"
        style={{
          background: `linear-gradient(180deg, ${color}80 0%, ${color}40 100%)`,
          boxShadow: isHovered ? `0 0 30px ${color}80` : `0 0 10px ${color}40`,
        }}
        animate={{
          boxShadow: isHovered ? `0 0 30px ${color}80` : `0 0 10px ${color}40`,
        }}
      >
        {/* Building Windows */}
        {Array.from({ length: Math.floor(height / 20) }, (_, floor) =>
          Array.from({ length: Math.floor(width / 15) }, (_, window) => (
            <motion.div
              key={`${floor}-${window}`}
              className="absolute w-2 h-2 bg-yellow-400"
              style={{
                left: 5 + window * 15,
                top: 5 + floor * 20,
                opacity: Math.random() > 0.3 ? 1 : 0.2,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          )),
        )}

        {/* Neon Sign */}
        {hasNeonSign && (
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded"
            style={{
              background: color,
              color: "#000",
              textShadow: `0 0 10px ${color}`,
              boxShadow: `0 0 20px ${color}`,
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              textShadow: [`0 0 10px ${color}`, `0 0 20px ${color}`, `0 0 10px ${color}`],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {signText || "TECH"}
          </motion.div>
        )}

        {/* Building Glow Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${color}20 100%)`,
            filter: "blur(2px)",
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0.3,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
