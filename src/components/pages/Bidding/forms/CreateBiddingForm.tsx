"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Package, 
  Calendar, 
  DollarSign, 
  Building2, 
  FileText,
  Save,
  Eye,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { NewBiddingPackage, TenderMethod, TenderStatus, Priority } from "@/types/bidding"

// Interface đơn giản cho danh sách dự án trong form
interface ProjectOption {
  id: number
  name: string
}

interface CreateBiddingFormProps {
  projects: ProjectOption[]
  onSubmit: (data: NewBiddingPackage) => void
  onSaveDraft: (data: Partial<NewBiddingPackage>) => void
  onCancel: () => void
}

const TENDER_METHODS: { value: TenderMethod; label: string; description: string }[] = [
  { value: 'open_tender', label: 'Đấu thầu rộng rãi', description: 'Mời tất cả nhà thầu có khả năng tham gia' },
  { value: 'limited_tender', label: 'Đấu thầu hạn chế', description: 'Mời một số nhà thầu được lựa chọn' },
  { value: 'direct_appointment', label: 'Chỉ định thầu', description: 'Chỉ định trực tiếp nhà thầu' },
  { value: 'competitive_consultation', label: 'Tư vấn cạnh tranh', description: 'Tư vấn với nhiều đơn vị' }
]

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Thấp', color: 'bg-green-100 text-green-700' },
  { value: 'medium', label: 'Trung bình', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'high', label: 'Cao', color: 'bg-orange-100 text-orange-700' },
  { value: 'critical', label: 'Khẩn cấp', color: 'bg-red-100 text-red-700' }
]

