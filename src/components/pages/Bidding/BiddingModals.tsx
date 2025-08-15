"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Package, 
  Globe, 
  FileText, 
  Download, 
  X,
  Plus,
  Edit,
  Eye,
  Trash2,
  Send,
  Award,
  Save,
  FolderOpen,
  History
} from "lucide-react"
import { BiddingPackage, NewBiddingPackage } from "@/types/bidding"
import { CreateBiddingForm } from "./forms/CreateBiddingForm"
import { EditBiddingForm } from "./forms/EditBiddingForm"
import { DeleteBiddingForm } from "./forms/DeleteBiddingForm"
import { DocumentManagementForm } from "./forms/DocumentManagementForm"
import { ChangeHistoryForm } from "./forms/ChangeHistoryForm"
import { TenderPortalIntegration } from "./forms/TenderPortalIntegration"

interface BiddingModalsProps {
  showCreateModal: boolean
  showDetailsModal: boolean
  showEditModal: boolean
  showDeleteModal: boolean
  showDocumentsModal: boolean
  showHistoryModal: boolean
  showExportModal: boolean
  selectedPackage: BiddingPackage | null
  onCloseCreateModal: () => void
  onCloseDetailsModal: () => void
  onCloseEditModal: () => void
  onCloseDeleteModal: () => void
  onCloseDocumentsModal: () => void
  onCloseHistoryModal: () => void
  onCloseExportModal: () => void
  onCreatePackage: (data: NewBiddingPackage) => void
  onUpdatePackage: (id: number, data: Partial<BiddingPackage>) => void
  onDeletePackage: (id: number, reason: string, forceDelete: boolean) => void
}

// Interface đơn giản cho danh sách dự án trong form
interface ProjectOption {
  id: number
  name: string
}

