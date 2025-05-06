"use client"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Twitter, Github, MessageSquare } from "lucide-react"

export default function FloatingNavOutdated() {
  const navItems = [
    {
      name: "Twitter",
      link: "https://twitter.com",
      icon: <Twitter className="h-5 w-5 text-white hover:text-[#00FFF5]" />,
    },
    {
      name: "GitHub",
      link: "https://github.com",
      icon: <Github className="h-5 w-5 text-white hover:text-[#00FFF5]" />,
    },
    {
      name: "Discord",
      link: "https://discord.com",
      icon: <MessageSquare className="h-5 w-5 text-white hover:text-[#00FFF5]" />,
    },
  ]

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} className="px-6 py-3 items-center justify-center gap-8" />
    </div>
  )
}
