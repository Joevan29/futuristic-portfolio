"use client"

import { motion } from "framer-motion"
import { HolographicCode } from "./holographic-code"
import { SkillCard3DGrid } from "./skill-card-3d"
import { LiquidBackground } from "./liquid-background"

export function WhatIDoSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-transparent to-primary/5"
    >
      <LiquidBackground />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-black text-gradient neon-glow mb-6"
            style={{
              textShadow: `
                0 0 5px currentColor,
                0 0 10px currentColor,
                0 0 15px currentColor,
                2px 2px 0px rgba(0,0,0,0.8),
                4px 4px 0px rgba(0,0,0,0.6)
              `,
            }}
          >
            WHAT I DO
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
          >
            I craft digital experiences that push the boundaries of what's possible, combining cutting-edge technology
            with stunning visual design to create
            <span className="text-primary"> impossible interactions</span> and
            <span className="text-secondary"> memorable moments</span>.
          </motion.p>
        </motion.div>

        {/* Holographic Code Display */}
        <motion.div
          className="mb-20 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <HolographicCode />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <SkillCard3DGrid />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-lg glass-morphism border border-primary/50 neon-glow"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(0, 188, 212, 0.5)",
              background: "linear-gradient(45deg, #00bcd4, #ff00ff, #39ff14)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          >
            See My Work in Action
          </motion.button>
        </motion.div>
      </div>

      {/* Atmospheric Glow Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
    </section>
  )
}
