"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { DashboardPage } from "@/components/pages/Dashboard/DashboardPage"
import { ProjectListPage } from "@/components/pages/Projects/ProjectListPage"
import { BiddingPage } from "@/components/pages/Bidding/BiddingPage"
import { ContractPage } from "@/components/pages/Contract/ContractPage"
import { CostPage } from "@/components/pages/Cost/CostPage"
import { AssetsServicesPage } from "@/components/pages/AssetsServices/AssetsServicesPage"
import { ReportsPage } from "@/components/pages/Reports/ReportsPage"
import { useProjects } from "@/hooks/useProjects"
import { calculateDashboardStats } from "@/lib/utils"

export function MainLayout() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [showReportsModal, setShowReportsModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showActivityLogModal, setShowActivityLogModal] = useState(false)
  const [showPermissionsModal, setShowPermissionsModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    suspendProject,
    submitForApproval,
    approveProject,
    rejectProject,
    updateProjectStatus
  } = useProjects()

  // Calculate dashboard stats
  const dashboardStats = calculateDashboardStats(projects)

  // Handle page change
  const handlePageChange = (page: string) => {
    setCurrentPage(page)
    setSelectedProject(null) // Close any open modals
  }

  // Handle project actions
  const handleViewProjectDetails = (project: any) => {
    setSelectedProject(project)
    // You can implement a modal here
  }

  const handleEditProject = (project: any) => {
    setSelectedProject(project)
    // You can implement edit modal here
  }

  const handleDeleteProject = (project: any) => {
    if (confirm(`Bạn có chắc chắn muốn xóa dự án "${project.name}"?`)) {
      deleteProject(project.id, "Xóa theo yêu cầu người dùng")
    }
  }

  const handleSuspendProject = (project: any) => {
    const reason = prompt("Nhập lý do dừng thực hiện:")
    if (reason) {
      suspendProject(project.id, reason)
    }
  }

  const handleSubmitForApproval = (project: any) => {
    const approver = prompt("Nhập tên người phê duyệt:")
    if (approver) {
      submitForApproval(project.id, approver)
    }
  }

  const handleApproveProject = (project: any) => {
    const approver = prompt("Nhập tên người phê duyệt:")
    const notes = prompt("Nhập ghi chú (tùy chọn):")
    if (approver) {
      approveProject(project.id, approver, notes || undefined)
    }
  }

  const handleRejectProject = (project: any) => {
    const approver = prompt("Nhập tên người từ chối:")
    const reason = prompt("Nhập lý do từ chối:")
    if (approver && reason) {
      rejectProject(project.id, approver, reason)
    }
  }

  const handleStatusChange = (projectId: number, fromStatus: string, toStatus: string) => {
    // Parse the status string (format: "approvalStatus_executionStatus")
    const [newApprovalStatus, newExecutionStatus] = toStatus.split('_')
    
    // Update the project status
    updateProjectStatus(projectId, newApprovalStatus, newExecutionStatus)
  }

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <DashboardPage
            stats={dashboardStats}
            selectedYear={new Date().getFullYear().toString()}
            onShowReports={() => setShowReportsModal(true)}
          />
        )
              case "project-category":
          return (
            <ProjectListPage
              projects={projects}
              onShowCreateModal={() => setShowCreateModal(true)}
              onShowExportModal={() => setShowExportModal(true)}
              onShowActivityLogModal={() => setShowActivityLogModal(true)}
              onShowPermissionsModal={() => setShowPermissionsModal(true)}
              onShowReportsModal={() => setShowReportsModal(true)}
              onViewProjectDetails={handleViewProjectDetails}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
              onSuspendProject={handleSuspendProject}
              onSubmitForApproval={handleSubmitForApproval}
              onApproveProject={handleApproveProject}
              onRejectProject={handleRejectProject}
              onAddProject={addProject}
              onStatusChange={handleStatusChange}
            />
          )
      case "bidding-packages":
        return <BiddingPage />
      case "contracts":
        return <ContractPage />
      case "costs":
        return <CostPage />
              case "assets-services":
          return <AssetsServicesPage />
        case "reports":
          return <ReportsPage />
      default:
        return (
          <DashboardPage
            stats={dashboardStats}
            selectedYear={new Date().getFullYear().toString()}
            onShowReports={() => setShowReportsModal(true)}
          />
        )
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-white text-slate-800">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500 mb-4 flex items-center space-x-2">
          <span>Dashboard</span>
          {currentPage === "project-category" && (
            <>
              <span>/</span>
              <span className="text-[#800020] font-medium">Danh mục dự án</span>
            </>
          )}
          {currentPage === "bidding-packages" && (
            <>
              <span>/</span>
              <span className="text-[#800020] font-medium">Gói thầu</span>
            </>
          )}
          {currentPage === "contracts" && (
            <>
              <span>/</span>
              <span className="text-[#800020] font-medium">Hợp đồng</span>
            </>
          )}
          {currentPage === "costs" && (
            <>
              <span>/</span>
              <span className="text-[#800020] font-medium">Chi phí</span>
            </>
          )}
          {currentPage === "assets-services" && (
            <>
              <span>/</span>
              <span className="text-[#800020] font-medium">Tài sản & dịch vụ</span>
            </>
          )}
          {currentPage === "reports" && (
            <>
              <span>/</span>
              <span className="text-[#800020] font-medium">Báo cáo</span>
            </>
          )}
        </div>

        {/* Render current page */}
        {renderCurrentPage()}
      </main>

      {/* Modals can be added here */}
      {showReportsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Báo cáo chi tiết</h3>
            <p className="text-slate-600 mb-4">Chức năng báo cáo chi tiết đang được phát triển...</p>
            <button
              onClick={() => setShowReportsModal(false)}
              className="bg-[#800020] hover:bg-[#700018] text-white px-4 py-2 rounded-lg"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Tạo dự án mới</h3>
            <p className="text-slate-600 mb-4">Form tạo dự án mới đang được phát triển...</p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="bg-[#800020] hover:bg-[#700018] text-white px-4 py-2 rounded-lg"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
