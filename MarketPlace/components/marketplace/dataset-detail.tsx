"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Download,
  Lock,
  Shield,
  FileText,
  BarChart,
  Database,
  Calendar,
  Tag,
  Users,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    updateFrequency,
  } = dataset

  const getPrivacyBadge = () => {
    switch (privacyTechnique) {
      case "anonymization":
        return (
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Shield className="mr-1 h-3 w-3" />
            Anonymized
          </Badge>
        )
      case "differential-privacy":
        return (
          <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            <Shield className="mr-1 h-3 w-3" />
            Differential Privacy
          </Badge>
        )
      case "federated-learning":
        return (
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
            <Shield className="mr-1 h-3 w-3" />
            Federated Learning
          </Badge>
        )
      case "encryption":
        return (
          <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
            <Lock className="mr-1 h-3 w-3" />
            Encrypted
          </Badge>
        )
      default:
        return null
    }
  }

  const getDataTypeIcon = () => {
    switch (dataType) {
      case "tabular":
        return <FileText className="h-5 w-5 mr-2" />
      case "image":
        return <Image className="h-5 w-5 mr-2" width={20} height={20} alt="Image icon" src="/placeholder.svg" />
      case "text":
        return <FileText className="h-5 w-5 mr-2" />
      case "timeseries":
        return <BarChart className="h-5 w-5 mr-2" />
      default:
        return <Database className="h-5 w-5 mr-2" />
    }
  }

  const getQualityScoreColor = () => {
    if (qualityScore >= 90) return "text-green-400"
    if (qualityScore >= 70) return "text-yellow-400"
    return "text-red-400"
  }

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

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sample" disabled={!sampleAvailable}>
                Sample Data
              </TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
              <TabsTrigger value="license">License Terms</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
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
                <div className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Size</p>
                    <p className="text-sm text-muted-foreground">{size}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-muted-foreground">{formatDate(createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Domain</p>
                    <p className="text-sm text-muted-foreground">{domain}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Access Count</p>
                    <p className="text-sm text-muted-foreground">{accessCount} users</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Update Frequency</p>
                    <p className="text-sm text-muted-foreground">{updateFrequency || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Quality Score</p>
                    <p className={`text-sm font-bold ${getQualityScoreColor()}`}>{qualityScore}%</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sample" className="space-y-4 mt-4">
              {sampleAvailable ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Sample Data</h3>
                  <p className="text-muted-foreground">
                    Below is a sample of the dataset to help you evaluate its suitability for your needs. This sample
                    represents approximately 1% of the full dataset.
                  </p>

                  <div className="border border-border/40 rounded-lg p-4 bg-background/60 backdrop-blur-sm overflow-auto max-h-96">
                    <pre className="text-xs">
                      {/* Sample data would be displayed here */}
                      {`[
  {
    "id": "sample-001",
    "timestamp": "2023-01-15T08:30:00Z",
    "value": 42.5,
    "category": "A",
    "metadata": {
      "source": "sensor-1",
      "confidence": 0.95
    }
  },
  {
    "id": "sample-002",
    "timestamp": "2023-01-15T08:35:00Z",
    "value": 43.2,
    "category": "B",
    "metadata": {
      "source": "sensor-2",
      "confidence": 0.92
    }
  },
  // ... more sample data
]`}
                    </pre>
                  </div>

                  <Button variant="outline" className="mt-4">
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Sample
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold">Sample Not Available</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    A sample is not available for this dataset due to privacy or licensing restrictions. Please purchase
                    a license to access the full dataset.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="metadata" className="space-y-4 mt-4">
              <h3 className="text-xl font-semibold">Dataset Metadata</h3>
              <div className="border border-border/40 rounded-lg p-4 bg-background/60 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Data Type</p>
                    <div className="flex items-center mt-1">
                      {getDataTypeIcon()}
                      <span className="text-sm text-muted-foreground">
                        {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Privacy Technique</p>
                    <div className="mt-1">{getPrivacyBadge()}</div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Organization Type</p>
                    <p className="text-sm text-muted-foreground">
                      {organizationType.charAt(0).toUpperCase() + organizationType.slice(1)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Access Type</p>
                    <p className="text-sm text-muted-foreground">
                      {accessType.charAt(0).toUpperCase() + accessType.slice(1)}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-sm font-medium">Schema Information</p>
                    <pre className="text-xs mt-2 p-2 bg-muted rounded-md overflow-auto">
                      {`{
  "fields": [
    { "name": "id", "type": "string", "description": "Unique identifier" },
    { "name": "timestamp", "type": "datetime", "description": "Time of record" },
    { "name": "value", "type": "float", "description": "Primary measurement" },
    { "name": "category", "type": "string", "description": "Classification" },
    { "name": "metadata", "type": "object", "description": "Additional information" }
  ],
  "primaryKey": ["id"],
  "foreignKeys": []
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="license" className="space-y-4 mt-4">
              <h3 className="text-xl font-semibold">License Terms</h3>
              <div className="border border-border/40 rounded-lg p-4 bg-background/60 backdrop-blur-sm">
                <h4 className="font-medium mb-2">Usage Restrictions</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
                  <li>This dataset may only be used for the specific purpose outlined in your license agreement.</li>
                  <li>Redistribution of the raw data is prohibited without explicit permission.</li>
                  <li>Any models trained on this data must acknowledge the source.</li>
                  <li>You may not attempt to re-identify individuals in anonymized data.</li>
                  <li>Usage is limited to the organization or individual purchasing the license.</li>
                </ul>

                <h4 className="font-medium mb-2">Privacy Compliance</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  This dataset has been processed in accordance with applicable privacy regulations. The{" "}
                  {privacyTechnique
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  technique has been applied to protect individual privacy.
                </p>

                <h4 className="font-medium mb-2">Attribution Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  When publishing results based on this dataset, please include the following citation:
                </p>
                <pre className="text-xs mt-2 p-2 bg-muted rounded-md">
                  {`${organization} (${new Date(createdAt).getFullYear()}). ${title}. Retrieved from Data Marketplace.`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
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
