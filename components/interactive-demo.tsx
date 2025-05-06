"use client"

import { useState, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { BorderMagicButton } from "@/components/ui/border-magic-button"
import { motion, useScroll, useTransform } from "framer-motion"

export default function InteractiveDemo() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
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

  const runDemo = () => {
    setLoading(true)
    setResult(null)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setResult(`
// Response from Confidential Enclave
{
  "model_id": "outdated_model_12345",
  "status": "success",
  "metrics": {
    "accuracy": 0.94,
    "f1_score": 0.92,
    "training_time": "45.2s"
  },
  "encrypted_model_hash": "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
}
      `)
    }, 2000)
  }

  return (
    <section ref={sectionRef} className="relative py-20 pb-32 px-4 md:px-8 max-w-7xl mx-auto" id="demo">
      {/* Parallax background elements */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#00FFF5]/5 to-black/0" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#00FFF5]/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#9945FF]/5 blur-3xl" />
      </motion.div>

      <motion.div
        ref={ref}
        className={cn(
          "text-center mb-12 transition-all duration-500 relative z-10",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        )}
        style={{ y: contentY }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Try It Yourself</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          See how outDated securely trains a model on encrypted data without exposing the raw information.
        </p>
      </motion.div>

      <motion.div
        className={cn(
          "backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8 max-w-4xl mx-auto transition-all duration-500 relative z-10",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          "border-[#00FFF5]/30",
        )}
        style={{ y: contentY }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">Interactive API Demo</h3>
            <p className="text-gray-400 mb-6">
              Click the button to simulate training a model in a Trusted Execution Environment.
            </p>
            <BorderMagicButton onClick={runDemo} disabled={loading} size="md">
              {loading ? "Processing..." : "Run Demo"}
            </BorderMagicButton>
          </div>

          <div className="flex-1 bg-black/50 rounded-lg p-4 font-mono text-sm overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse text-[#00FFF5]">Processing in secure enclave...</div>
              </div>
            ) : result ? (
              <pre className="text-[#00FFF5] whitespace-pre-wrap">{result}</pre>
            ) : (
              <div className="text-gray-500">// Results will appear here</div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
