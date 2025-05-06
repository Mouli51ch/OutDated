"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion"

interface ParallaxContextType {
  scrollYProgress: MotionValue<number>
}

const ParallaxContext = createContext<ParallaxContextType | null>(null)

export const useParallax = () => {
  const context = useContext(ParallaxContext)
  if (!context) {
    throw new Error("useParallax must be used within a ParallaxProvider")
  }
  return context
}

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll()

  return <ParallaxContext.Provider value={{ scrollYProgress }}>{children}</ParallaxContext.Provider>
}

export function ParallaxElement({
  children,
  speed = 0.5,
  direction = "y",
  className = "",
  containerClassName = "",
}: {
  children: ReactNode
  speed?: number
  direction?: "x" | "y"
  className?: string
  containerClassName?: string
}) {
  const { scrollYProgress } = useParallax()

  // Calculate transform based on direction
  const transform = useTransform(scrollYProgress, [0, 1], direction === "y" ? [0, 100 * speed] : [0, 100 * speed])

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <motion.div
        className={className}
        style={{
          [direction === "y" ? "y" : "x"]: transform,
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
