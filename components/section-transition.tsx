"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SectionTransitionProps {
  children: React.ReactNode
  sectionId: string
  transitionType?: "quantum" | "reality-bend" | "time-dilation" | "consciousness"
}

export function SectionTransition({ children, sectionId, transitionType = "quantum" }: SectionTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height

      // Calculate visibility progress
      const visibilityStart = windowHeight
      const visibilityEnd = -elementHeight
      const totalDistance = visibilityStart - visibilityEnd
      const currentPosition = rect.top
      const progress = Math.max(0, Math.min(1, (visibilityStart - currentPosition) / totalDistance))

      setScrollProgress(progress)
      setIsVisible(progress > 0 && progress < 1)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionId])

  const getTransitionVariants = () => {
    switch (transitionType) {
      case "quantum":
        return {
          hidden: {
            opacity: 0,
            scale: 0.8,
            rotateX: -15,
            filter: "blur(10px)",
          },
          visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
            transition: {
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.1,
            },
          },
        }
      case "reality-bend":
        return {
          hidden: {
            opacity: 0,
            rotateY: 90,
            perspective: 1000,
            transformOrigin: "center",
          },
          visible: {
            opacity: 1,
            rotateY: 0,
            transition: {
              duration: 1.5,
              ease: "easeInOut",
            },
          },
        }
      case "time-dilation":
        return {
          hidden: {
            opacity: 0,
            scale: 1.2,
            filter: "blur(20px) brightness(0.5)",
          },
          visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1)",
            transition: {
              duration: 2,
              ease: [0.23, 1, 0.32, 1],
            },
          },
        }
      case "consciousness":
        return {
          hidden: {
            opacity: 0,
            y: 100,
            filter: "blur(15px) hue-rotate(180deg)",
          },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px) hue-rotate(0deg)",
            transition: {
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        }
      default:
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={getTransitionVariants()}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}

      {/* Quantum Tunneling Effect */}
      {transitionType === "quantum" && isVisible && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border border-primary/20 rounded-2xl"
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.1, 1.2],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      )}

      {/* Reality Distortion Grid */}
      {transitionType === "reality-bend" && (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full opacity-10">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
              </pattern>
            </defs>
            <motion.rect
              width="100%"
              height="100%"
              fill="url(#grid)"
              animate={{
                skewX: [0, 5, 0, -5, 0],
                skewY: [0, -2, 0, 2, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </svg>
        </div>
      )}
    </motion.div>
  )
}
