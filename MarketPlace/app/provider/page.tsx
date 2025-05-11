// import { EnhancedDatasetUpload } from "@/components/provider/enhanced-dataset-upload"
import ProviderDashboard from "@/components/provider/ProviderDashboard"

export default function ProviderPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Provider Dashboard
          </h1>
          <p className="text-gray-300">Upload and license your datasets on the decentralized marketplace</p>
        </div>
        <ProviderDashboard />
      </div>
    </div>
  )
}
