"use client"

import WhitepaperContent from "@/components/whitepaper-content"
import { ParallaxProvider } from "@/components/parallax-provider"
import FloatingNavOutdated from "@/components/floating-navbar-outdated"

export default function WhitepaperPage() {
  return (
    <ParallaxProvider>
      <main className="min-h-screen bg-black text-white overflow-hidden">
        <FloatingNavOutdated />
        <WhitepaperContent />
      </main>
    </ParallaxProvider>
  )
} 