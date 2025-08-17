"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  Send,
  CheckCircle, 
  AlertCircle,
  Download,
  FileText,
  Calendar,
  DollarSign,
  Target,
  User,
  Clock,
  Info,
  Zap,
  RefreshCw,
  Activity,
  Shield,
  TrendingUp
} from "lucide-react"
import { Project, NewProject } from "@/types/project"
import { formatCurrency } from "@/lib/utils"
import { ExportProgressModal } from "./ExportProgressModal"

// Create Project Modal
export function CreateProjectModal({ 
  isOpen, 
  onClose, 
  onSubmit 
}: { 
  isOpen: boolean
  onClose: () => void
  onSubmit: (project: NewProject) => void
}) {
  const [formData, setFormData] = useState<NewProject>({
    name: "",
    category: "INV",
    department: "IT",
    planned_budget: 0,
    start_date: new Date().toISOString().split('T')[0],
    project_manager: "",
    project_creator: "",
    funding_source: "Đầu tư phát triển",
    is_strategic_project: false,
    strategic_project: "",
    investment_decision_number: "",
    investment_decision_date: "",
    investment_decision_duration: 0,
    project_approval_number: "",
    project_approval_date: "",
    project_approval_duration: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#800020]" />
            Tạo Dự án Mới
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Thông tin cơ bản
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tên dự án *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Nhập tên dự án"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Loại dự án *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
                    >
                      <option value="INV">Dự án Đầu tư</option>
                      <option value="PUR">Dự án Mua sắm</option>
                      <option value="SER">Dự án Thuê dịch vụ</option>
                      <option value="MAI">Dự án Bảo trì</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phòng ban *
                    </label>
                    <select
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020]"
                    >
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="FAC">FAC</option>
                      <option value="FIN">FIN</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ngày bắt đầu *
                  </label>
                  <Input
                    required
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ngân sách dự kiến (VND) *
                  </label>
                  <Input
                    required
                    type="number"
                    value={formData.planned_budget}
                    onChange={(e) => setFormData({...formData, planned_budget: Number(e.target.value)})}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Project Management */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Quản lý dự án
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Quản lý dự án *
                  </label>
                  <Input
                    required
                    value={formData.project_manager}
                    onChange={(e) => setFormData({...formData, project_manager: e.target.value})}
                    placeholder="Tên quản lý dự án"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Người tạo dự án *
                  </label>
                  <Input
                    required
                    value={formData.project_creator}
                    onChange={(e) => setFormData({...formData, project_creator: e.target.value})}
                    placeholder="Tên người tạo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nguồn vốn
                  </label>
                  <Input
                    value={formData.funding_source}
                    onChange={(e) => setFormData({...formData, funding_source: e.target.value})}
                    placeholder="Nguồn vốn"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="strategic"
                    checked={formData.is_strategic_project}
                    onChange={(e) => setFormData({...formData, is_strategic_project: e.target.checked})}
                    className="w-4 h-4 text-[#800020]"
                  />
                  <label htmlFor="strategic" className="text-sm text-slate-700">
                    Dự án chiến lược
                  </label>
                </div>

                {formData.is_strategic_project && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tên đề án chiến lược
                    </label>
                    <Input
                      value={formData.strategic_project}
                      onChange={(e) => setFormData({...formData, strategic_project: e.target.value})}
                      placeholder="Tên đề án chiến lược"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Decision Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Thông tin quyết định
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-600">Quyết định đầu tư</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Số quyết định
                    </label>
                    <Input
                      value={formData.investment_decision_number}
                      onChange={(e) => setFormData({...formData, investment_decision_number: e.target.value})}
                      placeholder="QĐ-YYYY-XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Ngày quyết định
                    </label>
                    <Input
                      type="date"
                      value={formData.investment_decision_date}
                      onChange={(e) => setFormData({...formData, investment_decision_date: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Thời hạn (tháng)
                    </label>
                    <Input
                      type="number"
                      value={formData.investment_decision_duration}
                      onChange={(e) => setFormData({...formData, investment_decision_duration: Number(e.target.value)})}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-slate-600">Quyết định phê duyệt dự án</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Số quyết định
                    </label>
                    <Input
                      value={formData.project_approval_number}
                      onChange={(e) => setFormData({...formData, project_approval_number: e.target.value})}
                      placeholder="QĐ-YYYY-XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Ngày quyết định
                    </label>
                    <Input
                      type="date"
                      value={formData.project_approval_date}
                      onChange={(e) => setFormData({...formData, project_approval_date: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Thời hạn (tháng)
                    </label>
                    <Input
                      type="number"
                      value={formData.project_approval_duration}
                      onChange={(e) => setFormData({...formData, project_approval_duration: Number(e.target.value)})}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit" className="bg-[#800020] hover:bg-[#700018]">
                <Plus className="w-4 h-4 mr-2" />
                Tạo dự án
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// Project Details Modal
export function ProjectDetailsModal({ 
  isOpen, 
  onClose, 
  project 
}: { 
  isOpen: boolean
  onClose: () => void
  project: Project | null
}) {
  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Info className="w-5 h-5 text-[#800020]" />
            Chi tiết dự án
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Header */}
          <div className="bg-gradient-to-r from-[#800020]/10 to-[#800020]/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#800020]">{project.name}</h2>
                <p className="text-slate-600 font-mono">{project.project_code}</p>
              </div>
              <Badge variant="outline" className="text-sm">
                {project.category}
              </Badge>
            </div>
          </div>

          {/* Project Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Thông tin cơ bản
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Phòng ban:</span>
                  <span className="font-medium">{project.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ngày bắt đầu:</span>
                  <span className="font-medium">{new Date(project.start_date).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Quản lý dự án:</span>
                  <span className="font-medium">{project.project_manager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Người tạo:</span>
                  <span className="font-medium">{project.project_creator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Nguồn vốn:</span>
                  <span className="font-medium">{project.funding_source}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Thông tin ngân sách
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Ngân sách dự kiến:</span>
                  <span className="font-medium">{formatCurrency(project.planned_budget)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Ngân sách phê duyệt:</span>
                  <span className="font-medium">{formatCurrency(project.approved_budget)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Đã giải ngân:</span>
                  <span className="font-medium">{formatCurrency(project.total_disbursed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Giải ngân năm hiện tại:</span>
                  <span className="font-medium">{formatCurrency(project.current_year_disbursed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Dự kiến giải ngân:</span>
                  <span className="font-medium">{formatCurrency(project.expected_disbursement)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Project Info */}
          {project.is_strategic_project && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Thông tin dự án chiến lược
              </h3>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="font-medium text-yellow-800">{project.strategic_project}</p>
              </div>
            </div>
          )}

          {/* Decision Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Thông tin quyết định
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-slate-600">Quyết định đầu tư</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Số quyết định:</span>
                    <span className="font-medium">{project.investment_decision_number || 'Chưa có'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Ngày quyết định:</span>
                    <span className="font-medium">
                      {project.investment_decision_date ? new Date(project.investment_decision_date).toLocaleDateString('vi-VN') : 'Chưa có'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Thời hạn:</span>
                    <span className="font-medium">{project.investment_decision_duration || 0} tháng</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-slate-600">Quyết định phê duyệt dự án</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Số quyết định:</span>
                    <span className="font-medium">{project.project_approval_number || 'Chưa có'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Ngày quyết định:</span>
                    <span className="font-medium">
                      {project.project_approval_date ? new Date(project.project_approval_date).toLocaleDateString('vi-VN') : 'Chưa có'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Thời hạn:</span>
                    <span className="font-medium">{project.project_approval_duration || 0} tháng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} className="bg-[#800020] hover:bg-[#700018]">
              Đóng
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Export Modal
export function ExportModal({ 
  isOpen, 
  onClose, 
  onExport 
}: { 
  isOpen: boolean
  onClose: () => void
  onExport: (format: string, fields: string[]) => void
}) {
  const [exportFormat, setExportFormat] = useState<"excel" | "csv" | "pdf">("excel")
  const [exportFields, setExportFields] = useState<string[]>([
    "project_code", "name", "category", "start_date", "planned_budget", 
    "approved_budget", "approval_status", "execution_status"
  ])
  const [showProgress, setShowProgress] = useState(false)

  const availableFields = [
    { id: "project_code", label: "Mã dự án" },
    { id: "name", label: "Tên dự án" },
    { id: "category", label: "Loại dự án" },
    { id: "start_date", label: "Ngày bắt đầu" },
    { id: "department", label: "Phòng ban" },
    { id: "planned_budget", label: "Ngân sách dự kiến" },
    { id: "approved_budget", label: "Ngân sách phê duyệt" },
    { id: "total_disbursed", label: "Đã giải ngân" },
    { id: "approval_status", label: "Trạng thái phê duyệt" },
    { id: "execution_status", label: "Trạng thái thực hiện" },
    { id: "project_manager", label: "Quản lý dự án" },
    { id: "project_creator", label: "Người tạo" }
  ]

  const handleExport = () => {
    setShowProgress(true)
    onExport(exportFormat, exportFields)
  }

  const handleProgressComplete = () => {
    setShowProgress(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Download className="w-5 h-5 text-[#800020]" />
              Xuất dữ liệu
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Export Format */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Định dạng xuất
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "excel", label: "Excel", icon: FileText },
                  { value: "csv", label: "CSV", icon: FileText },
                  { value: "pdf", label: "PDF", icon: FileText }
                ].map((format) => (
                  <button
                    key={format.value}
                    onClick={() => setExportFormat(format.value as any)}
                    className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                      exportFormat === format.value
                        ? 'border-[#800020] bg-[#800020]/10 text-[#800020]'
                        : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <format.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{format.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Fields */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Trường dữ liệu cần xuất
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {availableFields.map((field) => (
                  <label key={field.id} className="flex items-center space-x-2 p-2 rounded hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={exportFields.includes(field.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setExportFields([...exportFields, field.id])
                        } else {
                          setExportFields(exportFields.filter(f => f !== field.id))
                        }
                      }}
                      className="w-4 h-4 text-[#800020]"
                    />
                    <span className="text-sm">{field.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button onClick={handleExport} className="bg-[#800020] hover:bg-[#700018]">
                <Download className="w-4 h-4 mr-2" />
                Xuất dữ liệu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Modal */}
      {showProgress && (
        <ExportProgressModal
          isOpen={showProgress}
          onClose={() => setShowProgress(false)}
          format={exportFormat}
          fields={exportFields}
          onComplete={handleProgressComplete}
        />
      )}
    </>
  )
}

// Activity Log Modal
export function ActivityLogModal({ 
  isOpen, 
  onClose, 
  logs 
}: { 
  isOpen: boolean
  onClose: () => void
  logs: any[]
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#800020]" />
            Lịch sử hoạt động
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Activity className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>Chưa có hoạt động nào được ghi nhận</p>
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="w-2 h-2 bg-[#800020] rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{log.action}</p>
                      <span className="text-sm text-slate-500">
                        {new Date(log.timestamp).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{log.details}</p>
                    <p className="text-xs text-slate-500 mt-2">Bởi: {log.user}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Permissions Modal
export function PermissionsModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#800020]" />
            Quản lý quyền hạn
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <Shield className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>Chức năng quản lý quyền hạn đang được phát triển...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
