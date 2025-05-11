"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Shield } from "lucide-react"

export function TEESettings() {
  const [provider, setProvider] = useState("azure")
  const [encryptionEnabled, setEncryptionEnabled] = useState(true)
  const [mpcEnabled, setMpcEnabled] = useState(false)
  const [dpEnabled, setDpEnabled] = useState(true)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("TEE settings saved successfully")
    } catch (error) {
      toast.error("Failed to save settings")
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="border-border/40 backdrop-blur-sm bg-background/60">
      <CardHeader>
        <CardTitle>TEE Settings Configuration</CardTitle>
        <CardDescription>Configure Trusted Execution Environment settings for secure model training</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>TEE Provider</Label>
          <RadioGroup defaultValue={provider} onValueChange={setProvider}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="azure" id="azure" />
              <Label htmlFor="azure" className="cursor-pointer">
                Azure Confidential Computing
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="aws" id="aws" />
              <Label htmlFor="aws" className="cursor-pointer">
                AWS Nitro Enclaves
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gcp" id="gcp" />
              <Label htmlFor="gcp" className="cursor-pointer">
                Google Cloud Confidential Computing
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Security Features</Label>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="encryption" className="text-base">
                Lit Protocol Encryption
              </Label>
              <p className="text-sm text-muted-foreground">Enable end-to-end encryption using Lit Protocol</p>
            </div>
            <Switch id="encryption" checked={encryptionEnabled} onCheckedChange={setEncryptionEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="mpc" className="text-base">
                Multi-Party Computation
              </Label>
              <p className="text-sm text-muted-foreground">
                Split computation acrosss multiple parties for enhanced security
              </p>
            </div>
            <Switch id="mpc" checked={mpcEnabled} onCheckedChange={setMpcEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dp" className="text-base">
                Differential Privacy
              </Label>
              <p className="text-sm text-muted-foreground">
                Add noise to protect individual data points while preserving overall patterns
              </p>
            </div>
            <Switch id="dp" checked={dpEnabled} onCheckedChange={setDpEnabled} />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 text-white"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Settings"}
            <Shield className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
