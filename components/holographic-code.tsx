"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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
  
  // Ref untuk mendeteksi visibilitas komponen
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 }) // Animasi hanya berjalan sekali saat terlihat

  useEffect(() => {
    // Hanya jalankan animasi jika komponen terlihat di layar
    if (!isInView) return

    const snippet = codeSnippets[currentSnippet]
    let index = 0
    let timeoutId: NodeJS.Timeout

    const typeCode = () => {
      if (index < snippet.code.length) {
        setDisplayedCode(snippet.code.slice(0, index + 1))
        index++
        timeoutId = setTimeout(typeCode, 25) // Interval dipercepat untuk mengurangi durasi
      } else {
        // Setelah selesai, ganti ke snippet berikutnya setelah jeda
        timeoutId = setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length)
        }, 3000)
      }
    }

    typeCode()

    // Fungsi cleanup untuk membatalkan timeout jika komponen unmount
    return () => clearTimeout(timeoutId)
  }, [currentSnippet, isInView])

  // Reset teks yang ditampilkan saat snippet berganti
  useEffect(() => {
    if (isInView) {
      setDisplayedCode("")
    }
  }, [currentSnippet, isInView])


  return (
    <div ref={ref} className="relative">
      <motion.div
        className="glass-morphism rounded-2xl p-6 font-mono text-sm relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
        transition={{ duration: 0.8 }}
        style={{
          background: "linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 188, 212, 0.3)",
        }}
      >
        {/* Konten di-render hanya jika komponen terlihat untuk optimasi */}
        {isInView && (
          <>
            {/* Hologram Scanlines - Dihapus karena cukup berat */}
            {/* <motion.div ... /> */}

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
                  {displayedCode}
                  <span className="animate-pulse text-primary">|</span>
                </code>
              </pre>
            </div>

            {/* Holographic Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl -z-10" />
          </>
        )}
      </motion.div>
    </div>
  )
}