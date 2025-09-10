"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function LiquidBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Flowing Liquid Shapes */}
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <defs>
          <linearGradient id="liquidGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00bcd4" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#39ff14" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="liquidGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#9d4edd" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00bcd4" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Morphing Liquid Shape 1 */}
        <motion.path
          d={`M0,400 
              C200,${300 + Math.sin(scrollY * 0.01) * 50} 
              400,${500 + Math.cos(scrollY * 0.008) * 60} 
              600,${350 + Math.sin(scrollY * 0.012) * 40}
              C800,${200 + Math.cos(scrollY * 0.01) * 50} 
              1000,${450 + Math.sin(scrollY * 0.015) * 30} 
              1200,400
              L1200,800 L0,800 Z`}
          fill="url(#liquidGradient1)"
          animate={{
            d: `M0,400 
                C200,${320 + Math.sin(scrollY * 0.01 + 1) * 50} 
                400,${480 + Math.cos(scrollY * 0.008 + 1) * 60} 
                600,${370 + Math.sin(scrollY * 0.012 + 1) * 40}
                C800,${220 + Math.cos(scrollY * 0.01 + 1) * 50} 
                1000,${430 + Math.sin(scrollY * 0.015 + 1) * 30} 
                1200,400
                L1200,800 L0,800 Z`,
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />

        {/* Morphing Liquid Shape 2 */}
        <motion.path
          d={`M0,600 
              C300,${550 + Math.sin(scrollY * 0.015) * 40} 
              600,${650 + Math.cos(scrollY * 0.01) * 50} 
              900,${600 + Math.sin(scrollY * 0.008) * 35}
              C1100,${580 + Math.cos(scrollY * 0.012) * 45} 
              1200,${620 + Math.sin(scrollY * 0.01) * 30} 
              1200,800
              L0,800 Z`}
          fill="url(#liquidGradient2)"
          animate={{
            d: `M0,600 
                C300,${570 + Math.sin(scrollY * 0.015 + 2) * 40} 
                600,${630 + Math.cos(scrollY * 0.01 + 2) * 50} 
                900,${620 + Math.sin(scrollY * 0.008 + 2) * 35}
                C1100,${560 + Math.cos(scrollY * 0.012 + 2) * 45} 
                1200,${640 + Math.sin(scrollY * 0.01 + 2) * 30} 
                1200,800
                L0,800 Z`,
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </motion.svg>

      {/* Rising Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            background: `radial-gradient(circle, rgba(0, 188, 212, 0.2) 0%, rgba(255, 0, 255, 0.1) 50%, transparent 100%)`,
            filter: "blur(1px)",
          }}
          animate={{
            y: [800, -200],
            x: [0, Math.sin(bubble.id) * 100],
            scale: [0.5, 1, 0.8],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
