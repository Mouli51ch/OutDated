"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { EvaluationMetrics } from "../ml-model-training"
import { BarChart, PieChart, LineChart, CheckCircle, AlertTriangle } from "lucide-react"
import { useEffect, useRef } from "react"

interface MLEvaluationProps {
  metrics: EvaluationMetrics
  modelType: string
}

export function MLEvaluation({ metrics, modelType }: MLEvaluationProps) {
  const confusionMatrixRef = useRef<HTMLCanvasElement>(null)
  const metricsChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (confusionMatrixRef.current) {
      const ctx = confusionMatrixRef.current.getContext("2d")
      if (!ctx) return

      const width = confusionMatrixRef.current.width
      const height = confusionMatrixRef.current.height
      const cellSize = Math.min(width, height) / 3
      const startX = (width - cellSize * 2) / 2
      const startY = (height - cellSize * 2) / 2

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw background
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, width, height)

      // Draw confusion matrix
      const maxValue = Math.max(...metrics.confusionMatrix.flat())

      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          const value = metrics.confusionMatrix[i][j]
          const normalizedValue = value / maxValue

          // Cell background
          const intensity = Math.min(255, Math.floor(normalizedValue * 200))
          ctx.fillStyle =
            i === j ? `rgba(0, 246, 255, ${normalizedValue * 0.7})` : `rgba(157, 0, 255, ${normalizedValue * 0.7})`
          ctx.fillRect(startX + j * cellSize, startY + i * cellSize, cellSize, cellSize)

          // Cell border
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
          ctx.lineWidth = 1
          ctx.strokeRect(startX + j * cellSize, startY + i * cellSize, cellSize, cellSize)

          // Cell value
          ctx.fillStyle = "white"
          ctx.font = "bold 16px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(value.toString(), startX + j * cellSize + cellSize / 2, startY + i * cellSize + cellSize / 2)
        }
      }

      // Draw labels
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"

      // Class labels
      ctx.fillText("Predicted", width / 2, startY - 20)
      ctx.save()
      ctx.translate(startX - 20, height / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.fillText("Actual", 0, 0)
      ctx.restore()

      // Class values
      ctx.fillText("Negative", startX + cellSize / 2, startY - 5)
      ctx.fillText("Positive", startX + cellSize + cellSize / 2, startY - 5)
      ctx.fillText("Negative", startX - 5, startY + cellSize / 2)
      ctx.fillText("Positive", startX - 5, startY + cellSize + cellSize / 2)
    }

    if (metricsChartRef.current) {
      const ctx = metricsChartRef.current.getContext("2d")
      if (!ctx) return

      const width = metricsChartRef.current.width
      const height = metricsChartRef.current.height
      const barWidth = 60
      const barSpacing = 40
      const startX = (width - (barWidth + barSpacing) * 4 + barSpacing) / 2
      const maxBarHeight = height - 100

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw background
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, width, height)

      // Draw metrics bars
      const metricsData = [
        { label: "Accuracy", value: metrics.accuracy, color: "#00F6FF" },
        { label: "Precision", value: metrics.precision, color: "#9D00FF" },
        { label: "Recall", value: metrics.recall, color: "#00F6FF" },
        { label: "F1 Score", value: metrics.f1Score, color: "#9D00FF" },
      ]

      metricsData.forEach((metric, i) => {
        const x = startX + i * (barWidth + barSpacing)
        const barHeight = metric.value * maxBarHeight
        const y = height - 60 - barHeight

        // Draw bar
        const gradient = ctx.createLinearGradient(x, y, x, height - 60)
        gradient.addColorStop(0, metric.color)
        gradient.addColorStop(1, `${metric.color}50`)

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth, barHeight)

        // Draw bar border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, barWidth, barHeight)

        // Draw value
        ctx.fillStyle = "white"
        ctx.font = "bold 14px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText((metric.value * 100).toFixed(1) + "%", x + barWidth / 2, y - 10)

        // Draw label
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.font = "12px sans-serif"
        ctx.fillText(metric.label, x + barWidth / 2, height - 30)
      })
    }
  }, [metrics])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#00F6FF]/20 bg-black/40">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <BarChart className="h-5 w-5 text-[#00F6FF]" />
              <h3 className="text-lg font-medium">Performance Metrics</h3>
            </div>

            <div className="relative aspect-video w-full bg-black/40 rounded-md overflow-hidden border border-[#00F6FF]/20">
              <canvas ref={metricsChartRef} width={600} height={300} className="w-full h-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 p-3 rounded-md border border-[#00F6FF]/20">
                <div className="text-xs text-gray-400">AUC-ROC</div>
                <div className="text-lg font-medium text-[#00F6FF]">{(metrics.auc * 100).toFixed(1)}%</div>
              </div>
              <div className="bg-black/40 p-3 rounded-md border border-[#00F6FF]/20">
                <div className="text-xs text-gray-400">Overall Rating</div>
                <div className="flex items-center space-x-2">
                  {metrics.f1Score > 0.8 ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-lg font-medium text-green-500">Excellent</span>
                    </>
                  ) : metrics.f1Score > 0.6 ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-[#00F6FF]" />
                      <span className="text-lg font-medium text-[#00F6FF]">Good</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <span className="text-lg font-medium text-yellow-500">Needs Improvement</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#00F6FF]/20 bg-black/40">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <PieChart className="h-5 w-5 text-[#9D00FF]" />
              <h3 className="text-lg font-medium">Confusion Matrix</h3>
            </div>

            <div className="relative aspect-video w-full bg-black/40 rounded-md overflow-hidden border border-[#00F6FF]/20">
              <canvas ref={confusionMatrixRef} width={600} height={300} className="w-full h-full" />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Interpretation</h4>
              <div className="text-sm text-gray-400">
                <p>
                  The confusion matrix shows the counts of true positives (bottom right), true negatives (top left),
                  false positives (top right), and false negatives (bottom left).
                </p>
                <p className="mt-2">
                  Your model correctly identified {metrics.confusionMatrix[0][0]} negative samples and{" "}
                  {metrics.confusionMatrix[1][1]} positive samples.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#00F6FF]/20 bg-black/40">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center space-x-3">
            <LineChart className="h-5 w-5 text-[#00F6FF]" />
            <h3 className="text-lg font-medium">Performance Analysis</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Strengths</h4>
              <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                <li>
                  High {metrics.accuracy > metrics.precision ? "accuracy" : "precision"} (
                  {(Math.max(metrics.accuracy, metrics.precision) * 100).toFixed(1)}%) indicates good overall
                  performance
                </li>
                <li>Balanced performance across different metrics suggests robust model behavior</li>
                <li>AUC of {(metrics.auc * 100).toFixed(1)}% shows strong discriminative ability</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Areas for Improvement</h4>
              <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                <li>
                  Consider improving {metrics.recall < metrics.precision ? "recall" : "precision"} for better balance
                </li>
                <li>
                  Reduce{" "}
                  {metrics.confusionMatrix[0][1] > metrics.confusionMatrix[1][0]
                    ? "false positives"
                    : "false negatives"}{" "}
                  to enhance model reliability
                </li>
                <li>Fine-tune hyperparameters to potentially improve overall performance</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recommendations</h4>
              <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                <li>
                  Consider {metrics.f1Score < 0.8 ? "collecting more training data" : "deploying the model as-is"}
                </li>
                <li>Experiment with different feature engineering approaches</li>
                <li>Try ensemble methods to potentially improve performance</li>
                <li>Implement regular monitoring and retraining schedule</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
