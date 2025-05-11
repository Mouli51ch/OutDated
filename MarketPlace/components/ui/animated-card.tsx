"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/40 backdrop-blur-sm bg-background/60",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay,
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 20px rgba(162, 79, 255, 0.3)",
        borderColor: "rgba(162, 79, 255, 0.5)",
      }}
    >
      {children}
    </motion.div>
  )
}
