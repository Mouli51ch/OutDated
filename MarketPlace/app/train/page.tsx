import { ModelTrainingForm } from "@/components/train/model-training-form"

export default function TrainPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Secure Model Training
          </h1>
          <p className="text-gray-300">Train AI models on encrypted datasets with privacy-preserving technology</p>
        </div>
        <ModelTrainingForm />
      </div>
    </div>
  )
}
