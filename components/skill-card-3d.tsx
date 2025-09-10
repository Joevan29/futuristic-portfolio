"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Palette, Zap, Globe, Database, Smartphone } from "lucide-react"

const skills = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "React, Next.js, TypeScript",
    code: `const App = () => {
  const [magic, setMagic] = useState(true);
  
  return (
    <div className="future">
      {magic && <Reality />}
    </div>
  );
};`,
    color: "from-primary to-accent",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Figma, Adobe Creative Suite",
    code: `@keyframes materialize {
  from { 
    opacity: 0;
    transform: translateY(50px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}`,
    color: "from-secondary to-chart-4",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Web Vitals, Core Performance",
    code: `const optimize = async (app) => {
  const metrics = await measure(app);
  return metrics.map(m => 
    m.score > 90 ? m : enhance(m)
  );
};`,
    color: "from-accent to-chart-5",
  },
  {
    icon: Globe,
    title: "Full-Stack Development",
    description: "Node.js, Python, Databases",
    code: `app.post('/api/magic', async (req, res) => {
  const result = await quantum.process(
    req.body.reality
  );
  res.json({ transformed: result });
});`,
    color: "from-chart-4 to-primary",
  },
  {
    icon: Database,
    title: "Database Architecture",
    description: "PostgreSQL, MongoDB, Redis",
    code: `SELECT * FROM possibilities p
JOIN realities r ON p.id = r.dream_id
WHERE p.achievable = true
ORDER BY p.impact DESC;`,
    color: "from-chart-5 to-secondary",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "React Native, Flutter",
    code: `const MobileApp = () => (
  <GestureHandler>
    <Animated.View style={styles.magic}>
      <TouchableReality />
    </Animated.View>
  </GestureHandler>
);`,
    color: "from-primary to-chart-4",
  },
]

interface SkillCardProps {
  skill: (typeof skills)[0]
  index: number
}

export function SkillCard3D({ skill, index }: SkillCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const Icon = skill.icon

  return (
    <motion.div
      className="relative w-full h-80 flip-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={`flip-card-inner cursor-pointer ${isFlipped ? "rotateY-180" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Front Face */}
        <motion.div
          className="flip-card-front glass-morphism border border-white/20 p-6"
          animate={{
            y: isHovered ? -10 : 0,
            boxShadow: isHovered ? "0 20px 40px rgba(34, 211, 238, 0.2)" : "0 10px 20px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center text-center space-y-4 h-full">
            <motion.div
              className={`p-4 rounded-2xl bg-gradient-to-br ${skill.color} relative`}
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 2 }}
            >
              <Icon size={32} className="text-white" />

              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: `radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)`,
                  }}
                />
              )}
            </motion.div>

            <h3 className="text-xl font-bold text-foreground">{skill.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>

            <motion.div
              className="mt-auto text-xs text-primary font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Click to view code
            </motion.div>
          </div>

          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
            style={{
              background: isHovered
                ? `linear-gradient(45deg, rgba(34, 211, 238, 0.2) 0%, transparent 50%, rgba(34, 211, 238, 0.2) 100%)`
                : `linear-gradient(45deg, transparent 30%, rgba(34, 211, 238, 0.1) 50%, transparent 70%)`,
              transition: "background 0.5s ease",
            }}
          />
        </motion.div>

        {/* Back Face - Code View */}
        <div
          className="flip-card-back glass-morphism border border-primary/30 p-6"
          style={{
            background: "linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(34, 211, 238, 0.1))",
          }}
        >
          <div className="font-mono text-sm h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-primary ml-2 text-xs">code.example</span>
            </div>

            <pre className="text-foreground leading-relaxed flex-1 overflow-hidden">
              <code className="syntax-highlight text-xs">{skill.code}</code>
            </pre>

            <motion.div
              className="text-center text-xs text-muted-foreground mt-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Click to flip back
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function SkillCard3DGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skills.map((skill, index) => (
        <SkillCard3D key={skill.title} skill={skill} index={index} />
      ))}
    </div>
  )
}
