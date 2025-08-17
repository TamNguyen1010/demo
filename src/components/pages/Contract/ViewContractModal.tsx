"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  X, 
  Edit, 
  Download,
  Calendar,
  DollarSign,
  User,
  Building,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  FolderOpen,
  BarChart3
} from "lucide-react"
import { Contract } from "@/types/contract"

interface ViewContractModalProps {
  isOpen: boolean
  onClose: () => void
  contract: Contract | null
  onEdit: (contract: Contract) => void
  onManageDocuments: (contract: Contract) => void
  onFinancialDashboard: (contract: Contract) => void
}

export function ViewContractModal({ isOpen, onClose, contract, onEdit, onManageDocuments, onFinancialDashboard }: ViewContractModalProps) {
  if (!isOpen || !contract) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <AlertTriangle className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'service': return 'Dịch vụ'
      case 'construction': return 'Xây dựng'
      case 'supply': return 'Cung cấp'
      case 'consulting': return 'Tư vấn'
      default: return type
    }
  }

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Chưa có'
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#800020]" />
            Chi tiết Hợp đồng
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFinancialDashboard(contract)}
              className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Tài chính
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onManageDocuments(contract)}
              className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Tài liệu
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(contract)}
              className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
            >
              <Edit className="w-4 h-4 mr-2" />
              Chỉnh sửa
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header Info */}
          <div className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">{contract.name}</h2>
                <p className="text-slate-600 text-lg">{contract.contract_number || 'Chưa có số hợp đồng'}</p>
                <div className="flex items-center space-x-3">
                  <Badge className={`${getStatusColor(contract.status)} flex items-center gap-2`}>
                    {getStatusIcon(contract.status)}
                    {contract.status === 'draft' && 'Nháp'}
                    {contract.status === 'pending' && 'Chờ duyệt'}
                    {contract.status === 'active' && 'Đang thực hiện'}
                    {contract.status === 'completed' && 'Hoàn thành'}
                    {contract.status === 'cancelled' && 'Đã hủy'}
                  </Badge>
                  <Badge variant="outline" className="border-[#800020]/30 text-[#800020]">
                    {getTypeLabel(contract.type)}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#800020]">
                  {formatCurrency(contract.value, contract.currency)}
                </p>
                <p className="text-sm text-slate-500">Giá trị hợp đồng</p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#800020]" />
                  Thông tin thời gian
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Ngày bắt đầu:</span>
                  <span className="font-medium">{formatDate(contract.start_date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ngày kết thúc:</span>
                  <span className="font-medium">{formatDate(contract.end_date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ngày tạo:</span>
                  <span className="font-medium">{formatDate(contract.created_at)}</span>
                </div>
                {contract.updated_at && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cập nhật lần cuối:</span>
                    <span className="font-medium">{formatDate(contract.updated_at)}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#800020]" />
                  Thông tin tài chính
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Giá trị:</span>
                  <span className="font-medium">{formatCurrency(contract.value, contract.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Đơn vị tiền tệ:</span>
                  <span className="font-medium">{contract.currency}</span>
                </div>
                {contract.budget && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Ngân sách:</span>
                    <span className="font-medium">{formatCurrency(contract.budget, contract.currency)}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Parties Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="w-5 h-5 text-[#800020]" />
                Thông tin các bên
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700">Khách hàng</h4>
                  <p className="text-slate-900">{contract.client_name || 'Chưa có thông tin'}</p>
                  {contract.client_id && (
                    <p className="text-sm text-slate-500">ID: {contract.client_id}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700">Nhà thầu</h4>
                  <p className="text-slate-900">{contract.contractor_name || 'Chưa có thông tin'}</p>
                  {contract.contractor_id && (
                    <p className="text-sm text-slate-500">ID: {contract.contractor_id}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700">Người quản lý</h4>
                  <p className="text-slate-900">{contract.manager_name || 'Chưa có thông tin'}</p>
                  {contract.manager_id && (
                    <p className="text-sm text-slate-500">ID: {contract.manager_id}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          {contract.description && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#800020]" />
                  Mô tả hợp đồng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">{contract.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Additional Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-[#800020]" />
                Thông tin bổ sung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700">Người tạo</h4>
                  <p className="text-slate-900">{contract.created_by || 'Chưa có thông tin'}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700">Người cập nhật cuối</h4>
                  <p className="text-slate-900">{contract.updated_by || 'Chưa có thông tin'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-white p-6 -mx-6 -mb-6">
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => onManageDocuments(contract)}
                className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                Quản lý Tài liệu
              </Button>
              <Button
                variant="outline"
                className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
              >
                <Download className="w-4 h-4 mr-2" />
                Xuất PDF
              </Button>
              <Button
                onClick={() => onEdit(contract)}
                className="bg-[#800020] hover:bg-[#700018] text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
