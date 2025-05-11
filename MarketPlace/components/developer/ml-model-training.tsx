"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MLDataUpload } from "./ml-components/ml-data-upload"
import { MLModelSelection } from "./ml-components/ml-model-selection"
import { MLHyperparameters } from "./ml-components/ml-hyperparameters"
import { MLTrainingProgress } from "./ml-components/ml-training-progress"
import { MLEvaluation } from "./ml-components/ml-evaluation"
import { MLDeployment } from "./ml-components/ml-deployment"
import { BorderMagicButton } from "@/components/ui/border-magic-button"
import { Brain, Database, Sliders, LineChart, Rocket, Server } from "lucide-react"
import { toast } from "sonner"

export type TrainingStatus = "idle" | "uploading" | "preparing" | "training" | "evaluating" | "complete" | "failed"

export interface ModelConfig {
  modelType: string
  customModel?: File
  architecture?: string
  framework?: string
}

export interface HyperParameters {
  learningRate: number
  batchSize: number
  epochs: number
  optimizer: string
  regularization: number
  dropoutRate: number
  earlyStoppingPatience: number
}

export interface TrainingMetrics {
  loss: number[]
  accuracy: number[]
  validationLoss: number[]
  validationAccuracy: number[]
  currentEpoch: number
  totalEpochs: number
}

export interface EvaluationMetrics {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  auc: number
  confusionMatrix: number[][]
}

