"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxLayerProps {
  children: React.ReactNode
  speed: number
  direction?: "up" | "down" | "left" | "right" | "spiral"
  className?: string
  rotateSpeed?: number
  scaleRange?: [number, number]
}

export function ParallaxLayer({
  children,
  speed,
  direction = "up",
  className = "",
  rotateSpeed = 0,
  scaleRange = [1, 1],
}: ParallaxLayerProps) {
  const { scrollYProgress } = useScroll()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getTransform = () => {
    const baseOffset = scrollY * speed

    switch (direction) {
      case "up":
        return { y: -baseOffset }
      case "down":
        return { y: baseOffset }
      case "left":
        return { x: -baseOffset }
      case "right":
        return { x: baseOffset }
      case "spiral":
        return {
          x: Math.sin(scrollY * 0.01) * baseOffset * 0.5,
          y: -baseOffset,
          rotate: scrollY * rotateSpeed,
        }
      default:
        return { y: -baseOffset }
    }
  }

  const y = useTransform(scrollYProgress, [0, 1], [0, -scrollY * speed])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, scrollY * rotateSpeed])
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange)

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        ...getTransform(),
        rotate: rotateSpeed ? rotate : undefined,
        scale: scaleRange[0] !== scaleRange[1] ? scale : undefined,
      }}
    >
      {children}
    </motion.div>
  )
}
