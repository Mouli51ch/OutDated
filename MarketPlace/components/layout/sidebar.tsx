"use client"

import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, ShoppingCart, Code, BarChart3, Menu, X, ChevronRight } from "lucide-react"

import { BorderMagicButton } from "@/components/ui/border-magic-button"

const routes = [
  {
    path: "/marketplace",
    name: "Marketplace",
    icon: ShoppingCart,
  },
  {
    path: "/provider",
    name: "Provider",
    icon: BarChart3,
  },
  {
    path: "/developer",
    name: "Developer",
    icon: Code,
  },
  {
    path: "/governance",
    name: "Governance",
    icon: LayoutDashboard,
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const { setVisible } = useWalletModal()
  const { connected, publicKey } = useWallet()

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault()
    router.push(path)
  }

  return (
    <>
      {/* Mobile menu button - more refined styling */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-[#4099B4]/20 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6 text-[#4099B4]" /> : <Menu className="h-6 w-6 text-[#4099B4]" />}
      </button>

      {/* Sidebar for mobile - more refined styling */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 w-full h-full bg-black/80 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col h-full pt-16 pb-6 px-4">
              <div className="flex justify-center mb-8">
                <Link href="/" className="text-2xl font-bold text-white">
                  <span className="refined-gradient-text">OutDated</span>
                </Link>
              </div>

              <nav className="flex-1">
                <ul className="space-y-4">
                  {routes.map((route) => (
                    <li key={route.path}>
                      <a
                        href={route.path}
                        onClick={(e) => handleNavigation(route.path, e)}
                        className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                          pathname === route.path
                            ? "bg-gradient-to-r from-[#4099B4]/10 to-[#6C49AC]/10 border border-[#4099B4]/30"
                            : "hover:bg-white/5"
                        }`}
                      >
                        <route.icon
                          className={`h-5 w-5 mr-3 ${pathname === route.path ? "text-[#4099B4]" : "text-gray-400"}`}
                        />
                        <span className={`${pathname === route.path ? "text-white font-medium" : "text-gray-300"}`}>
                          {route.name}
                        </span>
                        {pathname === route.path && <ChevronRight className="h-4 w-4 ml-auto text-[#4099B4]" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for desktop - more refined styling */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:border-r md:border-[#4099B4]/10 md:bg-black/60 md:backdrop-blur-sm">
        <div className="flex flex-col h-full pt-8 pb-6 px-4">
          <div className="flex justify-center mb-8">
            <Link href="/" className="text-2xl font-bold text-white">
              <span className="refined-gradient-text">OutDated</span>
            </Link>
          </div>

          <nav className="flex-1 mt-8">
            <ul className="space-y-3">
              {routes.map((route) => {
                const isActive = pathname === route.path

                return (
                  <li key={route.path}>
                    {isActive ? (
                      <div className="relative">
                        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#4099B4] to-[#6C49AC] opacity-50" />
                        <a
                          href={route.path}
                          onClick={(e) => handleNavigation(route.path, e)}
                          className="relative flex items-center p-3 rounded-lg bg-black/90 z-10"
                        >
                          <route.icon className="h-5 w-5 mr-3 text-[#4099B4]" />
                          <span className="text-white font-medium">{route.name}</span>
                          <ChevronRight className="h-4 w-4 ml-auto text-[#4099B4]" />
                        </a>
                      </div>
                    ) : (
                      <a
                        href={route.path}
                        onClick={(e) => handleNavigation(route.path, e)}
                        className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-white/5 border border-transparent hover:border-[#4099B4]/20 z-10"
                      >
                        <route.icon className="h-5 w-5 mr-3 text-gray-400" />
                        <span className="text-gray-300">{route.name}</span>
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-auto">
            {connected ? (
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium truncate">
                {publicKey?.toBase58().slice(0, 4)}...
                {publicKey?.toBase58().slice(-4)}
              </button>
            ) : (
              <BorderMagicButton className="w-full" onClick={() => setVisible(true)}>
                Connect Wallet
              </BorderMagicButton>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
