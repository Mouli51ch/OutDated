"use client"

import { SparklesCore } from "@/components/ui/sparkles"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect } from "react"
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect"

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Add this style tag for the custom animation
  useEffect(() => {
    // Create style element
    const styleEl = document.createElement("style")
    styleEl.textContent = `
      @keyframes pulseSlide {
        0% { transform: translateX(-100%); opacity: 0; }
        50% { opacity: 0.5; }
        100% { transform: translateX(100%); opacity: 0; }
      }
      .animate-pulse-slide {
        animation: pulseSlide 3s ease-in-out infinite;
      }
    `
    // Append to head
    document.head.appendChild(styleEl)

    // Cleanup
    return () => {
      document.head.removeChild(styleEl)
    }
  }, [])

  // Parallax transformations
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const buttonY = useTransform(scrollYProgress, [0, 0.5], [0, -10])

  // Path length animations for Google Gemini Effect - adjusted to start after scrolling
  const pathLengthFirst = useTransform(scrollYProgress, [0.1, 0.4], [0, 1.2])
  const pathLengthSecond = useTransform(scrollYProgress, [0.1, 0.4], [0, 1.2])
  const pathLengthThird = useTransform(scrollYProgress, [0.1, 0.4], [0, 1.2])
  const pathLengthFourth = useTransform(scrollYProgress, [0.1, 0.4], [0, 1.2])
  const pathLengthFifth = useTransform(scrollYProgress, [0.1, 0.4], [0, 1.2])

  return (
    <section
      ref={ref}
      className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative"
    >
      {/* Background parallax elements */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y,
          scale,
          opacity,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#00FFF5]/2 to-black/0" />
        <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-[#00FFF5]/3 blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#9945FF]/3 blur-xl" />
      </motion.div>

      {/* Google Gemini Effect for the title */}
      <div className="relative z-30 w-full">
        <GoogleGeminiEffect
          pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]}
          title="OutDated"
          description=""
          className="top-0 relative"
          tagline="Privacy-First Machine Learning"
          taglineUrl="#features"
        />
      </div>

      {/* Sparkles effect */}
      <div className="w-full h-40 relative z-10">
        {/* Enhanced gradient line with glow effect */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 w-3/4 flex flex-col items-center">
          {/* Main gradient line with increased opacity and thickness */}
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00FFF5]/80 to-transparent rounded-full" />

          {/* Subtle glow effect beneath */}
          <div className="w-4/5 h-[1px] mt-[1px] bg-gradient-to-r from-transparent via-[#00FFF5]/40 to-transparent blur-[1px] rounded-full" />

          {/* Extra subtle wider glow */}
          <div className="w-2/3 h-[1px] mt-[1px] bg-gradient-to-r from-transparent via-[#00FFF5]/20 to-transparent blur-[2px] rounded-full" />

          {/* Animated pulse effect */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-1/2 h-[3px] bg-gradient-to-r from-transparent via-[#00FFF5] to-transparent rounded-full opacity-0 animate-pulse-slide" />
          </div>
        </div>

        {/* Core sparkles component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial gradient mask */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </section>
  )
}
