"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Shield, Mail, Globe, Tag, Database, CheckCircle } from "lucide-react"
import { BorderMagicButton } from "@/components/ui/border-magic-button"

export default function TrustVerification() {
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

  // Verification flow steps
  const verificationSteps = [
    {
      icon: Shield,
      title: "On-Chain DID",
      color: "#00FFF5",
    },
    {
      icon: Mail,
      title: "Email Verification",
      color: "#9945FF",
    },
    {
      icon: Globe,
      title: "Domain Proof",
      color: "#00FFF5",
    },
    {
      icon: Tag,
      title: "Metadata Tagging",
      color: "#9945FF",
    },
    {
      icon: CheckCircle,
      title: "Verified Dataset",
      color: "#00FF47",
    },
  ]

  // Track which step is currently active
  const [activeStep, setActiveStep] = useState(-1)

  // Animation sequence for steps
  useEffect(() => {
    if (!inView) return

    // Reset to start when coming into view
    setActiveStep(-1)

    // Sequence through steps
    const sequence = verificationSteps.map((_, index) => {
      return setTimeout(
        () => {
          setActiveStep(index)
        },
        1500 * (index + 1),
      ) // 1.5 second delay between steps
    })

    // Cleanup timeouts
    return () => {
      sequence.forEach((timeout) => clearTimeout(timeout))
    }
  }, [inView])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto bg-black overflow-hidden"
      id="trust-verification"
    >
      {/* Network graph background */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: backgroundY }}>
        {/* Network nodes and connections */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Generate random nodes and connections */}
            {Array.from({ length: 20 }).map((_, i) => {
              const x1 = Math.random() * 1000
              const y1 = Math.random() * 1000

              return (
                <g key={i}>
                  <circle cx={x1} cy={y1} r="4" fill={i % 2 === 0 ? "#00FFF5" : "#9945FF"} filter="url(#glow)" />

                  {Array.from({ length: 3 }).map((_, j) => {
                    const x2 = Math.random() * 1000
                    const y2 = Math.random() * 1000

                    return (
                      <line
                        key={`${i}-${j}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={j % 2 === 0 ? "#00FFF5" : "#9945FF"}
                        strokeWidth="1"
                        strokeOpacity="0.3"
                      />
                    )
                  })}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </motion.div>

      {/* Content container */}
      <motion.div className="relative z-10" style={{ y: contentY }}>
        <div
          ref={ref}
          className={cn(
            "text-center mb-12 transition-all duration-500",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 font-poppins text-white">Trust & Verification</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-poppins">
            Ensuring authenticated, audited data sources through our multi-step verification process
          </p>
        </div>

        {/* Verification Flow Diagram */}
        <div className="relative mb-16">
          {/* Flow diagram container */}
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 py-8">
            {/* Flow steps */}
            {verificationSteps.map((step, index) => {
              const isActive = activeStep >= index
              return (
                <motion.div
                  key={index}
                  className="relative z-10 flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Step icon with interactive glow */}
                  <div
                    className={cn(
                      "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-500",
                      isActive ? "shadow-[0_0_15px_rgba(0,255,245,0.5)]" : "",
                    )}
                    style={{
                      borderColor: isActive ? step.color : `${step.color}40`,
                      backgroundColor: isActive ? `${step.color}20` : `${step.color}10`,
                    }}
                  >
                    <step.icon
                      className={cn(
                        "w-8 h-8 md:w-10 md:h-10 transition-all duration-500",
                        isActive ? "animate-pulse" : "",
                      )}
                      style={{
                        color: isActive ? step.color : `${step.color}80`,
                      }}
                    />
                  </div>

                  {/* Step title */}
                  <div className="mt-3 text-center">
                    <h3
                      className={cn(
                        "text-sm md:text-base font-medium transition-colors duration-500",
                        isActive ? "text-white" : "text-gray-400",
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>
                </motion.div>
              )
            })}

            {/* Connection line (desktop) - with progress animation */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-800 hidden md:block">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00FFF5] via-[#9945FF] to-[#00FF47]"
                initial={{ width: "0%" }}
                animate={{
                  width:
                    activeStep >= 0 ? `${Math.min(100, (activeStep + 1) * (100 / verificationSteps.length))}%` : "0%",
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Connection lines (mobile) - with progress animation */}
            {verificationSteps.map(
              (_, index) =>
                index < verificationSteps.length - 1 && (
                  <div key={`connector-${index}`} className="w-0.5 h-8 bg-gray-800 md:hidden relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#00FFF5] to-[#9945FF]"
                      initial={{ height: "0%" }}
                      animate={{
                        height: activeStep > index ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                ),
            )}
          </div>

          {/* Data flow visualization - Fixed to use Tailwind classes for responsive behavior */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Animated data particles - Only visible on desktop */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute top-1/2 h-2 w-2 rounded-full bg-[#00FFF5] hidden md:block"
                initial={{ left: "0%", opacity: 0 }}
                animate={{
                  left: ["0%", "25%", "50%", "75%", "100%"],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.8 + (activeStep >= 0 ? 0 : 10000), // Only start particles when steps begin
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  marginTop: `-${i}px`,
                  boxShadow: "0 0 8px rgba(0, 255, 245, 0.8)",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Input/Output Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Input: Unverified Data */}
          <motion.div
            className="backdrop-blur-md bg-black/40 rounded-2xl border border-white/10 p-6 transition-all duration-500 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#FF5A5A]/10 to-[#FF5A5A]/5 border border-[#FF5A5A]/20">
                <Database className="h-6 w-6 text-[#FF5A5A]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Unverified Data</h3>
                <p className="text-gray-400 text-sm">Raw datasets from unknown sources</p>
              </div>
            </div>
          </motion.div>

          {/* Output: Verified Data */}
          <motion.div
            className="backdrop-blur-md bg-black/40 rounded-2xl border border-white/10 p-6 transition-all duration-500 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-[#00FF47]/10 to-[#00FF47]/5 border border-[#00FF47]/20">
                <Database className="h-6 w-6 text-[#00FF47]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Verified Data</h3>
                <p className="text-gray-400 text-sm">Authenticated datasets with provider credentials</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <BorderMagicButton
            size="md"
            className="group"
            onClick={() => {
              const element = document.getElementById("verification-workflow")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            <span className="group-hover:text-[#00FFF5] transition-colors">Learn More</span>
          </BorderMagicButton>
        </div>
      </motion.div>
    </section>
  )
} 