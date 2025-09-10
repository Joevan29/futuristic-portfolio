"use client"

import { motion } from "framer-motion"
import { Filter, Grid, List, Zap, ExternalLink, Github, Play } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const categories = [
  { id: "all", label: "All Projects", icon: Grid },
  { id: "web", label: "Web Apps", icon: Grid },
  { id: "mobile", label: "Mobile", icon: List },
  { id: "ai", label: "AI/ML", icon: Zap },
  { id: "fullstack", label: "Full-Stack", icon: Filter },
]

const projects = [
  {
    id: 1,
    title: "Neural Commerce Platform",
    category: "ai",
    description: "AI-powered e-commerce with predictive analytics and personalized recommendations",
    tech: ["Next.js", "TensorFlow", "Python", "PostgreSQL"],
    image: "/futuristic-ai-commerce-dashboard-with-neural-netwo.jpg",
    demo: "https://demo.joevanpramana.dev",
    github: "https://github.com/jvnprmnachmd",
    featured: true,
    metrics: { users: "50K+", performance: "99.9%", ai_accuracy: "94%" },
  },
  {
    id: 2,
    title: "Quantum Task Manager",
    category: "web",
    description: "Revolutionary productivity app with quantum-inspired algorithms for optimal task scheduling",
    tech: ["React", "Node.js", "GraphQL", "MongoDB"],
    image: "/quantum-task-management-interface-with-glowing-par.jpg",
    demo: "https://demo.joevanpramana.dev",
    github: "https://github.com/jvnprmnachmd",
    featured: false,
    metrics: { tasks: "1M+", efficiency: "85%", users: "25K+" },
  },
  {
    id: 3,
    title: "Holographic Data Viz",
    category: "fullstack",
    description: "3D data visualization platform with holographic projections and real-time analytics",
    tech: ["Three.js", "D3.js", "WebGL", "FastAPI"],
    image: "/3d-holographic-data-visualization-with-floating-ch.jpg",
    demo: "https://demo.joevanpramana.dev",
    github: "https://github.com/jvnprmnachmd",
    featured: true,
    metrics: { datasets: "500+", render_time: "< 100ms", accuracy: "99%" },
  },
  {
    id: 4,
    title: "Cyber Security Suite",
    category: "web",
    description: "Advanced cybersecurity dashboard with AI threat detection and quantum encryption",
    tech: ["Vue.js", "Python", "TensorFlow", "Redis"],
    image: "/cybersecurity-dashboard-with-neon-threat-detection.jpg",
    demo: "https://demo.joevanpramana.dev",
    github: "https://github.com/jvnprmnachmd",
    featured: false,
    metrics: { threats: "99.8%", response: "< 1s", protected: "100K+" },
  },
  {
    id: 5,
    title: "Neural Mobile Assistant",
    category: "mobile",
    description: "AI-powered mobile assistant with natural language processing and predictive capabilities",
    tech: ["React Native", "TensorFlow Lite", "Node.js", "Firebase"],
    image: "/mobile-ai-assistant-interface-with-neural-patterns.jpg",
    demo: "https://demo.joevanpramana.dev",
    github: "https://github.com/jvnprmnachmd",
    featured: false,
    metrics: { accuracy: "96%", response: "< 500ms", downloads: "75K+" },
  },
  {
    id: 6,
    title: "Quantum Finance Tracker",
    category: "ai",
    description: "Advanced financial analytics with quantum computing algorithms for market prediction",
    tech: ["Next.js", "Python", "Qiskit", "PostgreSQL"],
    image: "/quantum-finance-dashboard-with-market-predictions.jpg",
    demo: "https://demo.joevanpramana.dev",
    github: "https://github.com/jvnprmnachmd",
    featured: true,
    metrics: { accuracy: "92%", trades: "10K+", profit: "+45%" },
  },
]

export function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const filteredProjects = projects.filter((project) => activeCategory === "all" || project.category === activeCategory)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const grid = gridRef.current
    if (grid) {
      grid.addEventListener("mousemove", handleMouseMove)
      return () => grid.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      id="portfolio"
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-transparent to-accent/5"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        {/* Quantum Connection Lines */}
        {hoveredProject && (
          <svg className="absolute inset-0 w-full h-full">
            {projects.map(
              (project, index) =>
                project.id !== hoveredProject && (
                  <motion.line
                    key={project.id}
                    x1={mousePosition.x}
                    y1={mousePosition.y}
                    x2={Math.random() * window.innerWidth}
                    y2={Math.random() * window.innerHeight}
                    stroke="url(#connectionGradient)"
                    strokeWidth="1"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                ),
            )}
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

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
                2px 2px 0px rgba(0,0,0,0.8)
              `,
            }}
          >
            AI-Enhanced Portfolio
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Witness the convergence of cutting-edge technology and innovative design. Each project represents a quantum
            leap in digital evolution.
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  relative px-6 py-3 rounded-full border transition-all duration-300
                  ${
                    activeCategory === category.id
                      ? "bg-primary/20 border-primary text-primary shadow-lg shadow-primary/25"
                      : "bg-background/50 border-border hover:border-primary/50 text-muted-foreground hover:text-primary"
                  }
                  backdrop-blur-sm
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{category.label}</span>
                </div>
                {activeCategory === category.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/30"
                    layoutId="activeCategory"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Intelligent Grid */}
        <motion.div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                relative group cursor-pointer
                ${project.featured ? "md:col-span-2 lg:col-span-2" : ""}
              `}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: 5,
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              {/* Project Card */}
              <div className="relative h-full bg-background/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Project Image */}
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay with Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.a
                      href={project.demo}
                      className="p-3 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 text-primary hover:bg-primary/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.github}
                      className="p-3 bg-secondary/20 backdrop-blur-sm rounded-full border border-secondary/30 text-secondary hover:bg-secondary/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      className="p-3 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30 text-accent hover:bg-accent/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 text-primary text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key.replace("_", " ")}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Particle Effects on Hover */}
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary rounded-full"
                        initial={{
                          x: Math.random() * 100 + "%",
                          y: Math.random() * 100 + "%",
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          x: Math.random() * 100 + "%",
                          y: Math.random() * 100 + "%",
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
