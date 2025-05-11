"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { BorderMagicButton } from "@/components/ui/border-magic-button"
import type { ModelConfig, EvaluationMetrics } from "../ml-model-training"
import { Rocket, Server, Cloud, Code, Download, Copy, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface MLDeploymentProps {
  modelId: string
  modelConfig: ModelConfig
  metrics: EvaluationMetrics
}

export function MLDeployment({ modelId, modelConfig, metrics }: MLDeploymentProps) {
  const [deploymentType, setDeploymentType] = useState<string>("api")
  const [deploymentName, setDeploymentName] = useState<string>(`model-${modelId.slice(0, 8)}`)
  const [isDeploying, setIsDeploying] = useState<boolean>(false)
  const [isDeployed, setIsDeployed] = useState<boolean>(false)
  const [apiEndpoint, setApiEndpoint] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)

  const handleDeploy = async () => {
    setIsDeploying(true)

    try {
      // Simulate deployment
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsDeployed(true)
      setApiEndpoint(`https://api.outdated.ai/v1/models/${deploymentName}`)
      toast.success("Model deployed successfully!")
    } catch (error) {
      toast.error("Deployment failed")
      console.error(error)
    } finally {
      setIsDeploying(false)
    }
  }

  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText(apiEndpoint)
    setCopied(true)
    toast.success("API endpoint copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadModel = () => {
    toast.success("Model download started")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#00F6FF]/20 bg-black/40">
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center space-x-3">
              <Rocket className="h-5 w-5 text-[#00F6FF]" />
              <h3 className="text-lg font-medium">Deployment Options</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deployment-name">Model Name</Label>
                <Input
                  id="deployment-name"
                  value={deploymentName}
                  onChange={(e) => setDeploymentName(e.target.value)}
                  className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                  placeholder="Enter a name for your deployed model"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deployment-type">Deployment Type</Label>
                <Select value={deploymentType} onValueChange={setDeploymentType}>
                  <SelectTrigger
                    id="deployment-type"
                    className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                  >
                    <SelectValue placeholder="Select deployment type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#00F6FF]/20">
                    <SelectItem value="api">REST API</SelectItem>
                    <SelectItem value="serverless">Serverless Function</SelectItem>
                    <SelectItem value="edge">Edge Deployment</SelectItem>
                    <SelectItem value="download">Download Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deployment-version">Version</Label>
                <Select defaultValue="v1">
                  <SelectTrigger
                    id="deployment-version"
                    className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                  >
                    <SelectValue placeholder="Select version" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#00F6FF]/20">
                    <SelectItem value="v1">v1 (Initial Release)</SelectItem>
                    <SelectItem value="dev">dev (Development)</SelectItem>
                    <SelectItem value="staging">staging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-caching" className="cursor-pointer">
                    Enable Response Caching
                  </Label>
                  <Switch id="enable-caching" defaultChecked className="data-[state=checked]:bg-[#00F6FF]" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-monitoring" className="cursor-pointer">
                    Enable Performance Monitoring
                  </Label>
                  <Switch id="enable-monitoring" defaultChecked className="data-[state=checked]:bg-[#00F6FF]" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-versioning" className="cursor-pointer">
                    Enable Automatic Versioning
                  </Label>
                  <Switch id="enable-versioning" defaultChecked className="data-[state=checked]:bg-[#00F6FF]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#00F6FF]/20 bg-black/40">
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center space-x-3">
              <Server className="h-5 w-5 text-[#9D00FF]" />
              <h3 className="text-lg font-medium">Infrastructure Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="compute-type">Compute Type</Label>
                <Select defaultValue="gpu-small">
                  <SelectTrigger
                    id="compute-type"
                    className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                  >
                    <SelectValue placeholder="Select compute type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#00F6FF]/20">
                    <SelectItem value="cpu">CPU (1x)</SelectItem>
                    <SelectItem value="cpu-large">CPU (4x)</SelectItem>
                    <SelectItem value="gpu-small">GPU (Small)</SelectItem>
                    <SelectItem value="gpu-large">GPU (Large)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scaling-policy">Scaling Policy</Label>
                <Select defaultValue="auto">
                  <SelectTrigger
                    id="scaling-policy"
                    className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                  >
                    <SelectValue placeholder="Select scaling policy" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#00F6FF]/20">
                    <SelectItem value="fixed">Fixed (No Scaling)</SelectItem>
                    <SelectItem value="auto">Auto Scaling</SelectItem>
                    <SelectItem value="scheduled">Scheduled Scaling</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Deployment Region</Label>
                <Select defaultValue="us-east">
                  <SelectTrigger
                    id="region"
                    className="border-[#00F6FF]/20 bg-black text-white focus:ring-[#00F6FF]/30"
                  >
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#00F6FF]/20">
                    <SelectItem value="us-east">US East (N. Virginia)</SelectItem>
                    <SelectItem value="us-west">US West (Oregon)</SelectItem>
                    <SelectItem value="eu-west">EU West (Ireland)</SelectItem>
                    <SelectItem value="ap-southeast">Asia Pacific (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-tee" className="cursor-pointer">
                    Enable Trusted Execution Environment
                  </Label>
                  <Switch id="enable-tee" defaultChecked className="data-[state=checked]:bg-[#9D00FF]" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-encryption" className="cursor-pointer">
                    Enable End-to-End Encryption
                  </Label>
                  <Switch id="enable-encryption" defaultChecked className="data-[state=checked]:bg-[#9D00FF]" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-backup" className="cursor-pointer">
                    Enable Automatic Backups
                  </Label>
                  <Switch id="enable-backup" defaultChecked className="data-[state=checked]:bg-[#9D00FF]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#00F6FF]/20 bg-black/40">
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cloud className="h-5 w-5 text-[#00F6FF]" />
              <h3 className="text-lg font-medium">Deployment Status</h3>
            </div>

            {!isDeployed ? (
              <BorderMagicButton onClick={handleDeploy} disabled={isDeploying || !deploymentName}>
                {isDeploying ? "Deploying..." : "Deploy Model"}
              </BorderMagicButton>
            ) : deploymentType === "download" ? (
              <BorderMagicButton onClick={handleDownloadModel}>
                <Download className="mr-2 h-4 w-4" />
                Download Model
              </BorderMagicButton>
            ) : (
              <div className="flex items-center space-x-2">
                <BorderMagicButton onClick={handleCopyEndpoint} variant="outline" size="sm">
                  {copied ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Endpoint
                    </>
                  )}
                </BorderMagicButton>
              </div>
            )}
          </div>

          {isDeployed && (
            <div className="space-y-4">
              <div className="p-4 rounded-md bg-[#00F6FF]/10 border border-[#00F6FF]/20">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h4 className="font-medium">Model Deployed Successfully</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Your model has been deployed and is now available for use. Use the information below to integrate it
                  into your applications.
                </p>
              </div>

              {deploymentType !== "download" && (
                <div className="space-y-2">
                  <Label>API Endpoint</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={apiEndpoint}
                      readOnly
                      className="font-mono text-sm border-[#00F6FF]/20 bg-black text-white"
                    />
                    <BorderMagicButton onClick={handleCopyEndpoint} variant="outline" size="icon">
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </BorderMagicButton>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Usage Example</Label>
                  <div className="flex items-center space-x-2">
                    <Code className="h-4 w-4 text-[#00F6FF]" />
                    <span className="text-xs text-gray-400">Code snippet</span>
                  </div>
                </div>
                <div className="bg-black p-4 rounded-md font-mono text-xs overflow-x-auto whitespace-pre border border-[#00F6FF]/20">
                  {deploymentType === "api" &&
                    `import requests

# Make a prediction with the deployed model
response = requests.post(
    "${apiEndpoint}/predict",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={"data": [0.1, 0.2, 0.3, 0.4]}
)

# Get the prediction result
result = response.json()
print(f"Prediction: {result['prediction']}")
print(f"Confidence: {result['confidence']}")`}

                  {deploymentType === "serverless" &&
                    `// Using the serverless function
import { invoke } from '@outdated/client';

async function predict() {
  const result = await invoke('${deploymentName}', {
    data: [0.1, 0.2, 0.3, 0.4]
  });
  
  console.log('Prediction:', result.prediction);
  console.log('Confidence:', result.confidence);
}`}

                  {deploymentType === "edge" &&
                    `// Using the edge-deployed model
import { EdgeModel } from '@outdated/edge';

const model = new EdgeModel('${deploymentName}');

async function predict() {
  await model.initialize();
  const result = await model.predict([0.1, 0.2, 0.3, 0.4]);
  
  console.log('Prediction:', result.prediction);
  console.log('Confidence:', result.confidence);
}`}

                  {deploymentType === "download" &&
                    `# Using the downloaded model
import outdated

# Load the model
model = outdated.load_model('path/to/downloaded/${deploymentName}.onnx')

# Make a prediction
result = model.predict([[0.1, 0.2, 0.3, 0.4]])

print(f"Prediction: {result['prediction']}")
print(f"Confidence: {result['confidence']}")`}
                </div>
              </div>
            </div>
          )}

          {!isDeployed && !isDeploying && (
            <div className="p-4 rounded-md bg-black/40 border border-[#00F6FF]/20">
              <p className="text-sm text-gray-400">
                Click the "Deploy Model" button to make your trained model available for use in applications. You can
                choose between different deployment options to best suit your needs.
              </p>
            </div>
          )}

          {isDeploying && (
            <div className="p-4 rounded-md bg-[#9D00FF]/10 border border-[#9D00FF]/20">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-[#9D00FF]"></div>
                <p className="text-sm">Deploying your model. This may take a few moments...</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
