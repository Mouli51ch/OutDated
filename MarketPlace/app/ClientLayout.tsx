"use client"

import type React from "react"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/providers/theme-provider"
import { MockWalletProvider } from "@/providers/mock-wallet-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"

// First, add the import for useRouter and useEffect
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// First, add the import for usePathname and redirect
import { usePathname } from "next/navigation"
// import { redirect } from "next/navigation" // Removed redirect import

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

// Add a client component for redirection
function RedirectToMarketplace() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/") {
      router.push("/marketplace")
    }
  }, [pathname, router])

  return null
}

// Update the RootLayout component to include the RedirectToMarketplace component
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} min-h-screen bg-black text-white`}>
        <ThemeProvider defaultTheme="dark">
          <MockWalletProvider>
            <RedirectToMarketplace />
            <div className="relative flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col lg:ml-64">
                {/* More subtle background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4099B4]/5 to-[#6C49AC]/5 pointer-events-none"></div>
                <main className="relative flex-1 p-4">{children}</main>
                <Footer />
              </div>
            </div>
            <Toaster position="bottom-right" />
          </MockWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
