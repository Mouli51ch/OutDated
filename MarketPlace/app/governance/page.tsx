import { AccessLogs } from "@/components/governance/access-logs"
import { Proposals } from "@/components/governance/proposals"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GovernancePage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Governance Panel
          </h1>
          <p className="text-gray-300">Monitor and participate in platform governance</p>
        </div>

        <Tabs defaultValue="proposals" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="logs">Access Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals">
            <Proposals />
          </TabsContent>

          <TabsContent value="logs">
            <AccessLogs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
