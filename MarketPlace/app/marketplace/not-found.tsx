import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MarketplaceNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Dataset Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The dataset you're looking for doesn't exist or has been removed from the marketplace.
      </p>
      <Link href="/marketplace">
        <Button>Back to Marketplace</Button>
      </Link>
    </div>
  )
}
