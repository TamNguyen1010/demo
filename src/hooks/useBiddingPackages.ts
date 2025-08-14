import { useState } from "react"
import { BiddingPackage, NewBiddingPackage, BiddingFilters, BiddingStats } from "@/types/bidding"
import { formatCurrency } from "@/lib/utils"

export function useBiddingPackages() {
  const [biddingPackages, setBiddingPackages] = useState<BiddingPackage[]>([
    {
      id: 1,
      package_code: "TB-2025-001",
      name: "Thiết kế và xây dựng trụ sở chính",
      description: "Thiết kế và xây dựng trụ sở chính công ty với diện tích 5000m2",
      project_id: 1,
      project_name: "Xây dựng trụ sở chính",
      estimated_value: 50000000000,
      contract_type: "construction",
      bidding_method: "open",
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
      package_code: "TB-2025-002",
      name: "Cung cấp thiết bị văn phòng",
      description: "Cung cấp đầy đủ thiết bị văn phòng cho trụ sở mới",
      project_id: 1,
      project_name: "Xây dựng trụ sở chính",
      estimated_value: 2000000000,
      contract_type: "supply",
      bidding_method: "limited",
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
      package_code: "TB-2025-003",
      name: "Dịch vụ tư vấn pháp lý",
      description: "Tư vấn pháp lý cho dự án xây dựng trụ sở",
      project_id: 1,
      project_name: "Xây dựng trụ sở chính",
      estimated_value: 500000000,
      contract_type: "service",
      bidding_method: "direct",
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
      package_code: "TB-2025-004",
      name: "Xây dựng hệ thống điện",
      description: "Thiết kế và lắp đặt hệ thống điện cho trụ sở",
      project_id: 2,
      project_name: "Nâng cấp hệ thống điện",
      estimated_value: 8000000000,
      contract_type: "construction",
      bidding_method: "open",
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
      package_code: "TB-2025-005",
      name: "Cung cấp máy tính và phần mềm",
      description: "Cung cấp máy tính và phần mềm cho toàn bộ nhân viên",
      project_id: 3,
      project_name: "Hiện đại hóa công nghệ",
      estimated_value: 3000000000,
      contract_type: "mixed",
      bidding_method: "competitive",
      status: "evaluating",
      priority: "medium",
      department: "IT",
      package_manager: "Hoàng Thị E",
      created_by: "Admin",
      created_at: "2025-01-20T13:00:00Z",
      updated_at: "2025-01-28T09:30:00Z",
      published_date: "2025-01-22",
      bidding_deadline: "2025-02-05",
      evaluation_deadline: "2025-02-15",
      notes: "Đang đánh giá các hồ sơ dự thầu"
    }
  ])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generate package code
  const generatePackageCode = (year: string, department: string, existingPackages: BiddingPackage[]) => {
    const existingCodes = existingPackages
      .filter(biddingPackage => biddingPackage.package_code.startsWith(`TB-${year}`))
      .map(biddingPackage => biddingPackage.package_code)
    
    let counter = 1
    let newCode = `TB-${year}-${counter.toString().padStart(3, '0')}`
    
    while (existingCodes.includes(newCode)) {
      counter++
      newCode = `TB-${year}-${counter.toString().padStart(3, '0')}`
    }
    
    return newCode
  }

  // Add new bidding package
  const addBiddingPackage = (newPackageData: NewBiddingPackage) => {
    const packageCode = generatePackageCode(
      new Date().getFullYear().toString(),
      newPackageData.department,
      biddingPackages
    )
    
    const newPackage: BiddingPackage = {
      id: biddingPackages.length + 1,
      package_code: packageCode,
      name: newPackageData.name,
      description: newPackageData.description,
      project_id: newPackageData.project_id,
      project_name: "Dự án liên quan", // This should be fetched from project data
      estimated_value: newPackageData.estimated_value,
      contract_type: newPackageData.contract_type,
      bidding_method: newPackageData.bidding_method,
      status: "draft",
      priority: newPackageData.priority,
      department: newPackageData.department,
      package_manager: newPackageData.package_manager,
      created_by: "Current User", // This should be from auth context
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      bidding_deadline: newPackageData.bidding_deadline,
      evaluation_deadline: newPackageData.evaluation_deadline,
      notes: newPackageData.notes
    }
    
    setBiddingPackages([...biddingPackages, newPackage])
  }

  // Update bidding package
  const updateBiddingPackage = (id: number, updates: Partial<BiddingPackage>) => {
    setBiddingPackages(biddingPackages.map(biddingPackage => 
      biddingPackage.id === id ? { ...biddingPackage, ...updates, updated_at: new Date().toISOString() } : biddingPackage
    ))
  }

  // Delete bidding package
  const deleteBiddingPackage = (id: number, reason: string) => {
    setBiddingPackages(biddingPackages.map(biddingPackage => 
      biddingPackage.id === id ? {
        ...biddingPackage, 
        status: 'cancelled',
        updated_at: new Date().toISOString(),
        notes: reason
      } : biddingPackage
    ))
  }

  // Publish bidding package
  const publishBiddingPackage = (id: number) => {
    setBiddingPackages(biddingPackages.map(biddingPackage => 
      biddingPackage.id === id ? {
        ...biddingPackage, 
        status: 'published',
        published_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      } : biddingPackage
    ))
  }

  // Award bidding package
  const awardBiddingPackage = (id: number, awardDate: string, notes?: string) => {
    setBiddingPackages(biddingPackages.map(biddingPackage => 
      biddingPackage.id === id ? {
        ...biddingPackage, 
        status: 'awarded',
        award_date: awardDate,
        updated_at: new Date().toISOString(),
        notes: notes
      } : biddingPackage
    ))
  }

  // Get filtered bidding packages
  const getFilteredBiddingPackages = (filters: BiddingFilters) => {
    return biddingPackages.filter(biddingPackage => {
      const packageYear = biddingPackage.created_at.split('-')[0]
      const matchesYear = packageYear === filters.year
      const matchesType = filters.contractType === "all" || biddingPackage.contract_type === filters.contractType
      const matchesMethod = filters.biddingMethod === "all" || biddingPackage.bidding_method === filters.biddingMethod
      const matchesStatus = filters.status === "all" || biddingPackage.status === filters.status
      const matchesPriority = filters.priority === "all" || biddingPackage.priority === filters.priority
      const matchesSearch = biddingPackage.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) || 
                           biddingPackage.package_code.toLowerCase().includes(filters.searchTerm.toLowerCase())

      return matchesYear && matchesType && matchesMethod && matchesStatus && matchesPriority && matchesSearch
    })
  }

  // Calculate bidding statistics
  const calculateBiddingStats = (): BiddingStats => {
    const total = biddingPackages.length
    const draft = biddingPackages.filter(biddingPackage => biddingPackage.status === 'draft').length
    const published = biddingPackages.filter(biddingPackage => biddingPackage.status === 'published').length
    const bidding = biddingPackages.filter(biddingPackage => biddingPackage.status === 'bidding').length
    const evaluating = biddingPackages.filter(biddingPackage => biddingPackage.status === 'evaluating').length
    const awarded = biddingPackages.filter(biddingPackage => biddingPackage.status === 'awarded').length
    const cancelled = biddingPackages.filter(biddingPackage => biddingPackage.status === 'cancelled').length
    const totalValue = biddingPackages.reduce((sum, biddingPackage) => sum + biddingPackage.estimated_value, 0)
    const averageValue = total > 0 ? totalValue / total : 0

    return {
      total,
      draft,
      published,
      bidding,
      evaluating,
      awarded,
      cancelled,
      totalValue,
      averageValue
    }
  }

  return {
    biddingPackages,
    loading,
    error,
    addBiddingPackage,
    updateBiddingPackage,
    deleteBiddingPackage,
    publishBiddingPackage,
    awardBiddingPackage,
    getFilteredBiddingPackages,
    calculateBiddingStats
  }
}
