"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { DatasetFilter } from "@/lib/types"

interface DatasetFilterComponentProps {
  onFilterChange: (filters: DatasetFilter) => void
}

export function DatasetFilterComponent({ onFilterChange }: DatasetFilterComponentProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [filters, setFilters] = useState<DatasetFilter>({
    dataType: [],
    domain: [],
    accessType: [],
    priceRange: [0, 5000],
    privacyTechnique: [],
    organizationType: [],
    minQualityScore: 0,
  })

  const dataTypes = ["tabular", "image", "text", "timeseries", "audio", "mixed"]
  const domains = [
    "healthcare",
    "finance",
    "biology",
    "linguistics",
    "urban planning",
    "marketing",
    "environmental science",
    "education",
  ]
  const accessTypes = ["open", "restricted", "commercial"]
  const privacyTechniques = ["anonymization", "differential-privacy", "federated-learning", "encryption", "none"]
  const organizationTypes = ["healthcare", "research", "government", "education", "commercial", "nonprofit"]

  const handleCheckboxChange = (
    category: "dataType" | "domain" | "accessType" | "privacyTechnique" | "organizationType",
    value: string,
    checked: boolean,
  ) => {
    const updatedFilters = { ...filters }

    if (!updatedFilters[category]) {
      updatedFilters[category] = []
    }

    if (checked) {
      updatedFilters[category] = [...(updatedFilters[category] || []), value]
    } else {
      updatedFilters[category] = (updatedFilters[category] || []).filter((item) => item !== value)
    }

    setFilters(updatedFilters)
  }

  const handlePriceChange = (value: number[]) => {
    setFilters({ ...filters, priceRange: [value[0], value[1]] })
  }

  const handleQualityScoreChange = (value: number[]) => {
    setFilters({ ...filters, minQualityScore: value[0] })
  }

  const applyFilters = () => {
    onFilterChange(filters)
  }

  const resetFilters = () => {
    const resetFilters = {
      dataType: [],
      domain: [],
      accessType: [],
      priceRange: [0, 5000],
      privacyTechnique: [],
      organizationType: [],
      minQualityScore: 0,
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="bg-background/60 backdrop-blur-sm border border-border/40 rounded-lg p-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Filter Datasets</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {/* Data Type Filter */}
            <div>
              <h4 className="font-medium mb-2">Data Type</h4>
              <div className="space-y-2">
                {dataTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`data-type-${type}`}
                      checked={filters.dataType?.includes(type)}
                      onCheckedChange={(checked) => handleCheckboxChange("dataType", type, checked as boolean)}
                    />
                    <label
                      htmlFor={`data-type-${type}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain Filter */}
            <div>
              <h4 className="font-medium mb-2">Domain</h4>
              <div className="space-y-2">
                {domains.map((domain) => (
                  <div key={domain} className="flex items-center space-x-2">
                    <Checkbox
                      id={`domain-${domain}`}
                      checked={filters.domain?.includes(domain)}
                      onCheckedChange={(checked) => handleCheckboxChange("domain", domain, checked as boolean)}
                    />
                    <label
                      htmlFor={`domain-${domain}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {domain.charAt(0).toUpperCase() + domain.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Access Type Filter */}
            <div>
              <h4 className="font-medium mb-2">Access Type</h4>
              <div className="space-y-2">
                {accessTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`access-type-${type}`}
                      checked={filters.accessType?.includes(type)}
                      onCheckedChange={(checked) => handleCheckboxChange("accessType", type, checked as boolean)}
                    />
                    <label
                      htmlFor={`access-type-${type}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Technique Filter */}
            <div>
              <h4 className="font-medium mb-2">Privacy Technique</h4>
              <div className="space-y-2">
                {privacyTechniques.map((technique) => (
                  <div key={technique} className="flex items-center space-x-2">
                    <Checkbox
                      id={`privacy-${technique}`}
                      checked={filters.privacyTechnique?.includes(technique)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("privacyTechnique", technique, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`privacy-${technique}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {technique
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Organization Type Filter */}
            <div>
              <h4 className="font-medium mb-2">Organization Type</h4>
              <div className="space-y-2">
                {organizationTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`org-type-${type}`}
                      checked={filters.organizationType?.includes(type)}
                      onCheckedChange={(checked) => handleCheckboxChange("organizationType", type, checked as boolean)}
                    />
                    <label
                      htmlFor={`org-type-${type}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="font-medium mb-2">
                Price Range (${filters.priceRange?.[0]} - ${filters.priceRange?.[1]})
              </h4>
              <Slider
                defaultValue={[0, 5000]}
                max={5000}
                step={100}
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                className="my-6"
              />
            </div>

            {/* Quality Score Filter */}
            <div>
              <h4 className="font-medium mb-2">Minimum Quality Score: {filters.minQualityScore}%</h4>
              <Slider
                defaultValue={[0]}
                max={100}
                step={5}
                value={[filters.minQualityScore || 0]}
                onValueChange={handleQualityScoreChange}
                className="my-6"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
