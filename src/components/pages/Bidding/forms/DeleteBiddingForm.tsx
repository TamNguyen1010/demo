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
  Trash2, 
  AlertTriangle, 
  FileText, 
  Building2, 
  DollarSign,
  Calendar,
  CheckCircle,
  X,
  AlertCircle,
  Info
} from "lucide-react"
import { BiddingPackage } from "@/types/bidding"

interface DeleteBiddingFormProps {
  biddingPackage: BiddingPackage
  onConfirm: (id: number, reason: string, forceDelete: boolean) => void
  onCancel: () => void
}

interface DeleteValidationResult {
  canDelete: boolean
  dependencies: Dependency[]
  warnings: string[]
  errors: string[]
  requiresApproval: boolean
}

interface Dependency {
  type: 'contract' | 'document' | 'workflow' | 'audit'
  count: number
  details: string
  severity: 'warning' | 'error' | 'info'
}

export function DeleteBiddingForm({ 
  biddingPackage, 
  onConfirm, 
  onCancel 
}: DeleteBiddingFormProps) {
  const [deleteReason, setDeleteReason] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [forceDelete, setForceDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [validationResult, setValidationResult] = useState<DeleteValidationResult>({
    canDelete: true,
    dependencies: [],
    warnings: [],
    errors: [],
    requiresApproval: false
  })

  // Mock validation data - trong thực tế sẽ gọi API
  useEffect(() => {
    const mockValidation: DeleteValidationResult = {
      canDelete: biddingPackage.status === 'draft' || biddingPackage.status === 'created',
      dependencies: [
        {
          type: 'contract',
          count: 0,
          details: 'Không có hợp đồng liên quan',
          severity: 'info'
        },
        {
          type: 'document',
          count: 2,
          details: 'Có 2 tài liệu đính kèm',
          severity: 'warning'
        },
        {
          type: 'workflow',
          count: 1,
          details: 'Có 1 workflow đang hoạt động',
          severity: 'warning'
        }
      ],
      warnings: [
        'Gói thầu có tài liệu đính kèm sẽ bị xóa theo',
        'Workflow đang hoạt động sẽ bị dừng'
      ],
      errors: [],
      requiresApproval: biddingPackage.status === 'created'
    }
    setValidationResult(mockValidation)
  }, [biddingPackage])

  const handleConfirmDelete = async () => {
    if (!deleteReason.trim() || !confirmDelete) return
    
    setIsDeleting(true)
    try {
      await onConfirm(biddingPackage.id, deleteReason, forceDelete)
    } finally {
      setIsDeleting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700">Bản nháp</Badge>
      case 'created':
        return <Badge variant="default" className="bg-blue-100 text-blue-700">Đã tạo</Badge>
      case 'in_progress':
        return <Badge variant="default" className="bg-orange-100 text-orange-700">Đang triển khai</Badge>
      case 'published':
        return <Badge variant="default" className="bg-blue-100 text-blue-700">Đã công bố</Badge>
      case 'bidding':
        return <Badge variant="default" className="bg-orange-100 text-orange-700">Đang thầu</Badge>
      case 'evaluating':
        return <Badge variant="default" className="bg-purple-100 text-purple-700">Đánh giá</Badge>
      case 'awarded':
        return <Badge variant="default" className="bg-green-100 text-green-700">Đã trao thầu</Badge>
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-700">Hoàn thành</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Đã hủy</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getDependencyIcon = (type: string) => {
    switch (type) {
      case 'contract': return <FileText className="w-4 h-4" />
      case 'document': return <FileText className="w-4 h-4" />
      case 'workflow': return <Building2 className="w-4 h-4" />
      case 'audit': return <Info className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  const getDependencyColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-50 border-red-200'
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Warning Header */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="text-lg font-semibold text-red-800">Xác nhận xóa gói thầu</h3>
            <p className="text-sm text-red-700">
              Hành động này không thể hoàn tác. Gói thầu sẽ bị xóa khỏi hệ thống.
            </p>
          </div>
        </div>
      </div>

      {/* Package Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5" />
            Thông tin gói thầu sẽ xóa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Mã gói thầu</Label>
              <p className="text-sm font-medium">{biddingPackage.package_code}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Tên gói thầu</Label>
              <p className="text-sm font-medium">{biddingPackage.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Dự án</Label>
              <p className="text-sm font-medium">{biddingPackage.project_name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Trạng thái</Label>
              <div className="mt-1">{getStatusBadge(biddingPackage.status)}</div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Giá trị dự kiến</Label>
              <p className="text-sm font-medium">
                {biddingPackage.estimated_value?.toLocaleString()} {biddingPackage.currency}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Ngày tạo</Label>
              <p className="text-sm font-medium">{biddingPackage.created_at}</p>
            </div>
          </div>

          {biddingPackage.description && (
            <div>
              <Label className="text-sm font-medium text-gray-600">Mô tả</Label>
              <p className="text-sm mt-1">{biddingPackage.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dependencies Check */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="w-5 h-5" />
            Kiểm tra dependencies
          </CardTitle>
        </CardHeader>
        <CardContent>
          {validationResult.dependencies.length > 0 ? (
            <div className="space-y-3">
              {validationResult.dependencies.map((dep, index) => (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border ${getDependencyColor(dep.severity)}`}>
                  {getDependencyIcon(dep.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {dep.type === 'contract' && 'Hợp đồng liên quan'}
                      {dep.type === 'document' && 'Tài liệu đính kèm'}
                      {dep.type === 'workflow' && 'Workflow đang hoạt động'}
                      {dep.type === 'audit' && 'Lịch sử audit'}
                    </p>
                    <p className="text-xs">{dep.details}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {dep.count}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">Không có dependencies nào được tìm thấy.</p>
          )}

          {validationResult.warnings.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Cảnh báo</span>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                {validationResult.warnings.map((warning, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></span>
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {validationResult.errors.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <X className="w-4 h-4" />
                <span className="text-sm font-medium">Lỗi</span>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {validationResult.errors.map((error, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trash2 className="w-5 h-5" />
            Xác nhận xóa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="delete_reason" className="text-sm font-medium">
              Lý do xóa <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="delete_reason"
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Nhập lý do xóa gói thầu (ít nhất 10 ký tự)"
              rows={3}
              className="mt-1"
            />
            {deleteReason.length > 0 && deleteReason.length < 10 && (
              <p className="text-sm text-red-500 mt-1">
                Lý do xóa phải có ít nhất 10 ký tự
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="confirm_delete"
                checked={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <Label htmlFor="confirm_delete" className="text-sm font-medium">
                Tôi xác nhận muốn xóa gói thầu này
              </Label>
            </div>

            {validationResult.dependencies.some(d => d.severity === 'warning') && (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="force_delete"
                  checked={forceDelete}
                  onChange={(e) => setForceDelete(e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <Label htmlFor="force_delete" className="text-sm font-medium text-red-600">
                  Xóa mặc dù có dependencies (không khuyến khích)
                </Label>
              </div>
            )}
          </div>

          {validationResult.requiresApproval && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-800">
                <Info className="w-4 h-4" />
                <span className="text-sm font-medium">Yêu cầu phê duyệt</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Việc xóa gói thầu này yêu cầu phê duyệt từ quản lý cấp cao.
              </p>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={
                isDeleting || 
                !deleteReason.trim() || 
                deleteReason.length < 10 || 
                !confirmDelete ||
                (!validationResult.canDelete && !forceDelete)
              }
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Đang xóa...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Xóa gói thầu
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
