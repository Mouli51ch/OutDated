"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Terminal } from "lucide-react"
import { toast } from "sonner"

export function CLISetup() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <Card className="border-border/40 backdrop-blur-sm bg-background/60">
      <CardHeader>
        <CardTitle>CLI Setup Instructions</CardTitle>
        <CardDescription>Get started with the OutDated CLI tools</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="install" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="install">Installation</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="install" className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Install via npm</div>
              <div className="relative">
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  npm install -g outdated-ml
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy("npm install -g outdated-ml")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Install via pip</div>
              <div className="relative">
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  pip install outdated-ml scikit-learn-wrapper
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy("pip install outdated-ml scikit-learn-wrapper")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Verify installation</div>
              <div className="relative">
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">outdated-ml --version</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy("outdated-ml --version")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Initialize configuration</div>
              <div className="relative">
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">outdated-ml init</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy("outdated-ml init")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Connect your wallet</div>
              <div className="relative">
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  outdated-ml wallet connect
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy("outdated-ml wallet connect")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Configure TEE settings</div>
              <div className="relative">
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  outdated-ml config set --tee-provider=azure --encryption=lit
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy("outdated-ml config set --tee-provider=azure --encryption=lit")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">List available datasets</div>
              <div className="relative">
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  outdated-ml datasets list
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy("outdated-ml datasets list")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Train a model</div>
              <div className="relative">
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                  outdated-ml train --dataset=dataset-001 --model=resnet50 --epochs=10
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy("outdated-ml train --dataset=dataset-001 --model=resnet50 --epochs=10")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Python integration example</div>
              <div className="relative">
                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre">
                  {`from outdated_ml import SecureModel
from sklearn_wrapper import RandomForestClassifier

# Initialize secure model
model = SecureModel(RandomForestClassifier())

# Train on encrypted dataset
model.fit("dataset-001", tee_enabled=True)

# Make predictions
predictions = model.predict(X_test)`}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() =>
                    handleCopy(`from outdated_ml import SecureModel
from sklearn_wrapper import RandomForestClassifier

# Initialize secure model
model = SecureModel(RandomForestClassifier())

# Train on encrypted dataset
model.fit("dataset-001", tee_enabled=True)

# Make predictions
predictions = model.predict(X_test)`)
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-center">
          <Button className="bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 text-white">
            <Terminal className="mr-2 h-4 w-4" />
            Open Terminal
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
