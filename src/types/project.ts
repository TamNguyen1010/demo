export interface Project {
  id: number
  project_code: string
  name: string
  start_date: string
  department: string
  planned_budget: number
  approved_budget: number
  total_disbursed: number
  current_year_disbursed: number
  expected_disbursement: number
  next_year_plan: number
  approval_status: 'initialized' | 'pending_approval' | 'approved' | 'rejected' | 'deleted'
  execution_status: 'not_started' | 'in_progress' | 'suspended' | 'completed'
  edit_request_status: 'none' | 'edit_requested'
  category: 'INV' | 'PUR' | 'SER' | 'MAI'
  project_manager: string
  project_creator: string
  funding_source: string
  is_strategic_project: boolean
  strategic_project: string
  investment_decision_number: string
  investment_decision_date: string
  investment_decision_duration: number
  project_approval_number: string
  project_approval_date: string
  project_approval_duration: number
}

export interface NewProject {
  name: string
  category: string
  department: string
  planned_budget: number
  start_date: string
  project_manager: string
  project_creator: string
  funding_source: string
  is_strategic_project: boolean
  strategic_project: string
  investment_decision_number: string
  investment_decision_date: string
  investment_decision_duration: number
  project_approval_number: string
  project_approval_date: string
  project_approval_duration: number
}

export interface Approver {
  id: number
  name: string
  level: string
  max_amount: number
  is_active: boolean
}

export interface ActivityLog {
  id: number
  project_id: number
  user_id: number
  action_type: string
  action_details: any
  created_at: string
}

export interface KanbanColumn {
  id: string
  title: string
  color: string
  projects: Project[]
}

export interface DashboardStats {
  totalProjects: number
  newProjects: number
  carryoverProjects: number
  approvedProjects: number
  pendingProjects: number
  totalBudget: number
  approvedBudget: number
  disbursedBudget: number
}

export interface OfficialProjectsStats {
  total: number
  approved: number
  pending: number
  byCategory: Record<string, number>
}

export interface ReportFilters {
  year: number
  category_id: string | null
  status: string | null
  user_id: number | null
  date_from: string | null
  date_to: string | null
  official_only: boolean
}
