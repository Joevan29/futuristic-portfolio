"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const codeSnippets = [
  {
    language: "typescript",
    code: `const createMagic = async () => {
  const particles = generateParticles(300);
  const reality = await bendSpace();
  return particles.map(p => 
    p.transform(reality)
  );
};`,
  },
  {
    language: "css",
    code: `.neon-glow {
  filter: drop-shadow(0 0 5px cyan)
         drop-shadow(0 0 10px cyan)
         drop-shadow(0 0 15px cyan);
  animation: pulse 2s infinite;
}`,
  },
  {
    language: "javascript",
    code: `function quantumCompute(data) {
  return data
    .filter(item => item.exists)
    .map(item => item.superposition())
    .reduce((acc, val) => 
      acc.entangle(val), []);
}`,
  },
]

export function HolographicCode() {
  const [currentSnippet, setCurrentSnippet] = useState(0)
  const [displayedCode, setDisplayedCode] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const snippet = codeSnippets[currentSnippet]
    let index = 0

    const typeCode = () => {
      if (index < snippet.code.length) {
        setDisplayedCode(snippet.code.slice(0, index + 1))
        index++
        setTimeout(typeCode, 50 + Math.random() * 50)
      } else {
        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length)
          setDisplayedCode("")
          index = 0
        }, 3000)
      }
    }

    const timeout = setTimeout(typeCode, 1000)
    return () => clearTimeout(timeout)
  }, [currentSnippet])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <motion.div
        className="glass-morphism rounded-2xl p-6 font-mono text-sm relative overflow-hidden"
        initial={{ opacity: 0, rotateX: 45 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 1 }}
        style={{
          background: "linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 188, 212, 0.3)",
        }}
      >
        {/* Hologram Scanlines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 255, 0.1) 2px,
              rgba(0, 255, 255, 0.1) 4px
            )`,
          }}
          animate={{ y: [-100, 100] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Code Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-primary ml-2 text-xs">{codeSnippets[currentSnippet].language}</span>
          </div>

          <pre className="text-foreground leading-relaxed">
            <code>
              {displayedCode.split("\n").map((line, lineIndex) => (
                <div key={lineIndex} className="flex">
                  <span className="text-muted-foreground mr-4 select-none">
                    {String(lineIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="syntax-highlight">{line}</span>
                </div>
              ))}
              <span className={`text-primary ${cursorVisible ? "opacity-100" : "opacity-0"}`}>|</span>
            </code>
          </pre>
        </div>

        {/* Holographic Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl -z-10" />
      </motion.div>
    </div>
  )
}
