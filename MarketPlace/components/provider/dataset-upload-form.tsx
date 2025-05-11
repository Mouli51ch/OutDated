"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, Plus, X, Lock, Shield, Coins, LockOpen } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"

export function DatasetUploadForm() {
  const router = useRouter()
  const { connected } = useWallet()
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [licenseType, setLicenseType] = useState<"open" | "restricted" | "commercial">("open")
  const [isUploading, setIsUploading] = useState(false)
  const [step, setStep] = useState(1)

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!connected) {
      toast.error("Please connect your wallet first")
      return
    }

    if (!file || !title || !price) {
      toast.error("Please fill all required fields")
      return
    }

    setIsUploading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Dataset uploaded successfully!")
      router.push("/marketplace")
    } catch (error) {
      toast.error("Failed to upload dataset")
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="border-border/40 backdrop-blur-sm bg-background/60">
      <CardHeader>
        <CardTitle>Upload Dataset</CardTitle>
        <CardDescription>Share your dataset with the community and earn SOL</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger
              value="upload"
              className={step >= 1 ? "data-[state=active]:bg-purple-500/20" : ""}
              onClick={() => setStep(1)}
            >
              Upload
            </TabsTrigger>
            <TabsTrigger
              value="configure"
              className={step >= 2 ? "data-[state=active]:bg-purple-500/20" : ""}
              onClick={() => setStep(2)}
              disabled={!file}
            >
              Configure
            </TabsTrigger>
            <TabsTrigger
              value="license"
              className={step >= 3 ? "data-[state=active]:bg-purple-500/20" : ""}
              onClick={() => setStep(3)}
              disabled={!title || !description}
            >
              License
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {file ? (
                <div className="space-y-2">
                  <div className="text-sm font-medium">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFile(null)
                    }}
                  >
                    Change File
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div className="text-sm font-medium">Drag and drop your file here or click to browse</div>
                  <div className="text-xs text-muted-foreground">
                    Supports CSV, JSON, and compressed archives (Max 10GB)
                  </div>
                </div>
              )}
              <Input type="file" className="hidden" id="file-upload" onChange={handleFileChange} />
            </div>

            {file && (
              <Button
                className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 text-white"
                onClick={() => setStep(2)}
              >
                Continue to Configure
              </Button>
            )}
          </TabsContent>

          <TabsContent value="configure" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Awesome Dataset"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your dataset..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag} disabled={!newTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {title && description && (
              <Button
                className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 text-white"
                onClick={() => setStep(3)}
              >
                Continue to License
              </Button>
            )}
          </TabsContent>

          <TabsContent value="license" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>License Type</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card
                    className={`cursor-pointer border-2 ${licenseType === "open" ? "border-green-500" : "border-transparent"}`}
                    onClick={() => setLicenseType("open")}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <LockOpen className="mr-2 h-4 w-4 text-green-400" />
                        Open
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Anyone can access and use the dataset freely
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer border-2 ${licenseType === "restricted" ? "border-yellow-500" : "border-transparent"}`}
                    onClick={() => setLicenseType("restricted")}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <Lock className="mr-2 h-4 w-4 text-yellow-400" />
                        Restricted
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Limited access with specific usage conditions
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer border-2 ${licenseType === "commercial" ? "border-blue-500" : "border-transparent"}`}
                    onClick={() => setLicenseType("commercial")}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <Coins className="mr-2 h-4 w-4 text-blue-400" />
                        Commercial
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      Paid license for commercial use cases
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (SOL) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="1.5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center">
                  <Shield className="mr-2 h-4 w-4 text-green-400" />
                  Privacy Protection
                </Label>
                <div className="text-sm text-muted-foreground mb-2">
                  Your dataset will be automatically processed with differential privacy to protect sensitive
                  information
                </div>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 text-white"
              disabled={isUploading || !price}
            >
              {isUploading ? "Uploading..." : "Upload Dataset"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
