"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  trail: { x: number; y: number }[]
}

export function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    const colors = ["#00ffff", "#ff00ff", "#39ff14", "#ffd700", "#9d4edd"]
    const initialParticles: Particle[] = []

    for (let i = 0; i < 50; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.8 + 0.2,
        trail: [],
      })
    }

    setParticles(initialParticles)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Magnetic attraction to cursor
          const dx = mousePos.x - particle.x
          const dy = mousePos.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const magneticForce = Math.min(100 / (distance + 1), 2)

          // Update velocity with magnetic attraction
          particle.vx += (dx / distance) * magneticForce * 0.01
          particle.vy += (dy / distance) * magneticForce * 0.01

          // Apply friction
          particle.vx *= 0.99
          particle.vy *= 0.99

          // Update position
          particle.x += particle.vx
          particle.y += particle.vy

          // Boundary collision with bounce
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.vx *= -0.8
            particle.x = Math.max(0, Math.min(canvas.width, particle.x))
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.vy *= -0.8
            particle.y = Math.max(0, Math.min(canvas.height, particle.y))
          }

          // Update trail
          particle.trail.push({ x: particle.x, y: particle.y })
          if (particle.trail.length > 10) {
            particle.trail.shift()
          }

          // Draw particle trail
          ctx.strokeStyle = particle.color
          ctx.lineWidth = 1
          ctx.globalAlpha = particle.opacity * 0.3
          ctx.beginPath()
          particle.trail.forEach((point, index) => {
            if (index === 0) {
              ctx.moveTo(point.x, point.y)
            } else {
              ctx.lineTo(point.x, point.y)
            }
          })
          ctx.stroke()

          // Draw particle with glow effect
          ctx.globalAlpha = particle.opacity
          ctx.fillStyle = particle.color
          ctx.shadowColor = particle.color
          ctx.shadowBlur = 15
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

          return particle
        }),
      )

      // Draw connections between nearby particles
      ctx.globalAlpha = 0.2
      ctx.strokeStyle = "#00bcd4"
      ctx.lineWidth = 0.5

      for (let i = 0; i < initialParticles.length; i++) {
        for (let j = i + 1; j < initialParticles.length; j++) {
          const dx = initialParticles[i].x - initialParticles[j].x
          const dy = initialParticles[i].y - initialParticles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(initialParticles[i].x, initialParticles[i].y)
            ctx.lineTo(initialParticles[j].x, initialParticles[j].y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}
