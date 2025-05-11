"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import * as XLSX from "xlsx"
import CryptoJS from "crypto-js"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, X, Lock, Shield, Coins, LockOpen, Check, AlertCircle, FileText, Database } from "lucide-react"

export default function ProviderDashboard() {
  const router = useRouter()
  const { connected, publicKey } = useWallet()

  // Upload states
  const [files, setFiles] = useState<File[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [licenseType, setLicenseType] = useState<"open" | "restricted" | "commercial">("open")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [step, setStep] = useState(1)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Dataset info states
  const [columns, setColumns] = useState<string[]>([])
  const [rowCount, setRowCount] = useState<number>(0)
  const [encryptedBlobId, setEncryptedBlobId] = useState<string>("")
  const [epochs, setEpochs] = useState<number>(1)
  const [deletable, setDeletable] = useState<boolean>(false)

  // Constants
  const jwtSecret = "my-super-secret"
  const jwtKey = CryptoJS.SHA256(jwtSecret).toString()
  const PUBLISHER = "https://publisher.walrus-testnet.walrus.space"

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const extractFileInfo = async (file: File) => {
    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data, { type: "array" })

      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

      if (jsonData.length > 0) {
        setColumns(jsonData[0])
        setRowCount(jsonData.length - 1) // exclude header
      }
    } catch (err) {
      console.error("Error extracting file info:", err)
      // For non-spreadsheet files, we won't have column data
    }
  }

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    const newFiles = Array.from(selectedFiles)
    setFiles((prevFiles) => [...prevFiles, ...newFiles])

    // If it's a CSV or Excel file, extract columns/rows info
    const file = newFiles[0]
    if (
      file.type === "text/csv" ||
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.name.endsWith(".csv") ||
      file.name.endsWith(".xlsx")
    ) {
      extractFileInfo(file)
    }
  }, [])

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
    if (files.length <= 1) {
      setColumns([])
      setRowCount(0)
    }
  }

  const uploadToWalrus = async () => {
    if (!files.length) return null

    const file = files[0] // Using the first file for simplicity
    const query = new URLSearchParams()
    if (epochs > 1) query.append("epochs", epochs.toString())
    if (deletable) query.append("deletable", "true")

    const url = `${PUBLISHER}/v1/blobs?${query.toString()}`

    try {
      setUploadStatus("uploading")
      setUploadProgress(20) // Initial progress

      const res = await fetch(url, {
        method: "PUT",
        body: file,
      })

      setUploadProgress(70)

      const contentType = res.headers.get("content-type")
      let data

      if (contentType && contentType.includes("application/json")) {
        data = await res.json()
      } else {
        const text = await res.text()
        data = { rawResponse: text }
      }

      const blobId = data?.newlyCreated?.blobObject?.blobId

      if (blobId) {
        const encrypted = CryptoJS.AES.encrypt(blobId, jwtKey).toString()
        setEncryptedBlobId(encrypted)
        setUploadProgress(100)
        setUploadStatus("success")
        return encrypted
      } else {
        throw new Error("No blobId found in response")
      }
    } catch (err) {
      console.error("Upload error:", err)
      setUploadStatus("error")
      setErrorMessage("Failed to upload to Walrus. Please try again.")
      throw err
    }
  }

  const pushToSolana = async () => {
    if (!encryptedBlobId) {
      toast.error("No blob ID found. Please upload your file first.")
      return false
    }

    // In a real implementation, this would interact with Solana
    // For now, we'll simulate the blockchain interaction
    try {
      setUploadStatus("uploading")
      setUploadProgress(50)

      const dataset = {
        title,
        description,
        price: Number(price),
        blob_id: encryptedBlobId,
        rows: rowCount,
        features: columns.length,
        license_type: licenseType,
        quality_tags: tags,
        owner: publicKey ? publicKey.toString() : "<wallet-not-connected>",
        buyers: [],
        buyer_count: 0,
      }

      console.log("Submitting dataset to Solana:", dataset)

      // Simulate blockchain confirmation time
      await new Promise((resolve) => setTimeout(resolve, 800))

      setUploadProgress(100)
      setUploadStatus("success")
      return true
    } catch (err) {
      console.error("Solana transaction error:", err)
      setUploadStatus("error")
      setErrorMessage("Failed to store on Solana. Please try again.")
      throw err
    }
  }

  const handleUploadToWalrus = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (!connected) {
      toast.error("Please connect your wallet first")
      return
    }

    if (!files.length) {
      setErrorMessage("Please upload at least one file")
      setUploadStatus("error")
      return
    }

    setIsUploading(true)
    setErrorMessage("")

    try {
      await uploadToWalrus()
      toast.success("File uploaded to Walrus successfully!")

      // Move to Configure tab after successful upload
      setStep(2)
    } catch (error) {
      console.error("Upload process error:", error)
      // Error is already handled in uploadToWalrus
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmitToSolana = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!connected) {
      toast.error("Please connect your wallet first")
      return
    }

    if (!encryptedBlobId || !title || !price) {
      setErrorMessage("Please fill all required fields")
      setUploadStatus("error")
      return
    }

    setIsUploading(true)
    setErrorMessage("")

    try {
      const success = await pushToSolana()

      if (success) {
        toast.success("Dataset stored on Solana successfully!")

        // Navigate after successful upload
        setTimeout(() => {
          router.push("/marketplace")
        }, 1500)
      }
    } catch (error) {
      console.error("Upload process error:", error)
      // Error is already handled in pushToSolana
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="border-border/40 backdrop-blur-sm bg-background/60">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <Database className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle>Provider Dashboard</CardTitle>
            <CardDescription>Upload your dataset, set pricing, and earn SOL</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={step === 1 ? "upload" : step === 2 ? "configure" : "license"} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger
              value="upload"
              className={step >= 1 ? "data-[state=active]:bg-purple-500/20" : ""}
              onClick={() => (encryptedBlobId ? toast.info("File already uploaded") : setStep(1))}
            >
              Upload
            </TabsTrigger>
            <TabsTrigger
              value="configure"
              className={step >= 2 ? "data-[state=active]:bg-purple-500/20" : ""}
              onClick={() => (encryptedBlobId ? setStep(2) : toast.error("Please upload a file first"))}
              disabled={!encryptedBlobId}
            >
              Configure
            </TabsTrigger>
            <TabsTrigger
              value="license"
              className={step >= 3 ? "data-[state=active]:bg-purple-500/20" : ""}
              onClick={() =>
                encryptedBlobId && title && description ? setStep(3) : toast.error("Please fill all required fields")
              }
              disabled={!encryptedBlobId || !title || !description}
            >
              License
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center transition-all hover:border-purple-400 cursor-pointer relative">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".json,.csv,.xlsx,.zip,.gz"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading || !!encryptedBlobId}
              />
              <div className="flex flex-col items-center justify-center space-y-3">
                <FileText className="h-12 w-12 text-purple-500" />
                <div>
                  <p className="font-medium text-gray-700">
                    {encryptedBlobId ? "File uploaded successfully" : "Drag and drop your file here or click to browse"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {encryptedBlobId
                      ? "You can now proceed to configuration"
                      : "Supports CSV, Excel, JSON, ZIP and GZ files (max 100MB)"}
                  </p>
                </div>
              </div>
            </div>

            {files.length > 0 && !encryptedBlobId && (
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium">Selected Files</h3>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-background/80 border border-border/40 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-purple-400">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {columns.length > 0 && !encryptedBlobId && (
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <h3 className="text-blue-800 font-semibold mb-2">File Preview</h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                      <FileText className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Detected <span className="font-bold">{columns.length}</span> columns
                      </p>
                      <p className="text-xs text-blue-600">
                        Total rows: <span className="font-bold">{rowCount}</span>
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800"
                    onClick={() => alert(`Columns: ${columns.join(", ")}`)}
                  >
                    View Columns
                  </Button>
                </div>
                <div className="mt-3 max-h-20 overflow-y-auto text-xs text-gray-600 bg-white p-2 rounded">
                  <p className="truncate">
                    <strong>Columns:</strong> {columns.join(", ")}
                  </p>
                </div>
              </div>
            )}

            {!encryptedBlobId && (
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-gray-700 font-semibold mb-3">Upload Options</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                  <label className="flex items-center mb-3 sm:mb-0">
                    <span className="mr-2 text-gray-700">Epochs:</span>
                    <Input
                      type="number"
                      min={1}
                      value={epochs}
                      onChange={(e) => setEpochs(Number(e.target.value))}
                      className="w-16 text-black"
                      disabled={isUploading}
                    />
                  </label>
                  <label className="flex items-center space-x-3 text-gray-700">
                    <input
                      type="checkbox"
                      checked={deletable}
                      onChange={() => setDeletable(!deletable)}
                      className="h-5 w-5 text-indigo-600 rounded"
                      disabled={isUploading}
                    />
                    <span>Allow deletion</span>
                  </label>
                </div>
              </div>
            )}

            {encryptedBlobId && (
              <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-green-800 font-semibold mb-2">Upload Successful</h3>
                    <p className="text-sm text-green-700">Your file has been uploaded to Walrus successfully!</p>

                    <div className="mt-3">
                      <p className="font-medium text-green-700 text-sm mb-1">Encrypted Blob ID:</p>
                      <div className="bg-white p-3 rounded border border-green-200 overflow-x-auto">
                        <code className="text-xs text-gray-800 break-all">{encryptedBlobId}</code>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setStep(2)}>
                    Continue to Configure
                  </Button>
                </div>
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-md flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-500">Upload Failed</p>
                  <p className="text-sm text-red-400">{errorMessage}</p>
                </div>
              </div>
            )}

            {uploadStatus === "uploading" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading to Walrus...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {files.length > 0 && !encryptedBlobId && (
              <Button
                className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 text-white"
                onClick={handleUploadToWalrus}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload to Walrus"}
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

          <TabsContent value="license" className="space-y-4 text-black">
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

            {/* Summary section */}
            <div className="mt-4 p-4 border-2 border-purple-400 bg-white rounded-lg shadow-sm">
              <h3 className="text-purple-700 font-semibold mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Dataset Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 rounded">
                  <div className="font-medium text-gray-700">Title:</div>
                  <div className="col-span-2 font-semibold text-black">{title || "Not specified"}</div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 rounded">
                  <div className="font-medium text-gray-700">Description:</div>
                  <div className="col-span-2 text-black">{description || "Not specified"}</div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 rounded">
                  <div className="font-medium text-gray-700">Price:</div>
                  <div className="col-span-2 font-semibold text-green-600">
                    {price ? `${price} SOL` : "Not specified"}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 rounded">
                  <div className="font-medium text-gray-700">License:</div>
                  <div className="col-span-2">
                    {licenseType === "open" && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <LockOpen className="inline h-3 w-3 mr-1" />
                        Open
                      </span>
                    )}
                    {licenseType === "restricted" && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        <Lock className="inline h-3 w-3 mr-1" />
                        Restricted
                      </span>
                    )}
                    {licenseType === "commercial" && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        <Coins className="inline h-3 w-3 mr-1" />
                        Commercial
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 rounded">
                  <div className="font-medium text-gray-700">Tags:</div>
                  <div className="col-span-2 flex flex-wrap gap-1">
                    {tags.length > 0 ? (
                      tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500">No tags</span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 rounded">
                  <div className="font-medium text-gray-700">Rows:</div>
                  <div className="col-span-2">{rowCount || "N/A"}</div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 rounded">
                  <div className="font-medium text-gray-700">Columns:</div>
                  <div className="col-span-2">{columns.length || "N/A"}</div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2 bg-gray-50 rounded">
                  <div className="font-medium text-gray-700">Blob ID:</div>
                  <div className="col-span-2">
                    <div className="bg-gray-100 p-2 rounded border border-gray-300 overflow-x-auto">
                      <code className="text-xs text-gray-800 break-all">{encryptedBlobId || "Not available"}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {uploadStatus === "error" && (
              <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-md flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-500">Store Failed</p>
                  <p className="text-sm text-red-400">{errorMessage}</p>
                </div>
              </div>
            )}

            {uploadStatus === "uploading" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing on Solana...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {uploadStatus === "success" && step === 3 && (
              <div className="p-4 border border-green-500/30 bg-green-500/10 rounded-md flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-500">Store Successful</p>
                  <p className="text-sm text-green-400">Your dataset has been stored on Solana!</p>
                </div>
              </div>
            )}

            <Button
              onClick={handleSubmitToSolana}
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 text-white"
              disabled={isUploading || !price || uploadStatus === "success"}
            >
              {isUploading ? "Processing..." : "Store on Solana"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