export function CreateBiddingForm({ projects, onSubmit, onSaveDraft, onCancel }: CreateBiddingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<NewBiddingPackage>>({
    name: '',
    description: '',
    project_id: 0,
    tender_method: 'open_tender',
    estimated_value: 0,
    currency: 'VND',
    start_date: '',
    end_date: '',
    priority: 'medium',
    notes: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 4

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name?.trim()) newErrors.name = 'Tên gói thầu là bắt buộc'
      if (!formData.project_id) newErrors.project_id = 'Vui lòng chọn dự án'
      if (!formData.tender_method) newErrors.tender_method = 'Vui lòng chọn hình thức lựa chọn nhà thầu'
    }

    if (step === 2) {
      if (!formData.estimated_value || formData.estimated_value <= 0) {
        newErrors.estimated_value = 'Giá trị dự kiến phải lớn hơn 0'
      }
      if (!formData.start_date) newErrors.start_date = 'Ngày bắt đầu là bắt buộc'
      if (!formData.end_date) newErrors.end_date = 'Ngày kết thúc là bắt buộc'
      if (formData.start_date && formData.end_date && formData.start_date >= formData.end_date) {
        newErrors.end_date = 'Ngày kết thúc phải sau ngày bắt đầu'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true)
      try {
        await onSubmit(formData as NewBiddingPackage)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleSaveDraft = () => {
    onSaveDraft(formData)
  }

  const updateFormData = (field: keyof NewBiddingPackage, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">
            Tên gói thầu <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="Nhập tên gói thầu"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium">
            Mô tả gói thầu
          </Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Mô tả chi tiết gói thầu"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="project" className="text-sm font-medium">
            Dự án liên quan <span className="text-red-500">*</span>
          </Label>
          <select
            id="project"
            value={formData.project_id || ''}
            onChange={(e) => updateFormData('project_id', parseInt(e.target.value))}
            className={`w-full p-2 border rounded-md ${errors.project_id ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Chọn dự án</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          {errors.project_id && <p className="text-sm text-red-500 mt-1">{errors.project_id}</p>}
        </div>

        <div>
          <Label className="text-sm font-medium">
            Hình thức lựa chọn nhà thầu <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {TENDER_METHODS.map(method => (
              <div
                key={method.value}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.tender_method === method.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => updateFormData('tender_method', method.value)}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="tender_method"
                    value={method.value}
                    checked={formData.tender_method === method.value}
                    onChange={() => updateFormData('tender_method', method.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-sm">{method.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{method.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.tender_method && <p className="text-sm text-red-500 mt-1">{errors.tender_method}</p>}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="estimated_value" className="text-sm font-medium">
            Giá trị dự kiến <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="estimated_value"
              type="number"
              value={formData.estimated_value || ''}
              onChange={(e) => updateFormData('estimated_value', parseFloat(e.target.value) || 0)}
              placeholder="0"
              className={errors.estimated_value ? 'border-red-500' : ''}
            />
            <select
              value={formData.currency || 'VND'}
              onChange={(e) => updateFormData('currency', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="VND">VND</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          {errors.estimated_value && <p className="text-sm text-red-500 mt-1">{errors.estimated_value}</p>}
        </div>

        <div>
          <Label htmlFor="priority" className="text-sm font-medium">
            Mức độ ưu tiên
          </Label>
          <select
            id="priority"
            value={formData.priority || 'medium'}
            onChange={(e) => updateFormData('priority', e.target.value as Priority)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {PRIORITIES.map(priority => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start_date" className="text-sm font-medium">
            Ngày bắt đầu dự kiến <span className="text-red-500">*</span>
          </Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date || ''}
            onChange={(e) => updateFormData('start_date', e.target.value)}
            className={errors.start_date ? 'border-red-500' : ''}
          />
          {errors.start_date && <p className="text-sm text-red-500 mt-1">{errors.start_date}</p>}
        </div>

        <div>
          <Label htmlFor="end_date" className="text-sm font-medium">
            Ngày kết thúc dự kiến <span className="text-red-500">*</span>
          </Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date || ''}
            onChange={(e) => updateFormData('end_date', e.target.value)}
            className={errors.end_date ? 'border-red-500' : ''}
          />
          {errors.end_date && <p className="text-sm text-red-500 mt-1">{errors.end_date}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="notes" className="text-sm font-medium">
          Ghi chú
        </Label>
        <Textarea
          id="notes"
          value={formData.notes || ''}
          onChange={(e) => updateFormData('notes', e.target.value)}
          placeholder="Ghi chú bổ sung về gói thầu"
          rows={3}
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Thông tin bổ sung (Tùy chọn)</h3>
        <p className="text-sm text-blue-700">
          Các thông tin này có thể được cập nhật sau khi gói thầu được tạo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tbmt_code" className="text-sm font-medium">
            Mã TBMT
          </Label>
          <Input
            id="tbmt_code"
            value={formData.tbmt_code || ''}
            onChange={(e) => updateFormData('tbmt_code', e.target.value)}
            placeholder="TBMT-XXXX-YYYY"
          />
        </div>

        <div>
          <Label htmlFor="participant_count" className="text-sm font-medium">
            Số lượng nhà thầu tham gia
          </Label>
          <Input
            id="participant_count"
            type="number"
            value={formData.participant_count || ''}
            onChange={(e) => updateFormData('participant_count', parseInt(e.target.value) || 0)}
            placeholder="0"
            min="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="hsmt_approval" className="text-sm font-medium">
            Quyết định phê duyệt HSMT
          </Label>
          <Input
            id="hsmt_approval"
            value={formData.hsmt_approval_decision || ''}
            onChange={(e) => updateFormData('hsmt_approval_decision', e.target.value)}
            placeholder="Link từ Bitrix"
          />
        </div>

        <div>
          <Label htmlFor="kqlcnt_approval" className="text-sm font-medium">
            Quyết định phê duyệt KQLCNT
          </Label>
          <Input
            id="kqlcnt_approval"
            value={formData.kqlcnt_approval_decision || ''}
            onChange={(e) => updateFormData('kqlcnt_approval_decision', e.target.value)}
            placeholder="Link từ Bitrix"
          />
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-3">Xem lại thông tin gói thầu</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Tên gói thầu</Label>
              <p className="text-sm font-medium">{formData.name || 'Chưa nhập'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Dự án liên quan</Label>
              <p className="text-sm font-medium">
                {projects.find(p => p.id === formData.project_id)?.name || 'Chưa chọn'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Hình thức lựa chọn</Label>
              <p className="text-sm font-medium">
                {TENDER_METHODS.find(m => m.value === formData.tender_method)?.label || 'Chưa chọn'}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Giá trị dự kiến</Label>
              <p className="text-sm font-medium">
                {formData.estimated_value ? `${formData.estimated_value.toLocaleString()} ${formData.currency}` : 'Chưa nhập'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Ngày bắt đầu</Label>
              <p className="text-sm font-medium">{formData.start_date || 'Chưa nhập'}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Ngày kết thúc</Label>
              <p className="text-sm font-medium">{formData.end_date || 'Chưa nhập'}</p>
            </div>
          </div>

          {formData.description && (
            <div>
              <Label className="text-sm font-medium text-gray-600">Mô tả</Label>
              <p className="text-sm">{formData.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 text-yellow-800">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Lưu ý</span>
        </div>
        <p className="text-sm text-yellow-700 mt-1">
          Sau khi tạo gói thầu, hệ thống sẽ tự động triển khai workflow trên Bitrix theo hình thức lựa chọn nhà thầu đã chọn.
        </p>
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      default: return renderStep1()
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Thông tin cơ bản'
      case 2: return 'Giá trị và thời gian'
      case 3: return 'Thông tin bổ sung'
      case 4: return 'Xem lại và xác nhận'
      default: return ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i + 1} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i + 1 < currentStep
                  ? 'bg-green-500 text-white'
                  : i + 1 === currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {i + 1 < currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              {i + 1 < totalSteps && (
                <div className={`w-16 h-0.5 mx-2 ${
                  i + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold text-center">{getStepTitle(currentStep)}</h2>
      </div>

      {/* Form Content */}
      <Card>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevious}>
              Quay lại
            </Button>
          )}
          <Button variant="outline" onClick={onCancel}>
            Hủy
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="w-4 h-4 mr-2" />
            Lưu nháp
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Tiếp theo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Đang tạo...' : 'Tạo gói thầu'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
