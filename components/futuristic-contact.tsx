"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Send, Brain, Wifi, Mail, Linkedin, Instagram } from "lucide-react"
import { useState, useEffect } from "react"

export function FuturisticContact() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [quantumField, setQuantumField] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumField((prev) => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsConnecting(true)
    // Simulate quantum entanglement delay
    setTimeout(() => {
      setIsConnecting(false)
      // Reset form
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-transparent to-chart-5/5"
    >
      {/* Quantum Field Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dimensional Rifts */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <radialGradient id="quantumGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--chart-5))" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={i}
              cx={`${20 + i * 20}%`}
              cy={`${30 + i * 15}%`}
              r={`${10 + i * 5}%`}
              fill="url(#quantumGradient)"
              animate={{
                r: [`${10 + i * 5}%`, `${15 + i * 5}%`, `${10 + i * 5}%`],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            />
          ))}
        </svg>

        {/* Consciousness Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-chart-5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.sin(quantumField * 0.01 + i) * 100],
                y: [0, Math.cos(quantumField * 0.01 + i) * 100],
                scale: [0.5, 2, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
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
            <Brain className="w-8 h-8 text-chart-5" />
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-transparent via-chart-5 to-transparent"
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <Wifi className="w-8 h-8 text-chart-5" />
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black text-gradient neon-glow mb-6"
            style={{
              background: "linear-gradient(45deg, hsl(var(--chart-5)), hsl(var(--primary)), hsl(var(--secondary)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px hsl(var(--chart-5))",
            }}
          >
            Quantum Contact
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Initiate consciousness-level communication through quantum entanglement. Your thoughts will be transmitted
            across dimensional barriers.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-background/30 backdrop-blur-sm border border-border rounded-2xl p-8 overflow-hidden">
              {/* Holographic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-chart-5/5 via-transparent to-primary/5 pointer-events-none" />

              {/* Connection Status */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className={`w-3 h-3 rounded-full ${isConnecting ? "bg-chart-5" : "bg-green-500"}`}
                  animate={{
                    scale: isConnecting ? [1, 1.5, 1] : 1,
                    opacity: isConnecting ? [0.5, 1, 0.5] : 1,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isConnecting ? Number.POSITIVE_INFINITY : 0,
                  }}
                />
                <span className="text-sm text-muted-foreground">
                  {isConnecting ? "Establishing quantum link..." : "Quantum channel ready"}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Neural Identity"
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-chart-5 focus:outline-none transition-colors text-foreground placeholder-muted-foreground"
                    whileFocus={{
                      boxShadow: "0 0 20px hsl(var(--chart-5) / 0.3)",
                    }}
                    required
                  />
                  <motion.div
                    className="absolute inset-0 border border-chart-5/30 rounded-lg pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: formData.name ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Quantum Frequency"
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-chart-5 focus:outline-none transition-colors text-foreground placeholder-muted-foreground"
                    whileFocus={{
                      boxShadow: "0 0 20px hsl(var(--chart-5) / 0.3)",
                    }}
                    required
                  />
                  <motion.div
                    className="absolute inset-0 border border-chart-5/30 rounded-lg pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: formData.email ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Message Field */}
                <div className="relative">
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Consciousness Stream"
                    rows={6}
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-chart-5 focus:outline-none transition-colors text-foreground placeholder-muted-foreground resize-none"
                    whileFocus={{
                      boxShadow: "0 0 20px hsl(var(--chart-5) / 0.3)",
                    }}
                    required
                  />
                  <motion.div
                    className="absolute inset-0 border border-chart-5/30 rounded-lg pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: formData.message ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isConnecting}
                  className="w-full px-8 py-4 bg-chart-5/10 border border-chart-5/20 rounded-lg text-chart-5 font-medium hover:bg-chart-5/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isConnecting ? 1 : 1.02 }}
                  whileTap={{ scale: isConnecting ? 1 : 0.98 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    {isConnecting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-chart-5/30 border-t-chart-5 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Initiate Quantum Link</span>
                      </>
                    )}
                  </div>
                </motion.button>
              </form>

              {/* Telepathic Particles */}
              {isConnecting && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-chart-5 rounded-full"
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
                        opacity: [0, 1, 0],
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

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Direct Channels */}
            <div className="bg-background/30 backdrop-blur-sm border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-chart-5 mb-6">Direct Channels</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "joevanpan@outlook.com",
                    color: "chart-5",
                    href: "mailto:joevanpan@outlook.com",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    value: "linkedin.com/in/jvnprmnachmd",
                    color: "primary",
                    href: "https://www.linkedin.com/in/jvnprmnachmd/",
                  },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    value: "@jvnprmnachmd",
                    color: "secondary",
                    href: "https://www.instagram.com/jvnprmnachmd/",
                  },
                ].map((contact, index) => {
                  const Icon = contact.icon
                  return (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: `0 0 20px hsl(var(--${contact.color}) / 0.2)`,
                      }}
                    >
                      <div className={`p-3 bg-${contact.color}/10 border border-${contact.color}/20 rounded-lg`}>
                        <Icon className={`w-5 h-5 text-${contact.color}`} />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{contact.label}</div>
                        <div className={`font-medium text-${contact.color}`}>{contact.value}</div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Consciousness Status */}
            <div className="bg-background/30 backdrop-blur-sm border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-chart-5 mb-6">Consciousness Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Neural Activity</span>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <span className="text-green-500 font-medium">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="text-chart-5 font-medium">&lt; 24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="text-primary font-medium">24/7 Quantum</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
