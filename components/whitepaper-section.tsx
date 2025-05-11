"use client"

import { useRef } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { BorderMagicButton } from "@/components/ui/border-magic-button"
import { motion, useScroll, useTransform } from "framer-motion"
import { FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function WhitepaperSection() {
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
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 md:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(10,10,13,1) 100%)",
      }}
    >
      {/* Background elements with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        {/* Circuit pattern background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path
                  d="M0 50 H100 M50 0 V100 M25 25 L75 75 M75 25 L25 75"
                  stroke="#00FFF5"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle cx="50" cy="50" r="3" fill="#9945FF" />
                <circle cx="25" cy="25" r="2" fill="#00FFF5" />
                <circle cx="75" cy="75" r="2" fill="#00FFF5" />
                <circle cx="75" cy="25" r="2" fill="#00FFF5" />
                <circle cx="25" cy="75" r="2" fill="#00FFF5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#00FFF5]/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#9945FF]/5 blur-3xl animate-pulse"></div>
      </motion.div>

      {/* Content container */}
      <motion.div
        ref={ref}
        className={cn(
          "max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12",
          inView ? "opacity-100" : "opacity-0",
        )}
        style={{ y: contentY }}
      >
        {/* Left side - Document illustration */}
        <div className="w-full md:w-2/5 flex justify-center">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FFF5]/20 to-[#9945FF]/20 rounded-xl blur-xl animate-pulse"></div>

            {/* Document */}
            <div className="relative bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Document header */}
              <div className="border-b border-white/10 pb-4 mb-4">
                <h3 className="text-xl font-bold text-white">OutDated Whitepaper</h3>
                <p className="text-sm text-gray-400">Pre-Listing Verification System</p>
              </div>

              {/* Document content preview */}
              <div className="space-y-2">
                <div className="h-2 bg-white/20 rounded-full w-full"></div>
                <div className="h-2 bg-white/20 rounded-full w-5/6"></div>
                <div className="h-2 bg-white/20 rounded-full w-4/6"></div>
                <div className="h-2 bg-white/20 rounded-full w-full"></div>
                <div className="h-2 bg-white/20 rounded-full w-3/6"></div>
              </div>

              {/* Document icon */}
              <div className="absolute -bottom-4 -right-4 bg-[#00FFF5] rounded-full p-3 shadow-lg shadow-[#00FFF5]/20">
                <FileText className="w-6 h-6 text-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Content and CTA */}
        <div className="w-full md:w-3/5 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Discover Our Verification System</h2>
          <p className="text-gray-300 mb-6">
            Our comprehensive whitepaper details OutDated's innovative approach to pre-listing verification, ensuring
            data integrity, privacy compliance, and quality assurance for all datasets before they enter the
            marketplace.
          </p>
          <p className="text-gray-400 mb-8">
            Learn about our multi-stage pipeline that includes automated integrity checks, schema validation, privacy
            sanitization, quality assessment, and ML-powered classification.
          </p>

          <Link href="/whitepaper">
            <BorderMagicButton size="lg" className="group">
              <span className="group-hover:text-[#00FFF5]">Read Our Whitepaper</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:text-[#00FFF5]" />
            </BorderMagicButton>
          </Link>
        </div>
      </motion.div>
    </section>
  )
} 