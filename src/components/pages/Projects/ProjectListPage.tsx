"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  FolderOpen, 
  Filter, 
  Download,
  Plus,
  Calendar,
  Target,
  Search,
  ChevronDown,
  RefreshCw,
  Zap,
  Info,
  Activity,
  Shield,
  BarChart3,
  FileText,
  Sparkles,
  Send,
  CheckCircle,
  Clock,
  Settings,
  X,
  Columns
} from "lucide-react"
import { Project } from "@/types/project"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { ProjectTypeBadge } from "@/components/shared/ProjectTypeBadge"
import { formatCurrency, getProjectType, isOfficialProject } from "@/lib/utils"
import { 
  CreateProjectModal, 
  ProjectDetailsModal, 
  ExportModal, 
  ActivityLogModal, 
  PermissionsModal 
} from "./ProjectModals"
import { KanbanView } from "./KanbanView"
import { StatisticsCards } from "./StatisticsCards"

interface ProjectListPageProps {
  projects: Project[]
  onShowCreateModal: () => void
  onShowExportModal: () => void
  onShowActivityLogModal: () => void
  onShowPermissionsModal: () => void
  onShowReportsModal: () => void
  onViewProjectDetails: (project: Project) => void
  onEditProject: (project: Project) => void
  onDeleteProject: (project: Project) => void
  onSuspendProject: (project: Project) => void
  onSubmitForApproval: (project: Project) => void
  onApproveProject: (project: Project) => void
  onRejectProject: (project: Project) => void
  onAddProject: (project: any) => void
  onStatusChange: (projectId: number, fromStatus: string, toStatus: string) => void
}

