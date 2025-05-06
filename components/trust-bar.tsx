"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export default function TrustBar() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section
      ref={ref}
      className={cn(
        "py-16 px-4 md:px-8 backdrop-blur-md bg-white/5 transition-all duration-500",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Trusted By</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {/* Placeholder logos */}
          <div className="h-12 w-32 bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">Solana</span>
          </div>

          <div className="h-12 w-32 bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">Colosseum</span>
          </div>

          <div className="h-12 w-32 bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">Walrus</span>
          </div>

          <div className="h-12 w-32 bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">Lit Protocol</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#00FFF5] to-[#9945FF] text-transparent bg-clip-text">
              1,234
            </span>
            <span className="text-gray-400">Connected Wallets</span>
          </div>

          <div className="h-10 border-l border-white/10 hidden md:block"></div>

          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#00FFF5] to-[#9945FF] text-transparent bg-clip-text">
              567
            </span>
            <span className="text-gray-400">NFT Mints</span>
          </div>

          <div className="h-10 border-l border-white/10 hidden md:block"></div>

          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#00FFF5] to-[#9945FF] text-transparent bg-clip-text">
              89
            </span>
            <span className="text-gray-400">Days Until Launch</span>
          </div>
        </div>
      </div>
    </section>
  )
}
