export interface Contract {
  id: number
  contract_number: string
  name: string
  type: ContractType
  status: ContractStatus
  value: number
  currency: string
  start_date: string
  end_date: string
  manager_id: number
  manager_name: string
  contractor_id: number
  contractor_name: string
  client_id: number
  client_name: string
  description: string
  progress: number
  created_at: string
  updated_at: string
  created_by: number
  updated_by: number
}

export interface ContractFormData {
  name: string
  type: ContractType
  status: ContractStatus
  value: number
  currency: string
  start_date: string
  end_date: string
  manager_id: number
  contractor_id: number
  client_id: number
  description: string
}

export interface ContractAmendment {
  id: number
  contract_id: number
  amendment_number: string
  amendment_type: AmendmentType
  amendment_description: string
  old_value?: any
  new_value?: any
  amendment_date: Date
  effective_date: Date
  approved_by?: number
  approved_at?: Date
  created_by: number
  created_at: Date
}

export interface PaymentSchedule {
  id: number
  contract_id: number
  payment_number: number
  payment_description: string
  payment_amount: number
  payment_date: Date
  payment_status: PaymentStatus
  payment_method?: string
  invoice_number?: string
  created_at: Date
}

export interface ContractChange {
  id: number
  contract_id: number
  change_type: ChangeType
  change_description: string
  old_value?: any
  new_value?: any
  change_date: Date
  effective_date: Date
  approved_by?: number
  approved_at?: Date
  created_by: number
  created_at: Date
}

export interface DeletedContract extends Contract {
  deleted_at: string
  deleted_by: number
  deletion_reason?: string
}

export interface SearchFilters {
  query: string
  status: ContractStatus[]
  type: ContractType[]
  value_range: {
    min?: number
    max?: number
  }
  date_range: {
    start?: string
    end?: string
  }
  manager_id?: number
  contractor_id?: number
  client_id?: number
}

export interface SavedSearch {
  id: number
  name: string
  filters: SearchFilters
  created_by: number
  created_at: Date
}

export interface ExportConfig {
  format: "excel" | "csv" | "pdf"
  data_scope: "all" | "filtered" | "selected"
  columns: ExportColumn[]
  template?: ExportTemplate
  filename?: string
}

export interface ExportColumn {
  key: string
  label: string
  category: string
  selected: boolean
}

export interface ExportTemplate {
  id: number
  name: string
  description: string
  columns: string[]
  created_by: number
  created_at: Date
}

export interface ActivityLog {
  id: number
  contract_id: number
  action: string
  description: string
  before_values: any
  after_values: any
  user_id: number
  user_name: string
  timestamp: string
  severity: "info" | "warning" | "error"
  ip_address: string
  user_agent: string
}

export interface LogFilters {
  action?: string[]
  severity?: string[]
  user_id?: number
  date_range?: {
    start?: string
    end?: string
  }
}

export type ContractType = "construction" | "service" | "supply" | "consulting" | "other"
export type ContractStatus = "draft" | "pending_approval" | "approved" | "active" | "completed" | "terminated" | "cancelled" | "hidden" | "deleted"
export type AmendmentType = "value_change" | "scope_change" | "timeline_change" | "terms_change" | "other"
export type PaymentStatus = "pending" | "paid" | "overdue" | "cancelled"
export type ChangeType = "value_change" | "scope_change" | "timeline_change" | "terms_change" | "other"
export type DocumentType = "contract" | "amendment" | "invoice" | "receipt" | "other"
export type BudgetCategory = "materials" | "labor" | "equipment" | "overhead" | "other"

export interface BudgetAllocation {
  id: number
  contract_id: number
  category: BudgetCategory
  allocated_amount: number
  spent_amount: number
  remaining_amount: number
  created_at: Date
  updated_at: Date
}
