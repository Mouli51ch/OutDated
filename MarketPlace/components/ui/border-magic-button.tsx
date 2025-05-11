"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"

interface BorderMagicButtonProps extends ButtonProps {
  borderWidth?: number
  glowIntensity?: number
  animationSpeed?: number
}

export const BorderMagicButton = forwardRef<HTMLButtonElement, BorderMagicButtonProps>(
  ({ className, borderWidth = 1, glowIntensity = 0.4, animationSpeed = 3, children, ...props }, ref) => {
    return (
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {/* More subtle glow effect behind the button */}
        <motion.div
          className="absolute -inset-0.5 rounded-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, #4099B4, #6C49AC)`,
            filter: `blur(${borderWidth * 2}px)`,
            zIndex: 0,
            opacity: 0.2,
          }}
          animate={{
            opacity: [0.2, glowIntensity, 0.2],
          }}
          transition={{
            duration: animationSpeed,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Refined gradient border */}
        <motion.div
          className="absolute -inset-[1px] rounded-lg z-0 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #4099B4, #6C49AC)`,
          }}
        />

        {/* Button background */}
        <Button
          ref={ref}
          className={cn("relative z-10 bg-black/90 border-0 text-white hover:bg-black/80", className)}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    )
  },
)

BorderMagicButton.displayName = "BorderMagicButton"
