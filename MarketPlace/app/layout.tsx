import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/providers/theme-provider"
import { MockWalletProvider } from "@/providers/mock-wallet-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"
import { WalletProvider } from "@/components/WalletProvider"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "OutDated - Decentralized AI Compute & Dataset Licensing",
  description: "A decentralized platform for AI compute and dataset licensing on Solana",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} min-h-screen bg-black text-white`}>
        <WalletProvider>

        <ThemeProvider defaultTheme="dark">
          <MockWalletProvider>
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
        </WalletProvider>
      </body>
    </html>
  )
}
