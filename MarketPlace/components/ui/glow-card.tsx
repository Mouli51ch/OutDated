"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  delay?: number
}

export function GlowCard({ children, className, glowColor = "rgba(64, 153, 180, 0.1)", delay = 0 }: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative group"
    >
      <motion.div
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, rgba(108, 73, 172, 0.1))`,
          filter: "blur(8px)",
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.01, 1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <Card className={cn("relative z-10 backdrop-blur-sm bg-black/70 border-gray-800/30 overflow-hidden", className)}>
        {children}
      </Card>
    </motion.div>
  )
}

export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
