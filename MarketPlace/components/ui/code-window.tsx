"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CodeWindowProps {
  title?: string
  code: string
  language?: string
}

export function CodeWindow({
  title = "scikit-learn-style API for zero-trust ML",
  code,
  language = "python",
}: CodeWindowProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const codeLines = code.trim().split("\n")

  return (
    <motion.div
      className="rounded-lg overflow-hidden border border-gray-800 bg-black shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-gray-300 text-sm">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors px-2 py-1 rounded border border-gray-700 text-xs"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm">
          <code>
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                className="flex"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
              >
                <span className="text-gray-500 w-8 text-right pr-4 select-none">{i + 1}</span>
                <span className="text-cyan-400">{line}</span>
              </motion.div>
            ))}
          </code>
        </pre>
      </div>
    </motion.div>
  )
}
