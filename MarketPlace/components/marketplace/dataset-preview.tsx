"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Lock } from "lucide-react"
import type { Dataset } from "@/lib/types"

interface DatasetPreviewProps {
  dataset: Dataset
}

export function DatasetPreview({ dataset }: DatasetPreviewProps) {
  const [showFullPreview, setShowFullPreview] = useState(false)

  // Generate mock preview data based on dataset type
  const getPreviewData = () => {
    switch (dataset.dataType) {
      case "tabular":
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Feature 1
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Feature 2
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Feature 3
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Target
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{i + 1}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{(Math.random() * 100).toFixed(2)}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{(Math.random() * 100).toFixed(2)}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{(Math.random() * 100).toFixed(2)}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">{Math.random() > 0.5 ? "True" : "False"}</td>
                  </tr>
                ))}
                {!showFullPreview && (
                  <tr>
                    <td colSpan={5} className="px-4 py-2 text-center">
                      <div className="flex items-center justify-center space-x-1 text-sm text-gray-400">
                        <Lock className="h-3 w-3" />
                        <span>Preview limited to 5 rows</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      case "image":
        return (
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative aspect-square bg-gray-800 rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  {i === 5 && !showFullPreview ? (
                    <div className="flex flex-col items-center">
                      <Lock className="h-6 w-6 mb-1" />
                      <span className="text-xs">Preview limited</span>
                    </div>
                  ) : (
                    <span className="text-xs">Image {i + 1}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      case "text":
        return (
          <div className="space-y-4">
            <div className="rounded-md bg-gray-800 p-4">
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
                nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
              </p>
            </div>
            <div className="rounded-md bg-gray-800 p-4">
              <p className="text-sm">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
              </p>
            </div>
            {!showFullPreview && (
              <div className="flex items-center justify-center space-x-1 text-sm text-gray-400 p-4">
                <Lock className="h-3 w-3" />
                <span>Preview limited to 2 samples</span>
              </div>
            )}
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <p className="text-gray-400">Preview not available for this data type</p>
              <p className="text-sm text-gray-500 mt-2">Download a sample to explore the data</p>
            </div>
          </div>
        )
    }
  }

  return (
    <Card className="border-border/40 backdrop-blur-sm bg-background/60">
      <Tabs defaultValue="data">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>
        <CardContent className="pt-6">
          <TabsContent value="data" className="mt-0">
            {getPreviewData()}
            <div className="mt-4 flex justify-between">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setShowFullPreview(!showFullPreview)}
              >
                {showFullPreview ? "Show Less" : "Show More"}
              </Button>
              {dataset.sampleAvailable && (
                <Button variant="outline" size="sm" className="text-xs">
                  <Download className="mr-1 h-3 w-3" />
                  Download Sample
                </Button>
              )}
            </div>
          </TabsContent>
          <TabsContent value="schema" className="mt-0">
            <div className="rounded-md bg-gray-800 p-4">
              <pre className="text-xs overflow-auto">
                {`{
  "fields": [
    {"name": "id", "type": "integer", "description": "Unique identifier"},
    {"name": "feature_1", "type": "float", "description": "First feature"},
    {"name": "feature_2", "type": "float", "description": "Second feature"},
    {"name": "feature_3", "type": "float", "description": "Third feature"},
    {"name": "target", "type": "boolean", "description": "Target variable"}
  ],
  "primaryKey": ["id"],
  "missingValues": ["", "NA", "N/A"]
}`}
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="stats" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md bg-gray-800 p-4">
                  <h4 className="text-sm font-medium mb-2">Row Count</h4>
                  <p className="text-2xl font-bold">{Math.floor(Math.random() * 10000)}</p>
                </div>
                <div className="rounded-md bg-gray-800 p-4">
                  <h4 className="text-sm font-medium mb-2">Column Count</h4>
                  <p className="text-2xl font-bold">{Math.floor(Math.random() * 100)}</p>
                </div>
              </div>
              <div className="rounded-md bg-gray-800 p-4">
                <h4 className="text-sm font-medium mb-2">Data Completeness</h4>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-[#4099B4] h-2.5 rounded-full"
                    style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="metadata" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Created</h4>
                  <p className="text-sm">{new Date(dataset.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Last Updated</h4>
                  <p className="text-sm">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Format</h4>
                  <p className="text-sm">CSV / JSON / Parquet</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Size</h4>
                  <p className="text-sm">{dataset.size}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <p className="text-sm">{dataset.description}</p>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
