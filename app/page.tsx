import Hero from "@/components/hero"
import Features from "@/components/features"
import CodeSnippet from "@/components/code-snippet"
import InteractiveDemo from "@/components/interactive-demo"
import Footer from "@/components/footer"
import FloatingNavOutdated from "@/components/floating-navbar-outdated"
import { ParallaxProvider } from "@/components/parallax-provider"

export default function Home() {
  return (
    <ParallaxProvider>
      <main className="min-h-screen bg-black text-white overflow-hidden">
        <FloatingNavOutdated />
        <Hero />
        <Features />
        <CodeSnippet />
        <InteractiveDemo />
        <Footer />
      </main>
    </ParallaxProvider>
  )
}
