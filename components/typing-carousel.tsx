"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const phrases = ["STUNNING", "INTERACTIVE", "FUTURISTIC", "IMMERSIVE", "SPECTACULAR"]

export function TypingCarousel() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const phrase = phrases[currentPhrase]
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < phrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(phrase.slice(0, displayText.length + 1))
        }, 100)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
      } else {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isTyping, currentPhrase])

  return (
    <div className="relative">
      <motion.span
        className="text-gradient neon-glow font-black"
        key={displayText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {displayText.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="inline-block hover:scale-110 transition-transform cursor-default"
            style={{
              textShadow: `0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor`,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
      <motion.span
        className="text-primary ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      >
        |
      </motion.span>
    </div>
  )
}
