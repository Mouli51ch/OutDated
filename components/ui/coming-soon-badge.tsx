"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ComingSoonBadgeProps {
  className?: string
}

export default function ComingSoonBadge({ className }: ComingSoonBadgeProps) {
  return (
    <motion.div
      className={cn("relative inline-flex items-center", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative group">
        {/* Simple outer glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20 rounded-full blur-sm opacity-50 group-hover:opacity-80 transition-all duration-300"></div>

        {/* Main button with clean design */}
        <div className="relative px-6 py-2 rounded-full bg-black/80 backdrop-blur-md border border-[#00FFF5]/20 text-white text-sm font-medium flex items-center gap-3">
          {/* Status indicator */}
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#00FF47] opacity-30 animate-pulse"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF47]"></span>
          </div>

          {/* Text */}
          <span className="font-mono tracking-wide">Under development, coming soon</span>

          {/* Simple corner accents */}
          <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-[#00FFF5]/40"></div>
          <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-[#00FFF5]/40"></div>
          <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#00FFF5]/40"></div>
          <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#00FFF5]/40"></div>
        </div>
      </div>
    </motion.div>
  )
} 