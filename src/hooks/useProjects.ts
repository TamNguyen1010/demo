"use client"

import { useState, useEffect } from "react"
import { Project, NewProject } from "@/types/project"
import { generateProjectCode, getProjectType, isOfficialProject } from "@/lib/utils"

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      project_code: "INV-2025-001",
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
      project_code: "PUR-2024-045",
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
      project_code: "SER-2025-003",
      name: "Thuê dịch vụ bảo mật",
      start_date: "2025-03-01",
      department: "IT",
      planned_budget: 1200000000,
      approved_budget: 0,
      total_disbursed: 0,
      current_year_disbursed: 0,
      expected_disbursement: 1200000000,
      next_year_plan: 0,
      approval_status: "pending_approval",
      execution_status: "not_started",
      edit_request_status: "none",
      category: "SER",
      project_manager: "Hoàng Văn E",
      project_creator: "Vũ Thị F",
      funding_source: "Chi phí thường xuyên",
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
      id: 4,
      project_code: "MAI-2025-004",
      name: "Bảo trì hệ thống điều hòa",
      start_date: "2025-02-15",
      department: "FAC",
      planned_budget: 300000000,
      approved_budget: 0,
      total_disbursed: 0,
      current_year_disbursed: 0,
      expected_disbursement: 300000000,
      next_year_plan: 0,
      approval_status: "initialized",
      execution_status: "not_started",
      edit_request_status: "none",
      category: "MAI",
      project_manager: "Đặng Văn G",
      project_creator: "Lý Thị H",
      funding_source: "Chi phí thường xuyên",
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
      project_code: "INV-2025-005",
      name: "Xây dựng trung tâm dữ liệu",
      start_date: "2025-04-01",
      department: "IT",
      planned_budget: 8000000000,
      approved_budget: 0,
      total_disbursed: 0,
      current_year_disbursed: 0,
      expected_disbursement: 8000000000,
      next_year_plan: 4000000000,
      approval_status: "rejected",
      execution_status: "not_started",
      edit_request_status: "edit_requested",
      category: "INV",
      project_manager: "Trịnh Văn I",
      project_creator: "Ngô Thị K",
      funding_source: "Đầu tư phát triển",
      is_strategic_project: true,
      strategic_project: "Hạ tầng công nghệ thông tin",
      investment_decision_number: "QĐ-2025-004",
      investment_decision_date: "2025-01-25",
      investment_decision_duration: 36,
      project_approval_number: "",
      project_approval_date: "",
      project_approval_duration: 0
    },
    {
      id: 6,
      project_code: "INV-2024-001",
      name: "Dự án chuyển tiếp từ 2024",
      start_date: "2024-06-01",
      department: "FIN",
      planned_budget: 2000000000,
      approved_budget: 1800000000,
      total_disbursed: 1500000000,
      current_year_disbursed: 500000000,
      expected_disbursement: 300000000,
      next_year_plan: 0,
      approval_status: "approved",
      execution_status: "completed",
      edit_request_status: "none",
      category: "INV",
      project_manager: "Bùi Văn L",
      project_creator: "Đỗ Thị M",
      funding_source: "Đầu tư phát triển",
      is_strategic_project: false,
      strategic_project: "",
      investment_decision_number: "QĐ-2024-001",
      investment_decision_date: "2024-05-15",
      investment_decision_duration: 18,
      project_approval_number: "QĐ-2024-002",
      project_approval_date: "2024-05-20",
      project_approval_duration: 18
    },
    {
      id: 7,
      project_code: "SER-2025-006",
      name: "Đào tạo nhân viên",
      start_date: "2025-03-15",
      department: "HR",
      planned_budget: 500000000,
      approved_budget: 0,
      total_disbursed: 0,
      current_year_disbursed: 0,
      expected_disbursement: 500000000,
      next_year_plan: 0,
      approval_status: "initialized",
      execution_status: "not_started",
      edit_request_status: "none",
      category: "SER",
      project_manager: "Phan Văn N",
      project_creator: "Hồ Thị O",
      funding_source: "Chi phí thường xuyên",
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
      id: 8,
      project_code: "PUR-2025-007",
      name: "Mua sắm xe công vụ",
      start_date: "2025-05-01",
      department: "FAC",
      planned_budget: 1500000000,
      approved_budget: 0,
      total_disbursed: 0,
      current_year_disbursed: 0,
      expected_disbursement: 1500000000,
      next_year_plan: 0,
      approval_status: "pending_approval",
      execution_status: "not_started",
      edit_request_status: "none",
      category: "PUR",
      project_manager: "Lưu Văn P",
      project_creator: "Tô Thị Q",
      funding_source: "Đầu tư phát triển",
      is_strategic_project: false,
      strategic_project: "",
      investment_decision_number: "QĐ-2025-005",
      investment_decision_date: "2025-02-01",
      investment_decision_duration: 12,
      project_approval_number: "",
      project_approval_date: "",
      project_approval_duration: 0
    }
  ])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Add new project
  const addProject = (newProjectData: NewProject) => {
    const projectCode = generateProjectCode(
      newProjectData.category, 
      newProjectData.start_date.split('-')[0], 
      newProjectData.department,
      projects
    )
    
    const newProject: Project = {
      id: projects.length + 1,
      project_code: projectCode,
      name: newProjectData.name,
      start_date: newProjectData.start_date,
      department: newProjectData.department,
      planned_budget: newProjectData.planned_budget,
      approved_budget: 0,
      total_disbursed: 0,
      current_year_disbursed: 0,
      expected_disbursement: newProjectData.planned_budget,
      next_year_plan: 0,
      approval_status: "initialized",
      execution_status: "not_started",
      edit_request_status: "none",
      category: newProjectData.category as any,
      project_manager: newProjectData.project_manager,
      project_creator: newProjectData.project_creator,
      funding_source: newProjectData.funding_source,
      is_strategic_project: newProjectData.is_strategic_project,
      strategic_project: newProjectData.strategic_project,
      investment_decision_number: newProjectData.investment_decision_number,
      investment_decision_date: newProjectData.investment_decision_date,
      investment_decision_duration: newProjectData.investment_decision_duration,
      project_approval_number: newProjectData.project_approval_number,
      project_approval_date: newProjectData.project_approval_date,
      project_approval_duration: newProjectData.project_approval_duration
    }
    
    setProjects([...projects, newProject])
  }

  // Update project
  const updateProject = (id: number, updates: Partial<Project>) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p
    ))
  }

  // Delete project
  const deleteProject = (id: number, reason: string) => {
    setProjects(projects.map(p => 
      p.id === id ? {
        ...p, 
        approval_status: 'deleted',
        deleted_at: new Date().toISOString(),
        delete_reason: reason
      } : p
    ))
  }

  // Suspend project
  const suspendProject = (id: number, reason: string) => {
    setProjects(projects.map(p => 
      p.id === id ? {
        ...p, 
        execution_status: 'suspended',
        suspended_at: new Date().toISOString(),
        suspension_reason: reason
      } : p
    ))
  }

  // Submit for approval
  const submitForApproval = (id: number, approver: string) => {
    setProjects(projects.map(p => 
      p.id === id ? {
        ...p, 
        approval_status: 'pending_approval',
        submitted_for_approval_at: new Date().toISOString().split('T')[0],
        submitted_by: approver
      } : p
    ))
  }

  // Approve project
  const approveProject = (id: number, approver: string, notes?: string) => {
    setProjects(projects.map(p => 
      p.id === id ? {
        ...p, 
        approval_status: 'approved',
        approved_at: new Date().toISOString().split('T')[0],
        approved_by: approver,
        approval_notes: notes
      } : p
    ))
  }

  // Reject project
  const rejectProject = (id: number, approver: string, reason: string) => {
    setProjects(projects.map(p => 
      p.id === id ? {
        ...p, 
        approval_status: 'rejected',
        rejected_at: new Date().toISOString().split('T')[0],
        rejected_by: approver,
        rejection_reason: reason
      } : p
    ))
  }

  // Update project status (for drag and drop)
  const updateProjectStatus = (id: number, approvalStatus: string, executionStatus: string) => {
    setProjects(prevProjects => {
      return prevProjects.map(p => 
        p.id === id ? {
          ...p, 
          approval_status: approvalStatus as any,
          execution_status: executionStatus as any,
          updated_at: new Date().toISOString()
        } : p
      )
    })
  }

  // Get filtered projects
  const getFilteredProjects = (filters: {
    year: string
    projectType: string
    projectSource: string
    approvalStatus: string
    searchTerm: string
    showOfficialOnly: boolean
  }) => {
    return projects.filter(project => {
      if (project.approval_status === 'deleted') return false
      
      const projectType = getProjectType(project)
      const matchesYear = project.start_date.startsWith(filters.year)
      const matchesType = filters.projectType === "all" || project.category === filters.projectType
      const matchesSource = filters.projectSource === "all" || projectType === filters.projectSource
      const matchesStatus = filters.approvalStatus === "all" || project.approval_status === filters.approvalStatus
      const matchesSearch = project.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) || 
                           project.project_code.toLowerCase().includes(filters.searchTerm.toLowerCase())
      const matchesOfficial = !filters.showOfficialOnly || isOfficialProject(project)

      return matchesYear && matchesType && matchesSource && matchesStatus && matchesSearch && matchesOfficial
    })
  }

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    suspendProject,
    submitForApproval,
    approveProject,
    rejectProject,
    updateProjectStatus,
    getFilteredProjects
  }
}
