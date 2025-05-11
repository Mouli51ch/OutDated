"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"

interface FuturisticButtonProps extends ButtonProps {
  cornerSize?: number
  glowIntensity?: number
}

export const FuturisticButton = forwardRef<HTMLButtonElement, FuturisticButtonProps>(
  ({ className, cornerSize = 6, glowIntensity = 0.5, children, ...props }, ref) => {
    return (
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {/* Refined animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #4099B4, #6C49AC, #4099B4)`,
            backgroundSize: "200% 200%",
            zIndex: 0,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />

        {/* Refined corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-[1px] border-l-[1px] border-[#4099B4]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-[1px] border-r-[1px] border-[#4099B4]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[1px] border-l-[1px] border-[#6C49AC]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[1px] border-r-[1px] border-[#6C49AC]" />

        {/* Inner button with transparent background */}
        <Button
          ref={ref}
          className={cn("relative z-10 bg-black/90 border-0 text-white hover:bg-black/80 m-[1px]", className)}
          {...props}
        >
          <div className="relative z-10">{children}</div>

          {/* More subtle inner glow */}
          <motion.div
            className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20"
            style={{
              background: "linear-gradient(135deg, rgba(64, 153, 180, 0.1), rgba(108, 73, 172, 0.1))",
              filter: "blur(4px)",
            }}
            animate={{
              opacity: [0, glowIntensity, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </Button>
      </motion.div>
    )
  },
)

FuturisticButton.displayName = "FuturisticButton"