export function ProjectListPage({
  projects,
  onShowCreateModal,
  onShowExportModal,
  onShowActivityLogModal,
  onShowPermissionsModal,
  onShowReportsModal,
  onViewProjectDetails,
  onEditProject,
  onDeleteProject,
  onSuspendProject,
  onSubmitForApproval,
  onApproveProject,
  onRejectProject,
  onAddProject,
  onStatusChange
}: ProjectListPageProps) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [selectedProjectType, setSelectedProjectType] = useState("all")
  const [selectedProjectSource, setSelectedProjectSource] = useState("all")
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showOfficialProjectsOnly, setShowOfficialProjectsOnly] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list")
  const [selectedProjectsForBulk, setSelectedProjectsForBulk] = useState<Project[]>([])
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    project_code: true,      // Cố định
    name: true,              // Cố định
    start_date: true,
    project_source: true,
    planned_budget: true,
    approved_budget: true,
    total_disbursed: true,
    current_year_disbursed: true,
    expected_disbursement: true,
    next_year_plan: true,
    approval_status: true,   // Cố định
    execution_status: true,  // Cố định
    actions: true            // Cố định
  })

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showActivityLogModal, setShowActivityLogModal] = useState(false)
  const [showPermissionsModal, setShowPermissionsModal] = useState(false)
  const [showColumnFilterModal, setShowColumnFilterModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Sample activity logs
  const [activityLogs] = useState([
    {
      action: "Tạo dự án mới",
      details: "Dự án 'Nâng cấp hệ thống IT' đã được tạo",
      user: "Nguyễn Văn A",
      timestamp: new Date().toISOString()
    },
    {
      action: "Phê duyệt dự án",
      details: "Dự án 'Mua sắm thiết bị văn phòng' đã được phê duyệt",
      user: "Trần Thị B",
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ])

  // Filter projects
  const filteredProjects = projects.filter(project => {
    if (project.approval_status === 'deleted') return false
    
    const projectType = getProjectType(project)
    const matchesYear = project.start_date.startsWith(selectedYear)
    const matchesType = selectedProjectType === "all" || project.category === selectedProjectType
    const matchesSource = selectedProjectSource === "all" || projectType === selectedProjectSource
    const matchesStatus = selectedApprovalStatus === "all" || project.approval_status === selectedApprovalStatus
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.project_code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOfficial = !showOfficialProjectsOnly || isOfficialProject(project)

    return matchesYear && matchesType && matchesSource && matchesStatus && matchesSearch && matchesOfficial
  })

  // Reset filters
  const resetFilters = () => {
    setSelectedYear(new Date().getFullYear().toString())
    setSelectedProjectType("all")
    setSelectedProjectSource("all")
    setSelectedApprovalStatus("all")
    setSearchTerm("")
    setShowOfficialProjectsOnly(false)
  }

  // Check permissions
  const canEditDirectly = (project: Project) => {
    return ['initialized', 'pending_approval', 'rejected'].includes(project.approval_status)
  }

  const canSuspend = (project: Project) => {
    return ['approved'].includes(project.approval_status) && 
           ['not_started', 'in_progress'].includes(project.execution_status)
  }

  const canDelete = (project: Project) => {
    return ['initialized', 'pending_approval', 'rejected'].includes(project.approval_status)
  }

  const canSubmitForApproval = (project: Project) => {
    return project.approval_status === 'initialized' || project.edit_request_status === 'edit_requested'
  }

  const canApproveProject = (project: Project) => {
    return project.approval_status === 'pending_approval'
  }

  const canRejectProject = (project: Project) => {
    return project.approval_status === 'pending_approval'
  }

  // Handle project actions
  const handleViewProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setShowDetailsModal(true)
  }

  const handleCreateProject = (projectData: any) => {
    onAddProject(projectData)
  }

  const handleExport = (format: string, fields: string[]) => {
    console.log(`Exporting in ${format} format with fields:`, fields)
    
    // Simulate actual export process - delay to match progress animation
    setTimeout(() => {
      // Create and download file
      const exportData = projects.map(p => ({
        'Mã dự án': p.project_code,
        'Tên dự án': p.name,
        'Loại dự án': p.category,
        'Ngày bắt đầu': p.start_date,
        'Ngân sách': formatCurrency(p.planned_budget),
        'Trạng thái': p.approval_status,
        'Phòng ban': p.department
      }))
      
      // Create CSV content
      const csvContent = [
        Object.keys(exportData[0]).join(','),
        ...exportData.map(row => Object.values(row).join(','))
      ].join('\n')
      
      // Download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Danh_muc_du_an_${selectedYear}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    }, 3500) // Delay to match total progress duration (~3.5 seconds)
  }

  const handleStatusChange = (projectId: number, fromStatus: string, toStatus: string) => {
    console.log(`Project ${projectId} status changed from ${fromStatus} to ${toStatus}`)
    
    // Call the parent's status change handler
    onStatusChange(projectId, fromStatus, toStatus)
  }

  const handleBulkSubmitForApproval = () => {
    console.log(`Submitting ${selectedProjectsForBulk.length} projects for approval`)
    // Implement bulk approval logic here
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-[#800020] flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-xl">
              <FolderOpen className="w-8 h-8 text-white" />
            </div>
            Danh mục dự án
          </h1>
          <p className="text-slate-600 max-w-2xl mt-3 text-lg">
            Quản lý danh mục dự án theo năm và phân loại, cho phép tổ chức và quản lý các dự án một cách hiệu quả.
            <span className="ml-2 text-[#800020] font-medium">Hỗ trợ tự động phân loại và sinh mã dự án.</span>
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tạo Dự án Mới
        </Button>
      </div>

      {/* Statistics Cards */}
      <StatisticsCards projects={projects} selectedYear={selectedYear} />

      {/* View Mode Toggle and Enhanced Controls */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-white p-6 rounded-xl border border-slate-200">
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === "list" 
                  ? "bg-white text-[#800020] shadow-sm border border-slate-200" 
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Danh sách
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === "kanban" 
                  ? "bg-white text-[#800020] shadow-sm border border-slate-200" 
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Kanban
            </button>
          </div>

                     {/* Enhanced Action Buttons */}
           <div className="flex items-center space-x-3">
             <Button
               onClick={() => onShowReportsModal()}
               variant="outline"
               className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
             >
               <BarChart3 className="w-4 h-4 mr-2" />
               Báo cáo
             </Button>
             
             <Button
               onClick={() => setShowActivityLogModal(true)}
               variant="outline"
               className="border-blue-500/30 hover:bg-blue-500/10 text-blue-600"
             >
               <FileText className="w-4 h-4 mr-2" />
               Lịch sử
             </Button>

             <Button
               onClick={() => setShowPermissionsModal(true)}
               variant="outline"
               className="border-purple-500/30 hover:bg-purple-500/10 text-purple-600"
             >
               <Settings className="w-4 h-4 mr-2" />
               Phân quyền
             </Button>
           </div>
        </div>

        {/* Export Button */}
        <Button
          onClick={() => setShowExportModal(true)}
          className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Xuất dữ liệu
        </Button>
      </div>

      {/* Enhanced Filters Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <div className="p-2 bg-[#800020]/20 rounded-lg">
              <Filter className="w-5 h-5 text-[#800020]" />
            </div>
            Bộ lọc dự án
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#800020]" />
                Năm
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent transition-all duration-200"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>

            {/* Project Type Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#800020]" />
                Loại dự án
              </label>
              <select
                value={selectedProjectType}
                onChange={(e) => setSelectedProjectType(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent transition-all duration-200"
              >
                <option value="all">Tất cả</option>
                <option value="INV">Dự án Đầu tư</option>
                <option value="PUR">Dự án Mua sắm</option>
                <option value="SER">Dự án Thuê dịch vụ</option>
                <option value="MAI">Dự án Bảo trì</option>
              </select>
            </div>

            {/* Project Source Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#800020]" />
                Nguồn gốc dự án
                <div className="relative group">
                  <div className="w-4 h-4 bg-[#800020]/20 text-[#800020] rounded-full flex items-center justify-center text-xs font-bold cursor-help">
                    <Info className="w-3 h-3" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-slate-800 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 max-w-xs">
                    <div className="text-center">
                      <strong className="text-[#800020]">Logic phân loại tự động:</strong><br/>
                      • <strong>Dự án Mới:</strong> Năm tạo = năm hiện tại<br/>
                      • <strong>Dự án Chuyển tiếp:</strong> Năm tạo &lt; năm hiện tại<br/>
                      &nbsp;&nbsp;&nbsp;VÀ trạng thái ≠ "Đã phê duyệt"
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                  </div>
                </div>
              </label>
              <select
                value={selectedProjectSource}
                onChange={(e) => setSelectedProjectSource(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent transition-all duration-200"
              >
                <option value="all">Tất cả</option>
                <option value="new">Dự án Mới</option>
                <option value="carryover">Dự án Chuyển tiếp</option>
              </select>
            </div>

            {/* Approval Status Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#800020]" />
                Trạng thái phê duyệt
              </label>
              <select
                value={selectedApprovalStatus}
                onChange={(e) => setSelectedApprovalStatus(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent transition-all duration-200"
              >
                <option value="all">Tất cả</option>
                <option value="initialized">Khởi tạo</option>
                <option value="pending_approval">Chờ phê duyệt</option>
                <option value="approved">Đã phê duyệt</option>
                <option value="rejected">Từ chối phê duyệt</option>
              </select>
            </div>

                         {/* Column Display Filter */}
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                 <Columns className="w-4 h-4 text-[#800020]" />
                 Hiển thị cột
               </label>
               <Button
                 onClick={() => setShowColumnFilterModal(true)}
                 variant="outline"
                 className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-white text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent transition-all duration-200 text-left justify-start"
               >
                 <Columns className="w-4 h-4 mr-2 text-slate-600" />
                 Tùy chỉnh cột hiển thị
               </Button>
             </div>

             {/* Enhanced Search */}
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                 <Search className="w-4 h-4 text-[#800020]" />
                 Tìm kiếm
               </label>
               <div className="relative">
                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <Input
                   placeholder="Tìm kiếm dự án..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-12 pr-4 py-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent transition-all duration-200"
                 />
               </div>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Results Summary */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#800020]/10 to-[#800020]/20 p-6 rounded-xl border border-[#800020]/30">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-[#800020]">Hiển thị {filteredProjects.length} dự án</span>
          {filteredProjects.length === 0 && (
            <span className="text-orange-600 font-medium ml-2"> - Không có dự án nào thỏa mãn điều kiện lọc</span>
          )}
          
          {/* Official Projects Filter */}
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showOfficialProjectsOnly}
                onChange={(e) => setShowOfficialProjectsOnly(e.target.checked)}
                className="w-4 h-4 text-[#800020] bg-gray-100 border-gray-300 rounded focus:ring-[#800020] focus:ring-2"
              />
              <span className="font-medium">Chỉ dự án chính thức</span>
            </label>
            {showOfficialProjectsOnly && (
              <span className="text-xs text-[#800020] bg-[#800020]/20 px-2 py-1 rounded-full border border-[#800020]/30">
                🏛️ {projects.filter(p => isOfficialProject(p)).length} dự án
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Bulk Action Button */}
          {selectedProjectsForBulk.length > 0 && (
            <Button 
              onClick={handleBulkSubmitForApproval}
              className="bg-[#800020] hover:bg-[#700018] text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Gửi phê duyệt ({selectedProjectsForBulk.length} dự án)
            </Button>
          )}
          
          <Button 
            onClick={resetFilters}
            variant="outline" 
            className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Xóa bộ lọc
          </Button>
          
          <Button variant="outline" className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Projects View */}
      {viewMode === "list" ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[1400px]">
                                 <table className="w-full">
                   <thead className="sticky top-0 bg-gradient-to-r from-slate-50 to-white z-10">
                     <tr className="hover:bg-slate-50">
                       {visibleColumns.project_code && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">Mã dự án</th>
                       )}
                       {visibleColumns.name && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">Tên dự án</th>
                       )}
                       {visibleColumns.start_date && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">Ngày bắt đầu</th>
                       )}
                       {visibleColumns.project_source && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">Nguồn gốc dự án</th>
                       )}
                       {visibleColumns.planned_budget && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">TMĐT dự kiến</th>
                       )}
                       {visibleColumns.approved_budget && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">TMĐT phê duyệt</th>
                       )}
                       {visibleColumns.total_disbursed && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">Lũy kế vốn đã ứng</th>
                       )}
                       {visibleColumns.current_year_disbursed && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">Vốn đã ứng năm hiện tại</th>
                       )}
                       {visibleColumns.expected_disbursement && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">Dự kiến vốn sẽ ứng</th>
                       )}
                       {visibleColumns.next_year_plan && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">Đề xuất kế hoạch vốn năm sau</th>
                       )}
                       {visibleColumns.approval_status && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">Trạng thái phê duyệt</th>
                       )}
                       {visibleColumns.execution_status && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">Trạng thái thực hiện</th>
                       )}
                       {visibleColumns.actions && (
                         <th className="font-semibold bg-slate-50 p-4 whitespace-nowrap text-left">Thao tác</th>
                       )}
                     </tr>
                   </thead>
                  <tbody>
                                         {filteredProjects.map((project) => (
                                              <tr 
                         key={project.id} 
                         className="hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
                         onClick={() => handleViewProjectDetails(project)}
                       >
                         {visibleColumns.project_code && (
                           <td className="p-4 whitespace-nowrap">
                             <div className="space-y-2">
                               <div className="font-mono font-bold text-[#800020] text-sm">
                                 {project.project_code}
                               </div>
                               <ProjectTypeBadge category={project.category} />
                             </div>
                           </td>
                         )}
                         {visibleColumns.name && (
                           <td className="p-4 whitespace-nowrap">
                             <div className="space-y-1">
                               <div className="font-medium text-slate-900">{project.name}</div>
                               <div className="text-xs text-slate-500">Phòng: {project.department}</div>
                             </div>
                           </td>
                         )}
                         {visibleColumns.start_date && (
                           <td className="p-4 whitespace-nowrap">
                             <div className="text-sm text-slate-600">
                               {new Date(project.start_date).toLocaleDateString('vi-VN')}
                             </div>
                           </td>
                         )}
                         {visibleColumns.project_source && (
                           <td className="p-4 whitespace-nowrap">
                             <span className="text-sm">
                               {getProjectType(project) === 'new' ? 'Dự án Mới' : 'Dự án Chuyển tiếp'}
                             </span>
                           </td>
                         )}
                         {visibleColumns.planned_budget && (
                           <td className="p-4 font-medium text-slate-900 whitespace-nowrap">
                             {formatCurrency(project.planned_budget)}
                           </td>
                         )}
                         {visibleColumns.approved_budget && (
                           <td className="p-4 font-medium text-slate-900 whitespace-nowrap">
                             {formatCurrency(project.approved_budget)}
                           </td>
                         )}
                         {visibleColumns.total_disbursed && (
                           <td className="p-4 font-medium text-slate-900 whitespace-nowrap">
                             {formatCurrency(project.total_disbursed)}
                           </td>
                         )}
                         {visibleColumns.current_year_disbursed && (
                           <td className="p-4 font-medium text-slate-900 whitespace-nowrap">
                             {formatCurrency(project.current_year_disbursed)}
                           </td>
                         )}
                         {visibleColumns.expected_disbursement && (
                           <td className="p-4 font-medium text-slate-900 whitespace-nowrap">
                             {formatCurrency(project.expected_disbursement)}
                           </td>
                         )}
                         {visibleColumns.next_year_plan && (
                           <td className="p-4 font-medium text-slate-900 whitespace-nowrap">
                             {formatCurrency(project.next_year_plan)}
                           </td>
                         )}
                         {visibleColumns.approval_status && (
                           <td className="p-4 whitespace-nowrap">
                             <StatusBadge status={project.approval_status} type="approval" project={project} />
                           </td>
                         )}
                         {visibleColumns.execution_status && (
                           <td className="p-4 whitespace-nowrap">
                             <StatusBadge status={project.execution_status} type="execution" />
                           </td>
                         )}
                         {visibleColumns.actions && (
                           <td className="p-4 whitespace-nowrap">
                             <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                               {canEditDirectly(project) && (
                                 <button 
                                   onClick={() => onEditProject(project)}
                                   className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                                   title="Chỉnh sửa trực tiếp"
                                 >
                                   <Plus className="w-4 h-4 text-[#800020]" />
                                 </button>
                               )}

                               {canSuspend(project) && (
                                 <button 
                                   onClick={() => onSuspendProject(project)}
                                   className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                                   title="Dừng thực hiện"
                                 >
                                   <Zap className="w-4 h-4 text-[#800020]" />
                                 </button>
                               )}

                               {canDelete(project) && (
                                 <button 
                                   onClick={() => onDeleteProject(project)}
                                   className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                                   title="Xóa dự án"
                                 >
                                   <Download className="w-4 h-4 text-red-600" />
                                 </button>
                               )}

                               {canSubmitForApproval(project) && (
                                 <button 
                                   onClick={() => onSubmitForApproval(project)}
                                   className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                                   title="Gửi phê duyệt"
                                 >
                                   <Send className="w-4 h-4 text-green-600" />
                                 </button>
                               )}

                               {canApproveProject(project) && (
                                 <button 
                                   onClick={() => onApproveProject(project)}
                                   className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                                   title="Phê duyệt dự án"
                                 >
                                   <CheckCircle className="w-4 h-4 text-green-600" />
                                 </button>
                               )}

                               {canRejectProject(project) && (
                                 <button 
                                   onClick={() => onRejectProject(project)}
                                   className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                                   title="Từ chối phê duyệt"
                                 >
                                   <X className="w-4 h-4 text-red-600" />
                                 </button>
                               )}
                             </div>
                           </td>
                         )}
                       </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <KanbanView 
          projects={filteredProjects}
          onProjectClick={handleViewProjectDetails}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Modals */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProject}
      />

      <ProjectDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        project={selectedProject}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />

      <ActivityLogModal
        isOpen={showActivityLogModal}
        onClose={() => setShowActivityLogModal(false)}
        logs={activityLogs}
      />

             <PermissionsModal
         isOpen={showPermissionsModal}
         onClose={() => setShowPermissionsModal(false)}
       />

       {/* Column Filter Modal */}
       {showColumnFilterModal && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <Card className="w-full max-w-2xl">
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
               <CardTitle className="text-xl font-semibold flex items-center gap-2">
                 <Columns className="w-5 h-5 text-[#800020]" />
                 Tùy chỉnh hiển thị cột
               </CardTitle>
               <Button variant="ghost" size="sm" onClick={() => setShowColumnFilterModal(false)}>
                 <X className="w-4 h-4" />
               </Button>
             </CardHeader>
             <CardContent className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {/* Fixed Columns */}
                 <div className="space-y-3">
                   <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                     <Shield className="w-4 h-4 text-green-600" />
                     Cột cố định (không thể ẩn)
                   </h3>
                                       <div className="space-y-2">
                      <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Mã dự án</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Tên dự án</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Trạng thái phê duyệt</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Trạng thái thực hiện</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Thao tác</span>
                      </div>
                    </div>
                 </div>

                 {/* Toggleable Columns */}
                 <div className="space-y-3">
                   <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                     <Settings className="w-4 h-4 text-[#800020]" />
                     Cột có thể tùy chỉnh
                   </h3>
                   <div className="space-y-2">
                                           {[
                        { key: 'start_date', label: 'Ngày bắt đầu' },
                        { key: 'project_source', label: 'Nguồn gốc dự án' },
                        { key: 'planned_budget', label: 'TMĐT dự kiến' },
                        { key: 'approved_budget', label: 'TMĐT phê duyệt' },
                        { key: 'total_disbursed', label: 'Lũy kế vốn đã ứng' },
                        { key: 'current_year_disbursed', label: 'Vốn đã ứng năm hiện tại' },
                        { key: 'expected_disbursement', label: 'Dự kiến vốn sẽ ứng' },
                        { key: 'next_year_plan', label: 'Đề xuất kế hoạch vốn năm sau' }
                      ].map((column) => (
                       <label key={column.key} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                         <input
                           type="checkbox"
                           checked={visibleColumns[column.key as keyof typeof visibleColumns]}
                           onChange={(e) => {
                             setVisibleColumns(prev => ({
                               ...prev,
                               [column.key]: e.target.checked
                             }))
                           }}
                           className="w-4 h-4 text-[#800020] bg-gray-100 border-gray-300 rounded focus:ring-[#800020] focus:ring-2"
                         />
                         <span className="text-sm text-slate-700">{column.label}</span>
                       </label>
                     ))}
                   </div>
                 </div>
               </div>

               <div className="flex justify-end space-x-3 pt-4 border-t">
                 <Button 
                   variant="outline" 
                   onClick={() => {
                     setVisibleColumns({
                       project_code: true,
                       name: true,
                       start_date: true,
                       project_source: true,
                       planned_budget: true,
                       approved_budget: true,
                       total_disbursed: true,
                       current_year_disbursed: true,
                       expected_disbursement: true,
                       next_year_plan: true,
                       approval_status: true,
                       execution_status: true,
                       actions: true
                     })
                   }}
                 >
                   Hiển thị tất cả
                 </Button>
                 <Button 
                   variant="outline" 
                   onClick={() => {
                     setVisibleColumns({
                       project_code: true,
                       name: true,
                       start_date: false,
                       project_source: false,
                       planned_budget: false,
                       approved_budget: false,
                       total_disbursed: false,
                       current_year_disbursed: false,
                       expected_disbursement: false,
                       next_year_plan: false,
                       approval_status: true,
                       execution_status: true,
                       actions: true
                     })
                   }}
                 >
                   Chỉ cột cố định
                 </Button>
                 <Button 
                   onClick={() => setShowColumnFilterModal(false)}
                   className="bg-[#800020] hover:bg-[#700018]"
                 >
                   Áp dụng
                 </Button>
               </div>
             </CardContent>
           </Card>
         </div>
       )}
     </div>
   )
 }
