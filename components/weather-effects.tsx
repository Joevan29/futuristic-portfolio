"use client"

import { motion } from "framer-motion"

interface WeatherEffectsProps {
  scrollProgress: number
}

export function WeatherEffects({ scrollProgress }: WeatherEffectsProps) {
  const rainDrops = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 1 + 1.5,
  }))

  const lightningActive = scrollProgress > 0.3 && scrollProgress < 0.4

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Rain Effect */}
      {scrollProgress > 0.2 && (
        <>
          {rainDrops.map((drop) => (
            <motion.div
              key={drop.id}
              className="absolute w-0.5 h-8 bg-gradient-to-b from-blue-400 to-transparent"
              style={{ left: `${drop.x}%` }}
              animate={{
                y: [-50, window.innerHeight + 50],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: drop.duration,
                delay: drop.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </>
      )}

      {/* Lightning Effect */}
      {lightningActive && (
        <motion.div
          className="absolute inset-0 bg-white"
          animate={{
            opacity: [0, 0.3, 0, 0.5, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 3 + 2,
          }}
        />
      )}

      {/* Aurora Effect */}
      {scrollProgress > 0.7 && (
        <motion.div
          className="absolute top-0 left-0 w-full h-1/3"
          style={{
            background: `linear-gradient(180deg, 
              rgba(0, 255, 255, 0.2) 0%, 
              rgba(255, 0, 255, 0.2) 50%, 
              rgba(57, 255, 20, 0.2) 100%)`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            background: [
              "linear-gradient(180deg, rgba(0, 255, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 50%, rgba(57, 255, 20, 0.2) 100%)",
              "linear-gradient(180deg, rgba(255, 0, 255, 0.2) 0%, rgba(57, 255, 20, 0.2) 50%, rgba(0, 255, 255, 0.2) 100%)",
              "linear-gradient(180deg, rgba(57, 255, 20, 0.2) 0%, rgba(0, 255, 255, 0.2) 50%, rgba(255, 0, 255, 0.2) 100%)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      )}
    </div>
  )
}
