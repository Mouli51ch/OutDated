"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { BorderMagicButton } from "@/components/ui/border-magic-button"

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-white">
            outDated
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#code" className="text-gray-300 hover:text-white transition-colors">
            Code
          </a>
          <a href="#demo" className="text-gray-300 hover:text-white transition-colors">
            Demo
          </a>
          <BorderMagicButton size="sm">Get Started</BorderMagicButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="flex flex-col items-center gap-4 py-6">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#code"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Code
            </a>
            <a
              href="#demo"
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Demo
            </a>
            <BorderMagicButton size="sm" onClick={() => setMobileMenuOpen(false)}>
              Get Started
            </BorderMagicButton>
          </div>
        </div>
      )}
    </nav>
  )
}
