"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ExternalLink, Github, Play, Zap, Database, Smartphone, Globe } from "lucide-react"

interface ProjectData {
  id: string
  title: string
  description: string
  technologies: string[]
  category: "web" | "mobile" | "ai" | "fullstack"
  image: string
  demoUrl?: string
  githubUrl?: string
  stats: {
    views: number
    likes: number
    performance: number
  }
  color: string
  isLive?: boolean
}

interface ProjectCardProps {
  project: ProjectData
  index: number
  mousePosition: { x: number; y: number }
  onHover: (projectId: string | null) => void
  hoveredProject: string | null
  connectedProjects: string[]
}

const categoryIcons = {
  web: Globe,
  mobile: Smartphone,
  ai: Zap,
  fullstack: Database,
}

export function ProjectCard({
  project,
  index,
  mousePosition,
  onHover,
  hoveredProject,
  connectedProjects,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })

  useEffect(() => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = mousePosition.x - centerX
    const deltaY = mousePosition.y - centerY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    // Magnetic attraction effect
    if (distance < 200) {
      const force = (200 - distance) / 200
      x.set(deltaX * force * 0.1)
      y.set(deltaY * force * 0.1)
      rotateX.set(deltaY * force * 0.05)
      rotateY.set(-deltaX * force * 0.05)
    } else {
      x.set(0)
      y.set(0)
      rotateX.set(0)
      rotateY.set(0)
    }
  }, [mousePosition, x, y, rotateX, rotateY])

  const isConnected = connectedProjects.includes(project.id)
  const isRelatedHovered = hoveredProject && hoveredProject !== project.id && isConnected
  const CategoryIcon = categoryIcons[project.category]

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      style={{ x, y, rotateX, rotateY }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: isHovered ? 1.05 : isRelatedHovered ? 1.02 : 1,
      }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => {
        setIsHovered(true)
        onHover(project.id)
      }}
      onHoverEnd={() => {
        setIsHovered(false)
        onHover(null)
      }}
    >
      <motion.div
        className="relative w-full h-96 glass-morphism rounded-2xl overflow-hidden border"
        style={{
          borderColor: isHovered ? project.color : "rgba(255, 255, 255, 0.2)",
          boxShadow: isHovered
            ? `0 20px 40px ${project.color}40, 0 0 30px ${project.color}60`
            : isRelatedHovered
              ? `0 10px 20px ${project.color}20`
              : "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        animate={{
          borderColor: isHovered ? project.color : "rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Project Preview/Demo Area */}
        <div className="relative h-48 overflow-hidden">
          {showDemo && project.isLive ? (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center space-y-4">
                <motion.div
                  className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Play size={24} className="text-white ml-1" />
                </motion.div>
                <p className="text-sm text-muted-foreground">Live Demo Running</p>
                <div className="flex justify-center space-x-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Online</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span>Interactive</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          )}

          {/* Floating Stats */}
          <motion.div
            className="absolute top-4 right-4 space-y-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-morphism rounded-lg px-3 py-1 text-xs">
              <span className="text-primary">{project.stats.views}</span> views
            </div>
            <div className="glass-morphism rounded-lg px-3 py-1 text-xs">
              <span className="text-secondary">{project.stats.likes}</span> likes
            </div>
            <div className="glass-morphism rounded-lg px-3 py-1 text-xs">
              <span className="text-accent">{project.stats.performance}%</span> perf
            </div>
          </motion.div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <motion.div
              className="flex items-center gap-2 glass-morphism rounded-full px-3 py-1"
              style={{ backgroundColor: `${project.color}20` }}
            >
              <CategoryIcon size={16} style={{ color: project.color }} />
              <span className="text-xs font-medium" style={{ color: project.color }}>
                {project.category.toUpperCase()}
              </span>
            </motion.div>
          </div>

          {/* Demo Toggle */}
          {project.isLive && (
            <motion.button
              className="absolute bottom-4 left-4 glass-morphism rounded-full p-2 hover:bg-primary/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setShowDemo(!showDemo)
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play size={16} className="text-primary" />
            </motion.button>
          )}
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full glass-morphism border"
                style={{ borderColor: `${project.color}40` }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full glass-morphism text-muted-foreground">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: `${project.color}20`,
                  color: project.color,
                  border: `1px solid ${project.color}40`,
                }}
                whileHover={{
                  backgroundColor: `${project.color}30`,
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={14} />
                Demo
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={14} />
                Code
              </motion.a>
            )}
          </div>
        </div>

        {/* Quantum Connection Effect */}
        {isRelatedHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${project.color}20 0%, transparent 70%)`,
                animation: "pulse 2s infinite",
              }}
            />
          </motion.div>
        )}

        {/* Energy Beam Effect */}
        {isHovered && (
          <motion.div
            className="absolute -inset-1 rounded-2xl pointer-events-none"
            style={{
              background: `linear-gradient(45deg, ${project.color}40, transparent, ${project.color}40)`,
              filter: "blur(1px)",
            }}
            animate={{
              background: [
                `linear-gradient(45deg, ${project.color}40, transparent, ${project.color}40)`,
                `linear-gradient(135deg, ${project.color}60, transparent, ${project.color}60)`,
                `linear-gradient(225deg, ${project.color}40, transparent, ${project.color}40)`,
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
