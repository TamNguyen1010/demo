import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Project } from "@/types/project"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency with enhanced display
export const formatCurrency = (amount: number) => {
  if (amount === 0) return "0 VND"
  return `${amount.toLocaleString('vi-VN')} VND`
}

// Get project type based on start date and approval status
export const getProjectType = (project: Project) => {
  const currentYear = new Date().getFullYear()
  const projectYear = new Date(project.start_date).getFullYear()
  
  if (projectYear === currentYear) {
    return 'new'
  } else if (projectYear < currentYear && project.approval_status !== 'approved') {
    return 'carryover'
  } else {
    return 'new'
  }
}

// Generate project code
export const generateProjectCode = (category: string, year: string, department: string, existingProjects: Project[]) => {
  const existingProjectsInCategory = existingProjects.filter(p => 
    p.category === category && 
    p.department === department && 
    p.start_date.startsWith(year)
  )
  const sequence = (existingProjectsInCategory.length + 1).toString().padStart(3, '0')
  return `${category}-${year}-${sequence}`
}

// Check if project is official
export const isOfficialProject = (project: Project) => {
  return project.approval_status === 'approved'
}

// Get project type label text for export
export const getProjectTypeLabelText = (category: string) => {
  const types: Record<string, string> = {
    'INV': 'Dự án Đầu tư',
    'PUR': 'Dự án Mua sắm',
    'SER': 'Dự án Thuê dịch vụ',
    'MAI': 'Dự án Bảo trì'
  }
  return types[category] || category
}

// Get status label text for export
export const getStatusLabelText = (status: string, type: 'approval' | 'execution' | 'edit') => {
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

// Calculate dashboard statistics
export const calculateDashboardStats = (projects: Project[]) => {
  return {
    totalProjects: projects.length,
    newProjects: projects.filter(p => getProjectType(p) === 'new').length,
    carryoverProjects: projects.filter(p => getProjectType(p) === 'carryover').length,
    approvedProjects: projects.filter(p => p.approval_status === 'approved').length,
    pendingProjects: projects.filter(p => p.approval_status === 'pending_approval').length,
    totalBudget: projects.reduce((sum, p) => sum + p.planned_budget, 0),
    approvedBudget: projects.reduce((sum, p) => sum + p.approved_budget, 0),
    disbursedBudget: projects.reduce((sum, p) => sum + p.total_disbursed, 0)
  }
}

// Calculate official projects statistics
export const calculateOfficialProjectsStats = (projects: Project[]) => {
  const officialProjects = projects.filter(p => isOfficialProject(p))
  
  return {
    total: officialProjects.length,
    approved: projects.filter(p => p.approval_status === 'approved').length,
    pending: projects.filter(p => p.approval_status === 'pending_approval').length,
    byCategory: officialProjects.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }
}
