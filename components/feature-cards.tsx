"use client"

import type React from "react"

import { Shield, Database, Key, Sparkles, Lock } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const features = [
  {
    title: "Confidential Enclave Training",
    description: "All compute inside hardware-isolated enclave (SGX/Nitro).",
    icon: Shield,
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
  },
  {
    title: "Decentralized Storage",
    description: "Erasure-coded, censorship-resistant data slivers.",
    icon: Database,
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
  },
  {
    title: "Lit Protocol Access Control",
    description: "Decentralized key gating via ACCs.",
    icon: Key,
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
  },
  {
    title: "Preflight Verification",
    description: "Verify computation without revealing sensitive data.",
    icon: Lock,
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
  },
  {
    title: "Quantum-Resistant Encryption",
    description: "Future-proof security for your most sensitive data.",
    icon: Sparkles,
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
  },
]

interface GridItemProps {
  area: string
  icon: React.ElementType
  title: string
  description: string
}

const GridItem = ({ area, icon: Icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border border-white/10 p-2 md:rounded-3xl md:p-3 backdrop-blur-md bg-black/40">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_rgba(0,255,245,0.1)]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-[#00FFF5]/30 p-2 bg-black/30">
              <Icon className="h-5 w-5 text-[#00FFF5]" />
            </div>
            <div className="space-y-3">
              <h3 className="font-poppins text-xl/[1.375rem] font-semibold text-balance text-white md:text-2xl/[1.875rem]">
                {title}
              </h3>
              <p className="font-poppins text-sm/[1.125rem] text-gray-400 md:text-base/[1.375rem]">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function FeatureCards() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[40rem] xl:grid-rows-2">
      {features.map((feature, index) => (
        <GridItem
          key={index}
          area={feature.area}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </ul>
  )
}
