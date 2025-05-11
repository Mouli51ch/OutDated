import { CLISetup } from "@/components/developer/cli-setup"
import { TEESettings } from "@/components/developer/tee-settings"
import { MLModelTraining } from "@/components/developer/ml-model-training"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DeveloperPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-[#00F6FF] to-[#9D00FF] bg-clip-text text-transparent">
            Developer Interface
          </h1>
          <p className="text-gray-300">Tools and resources for building with secure, decentralized AI</p>
        </div>

        <Tabs defaultValue="ml-training" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="ml-training">ML Model Training</TabsTrigger>
            <TabsTrigger value="cli">CLI Setup</TabsTrigger>
            <TabsTrigger value="tee">TEE Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="ml-training">
            <MLModelTraining />
          </TabsContent>

          <TabsContent value="cli">
            <CLISetup />
          </TabsContent>

          <TabsContent value="tee">
            <TEESettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
