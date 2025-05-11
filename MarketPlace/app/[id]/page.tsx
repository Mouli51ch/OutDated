"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Improved function to get NFT details
async function getNFTDetails(id: string) {
  try {
    // Use relative URL instead of absolute URL
    const res = await fetch(`/api/datasets`)
    if (!res.ok) {
      throw new Error(`Failed to fetch NFTs: ${res.status}`)
    }
    const nfts = await res.json()
    return nfts.find((nft: any) => nft.id === id) || null
  } catch (error) {
    console.error("Error fetching NFT details:", error)
    throw error
  }
}

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { connected } = useWallet()
  const [nft, setNft] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [purchasing, setPurchasing] = useState(false)

  // Use useEffect instead of useState for data fetching
  useEffect(() => {
    const fetchNFT = async () => {
      try {
        const data = await getNFTDetails(params.id)
        setNft(data)
        if (!data) {
          setError("NFT not found")
        }
      } catch (error) {
        console.error("Error fetching NFT:", error)
        setError("Failed to load NFT details")
        toast.error("Failed to load NFT details")
      } finally {
        setLoading(false)
      }
    }

    fetchNFT()
  }, [params.id]) // Add params.id as a dependency

  const handlePurchase = async () => {
    if (!connected) {
      toast.error("Please connect your wallet first")
      return
    }

    setPurchasing(true)

    try {
      // Simulate API call
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: params.id }),
      })

      if (!response.ok) {
        throw new Error("Purchase failed")
      }

      toast.success("NFT purchased successfully!")
      router.push("/marketplace")
    } catch (error) {
      toast.error("Failed to purchase NFT")
      console.error(error)
    } finally {
      setPurchasing(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !nft) {
    return (
      <div className="container py-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">NFT Not Found</h1>
          <p className="text-muted-foreground">The NFT you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push("/marketplace")}>Back to Marketplace</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image src={nft.image || "/placeholder.svg"} alt={nft.title} fill className="object-cover" />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{nft.title}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-lg">
                  {nft.price} SOL
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created by {nft.creator.slice(0, 4)}...{nft.creator.slice(-4)}
                </span>
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <p>{nft.description}</p>
              </CardContent>
            </Card>

            <Button
              onClick={handlePurchase}
              className="w-full bg-solana-gradient hover:opacity-90"
              disabled={purchasing}
            >
              {purchasing ? "Processing..." : `Buy for ${nft.price} SOL`}
            </Button>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Details</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Blockchain</div>
                <div>Solana</div>
                <div className="text-muted-foreground">Token Standard</div>
                <div>SPL</div>
                <div className="text-muted-foreground">Contract</div>
                <div className="font-mono">
                  {nft.creator.slice(0, 8)}...{nft.creator.slice(-8)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
