import type React from "react"
export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="marketplace-layout">{children}</div>
}
