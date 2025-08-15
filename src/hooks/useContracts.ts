"use client"

import { useState, useEffect } from "react"
import { Contract, ContractFormData, SearchFilters, ExportConfig, LogFilters, ActivityLog } from "@/types/contract"

// Mock data cho development
const mockContracts: Contract[] = [
  {
    id: 1,
    contract_number: "HD-2024-001",
    contract_name: "Hợp đồng xây dựng trụ sở chính",
    contract_type: "construction",
    contract_description: "Xây dựng trụ sở chính ngân hàng TPBank",
    contract_status: "active",
    contract_value: 50000000000,
    currency: "VND",
    payment_terms: "Thanh toán theo tiến độ thi công",
    contract_start_date: new Date("2024-01-15"),
    contract_end_date: new Date("2024-12-31"),
    signing_date: new Date("2024-01-10"),
    effective_date: new Date("2024-01-15"),
    client_id: 1,
    contractor_id: 2,
    contract_manager_id: 3,
    contract_supervisor_id: 4,
    tender_package_id: 123,
    tender_method: "Đấu thầu rộng rãi",
    winning_bid_value: 50000000000,
    created_by: 3,
    created_at: new Date("2024-01-05"),
    updated_by: 3,
    updated_at: new Date("2024-01-10")
  },
  {
    id: 2,
    contract_number: "HD-2024-002",
    contract_name: "Hợp đồng cung cấp thiết bị IT",
    contract_type: "supply",
    contract_description: "Cung cấp thiết bị công nghệ thông tin",
    contract_status: "draft",
    contract_value: 15000000000,
    currency: "VND",
    payment_terms: "Thanh toán 30% trước, 70% sau khi giao hàng",
    contract_start_date: new Date("2024-03-01"),
    contract_end_date: new Date("2024-06-30"),
    client_id: 1,
    contractor_id: 5,
    contract_manager_id: 3,
    tender_package_id: 124,
    tender_method: "Đấu thầu hạn chế",
    winning_bid_value: 15000000000,
    created_by: 3,
    created_at: new Date("2024-02-15")
  },
  {
    id: 3,
    contract_number: "HD-2024-003",
    contract_name: "Hợp đồng tư vấn thiết kế",
    contract_type: "consulting",
    contract_description: "Tư vấn thiết kế kiến trúc và nội thất",
    contract_status: "completed",
    contract_value: 8000000000,
    currency: "VND",
    payment_terms: "Thanh toán theo từng giai đoạn thiết kế",
    contract_start_date: new Date("2023-09-01"),
    contract_end_date: new Date("2024-01-31"),
    signing_date: new Date("2023-08-25"),
    effective_date: new Date("2023-09-01"),
    completion_date: new Date("2024-01-31"),
    client_id: 1,
    contractor_id: 6,
    contract_manager_id: 3,
    contract_supervisor_id: 4,
    tender_package_id: 125,
    tender_method: "Chỉ định thầu",
    winning_bid_value: 8000000000,
    created_by: 3,
    created_at: new Date("2023-08-20"),
    updated_by: 3,
    updated_at: new Date("2024-01-31")
  }
]

const mockActivityLogs: ActivityLog[] = [
  {
    id: 1,
    contract_id: 1,
    action: "Tạo hợp đồng",
    description: "Tạo hợp đồng mới HD-2024-001",
    user_id: 3,
    user_name: "Nguyễn Văn A",
    timestamp: new Date("2024-01-05T09:00:00"),
    severity: "low"
  },
  {
    id: 2,
    contract_id: 1,
    action: "Ký hợp đồng",
    description: "Hợp đồng đã được ký kết",
    user_id: 3,
    user_name: "Nguyễn Văn A",
    timestamp: new Date("2024-01-10T14:30:00"),
    severity: "medium"
  },
  {
    id: 3,
    contract_id: 2,
    action: "Tạo hợp đồng",
    description: "Tạo hợp đồng mới HD-2024-002",
    user_id: 3,
    user_name: "Nguyễn Văn A",
    timestamp: new Date("2024-02-15T10:15:00"),
    severity: "low"
  }
]

