import { useState } from "react"
import { BiddingPackage, NewBiddingPackage, BiddingFilters, BiddingStats, TenderMethod, TenderStatus, Priority } from "@/types/bidding"
import { formatCurrency } from "@/lib/utils"

export function useBiddingPackages() {
  const [biddingPackages, setBiddingPackages] = useState<BiddingPackage[]>([
    {
      id: 1,
      package_code: "GT-2025-001",
      name: "Thiết kế và xây dựng trụ sở chính",
      description: "Thiết kế và xây dựng trụ sở chính công ty với diện tích 5000m2",
      project_id: 1,
      project_name: "Xây dựng trụ sở chính",
      estimated_value: 50000000000,
      currency: "VND",
      contract_type: "construction",
      tender_method: "open_tender",
      status: "published",
      priority: "high",
      department: "CON",
      package_manager: "Nguyễn Văn A",
      created_by: "Admin",
      created_at: "2025-01-15T08:00:00Z",
      updated_at: "2025-01-20T10:30:00Z",
      published_date: "2025-01-20",
      bidding_deadline: "2025-02-15",
      evaluation_deadline: "2025-02-25",
      notes: "Gói thầu quan trọng, cần đẩy nhanh tiến độ"
    },
    {
      id: 2,
      package_code: "GT-2025-002",
      name: "Cung cấp thiết bị văn phòng",
      description: "Cung cấp đầy đủ thiết bị văn phòng cho trụ sở mới",
      project_id: 1,
      project_name: "Xây dựng trụ sở chính",
      estimated_value: 2000000000,
      currency: "VND",
      contract_type: "supply",
      tender_method: "limited_tender",
      status: "bidding",
      priority: "medium",
      department: "ADM",
      package_manager: "Trần Thị B",
      created_by: "Admin",
      created_at: "2025-01-18T09:00:00Z",
      updated_at: "2025-01-22T14:15:00Z",
      published_date: "2025-01-22",
      bidding_deadline: "2025-02-10",
      evaluation_deadline: "2025-02-20",
      notes: "Cần thiết bị chất lượng cao"
    },
    {
      id: 3,
      package_code: "GT-2025-003",
      name: "Dịch vụ tư vấn pháp lý",
      description: "Tư vấn pháp lý cho dự án xây dựng trụ sở",
      project_id: 1,
      project_name: "Xây dựng trụ sở chính",
      estimated_value: 500000000,
      currency: "VND",
      contract_type: "service",
      tender_method: "direct_appointment",
      status: "awarded",
      priority: "low",
      department: "LEG",
      package_manager: "Lê Văn C",
      created_by: "Admin",
      created_at: "2025-01-10T10:00:00Z",
      updated_at: "2025-01-25T16:45:00Z",
      published_date: "2025-01-12",
      award_date: "2025-01-25",
      notes: "Đã trao cho công ty tư vấn uy tín"
    },
    {
      id: 4,
      package_code: "GT-2025-004",
      name: "Xây dựng hệ thống điện",
      description: "Thiết kế và lắp đặt hệ thống điện cho trụ sở",
      project_id: 2,
      project_name: "Nâng cấp hệ thống điện",
      estimated_value: 8000000000,
      currency: "VND",
      contract_type: "construction",
      tender_method: "open_tender",
      status: "draft",
      priority: "high",
      department: "ENG",
      package_manager: "Phạm Văn D",
      created_by: "Admin",
      created_at: "2025-01-25T11:00:00Z",
      updated_at: "2025-01-25T11:00:00Z",
      notes: "Cần thiết kế hệ thống điện hiện đại"
    },
    {
      id: 5,
      package_code: "GT-2025-005",
      name: "Cung cấp máy tính và phần mềm",
      description: "Cung cấp máy tính và phần mềm cho toàn bộ nhân viên",
      project_id: 3,
      project_name: "Hiện đại hóa công nghệ",
      estimated_value: 3000000000,
      currency: "VND",
      contract_type: "mixed",
      tender_method: "competitive_consultation",
      status: "created",
      priority: "medium",
      department: "IT",
      package_manager: "Vũ Thị E",
      created_by: "Admin",
      created_at: "2025-01-28T14:00:00Z",
      updated_at: "2025-01-28T14:00:00Z",
      notes: "Cần thiết bị và phần mềm bản quyền"
    }
  ])

  const generatePackageCode = (): string => {
    const year = new Date().getFullYear()
    const existingCodes = biddingPackages
      .filter(pkg => pkg.package_code.startsWith(`GT-${year}-`))
      .map(pkg => parseInt(pkg.package_code.split('-')[2]))
    
    const nextNumber = existingCodes.length > 0 ? Math.max(...existingCodes) + 1 : 1
    return `GT-${year}-${nextNumber.toString().padStart(3, '0')}`
  }

  const addBiddingPackage = (newPackageData: NewBiddingPackage) => {
    const newPackage: BiddingPackage = {
      id: Math.max(...biddingPackages.map(p => p.id)) + 1,
      package_code: generatePackageCode(),
      name: newPackageData.name,
      description: newPackageData.description || '',
      project_id: newPackageData.project_id,
      project_name: "Dự án mới", // TODO: Get from project module
      estimated_value: newPackageData.estimated_value,
      currency: newPackageData.currency,
      contract_type: "construction", // Default value
      tender_method: newPackageData.tender_method,
      status: "draft",
      priority: newPackageData.priority,
      department: newPackageData.department || "Chưa phân công",
      package_manager: newPackageData.package_manager || "Chưa phân công",
      created_by: "Admin", // TODO: Get from auth context
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      start_date: newPackageData.start_date,
      end_date: newPackageData.end_date,
      tbmt_code: newPackageData.tbmt_code,
      participant_count: newPackageData.participant_count,
      hsmt_approval_decision: newPackageData.hsmt_approval_decision,
      kqlcnt_approval_decision: newPackageData.kqlcnt_approval_decision,
      notes: newPackageData.notes
    }

    setBiddingPackages(prev => [...prev, newPackage])
    return newPackage
  }

  const updateBiddingPackage = (id: number, updates: Partial<BiddingPackage>) => {
    setBiddingPackages(prev => prev.map(pkg => 
      pkg.id === id 
        ? { ...pkg, ...updates, updated_at: new Date().toISOString() }
        : pkg
    ))
  }

  const deleteBiddingPackage = (id: number, reason: string) => {
    // TODO: Log deletion reason
    setBiddingPackages(prev => prev.filter(pkg => pkg.id !== id))
  }

  const publishBiddingPackage = (id: number) => {
    updateBiddingPackage(id, {
      status: "published",
      published_date: new Date().toISOString()
    })
  }

  const awardBiddingPackage = (id: number, awardDate: string, notes?: string) => {
    setBiddingPackages(prev => prev.map(pkg => 
      pkg.id === id ? {
        ...pkg, 
        status: 'awarded',
        award_date: awardDate,
        updated_at: new Date().toISOString(),
        notes: notes
      } : pkg
    ))
  }

  const calculateBiddingStats = (): BiddingStats => {
    const total = biddingPackages.length
    const draft = biddingPackages.filter(pkg => pkg.status === 'draft').length
    const created = biddingPackages.filter(pkg => pkg.status === 'created').length
    const in_progress = biddingPackages.filter(pkg => pkg.status === 'in_progress').length
    const published = biddingPackages.filter(pkg => pkg.status === 'published').length
    const bidding = biddingPackages.filter(pkg => pkg.status === 'bidding').length
         const evaluating = biddingPackages.filter(pkg => pkg.status === 'evaluating').length
    const awarded = biddingPackages.filter(pkg => pkg.status === 'awarded').length
    const completed = biddingPackages.filter(pkg => pkg.status === 'completed').length
    const cancelled = biddingPackages.filter(pkg => pkg.status === 'cancelled').length

    const totalValue = biddingPackages.reduce((sum, pkg) => sum + pkg.estimated_value, 0)
    const averageValue = total > 0 ? totalValue / total : 0

    return {
      total,
      draft,
      created,
      in_progress,
      published,
      bidding,
      evaluating,
      awarded,
      completed,
      cancelled,
      totalValue,
      averageValue
    }
  }

  const getBiddingPackagesByStatus = (status: TenderStatus) => {
    return biddingPackages.filter(pkg => pkg.status === status)
  }

  const getBiddingPackagesByPriority = (priority: Priority) => {
    return biddingPackages.filter(pkg => pkg.priority === priority)
  }

  const getBiddingPackagesByProject = (projectId: number) => {
    return biddingPackages.filter(pkg => pkg.project_id === projectId)
  }

  const searchBiddingPackages = (searchTerm: string) => {
    const term = searchTerm.toLowerCase()
    return biddingPackages.filter(pkg => 
      pkg.name.toLowerCase().includes(term) ||
      pkg.package_code.toLowerCase().includes(term) ||
      pkg.description?.toLowerCase().includes(term) ||
      pkg.project_name.toLowerCase().includes(term)
    )
  }

  return {
    biddingPackages,
    addBiddingPackage,
    updateBiddingPackage,
    deleteBiddingPackage,
    publishBiddingPackage,
    awardBiddingPackage,
    calculateBiddingStats,
    getBiddingPackagesByStatus,
    getBiddingPackagesByPriority,
    getBiddingPackagesByProject,
    searchBiddingPackages
  }
}
