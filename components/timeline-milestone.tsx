"use client"

import { motion } from "framer-motion"
import { Calendar, Code, Rocket, Trophy, Zap, Star } from "lucide-react"

interface TimelineMilestoneProps {
  year: string
  title: string
  description: string
  icon: "calendar" | "code" | "rocket" | "trophy" | "zap" | "star"
  color: string
  isActive: boolean
  scrollProgress: number
}

const iconMap = {
  calendar: Calendar,
  code: Code,
  rocket: Rocket,
  trophy: Trophy,
  zap: Zap,
  star: Star,
}

export function TimelineMilestone({
  year,
  title,
  description,
  icon,
  color,
  isActive,
  scrollProgress,
}: TimelineMilestoneProps) {
  const Icon = iconMap[icon]

  return (
    <motion.div
      className="relative flex items-center gap-8 mb-20"
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: isActive ? 1 : 0.3,
        x: isActive ? 0 : -50,
        scale: isActive ? 1.05 : 0.95,
      }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {/* Timeline Line */}
      <div className="absolute left-16 top-20 w-0.5 h-20 bg-gradient-to-b from-primary to-transparent" />

      {/* Year Badge */}
      <motion.div
        className="relative z-10 w-32 h-32 rounded-full glass-morphism flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${color}40, ${color}20)`,
          border: `2px solid ${color}`,
          boxShadow: isActive ? `0 0 30px ${color}80` : `0 0 10px ${color}40`,
        }}
        animate={{
          rotate: scrollProgress * 360,
          boxShadow: isActive ? `0 0 30px ${color}80` : `0 0 10px ${color}40`,
        }}
      >
        <div className="text-center">
          <Icon size={24} className="mx-auto mb-2" style={{ color }} />
          <span className="text-sm font-bold" style={{ color }}>
            {year}
          </span>
        </div>

        {/* Glitch Effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${color}60, transparent)`,
              filter: "blur(1px)",
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        className="flex-1 glass-morphism rounded-2xl p-6"
        animate={{
          background: isActive ? `linear-gradient(135deg, ${color}20, rgba(0,0,0,0.8))` : "rgba(255,255,255,0.05)",
        }}
      >
        <motion.h3
          className="text-2xl font-bold mb-3"
          style={{ color: isActive ? color : "#ffffff" }}
          animate={{
            textShadow: isActive ? `0 0 10px ${color}` : "none",
          }}
        >
          {title}
        </motion.h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>

        {/* Reality Distortion Effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${color}10 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
