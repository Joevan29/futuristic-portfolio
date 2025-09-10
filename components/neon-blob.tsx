"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function NeonBlob() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const blobPath = `M${200 + Math.sin(scrollY * 0.01) * 50},${150 + Math.cos(scrollY * 0.01) * 30}
    C${300 + mousePos.x * 0.1},${100 + mousePos.y * 0.05} 
    ${400 + Math.sin(scrollY * 0.015) * 40},${200 + Math.cos(scrollY * 0.012) * 35}
    ${350 + Math.sin(scrollY * 0.008) * 60},${300 + Math.cos(scrollY * 0.01) * 45}
    C${250 + mousePos.x * 0.08},${350 + mousePos.y * 0.06}
    ${150 + Math.sin(scrollY * 0.012) * 35},${250 + Math.cos(scrollY * 0.015) * 40}
    ${200 + Math.sin(scrollY * 0.01) * 50},${150 + Math.cos(scrollY * 0.01) * 30}Z`

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mousePos.x * 0.02,
          y: mousePos.y * 0.02,
          rotate: scrollY * 0.1,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#39ff14" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={blobPath}
          fill="url(#blobGradient)"
          stroke="#00bcd4"
          strokeWidth="2"
          filter="url(#glow)"
          animate={{
            d: blobPath,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.svg>
    </div>
  )
}
