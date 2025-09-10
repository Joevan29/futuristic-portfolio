"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ConsciousnessCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }); // Mulai di luar layar
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(target.closest('button, a, [role="button"], .cursor-pointer') !== null);
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", handleInteraction);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleInteraction);
    };
  }, []);

  return (
    <>
      {/* Lingkaran utama (lebih kecil) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-50 rounded-full bg-white mix-blend-difference"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1, // Membesar saat hover
          opacity: isHovering ? 0.7 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 40,
        }}
      />
      {/* Lingkaran jejak (lebih besar dan lambat) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 rounded-full border-2 border-gray-400 mix-blend-difference"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        animate={{
          scale: isHovering ? 0 : 1, // Menghilang saat hover
          opacity: isHovering ? 0 : 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      />
    </>
  )
}