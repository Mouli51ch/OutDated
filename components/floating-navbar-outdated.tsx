"use client"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Github, MessageSquare } from "lucide-react"

// X logo component using the provided SVG
const XLogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 462.799" fill="currentColor" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
    />
  </svg>
)

export default function FloatingNavOutdated() {
  const navItems = [
    {
      name: "",
      link: "https://x.com/OutDated_Labs",
      icon: <XLogo className="h-5 w-5 text-white hover:text-[#00FFF5]" />,
    },
    {
      name: "GitHub",
      link: "https://github.com/Mouli51ch/OutDated",
      icon: <Github className="h-5 w-5 text-white hover:text-[#00FFF5]" />,
    },
    {
      name: "Chat",
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
