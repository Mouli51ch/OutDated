import { DatasetDetail } from "@/components/datasets/dataset-detail"
import { mockDatasets } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface DatasetDetailPageProps {
  params: {
    id: string
  }
}

export default function DatasetDetailPage({ params }: DatasetDetailPageProps) {
  const dataset = mockDatasets.find((dataset) => dataset.id === params.id)

  if (!dataset) {
    notFound()
  }

  return (
    <div className="container py-12">
      <DatasetDetail dataset={dataset} />
    </div>
  )
}
