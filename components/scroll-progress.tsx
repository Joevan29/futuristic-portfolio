"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      {/* Main Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Quantum Progress Particles */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full z-50 pointer-events-none"
        style={{
          x: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }),
          left: "calc(100vw * var(--scroll-progress) - 8px)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </>
  )
}
