import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockAccessLogs } from "@/lib/mock-data"
import { formatAddress } from "@/lib/utils"
import { Download, Eye, Cpu, Check, X } from "lucide-react"

export function AccessLogs() {
  return (
    <Card className="border-border/40 backdrop-blur-sm bg-background/60">
      <CardHeader>
        <CardTitle>Access Logs</CardTitle>
        <CardDescription>Monitor dataset access and usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAccessLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-3 rounded-md border border-border/40 backdrop-blur-sm bg-background/60"
            >
              <div className="flex items-center gap-3">
                {log.action === "view" ? (
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Eye className="h-4 w-4 text-blue-400" />
                  </div>
                ) : log.action === "download" ? (
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Download className="h-4 w-4 text-purple-400" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Cpu className="h-4 w-4 text-green-400" />
                  </div>
                )}
                <div>
                  <div className="font-medium">
                    {log.action === "view" ? "Viewed" : log.action === "download" ? "Downloaded" : "Trained on"} dataset
                  </div>
                  <div className="text-xs text-muted-foreground">
                    By {formatAddress(log.user)} • {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {log.success ? (
                  <div className="flex items-center text-green-400 text-sm">
                    <Check className="mr-1 h-4 w-4" />
                    Success
                  </div>
                ) : (
                  <div className="flex items-center text-red-400 text-sm">
                    <X className="mr-1 h-4 w-4" />
                    Failed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
