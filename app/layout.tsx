import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import CustomCursor from "@/components/custom-cursor"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "outDated - Privacy-First Machine Learning on Encrypted Data",
  description:
    "Train ML models on encrypted data without ever exposing the raw information. Decentralized storage, Lit Protocol key gating, Confidential Enclave compute.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>
        {children}
        <CustomCursor />
      </body>
    </html>
  )
}
