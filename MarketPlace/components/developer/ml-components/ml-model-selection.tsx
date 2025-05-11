"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { FileUpload } from "@/components/ui/file-upload"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import type { ModelConfig } from "../ml-model-training"
import { Brain, Cpu, GitBranch, Code } from "lucide-react"
import { toast } from "sonner"

interface MLModelSelectionProps {
  modelConfig: ModelConfig
  setModelConfig: (config: ModelConfig) => void
}

export function MLModelSelection({ modelConfig, setModelConfig }: MLModelSelectionProps) {
  const [modelSource, setModelSource] = useState<"prebuilt" | "custom">("prebuilt")

  const handleModelTypeChange = (value: string) => {
    setModelConfig({
      ...modelConfig,
      modelType: value,
    })
  }

  const handleArchitectureChange = (value: string) => {
    setModelConfig({
      ...modelConfig,
      architecture: value,
    })
  }

  const handleFrameworkChange = (value: string) => {
    setModelConfig({
      ...modelConfig,
      framework: value,
    })
  }

  const handleCustomModelUpload = (files: File[]) => {
    if (files.length > 0) {
      setModelConfig({
        ...modelConfig,
        customModel: files[0],
      })
      toast.success("Custom model uploaded successfully")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Model Type</Label>
        <RadioGroup
          value={modelConfig.modelType}
          onValueChange={handleModelTypeChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Card className="border-[#00F6FF]/20 bg-black/40 cursor-pointer relative overflow-hidden group">
            <CardContent className="pt-6 pb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F6FF]/5 to-[#9D00FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <RadioGroupItem
                value="classification"
                id="classification"
                className="absolute right-4 top-4 border-[#00F6FF] text-[#00F6FF]"
              />
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-[#00F6FF]" />
                  <h3 className="text-lg font-medium">Classification</h3>
                </div>
                <p className="text-sm text-gray-400">Models that categorize data into predefined classes or labels</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-[#00F6FF]/10 text-[#00F6FF] text-xs rounded-full">
                    Image Classification
                  </span>
                  <span className="px-2 py-1 bg-[#00F6FF]/10 text-[#00F6FF] text-xs rounded-full">
                    Sentiment Analysis
                  </span>
                  <span className="px-2 py-1 bg-[#00F6FF]/10 text-[#00F6FF] text-xs rounded-full">Fraud Detection</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#00F6FF]/20 bg-black/40 cursor-pointer relative overflow-hidden group">
            <CardContent className="pt-6 pb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F6FF]/5 to-[#9D00FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <RadioGroupItem
                value="regression"
                id="regression"
                className="absolute right-4 top-4 border-[#00F6FF] text-[#00F6FF]"
              />
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <GitBranch className="h-5 w-5 text-[#9D00FF]" />
                  <h3 className="text-lg font-medium">Regression</h3>
                </div>
                <p className="text-sm text-gray-400">Models that predict continuous numerical values</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-[#9D00FF]/10 text-[#9D00FF] text-xs rounded-full">
                    Price Prediction
                  </span>
                  <span className="px-2 py-1 bg-[#9D00FF]/10 text-[#9D00FF] text-xs rounded-full">
                    Sales Forecasting
                  </span>
                  <span className="px-2 py-1 bg-[#9D00FF]/10 text-[#9D00FF] text-xs rounded-full">
                    Demand Estimation
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#00F6FF]/20 bg-black/40 cursor-pointer relative overflow-hidden group">
            <CardContent className="pt-6 pb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F6FF]/5 to-[#9D00FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <RadioGroupItem
                value="clustering"
                id="clustering"
                className="absolute right-4 top-4 border-[#00F6FF] text-[#00F6FF]"
              />
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5 text-[#00F6FF]" />
                  <h3 className="text-lg font-medium">Clustering</h3>
                </div>
                <p className="text-sm text-gray-400">Models that group similar data points together</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-[#00F6FF]/10 text-[#00F6FF] text-xs rounded-full">
                    Customer Segmentation
                  </span>
                  <span className="px-2 py-1 bg-[#00F6FF]/10 text-[#00F6FF] text-xs rounded-full">
                    Anomaly Detection
                  </span>
                  <span className="px-2 py-1 bg-[#00F6FF]/10 text-[#00F6FF] text-xs rounded-full">
                    Document Clustering
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#00F6FF]/20 bg-black/40 cursor-pointer relative overflow-hidden group">
            <CardContent className="pt-6 pb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F6FF]/5 to-[#9D00FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <RadioGroupItem
                value="timeseries"
                id="timeseries"
                className="absolute right-4 top-4 border-[#00F6FF] text-[#00F6FF]"
              />
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-[#9D00FF]" />
                  <h3 className="text-lg font-medium">Time Series</h3>
                </div>
                <p className="text-sm text-gray-400">Models that analyze and predict sequential data over time</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-[#9D00FF]/10 text-[#9D00FF] text-xs rounded-full">
                    Stock Prediction
                  </span>
                  <span className="px-2 py-1 bg-[#9D00FF]/10 text-[#9D00FF] text-xs rounded-full">
                    Weather Forecasting
                  </span>
                  <span className="px-2 py-1 bg-[#9D00FF]/10 text-[#9D00FF] text-xs rounded-full">Demand Planning</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Model Source</Label>
          <div className="flex items-center space-x-2">
            <Label htmlFor="model-source" className="text-sm text-gray-400">
              Use Custom Model
            </Label>
            <Switch
              id="model-source"
              checked={modelSource === "custom"}
              onCheckedChange={(checked) => setModelSource(checked ? "custom" : "prebuilt")}
              className="data-[state=checked]:bg-[#9D00FF]"
            />
          </div>
        </div>

        <Tabs value={modelSource} className="w-full">
          <TabsContent value="prebuilt" className="mt-0">
            <Card className="border-[#00F6FF]/20 bg-black/40">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="architecture">Model Architecture</Label>
                    <Select value={modelConfig.architecture} onValueChange={handleArchitectureChange}>
                      <SelectTrigger
                        id="architecture"
                        className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                      >
                        <SelectValue placeholder="Select architecture" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#00F6FF]/20">
                        {modelConfig.modelType === "classification" && (
                          <>
                            <SelectItem value="resnet">ResNet (Images)</SelectItem>
                            <SelectItem value="bert">BERT (Text)</SelectItem>
                            <SelectItem value="xgboost">XGBoost (Tabular)</SelectItem>
                            <SelectItem value="randomforest">Random Forest (Tabular)</SelectItem>
                          </>
                        )}
                        {modelConfig.modelType === "regression" && (
                          <>
                            <SelectItem value="linear">Linear Regression</SelectItem>
                            <SelectItem value="ridge">Ridge Regression</SelectItem>
                            <SelectItem value="lasso">Lasso Regression</SelectItem>
                            <SelectItem value="elasticnet">Elastic Net</SelectItem>
                          </>
                        )}
                        {modelConfig.modelType === "clustering" && (
                          <>
                            <SelectItem value="kmeans">K-Means</SelectItem>
                            <SelectItem value="dbscan">DBSCAN</SelectItem>
                            <SelectItem value="hierarchical">Hierarchical Clustering</SelectItem>
                            <SelectItem value="gmm">Gaussian Mixture Models</SelectItem>
                          </>
                        )}
                        {modelConfig.modelType === "timeseries" && (
                          <>
                            <SelectItem value="arima">ARIMA</SelectItem>
                            <SelectItem value="prophet">Prophet</SelectItem>
                            <SelectItem value="lstm">LSTM</SelectItem>
                            <SelectItem value="gru">GRU</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="framework">Framework</Label>
                    <Select value={modelConfig.framework} onValueChange={handleFrameworkChange}>
                      <SelectTrigger
                        id="framework"
                        className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                      >
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#00F6FF]/20">
                        <SelectItem value="pytorch">PyTorch</SelectItem>
                        <SelectItem value="tensorflow">TensorFlow</SelectItem>
                        <SelectItem value="sklearn">Scikit-Learn</SelectItem>
                        <SelectItem value="xgboost">XGBoost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model-description">Model Description (Optional)</Label>
                  <Input
                    id="model-description"
                    placeholder="Enter a description for this model"
                    className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="mt-0">
            <Card className="border-[#00F6FF]/20 bg-black/40">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Upload Custom Model</Label>
                    <p className="text-sm text-gray-400">
                      Upload your pre-trained model files (.h5, .pt, .pkl, or .zip)
                    </p>
                  </div>

                  <FileUpload
                    onChange={handleCustomModelUpload}
                    accept={{
                      "application/octet-stream": [".h5", ".pt", ".pkl"],
                      "application/zip": [".zip"],
                      "text/plain": [".txt"],
                    }}
                    maxSize={500 * 1024 * 1024} // 500MB
                  />

                  {modelConfig.customModel && (
                    <div className="p-3 rounded-md bg-[#9D00FF]/10 border border-[#9D00FF]/20">
                      <p className="text-sm font-medium text-white">
                        Custom model uploaded: {modelConfig.customModel.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(modelConfig.customModel.size / (1024 * 1024)).toFixed(2)} MB • Uploaded{" "}
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
