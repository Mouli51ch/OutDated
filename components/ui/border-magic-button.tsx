"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface BorderMagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  size?: "sm" | "md" | "lg"
}

export function BorderMagicButton({
  children,
  className,
  innerClassName,
  size = "md",
  ...props
}: BorderMagicButtonProps) {
  const sizeClasses = {
    sm: "h-9 text-xs",
    md: "h-12 text-sm",
    lg: "h-14 text-base",
  }

  return (
    <button
      className={cn(
        "relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]/50 focus:ring-offset-2 focus:ring-offset-black",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00FFF5_0%,#9945FF_50%,#00FFF5_100%)]" />
      <span
        className={cn(
          "inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 py-1 font-medium text-white backdrop-blur-3xl",
          innerClassName,
        )}
      >
        {children}
      </span>
    </button>
  )
}
