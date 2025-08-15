"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  History, 
  Clock, 
  User, 
  FileText, 
  CheckCircle, 
  X,
  AlertCircle,
  Undo2,
  Eye,
  Calendar
} from "lucide-react"
import { BiddingPackage } from "@/types/bidding"

interface ChangeHistoryFormProps {
  biddingPackage: BiddingPackage
  onClose: () => void
  onRollback?: (changeId: number) => void
}

interface TenderPackageChange {
  id: number
  field_name: string
  old_value: string
  new_value: string
  change_type: 'update' | 'delete' | 'restore'
  change_reason?: string
  requires_approval: boolean
  approval_status: 'pending' | 'approved' | 'rejected'
  approved_by?: string
  approved_at?: string
  performed_by: string
  performed_at: string
}

// Mock data cho lịch sử thay đổi
const MOCK_CHANGES: TenderPackageChange[] = [
  {
    id: 1,
    field_name: 'name',
    old_value: 'Gói thầu xây dựng trụ sở chính',
    new_value: 'Gói thầu xây dựng trụ sở chính - Cập nhật',
    change_type: 'update',
    change_reason: 'Cập nhật tên gói thầu theo yêu cầu mới',
    requires_approval: false,
    approval_status: 'approved',
    performed_by: 'Nguyễn Văn A',
    performed_at: '2024-01-20T14:30:00Z'
  },
  {
    id: 2,
    field_name: 'estimated_value',
    old_value: '5000000000',
    new_value: '5500000000',
    change_type: 'update',
    change_reason: 'Điều chỉnh giá trị dự kiến theo thay đổi thiết kế',
    requires_approval: true,
    approval_status: 'pending',
    performed_by: 'Trần Thị B',
    performed_at: '2024-01-19T10:15:00Z'
  },
  {
    id: 3,
    field_name: 'start_date',
    old_value: '2024-02-01',
    new_value: '2024-02-15',
    change_type: 'update',
    change_reason: 'Hoãn ngày bắt đầu do thời tiết',
    requires_approval: false,
    approval_status: 'approved',
    performed_by: 'Lê Văn C',
    performed_at: '2024-01-18T16:45:00Z'
  },
  {
    id: 4,
    field_name: 'tender_method',
    old_value: 'open_tender',
    new_value: 'limited_tender',
    change_type: 'update',
    change_reason: 'Thay đổi hình thức lựa chọn nhà thầu',
    requires_approval: true,
    approval_status: 'rejected',
    approved_by: 'Phạm Thị D',
    approved_at: '2024-01-17T09:20:00Z',
    performed_by: 'Nguyễn Văn A',
    performed_at: '2024-01-16T11:30:00Z'
  }
]