export function BiddingModals({
  showCreateModal,
  showDetailsModal,
  showEditModal,
  showDeleteModal,
  showDocumentsModal,
  showHistoryModal,
  showExportModal,
  selectedPackage,
  onCloseCreateModal,
  onCloseDetailsModal,
  onCloseEditModal,
  onCloseDeleteModal,
  onCloseDocumentsModal,
  onCloseHistoryModal,
  onCloseExportModal,
  onCreatePackage,
  onUpdatePackage,
  onDeletePackage
}: BiddingModalsProps) {
  const [activeTab, setActiveTab] = useState("create")
  const [projects] = useState<ProjectOption[]>([
    { id: 1, name: "Xây dựng trụ sở chính" },
    { id: 2, name: "Nâng cấp hệ thống điện" },
    { id: 3, name: "Hiện đại hóa công nghệ" }
  ])

  const handleCreatePackage = async (data: NewBiddingPackage) => {
    try {
      await onCreatePackage(data)
      onCloseCreateModal()
      setActiveTab("create")
    } catch (error) {
      console.error("Lỗi khi tạo gói thầu:", error)
    }
  }

  const handleUpdatePackage = async (id: number, data: Partial<BiddingPackage>) => {
    try {
      await onUpdatePackage(id, data)
      onCloseEditModal()
    } catch (error) {
      console.error("Lỗi khi cập nhật gói thầu:", error)
    }
  }

  const handleDeletePackage = async (id: number, reason: string, forceDelete: boolean) => {
    try {
      await onDeletePackage(id, reason, forceDelete)
      onCloseDeleteModal()
    } catch (error) {
      console.error("Lỗi khi xóa gói thầu:", error)
    }
  }

  const handleSaveDraft = (data: Partial<NewBiddingPackage>) => {
    console.log("Lưu nháp:", data)
    // TODO: Implement save draft functionality
  }

  const handlePortalDataFetched = (data: any) => {
    console.log("Dữ liệu từ Cổng thông tin:", data)
    // TODO: Auto-fill form with portal data
    setActiveTab("create")
  }

  const handleCloseCreateModal = () => {
    onCloseCreateModal()
    setActiveTab("create")
  }

  return (
    <>
      {/* Create/Edit Modal */}
      <Dialog open={showCreateModal} onOpenChange={handleCloseCreateModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Tạo gói thầu mới
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Tạo thủ công
              </TabsTrigger>
              <TabsTrigger value="portal" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Từ Cổng thông tin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="mt-6">
              <CreateBiddingForm
                projects={projects}
                onSubmit={handleCreatePackage}
                onSaveDraft={handleSaveDraft}
                onCancel={handleCloseCreateModal}
              />
            </TabsContent>

            <TabsContent value="portal" className="mt-6">
              <TenderPortalIntegration
                onDataFetched={handlePortalDataFetched}
                onCancel={handleCloseCreateModal}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={onCloseEditModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Chỉnh sửa gói thầu
            </DialogTitle>
          </DialogHeader>

          {selectedPackage && (
            <EditBiddingForm
              biddingPackage={selectedPackage}
              projects={projects}
              onSubmit={handleUpdatePackage}
              onSaveDraft={(data) => handleSaveDraft(data)}
              onCancel={onCloseEditModal}
              onViewHistory={() => {
                // TODO: Implement view history functionality
                console.log("View history for package:", selectedPackage.id)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={onCloseDeleteModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Xóa gói thầu
            </DialogTitle>
          </DialogHeader>

          {selectedPackage && (
            <DeleteBiddingForm
              biddingPackage={selectedPackage}
              onConfirm={handleDeletePackage}
              onCancel={onCloseDeleteModal}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Document Management Modal */}
      <Dialog open={showDocumentsModal} onOpenChange={onCloseDocumentsModal}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Quản lý tài liệu đính kèm
            </DialogTitle>
          </DialogHeader>

          {selectedPackage && (
            <DocumentManagementForm
              biddingPackage={selectedPackage}
              onClose={onCloseDocumentsModal}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Change History Modal */}
      <Dialog open={showHistoryModal} onOpenChange={onCloseHistoryModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Lịch sử thay đổi
            </DialogTitle>
          </DialogHeader>

          {selectedPackage && (
            <ChangeHistoryForm
              biddingPackage={selectedPackage}
              onClose={onCloseHistoryModal}
              onRollback={(changeId) => {
                // TODO: Implement rollback functionality
                console.log("Rollback change:", changeId)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={onCloseDetailsModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Chi tiết gói thầu
            </DialogTitle>
          </DialogHeader>

          {selectedPackage && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Mã gói thầu</label>
                  <p className="text-sm font-medium">{selectedPackage.package_code}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Tên gói thầu</label>
                  <p className="text-sm font-medium">{selectedPackage.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Dự án</label>
                  <p className="text-sm font-medium">{selectedPackage.project_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Giá trị dự kiến</label>
                  <p className="text-sm font-medium">
                    {selectedPackage.estimated_value?.toLocaleString()} VND
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    selectedPackage.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                    selectedPackage.status === 'published' ? 'bg-blue-100 text-blue-800' :
                    selectedPackage.status === 'bidding' ? 'bg-orange-100 text-orange-800' :
                    selectedPackage.status === 'awarded' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedPackage.status === 'draft' ? 'Bản nháp' :
                     selectedPackage.status === 'published' ? 'Đã công bố' :
                     selectedPackage.status === 'bidding' ? 'Đang thầu' :
                     selectedPackage.status === 'awarded' ? 'Đã trao thầu' :
                     selectedPackage.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Mức độ ưu tiên</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    selectedPackage.priority === 'low' ? 'bg-green-100 text-green-800' :
                    selectedPackage.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    selectedPackage.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedPackage.priority === 'low' ? 'Thấp' :
                     selectedPackage.priority === 'medium' ? 'Trung bình' :
                     selectedPackage.priority === 'high' ? 'Cao' :
                     'Khẩn cấp'}
                  </span>
                </div>
              </div>

              {selectedPackage.description && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Mô tả</label>
                  <p className="text-sm mt-1">{selectedPackage.description}</p>
                </div>
              )}

              {/* Additional Information */}
              {(selectedPackage.tbmt_code || selectedPackage.participant_count) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPackage.tbmt_code && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Mã TBMT</label>
                      <p className="text-sm font-medium">{selectedPackage.tbmt_code}</p>
                    </div>
                  )}
                  {selectedPackage.participant_count && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Số lượng nhà thầu</label>
                      <p className="text-sm font-medium">{selectedPackage.participant_count}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Timeline Information */}
              {(selectedPackage.start_date || selectedPackage.end_date) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPackage.start_date && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Ngày bắt đầu</label>
                      <p className="text-sm font-medium">{selectedPackage.start_date}</p>
                    </div>
                  )}
                  {selectedPackage.end_date && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Ngày kết thúc</label>
                      <p className="text-sm font-medium">{selectedPackage.end_date}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={onCloseDetailsModal}>
                  Đóng
                </Button>
                <Button variant="outline" onClick={() => {
                  onCloseDetailsModal()
                  // TODO: Show edit modal
                }}>
                  <Edit className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </Button>
                <Button variant="outline" onClick={() => {
                  onCloseDetailsModal()
                  // TODO: Show documents modal
                }}>
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Tài liệu
                </Button>
                {selectedPackage.status === 'draft' && (
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Công bố
                  </Button>
                )}
                {selectedPackage.status === 'published' && (
                  <Button>
                    <Award className="w-4 h-4 mr-2" />
                    Trao thầu
                  </Button>
                )}
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
              <Download className="w-5 h-5" />
              Xuất dữ liệu gói thầu
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Định dạng xuất</label>
              <select className="w-full p-2 border border-gray-300 rounded-md mt-1">
                <option value="excel">Excel (.xlsx)</option>
                <option value="pdf">PDF (.pdf)</option>
                <option value="csv">CSV (.csv)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Phạm vi dữ liệu</label>
              <select className="w-full p-2 border border-gray-300 rounded-md mt-1">
                <option value="all">Tất cả gói thầu</option>
                <option value="current_year">Năm hiện tại</option>
                <option value="selected">Đã chọn</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onCloseExportModal}>
                Hủy
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Xuất dữ liệu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
