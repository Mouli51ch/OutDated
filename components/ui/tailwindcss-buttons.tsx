"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface ButtonsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function ButtonsCard({ children, className, ...props }: ButtonsCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-[120px] w-full cursor-pointer items-center justify-center rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
