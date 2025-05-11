"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/ui/file-upload"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, FileType, Database, FileText, BarChart } from "lucide-react"
import { toast } from "sonner"

interface MLDataUploadProps {
  datasets: File[]
  setDatasets: (datasets: File[]) => void
}

export function MLDataUpload({ datasets, setDatasets }: MLDataUploadProps) {
  const [datasetType, setDatasetType] = useState<string>("tabular")
  const [splitRatio, setSplitRatio] = useState<string>("70-15-15")

  const handleDatasetUpload = (files: File[]) => {
    // Check file types based on dataset type
    const validFiles = files.filter((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase()
      if (datasetType === "tabular" && ["csv", "xlsx", "json"].includes(ext || "")) {
        return true
      } else if (datasetType === "image" && ["jpg", "jpeg", "png", "zip"].includes(ext || "")) {
        return true
      } else if (datasetType === "text" && ["txt", "csv", "json"].includes(ext || "")) {
        return true
      } else if (datasetType === "timeseries" && ["csv", "json"].includes(ext || "")) {
        return true
      }
      toast.error(`File type .${ext} is not supported for ${datasetType} datasets`)
      return false
    })

    if (validFiles.length > 0) {
      setDatasets([...datasets, ...validFiles])
      toast.success(`${validFiles.length} dataset(s) added successfully`)
    }
  }

  const removeDataset = (index: number) => {
    const newDatasets = [...datasets]
    newDatasets.splice(index, 1)
    setDatasets(newDatasets)
    toast.info("Dataset removed")
  }

  const getFileIcon = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase()
    if (["csv", "xlsx"].includes(ext || "")) return <FileText className="h-4 w-4 text-[#00F6FF]" />
    if (["jpg", "jpeg", "png"].includes(ext || "")) return <FileType className="h-4 w-4 text-[#9D00FF]" />
    if (["json"].includes(ext || "")) return <Database className="h-4 w-4 text-[#00F6FF]" />
    if (["txt"].includes(ext || "")) return <FileText className="h-4 w-4 text-[#00F6FF]" />
    return <BarChart className="h-4 w-4 text-[#00F6FF]" />
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="dataset-type">Dataset Type</Label>
          <Select value={datasetType} onValueChange={setDatasetType}>
            <SelectTrigger
              id="dataset-type"
              className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
            >
              <SelectValue placeholder="Select dataset type" />
            </SelectTrigger>
            <SelectContent className="bg-black border-[#00F6FF]/20">
              <SelectItem value="tabular">Tabular Data (CSV, Excel, JSON)</SelectItem>
              <SelectItem value="image">Image Data (JPG, PNG, ZIP)</SelectItem>
              <SelectItem value="text">Text Data (TXT, CSV, JSON)</SelectItem>
              <SelectItem value="timeseries">Time Series Data (CSV, JSON)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="split-ratio">Train/Validation/Test Split</Label>
          <Select value={splitRatio} onValueChange={setSplitRatio}>
            <SelectTrigger id="split-ratio" className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30">
              <SelectValue placeholder="Select split ratio" />
            </SelectTrigger>
            <SelectContent className="bg-black border-[#00F6FF]/20">
              <SelectItem value="70-15-15">70% / 15% / 15% (Recommended)</SelectItem>
              <SelectItem value="80-10-10">80% / 10% / 10%</SelectItem>
              <SelectItem value="60-20-20">60% / 20% / 20%</SelectItem>
              <SelectItem value="custom">Custom Split</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-[#00F6FF]/20 bg-black/40">
        <CardContent className="pt-6">
          <FileUpload
            onChange={handleDatasetUpload}
            accept={{
              "text/csv": [".csv"],
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
              "application/json": [".json"],
              "image/jpeg": [".jpg", ".jpeg"],
              "image/png": [".png"],
              "application/zip": [".zip"],
              "text/plain": [".txt"],
            }}
            maxSize={100 * 1024 * 1024} // 100MB
          />
        </CardContent>
      </Card>

      {datasets.length > 0 && (
        <div className="space-y-3">
          <Label>Uploaded Datasets ({datasets.length})</Label>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {datasets.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 rounded-md bg-black border border-[#00F6FF]/20"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="text-sm font-medium text-white">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Uploaded {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-[#00F6FF]/10 text-[#00F6FF] border-[#00F6FF]/30">
                    {file.name.split(".").pop()?.toUpperCase()}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDataset(index)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
