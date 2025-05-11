"use client"

import { useState } from "react"
import { DatasetCard } from "@/components/marketplace/dataset-card"
import { Input } from "@/components/ui/input"
import { mockDatasets } from "@/lib/mock-data"
import { Search } from "lucide-react"

export function DatasetList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDatasets = mockDatasets.filter((dataset) => {
    if (!searchQuery) return true

    return (
      dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search datasets by title, description, or tags..."
          className="pl-10 bg-background/60 backdrop-blur-sm border-border/40"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDatasets.length > 0 ? (
          filteredDatasets.map((dataset) => <DatasetCard key={dataset.id} dataset={dataset} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-muted/20 p-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-medium">No datasets found</h3>
            <p className="text-muted-foreground">
              No datasets match your search criteria. Try adjusting your search query.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
