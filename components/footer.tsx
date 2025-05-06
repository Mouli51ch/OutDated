"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Github, Twitter, MessageSquare, ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  })

  // Parallax transformations
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const contentY = useTransform(scrollYProgress, [0, 1], [50, 0])
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.1, 0.05])

  // Handle mouse movement for interactive gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return

      const rect = footerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (x > 0 && y > 0 && x < rect.width && y < rect.height) {
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setSubscribed(true)
        setEmail("")
      }, 500)
    }
  }

  return (
    <footer
      ref={footerRef}
      className="relative py-20 px-4 md:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(10,10,13,1) 100%)",
      }}
    >
      {/* Interactive gradient spotlight */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 245, 0.15), transparent 40%)`,
          transition: "background 0.1s ease",
        }}
      />

      {/* Animated tech grid background with parallax */}
      <motion.div className="absolute inset-0 opacity-10" style={{ y: backgroundY }}>
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 255, 245, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(153, 69, 255, 0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "center center",
            opacity: gridOpacity,
          }}
        />

        {/* Animated circuit lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FFF5] to-transparent opacity-60" />
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-[#9945FF] via-transparent to-[#00FFF5] opacity-60" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-[#00FFF5] via-transparent to-transparent opacity-60" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#9945FF] to-transparent opacity-60" />
      </motion.div>

      {/* Glowing orbs with parallax */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#00FFF5]/5 blur-3xl animate-pulse"
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -20]) }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#9945FF]/5 blur-3xl animate-pulse"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [30, -30]),
          animationDelay: "1s",
        }}
      />

      {/* Main content with parallax */}
      <motion.div className="max-w-7xl mx-auto relative z-10" style={{ y: contentY }}>
        {/* Top section with futuristic divider */}
        <div className="relative mb-16 pb-8">
          <h2 className="text-4xl font-bold mb-4 text-center text-white">OutDated</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-center mb-8 font-light">
            Privacy-First Machine Learning on Encrypted Data. Train models without ever exposing sensitive information.
          </p>

          {/* Futuristic divider */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FFF5] to-transparent animate-pulse" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-4 h-4">
              <div className="w-full h-full rounded-full bg-black border border-[#00FFF5] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#00FFF5]" />
              </div>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Social links section */}
          <div className="md:col-span-4 space-y-8">
            <h3 className="text-xl font-semibold mb-4 relative inline-block">
              Connect
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#00FFF5] to-transparent" />
            </h3>

            <div className="flex flex-wrap gap-4">
              <a href="#" className="relative group" aria-label="GitHub">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00FFF5] to-[#9945FF] blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 group-hover:border-[#00FFF5]/50 transition-colors duration-300">
                  <Github className="w-5 h-5 text-white group-hover:text-[#00FFF5] transition-colors duration-300" />
                </div>
              </a>

              <a href="#" className="relative group" aria-label="Twitter">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00FFF5] to-[#9945FF] blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 group-hover:border-[#00FFF5]/50 transition-colors duration-300">
                  <Twitter className="w-5 h-5 text-white group-hover:text-[#00FFF5] transition-colors duration-300" />
                </div>
              </a>

              <a href="#" className="relative group" aria-label="Discord">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00FFF5] to-[#9945FF] blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 group-hover:border-[#00FFF5]/50 transition-colors duration-300">
                  <MessageSquare className="w-5 h-5 text-white group-hover:text-[#00FFF5] transition-colors duration-300" />
                </div>
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Built for Solana Colosseum Breakout Hackathon</p>
              <p className="text-gray-500 text-xs">© {new Date().getFullYear()} outDated. All rights reserved.</p>
            </div>
          </div>

          {/* Quick links section */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-semibold mb-4 relative inline-block">
              Resources
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#00FFF5] to-transparent" />
            </h3>

            <ul className="space-y-3">
              {["Documentation", "GitHub", "Discord", "Blog"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#00FFF5] transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight className="w-3 h-3 text-[#00FFF5]" />
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4 relative inline-block">
              Legal
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#00FFF5] to-transparent" />
            </h3>

            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Use", "Cookies"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#00FFF5] transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight className="w-3 h-3 text-[#00FFF5]" />
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter section */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-semibold mb-4 relative inline-block">
              Stay Updated
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#00FFF5] to-transparent" />
            </h3>

            {subscribed ? (
              <div className="p-4 backdrop-blur-md bg-black/30 rounded-xl border border-[#00FFF5]/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00FFF5]/10 to-[#9945FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-[#00FFF5] relative z-10">Thanks for subscribing! We'll keep you updated.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-gray-400 text-sm">Get the latest updates on outDated and the Solana ecosystem.</p>

                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-black/30 border-white/10 focus:border-[#00FFF5] rounded-lg pl-4 pr-12 py-2 w-full"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md flex items-center justify-center bg-gradient-to-r from-[#00FFF5] to-[#9945FF] text-black"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-500 text-xs">We respect your privacy. Unsubscribe at any time.</p>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
