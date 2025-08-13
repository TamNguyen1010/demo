"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  FolderOpen, 
  Filter, 
  Download,
  Eye, 
  Edit, 
  Trash2, 
  Send,
  Search,
  ChevronDown,
  Plus,
  Calendar,
  Target,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  Info,
  TrendingUp,
  BarChart3,
  FileText,
  Package,
  Settings,
  RefreshCw,
  Zap,
  Sparkles
} from "lucide-react"
import { useState, useEffect } from "react"

// Enhanced Project Category Dashboard Component implementing DMDA-1.1, DMDA-1.2, DMDA-1.3
export default function ProjectCategoryDashboard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [selectedProjectType, setSelectedProjectType] = useState("all")
  const [selectedProjectSource, setSelectedProjectSource] = useState("all")
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage] = useState(20)
  const [loading, setLoading] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [editProject, setEditProject] = useState<any>(null)
  const [suspendReason, setSuspendReason] = useState("")
  const [deleteReason, setDeleteReason] = useState("")
  
  // Approval workflow states (DMDA-3.x)
  const [showSubmitApprovalModal, setShowSubmitApprovalModal] = useState(false)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showBulkApprovalModal, setShowBulkApprovalModal] = useState(false)
  const [selectedProjectsForBulk, setSelectedProjectsForBulk] = useState<any[]>([])
  const [approvalComment, setApprovalComment] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [selectedApprover, setSelectedApprover] = useState("")
  const [showOfficialProjectsOnly, setShowOfficialProjectsOnly] = useState(false)
  
  // DMDA-4.1: Activity Logging states
  const [showActivityLogModal, setShowActivityLogModal] = useState(false)
  const [activityLogs, setActivityLogs] = useState<any[]>([])
  const [selectedLogType, setSelectedLogType] = useState("all")
  
  // DMDA-4.2: Kanban View states
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list")
  const [kanbanColumns, setKanbanColumns] = useState<any[]>([])
  
  // DMDA-4.3: Export functionality states
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<"excel" | "csv" | "pdf">("excel")
  const [exportFields, setExportFields] = useState<string[]>([
    "project_code", "name", "category_name", "year", "start_date", "end_date", 
    "budget", "status", "project_type", "is_official", "created_by_name", "created_at"
  ])
  const [exportProgress, setExportProgress] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  
  // DMDA-4.4: Reporting and Statistics states
  const [showReportsModal, setShowReportsModal] = useState(false)
  const [reportType, setReportType] = useState<"dashboard" | "chart" | "table" | "summary">("dashboard")
  const [chartType, setChartType] = useState<"pie" | "bar" | "line" | "donut" | "area">("pie")
  const [reportFilters, setReportFilters] = useState({
    year: new Date().getFullYear(),
    category_id: null,
    status: null,
    user_id: null,
    date_from: null,
    date_to: null,
    official_only: false
  })
  
  // DMDA-4.5: Permission Management states
  const [showPermissionsModal, setShowPermissionsModal] = useState(false)
  const [userRoles, setUserRoles] = useState<any[]>([])
  const [availablePermissions, setAvailablePermissions] = useState<any[]>([])
  const [permissionMatrix, setPermissionMatrix] = useState<any>({})
  
  const [newProject, setNewProject] = useState({
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

  // Sample approvers data (DMDA-3.x)
  const [approvers] = useState([
    { id: 1, name: "Trần Thị B", level: "level_1", max_amount: 100000000000, is_active: true },
    { id: 2, name: "Lê Văn C", level: "level_2", max_amount: 500000000000, is_active: true },
    { id: 3, name: "Phạm Thị D", level: "level_3", max_amount: 1000000000000, is_active: true },
    { id: 4, name: "Hoàng Văn E", level: "level_1", max_amount: 100000000000, is_active: true },
    { id: 5, name: "Vũ Thị F", level: "level_2", max_amount: 500000000000, is_active: true }
  ])

  // Enhanced project data with auto-generated codes (DMDA-1.3)
  const [projects, setProjects] = useState([
    {
      id: 1,
      project_code: "INV-2025-001", // Auto-generated format
      name: "Dự án nâng cấp hệ thống IT",
      start_date: "2025-01-15",
      department: "IT",
      planned_budget: 58000000000,
      approved_budget: 58000000000,
      total_disbursed: 25000000000,
      current_year_disbursed: 15000000000,
      expected_disbursement: 20000000000,
      next_year_plan: 18000000000,
    approval_status: "approved",
    execution_status: "in_progress",
    edit_request_status: "none",
      category: "INV",
      project_manager: "Nguyễn Văn A",
      project_creator: "Trần Thị B",
      funding_source: "Đầu tư phát triển",
      is_strategic_project: true,
      strategic_project: "Đề án chuyển đổi số quốc gia",
      investment_decision_number: "QĐ-2025-001",
      investment_decision_date: "2025-01-10",
      investment_decision_duration: 24,
      project_approval_number: "QĐ-2025-015",
      project_approval_date: "2025-01-15",
      project_approval_duration: 18
    },
    {
      id: 2,
      project_code: "PUR-2024-045", // Auto-generated format
    name: "Mua sắm thiết bị văn phòng",
      start_date: "2024-06-01",
      department: "HR",
      planned_budget: 3500000000,
      approved_budget: 3500000000,
      total_disbursed: 2000000000,
      current_year_disbursed: 1500000000,
      expected_disbursement: 1500000000,
      next_year_plan: 0,
      approval_status: "approved",
      execution_status: "in_progress",
      edit_request_status: "none",
      category: "PUR",
      project_manager: "Lê Văn C",
      project_creator: "Phạm Thị D",
      funding_source: "Mua sắm tài sản cố định",
      is_strategic_project: false,
      strategic_project: "",
      investment_decision_number: "",
      investment_decision_date: "",
      investment_decision_duration: 0,
      project_approval_number: "QĐ-2024-089",
      project_approval_date: "2024-05-20",
      project_approval_duration: 12
    },
    {
      id: 3,
      project_code: "SER-2025-003", // Auto-generated format
      name: "Thuê dịch vụ bảo mật",
      start_date: "2025-02-20",
      department: "IT",
      planned_budget: 11800000000,
      approved_budget: 11800000000,
    total_disbursed: 0,
    current_year_disbursed: 0,
      expected_disbursement: 11800000000,
    next_year_plan: 0,
    approval_status: "pending_approval",
    execution_status: "not_started",
    edit_request_status: "none",
      category: "SER",
      project_manager: "Hoàng Văn E",
      project_creator: "Vũ Thị F",
      funding_source: "Thuê dịch vụ",
      is_strategic_project: true,
      strategic_project: "Đề án bảo mật thông tin",
      investment_decision_number: "QĐ-2025-008",
      investment_decision_date: "2025-02-15",
      investment_decision_duration: 18,
      project_approval_number: "",
      project_approval_date: "",
      project_approval_duration: 0
    },
    {
      id: 4,
      project_code: "MAI-2025-004", // Auto-generated format
      name: "Bảo trì hệ thống điều hòa",
      start_date: "2025-03-01",
      department: "FAC",
      planned_budget: 2500000000,
      approved_budget: 0,
      total_disbursed: 0,
      current_year_disbursed: 0,
      expected_disbursement: 2500000000,
    next_year_plan: 0,
      approval_status: "initialized",
      execution_status: "not_started",
      edit_request_status: "none",
      category: "MAI",
      project_manager: "Đặng Văn G",
      project_creator: "Bùi Thị H",
      funding_source: "Chi phí bảo trì",
      is_strategic_project: false,
      strategic_project: "",
      investment_decision_number: "",
      investment_decision_date: "",
      investment_decision_duration: 0,
      project_approval_number: "",
      project_approval_date: "",
      project_approval_duration: 0
    },
    {
      id: 5,
      project_code: "INV-2023-120", // Auto-generated format
      name: "Xây dựng trung tâm dữ liệu",
      start_date: "2023-09-15",
      department: "IT",
      planned_budget: 150000000000,
      approved_budget: 150000000000,
      total_disbursed: 80000000000,
      current_year_disbursed: 30000000000,
      expected_disbursement: 50000000000,
      next_year_plan: 20000000000,
    approval_status: "approved",
    execution_status: "in_progress",
    edit_request_status: "none",
      category: "INV",
      project_manager: "Nguyễn Văn I",
      project_creator: "Trần Thị K",
      funding_source: "Đầu tư phát triển",
      is_strategic_project: true,
      strategic_project: "Đề án hạ tầng công nghệ thông tin",
      investment_decision_number: "QĐ-2023-156",
      investment_decision_date: "2023-08-20",
      investment_decision_duration: 36,
      project_approval_number: "QĐ-2023-189",
      project_approval_date: "2023-09-10",
      project_approval_duration: 30
    },
    {
      id: 6,
      project_code: "INV-2024-089", // Auto-generated format
      name: "Nâng cấp mạng lưới",
      start_date: "2024-03-10",
      department: "IT",
      planned_budget: 85000000000,
      approved_budget: 85000000000,
      total_disbursed: 45000000000,
      current_year_disbursed: 25000000000,
      expected_disbursement: 40000000000,
      next_year_plan: 0,
      approval_status: "in_progress",
      execution_status: "in_progress",
      edit_request_status: "none",
      category: "INV",
      project_manager: "Lê Văn L",
      project_creator: "Phạm Thị M",
      funding_source: "Đầu tư phát triển",
      is_strategic_project: false,
      strategic_project: "",
      investment_decision_number: "QĐ-2024-045",
      investment_decision_date: "2024-02-15",
      investment_decision_duration: 24,
      project_approval_number: "QĐ-2024-078",
      project_approval_date: "2024-03-05",
      project_approval_duration: 20
    },
    {
      id: 7,
      project_code: "SER-2025-007", // Auto-generated format
      name: "Phát triển ứng dụng mobile",
      start_date: "2025-01-20",
      department: "IT",
      planned_budget: 12000000000,
      approved_budget: 0,
      total_disbursed: 0,
      current_year_disbursed: 0,
      expected_disbursement: 12000000000,
      next_year_plan: 0,
      approval_status: "initialized",
      execution_status: "not_started",
      edit_request_status: "none",
      category: "SER",
      project_manager: "Hoàng Văn N",
      project_creator: "Vũ Thị O",
      funding_source: "Thuê dịch vụ",
      is_strategic_project: false,
      strategic_project: "",
      investment_decision_number: "",
      investment_decision_date: "",
      investment_decision_duration: 0,
      project_approval_number: "",
      project_approval_date: "",
      project_approval_duration: 0
    }
  ])

  // DMDA-1.2: Auto-classify project type based on start date and approval status
  const getProjectType = (project: any) => {
    const currentYear = new Date().getFullYear()
    const projectYear = new Date(project.start_date).getFullYear()
    
    // Logic theo SRS DMDA-1.2:
    // - Dự án Mới: YEAR(start_date) = current_year
    // - Dự án Chuyển tiếp: YEAR(start_date) < current_year AND approval_status ≠ "approved"
    if (projectYear === currentYear) {
      return 'new'
    } else if (projectYear < currentYear && project.approval_status !== 'approved') {
      return 'carryover'
    } else {
      return 'new' // Dự án đã phê duyệt luôn là "Mới"
    }
  }

  // DMDA-1.3: Auto-generate project code
  const generateProjectCode = (category: string, year: string, department: string) => {
    const existingProjects = projects.filter(p => 
      p.category === category && 
      p.department === department && 
      p.start_date.startsWith(year)
    )
    const sequence = (existingProjects.length + 1).toString().padStart(3, '0')
    return `${category}-${year}-${sequence}`
  }

  // Helper functions for approval workflow (DMDA-3.x) - moved here to fix hoisting issue
  const canSubmitForApproval = (project: any) => {
    return project.approval_status === 'initialized' || project.approval_status === 'edit_requested'
  }

  const canApproveProject = (project: any) => {
    return project.approval_status === 'pending_approval'
  }

  const canRejectProject = (project: any) => {
    return project.approval_status === 'pending_approval'
  }

  const isOfficialProject = (project: any) => {
    return project.approval_status === 'approved'
  }

  // Filter projects based on selected criteria (DMDA-1.1)
  const filteredProjects = projects.filter(project => {
    // Loại bỏ dự án đã bị xóa
    if (project.approval_status === 'deleted') return false
    
    const projectType = getProjectType(project)
    const matchesYear = project.start_date.startsWith(selectedYear)
    const matchesType = selectedProjectType === "all" || project.category === selectedProjectType
    const matchesSource = selectedProjectSource === "all" || projectType === selectedProjectSource
    const matchesStatus = selectedApprovalStatus === "all" || project.approval_status === selectedApprovalStatus
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.project_code.toLowerCase().includes(searchTerm.toLowerCase())

    // Official projects filter (DMDA-3.5)
    const matchesOfficial = !showOfficialProjectsOnly || isOfficialProject(project)

    return matchesYear && matchesType && matchesSource && matchesStatus && matchesSearch && matchesOfficial
  })

  // Official projects statistics (DMDA-3.5)
  const officialProjectsStats = {
    total: projects.filter(p => isOfficialProject(p)).length,
    approved: projects.filter(p => p.approval_status === 'approved').length,
    pending: projects.filter(p => p.approval_status === 'pending_approval').length,
    byCategory: projects.reduce((acc, p) => {
      if (isOfficialProject(p)) {
        acc[p.category] = (acc[p.category] || 0) + 1
      }
      return acc
    }, {} as any)
  }

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  // Format currency with enhanced display
  const formatCurrency = (amount: number) => {
    if (amount === 0) return "0 VND"
    return `${amount.toLocaleString('vi-VN')} VND`
  }

  // Enhanced status badges with Agribank concept colors and diversity
  const getStatusBadge = (status: string, type: 'approval' | 'execution' | 'edit', project?: any) => {
    const variants: Record<string, { label: string, className: string, icon: any }> = {
      // Approval status - Concept màu Agribank với đa dạng
      'initialized': { 
        label: 'Khởi tạo', 
        className: 'bg-[#800020]/10 text-[#800020] border border-[#800020]/20 hover:bg-[#800020]/20', 
        icon: Clock 
      },
      'pending_approval': { 
        label: 'Chờ phê duyệt', 
        className: 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100', 
        icon: AlertCircle 
      },
      'approved': { 
        label: 'Đã phê duyệt', 
        className: 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100', 
        icon: CheckCircle 
      },
      'rejected': { 
        label: 'Từ chối phê duyệt', 
        className: 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100', 
        icon: X 
      },
      
      // Execution status - Concept màu Agribank với đa dạng
      'not_started': { 
        label: 'Chưa bắt đầu', 
        className: 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100', 
        icon: Clock 
      },
      'in_progress': { 
        label: 'Đang thực hiện', 
        className: 'bg-[#800020]/10 text-[#800020] border border-[#800020]/20 hover:bg-[#800020]/20', 
        icon: TrendingUp 
      },
      'suspended': { 
        label: 'Tạm dừng', 
        className: 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100', 
        icon: AlertCircle 
      },
      'completed': { 
        label: 'Hoàn thành', 
        className: 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100', 
        icon: CheckCircle 
      },
      
      // Edit request status - Concept màu Agribank với đa dạng
      'none': { 
        label: 'Không có yêu cầu', 
        className: 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100', 
        icon: CheckCircle 
      },
      'edit_requested': { 
        label: 'Yêu cầu chỉnh sửa', 
        className: 'bg-[#800020]/10 text-[#800020] border border-[#800020]/20 hover:bg-[#800020]/20', 
        icon: Edit 
      }
    }

    const variant = variants[status] || { 
      label: status, 
      className: 'bg-[#800020]/10 text-[#800020] border border-[#800020]/20', 
      icon: Info 
    }
    
    const IconComponent = variant.icon

  return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={`text-xs flex items-center gap-1 ${variant.className}`}>
          <IconComponent className="w-3 h-3" />
          {variant.label}
        </Badge>
        
        {/* Official Project Badge (DMDA-3.5) */}
        {type === 'approval' && project && isOfficialProject(project) && (
          <Badge variant="outline" className="text-xs flex items-center gap-1 bg-[#800020]/20 text-[#800020] border border-[#800020]/30">
            <span className="text-sm">🏛️</span>
            Chính thức
          </Badge>
        )}
      </div>
    )
  }

  // Enhanced project type labels with Agribank concept colors and diversity
  const getProjectTypeLabel = (category: string) => {
    const types: Record<string, { label: string, icon: any, color: string }> = {
      'INV': { 
        label: 'Dự án Đầu tư', 
        icon: Target, 
        color: 'bg-[#800020]/20 text-[#800020] border border-[#800020]/30 hover:bg-[#800020]/30' 
      },
      'PUR': { 
        label: 'Dự án Mua sắm', 
        icon: Package, 
        color: 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' 
      },
      'SER': { 
        label: 'Dự án Thuê dịch vụ', 
        icon: FileText, 
        color: 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100' 
      },
      'MAI': { 
        label: 'Dự án Bảo trì', 
        icon: Settings, 
        color: 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100' 
      }
    }
    
    const type = types[category] || { label: category, icon: Info, color: 'bg-[#800020]/20 text-[#800020] border border-[#800020]/30 hover:bg-[#800020]/30' }
    const IconComponent = type.icon
    
    return (
      <Badge variant="outline" className={`text-xs flex items-center gap-1 ${type.color}`}>
        <IconComponent className="w-3 h-3" />
        {type.label}
      </Badge>
    )
  }

  // Helper function to get project type label text for export
  const getProjectTypeLabelText = (category: string) => {
    const types: Record<string, string> = {
      'INV': 'Dự án Đầu tư',
      'PUR': 'Dự án Mua sắm',
      'SER': 'Dự án Thuê dịch vụ',
      'MAI': 'Dự án Bảo trì'
    }
    return types[category] || category
  }

  // Enhanced project source labels with Agribank concept colors and diversity
  const getProjectSourceLabel = (source: string) => {
    const sources: Record<string, { label: string, icon: any, color: string }> = {
      'new': { 
        label: 'Dự án Mới', 
        icon: Sparkles, 
        color: 'bg-[#800020]/20 text-[#800020] border border-[#800020]/30 hover:bg-[#800020]/30' 
      },
      'carryover': { 
        label: 'Dự án Chuyển tiếp', 
        icon: RefreshCw, 
        color: 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100' 
      }
    }
    
    const sourceInfo = sources[source] || { 
      label: source, 
      icon: Info, 
      color: 'bg-[#800020]/20 text-[#800020] border border-[#800020]/30 hover:bg-[#800020]/30' 
    }
    
    const IconComponent = sourceInfo.icon
    
    return (
      <Badge variant="outline" className={`text-xs flex items-center gap-1 ${sourceInfo.color}`}>
        <IconComponent className="w-3 h-3" />
        {sourceInfo.label}
      </Badge>
    )
  }

  // Helper function to get status label text for export
  const getStatusLabelText = (status: string, type: 'approval' | 'execution' | 'edit') => {
    const statusLabels: Record<string, string> = {
      'initialized': 'Khởi tạo',
      'pending_approval': 'Chờ phê duyệt',
      'approved': 'Đã phê duyệt',
      'rejected': 'Từ chối phê duyệt',
      'not_started': 'Chưa bắt đầu',
      'in_progress': 'Đang thực hiện',
      'suspended': 'Tạm dừng',
      'completed': 'Hoàn thành',
      'none': 'Không có yêu cầu',
      'edit_requested': 'Yêu cầu chỉnh sửa'
    }
    return statusLabels[status] || status
  }

  // Handle filter changes
  const handleFilterChange = () => {
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Reset all filters to default values
  const resetFilters = () => {
    setSelectedYear(new Date().getFullYear().toString())
    setSelectedProjectType("all")
    setSelectedProjectSource("all")
    setSelectedApprovalStatus("all")
    setSearchTerm("")
    setShowOfficialProjectsOnly(false)
    setCurrentPage(1)
    setSelectedProjectsForBulk([])
  }

  // Handle edit project
  const handleEditProject = (project: any) => {
    setEditProject({...project})
    setShowEditModal(true)
  }

  // Handle save edited project
  const handleSaveEdit = () => {
    if (!editProject) return
    
    const updatedProjects = projects.map(p => 
      p.id === editProject.id ? {...editProject, updated_at: new Date().toISOString()} : p
    )
    setProjects(updatedProjects)
    setShowEditModal(false)
    setEditProject(null)
  }

  // Handle suspend project
  const handleSuspendProject = (project: any) => {
    setSelectedProject(project)
    setShowSuspendModal(true)
  }

  // Handle confirm suspend
  const handleConfirmSuspend = () => {
    if (!selectedProject || !suspendReason) return
    
    const updatedProjects = projects.map(p => 
      p.id === selectedProject.id ? {
        ...p, 
        execution_status: 'suspended',
        suspended_at: new Date().toISOString(),
        suspension_reason: suspendReason
      } : p
    )
    setProjects(updatedProjects)
    setShowSuspendModal(false)
    setSelectedProject(null)
    setSuspendReason("")
  }

  // Handle delete project
  const handleViewProjectDetails = (project: any) => {
    setSelectedProject(project)
    setShowProjectDetailsModal(true)
  }

  const handleDeleteProject = (project: any) => {
    setSelectedProject(project)
    setShowDeleteModal(true)
  }

  // Approval workflow functions (DMDA-3.x)
  const handleSubmitForApproval = (project: any) => {
    setSelectedProject(project)
    setShowSubmitApprovalModal(true)
  }

  const handleApproveProject = (project: any) => {
    setSelectedProject(project)
    setShowApproveModal(true)
  }

  const handleRejectProject = (project: any) => {
    setSelectedProject(project)
    setShowRejectModal(true)
  }

  const handleBulkSubmitForApproval = () => {
    setShowBulkApprovalModal(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (!selectedProject || !deleteReason) return
    
    const updatedProjects = projects.map(p => 
      p.id === selectedProject.id ? {
        ...p, 
        approval_status: 'deleted',
        deleted_at: new Date().toISOString(),
        delete_reason: deleteReason
      } : p
    )
    setProjects(updatedProjects)
    setShowDeleteModal(false)
    setSelectedProject(null)
    setDeleteReason("")
  }

  // Approval confirmation functions (DMDA-3.x)
  const handleConfirmSubmitApproval = () => {
    if (!selectedProject || !selectedApprover) return
    
    const updatedProjects = projects.map(p => 
      p.id === selectedProject.id ? {
        ...p, 
        approval_status: 'pending_approval',
        submitted_for_approval_at: new Date().toISOString().split('T')[0],
        submitted_by: selectedApprover
      } : p
    )
    setProjects(updatedProjects)
    setShowSubmitApprovalModal(false)
    setSelectedProject(null)
    setSelectedApprover("")
    setApprovalComment("")
  }

  const handleConfirmApprove = () => {
    if (!selectedProject) return
    
    const updatedProjects = projects.map(p => 
      p.id === selectedProject.id ? {
        ...p, 
        approval_status: 'approved',
        approved_at: new Date().toISOString().split('T')[0],
        approved_by: selectedApprover || 'Current User',
        approval_notes: approvalComment
      } : p
    )
    setProjects(updatedProjects)
    setShowApproveModal(false)
    setSelectedProject(null)
    setSelectedApprover("")
    setApprovalComment("")
  }

  const handleConfirmReject = () => {
    if (!selectedProject || !rejectionReason) return
    
    const updatedProjects = projects.map(p => 
      p.id === selectedProject.id ? {
        ...p, 
        approval_status: 'rejected',
        rejected_at: new Date().toISOString().split('T')[0],
        rejected_by: selectedApprover || 'Current User',
        rejection_reason: rejectionReason
      } : p
    )
    setProjects(updatedProjects)
    setShowRejectModal(false)
    setSelectedProject(null)
    setSelectedApprover("")
    setRejectionReason("")
  }

  const handleConfirmBulkApproval = () => {
    if (!selectedApprover) return
    
    const updatedProjects = projects.map(p => {
      if (selectedProjectsForBulk.find(sp => sp.id === p.id)) {
        return {
          ...p,
          approval_status: 'pending_approval',
          submitted_for_approval_at: new Date().toISOString().split('T')[0],
          submitted_by: selectedApprover
        }
      }
      return p
    })
    
    setProjects(updatedProjects)
    setShowBulkApprovalModal(false)
    setSelectedProjectsForBulk([])
    setSelectedApprover("")
    setApprovalComment("")
  }

  // Check if project can be edited directly
  const canEditDirectly = (project: any) => {
    return ['initialized', 'pending_approval', 'rejected'].includes(project.approval_status)
  }

  // Check if project can be suspended
  const canSuspend = (project: any) => {
    return ['approved'].includes(project.approval_status) && 
           ['not_started', 'in_progress'].includes(project.execution_status)
  }

  // Check if project can be deleted
  const canDelete = (project: any) => {
    return ['initialized', 'pending_approval', 'rejected'].includes(project.approval_status)
  }

  // Handle create new project
  const handleCreateProject = () => {
    const projectCode = generateProjectCode(
      newProject.category, 
      newProject.start_date.split('-')[0], 
      newProject.department
    )
    
    const newProjectData = {
      id: projects.length + 1,
      project_code: projectCode,
      name: newProject.name,
      start_date: newProject.start_date,
      department: newProject.department,
      planned_budget: newProject.planned_budget,
      approved_budget: 0,
      total_disbursed: 0,
      current_year_disbursed: 0,
      expected_disbursement: newProject.planned_budget,
      next_year_plan: 0,
      approval_status: "initialized",
      execution_status: "not_started",
      edit_request_status: "none",
      category: newProject.category,
      project_manager: newProject.project_manager,
      project_creator: newProject.project_creator,
      funding_source: newProject.funding_source,
      is_strategic_project: newProject.is_strategic_project,
      strategic_project: newProject.strategic_project,
      investment_decision_number: newProject.investment_decision_number,
      investment_decision_date: newProject.investment_decision_date,
      investment_decision_duration: newProject.investment_decision_duration,
      project_approval_number: newProject.project_approval_number,
      project_approval_date: newProject.project_approval_date,
      project_approval_duration: newProject.project_approval_duration
    }
    
    setProjects([...projects, newProjectData])
    setNewProject({
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
    setShowCreateModal(false)
  }

  // DMDA-4.1: Activity Logging Functions
  const logProjectAction = (projectId: number, actionType: string, details: any) => {
    const newLog = {
      id: Date.now(),
      project_id: projectId,
      user_id: 1, // Current user ID
      action_type: actionType,
      action_details: details,
      created_at: new Date().toISOString()
    }
    setActivityLogs([newLog, ...activityLogs])
  }

  const getProjectActivityLogs = (projectId: number) => {
    return activityLogs.filter(log => log.project_id === projectId)
  }

  // DMDA-4.2: Kanban View Functions
  const initializeKanbanColumns = () => {
    const columns = [
      { id: 'draft', title: 'Bản nháp', color: '#6B7280', projects: [] as any[] },
      { id: 'pending_approval', title: 'Chờ phê duyệt', color: '#F59E0B', projects: [] as any[] },
      { id: 'approved', title: 'Đã phê duyệt', color: '#10B981', projects: [] as any[] },
      { id: 'rejected', title: 'Đã từ chối', color: '#EF4444', projects: [] as any[] },
      { id: 'in_progress', title: 'Đang thực hiện', color: '#3B82F6', projects: [] as any[] },
      { id: 'completed', title: 'Hoàn thành', color: '#8B5CF6', projects: [] as any[] },
      { id: 'suspended', title: 'Dừng thực hiện', color: '#F97316', projects: [] as any[] }
    ]
    
    // Populate columns with projects
    columns.forEach(column => {
      column.projects = projects.filter(p => {
        if (column.id === 'draft') return p.approval_status === 'initialized'
        if (column.id === 'pending_approval') return p.approval_status === 'pending_approval'
        if (column.id === 'approved') return p.approval_status === 'approved' && p.execution_status === 'not_started'
        if (column.id === 'rejected') return p.approval_status === 'rejected'
        if (column.id === 'in_progress') return p.execution_status === 'in_progress'
        if (column.id === 'completed') return p.execution_status === 'completed'
        if (column.id === 'suspended') return p.execution_status === 'suspended'
        return false
      })
    })
    
    setKanbanColumns(columns)
  }

  const handleDragDrop = (projectId: number, fromStatus: string, toStatus: string) => {
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        let newApprovalStatus = p.approval_status
        let newExecutionStatus = p.execution_status
        
        if (toStatus === 'approved') newApprovalStatus = 'approved'
        if (toStatus === 'rejected') newApprovalStatus = 'rejected'
        if (toStatus === 'in_progress') newExecutionStatus = 'in_progress'
        if (toStatus === 'completed') newExecutionStatus = 'completed'
        if (toStatus === 'suspended') newExecutionStatus = 'suspended'
        
        return {
          ...p,
          approval_status: newApprovalStatus,
          execution_status: newExecutionStatus
        }
      }
      return p
    })
    
    setProjects(updatedProjects)
    logProjectAction(projectId, 'status_changed', { from: fromStatus, to: toStatus })
  }

  // DMDA-4.3: Export Functions
  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)
    
    // Simulate export process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      setExportProgress(i)
    }
    
    // Generate export data
    const exportData = projects.map(p => ({
      'Mã dự án': p.project_code,
      'Tên dự án': p.name,
      'Loại dự án': getProjectTypeLabelText(p.category),
      'Năm': p.start_date.split('-')[0],
      'Ngày bắt đầu': p.start_date,
      'Ngân sách': formatCurrency(p.planned_budget),
      'Trạng thái': getStatusLabelText(p.approval_status, 'approval'),
      'Nguồn gốc': getProjectType(p) === 'new' ? 'Dự án mới' : 'Dự án chuyển tiếp',
      'Dự án chính thức': p.is_strategic_project ? 'Có' : 'Không'
    }))
    
    // Create and download file
    if (exportFormat === 'excel') {
      // Simulate Excel export
      const csvContent = [
        Object.keys(exportData[0]).join(','),
        ...exportData.map(row => Object.values(row).join(','))
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Danh_muc_du_an_${selectedYear}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    }
    
    setIsExporting(false)
    setShowExportModal(false)
  }

  // DMDA-4.4: Reporting Functions
  const generateDashboardReport = () => {
    const totalProjects = projects.length
    const newProjects = projects.filter(p => getProjectType(p) === 'new').length
    const carryoverProjects = projects.filter(p => getProjectType(p) === 'carryover').length
    const approvedProjects = projects.filter(p => p.approval_status === 'approved').length
    const pendingProjects = projects.filter(p => p.approval_status === 'pending_approval').length
    const totalBudget = projects.reduce((sum, p) => sum + p.planned_budget, 0)
    
    return {
      totalProjects,
      newProjects,
      carryoverProjects,
      approvedProjects,
      pendingProjects,
      totalBudget
    }
  }

  const generateChartData = (type: string, data: any) => {
    switch (type) {
      case 'pie':
        return {
          labels: ['Đã phê duyệt', 'Chờ phê duyệt', 'Đã từ chối', 'Khác'],
          datasets: [{
            data: [
              data.approvedProjects,
              data.pendingProjects,
              data.rejectedProjects || 0,
              data.totalProjects - data.approvedProjects - data.pendingProjects - (data.rejectedProjects || 0)
            ],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#6B7280']
          }]
        }
      default:
        return data
    }
  }

  // DMDA-4.5: Permission Functions
  const checkPermission = (action: string, resourceId?: number) => {
    // Simulate permission check
    const userPermissions = ['view', 'create', 'edit', 'delete', 'approve']
    return userPermissions.includes(action)
  }

  const getUserRoles = () => {
    return [
      { id: 1, name: 'Project Manager', permissions: ['view', 'create', 'edit', 'approve'] },
      { id: 2, name: 'Project Member', permissions: ['view', 'edit'] },
      { id: 3, name: 'Viewer', permissions: ['view'] }
    ]
  }

  useEffect(() => {
    handleFilterChange()
  }, [selectedYear, selectedProjectType, selectedProjectSource, selectedApprovalStatus, showOfficialProjectsOnly])

  // Initialize Kanban columns when view mode changes
  useEffect(() => {
    if (viewMode === 'kanban') {
      initializeKanbanColumns()
    }
  }, [viewMode, projects])

  // Auto-reset filters when year changes significantly
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    if (parseInt(selectedYear) < currentYear - 2) {
      setSelectedYear(currentYear.toString())
    }
  }, [])

  // Calculate statistics for dashboard
  const stats = {
    totalProjects: projects.length,
    newProjects: projects.filter(p => getProjectType(p) === 'new').length,
    carryoverProjects: projects.filter(p => getProjectType(p) === 'carryover').length,
    approvedProjects: projects.filter(p => p.approval_status === 'approved').length,
    pendingProjects: projects.filter(p => p.approval_status === 'pending_approval').length,
    totalBudget: projects.reduce((sum, p) => sum + p.planned_budget, 0),
    approvedBudget: projects.reduce((sum, p) => sum + p.approved_budget, 0),
    disbursedBudget: projects.reduce((sum, p) => sum + p.total_disbursed, 0)
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Statistics */}
      <div className="space-y-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tổng dự án - Màu đỏ Agribank (concept chính) */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/10 to-[#800020]/20 hover:from-[#800020]/20 hover:to-[#800020]/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#800020] mb-1">Tổng dự án</p>
                  <p className="text-3xl font-bold text-[#800020]">{stats.totalProjects}</p>
                  <p className="text-xs text-[#800020] mt-1">Tất cả dự án</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-full shadow-lg">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dự án mới - Màu xanh lá */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/20 hover:from-green-500/20 hover:to-green-600/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">Dự án mới</p>
                  <p className="text-3xl font-bold text-green-800">{stats.newProjects}</p>
                  <p className="text-xs text-green-600 mt-1">Năm {selectedYear}</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dự án chuyển tiếp - Màu cam */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500/10 to-orange-600/20 hover:from-orange-500/20 hover:to-orange-600/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700 mb-1">Dự án chuyển tiếp</p>
                  <p className="text-3xl font-bold text-orange-800">{stats.carryoverProjects}</p>
                  <p className="text-xs text-orange-600 mt-1">Từ năm trước</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tổng ngân sách - Màu tím */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-purple-600/20 hover:from-purple-500/20 hover:to-purple-600/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 mb-1">Tổng ngân sách</p>
                  <p className="text-3xl font-bold text-purple-800">
                    {stats.totalBudget.toLocaleString('vi-VN')}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">VND</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Statistics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dự án đã phê duyệt - Màu xanh lá đậm */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 hover:from-emerald-500/20 hover:to-emerald-600/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700 mb-1">Đã phê duyệt</p>
                  <p className="text-3xl font-bold text-emerald-800">{stats.approvedProjects}</p>
                  <p className="text-xs text-emerald-600 mt-1">Sẵn sàng thực hiện</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dự án chờ phê duyệt - Màu vàng */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 hover:from-yellow-500/20 hover:to-yellow-600/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700 mb-1">Chờ phê duyệt</p>
                  <p className="text-3xl font-bold text-yellow-800">{stats.pendingProjects}</p>
                  <p className="text-xs text-yellow-600 mt-1">Đang xử lý</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dự án chính thức - Màu đỏ Agribank */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/10 to-[#800020]/20 hover:from-[#800020]/20 hover:to-[#800020]/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#800020] mb-1">Dự án chính thức</p>
                  <p className="text-3xl font-bold text-[#800020]">
                    {officialProjectsStats.total}
                  </p>
                  <p className="text-xs text-[#800020] mt-1">
                    {officialProjectsStats.approved} đã phê duyệt • {officialProjectsStats.pending} chờ phê duyệt
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-full shadow-lg">
                  <span className="text-2xl">🏛️</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* DMDA-4.2: View Mode Toggle and Enhanced Controls */}
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
              onClick={() => setShowReportsModal(true)}
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

            {/* Project Source Filter with Enhanced Tooltip */}
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
                <CheckCircle className="w-4 h-4 text-[#800020]" />
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

            {/* Reset Filters Button */}
            <div className="flex items-end">
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
          
          {/* Official Projects Filter (DMDA-3.5) */}
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
                🏛️ {officialProjectsStats.total} dự án
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Bulk Action Button (DMDA-3.2) */}
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
   

      {/* DMDA-4.2: Kanban View */}
      {viewMode === "kanban" && (
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#800020]" />
              Bảng Kanban - Quản lý Dự án
            </CardTitle>
            <p className="text-sm text-slate-600">Kéo thả dự án giữa các cột để thay đổi trạng thái</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {kanbanColumns.map((column) => (
                <div key={column.id} className="space-y-4">
                  {/* Column Header */}
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: `${column.color}20` }}>
                    <h3 className="font-semibold text-sm" style={{ color: column.color }}>
                      {column.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      {column.projects.length} dự án
                    </p>
                  </div>
                  
                  {/* Project Cards */}
                  <div className="space-y-3">
                    {column.projects.map((project: any) => (
                      <div
                        key={project.id}
                        className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                        draggable={checkPermission('edit', project.id)}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', project.id.toString())
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault()
                          const projectId = parseInt(e.dataTransfer.getData('text/plain'))
                          if (projectId !== project.id) {
                            handleDragDrop(projectId, project.approval_status, column.id)
                          }
                        }}
                      >
                        <div className="space-y-2">
                          <div className="font-mono font-bold text-xs text-[#800020]">
                            {project.project_code}
                          </div>
                          <div className="text-xs font-medium text-slate-900 line-clamp-2">
                            {project.name}
                          </div>
                          <div className="text-xs text-slate-600">
                            {formatCurrency(project.planned_budget)}
                          </div>
                          <div className="flex items-center justify-between">
                            {getProjectTypeLabel(project.category)}
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleViewProjectDetails(project)}
                                className="p-1 hover:bg-slate-100 rounded text-slate-600"
                                title="Xem chi tiết"
                              >
                                <Eye className="w-3 h-3" />
                              </button>
                              {checkPermission('edit', project.id) && (
                                <button
                                  onClick={() => handleEditProject(project)}
                                  className="p-1 hover:bg-slate-100 rounded text-[#800020]"
                                  title="Chỉnh sửa"
                                >
                                  <Edit className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Projects Table with Horizontal Scroll */}
      {viewMode === "list" && (
        <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[1400px]">
              <Table>
              <TableHeader className="sticky top-0 bg-gradient-to-r from-slate-50 to-white z-10">
                <TableRow className="hover:bg-slate-50">
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedProjectsForBulk.length === currentProjects.filter(p => canSubmitForApproval(p)).length && selectedProjectsForBulk.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProjectsForBulk(currentProjects.filter(p => canSubmitForApproval(p)))
                          } else {
                            setSelectedProjectsForBulk([])
                          }
                        }}
                        className="w-4 h-4 text-[#800020] bg-gray-100 border-gray-300 rounded focus:ring-[#800020] focus:ring-2"
                      />
                      <span>Chọn</span>
                    </div>
                </TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">Mã dự án</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">Tên dự án</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">Ngày bắt đầu</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">Nguồn gốc dự án</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">TMĐT dự kiến</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">TMĐT phê duyệt</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">Lũy kế vốn đã ứng</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">Vốn đã ứng năm hiện tại</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">Dự kiến vốn sẽ ứng</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">Đề xuất kế hoạch vốn năm sau</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">Trạng thái phê duyệt</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">Trạng thái thực hiện</TableHead>
                  <TableHead className="font-semibold bg-slate-50 p-4 whitespace-nowrap">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {currentProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-slate-50 transition-colors duration-200">
                    <TableCell className="p-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProjectsForBulk.some(p => p.id === project.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProjectsForBulk([...selectedProjectsForBulk, project])
                          } else {
                            setSelectedProjectsForBulk(selectedProjectsForBulk.filter(p => p.id !== project.id))
                          }
                        }}
                        disabled={!canSubmitForApproval(project)}
                        className={`w-4 h-4 text-[#800020] bg-gray-100 border-gray-300 rounded focus:ring-[#800020] focus:ring-2 ${
                          selectedProjectsForBulk.includes(project.id) ? 'ring-2 ring-[#800020] ring-offset-2' : ''
                        }`}
                      />
                  </TableCell>
                    <TableCell className="p-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <div className="font-mono font-bold text-[#800020] text-sm">
                          {project.project_code}
                        </div>
                        {getProjectTypeLabel(project.category)}
                      </div>
                  </TableCell>
                    <TableCell className="p-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="font-medium text-slate-900">{project.name}</div>
                        <div className="text-xs text-slate-500">Phòng: {project.department}</div>
                      </div>
                  </TableCell>
                    <TableCell className="p-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        {new Date(project.start_date).toLocaleDateString('vi-VN')}
                      </div>
                  </TableCell>
                    <TableCell className="p-4 whitespace-nowrap">
                      {getProjectSourceLabel(getProjectType(project))}
                  </TableCell>
                    <TableCell className="p-4 font-medium text-slate-900 whitespace-nowrap">
                      {formatCurrency(project.planned_budget)}
                  </TableCell>
                    <TableCell className="p-4 font-medium text-slate-900 whitespace-nowrap">
                      {formatCurrency(project.approved_budget)}
                  </TableCell>
                    <TableCell className="p-4 font-medium text-slate-900 whitespace-nowrap">
                      {formatCurrency(project.total_disbursed)}
                  </TableCell>
                    <TableCell className="p-4 font-medium text-slate-900 whitespace-nowrap">
                      {formatCurrency(project.current_year_disbursed)}
                  </TableCell>
                    <TableCell className="p-4 font-medium text-slate-900 whitespace-nowrap">
                      {formatCurrency(project.expected_disbursement)}
                  </TableCell>
                    <TableCell className="p-4 font-medium text-slate-900 whitespace-nowrap">
                      {formatCurrency(project.next_year_plan)}
                    </TableCell>
                    <TableCell className="p-4 whitespace-nowrap">
                      {getStatusBadge(project.approval_status, 'approval', project)}
                    </TableCell>
                    <TableCell className="p-4 whitespace-nowrap">
                      {getStatusBadge(project.execution_status, 'execution')}
                    </TableCell>
                    <TableCell className="p-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewProjectDetails(project)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                        
                        {/* Nút chỉnh sửa - hiển thị theo trạng thái */}
                        {canEditDirectly(project) ? (
                          <button 
                            onClick={() => handleEditProject(project)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                            title="Chỉnh sửa trực tiếp"
                          >
                            <Edit className="w-4 h-4 text-[#800020]" />
                          </button>
                        ) : (
                          <button 
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors opacity-50 cursor-not-allowed" 
                            title="Yêu cầu chỉnh sửa (dự án đã phê duyệt)"
                          >
                            <Edit className="w-4 h-4 text-slate-400" />
                          </button>
                        )}

                        {/* Nút dừng thực hiện */}
                        {canSuspend(project) && (
                          <button 
                            onClick={() => handleSuspendProject(project)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                            title="Dừng thực hiện"
                          >
                            <Clock className="w-4 h-4 text-[#800020]" />
                          </button>
                        )}

                        {/* Nút xóa */}
                        {canDelete(project) && (
                          <button 
                            onClick={() => handleDeleteProject(project)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                            title="Xóa dự án"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}

                        {/* Nút gửi phê duyệt (DMDA-3.1) */}
                        {canSubmitForApproval(project) && (
                          <button 
                            onClick={() => handleSubmitForApproval(project)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                            title="Gửi phê duyệt"
                          >
                            <Send className="w-4 h-4 text-green-600" />
                          </button>
                        )}

                        {/* Nút phê duyệt (DMDA-3.3) */}
                        {canApproveProject(project) && (
                          <button 
                            onClick={() => handleApproveProject(project)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                            title="Phê duyệt dự án"
                          >
                            <CheckCircle className="w-4 h-4 text-[#800020]" />
                          </button>
                        )}

                        {/* Nút từ chối phê duyệt (DMDA-3.4) */}
                        {canRejectProject(project) && (
                          <button 
                            onClick={() => handleRejectProject(project)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                            title="Từ chối phê duyệt"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>
      </CardContent>
        </Card>
      )}

    {/* Enhanced Pagination */}
    {totalPages > 1 && (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Hiển thị {indexOfFirstProject + 1} - {Math.min(indexOfLastProject, filteredProjects.length)} trong tổng số {filteredProjects.length} dự án
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-slate-300 hover:bg-slate-50 px-4 py-2"
              >
                Trước
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-[#800020] hover:bg-[#700018]" : "border-slate-300 hover:bg-slate-50"}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-slate-300 hover:bg-slate-50 px-4 py-2"
              >
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )}

    {/* Create Project Slide-out Page */}
    {showCreateModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
        <div className="absolute right-0 top-0 h-full w-full max-w-4xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Tạo dự án mới</h2>
                <p className="text-slate-600 mt-1">Mã dự án sẽ được tự động sinh theo logic DMDA-1.3</p>
            </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-8">
                {/* Thông tin cơ bản */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">Thông tin cơ bản</h3>
                  <div className="grid grid-cols-2 gap-4">
            <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Tên dự án *</label>
                      <Input
                        value={newProject.name}
                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        placeholder="Nhập tên dự án"
                        className="w-full"
                      />
            </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Loại dự án *</label>
                      <select
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      >
                        <option value="INV">Dự án Đầu tư</option>
                        <option value="PUR">Dự án Mua sắm</option>
                        <option value="SER">Dự án Thuê dịch vụ</option>
                        <option value="MAI">Dự án Bảo trì</option>
                      </select>
          </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phòng ban *</label>
                      <select
                        value={newProject.department}
                        onChange={(e) => setNewProject({...newProject, department: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      >
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="FIN">Tài chính</option>
                        <option value="FAC">Cơ sở vật chất</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Ngày bắt đầu *</label>
                      <Input
                        type="date"
                        value={newProject.start_date}
                        onChange={(e) => setNewProject({...newProject, start_date: e.target.value})}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Người đầu mối QLDA *</label>
                      <Input
                        value={newProject.project_manager}
                        onChange={(e) => setNewProject({...newProject, project_manager: e.target.value})}
                        placeholder="Nhập tên người quản lý"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Người đầu mối lập DA *</label>
                      <Input
                        value={newProject.project_creator}
                        onChange={(e) => setNewProject({...newProject, project_creator: e.target.value})}
                        placeholder="Nhập tên người tạo dự án"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Thông tin bổ sung */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">Thông tin bổ sung</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nguồn vốn</label>
                      <select
                        value={newProject.funding_source}
                        onChange={(e) => setNewProject({...newProject, funding_source: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      >
                        <option value="Đầu tư phát triển">Đầu tư phát triển</option>
                        <option value="Mua sắm tài sản cố định">Mua sắm tài sản cố định</option>
                        <option value="Thuê dịch vụ">Thuê dịch vụ</option>
                        <option value="Chi phí bảo trì">Chi phí bảo trì</option>
                        <option value="Chi phí vận hành">Chi phí vận hành</option>
                        <option value="Khác">Khác</option>
                      </select>
            </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="strategic_project"
                        checked={newProject.is_strategic_project}
                        onChange={(e) => setNewProject({...newProject, is_strategic_project: e.target.checked})}
                        className="w-4 h-4 text-[#800020] border-slate-300 rounded focus:ring-[#800020]"
                      />
                      <label htmlFor="strategic_project" className="text-sm font-medium text-slate-700">
                        Thuộc đề án chiến lược
                      </label>
                    </div>
                    {newProject.is_strategic_project && (
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Đề án chiến lược</label>
                        <Input
                          value={newProject.strategic_project}
                          onChange={(e) => setNewProject({...newProject, strategic_project: e.target.value})}
                          placeholder="Nhập tên đề án chiến lược"
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Tổng mức đầu tư & Kế hoạch vốn */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">Tổng mức đầu tư & Kế hoạch vốn</h3>
                  <div className="grid grid-cols-2 gap-4">
            <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">TMĐT dự kiến theo KHV *</label>
                      <Input
                        type="number"
                        value={newProject.planned_budget}
                        onChange={(e) => setNewProject({...newProject, planned_budget: Number(e.target.value)})}
                        placeholder="Nhập ngân sách"
                        className="w-full"
                      />
            </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">TMĐT theo QĐ phê duyệt CTĐT</label>
                      <Input
                        type="number"
                        value={newProject.investment_decision_duration > 0 ? newProject.investment_decision_duration : ""}
                        onChange={(e) => setNewProject({...newProject, investment_decision_duration: Number(e.target.value) || 0})}
                        placeholder="Nhập ngân sách"
                        className="w-full"
                      />
          </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">TMĐT theo QĐ phê duyệt dự án</label>
                      <Input
                        type="number"
                        value={newProject.project_approval_duration > 0 ? newProject.project_approval_duration : ""}
                        onChange={(e) => setNewProject({...newProject, project_approval_duration: Number(e.target.value) || 0})}
                        placeholder="Nhập ngân sách"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">KHV trong năm</label>
                      <Input
                        type="number"
                        placeholder="Nhập kế hoạch vốn"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">KHV năm sau</label>
                      <Input
                        type="number"
                        placeholder="Nhập kế hoạch vốn năm sau"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Các mốc phê duyệt và quyết định */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">Các mốc phê duyệt và quyết định</h3>
                  
                  {/* Quyết định chủ trương đầu tư */}
                  <div className="space-y-3 p-4 bg-[#800020]/10 rounded-lg border border-[#800020]/20">
                    <h4 className="font-medium text-[#800020]">Quyết định chủ trương đầu tư</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#800020] mb-1">Số quyết định</label>
                        <Input
                          value={newProject.investment_decision_number}
                          onChange={(e) => setNewProject({...newProject, investment_decision_number: e.target.value})}
                          placeholder="Nhập số quyết định"
                          className="w-full"
                        />
            </div>
            <div>
                        <label className="block text-sm font-medium text-[#800020] mb-1">Ngày quyết định</label>
                        <Input
                          type="date"
                          value={newProject.investment_decision_date}
                          onChange={(e) => setNewProject({...newProject, investment_decision_date: e.target.value})}
                          className="w-full"
                        />
            </div>
                      <div>
                        <label className="block text-sm font-medium text-[#800020] mb-1">Số tháng thực hiện</label>
                        <Input
                          type="number"
                          value={newProject.investment_decision_duration > 0 ? newProject.investment_decision_duration : ""}
                          onChange={(e) => setNewProject({...newProject, investment_decision_duration: Number(e.target.value) || 0})}
                          placeholder="Nhập số tháng"
                          min="1"
                          max="120"
                          className="w-full"
                        />
          </div>
    </div>
                  </div>

                  {/* Quyết định phê duyệt dự án */}
                  <div className="space-y-3 p-4 bg-[#800020]/10 rounded-lg border border-[#800020]/20">
                    <h4 className="font-medium text-[#800020]">Quyết định phê duyệt dự án</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#800020] mb-1">Số quyết định</label>
                        <Input
                          value={newProject.project_approval_number}
                          onChange={(e) => setNewProject({...newProject, project_approval_number: e.target.value})}
                          placeholder="Nhập số quyết định"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#800020] mb-1">Ngày quyết định</label>
                        <Input
                          type="date"
                          value={newProject.project_approval_date}
                          onChange={(e) => setNewProject({...newProject, project_approval_date: e.target.value})}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#800020] mb-1">Số tháng thực hiện</label>
                        <Input
                          type="number"
                          value={newProject.project_approval_duration > 0 ? newProject.project_approval_duration : ""}
                          onChange={(e) => setNewProject({...newProject, project_approval_duration: Number(e.target.value) || 0})}
                          placeholder="Nhập số tháng"
                          min="1"
                          max="120"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#800020]/10 p-4 rounded-lg border border-[#800020]/20">
                  <div className="flex items-center gap-2 text-[#800020] font-medium mb-2">
                    <Info className="w-4 h-4" />
                    Mã dự án sẽ được tự động sinh
                  </div>
                  <p className="text-[#800020] text-sm">
                    Format: {newProject.category}-{newProject.start_date.split('-')[0]}-XXX
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-white p-6">
              <div className="flex items-center justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateModal(false)}
                  className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
                >
                  Hủy
                </Button>
                <Button 
                  onClick={handleCreateProject}
                  disabled={!newProject.name || !newProject.project_manager || !newProject.project_creator || !newProject.planned_budget}
                  className="bg-[#800020] hover:bg-[#700018] text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo dự án
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

     {/* Edit Project Modal */}
     {showEditModal && editProject && (
       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
           <div className="flex items-center justify-between p-6 border-b border-slate-200">
             <div>
               <h2 className="text-2xl font-bold text-slate-900">Chỉnh sửa dự án</h2>
               <p className="text-slate-600 mt-1">Mã dự án: {editProject.project_code}</p>
             </div>
             <button
               onClick={() => setShowEditModal(false)}
               className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
             >
               <X className="w-5 h-5 text-slate-600" />
             </button>
           </div>

           <div className="p-6 space-y-6">
             {/* Thông tin cơ bản */}
             <div className="space-y-4">
               <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">Thông tin cơ bản</h3>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Tên dự án *</label>
                   <Input
                     value={editProject.name}
                     onChange={(e) => setEditProject({...editProject, name: e.target.value})}
                     className="w-full"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Người đầu mối QLDA *</label>
                   <Input
                     value={editProject.project_manager}
                     onChange={(e) => setEditProject({...editProject, project_manager: e.target.value})}
                     className="w-full"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Người đầu mối lập DA *</label>
                   <Input
                     value={editProject.project_creator}
                     onChange={(e) => setEditProject({...editProject, project_creator: e.target.value})}
                     className="w-full"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">TMĐT dự kiến theo KHV *</label>
                   <Input
                     type="number"
                     value={editProject.planned_budget}
                     onChange={(e) => setEditProject({...editProject, planned_budget: Number(e.target.value)})}
                     className="w-full"
                   />
                 </div>
               </div>
             </div>

             <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
               <Button 
                 variant="outline" 
                 onClick={() => setShowEditModal(false)}
                 className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
               >
                 Hủy
               </Button>
               <Button 
                 onClick={handleSaveEdit}
                 disabled={!editProject.name || !editProject.project_manager || !editProject.project_creator || !editProject.planned_budget}
                 className="bg-[#800020] hover:bg-[#700018] text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
               >
                 <Edit className="w-4 h-4 mr-2" />
                 Lưu thay đổi
               </Button>
             </div>
           </div>
         </div>
       </div>
     )}

     {/* Suspend Project Modal */}
     {showSuspendModal && selectedProject && (
       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
           <div className="flex items-center justify-between p-6 border-b border-slate-200">
             <div>
               <h2 className="text-2xl font-bold text-slate-900">Xác nhận Dừng Thực hiện Dự án</h2>
               <p className="text-slate-600 mt-1">Bạn có chắc chắn muốn dừng dự án này?</p>
             </div>
             <button
               onClick={() => setShowSuspendModal(false)}
               className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
             >
               <X className="w-5 h-5 text-slate-600" />
             </button>
           </div>

           <div className="p-6 space-y-6">
             <div className="bg-[#800020]/10 p-4 rounded-lg border border-[#800020]/20">
               <div className="space-y-2">
                 <div className="flex items-center gap-2">
                   <Clock className="w-5 h-5 text-[#800020]" />
                   <span className="font-medium text-[#800020]">Thông tin dự án</span>
                 </div>
                 <div className="text-sm text-[#800020]">
                   <p><strong>Mã dự án:</strong> {selectedProject.project_code}</p>
                   <p><strong>Tên dự án:</strong> {selectedProject.name}</p>
                   <p><strong>Loại dự án:</strong> {getProjectTypeLabel(selectedProject.category).props.children}</p>
                   <p><strong>Trạng thái hiện tại:</strong> {getStatusBadge(selectedProject.execution_status, 'execution').props.children}</p>
                 </div>
               </div>
             </div>

             <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">Lý do dừng thực hiện *</label>
               <textarea
                 value={suspendReason}
                 onChange={(e) => setSuspendReason(e.target.value)}
                 placeholder="Nhập lý do dừng thực hiện dự án..."
                 className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-none"
                 rows={4}
                 required
               />
             </div>

             <div className="bg-[#800020]/10 p-4 rounded-lg border border-[#800020]/20">
               <div className="flex items-center gap-2 text-[#800020]">
                 <AlertCircle className="w-4 h-4" />
                 <span className="font-medium">Lưu ý: Dự án sẽ chuyển sang trạng thái "DỪNG THỰC HIỆN"</span>
               </div>
             </div>

             <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
               <Button 
                 variant="outline" 
                 onClick={() => setShowSuspendModal(false)}
                 className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
               >
                 Hủy
               </Button>
               <Button 
                 onClick={handleConfirmSuspend}
                 disabled={!suspendReason.trim()}
                 className="bg-[#800020] hover:bg-[#700018] text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
               >
                 <Clock className="w-4 h-4 mr-2" />
                 Xác nhận Dừng
               </Button>
             </div>
           </div>
         </div>
       </div>
     )}

     {/* Delete Project Modal */}
     {showDeleteModal && selectedProject && (
       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
           <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <div>
               <h2 className="text-2xl font-bold text-slate-900">Xác nhận Xóa Dự án</h2>
               <p className="text-slate-600 mt-1">Bạn có chắc chắn muốn xóa dự án này?</p>
        </div>
             <button
               onClick={() => setShowDeleteModal(false)}
               className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
             >
               <X className="w-5 h-5 text-slate-600" />
             </button>
      </div>

             <div className="p-6 space-y-6">
               <div className="bg-[#800020]/10 p-4 rounded-lg border border-[#800020]/20">
                 <div className="space-y-2">
                   <div className="flex items-center gap-2">
                     <Trash2 className="w-5 h-5 text-red-600" />
                     <span className="font-medium text-red-800">Thông tin dự án</span>
                   </div>
                   <div className="text-sm text-red-700">
                     <p><strong>Mã dự án:</strong> {selectedProject.project_code}</p>
                     <p><strong>Tên dự án:</strong> {selectedProject.name}</p>
                     <p><strong>Loại dự án:</strong> {getProjectTypeLabel(selectedProject.category).props.children}</p>
                     <p><strong>Trạng thái:</strong> {getStatusBadge(selectedProject.approval_status, 'approval').props.children}</p>
                   </div>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Lý do xóa *</label>
                 <textarea
                   value={deleteReason}
                   onChange={(e) => setDeleteReason(e.target.value)}
                   placeholder="Nhập lý do xóa dự án..."
                   className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-none"
                   rows={4}
                   required
                 />
               </div>

               <div className="bg-[#800020]/10 p-4 rounded-lg border border-[#800020]/20">
                 <div className="flex items-center gap-2 text-[#800020]">
                   <AlertCircle className="w-4 h-4" />
                   <span className="font-medium">Lưu ý: Thao tác này không thể hoàn tác!</span>
                 </div>
               </div>

               <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                 <Button 
                   variant="outline" 
                   onClick={() => setShowDeleteModal(false)}
                   className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
                 >
                   Hủy
                 </Button>
                 <Button 
                   onClick={handleConfirmDelete}
                   disabled={!deleteReason.trim()}
                   className="bg-[#800020] hover:bg-[#700018] text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
                 >
                   <Trash2 className="w-4 h-4 mr-2" />
                   Xác nhận Xóa
                 </Button>
               </div>
             </div>
           </div>
         </div>

     )}

     {/* Project Details Modal */}
     {showProjectDetailsModal && selectedProject && (
       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
           <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
             <div>
               <h2 className="text-2xl font-bold text-slate-900">Chi tiết Dự án</h2>
               <p className="text-slate-600 mt-1">Thông tin chi tiết về dự án</p>
             </div>
             <button
               onClick={() => setShowProjectDetailsModal(false)}
               className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
             >
               <X className="w-5 h-5 text-slate-600" />
             </button>
           </div>

           <div className="p-6 space-y-8">
             {/* Basic Information */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Thông tin cơ bản</h3>
                 <div className="space-y-3">
                   <div>
                     <span className="text-sm font-medium text-slate-600">Mã dự án:</span>
                     <p className="text-slate-900 font-mono bg-slate-50 px-2 py-1 rounded">{selectedProject.project_code}</p>
                   </div>
                   <div>
                     <span className="text-sm font-medium text-slate-600">Tên dự án:</span>
                     <p className="text-slate-900">{selectedProject.name}</p>
                   </div>
                   <div>
                     <span className="text-sm font-medium text-slate-600">Loại dự án:</span>
                     <div className="mt-1">{getProjectTypeLabel(selectedProject.category)}</div>
                   </div>
                   <div>
                     <span className="text-sm font-medium text-slate-600">Phân loại tự động:</span>
                     <div className="mt-1">{getProjectType(selectedProject)}</div>
                   </div>
                 </div>
               </div>

               <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Trạng thái</h3>
                 <div className="space-y-3">
                   <div>
                     <span className="text-sm font-medium text-slate-600">Trạng thái phê duyệt:</span>
                     <div className="mt-1">{getStatusBadge(selectedProject.approval_status, 'approval')}</div>
                   </div>
                   <div>
                     <span className="text-sm font-medium text-slate-600">Trạng thái thực hiện:</span>
                     <div className="mt-1">{getStatusBadge(selectedProject.execution_status, 'execution')}</div>
                   </div>
                   <div>
                     <span className="text-sm font-medium text-slate-600">Nguồn dự án:</span>
                     <div className="mt-1">{getProjectSourceLabel(selectedProject.funding_source)}</div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Budget Information */}
             <div className="space-y-4">
               <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Thông tin ngân sách</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-[#800020]/10 p-4 rounded-lg border border-[#800020]/20">
                   <div className="text-center">
                     <p className="text-sm font-medium text-[#800020]">Ngân sách dự kiến</p>
                     <p className="text-2xl font-bold text-[#800020]">{formatCurrency(selectedProject.planned_budget)}</p>
                   </div>
                 </div>
                 <div className="bg-[#800020]/10 p-4 rounded-lg border border-[#800020]/20">
                   <div className="text-center">
                     <p className="text-sm font-medium text-[#800020]">Ngân sách đã phê duyệt</p>
                     <p className="text-2xl font-bold text-[#800020]">{formatCurrency(selectedProject.approved_budget)}</p>
                   </div>
                 </div>
                 <div className="bg-[#800020]/10 p-4 rounded-lg border border-[#800020]/20">
                   <div className="text-center">
                     <p className="text-sm font-medium text-[#800020]">Đã giải ngân</p>
                     <p className="text-2xl font-bold text-[#800020]">{formatCurrency(selectedProject.total_disbursed)}</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Timeline */}
             <div className="space-y-4">
               <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Thông tin thực hiện</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <span className="text-sm font-medium text-slate-600">Ngày bắt đầu:</span>
                   <p className="text-slate-900">{selectedProject.start_date}</p>
                 </div>
                 <div>
                   <span className="text-sm font-medium text-slate-600">Người quản lý:</span>
                   <p className="text-slate-900">{selectedProject.project_manager}</p>
                 </div>
               </div>
             </div>

             {/* Additional Information */}
             <div className="space-y-4">
               <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">Thông tin bổ sung</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <span className="text-sm font-medium text-slate-600">Phòng ban:</span>
                   <p className="text-slate-900">{selectedProject.department}</p>
                 </div>
                 <div>
                   <span className="text-sm font-medium text-slate-600">Người tạo:</span>
                   <p className="text-slate-900">{selectedProject.project_creator}</p>
                 </div>
                 {selectedProject.is_strategic_project && (
                   <div className="md:col-span-2">
                     <span className="text-sm font-medium text-slate-600">Dự án chiến lược:</span>
                     <p className="text-slate-900">{selectedProject.strategic_project}</p>
                   </div>
                 )}
               </div>
             </div>

             {/* Action Buttons */}
             <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-200">
               <Button 
                 variant="outline" 
                 onClick={() => setShowProjectDetailsModal(false)}
                 className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
               >
                 Đóng
               </Button>
               {canEditDirectly(selectedProject) && (
                 <Button 
                   onClick={() => {
                     setShowProjectDetailsModal(false)
                     handleEditProject(selectedProject)
                   }}
                   className="bg-[#800020] hover:bg-[#700018] text-white"
                 >
                   <Edit className="w-4 h-4 mr-2" />
                   Chỉnh sửa
                 </Button>
               )}
             </div>
           </div>
         </div>
       </div>
     )}

     {/* Submit for Approval Modal (DMDA-3.1) */}
     {showSubmitApprovalModal && selectedProject && (
       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
         <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4">
           <div className="p-6">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold text-slate-900">Gửi dự án để phê duyệt</h3>
               <button
                 onClick={() => setShowSubmitApprovalModal(false)}
                 className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
               >
                 <X className="w-5 h-5 text-slate-600" />
               </button>
             </div>
             
             <div className="space-y-4">
               <div className="bg-slate-50 p-3 rounded-lg">
                 <p className="text-sm text-slate-600">Dự án: <span className="font-medium text-slate-900">{selectedProject.project_code} - {selectedProject.name}</span></p>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Người phê duyệt *</label>
                 <select
                   value={selectedApprover}
                   onChange={(e) => setSelectedApprover(e.target.value)}
                   className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
                   required
                 >
                   <option value="">Chọn người phê duyệt</option>
                   {approvers.map(approver => (
                     <option key={approver.id} value={approver.id}>
                       {approver.name} - {approver.level} (Tối đa: {formatCurrency(approver.max_amount)})
                     </option>
                   ))}
                 </select>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Ghi chú (tùy chọn)</label>
                 <textarea
                   value={approvalComment}
                   onChange={(e) => setApprovalComment(e.target.value)}
                   className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
                   rows={3}
                   placeholder="Nhập ghi chú nếu cần..."
                 />
               </div>
               
               <div className="bg-[#800020]/10 p-3 rounded-lg border border-[#800020]/20">
                 <p className="text-sm text-[#800020]">
                   ⚠️ Lưu ý: Dự án sẽ chuyển sang trạng thái "Chờ phê duyệt"
                 </p>
               </div>
             </div>
             
             <div className="flex items-center justify-end space-x-3 mt-6">
               <Button
                 variant="outline"
                 onClick={() => setShowSubmitApprovalModal(false)}
                 className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
               >
                 Hủy
               </Button>
               <Button
                 onClick={handleConfirmSubmitApproval}
                 disabled={!selectedApprover}
                 className="bg-[#800020] hover:bg-[#700018] text-white"
               >
                 <Send className="w-4 h-4 mr-2" />
                 Gửi phê duyệt
               </Button>
             </div>
           </div>
         </div>
       </div>
     )}

     {/* Approve Project Modal (DMDA-3.3) */}
     {showApproveModal && selectedProject && (
       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
         <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4">
           <div className="p-6">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold text-slate-900">Phê duyệt dự án</h3>
               <button
                 onClick={() => setShowApproveModal(false)}
                 className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
               >
                 <X className="w-5 h-4 text-slate-600" />
               </button>
             </div>
             
             <div className="space-y-4">
               <div className="bg-slate-50 p-3 rounded-lg">
                 <p className="text-sm text-slate-600">Bạn có chắc chắn muốn phê duyệt:</p>
                 <p className="font-medium text-slate-900 mt-1">{selectedProject.project_code} - {selectedProject.name}</p>
                 <p className="text-sm text-slate-600 mt-1">Loại dự án: {getProjectSourceLabel(selectedProject.funding_source)}</p>
                 <p className="text-sm text-slate-600">Trạng thái hiện tại: Chờ phê duyệt</p>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Ghi chú phê duyệt (tùy chọn)</label>
                 <textarea
                   value={approvalComment}
                   onChange={(e) => setApprovalComment(e.target.value)}
                   className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
                   rows={3}
                   placeholder="Nhập ghi chú nếu cần..."
                 />
               </div>
               
               <div className="bg-[#800020]/10 p-3 rounded-lg border border-[#800020]/20">
                 <p className="text-sm text-[#800020]">
                   ✅ Lưu ý: Dự án sẽ chuyển sang trạng thái "Đã phê duyệt"
                 </p>
               </div>
             </div>
             
             <div className="flex items-center justify-end space-x-3 mt-6">
               <Button
                 variant="outline"
                 onClick={() => setShowApproveModal(false)}
                 className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
               >
                 Hủy
               </Button>
               <Button
                 onClick={handleConfirmApprove}
                 className="bg-[#800020] hover:bg-[#700018] text-white"
               >
                 <CheckCircle className="w-4 h-4 mr-2" />
                 Phê duyệt
               </Button>
             </div>
           </div>
         </div>
       </div>
     )}

     {/* Reject Project Modal (DMDA-3.4) */}
     {showRejectModal && selectedProject && (
       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
         <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4">
           <div className="p-6">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold text-slate-900">Từ chối phê duyệt dự án</h3>
               <button
                 onClick={() => setShowRejectModal(false)}
                 className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
               >
                 <X className="w-5 h-4 text-slate-600" />
               </button>
             </div>
             
             <div className="space-y-4">
               <div className="bg-slate-50 p-3 rounded-lg">
                 <p className="text-sm text-slate-600">Dự án: <span className="font-medium text-slate-900">{selectedProject.project_code} - {selectedProject.name}</span></p>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Lý do từ chối *</label>
                 <textarea
                   value={rejectionReason}
                   onChange={(e) => setRejectionReason(e.target.value)}
                   className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
                   rows={4}
                   placeholder="Nhập lý do từ chối..."
                   required
                 />
               </div>
               
               <div className="bg-[#800020]/10 p-3 rounded-lg border border-[#800020]/20">
                 <p className="text-sm text-[#800020]">
                   ⚠️ Lưu ý: Dự án sẽ chuyển về trạng thái "Từ chối phê duyệt"
                 </p>
               </div>
             </div>
             
             <div className="flex items-center justify-end space-x-3 mt-6">
               <Button
                 variant="outline"
                 onClick={() => setShowRejectModal(false)}
                 className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
               >
                 Hủy
               </Button>
               <Button
                 onClick={handleConfirmReject}
                 disabled={!rejectionReason.trim()}
                 className="bg-[#800020] hover:bg-[#700018] text-white"
               >
                 <X className="w-4 h-4 mr-2" />
                 Từ chối phê duyệt
               </Button>
             </div>
           </div>
         </div>
       </div>
     )}

     {/* Bulk Approval Modal (DMDA-3.2) */}
     {showBulkApprovalModal && (
       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
         <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
           <div className="p-6">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold text-slate-900">Gửi phê duyệt hàng loạt</h3>
               <button
                 onClick={() => setShowBulkApprovalModal(false)}
                 className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
               >
                 <X className="w-5 h-4 text-slate-600" />
               </button>
             </div>
             
             <div className="space-y-4">
               <div className="bg-slate-50 p-3 rounded-lg">
                 <p className="text-sm text-slate-600">Đã chọn {selectedProjectsForBulk.length} dự án:</p>
                 <div className="mt-2 space-y-1">
                   {selectedProjectsForBulk.map(project => (
                     <div key={project.id} className="text-sm text-slate-700">
                       • {project.project_code} - {project.name}
                     </div>
                   ))}
                 </div>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Người phê duyệt *</label>
                 <select
                   value={selectedApprover}
                   onChange={(e) => setSelectedApprover(e.target.value)}
                   className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
                   required
                 >
                   <option value="">Chọn người phê duyệt</option>
                   {approvers.map(approver => (
                     <option key={approver.id} value={approver.id}>
                       {approver.name} - {approver.level} (Tối đa: {formatCurrency(approver.max_amount)})
                     </option>
                   ))}
                 </select>
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Ghi chú (tùy chọn)</label>
                 <textarea
                   value={approvalComment}
                   onChange={(e) => setApprovalComment(e.target.value)}
                   className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
                   rows={3}
                   placeholder="Nhập ghi chú nếu cần..."
                 />
               </div>
               
               <div className="bg-[#800020]/10 p-3 rounded-lg border border-[#800020]/20">
                 <p className="text-sm text-[#800020]">
                   ⚠️ Lưu ý: Tất cả dự án sẽ chuyển sang trạng thái "Chờ phê duyệt"
                 </p>
               </div>
             </div>
             
             <div className="flex items-center justify-end space-x-3 mt-6">
               <Button
                 variant="outline"
                 onClick={() => setShowBulkApprovalModal(false)}
                 className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
               >
                 Hủy
               </Button>
               <Button
                 onClick={handleConfirmBulkApproval}
                 disabled={!selectedApprover}
                 className="bg-[#800020] hover:bg-[#700018] text-white"
               >
                 <Send className="w-4 h-4 mr-2" />
                 Gửi phê duyệt ({selectedProjectsForBulk.length} dự án)
               </Button>
             </div>
           </div>
         </div>
       </div>
      )}

      {/* DMDA-4.3: Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Xuất dữ liệu dự án</h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-4 text-slate-600" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Định dạng xuất</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="excel"
                        checked={exportFormat === "excel"}
                        onChange={(e) => setExportFormat(e.target.value as any)}
                        className="mr-2"
                      />
                      Excel (.xlsx)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="csv"
                        checked={exportFormat === "csv"}
                        onChange={(e) => setExportFormat(e.target.value as any)}
                        className="mr-2"
                      />
                      CSV (.csv)
                    </label>
                    <label className="flex text-slate-400">
                      <input
                        type="radio"
                        value="pdf"
                        checked={exportFormat === "pdf"}
                        onChange={(e) => setExportFormat(e.target.value as any)}
                        className="mr-2"
                        disabled
                      />
                      PDF (.pdf) - Sắp có
                    </label>
                  </div>
                </div>

                {isExporting && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-800">Đang xuất dữ liệu...</p>
                        <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${exportProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-blue-600 mt-1">{exportProgress}% hoàn thành</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowExportModal(false)}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="bg-[#800020] hover:bg-[#700018] text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? 'Đang xuất...' : 'Xuất dữ liệu'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DMDA-4.4: Reports Modal */}
      {showReportsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Báo cáo thống kê dự án</h3>
                <button
                  onClick={() => setShowReportsModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-4 text-slate-600" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Report Filters */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Loại báo cáo</label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value as any)}
                      className="w-full p-3 border border-slate-300 rounded-lg"
                    >
                      <option value="dashboard">Dashboard tổng quan</option>
                      <option value="chart">Biểu đồ</option>
                      <option value="table">Bảng dữ liệu</option>
                      <option value="summary">Tóm tắt</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Loại biểu đồ</label>
                    <select
                      value={chartType}
                      onChange={(e) => setChartType(e.target.value as any)}
                      className="w-full p-3 border border-slate-300 rounded-lg"
                    >
                      <option value="pie">Biểu đồ tròn</option>
                      <option value="bar">Biểu đồ cột</option>
                      <option value="line">Biểu đồ đường</option>
                      <option value="donut">Biểu đồ donut</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Năm</label>
                    <select
                      value={reportFilters.year}
                      onChange={(e) => setReportFilters({...reportFilters, year: parseInt(e.target.value)})}
                      className="w-full p-3 border border-slate-300 rounded-lg"
                    >
                      <option value={2025}>2025</option>
                      <option value={2024}>2024</option>
                      <option value={2023}>2023</option>
                    </select>
                  </div>
                </div>

                {/* Report Content */}
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h4 className="font-medium text-slate-800 mb-4">Kết quả báo cáo</h4>
                  
                  {reportType === "dashboard" && (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg border">
                        <h5 className="font-medium text-slate-700 mb-3">Thống kê tổng quan</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Tổng dự án:</span>
                            <span className="font-medium">{generateDashboardReport().totalProjects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dự án mới:</span>
                            <span className="font-medium">{generateDashboardReport().newProjects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dự án chuyển tiếp:</span>
                            <span className="font-medium">{generateDashboardReport().carryoverProjects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tổng ngân sách:</span>
                            <span className="font-medium">{formatCurrency(generateDashboardReport().totalBudget)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border">
                        <h5 className="font-medium text-slate-700 mb-3">Phân bố trạng thái</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Đã phê duyệt:</span>
                            <span className="font-medium text-green-600">{generateDashboardReport().approvedProjects}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Chờ phê duyệt:</span>
                            <span className="font-medium text-yellow-600">{generateDashboardReport().pendingProjects}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {reportType === "chart" && (
                    <div className="bg-white p-4 rounded-lg border">
                      <h5 className="font-medium text-slate-700 mb-3">Biểu đồ {chartType}</h5>
                      <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                        <p className="text-slate-500">Biểu đồ {chartType} sẽ được hiển thị ở đây</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowReportsModal(false)}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  Đóng
                </Button>
                <Button
                  onClick={() => {/* Handle export report */}}
                  className="bg-[#800020] hover:bg-[#700018] text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Xuất báo cáo
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DMDA-4.1: Activity Log Modal */}
      {showActivityLogModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Lịch sử hoạt động dự án</h3>
                <button
                  onClick={() => setShowActivityLogModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-4 text-slate-600" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Activity Log Filters */}
                <div className="flex space-x-4">
                  <select
                    value={selectedLogType}
                    onChange={(e) => setSelectedLogType(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="all">Tất cả hoạt động</option>
                    <option value="created">Tạo dự án</option>
                    <option value="updated">Cập nhật</option>
                    <option value="approved">Phê duyệt</option>
                    <option value="rejected">Từ chối</option>
                  </select>
                </div>

                {/* Activity Log List */}
                <div className="space-y-3">
                  {activityLogs.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      <p>Chưa có hoạt động nào được ghi lại</p>
                    </div>
                  ) : (
                    activityLogs.map((log) => (
                      <div key={log.id} className="bg-slate-50 p-4 rounded-lg border">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-slate-700">
                                {log.action_type === 'project_created' ? 'Tạo dự án' :
                                 log.action_type === 'status_changed' ? 'Thay đổi trạng thái' :
                                 log.action_type}
                              </span>
                              <span className="text-xs text-slate-500">
                                {new Date(log.created_at).toLocaleString('vi-VN')}
                              </span>
                            </div>
                            <div className="text-sm text-slate-600">
                              {log.action_details && log.action_details.from && log.action_details.to ? (
                                <span>Trạng thái: {log.action_details.from} → {log.action_details.to}</span>
                              ) : (
                                <span>Dự án ID: {log.project_id}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowActivityLogModal(false)}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  Đóng
                </Button>
                <Button
                  onClick={() => {/* Handle export activity log */}}
                  className="bg-[#800020] hover:bg-[#700018] text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Xuất lịch sử
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DMDA-4.5: Permissions Modal */}
      {showPermissionsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Quản lý phân quyền</h3>
                <button
                  onClick={() => setShowPermissionsModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-4 text-slate-600" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* User Roles */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium text-slate-800 mb-3">Vai trò người dùng</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {getUserRoles().map((role) => (
                      <div key={role.id} className="bg-white p-4 rounded-lg border">
                        <h5 className="font-medium text-slate-700 mb-2">{role.name}</h5>
                        <div className="space-y-1">
                          {role.permissions.map((permission) => (
                            <div key={permission} className="text-xs text-slate-600">
                              • {permission}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Permission Matrix */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-medium text-slate-800 mb-3">Ma trận phân quyền</h4>
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-center text-slate-500">
                      Ma trận phân quyền sẽ được hiển thị ở đây
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowPermissionsModal(false)}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  Đóng
                </Button>
                <Button
                  onClick={() => {/* Handle save permissions */}}
                  className="bg-[#800020] hover:bg-[#700018] text-white"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Lưu phân quyền
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