export function MLModelTraining() {
  const [activeTab, setActiveTab] = useState("data")
  const [trainingStatus, setTrainingStatus] = useState<TrainingStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [datasets, setDatasets] = useState<File[]>([])
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    modelType: "classification",
  })
  const [hyperParameters, setHyperParameters] = useState<HyperParameters>({
    learningRate: 0.001,
    batchSize: 32,
    epochs: 10,
    optimizer: "adam",
    regularization: 0.0001,
    dropoutRate: 0.2,
    earlyStoppingPatience: 5,
  })
  const [trainingMetrics, setTrainingMetrics] = useState<TrainingMetrics>({
    loss: [],
    accuracy: [],
    validationLoss: [],
    validationAccuracy: [],
    currentEpoch: 0,
    totalEpochs: 10,
  })
  const [evaluationMetrics, setEvaluationMetrics] = useState<EvaluationMetrics>({
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1Score: 0,
    auc: 0,
    confusionMatrix: [
      [0, 0],
      [0, 0],
    ],
  })
  const [modelId, setModelId] = useState<string>("")

  const handleStartTraining = async () => {
    if (datasets.length === 0) {
      toast.error("Please upload at least one dataset")
      return
    }

    if (!modelConfig.modelType) {
      toast.error("Please select a model type")
      return
    }

    // Start the training process
    setTrainingStatus("uploading")
    setProgress(0)

    // Simulate data upload
    await simulateProgress(0, 20, (p) => setProgress(p))
    setTrainingStatus("preparing")

    // Simulate model preparation
    await simulateProgress(20, 30, (p) => setProgress(p))
    setTrainingStatus("training")

    // Simulate training with metrics updates
    const totalEpochs = hyperParameters.epochs
    const initialLoss = 2.5
    const initialAcc = 0.5
    const finalLoss = 0.2
    const finalAcc = 0.95

    for (let epoch = 0; epoch < totalEpochs; epoch++) {
      const progress = 30 + ((epoch + 1) / totalEpochs) * 50
      setProgress(progress)

      // Calculate simulated metrics
      const epochProgress = (epoch + 1) / totalEpochs
      const currentLoss = initialLoss - (initialLoss - finalLoss) * epochProgress + Math.random() * 0.1
      const currentAcc = initialAcc + (finalAcc - initialAcc) * epochProgress - Math.random() * 0.05
      const valLoss = currentLoss + Math.random() * 0.2
      const valAcc = currentAcc - Math.random() * 0.1

      // Update metrics
      setTrainingMetrics((prev) => ({
        ...prev,
        loss: [...prev.loss, currentLoss],
        accuracy: [...prev.accuracy, currentAcc],
        validationLoss: [...prev.validationLoss, valLoss],
        validationAccuracy: [...prev.validationAccuracy, valAcc],
        currentEpoch: epoch + 1,
        totalEpochs,
      }))

      // Wait for next epoch
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    // Simulate evaluation
    setTrainingStatus("evaluating")
    await simulateProgress(80, 95, (p) => setProgress(p))

    // Set evaluation metrics
    setEvaluationMetrics({
      accuracy: 0.92 + Math.random() * 0.05,
      precision: 0.91 + Math.random() * 0.05,
      recall: 0.89 + Math.random() * 0.05,
      f1Score: 0.9 + Math.random() * 0.05,
      auc: 0.94 + Math.random() * 0.03,
      confusionMatrix: [
        [Math.floor(Math.random() * 100 + 400), Math.floor(Math.random() * 30 + 10)],
        [Math.floor(Math.random() * 30 + 10), Math.floor(Math.random() * 100 + 400)],
      ],
    })

    // Complete training
    setTrainingStatus("complete")
    setProgress(100)
    setModelId(`model_${Date.now().toString(36)}`)
    setActiveTab("evaluation")
    toast.success("Model training completed successfully!")
  }

  const simulateProgress = async (start: number, end: number, callback: (progress: number) => void) => {
    const steps = 10
    const increment = (end - start) / steps
    for (let i = 0; i <= steps; i++) {
      const currentProgress = start + i * increment
      callback(currentProgress)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }
  }

  const handleReset = () => {
    setTrainingStatus("idle")
    setProgress(0)
    setDatasets([])
    setModelConfig({
      modelType: "classification",
    })
    setHyperParameters({
      learningRate: 0.001,
      batchSize: 32,
      epochs: 10,
      optimizer: "adam",
      regularization: 0.0001,
      dropoutRate: 0.2,
      earlyStoppingPatience: 5,
    })
    setTrainingMetrics({
      loss: [],
      accuracy: [],
      validationLoss: [],
      validationAccuracy: [],
      currentEpoch: 0,
      totalEpochs: 10,
    })
    setEvaluationMetrics({
      accuracy: 0,
      precision: 0,
      recall: 0,
      f1Score: 0,
      auc: 0,
      confusionMatrix: [
        [0, 0],
        [0, 0],
      ],
    })
    setModelId("")
    setActiveTab("data")
    toast.info("Training session reset")
  }

  const isTraining = ["uploading", "preparing", "training", "evaluating"].includes(trainingStatus)
  const canProceedToModel = datasets.length > 0
  const canProceedToHyperparams = canProceedToModel && modelConfig.modelType
  const canStartTraining = canProceedToHyperparams

  return (
    <Card className="border border-[#00F6FF]/20 bg-black/60 backdrop-blur-sm shadow-[0_0_15px_rgba(0,246,255,0.1)]">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-[#00F6FF] to-[#9D00FF] bg-clip-text text-transparent">
          ML Model Training
        </CardTitle>
        <CardDescription>Train and deploy custom machine learning models</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="data" disabled={isTraining} className="flex items-center gap-1">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
            <TabsTrigger value="model" disabled={!canProceedToModel || isTraining} className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Model</span>
            </TabsTrigger>
            <TabsTrigger
              value="hyperparams"
              disabled={!canProceedToHyperparams || isTraining}
              className="flex items-center gap-1"
            >
              <Sliders className="h-4 w-4" />
              <span className="hidden sm:inline">Parameters</span>
            </TabsTrigger>
            <TabsTrigger
              value="training"
              disabled={trainingStatus === "idle" && !canStartTraining}
              className="flex items-center gap-1"
            >
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">Training</span>
            </TabsTrigger>
            <TabsTrigger
              value="evaluation"
              disabled={!["complete", "failed"].includes(trainingStatus)}
              className="flex items-center gap-1"
            >
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Evaluation</span>
            </TabsTrigger>
            <TabsTrigger
              value="deployment"
              disabled={!["complete"].includes(trainingStatus)}
              className="flex items-center gap-1"
            >
              <Rocket className="h-4 w-4" />
              <span className="hidden sm:inline">Deployment</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="data">
            <MLDataUpload datasets={datasets} setDatasets={setDatasets} />
            <div className="flex justify-end mt-6">
              <BorderMagicButton
                onClick={() => setActiveTab("model")}
                disabled={!canProceedToModel}
                className="ml-auto"
              >
                Next: Select Model
              </BorderMagicButton>
            </div>
          </TabsContent>

          <TabsContent value="model">
            <MLModelSelection modelConfig={modelConfig} setModelConfig={setModelConfig} />
            <div className="flex justify-between mt-6">
              <BorderMagicButton onClick={() => setActiveTab("data")} variant="outline">
                Back: Data Upload
              </BorderMagicButton>
              <BorderMagicButton onClick={() => setActiveTab("hyperparams")} disabled={!canProceedToHyperparams}>
                Next: Hyperparameters
              </BorderMagicButton>
            </div>
          </TabsContent>

          <TabsContent value="hyperparams">
            <MLHyperparameters
              hyperParameters={hyperParameters}
              setHyperParameters={setHyperParameters}
              modelType={modelConfig.modelType}
            />
            <div className="flex justify-between mt-6">
              <BorderMagicButton onClick={() => setActiveTab("model")} variant="outline">
                Back: Model Selection
              </BorderMagicButton>
              <BorderMagicButton onClick={() => setActiveTab("training")} disabled={!canStartTraining}>
                Next: Start Training
              </BorderMagicButton>
            </div>
          </TabsContent>

          <TabsContent value="training">
            <MLTrainingProgress
              trainingStatus={trainingStatus}
              progress={progress}
              metrics={trainingMetrics}
              onStartTraining={handleStartTraining}
              onReset={handleReset}
              isTraining={isTraining}
            />
            <div className="flex justify-between mt-6">
              <BorderMagicButton onClick={() => setActiveTab("hyperparams")} variant="outline" disabled={isTraining}>
                Back: Hyperparameters
              </BorderMagicButton>
              <BorderMagicButton
                onClick={() => setActiveTab("evaluation")}
                disabled={!["complete", "failed"].includes(trainingStatus)}
              >
                Next: Evaluation
              </BorderMagicButton>
            </div>
          </TabsContent>

          <TabsContent value="evaluation">
            <MLEvaluation metrics={evaluationMetrics} modelType={modelConfig.modelType} />
            <div className="flex justify-between mt-6">
              <BorderMagicButton onClick={() => setActiveTab("training")} variant="outline">
                Back: Training
              </BorderMagicButton>
              <BorderMagicButton
                onClick={() => setActiveTab("deployment")}
                disabled={!["complete"].includes(trainingStatus)}
              >
                Next: Deployment
              </BorderMagicButton>
            </div>
          </TabsContent>

          <TabsContent value="deployment">
            <MLDeployment modelId={modelId} modelConfig={modelConfig} metrics={evaluationMetrics} />
            <div className="flex justify-between mt-6">
              <BorderMagicButton onClick={() => setActiveTab("evaluation")} variant="outline">
                Back: Evaluation
              </BorderMagicButton>
              <BorderMagicButton onClick={handleReset} variant="outline">
                Train New Model
              </BorderMagicButton>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
