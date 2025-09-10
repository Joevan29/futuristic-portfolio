"use client"

import { motion } from "framer-motion"
import { ParticleSystem } from "./particle-system"
import { NeonBlob } from "./neon-blob"
import { TypingCarousel } from "./typing-carousel"
import { ChevronDown } from "lucide-react"

export function CinematicHero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Atmospheric Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Breathing Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Particle System */}
      <ParticleSystem />

      {/* Neon Blob */}
      <NeonBlob />

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 px-4">
        {/* Main Title with 3D Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
            <motion.span
              className="block text-gradient neon-glow"
              style={{
                textShadow: `
                  0 0 5px currentColor,
                  0 0 10px currentColor,
                  0 0 15px currentColor,
                  0 0 20px currentColor,
                  3px 3px 0px rgba(0,0,0,0.8),
                  6px 6px 0px rgba(0,0,0,0.6),
                  9px 9px 0px rgba(0,0,0,0.4)
                `,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              DEVELOPER
            </motion.span>
          </h1>

          <div className="text-4xl md:text-6xl lg:text-7xl font-black">
            <TypingCarousel />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
        >
          Full-Stack Developer crafting the future of web experiences with cutting-edge technology,
          <br />
          <span className="text-primary font-semibold">stunning visuals</span>, and{" "}
          <span className="text-primary font-semibold">seamless interactions</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
        >
          <motion.button
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg glass-morphism border border-primary/50 neon-glow"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 188, 212, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Work
          </motion.button>

          <motion.button
            className="px-8 py-4 bg-transparent text-foreground border-2 border-primary rounded-xl font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 188, 212, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="w-8 h-8 text-primary neon-glow" />
      </motion.div>

      {/* Ambient Light Rays */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-1/2 h-full bg-gradient-to-br from-primary/20 to-transparent rotate-12"
          animate={{ rotate: [12, 15, 12] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-1/2 h-full bg-gradient-to-bl from-secondary/20 to-transparent -rotate-12"
          animate={{ rotate: [-12, -15, -12] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
    </section>
  )
}
