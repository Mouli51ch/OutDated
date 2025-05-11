import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Dataset } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { Shield, FileText } from "lucide-react"

interface DatasetCardProps {
  dataset: Dataset
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  const { id, title, description, organization, price, tags, createdAt, image, dataType, privacyTechnique } = dataset

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-[#4099B4]/10 border-border/40 backdrop-blur-sm bg-background/60">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute bottom-2 right-2">
            <Badge variant="outline" className="bg-[#4099B4]/20 text-[#4099B4] border-[#4099B4]/30">
              <Shield className="mr-1 h-3 w-3" />
              {privacyTechnique === "anonymization"
                ? "Anonymized"
                : privacyTechnique === "differential-privacy"
                  ? "Differential Privacy"
                  : "Protected"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
          <Badge variant="outline" className="font-mono bg-[#4099B4]/20 text-[#4099B4] border-[#4099B4]/30">
            ${price}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <FileText className="mr-1 h-3 w-3" />
            {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
          </div>
          <div>{organization}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">{formatDate(createdAt)}</div>
        <Link href={`/marketplace/${id}`}>
          <Button size="sm" variant="outline" className="border-[#4099B4]/30 bg-[#4099B4]/10 hover:bg-[#4099B4]/20">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
