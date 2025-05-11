"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@solana/wallet-adapter-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { mockDatasets } from "@/lib/mock-data"
import { Database, Lock, Shield, Cpu } from "lucide-react"

export function ModelTrainingForm() {
  const router = useRouter()
  const { connected } = useWallet()
  const [datasetId, setDatasetId] = useState("")
  const [modelType, setModelType] = useState("")
  const [epochs, setEpochs] = useState(10)
  const [teeEnabled, setTeeEnabled] = useState(true)
  const [dpEnabled, setDpEnabled] = useState(true)
  const [training, setTraining] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState<"config" | "training" | "complete">("config")
  const [outputUrl, setOutputUrl] = useState("")

  const handleStartTraining = async () => {
    if (!connected) {
      toast.error("Please connect your wallet first")
      return
    }

    if (!datasetId || !modelType) {
      toast.error("Please select a dataset and model type")
      return
    }

    setTraining(true)
    setStep("training")
    setProgress(0)

    try {
      // Simulate training progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setStep("complete")
            setOutputUrl("ipfs://QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco")
            return 100
          }
          return prev + 5
        })
      }, 500)
    } catch (error) {
      toast.error("Training failed")
      console.error(error)
      setTraining(false)
      setStep("config")
    }
  }

  return (
    <Card className="border-border/40 backdrop-blur-sm bg-background/60">
      <CardHeader>
        <CardTitle>Secure Model Training</CardTitle>
        <CardDescription>Train AI models on encrypted datasets using secure computing</CardDescription>
      </CardHeader>
      <CardContent>
        {step === "config" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="dataset">Dataset</Label>
              <Select value={datasetId} onValueChange={setDatasetId}>
                <SelectTrigger id="dataset">
                  <SelectValue placeholder="Select a dataset" />
                </SelectTrigger>
                <SelectContent>
                  {mockDatasets.map((dataset) => (
                    <SelectItem key={dataset.id} value={dataset.id}>
                      {dataset.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="model">Model Type</Label>
              <Select value={modelType} onValueChange={setModelType}>
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select a model type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resnet50">ResNet50 (Computer Vision)</SelectItem>
                  <SelectItem value="bert">BERT (NLP)</SelectItem>
                  <SelectItem value="unet">UNet (Image Segmentation)</SelectItem>
                  <SelectItem value="randomforest">Random Forest (Tabular)</SelectItem>
                  <SelectItem value="lstm">LSTM (Time Series)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="epochs">Training Epochs: {epochs}</Label>
              </div>
              <Slider
                id="epochs"
                min={1}
                max={50}
                step={1}
                value={[epochs]}
                onValueChange={(value) => setEpochs(value[0])}
              />
            </div>

            <div className="space-y-3">
              <Label>Security Settings</Label>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-purple-400" />
                  <Label htmlFor="tee" className="cursor-pointer">
                    Trusted Execution Environment
                  </Label>
                </div>
                <Switch id="tee" checked={teeEnabled} onCheckedChange={setTeeEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <Label htmlFor="dp" className="cursor-pointer">
                    Differential Privacy
                  </Label>
                </div>
                <Switch id="dp" checked={dpEnabled} onCheckedChange={setDpEnabled} />
              </div>
            </div>

            <Button
              onClick={handleStartTraining}
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 text-white"
              disabled={!datasetId || !modelType}
            >
              <Cpu className="mr-2 h-4 w-4" />
              Start Secure Training
            </Button>
          </div>
        )}

        {step === "training" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Training Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Training Steps:</h3>
              <div className="space-y-2 text-sm">
                <div className={`flex items-center ${progress > 0 ? "text-green-400" : "text-muted-foreground"}`}>
                  <div className="w-5 h-5 rounded-full mr-2 flex items-center justify-center bg-green-500/20">
                    {progress > 0 && "✓"}
                  </div>
                  Initializing secure environment
                </div>
                <div className={`flex items-center ${progress > 20 ? "text-green-400" : "text-muted-foreground"}`}>
                  <div className="w-5 h-5 rounded-full mr-2 flex items-center justify-center bg-green-500/20">
                    {progress > 20 && "✓"}
                  </div>
                  Fetching encrypted dataset from IPFS
                </div>
                <div className={`flex items-center ${progress > 40 ? "text-green-400" : "text-muted-foreground"}`}>
                  <div className="w-5 h-5 rounded-full mr-2 flex items-center justify-center bg-green-500/20">
                    {progress > 40 && "✓"}
                  </div>
                  Decrypting data with Lit Protocol PKP
                </div>
                <div className={`flex items-center ${progress > 60 ? "text-green-400" : "text-muted-foreground"}`}>
                  <div className="w-5 h-5 rounded-full mr-2 flex items-center justify-center bg-green-500/20">
                    {progress > 60 && "✓"}
                  </div>
                  Training model in TEE ({epochs} epochs)
                </div>
                <div className={`flex items-center ${progress > 80 ? "text-green-400" : "text-muted-foreground"}`}>
                  <div className="w-5 h-5 rounded-full mr-2 flex items-center justify-center bg-green-500/20">
                    {progress > 80 && "✓"}
                  </div>
                  Encrypting model output
                </div>
                <div className={`flex items-center ${progress === 100 ? "text-green-400" : "text-muted-foreground"}`}>
                  <div className="w-5 h-5 rounded-full mr-2 flex items-center justify-center bg-green-500/20">
                    {progress === 100 && "✓"}
                  </div>
                  Uploading to IPFS
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-md text-sm">
              <div className="font-mono text-xs text-muted-foreground h-24 overflow-y-auto">
                {progress > 0 && "[INFO] Initializing secure training environment...\n"}
                {progress > 10 && "[INFO] Verifying dataset license...\n"}
                {progress > 20 && "[INFO] Fetching encrypted dataset from IPFS...\n"}
                {progress > 30 && "[INFO] Requesting decryption key from Lit Network...\n"}
                {progress > 40 && "[INFO] Decrypting data inside TEE...\n"}
                {progress > 50 && "[INFO] Applying differential privacy (epsilon=3.0)...\n"}
                {progress > 60 && "[INFO] Starting model training...\n"}
                {progress > 70 && `[INFO] Training progress: ${Math.min(100, Math.floor(progress * 1.2) - 60)}%...\n`}
                {progress > 90 && "[INFO] Training complete, encrypting model...\n"}
                {progress === 100 && "[INFO] Model uploaded to IPFS successfully.\n"}
              </div>
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="space-y-6">
            <div className="rounded-md border border-green-500/30 bg-green-500/10 p-4 text-center">
              <h3 className="text-lg font-medium text-green-400 mb-2">Training Complete!</h3>
              <p className="text-sm text-muted-foreground">Your model has been trained securely and is ready for use</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="output">Model Output URL</Label>
              <div className="flex gap-2">
                <Input id="output" value={outputUrl} readOnly className="font-mono text-sm" />
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(outputUrl)
                    toast.success("URL copied to clipboard")
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Model Details</Label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Dataset</div>
                <div>{mockDatasets.find((d) => d.id === datasetId)?.title || datasetId}</div>

                <div className="text-muted-foreground">Model Type</div>
                <div>{modelType}</div>

                <div className="text-muted-foreground">Epochs</div>
                <div>{epochs}</div>

                <div className="text-muted-foreground">Security</div>
                <div className="flex items-center gap-1">
                  {teeEnabled && <Lock className="h-3 w-3 text-purple-400" />}
                  {dpEnabled && <Shield className="h-3 w-3 text-green-400" />}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Usage Example</Label>
              <div className="bg-muted p-4 rounded-md font-mono text-xs overflow-x-auto whitespace-pre">
                {`from outdated_ml import SecureModel

# Load the trained model
model = SecureModel.load("${outputUrl}")

# Make predictions
predictions = model.predict(X_test)

# Evaluate the model
accuracy = model.evaluate(X_test, y_test)`}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setStep("config")
                  setTraining(false)
                  setProgress(0)
                  setOutputUrl("")
                }}
                variant="outline"
                className="flex-1"
              >
                Train Another Model
              </Button>
              <Button
                onClick={() => router.push("/marketplace")}
                className="flex-1 bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 text-white"
              >
                <Database className="mr-2 h-4 w-4" />
                Browse Datasets
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
