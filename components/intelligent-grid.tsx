"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ProjectCard } from "./project-card"

const projectsData = [
  {
    id: "1",
    title: "AI-Powered Dashboard",
    description: "Real-time analytics dashboard with machine learning insights and predictive modeling.",
    technologies: ["React", "TypeScript", "Python", "TensorFlow", "D3.js"],
    category: "ai" as const,
    image: "/futuristic-ai-dashboard-with-neon-charts.jpg",
    demoUrl: "https://demo.joevanpramana.dev",
    githubUrl: "https://github.com/jvnprmnachmd",
    stats: { views: 2847, likes: 156, performance: 98 },
    color: "#00bcd4",
    isLive: true,
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with advanced payment processing and inventory management.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    category: "fullstack" as const,
    image: "/modern-e-commerce-interface-with-neon-accents.jpg",
    demoUrl: "https://demo.joevanpramana.dev",
    githubUrl: "https://github.com/jvnprmnachmd",
    stats: { views: 1923, likes: 89, performance: 95 },
    color: "#ff00ff",
    isLive: true,
  },
  {
    id: "3",
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking app with social features and AR workout guidance.",
    technologies: ["React Native", "Firebase", "ARKit", "GraphQL"],
    category: "mobile" as const,
    image: "/fitness-app-interface-with-holographic-elements.jpg",
    demoUrl: "https://demo.joevanpramana.dev",
    githubUrl: "https://github.com/jvnprmnachmd",
    stats: { views: 3156, likes: 234, performance: 92 },
    color: "#39ff14",
    isLive: false,
  },
  {
    id: "4",
    title: "Portfolio Website",
    description: "Interactive portfolio with advanced animations and particle systems.",
    technologies: ["Next.js", "Framer Motion", "Three.js", "GSAP"],
    category: "web" as const,
    image: "/futuristic-portfolio-website-with-particles.jpg",
    demoUrl: "https://demo.joevanpramana.dev",
    githubUrl: "https://github.com/jvnprmnachmd",
    stats: { views: 4521, likes: 312, performance: 99 },
    color: "#ffd700",
    isLive: true,
  },
  {
    id: "5",
    title: "Blockchain Explorer",
    description: "Real-time blockchain data visualization with advanced analytics and transaction tracking.",
    technologies: ["Vue.js", "Web3.js", "Solidity", "Chart.js"],
    category: "web" as const,
    image: "/blockchain-explorer-with-neon-data-visualization.jpg",
    demoUrl: "https://demo.joevanpramana.dev",
    githubUrl: "https://github.com/jvnprmnachmd",
    stats: { views: 1687, likes: 78, performance: 94 },
    color: "#9d4edd",
    isLive: true,
  },
  {
    id: "6",
    title: "Smart Home Controller",
    description: "IoT dashboard for controlling smart home devices with voice commands and automation.",
    technologies: ["React", "IoT", "WebRTC", "Socket.io"],
    category: "fullstack" as const,
    image: "/smart-home-control-interface-with-glowing-buttons.jpg",
    demoUrl: "https://demo.joevanpramana.dev",
    githubUrl: "https://github.com/jvnprmnachmd",
    stats: { views: 2134, likes: 145, performance: 96 },
    color: "#00bcd4",
    isLive: false,
  },
]

const categoryConnections = {
  ai: ["1", "4"],
  fullstack: ["2", "6"],
  mobile: ["3"],
  web: ["4", "5"],
}

export function IntelligentGrid() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [projects, setProjects] = useState(projectsData)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Intelligent rearrangement based on hover
  useEffect(() => {
    if (!hoveredProject) return

    const hoveredProjectData = projects.find((p) => p.id === hoveredProject)
    if (!hoveredProjectData) return

    // Move related projects closer to hovered project
    const rearrangedProjects = [...projects].sort((a, b) => {
      const aIsRelated = categoryConnections[hoveredProjectData.category].includes(a.id)
      const bIsRelated = categoryConnections[hoveredProjectData.category].includes(b.id)

      if (a.id === hoveredProject) return -1
      if (b.id === hoveredProject) return 1
      if (aIsRelated && !bIsRelated) return -1
      if (!aIsRelated && bIsRelated) return 1
      return 0
    })

    setProjects(rearrangedProjects)
  }, [hoveredProject])

  const getConnectedProjects = (projectId: string | null) => {
    if (!projectId) return []
    const project = projects.find((p) => p.id === projectId)
    if (!project) return []
    return categoryConnections[project.category] || []
  }

  return (
    <div className="relative">
      {/* Grid Container */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
        transition={{ duration: 0.6, type: "spring" }}
      >
        {projects.map((project, index) => (
          <motion.div key={project.id} layout transition={{ duration: 0.6, type: "spring" }}>
            <ProjectCard
              project={project}
              index={index}
              mousePosition={mousePosition}
              onHover={setHoveredProject}
              hoveredProject={hoveredProject}
              connectedProjects={getConnectedProjects(hoveredProject)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Connection Lines */}
      {hoveredProject && (
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          {getConnectedProjects(hoveredProject).map((connectedId) => {
            const hoveredElement = document.querySelector(`[data-project-id="${hoveredProject}"]`)
            const connectedElement = document.querySelector(`[data-project-id="${connectedId}"]`)

            if (!hoveredElement || !connectedElement) return null

            const hoveredRect = hoveredElement.getBoundingClientRect()
            const connectedRect = connectedElement.getBoundingClientRect()

            const x1 = hoveredRect.left + hoveredRect.width / 2
            const y1 = hoveredRect.top + hoveredRect.height / 2
            const x2 = connectedRect.left + connectedRect.width / 2
            const y2 = connectedRect.top + connectedRect.height / 2

            return (
              <motion.line
                key={connectedId}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#00bcd4"
                strokeWidth="2"
                strokeOpacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            )
          })}
        </svg>
      )}
    </div>
  )
}
