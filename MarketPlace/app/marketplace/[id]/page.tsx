import { notFound } from "next/navigation"
import { mockDatasets } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Shield, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

interface MarketplaceDetailPageProps {
  params: {
    id: string
  }
}

export default function MarketplaceDetailPage({ params }: MarketplaceDetailPageProps) {
  const dataset = mockDatasets.find((dataset) => dataset.id === params.id)

  if (!dataset) {
    return notFound()
  }

  const {
    title,
    description,
    organization,
    organizationType,
    price,
    tags,
    size,
    createdAt,
    image,
    dataType,
    domain,
    accessType,
    accessCount,
    sampleAvailable,
    privacyTechnique,
    qualityScore,
  } = dataset

  return (
    <div className="container py-12">
      <div className="space-y-8">
        <div className="flex items-center space-x-2">
          <Link href="/marketplace">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-border/40">
              <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-muted-foreground">Provided by {organization}</p>
              </div>

              <div className="flex flex-wrap gap-2 my-4">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Description</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Data Type</p>
                  <p className="text-sm text-muted-foreground">
                    {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Size</p>
                  <p className="text-sm text-muted-foreground">{size}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Domain</p>
                  <p className="text-sm text-muted-foreground">{domain}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">{formatDate(createdAt)}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Privacy Technique</p>
                  <p className="text-sm text-muted-foreground">
                    {privacyTechnique
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium">Quality Score</p>
                  <p className="text-sm text-muted-foreground">{qualityScore}%</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-6 rounded-lg border border-border/40 bg-background/60 backdrop-blur-sm p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">License this Dataset</h3>
                <p className="text-sm text-muted-foreground">Secure access to this privacy-protected dataset</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Price</span>
                  <span className="text-2xl font-bold">${price}</span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="mr-2 h-4 w-4" />
                  Protected with{" "}
                  {privacyTechnique
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full">License Now</Button>

                {sampleAvailable && (
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Sample
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
