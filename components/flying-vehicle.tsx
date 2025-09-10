"use client"

import { motion } from "framer-motion"

interface FlyingVehicleProps {
  startX: number
  startY: number
  endX: number
  endY: number
  duration: number
  delay: number
  color: string
}

export function FlyingVehicle({ startX, startY, endX, endY, duration, delay, color }: FlyingVehicleProps) {
  return (
    <motion.div
      className="absolute w-4 h-2 rounded-full"
      style={{
        background: `linear-gradient(90deg, ${color}, transparent)`,
        boxShadow: `0 0 10px ${color}`,
      }}
      initial={{ x: startX, y: startY, opacity: 0 }}
      animate={{
        x: [startX, endX],
        y: [startY, endY],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      {/* Particle Trail */}
      <motion.div
        className="absolute -left-8 top-0 w-8 h-0.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </motion.div>
  )
}
