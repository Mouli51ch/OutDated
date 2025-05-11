"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"

interface GlowButtonProps extends ButtonProps {
  glowColor?: string
  gradientFrom?: string
  gradientTo?: string
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  (
    {
      className,
      glowColor = "rgba(64, 153, 180, 0.3)",
      gradientFrom = "#4099B4",
      gradientTo = "#6C49AC",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {/* More subtle outer glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(8px)",
            zIndex: 0,
          }}
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Refined gradient border */}
        <div className="absolute -inset-[1px] rounded-lg overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            }}
          />
        </div>

        {/* Button with transparent background */}
        <Button
          ref={ref}
          className={cn("relative z-10 bg-black/90 backdrop-blur-sm hover:bg-black/70 text-white border-0", className)}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    )
  },
)

GlowButton.displayName = "GlowButton"