export function useContracts() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load contracts
  useEffect(() => {
    setContracts(mockContracts)
  }, [])

  // Create contract
  const createContract = async (contractData: ContractFormData): Promise<Contract> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newContract: Contract = {
        id: Date.now(),
        ...contractData,
        created_by: 3, // Mock user ID
        created_at: new Date(),
        updated_by: 3,
        updated_at: new Date()
      }
      
      setContracts(prev => [...prev, newContract])
      return newContract
    } catch (err) {
      setError("Không thể tạo hợp đồng")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update contract
  const updateContract = async (id: number, updates: Partial<Contract>): Promise<Contract> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setContracts(prev => prev.map(contract => 
        contract.id === id 
          ? { ...contract, ...updates, updated_by: 3, updated_at: new Date() }
          : contract
      ))
      
      const updatedContract = contracts.find(c => c.id === id)!
      return { ...updatedContract, ...updates }
    } catch (err) {
      setError("Không thể cập nhật hợp đồng")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Delete contract (soft delete)
  const deleteContract = async (id: number, reason?: string): Promise<void> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setContracts(prev => prev.map(contract => 
        contract.id === id 
          ? { ...contract, contract_status: "deleted" as any }
          : contract
      ))
    } catch (err) {
      setError("Không thể xóa hợp đồng")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Bulk delete contracts
  const bulkDeleteContracts = async (ids: number[], reason?: string): Promise<void> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setContracts(prev => prev.map(contract => 
        ids.includes(contract.id) 
          ? { ...contract, contract_status: "deleted" as any }
          : contract
      ))
    } catch (err) {
      setError("Không thể xóa nhiều hợp đồng")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Search contracts
  const searchContracts = async (filters: SearchFilters): Promise<Contract[]> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let filtered = [...contracts]
      
      if (filters.query) {
        filtered = filtered.filter(contract => 
          contract.contract_name.toLowerCase().includes(filters.query.toLowerCase()) ||
          contract.contract_number.toLowerCase().includes(filters.query.toLowerCase())
        )
      }
      
      if (filters.status.length > 0) {
        filtered = filtered.filter(contract => filters.status.includes(contract.contract_status))
      }
      
      if (filters.type.length > 0) {
        filtered = filtered.filter(contract => filters.type.includes(contract.contract_type))
      }
      
      if (filters.value_range.min !== undefined) {
        filtered = filtered.filter(contract => contract.contract_value >= filters.value_range.min!)
      }
      
      if (filters.value_range.max !== undefined) {
        filtered = filtered.filter(contract => contract.contract_value <= filters.value_range.max!)
      }
      
      return filtered
    } catch (err) {
      setError("Không thể tìm kiếm hợp đồng")
      return []
    } finally {
      setLoading(false)
    }
  }

  // Export contracts
  const exportContracts = async (config: ExportConfig): Promise<void> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Exporting contracts with config:", config)
      // TODO: Implement actual export logic
    } catch (err) {
      setError("Không thể xuất dữ liệu")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Get activity logs
  const getActivityLogs = async (contractId?: number, filters?: LogFilters): Promise<ActivityLog[]> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let logs = [...mockActivityLogs]
      
      if (contractId) {
        logs = logs.filter(log => log.contract_id === contractId)
      }
      
      if (filters?.date_range.start) {
        logs = logs.filter(log => log.timestamp >= filters.date_range.start!)
      }
      
      if (filters?.date_range.end) {
        logs = logs.filter(log => log.timestamp <= filters.date_range.end!)
      }
      
      if (filters?.action_type.length > 0) {
        logs = logs.filter(log => filters.action_type.includes(log.action))
      }
      
      if (filters?.severity) {
        logs = logs.filter(log => log.severity === filters.severity)
      }
      
      return logs
    } catch (err) {
      setError("Không thể tải lịch sử hoạt động")
      return []
    }
  }

  // Get contract by ID
  const getContractById = (id: number): Contract | undefined => {
    return contracts.find(contract => contract.id === id)
  }

  // Get contracts by status
  const getContractsByStatus = (status: string): Contract[] => {
    return contracts.filter(contract => contract.contract_status === status)
  }

  // Get contract statistics
  const getContractStatistics = () => {
    const total = contracts.length
    const active = contracts.filter(c => c.contract_status === "active").length
    const draft = contracts.filter(c => c.contract_status === "draft").length
    const completed = contracts.filter(c => c.contract_status === "completed").length
    const totalValue = contracts.reduce((sum, c) => sum + c.contract_value, 0)
    
    return {
      total,
      active,
      draft,
      completed,
      totalValue
    }
  }

  return {
    contracts,
    loading,
    error,
    createContract,
    updateContract,
    deleteContract,
    bulkDeleteContracts,
    searchContracts,
    exportContracts,
    getActivityLogs,
    getContractById,
    getContractsByStatus,
    getContractStatistics
  }
}
