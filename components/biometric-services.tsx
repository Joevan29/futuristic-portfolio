"use client"

import { motion } from "framer-motion"
import { Brain, Code, Database, Zap, Heart, Activity } from "lucide-react"
import { useState, useEffect } from "react"

const services = [
  {
    id: 1,
    title: "Neural Web Development",
    description: "AI-enhanced web applications that adapt and evolve with user behavior patterns",
    icon: Brain,
    price: "From $5,000",
    features: ["Machine Learning Integration", "Adaptive UI/UX", "Predictive Analytics", "Neural Networks"],
    biometric: "brainwave",
    color: "primary",
  },
  {
    id: 2,
    title: "Quantum Code Architecture",
    description: "Revolutionary software architecture using quantum computing principles",
    icon: Code,
    price: "From $8,000",
    features: ["Quantum Algorithms", "Parallel Processing", "Superposition Logic", "Entangled Systems"],
    biometric: "pulse",
    color: "secondary",
  },
  {
    id: 3,
    title: "DNA Data Systems",
    description: "Biological-inspired database structures that grow and adapt organically",
    icon: Database,
    price: "From $6,500",
    features: [
      "Organic Growth Patterns",
      "Self-Healing Architecture",
      "Evolutionary Optimization",
      "Genetic Algorithms",
    ],
    biometric: "dna",
    color: "accent",
  },
  {
    id: 4,
    title: "Consciousness AI",
    description: "Advanced AI systems that simulate human consciousness and decision-making",
    icon: Zap,
    price: "From $12,000",
    features: ["Consciousness Simulation", "Emotional Intelligence", "Intuitive Responses", "Self-Awareness"],
    biometric: "neural",
    color: "chart-4",
  },
]

export function BiometricServices() {
  const [activeService, setActiveService] = useState<number | null>(null)
  const [heartbeat, setHeartbeat] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeat((prev) => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const getBiometricPattern = (type: string, index: number) => {
    switch (type) {
      case "brainwave":
        return Math.sin((heartbeat + index * 10) * 0.1) * 20 + 50
      case "pulse":
        return Math.abs(Math.sin((heartbeat + index * 15) * 0.2)) * 40 + 30
      case "dna":
        return Math.sin((heartbeat + index * 20) * 0.15) * 15 + Math.cos((heartbeat + index * 25) * 0.1) * 10 + 50
      case "neural":
        return Math.random() * 30 + 40
      default:
        return 50
    }
  }

  return (
    <section
      id="services"
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-transparent to-chart-4/5"
    >
      {/* Biometric Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* DNA Helix */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          {[...Array(20)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${i * 50} 0 Q ${i * 50 + 25} ${getBiometricPattern("dna", i)} ${i * 50 + 50} 100`}
              stroke="url(#dnaGradient)"
              strokeWidth="2"
              fill="none"
              animate={{
                d: `M ${i * 50} 0 Q ${i * 50 + 25} ${getBiometricPattern("dna", i)} ${i * 50 + 50} 100`,
              }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </svg>

        {/* Neural Network */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
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
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <Heart className="w-8 h-8 text-chart-4" />
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-transparent via-chart-4 to-transparent"
              animate={{
                scaleX: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <Activity className="w-8 h-8 text-chart-4" />
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black text-gradient neon-glow mb-6"
            style={{
              background: "linear-gradient(45deg, hsl(var(--chart-4)), hsl(var(--primary)), hsl(var(--secondary)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px hsl(var(--chart-4))",
            }}
          >
            Biometric Services
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Experience the fusion of biological intelligence and digital innovation. Services that pulse with life and
            adapt to your unique digital DNA.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const isActive = activeService === service.id

            return (
              <motion.div
                key={service.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                }}
              >
                {/* Service Card */}
                <div className="relative h-full bg-background/30 backdrop-blur-sm border border-border rounded-2xl p-8 overflow-hidden">
                  {/* Biometric Visualization */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                    <svg className="w-full h-full">
                      <motion.path
                        d={`M 0 64 Q 32 ${getBiometricPattern(service.biometric, index)} 64 64 Q 96 ${getBiometricPattern(
                          service.biometric,
                          index + 1,
                        )} 128 64`}
                        stroke={`hsl(var(--${service.color}))`}
                        strokeWidth="2"
                        fill="none"
                        animate={{
                          d: `M 0 64 Q 32 ${getBiometricPattern(service.biometric, index)} 64 64 Q 96 ${getBiometricPattern(
                            service.biometric,
                            index + 1,
                          )} 128 64`,
                        }}
                        transition={{ duration: 0.1 }}
                      />
                    </svg>
                  </div>

                  {/* Pulse Effect */}
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 border-2 border-${service.color}/30 rounded-2xl`}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  )}

                  {/* Service Icon */}
                  <motion.div
                    className={`inline-flex p-4 bg-${service.color}/10 border border-${service.color}/20 rounded-2xl mb-6`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Icon className={`w-8 h-8 text-${service.color}`} />
                  </motion.div>

                  {/* Service Content */}
                  <h3 className={`text-2xl font-bold text-${service.color} mb-3`}>{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                      >
                        <motion.div
                          className={`w-2 h-2 bg-${service.color} rounded-full`}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: featureIndex * 0.2,
                          }}
                        />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-bold text-${service.color}`}>{service.price}</span>
                    <motion.button
                      className={`px-6 py-2 bg-${service.color}/10 border border-${service.color}/20 rounded-full text-${service.color} hover:bg-${service.color}/20 transition-colors`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </div>

                  {/* Organic Growth Animation */}
                  {isActive && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 bg-${service.color} rounded-full`}
                          initial={{
                            x: "50%",
                            y: "50%",
                            scale: 0,
                            opacity: 0,
                          }}
                          animate={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            scale: [0, 1, 0],
                            opacity: [0, 0.8, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
