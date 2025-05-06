"use client"

import { useState, useRef } from "react"
import { Check, Copy } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { BorderMagicButton } from "@/components/ui/border-magic-button"
import { motion, useScroll, useTransform } from "framer-motion"

export default function CodeSnippet() {
  const [copied, setCopied] = useState(false)
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
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.2, 0.1])

  const code = `from outdated import SecureModel

model = SecureModel()
model.fit("walrus://dataset_hash")`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section ref={sectionRef} className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden" id="code">
      {/* Futuristic background elements with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        {/* Tech grid pattern */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 255, 245, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(153, 69, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: gridOpacity,
          }}
        />

        {/* Animated glow effects */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#00FFF5]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#9945FF]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Tech circuit lines */}
        <div className="absolute top-10 left-0 w-1/2 h-px bg-gradient-to-r from-[#00FFF5]/40 to-transparent" />
        <div className="absolute top-10 right-0 w-1/3 h-px bg-gradient-to-l from-[#9945FF]/40 to-transparent" />
        <div className="absolute bottom-10 left-1/3 w-1/4 h-px bg-gradient-to-r from-[#00FFF5]/40 to-transparent" />
        <div className="absolute bottom-10 right-0 w-2/5 h-px bg-gradient-to-l from-[#9945FF]/40 to-transparent" />

        {/* Binary/code rain effect in the background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2300FFF5' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      <motion.div
        ref={ref}
        className={cn(
          "backdrop-blur-md bg-black/60 rounded-2xl border border-white/10 p-6 md:p-8 transition-all duration-500 relative z-10",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "shadow-[0_0_25px_rgba(0,255,245,0.15)]", // Add neon glow
        )}
        style={{ y: contentY }}
      >
        {/* Terminal-like header with dots */}
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-70"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-70"></div>
            <h3 className="text-xl font-bold ml-4">scikit-learn–style API for zero-trust ML</h3>
          </div>
          <BorderMagicButton
            onClick={copyToClipboard}
            size="sm"
            className="h-8"
            innerClassName="px-3 py-0 gap-2 text-sm"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </BorderMagicButton>
        </div>

        {/* Code with enhanced styling */}
        <pre className="bg-black/80 rounded-lg p-4 overflow-x-auto border border-white/5 relative">
          {/* Line numbers */}
          <div className="absolute left-2 top-4 text-gray-600 font-mono text-xs select-none flex flex-col">
            {code.split("\n").map((_, i) => (
              <div key={i} className="h-[1.625rem] flex items-center">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code content with matching line height */}
          <code className="font-mono text-[#00FFF5] pl-7 block">
            {code.split("\n").map((line, i) => (
              <div key={i} className="h-[1.625rem] flex items-center">
                {line || "\u00A0"}
              </div>
            ))}
          </code>

          {/* Cursor effect */}
          <div className="absolute bottom-4 right-4 w-2 h-4 bg-[#00FFF5] opacity-70 animate-pulse"></div>
        </pre>

        {/* Tech decorative elements */}
        <div className="absolute -bottom-px left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#00FFF5] to-transparent"></div>
      </motion.div>
    </section>
  )
}
