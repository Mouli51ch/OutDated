"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function TechGrid() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>

        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-[200px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: `${Math.random() * 360}deg`,
              opacity: 0.3,
            }}
            animate={{
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}

        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i + 6}
            className="absolute h-[2px] w-[200px] bg-gradient-to-r from-transparent via-purple-600 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: `${Math.random() * 360}deg`,
              opacity: 0.3,
            }}
            animate={{
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
