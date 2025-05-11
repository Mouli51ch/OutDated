"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Dataset } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface DatasetDetailProps {
  dataset: Dataset
}

export function DatasetDetail({ dataset }: DatasetDetailProps) {
  const [isLicensing, setIsLicensing] = useState(false)
  const [licenseAgreed, setLicenseAgreed] = useState(false)

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

  const handleLicense = () => {
    if (isLicensing) {
      // Process license purchase
      alert("Thank you for your purchase! You now have access to this dataset.")
      setIsLicensing(false)
      setLicenseAgreed(false)
    } else {
      setIsLicensing(true)
    }
  }

  return (
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
                <p className="text-sm text-muted-foreground">{dataType.charAt(0).toUpperCase() + dataType.slice(1)}</p>
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
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>License this Dataset</CardTitle>
              <CardDescription>Secure access to this privacy-protected dataset</CardDescription>
            </CardHeader>
            <CardContent>
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

                {isLicensing ? (
                  <div className="space-y-4 border border-border/40 rounded-lg p-4">
                    <h4 className="font-medium">License Agreement</h4>
                    <div className="text-sm text-muted-foreground h-40 overflow-y-auto border border-border/40 rounded-lg p-2">
                      <p>By purchasing this license, you agree to the following terms:</p>
                      <ol className="list-decimal list-inside space-y-1 mt-2">
                        <li>You will not attempt to re-identify individuals in the dataset.</li>
                        <li>You will not redistribute the raw data to third parties.</li>
                        <li>You will properly attribute the dataset in any publications.</li>
                        <li>You will comply with all applicable privacy regulations.</li>
                        <li>Your access is limited to the specific use case stated in your application.</li>
                        <li>The license is valid for one year from the date of purchase.</li>
                      </ol>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={licenseAgreed}
                        onChange={(e) => setLicenseAgreed(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="agree" className="text-sm">
                        I agree to the license terms
                      </label>
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full" onClick={handleLicense} disabled={isLicensing && !licenseAgreed}>
                {isLicensing ? "Complete Purchase" : "License Now"}
              </Button>

              {sampleAvailable && !isLicensing && (
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Sample
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