export function ChangeHistoryForm({ 
  biddingPackage, 
  onClose, 
  onRollback 
}: ChangeHistoryFormProps) {
  const [changes, setChanges] = useState<TenderPackageChange[]>(MOCK_CHANGES)
  const [selectedChange, setSelectedChange] = useState<TenderPackageChange | null>(null)

  const getFieldLabel = (fieldName: string) => {
    const fieldLabels: Record<string, string> = {
      'name': 'Tên gói thầu',
      'description': 'Mô tả',
      'project_id': 'Dự án liên quan',
      'tender_method': 'Hình thức lựa chọn nhà thầu',
      'estimated_value': 'Giá trị dự kiến',
      'start_date': 'Ngày bắt đầu',
      'end_date': 'Ngày kết thúc',
      'priority': 'Mức độ ưu tiên',
      'tbmt_code': 'Mã TBMT',
      'participant_count': 'Số lượng nhà thầu'
    }
    return fieldLabels[fieldName] || fieldName
  }

  const getChangeTypeIcon = (changeType: string) => {
    switch (changeType) {
      case 'update': return <FileText className="w-4 h-4 text-blue-500" />
      case 'delete': return <X className="w-4 h-4 text-red-500" />
      case 'restore': return <Undo2 className="w-4 h-4 text-green-500" />
      default: return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const getChangeTypeLabel = (changeType: string) => {
    switch (changeType) {
      case 'update': return 'Cập nhật'
      case 'delete': return 'Xóa'
      case 'restore': return 'Khôi phục'
      default: return changeType
    }
  }

  const getApprovalStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Chờ phê duyệt</Badge>
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-200">Đã phê duyệt</Badge>
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-200">Từ chối</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const canRollback = (change: TenderPackageChange) => {
    // Chỉ có thể rollback trong vòng 24h và nếu đã được phê duyệt
    const changeTime = new Date(change.performed_at).getTime()
    const now = new Date().getTime()
    const hoursDiff = (now - changeTime) / (1000 * 60 * 60)
    
    return hoursDiff <= 24 && change.approval_status === 'approved'
  }

  const handleRollback = (changeId: number) => {
    if (onRollback) {
      onRollback(changeId)
    }
  }

  const getValueDisplay = (value: string, fieldName: string) => {
    if (fieldName === 'estimated_value') {
      return `${parseInt(value).toLocaleString()} VND`
    }
    if (fieldName === 'tender_method') {
      const methodLabels: Record<string, string> = {
        'open_tender': 'Đấu thầu rộng rãi',
        'limited_tender': 'Đấu thầu hạn chế',
        'direct_appointment': 'Chỉ định thầu',
        'competitive_consultation': 'Tư vấn cạnh tranh'
      }
      return methodLabels[value] || value
    }
    if (fieldName === 'priority') {
      const priorityLabels: Record<string, string> = {
        'low': 'Thấp',
        'medium': 'Trung bình',
        'high': 'Cao',
        'critical': 'Khẩn cấp'
      }
      return priorityLabels[value] || value
    }
    return value
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lịch sử thay đổi</h2>
          <p className="text-gray-600">Gói thầu: {biddingPackage.package_code} - {biddingPackage.name}</p>
        </div>
        <Button onClick={onClose} variant="outline">
          <X className="w-4 h-4 mr-2" />
          Đóng
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Tổng quan thay đổi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{changes.length}</div>
              <div className="text-sm text-blue-600">Tổng số thay đổi</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {changes.filter(c => c.approval_status === 'pending').length}
              </div>
              <div className="text-sm text-yellow-600">Chờ phê duyệt</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {changes.filter(c => c.approval_status === 'approved').length}
              </div>
              <div className="text-sm text-green-600">Đã phê duyệt</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {changes.filter(c => c.approval_status === 'rejected').length}
              </div>
              <div className="text-sm text-red-600">Bị từ chối</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Changes Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Dòng thời gian thay đổi
          </CardTitle>
        </CardHeader>
        <CardContent>
          {changes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <History className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Không có thay đổi nào</p>
              <p className="text-sm">Gói thầu này chưa có lịch sử thay đổi.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {changes.map((change, index) => (
                <div key={change.id} className="relative">
                  {/* Timeline line */}
                  {index < changes.length - 1 && (
                    <div className="absolute left-6 top-8 w-0.5 h-16 bg-gray-200"></div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      {getChangeTypeIcon(change.change_type)}
                    </div>
                    
                    {/* Change content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-gray-900">
                            {getFieldLabel(change.field_name)}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {getChangeTypeLabel(change.change_type)}
                          </Badge>
                          {getApprovalStatusBadge(change.approval_status)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {formatDate(change.performed_at)}
                        </div>
                      </div>
                      
                      {/* Change details */}
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Giá trị cũ:</label>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {getValueDisplay(change.old_value, change.field_name)}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Giá trị mới:</label>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {getValueDisplay(change.new_value, change.field_name)}
                            </p>
                          </div>
                        </div>
                        
                        {change.change_reason && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Lý do thay đổi:</label>
                            <p className="text-sm text-gray-700 mt-1">{change.change_reason}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>Thực hiện bởi: {change.performed_by}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {change.requires_approval && change.approval_status === 'approved' && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Phê duyệt bởi: {change.approved_by}</span>
                                {change.approved_at && (
                                  <span>lúc {formatDate(change.approved_at)}</span>
                                )}
                              </div>
                            )}
                            
                            {change.requires_approval && change.approval_status === 'rejected' && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <X className="w-4 h-4 text-red-500" />
                                <span>Từ chối bởi: {change.approved_by}</span>
                                {change.approved_at && (
                                  <span>lúc {formatDate(change.approved_at)}</span>
                                )}
                              </div>
                            )}
                            
                            {canRollback(change) && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRollback(change.id)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Undo2 className="w-4 h-4 mr-2" />
                                Hoàn tác
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
