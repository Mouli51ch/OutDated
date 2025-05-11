"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BorderMagicButton } from "@/components/ui/border-magic-button"
import type { TrainingStatus, TrainingMetrics } from "../ml-model-training"
import { LineChart, Play, RefreshCw, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import { useEffect, useRef } from "react"

interface MLTrainingProgressProps {
  trainingStatus: TrainingStatus
  progress: number
  metrics: TrainingMetrics
  onStartTraining: () => void
  onReset: () => void
  isTraining: boolean
}

export function MLTrainingProgress({
  trainingStatus,
  progress,
  metrics,
  onStartTraining,
  onReset,
  isTraining,
}: MLTrainingProgressProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || metrics.loss.length === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + ((width - padding * 2) / 10) * i
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + ((height - padding * 2) / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Find max and min values for scaling
    const allValues = [...metrics.loss, ...metrics.accuracy, ...metrics.validationLoss, ...metrics.validationAccuracy]
    const maxValue = Math.max(...allValues, 1)
    const minValue = Math.min(...allValues, 0)

    // Draw axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw axes labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Epochs", width / 2, height - 10)
    ctx.save()
    ctx.translate(15, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText("Value", 0, 0)
    ctx.restore()

    // Draw epoch labels
    for (let i = 0; i <= 10; i += 2) {
      const x = padding + ((width - padding * 2) / 10) * i
      ctx.fillText(Math.floor((i / 10) * metrics.totalEpochs).toString(), x, height - padding + 15)
    }

    // Draw value labels
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - ((height - padding * 2) / 5) * i
      const value = minValue + ((maxValue - minValue) / 5) * i
      ctx.fillText(value.toFixed(2), padding - 25, y + 5)
    }

    // Function to draw a line
    const drawLine = (data: number[], color: string, dashPattern: number[] = []) => {
      if (data.length === 0) return

      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.setLineDash(dashPattern)
      ctx.beginPath()

      for (let i = 0; i < data.length; i++) {
        const x = padding + ((width - padding * 2) / (metrics.totalEpochs - 1)) * i
        const normalizedValue = (data[i] - minValue) / (maxValue - minValue)
        const y = height - padding - normalizedValue * (height - padding * 2)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
      ctx.setLineDash([])
    }

    // Draw lines
    drawLine(metrics.loss, "#00F6FF")
    drawLine(metrics.accuracy, "#9D00FF")
    drawLine(metrics.validationLoss, "#00F6FF", [5, 5])
    drawLine(metrics.validationAccuracy, "#9D00FF", [5, 5])

    // Draw legend
    const legendY = padding / 2
    const legendX = width / 2
    const legendSpacing = 120

    // Training loss
    ctx.fillStyle = "#00F6FF"
    ctx.fillRect(legendX - 240, legendY - 5, 10, 2)
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.fillText("Training Loss", legendX - 190, legendY)

    // Training accuracy
    ctx.fillStyle = "#9D00FF"
    ctx.fillRect(legendX - 120, legendY - 5, 10, 2)
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.fillText("Training Accuracy", legendX - 60, legendY)

    // Validation loss
    ctx.strokeStyle = "#00F6FF"
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(legendX + 10, legendY - 5)
    ctx.lineTo(legendX + 30, legendY - 5)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.fillText("Validation Loss", legendX + 70, legendY)

    // Validation accuracy
    ctx.strokeStyle = "#9D00FF"
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(legendX + 150, legendY - 5)
    ctx.lineTo(legendX + 170, legendY - 5)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.fillText("Validation Accuracy", legendX + 220, legendY)
  }, [metrics])

  const getStatusIcon = () => {
    switch (trainingStatus) {
      case "idle":
        return <Play className="h-5 w-5 text-[#00F6FF]" />
      case "uploading":
      case "preparing":
      case "training":
      case "evaluating":
        return <Loader2 className="h-5 w-5 text-[#00F6FF] animate-spin" />
      case "complete":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "failed":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (trainingStatus) {
      case "idle":
        return "Ready to start training"
      case "uploading":
        return "Uploading datasets..."
      case "preparing":
        return "Preparing model..."
      case "training":
        return `Training model (Epoch ${metrics.currentEpoch}/${metrics.totalEpochs})...`
      case "evaluating":
        return "Evaluating model performance..."
      case "complete":
        return "Training completed successfully!"
      case "failed":
        return "Training failed. Please try again."
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-[#00F6FF]/20 bg-black/40">
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <h3 className="text-lg font-medium">{getStatusText()}</h3>
            </div>

            {trainingStatus === "idle" ? (
              <BorderMagicButton onClick={onStartTraining} disabled={isTraining}>
                Start Training
              </BorderMagicButton>
            ) : (
              <BorderMagicButton onClick={onReset} variant="outline" disabled={isTraining}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </BorderMagicButton>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-black [&>div]:bg-gradient-to-r [&>div]:from-[#00F6FF] [&>div]:to-[#9D00FF]"
            />
          </div>

          {trainingStatus !== "idle" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Training Metrics</h4>
                <div className="flex items-center space-x-2">
                  <LineChart className="h-4 w-4 text-[#00F6FF]" />
                  <span className="text-xs text-gray-400">Real-time visualization</span>
                </div>
              </div>
              <div className="relative aspect-video w-full bg-black/40 rounded-md overflow-hidden border border-[#00F6FF]/20">
                <canvas ref={canvasRef} width={800} height={400} className="w-full h-full" />
              </div>
            </div>
          )}

          {trainingStatus === "training" && metrics.currentEpoch > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/40 p-3 rounded-md border border-[#00F6FF]/20">
                <div className="text-xs text-gray-400">Current Loss</div>
                <div className="text-lg font-medium text-[#00F6FF]">
                  {metrics.loss[metrics.loss.length - 1]?.toFixed(4) || "N/A"}
                </div>
              </div>
              <div className="bg-black/40 p-3 rounded-md border border-[#00F6FF]/20">
                <div className="text-xs text-gray-400">Current Accuracy</div>
                <div className="text-lg font-medium text-[#9D00FF]">
                  {metrics.accuracy[metrics.accuracy.length - 1]?.toFixed(4) || "N/A"}
                </div>
              </div>
              <div className="bg-black/40 p-3 rounded-md border border-[#00F6FF]/20">
                <div className="text-xs text-gray-400">Val Loss</div>
                <div className="text-lg font-medium text-[#00F6FF]">
                  {metrics.validationLoss[metrics.validationLoss.length - 1]?.toFixed(4) || "N/A"}
                </div>
              </div>
              <div className="bg-black/40 p-3 rounded-md border border-[#00F6FF]/20">
                <div className="text-xs text-gray-400">Val Accuracy</div>
                <div className="text-lg font-medium text-[#9D00FF]">
                  {metrics.validationAccuracy[metrics.validationAccuracy.length - 1]?.toFixed(4) || "N/A"}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {trainingStatus !== "idle" && (
        <Card className="border-[#00F6FF]/20 bg-black/40">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Training Log</h4>
              <div className="bg-black/60 border border-[#00F6FF]/20 rounded-md p-3 h-40 overflow-y-auto font-mono text-xs text-gray-400">
                {trainingStatus !== "idle" && (
                  <>
                    <div>[INFO] Initializing training session...</div>
                    <div>[INFO] Loading datasets...</div>
                    {trainingStatus !== "uploading" && (
                      <>
                        <div>[INFO] Datasets loaded successfully.</div>
                        <div>[INFO] Preprocessing data...</div>
                        <div>[INFO] Splitting data into train/validation/test sets...</div>
                      </>
                    )}
                    {trainingStatus !== "uploading" && trainingStatus !== "preparing" && (
                      <>
                        <div>[INFO] Initializing model architecture...</div>
                        <div>[INFO] Model compiled successfully.</div>
                        <div>[INFO] Starting training...</div>
                        {Array.from({ length: metrics.currentEpoch }).map((_, i) => (
                          <div key={i}>
                            [INFO] Epoch {i + 1}/{metrics.totalEpochs} - loss: {metrics.loss[i]?.toFixed(4) || "N/A"} -
                            accuracy: {metrics.accuracy[i]?.toFixed(4) || "N/A"} - val_loss:{" "}
                            {metrics.validationLoss[i]?.toFixed(4) || "N/A"} - val_accuracy:{" "}
                            {metrics.validationAccuracy[i]?.toFixed(4) || "N/A"}
                          </div>
                        ))}
                      </>
                    )}
                    {trainingStatus === "evaluating" && (
                      <div>[INFO] Training complete. Evaluating model on test set...</div>
                    )}
                    {trainingStatus === "complete" && (
                      <>
                        <div>[INFO] Model evaluation complete.</div>
                        <div>[INFO] Model saved successfully.</div>
                        <div>[INFO] Training session completed.</div>
                      </>
                    )}
                    {trainingStatus === "failed" && (
                      <div className="text-red-500">[ERROR] Training failed. See error log for details.</div>
                    )}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
