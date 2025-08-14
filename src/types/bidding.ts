export interface BiddingPackage {
  id: number
  package_code: string
  name: string
  description: string
  project_id: number
  project_name: string
  estimated_value: number
  contract_type: 'construction' | 'supply' | 'service' | 'mixed'
  bidding_method: 'open' | 'limited' | 'direct' | 'competitive'
  status: 'draft' | 'published' | 'bidding' | 'evaluating' | 'awarded' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  department: string
  package_manager: string
  created_by: string
  created_at: string
  updated_at: string
  published_date?: string
  bidding_deadline?: string
  evaluation_deadline?: string
  award_date?: string
  notes?: string
  attachments?: string[]
}

export interface NewBiddingPackage {
  name: string
  description: string
  project_id: number
  estimated_value: number
  contract_type: 'construction' | 'supply' | 'service' | 'mixed'
  bidding_method: 'open' | 'limited' | 'direct' | 'competitive'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  department: string
  package_manager: string
  bidding_deadline?: string
  evaluation_deadline?: string
  notes?: string
}

export interface BiddingFilters {
  year: string
  contractType: string
  biddingMethod: string
  status: string
  priority: string
  searchTerm: string
}

export interface BiddingStats {
  total: number
  draft: number
  published: number
  bidding: number
  evaluating: number
  awarded: number
  cancelled: number
  totalValue: number
  averageValue: number
}
