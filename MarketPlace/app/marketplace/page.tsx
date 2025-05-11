"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Grid3X3, List, ChevronDown, Shield, Database, FileText, BarChart } from "lucide-react"
import { mockDatasets } from "@/lib/mock-data"
import type { Dataset } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [sortOption, setSortOption] = useState<"newest" | "price-low" | "price-high" | "quality">("newest")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([])
  const [selectedDomains, setSelectedDomains] = useState<string[]>([])
  const [selectedPrivacyTechniques, setSelectedPrivacyTechniques] = useState<string[]>([])
  const [minQualityScore, setMinQualityScore] = useState(0)
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>(mockDatasets)
  const [featuredDataset, setFeaturedDataset] = useState<Dataset | null>(null)

  // Get unique values for filters
  const dataTypes = Array.from(new Set(mockDatasets.map((dataset) => dataset.dataType)))
  const domains = Array.from(new Set(mockDatasets.map((dataset) => dataset.domain)))
  const privacyTechniques = Array.from(new Set(mockDatasets.map((dataset) => dataset.privacyTechnique)))

  // Set a random featured dataset on load
  useEffect(() => {
    const highQualityDatasets = mockDatasets.filter((dataset) => dataset.qualityScore >= 90)
    const randomIndex = Math.floor(Math.random() * highQualityDatasets.length)
    setFeaturedDataset(highQualityDatasets[randomIndex] || mockDatasets[0])
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    let results = [...mockDatasets]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (dataset) =>
          dataset.title.toLowerCase().includes(query) ||
          dataset.description.toLowerCase().includes(query) ||
          dataset.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply data type filter
    if (selectedDataTypes.length > 0) {
      results = results.filter((dataset) => selectedDataTypes.includes(dataset.dataType))
    }

    // Apply domain filter
    if (selectedDomains.length > 0) {
      results = results.filter((dataset) => selectedDomains.includes(dataset.domain))
    }

    // Apply privacy technique filter
    if (selectedPrivacyTechniques.length > 0) {
      results = results.filter((dataset) => selectedPrivacyTechniques.includes(dataset.privacyTechnique))
    }

    // Apply price range filter
    results = results.filter((dataset) => dataset.price >= priceRange[0] && dataset.price <= priceRange[1])

    // Apply quality score filter
    if (minQualityScore > 0) {
      results = results.filter((dataset) => dataset.qualityScore >= minQualityScore)
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "price-low":
        results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results.sort((a, b) => b.price - a.price)
        break
      case "quality":
        results.sort((a, b) => b.qualityScore - a.qualityScore)
        break
    }

    setFilteredDatasets(results)
  }, [
    searchQuery,
    selectedDataTypes,
    selectedDomains,
    selectedPrivacyTechniques,
    priceRange,
    minQualityScore,
    sortOption,
  ])

  const toggleDataType = (dataType: string) => {
    setSelectedDataTypes((prev) =>
      prev.includes(dataType) ? prev.filter((dt) => dt !== dataType) : [...prev, dataType],
    )
  }

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) => (prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]))
  }

  const togglePrivacyTechnique = (technique: string) => {
    setSelectedPrivacyTechniques((prev) =>
      prev.includes(technique) ? prev.filter((t) => t !== technique) : [...prev, technique],
    )
  }

  const resetFilters = () => {
    setSelectedDataTypes([])
    setSelectedDomains([])
    setSelectedPrivacyTechniques([])
    setPriceRange([0, 5000])
    setMinQualityScore(0)
    setSortOption("newest")
  }

  const getDataTypeIcon = (dataType: string) => {
    switch (dataType) {
      case "tabular":
        return <FileText className="h-4 w-4" />
      case "image":
        return <Image src="/placeholder.svg" alt="Image" width={16} height={16} />
      case "text":
        return <FileText className="h-4 w-4" />
      case "timeseries":
        return <BarChart className="h-4 w-4" />
      default:
        return <Database className="h-4 w-4" />
    }
  }

  const getPrivacyBadge = (technique: string) => {
    switch (technique) {
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
            <Shield className="mr-1 h-3 w-3" />
            Encrypted
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-500/20 text-gray-400 border-gray-500/30">
            <Shield className="mr-1 h-3 w-3" />
            Standard
          </Badge>
        )
    }
  }

  const getQualityScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="container py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Privacy-Focused Dataset Marketplace
          </h1>
          <p className="text-gray-300">
            Discover and license datasets with privacy guarantees for your research and applications
          </p>
        </div>

        {/* Rest of the marketplace content */}
        {/* Hero Section with Featured Dataset */}
        {featuredDataset && (
          <div className="mb-12 relative overflow-hidden rounded-xl border border-[#4099B4]/30 bg-gradient-to-br from-black to-[#0A1A2F]">
            <div className="absolute inset-0 opacity-20">
              <Image
                src={featuredDataset.image || "/placeholder.svg"}
                alt={featuredDataset.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <Badge variant="outline" className="bg-[#4099B4]/20 text-[#4099B4] border-[#4099B4]/30 mb-2">
                  Featured Dataset
                </Badge>
                <h1 className="text-3xl font-bold">{featuredDataset.title}</h1>
                <p className="text-gray-300 max-w-2xl">{featuredDataset.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredDataset.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/10 hover:bg-white/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-2">
                  {getPrivacyBadge(featuredDataset.privacyTechnique)}
                  <Badge variant="outline" className="bg-[#4099B4]/20 text-[#4099B4] border-[#4099B4]/30">
                    <span className={getQualityScoreColor(featuredDataset.qualityScore)}>
                      {featuredDataset.qualityScore}% Quality
                    </span>
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#4099B4]">${featuredDataset.price}</div>
                  <div className="text-sm text-gray-400">{featuredDataset.size}</div>
                </div>
                <Link href={`/marketplace/${featuredDataset.id}`}>
                  <Button className="w-full bg-gradient-to-r from-[#4099B4] to-[#6C49AC] hover:opacity-90 text-white">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Privacy-Focused Dataset Marketplace</h2>
              <p className="text-muted-foreground">
                Discover and license datasets with privacy guarantees for your research and applications
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`${showFilters ? "bg-[#4099B4]/20 border-[#4099B4]/50" : ""}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {(selectedDataTypes.length > 0 ||
                  selectedDomains.length > 0 ||
                  selectedPrivacyTechniques.length > 0 ||
                  priceRange[0] > 0 ||
                  priceRange[1] < 5000 ||
                  minQualityScore > 0) && (
                  <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-center text-xs leading-5">
                    {selectedDataTypes.length +
                      selectedDomains.length +
                      selectedPrivacyTechniques.length +
                      (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0) +
                      (minQualityScore > 0 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
              <Tabs defaultValue="grid" className="hidden md:block">
                <TabsList>
                  <TabsTrigger value="grid" onClick={() => setViewMode("grid")}>
                    <Grid3X3 className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" onClick={() => setViewMode("list")}>
                    <List className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Sort
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortOption("newest")}>Newest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("price-low")}>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("price-high")}>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("quality")}>Quality Score</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search datasets by title, description, or tags..."
              className="pl-10 bg-background/60 backdrop-blur-sm border-border/40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="rounded-lg border border-[#4099B4]/30 bg-black/60 backdrop-blur-sm p-6 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Filter Datasets</h3>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Data Type Filter */}
                <div>
                  <h4 className="font-medium mb-3">Data Type</h4>
                  <ScrollArea className="h-40 rounded-md border p-2">
                    <div className="space-y-2 pr-3">
                      {dataTypes.map((dataType) => (
                        <div key={dataType} className="flex items-center space-x-2">
                          <Checkbox
                            id={`data-type-${dataType}`}
                            checked={selectedDataTypes.includes(dataType)}
                            onCheckedChange={() => toggleDataType(dataType)}
                          />
                          <label
                            htmlFor={`data-type-${dataType}`}
                            className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <span className="mr-2">{getDataTypeIcon(dataType)}</span>
                            {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Domain Filter */}
                <div>
                  <h4 className="font-medium mb-3">Domain</h4>
                  <ScrollArea className="h-40 rounded-md border p-2">
                    <div className="space-y-2 pr-3">
                      {domains.map((domain) => (
                        <div key={domain} className="flex items-center space-x-2">
                          <Checkbox
                            id={`domain-${domain}`}
                            checked={selectedDomains.includes(domain)}
                            onCheckedChange={() => toggleDomain(domain)}
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
                  </ScrollArea>
                </div>

                {/* Privacy Technique Filter */}
                <div>
                  <h4 className="font-medium mb-3">Privacy Technique</h4>
                  <ScrollArea className="h-40 rounded-md border p-2">
                    <div className="space-y-2 pr-3">
                      {privacyTechniques.map((technique) => (
                        <div key={technique} className="flex items-center space-x-2">
                          <Checkbox
                            id={`privacy-${technique}`}
                            checked={selectedPrivacyTechniques.includes(technique)}
                            onCheckedChange={() => togglePrivacyTechnique(technique)}
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
                  </ScrollArea>
                </div>

                <div className="space-y-6">
                  {/* Price Range Filter */}
                  <div>
                    <h4 className="font-medium mb-3">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </h4>
                    <Slider
                      defaultValue={[0, 5000]}
                      max={5000}
                      step={100}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                    />
                  </div>

                  {/* Quality Score Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Minimum Quality Score: {minQualityScore}%</h4>
                    <Slider
                      defaultValue={[0]}
                      max={100}
                      step={5}
                      value={[minQualityScore]}
                      onValueChange={(value) => setMinQualityScore(value[0])}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredDatasets.length} {filteredDatasets.length === 1 ? "dataset" : "datasets"}
          </div>

          {/* Dataset Grid/List */}
          {filteredDatasets.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDatasets.map((dataset) => (
                  <Link key={dataset.id} href={`/marketplace/${dataset.id}`} className="group">
                    <div className="h-full rounded-lg border border-[#4099B4]/30 bg-black/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#4099B4]/20 hover:border-[#4099B4]/50">
                      <div className="relative aspect-video">
                        <Image
                          src={dataset.image || "/placeholder.svg"}
                          alt={dataset.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute bottom-2 right-2 flex gap-1">
                          {getPrivacyBadge(dataset.privacyTechnique)}
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-[#4099B4] transition-colors">
                            {dataset.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className="font-mono bg-[#4099B4]/20 text-[#4099B4] border-[#4099B4]/30"
                          >
                            ${dataset.price}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{dataset.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {dataset.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {dataset.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{dataset.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                          <div className="flex items-center gap-1">
                            {getDataTypeIcon(dataset.dataType)}
                            <span>{dataset.dataType.charAt(0).toUpperCase() + dataset.dataType.slice(1)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={getQualityScoreColor(dataset.qualityScore)}>
                              {dataset.qualityScore}% Quality
                            </span>
                            <span>•</span>
                            <span>{formatDate(dataset.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDatasets.map((dataset) => (
                  <Link key={dataset.id} href={`/marketplace/${dataset.id}`} className="group">
                    <div className="rounded-lg border border-[#4099B4]/30 bg-black/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#4099B4]/20 hover:border-[#4099B4]/50">
                      <div className="p-4 flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={dataset.image || "/placeholder.svg"}
                            alt={dataset.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold text-lg line-clamp-1 group-hover:text-[#4099B4] transition-colors">
                              {dataset.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className="font-mono bg-[#4099B4]/20 text-[#4099B4] border-[#4099B4]/30"
                            >
                              ${dataset.price}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{dataset.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {dataset.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {dataset.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{dataset.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <div className="flex items-center gap-2">
                            {getPrivacyBadge(dataset.privacyTechnique)}
                            <Badge
                              variant="outline"
                              className={`bg-[#4099B4]/20 border-[#4099B4]/30 ${getQualityScoreColor(
                                dataset.qualityScore,
                              )}`}
                            >
                              {dataset.qualityScore}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              {getDataTypeIcon(dataset.dataType)}
                              <span className="ml-1">
                                {dataset.dataType.charAt(0).toUpperCase() + dataset.dataType.slice(1)}
                              </span>
                            </div>
                            <span>•</span>
                            <span>{formatDate(dataset.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-muted/20 p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-medium">No datasets found</h3>
              <p className="text-muted-foreground max-w-md">
                No datasets match your search criteria. Try adjusting your filters or search query.
              </p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
