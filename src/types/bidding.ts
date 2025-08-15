export interface BiddingPackage {
  id: number
  package_code: string
  name: string
  description: string
  project_id: number
  project_name: string
  estimated_value: number
  currency: string
  contract_type: 'construction' | 'supply' | 'service' | 'mixed'
  tender_method: TenderMethod
  status: TenderStatus
  priority: Priority
  department: string
  package_manager: string
  created_by: string
  created_at: string
  updated_at: string
  
  // Thông tin bổ sung (tùy chọn)
  tbmt_code?: string
  participant_count?: number
  hsmt_approval_decision?: string
  kqlcnt_approval_decision?: string
  winning_bid_value?: number
  winning_contractor?: string
  
  // Thông tin thời gian
  start_date?: string
  end_date?: string
  published_date?: string
  bidding_deadline?: string
  evaluation_deadline?: string
  award_date?: string
  
  // Thông tin từ Bitrix
  bitrix_task_id?: number
  bitrix_workflow_id?: number
  bitrix_status?: string
  
  // Thông tin bổ sung
  notes?: string
  attachments?: string[]
  
  // Thông tin từ Cổng thông tin đấu thầu
  portal_url?: string
  portal_tender_id?: string
  last_sync_at?: string
  sync_status?: 'success' | 'failed' | 'partial'
}

export interface NewBiddingPackage {
  name: string
  description?: string
  project_id: number
  estimated_value: number
  currency: string
  tender_method: TenderMethod
  priority: Priority
  department?: string
  package_manager?: string
  
  // Thông tin bổ sung
  tbmt_code?: string
  participant_count?: number
  hsmt_approval_decision?: string
  kqlcnt_approval_decision?: string
  
  // Thông tin thời gian
  start_date: string
  end_date: string
  
  // Ghi chú
  notes?: string
}

export interface TenderPortalData {
  ma_goi_thau: string
  ten_goi_thau: string
  gia_goi_thau: number
  hinh_thuc_lua_chon: string
  ma_tbmt: string
  so_luong_nha_thau: number
  ngay_mo_thau: string
  ngay_dong_thau: string
  mo_ta_chi_tiet: string
  dia_diem_thuc_hien: string
  chu_dau_tu: string
  trang_thai: string
}

export type TenderMethod = 
  | 'open_tender'        // Đấu thầu rộng rãi
  | 'limited_tender'     // Đấu thầu hạn chế
  | 'direct_appointment' // Chỉ định thầu
  | 'competitive_consultation' // Tư vấn cạnh tranh

export type TenderStatus = 
  | 'draft'           // Bản nháp
  | 'created'         // Đã tạo
  | 'in_progress'     // Đang triển khai
  | 'published'       // Đã công bố
  | 'bidding'         // Đang thầu
  | 'evaluating'      // Đánh giá
  | 'awarded'         // Đã trao thầu
  | 'completed'       // Hoàn thành
  | 'cancelled'       // Đã hủy

export type Priority = 
  | 'low'      // Thấp
  | 'medium'   // Trung bình
  | 'high'     // Cao
  | 'critical' // Khẩn cấp

export interface BiddingFilters {
  year: string
  contractType: string
  biddingMethod: string
  status: string
  priority: string
  searchTerm: string
  projectId?: number
}

export interface BiddingStats {
  total: number
  draft: number
  created: number
  in_progress: number
  published: number
  bidding: number
  evaluating: number
  awarded: number
  completed: number
  cancelled: number
  totalValue: number
  averageValue: number
}

export interface ApiConnectionConfig {
  id: number
  connection_name: string
  base_url: string
  api_key?: string
  is_active: boolean
  rate_limit_per_minute: number
  rate_limit_per_hour: number
  timeout_ms: number
  retry_attempts: number
  created_at: string
  updated_at: string
}

export interface ApiCallLog {
  id: number
  connection_id: number
  endpoint: string
  request_data?: any
  response_data?: any
  status_code: number
  response_time_ms: number
  success: boolean
  error_message?: string
  performed_by: number
  performed_at: string
}

export interface TenderPortalMapping {
  id: number
  tender_package_id: number
  portal_tender_id: string
  portal_url?: string
  last_sync_at: string
  sync_status: 'success' | 'failed' | 'partial'
  original_data?: TenderPortalData
  mapped_data?: Partial<NewBiddingPackage>
}
