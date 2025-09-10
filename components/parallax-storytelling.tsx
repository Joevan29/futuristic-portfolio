"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ParallaxLayer } from "./parallax-layer"
import { FuturisticBuilding } from "./futuristic-building"
import { FlyingVehicle } from "./flying-vehicle"
import { WeatherEffects } from "./weather-effects"
import { TimelineMilestone } from "./timeline-milestone"

const timelineMilestones = [
  {
    year: "2020",
    title: "The Beginning",
    description:
      "Started my journey into web development, learning the fundamentals of HTML, CSS, and JavaScript. Built my first interactive websites and discovered my passion for creating digital experiences.",
    icon: "calendar" as const,
    color: "#00bcd4",
  },
  {
    year: "2021",
    title: "Framework Mastery",
    description:
      "Dove deep into React and modern JavaScript frameworks. Created complex single-page applications and learned the art of component-based architecture and state management.",
    icon: "code" as const,
    color: "#ff00ff",
  },
  {
    year: "2022",
    title: "Full-Stack Evolution",
    description:
      "Expanded into backend development with Node.js and databases. Built complete web applications from concept to deployment, mastering the entire development lifecycle.",
    icon: "rocket" as const,
    color: "#39ff14",
  },
  {
    year: "2023",
    title: "Design & Performance",
    description:
      "Focused on UI/UX design principles and performance optimization. Created visually stunning interfaces while maintaining lightning-fast load times and smooth interactions.",
    icon: "zap" as const,
    color: "#ffd700",
  },
  {
    year: "2024",
    title: "Innovation & AI",
    description:
      "Integrated cutting-edge technologies like AI and advanced animations. Pushed the boundaries of what's possible in web development, creating truly immersive digital experiences.",
    icon: "star" as const,
    color: "#9d4edd",
  },
]

export function ParallaxStorytelling() {
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollProgress = scrollY / (document.documentElement.scrollHeight - window.innerHeight)
  const activeIndex = Math.floor(scrollProgress * timelineMilestones.length * 2)

  // Day/Night cycle based on scroll
  const skyColor = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["#000428", "#004e92", "#2d1b69", "#000428"])

  return (
    <section id="experience" className="relative min-h-[220vh] overflow-hidden">
      {/* Dynamic Sky Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          background: skyColor,
        }}
      />

      {/* Weather Effects */}
      <div className="fixed inset-0 z-10">
        <WeatherEffects scrollProgress={scrollProgress} />
      </div>

      {/* Parallax Layers */}
      <div className="relative z-20">
        {/* Background Mountains */}
        <ParallaxLayer speed={0.1} className="inset-0">
          <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
        </ParallaxLayer>

        {/* Far Buildings */}
        <ParallaxLayer speed={0.3} className="inset-0">
          <FuturisticBuilding height={200} width={60} x={100} y={400} color="#00bcd4" />
          <FuturisticBuilding height={150} width={40} x={200} y={450} color="#ff00ff" hasNeonSign signText="FUTURE" />
          <FuturisticBuilding height={180} width={50} x={300} y={420} color="#39ff14" />
        </ParallaxLayer>

        {/* Mid Buildings */}
        <ParallaxLayer speed={0.5} className="inset-0">
          <FuturisticBuilding height={250} width={80} x={150} y={350} color="#ffd700" hasNeonSign signText="TECH" />
          <FuturisticBuilding height={220} width={70} x={280} y={380} color="#9d4edd" />
          <FuturisticBuilding height={200} width={60} x={400} y={400} color="#00bcd4" />
        </ParallaxLayer>

        {/* Close Buildings */}
        <ParallaxLayer speed={0.8} className="inset-0">
          <FuturisticBuilding height={300} width={100} x={50} y={300} color="#ff00ff" hasNeonSign signText="CODE" />
          <FuturisticBuilding height={280} width={90} x={350} y={320} color="#39ff14" hasNeonSign signText="WEB" />
        </ParallaxLayer>

        {/* Flying Vehicles */}
        <ParallaxLayer speed={0.6} direction="spiral" rotateSpeed={0.1} className="inset-0">
          <FlyingVehicle
            startX={-50}
            startY={200}
            endX={window.innerWidth + 50}
            endY={180}
            duration={8}
            delay={0}
            color="#00bcd4"
          />
          <FlyingVehicle
            startX={window.innerWidth + 50}
            startY={250}
            endX={-50}
            endY={230}
            duration={10}
            delay={3}
            color="#ff00ff"
          />
          <FlyingVehicle
            startX={-50}
            startY={300}
            endX={window.innerWidth + 50}
            endY={280}
            duration={12}
            delay={6}
            color="#39ff14"
          />
        </ParallaxLayer>

        {/* Timeline Content */}
        <div className="relative z-30 container mx-auto px-4 pt-20">
          <motion.div
            className="text-center mb-20"
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
              MY JOURNEY
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              viewport={{ once: true }}
            >
              A timeline of innovation, growth, and pushing the boundaries of what's possible in web development.
              <br />
              <span className="text-primary">Scroll to experience the evolution</span> through time and space.
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {timelineMilestones.map((milestone, index) => (
              <TimelineMilestone
                key={milestone.year}
                {...milestone}
                isActive={activeIndex === index}
                scrollProgress={scrollProgress}
              />
            ))}
          </div>
        </div>

        {/* Magnetic Scroll Snapping Points */}
        {timelineMilestones.map((_, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 opacity-30"
            style={{ top: `${20 + index * 40}vh` }}
            animate={{
              scale: activeIndex === index ? 2 : 1,
              opacity: activeIndex === index ? 1 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Temporal Distortion Effects */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-40"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(0, 188, 212, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(57, 255, 20, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </section>
  )
}
