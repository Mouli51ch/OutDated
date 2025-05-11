"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedGradientText({ children, className, delay = 0 }: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={cn(
        "bg-gradient-to-r from-[#4099B4] via-[#6C49AC] to-[#4099B4] bg-clip-text text-transparent bg-[length:200%_auto]",
        className,
      )}
      initial={{ backgroundPosition: "0% center" }}
      animate={{
        backgroundPosition: ["0% center", "200% center", "0% center"],
      }}
      transition={{
        duration: 12, // Slower animation for more subtlety
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        delay,
      }}
    >
      {children}
    </motion.span>
  )
}
