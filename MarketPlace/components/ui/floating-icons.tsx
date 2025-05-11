"use client"

import { motion } from "framer-motion"
import { Database, Lock, Cpu, Code, Shield, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export function FloatingIcons() {
  const [icons, setIcons] = useState<JSX.Element[]>([])

  useEffect(() => {
    // Only run on client
    const iconComponents = [
      <Database key="database" size={20} className="text-cyan-400" />,
      <Lock key="lock" size={20} className="text-purple-400" />,
      <Cpu key="cpu" size={20} className="text-cyan-400" />,
      <Code key="code" size={20} className="text-purple-400" />,
      <Shield key="shield" size={20} className="text-cyan-400" />,
      <Zap key="zap" size={20} className="text-purple-400" />,
    ]

    setIcons(iconComponents)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
          }}
          animate={{
            x: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 2,
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  )
}
