"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Download, 
  X, 
  CheckCircle, 
  FileText, 
  Zap,
  BarChart3,
  TrendingUp
} from "lucide-react"

interface ExportProgressModalProps {
  isOpen: boolean
  onClose: () => void
  format: string
  fields: string[]
  onComplete: () => void
}

export function ExportProgressModal({ 
  isOpen, 
  onClose, 
  format, 
  fields, 
  onComplete 
}: ExportProgressModalProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)

  const steps = [
    { name: "Chuẩn bị dữ liệu", duration: 600 },
    { name: "Xử lý thông tin dự án", duration: 800 },
    { name: "Tính toán thống kê", duration: 700 },
    { name: "Định dạng dữ liệu", duration: 600 },
    { name: "Tạo file xuất", duration: 1000 },
    { name: "Hoàn thành", duration: 300 }
  ]

  useEffect(() => {
    if (!isOpen) {
      setProgress(0)
      setCurrentStep("")
      setIsCompleted(false)
      return
    }

    let currentStepIndex = 0
    const totalStepsDuration = steps.reduce((sum, step) => sum + step.duration, 0)

    const startExport = () => {
      const processStep = () => {
                 if (currentStepIndex >= steps.length) {
           setIsCompleted(true)
           // Không tự động đóng nữa, để user đóng thủ công
           return
         }

        const step = steps[currentStepIndex]
        setCurrentStep(step.name)
        
        // Calculate target progress for this step
        const targetProgress = ((currentStepIndex + 1) / steps.length) * 100
        
        // Animate progress smoothly to target
        const startProgress = (currentStepIndex / steps.length) * 100
        const progressIncrement = (targetProgress - startProgress) / 50 // 50 increments per step
        
        let currentProgress = startProgress
        const animateProgress = () => {
          currentProgress += progressIncrement
          setProgress(Math.min(currentProgress, targetProgress))
          
          if (currentProgress < targetProgress) {
            setTimeout(animateProgress, step.duration / 50)
          } else {
            currentStepIndex++
            setTimeout(processStep, 300) // Small delay between steps
          }
        }
        
        animateProgress()
      }

      processStep()
    }

    startExport()
  }, [isOpen])

  if (!isOpen) return null

  const getFormatIcon = () => {
    switch (format) {
      case 'excel': return <FileText className="w-6 h-6" />
      case 'csv': return <BarChart3 className="w-6 h-6" />
      case 'pdf': return <TrendingUp className="w-6 h-6" />
      default: return <Download className="w-6 h-6" />
    }
  }

  const getFormatColor = () => {
    switch (format) {
      case 'excel': return 'text-green-600'
      case 'csv': return 'text-blue-600'
      case 'pdf': return 'text-red-600'
      default: return 'text-[#800020]'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
            {isCompleted ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <div className="p-2 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-full">
                <Download className="w-5 h-5 text-white" />
              </div>
            )}
            {isCompleted ? "Xuất dữ liệu thành công!" : "Đang xuất dữ liệu..."}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Tiến trình</span>
              <span className="font-medium text-[#800020]">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Current Step */}
          {!isCompleted && currentStep && (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#800020]/10 to-[#800020]/20 rounded-lg">
              <div className="p-2 bg-[#800020]/20 rounded-full">
                <Zap className="w-4 h-4 text-[#800020]" />
              </div>
              <div>
                <p className="font-medium text-[#800020]">{currentStep}</p>
                <p className="text-xs text-slate-600">Đang xử lý...</p>
              </div>
            </div>
          )}

          {/* Export Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Định dạng:</span>
              <div className="flex items-center gap-2">
                <span className={getFormatColor()}>{getFormatIcon()}</span>
                <span className="font-medium capitalize">{format}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Số trường dữ liệu:</span>
              <span className="font-medium text-[#800020]">{fields.length}</span>
            </div>
          </div>

          {/* Success Message */}
          {isCompleted && (
            <div className="text-center space-y-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
              <div>
                <p className="font-medium text-green-800">Xuất dữ liệu thành công!</p>
                <p className="text-sm text-green-600">File đã được tải về máy của bạn</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
                         {!isCompleted ? (
               <Button variant="outline" onClick={onClose} disabled>
                 Hủy
               </Button>
             ) : (
               <Button onClick={() => {
                 onComplete()
                 onClose()
               }} className="bg-[#800020] hover:bg-[#700018]">
                 <CheckCircle className="w-4 h-4 mr-2" />
                 Hoàn thành
               </Button>
             )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
