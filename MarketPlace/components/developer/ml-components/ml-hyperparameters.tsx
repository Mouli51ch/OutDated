"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import type { HyperParameters } from "../ml-model-training"
import { Sliders, Zap, BarChart4, GitMerge } from "lucide-react"

interface MLHyperparametersProps {
  hyperParameters: HyperParameters
  setHyperParameters: (params: HyperParameters) => void
  modelType: string
}

export function MLHyperparameters({ hyperParameters, setHyperParameters, modelType }: MLHyperparametersProps) {
  const handleLearningRateChange = (value: number[]) => {
    setHyperParameters({
      ...hyperParameters,
      learningRate: value[0],
    })
  }

  const handleBatchSizeChange = (value: number[]) => {
    setHyperParameters({
      ...hyperParameters,
      batchSize: value[0],
    })
  }

  const handleEpochsChange = (value: number[]) => {
    setHyperParameters({
      ...hyperParameters,
      epochs: value[0],
    })
  }

  const handleOptimizerChange = (value: string) => {
    setHyperParameters({
      ...hyperParameters,
      optimizer: value,
    })
  }

  const handleRegularizationChange = (value: number[]) => {
    setHyperParameters({
      ...hyperParameters,
      regularization: value[0],
    })
  }

  const handleDropoutRateChange = (value: number[]) => {
    setHyperParameters({
      ...hyperParameters,
      dropoutRate: value[0],
    })
  }

  const handleEarlyStoppingPatienceChange = (value: number[]) => {
    setHyperParameters({
      ...hyperParameters,
      earlyStoppingPatience: value[0],
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#00F6FF]/20 bg-black/40">
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center space-x-3">
              <Sliders className="h-5 w-5 text-[#00F6FF]" />
              <h3 className="text-lg font-medium">Training Parameters</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="learning-rate">Learning Rate: {hyperParameters.learningRate.toExponential(2)}</Label>
                </div>
                <Slider
                  id="learning-rate"
                  min={0.0001}
                  max={0.1}
                  step={0.0001}
                  value={[hyperParameters.learningRate]}
                  onValueChange={handleLearningRateChange}
                  className="[&>span]:bg-[#00F6FF]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="batch-size">Batch Size: {hyperParameters.batchSize}</Label>
                </div>
                <Slider
                  id="batch-size"
                  min={1}
                  max={256}
                  step={1}
                  value={[hyperParameters.batchSize]}
                  onValueChange={handleBatchSizeChange}
                  className="[&>span]:bg-[#00F6FF]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="epochs">Epochs: {hyperParameters.epochs}</Label>
                </div>
                <Slider
                  id="epochs"
                  min={1}
                  max={100}
                  step={1}
                  value={[hyperParameters.epochs]}
                  onValueChange={handleEpochsChange}
                  className="[&>span]:bg-[#00F6FF]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="optimizer">Optimizer</Label>
                <Select value={hyperParameters.optimizer} onValueChange={handleOptimizerChange}>
                  <SelectTrigger
                    id="optimizer"
                    className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                  >
                    <SelectValue placeholder="Select optimizer" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#00F6FF]/20">
                    <SelectItem value="adam">Adam</SelectItem>
                    <SelectItem value="sgd">SGD</SelectItem>
                    <SelectItem value="rmsprop">RMSprop</SelectItem>
                    <SelectItem value="adagrad">Adagrad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#00F6FF]/20 bg-black/40">
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-[#9D00FF]" />
              <h3 className="text-lg font-medium">Regularization & Control</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="regularization">
                    L2 Regularization: {hyperParameters.regularization.toExponential(2)}
                  </Label>
                </div>
                <Slider
                  id="regularization"
                  min={0.00001}
                  max={0.01}
                  step={0.00001}
                  value={[hyperParameters.regularization]}
                  onValueChange={handleRegularizationChange}
                  className="[&>span]:bg-[#9D00FF]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="dropout-rate">Dropout Rate: {hyperParameters.dropoutRate.toFixed(2)}</Label>
                </div>
                <Slider
                  id="dropout-rate"
                  min={0}
                  max={0.5}
                  step={0.01}
                  value={[hyperParameters.dropoutRate]}
                  onValueChange={handleDropoutRateChange}
                  className="[&>span]:bg-[#9D00FF]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="early-stopping">
                    Early Stopping Patience: {hyperParameters.earlyStoppingPatience}
                  </Label>
                </div>
                <Slider
                  id="early-stopping"
                  min={1}
                  max={20}
                  step={1}
                  value={[hyperParameters.earlyStoppingPatience]}
                  onValueChange={handleEarlyStoppingPatienceChange}
                  className="[&>span]:bg-[#9D00FF]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="use-augmentation" className="cursor-pointer">
                    Use Data Augmentation
                  </Label>
                  <Switch id="use-augmentation" className="data-[state=checked]:bg-[#9D00FF]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#00F6FF]/20 bg-black/40">
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center space-x-3">
            <BarChart4 className="h-5 w-5 text-[#00F6FF]" />
            <h3 className="text-lg font-medium">Model-Specific Parameters</h3>
          </div>

          <div className="space-y-4">
            {modelType === "classification" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class-weights">Class Weights</Label>
                  <Select defaultValue="balanced">
                    <SelectTrigger
                      id="class-weights"
                      className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                    >
                      <SelectValue placeholder="Select class weights" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#00F6FF]/20">
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loss-function">Loss Function</Label>
                  <Select defaultValue="categorical_crossentropy">
                    <SelectTrigger
                      id="loss-function"
                      className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                    >
                      <SelectValue placeholder="Select loss function" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#00F6FF]/20">
                      <SelectItem value="categorical_crossentropy">Categorical Cross-Entropy</SelectItem>
                      <SelectItem value="binary_crossentropy">Binary Cross-Entropy</SelectItem>
                      <SelectItem value="focal_loss">Focal Loss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {modelType === "regression" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loss-function">Loss Function</Label>
                  <Select defaultValue="mse">
                    <SelectTrigger
                      id="loss-function"
                      className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                    >
                      <SelectValue placeholder="Select loss function" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#00F6FF]/20">
                      <SelectItem value="mse">Mean Squared Error</SelectItem>
                      <SelectItem value="mae">Mean Absolute Error</SelectItem>
                      <SelectItem value="huber">Huber Loss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="normalization">Feature Normalization</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger
                      id="normalization"
                      className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                    >
                      <SelectValue placeholder="Select normalization" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#00F6FF]/20">
                      <SelectItem value="standard">Standard Scaler</SelectItem>
                      <SelectItem value="minmax">Min-Max Scaler</SelectItem>
                      <SelectItem value="robust">Robust Scaler</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {modelType === "clustering" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="n-clusters">Number of Clusters</Label>
                  <Input
                    id="n-clusters"
                    type="number"
                    defaultValue="5"
                    min="2"
                    max="100"
                    className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="distance-metric">Distance Metric</Label>
                  <Select defaultValue="euclidean">
                    <SelectTrigger
                      id="distance-metric"
                      className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                    >
                      <SelectValue placeholder="Select distance metric" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#00F6FF]/20">
                      <SelectItem value="euclidean">Euclidean</SelectItem>
                      <SelectItem value="manhattan">Manhattan</SelectItem>
                      <SelectItem value="cosine">Cosine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {modelType === "timeseries" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sequence-length">Sequence Length</Label>
                  <Input
                    id="sequence-length"
                    type="number"
                    defaultValue="10"
                    min="1"
                    max="100"
                    className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="forecast-horizon">Forecast Horizon</Label>
                  <Input
                    id="forecast-horizon"
                    type="number"
                    defaultValue="5"
                    min="1"
                    max="50"
                    className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#00F6FF]/20 bg-black/40">
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center space-x-3">
            <GitMerge className="h-5 w-5 text-[#9D00FF]" />
            <h3 className="text-lg font-medium">Advanced Settings</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="use-mixed-precision" className="cursor-pointer">
                  Mixed Precision Training
                </Label>
                <Switch id="use-mixed-precision" defaultChecked className="data-[state=checked]:bg-[#9D00FF]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="use-checkpointing" className="cursor-pointer">
                  Model Checkpointing
                </Label>
                <Switch id="use-checkpointing" defaultChecked className="data-[state=checked]:bg-[#9D00FF]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="use-tensorboard" className="cursor-pointer">
                  TensorBoard Logging
                </Label>
                <Switch id="use-tensorboard" defaultChecked className="data-[state=checked]:bg-[#9D00FF]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
