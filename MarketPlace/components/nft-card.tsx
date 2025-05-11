import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NFTCardProps {
  id: string
  title: string
  price: number
  image: string
  creator: string
}

export function NFTCard({ id, title, price, image, creator }: NFTCardProps) {
  return (
    <Link href={`/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <div className="mt-2 flex items-center justify-between">
            <Badge variant="outline" className="font-mono">
              {price} SOL
            </Badge>
            <span className="text-xs text-muted-foreground">
              by {creator.slice(0, 4)}...{creator.slice(-4)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
