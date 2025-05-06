"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import FeatureCards from "./feature-cards"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Features() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax transformations
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const gridLinesOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.15, 0.05])

  // Fixed number of particle transforms defined at the top level
  const particle1Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const particle2Y = useTransform(scrollYProgress, [0, 1], [0, -120])
  const particle3Y = useTransform(scrollYProgress, [0, 1], [0, -160])
  const particle4Y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const particle5Y = useTransform(scrollYProgress, [0, 1], [0, -180])

  const gridLayerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const particleLayerY = useTransform(scrollYProgress, [0, 1], [0, -150])

  const gradientLineY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const gradientLineY2 = useTransform(scrollYProgress, [0, 1], [0, 30])
  const glowingOrbY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const glowingOrbX = useTransform(scrollYProgress, [0, 1], [0, 50])
  const glowingOrbY2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const glowingOrbX2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const glowingOrbY3 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const techCircuitX = useTransform(scrollYProgress, [0, 1], [0, 100])
  const techCircuitX2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const techCircuitX3 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const techCircuitX4 = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 md:px-8 max-w-7xl mx-auto bg-black overflow-hidden"
      id="features"
    >
      {/* Enhanced multi-layer parallax background elements */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: backgroundY }}>
        {/* Base grid layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(0, 255, 245, 0.15) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(153, 69, 255, 0.15) 2px, transparent 0)",
            backgroundSize: "100px 100px",
            backgroundPosition: "0 0",
            opacity: gridLinesOpacity,
            y: gridLayerY, // Use the pre-defined transform
          }}
        />

        {/* Floating particles layer - faster parallax */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: particleLayerY,
          }}
        >
          {/* Fixed number of particles with pre-defined transforms */}
          <motion.div
            className="absolute rounded-full bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20"
            style={{
              width: "8px",
              height: "8px",
              left: "20%",
              top: "30%",
              opacity: 0.6,
              y: particle1Y,
              filter: "blur(1px)",
            }}
          />
          <motion.div
            className="absolute rounded-full bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20"
            style={{
              width: "12px",
              height: "12px",
              left: "65%",
              top: "15%",
              opacity: 0.4,
              y: particle2Y,
              filter: "blur(1px)",
            }}
          />
          <motion.div
            className="absolute rounded-full bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20"
            style={{
              width: "6px",
              height: "6px",
              left: "80%",
              top: "60%",
              opacity: 0.7,
              y: particle3Y,
              filter: "blur(1px)",
            }}
          />
          <motion.div
            className="absolute rounded-full bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20"
            style={{
              width: "10px",
              height: "10px",
              left: "35%",
              top: "75%",
              opacity: 0.5,
              y: particle4Y,
              filter: "blur(1px)",
            }}
          />
          <motion.div
            className="absolute rounded-full bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20"
            style={{
              width: "14px",
              height: "14px",
              left: "10%",
              top: "45%",
              opacity: 0.3,
              y: particle5Y,
              filter: "blur(1px)",
            }}
          />
        </motion.div>

        {/* Middle layer with gradient lines - medium parallax */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          }}
        >
          {/* Animated gradient lines */}
          <motion.div
            className="absolute left-0 right-0 h-px top-20 bg-gradient-to-r from-transparent via-[#00FFF5] to-transparent opacity-50"
            style={{
              y: gradientLineY,
            }}
          />
          <motion.div
            className="absolute left-0 right-0 h-px bottom-20 bg-gradient-to-r from-transparent via-[#9945FF] to-transparent opacity-50"
            style={{
              y: gradientLineY2,
            }}
          />
        </motion.div>

        {/* Foreground glowing orbs - fastest parallax */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -200]),
          }}
        >
          {/* Glowing orbs with different parallax speeds */}
          <motion.div
            className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-[#00FFF5]/5 blur-3xl animate-pulse"
            style={{
              y: glowingOrbY,
              x: glowingOrbX,
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-[#9945FF]/5 blur-3xl animate-pulse"
            style={{
              y: glowingOrbY2,
              x: glowingOrbX2,
              animationDelay: "1s",
            }}
          />
          <motion.div
            className="absolute top-2/3 left-1/3 w-24 h-24 rounded-full bg-[#00FFF5]/5 blur-3xl animate-pulse"
            style={{
              y: glowingOrbY3,
              animationDelay: "0.5s",
            }}
          />
        </motion.div>

        {/* Tech circuit lines with horizontal parallax */}
        <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent to-[#00FFF5]/30">
          <motion.div className="absolute inset-0" style={{ x: techCircuitX }} />
        </div>
        <div className="absolute top-0 right-0 w-1/4 h-px bg-gradient-to-l from-transparent to-[#9945FF]/30">
          <motion.div className="absolute inset-0" style={{ x: techCircuitX2 }} />
        </div>
        <div className="absolute bottom-0 left-1/4 w-1/5 h-px bg-gradient-to-r from-transparent to-[#00FFF5]/30">
          <motion.div className="absolute inset-0" style={{ x: techCircuitX3 }} />
        </div>
        <div className="absolute bottom-0 right-1/3 w-1/4 h-px bg-gradient-to-l from-transparent to-[#9945FF]/30">
          <motion.div className="absolute inset-0" style={{ x: techCircuitX4 }} />
        </div>
      </motion.div>

      {/* Content container with increased z-index */}
      <motion.div className="relative z-10" style={{ y: contentY }}>
        <div
          ref={ref}
          className={cn(
            "text-center mb-16 transition-all duration-500",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 font-poppins text-white">
            PRIVACY-FIRST MACHINE LEARNING
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-poppins">
            Train machine learning models on sensitive data without ever exposing the raw information.
          </p>
        </div>

        <FeatureCards />
      </motion.div>
    </section>
  )
}
