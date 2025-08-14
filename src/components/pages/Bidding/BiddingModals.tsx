"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  X,
  Calendar,
  DollarSign,
  User,
  Building
} from "lucide-react"
import { BiddingPackage, NewBiddingPackage } from "@/types/bidding"
import { formatCurrency } from "@/lib/utils"

interface BiddingModalsProps {
  showCreateModal: boolean
  showDetailsModal: boolean
  showExportModal: boolean
  selectedPackage: BiddingPackage | null
  onCloseCreateModal: () => void
  onCloseDetailsModal: () => void
  onCloseExportModal: () => void
  onCreatePackage: (data: NewBiddingPackage) => void
  onUpdatePackage: (id: number, updates: Partial<BiddingPackage>) => void
}

export function BiddingModals({
  showCreateModal,
  showDetailsModal,
  showExportModal,
  selectedPackage,
  onCloseCreateModal,
  onCloseDetailsModal,
  onCloseExportModal,
  onCreatePackage,
  onUpdatePackage
}: BiddingModalsProps) {
  const [createForm, setCreateForm] = useState<Partial<NewBiddingPackage>>({
    name: "",
    description: "",
    project_id: 1,
    estimated_value: 0,
    contract_type: "construction",
    bidding_method: "open",
    priority: "medium",
    department: "",
    package_manager: "",
    bidding_deadline: "",
    evaluation_deadline: "",
    notes: ""
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700">Bản nháp</Badge>
      case 'published':
        return <Badge variant="default" className="bg-blue-100 text-blue-700">Đã công bố</Badge>
      case 'bidding':
        return <Badge variant="default" className="bg-orange-100 text-orange-700">Đang thầu</Badge>
      case 'evaluating':
        return <Badge variant="default" className="bg-purple-100 text-purple-700">Đánh giá</Badge>
      case 'awarded':
        return <Badge variant="default" className="bg-green-100 text-green-700">Đã trao thầu</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Đã hủy</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="text-green-600 border-green-200">Thấp</Badge>
      case 'medium':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Trung bình</Badge>
      case 'high':
        return <Badge variant="outline" className="text-orange-600 border-orange-200">Cao</Badge>
      case 'urgent':
        return <Badge variant="outline" className="text-red-600 border-red-200">Khẩn cấp</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case 'construction': return 'Xây dựng'
      case 'supply': return 'Cung cấp'
      case 'service': return 'Dịch vụ'
      case 'mixed': return 'Hỗn hợp'
      default: return type
    }
  }

  const getBiddingMethodLabel = (method: string) => {
    switch (method) {
      case 'open': return 'Mở thầu'
      case 'limited': return 'Hạn chế'
      case 'direct': return 'Chỉ định thầu'
      case 'competitive': return 'Cạnh tranh'
      default: return method
    }
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (createForm.name && createForm.department && createForm.package_manager) {
      onCreatePackage(createForm as NewBiddingPackage)
      setCreateForm({
        name: "",
        description: "",
        project_id: 1,
        estimated_value: 0,
        contract_type: "construction",
        bidding_method: "open",
        priority: "medium",
        department: "",
        package_manager: "",
        bidding_deadline: "",
        evaluation_deadline: "",
        notes: ""
      })
    }
  }

  return (
    <>
      {/* Create Modal */}
      <Dialog open={showCreateModal} onOpenChange={onCloseCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Tạo gói thầu mới
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Tên gói thầu *</Label>
                <Input
                  id="name"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  placeholder="Nhập tên gói thầu"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="estimated_value">Giá trị ước tính *</Label>
                <Input
                  id="estimated_value"
                  type="number"
                  value={createForm.estimated_value}
                  onChange={(e) => setCreateForm({ ...createForm, estimated_value: Number(e.target.value) })}
                  placeholder="0"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contract_type">Loại hợp đồng</Label>
                <select
                  id="contract_type"
                  value={createForm.contract_type}
                  onChange={(e) => setCreateForm({ ...createForm, contract_type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                >
                  <option value="construction">Xây dựng</option>
                  <option value="supply">Cung cấp</option>
                  <option value="service">Dịch vụ</option>
                  <option value="mixed">Hỗn hợp</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="bidding_method">Phương thức thầu</Label>
                <select
                  id="bidding_method"
                  value={createForm.bidding_method}
                  onChange={(e) => setCreateForm({ ...createForm, bidding_method: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                >
                  <option value="open">Mở thầu</option>
                  <option value="limited">Hạn chế</option>
                  <option value="direct">Chỉ định thầu</option>
                  <option value="competitive">Cạnh tranh</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="priority">Độ ưu tiên</Label>
                <select
                  id="priority"
                  value={createForm.priority}
                  onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                >
                  <option value="low">Thấp</option>
                  <option value="medium">Trung bình</option>
                  <option value="high">Cao</option>
                  <option value="urgent">Khẩn cấp</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="department">Phòng ban *</Label>
                <Input
                  id="department"
                  value={createForm.department}
                  onChange={(e) => setCreateForm({ ...createForm, department: e.target.value })}
                  placeholder="Nhập phòng ban"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="package_manager">Người quản lý *</Label>
                <Input
                  id="package_manager"
                  value={createForm.package_manager}
                  onChange={(e) => setCreateForm({ ...createForm, package_manager: e.target.value })}
                  placeholder="Nhập tên người quản lý"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="bidding_deadline">Hạn nộp hồ sơ</Label>
                <Input
                  id="bidding_deadline"
                  type="date"
                  value={createForm.bidding_deadline}
                  onChange={(e) => setCreateForm({ ...createForm, bidding_deadline: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="evaluation_deadline">Hạn đánh giá</Label>
                <Input
                  id="evaluation_deadline"
                  type="date"
                  value={createForm.evaluation_deadline}
                  onChange={(e) => setCreateForm({ ...createForm, evaluation_deadline: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={createForm.description}
                onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                placeholder="Nhập mô tả gói thầu"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="notes">Ghi chú</Label>
              <Textarea
                id="notes"
                value={createForm.notes}
                onChange={(e) => setCreateForm({ ...createForm, notes: e.target.value })}
                placeholder="Nhập ghi chú (tùy chọn)"
                rows={2}
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onCloseCreateModal}>
                Hủy
              </Button>
              <Button type="submit">
                Tạo gói thầu
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={onCloseDetailsModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Chi tiết gói thầu
            </DialogTitle>
          </DialogHeader>
          
          {selectedPackage && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    {selectedPackage.name}
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    {getStatusBadge(selectedPackage.status)}
                    {getPriorityBadge(selectedPackage.priority)}
                    <Badge variant="outline">{selectedPackage.package_code}</Badge>
                  </div>
                </div>
              </div>
              
              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Thông tin tài chính
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Giá trị ước tính:</span>
                        <span className="font-medium">{formatCurrency(selectedPackage.estimated_value)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Thông tin dự án
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Dự án:</span>
                        <span className="font-medium">{selectedPackage.project_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Loại hợp đồng:</span>
                        <span className="font-medium">{getContractTypeLabel(selectedPackage.contract_type)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Phương thức thầu:</span>
                        <span className="font-medium">{getBiddingMethodLabel(selectedPackage.bidding_method)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Thông tin quản lý
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Người quản lý:</span>
                        <span className="font-medium">{selectedPackage.package_manager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Phòng ban:</span>
                        <span className="font-medium">{selectedPackage.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Người tạo:</span>
                        <span className="font-medium">{selectedPackage.created_by}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Thời gian
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Ngày tạo:</span>
                        <span className="font-medium">{new Date(selectedPackage.created_at).toLocaleDateString('vi-VN')}</span>
                      </div>
                      {selectedPackage.published_date && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Ngày công bố:</span>
                          <span className="font-medium">{selectedPackage.published_date}</span>
                        </div>
                      )}
                      {selectedPackage.bidding_deadline && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Hạn nộp hồ sơ:</span>
                          <span className="font-medium">{selectedPackage.bidding_deadline}</span>
                        </div>
                      )}
                      {selectedPackage.evaluation_deadline && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Hạn đánh giá:</span>
                          <span className="font-medium">{selectedPackage.evaluation_deadline}</span>
                        </div>
                      )}
                      {selectedPackage.award_date && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Ngày trao thầu:</span>
                          <span className="font-medium">{selectedPackage.award_date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              {selectedPackage.description && (
                <div>
                  <h3 className="font-medium text-slate-700 mb-2">Mô tả</h3>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md">
                    {selectedPackage.description}
                  </p>
                </div>
              )}
              
              {/* Notes */}
              {selectedPackage.notes && (
                <div>
                  <h3 className="font-medium text-slate-700 mb-2">Ghi chú</h3>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md italic">
                    "{selectedPackage.notes}"
                  </p>
                </div>
              )}
              
              <div className="flex justify-end">
                <Button variant="outline" onClick={onCloseDetailsModal}>
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Export Modal */}
      <Dialog open={showExportModal} onOpenChange={onCloseExportModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Xuất dữ liệu gói thầu
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Chọn định dạng xuất dữ liệu gói thầu:
            </p>
            
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Excel (.xlsx)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                CSV (.csv)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                PDF (.pdf)
              </Button>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onCloseExportModal}>
                Hủy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
