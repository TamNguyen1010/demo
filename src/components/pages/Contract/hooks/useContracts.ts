"use client"

import { useState, useEffect } from "react"
import { Contract, ContractFormData, SearchFilters, ExportConfig, LogFilters, ActivityLog } from "@/types/contract"

// Mock data for development
const mockContracts: Contract[] = [
  {
    id: 1,
    contract_number: "HD-2024-001",
    name: "Hợp đồng xây dựng trường học",
    type: "construction",
    status: "active",
    value: 5000000000,
    currency: "VND",
    start_date: "2024-01-15",
    end_date: "2024-12-31",
    manager_id: 1,
    manager_name: "Nguyễn Văn A",
    contractor_id: 101,
    contractor_name: "Công ty Xây dựng ABC",
    client_id: 201,
    client_name: "Sở Giáo dục TP.HCM",
    description: "Xây dựng trường tiểu học mới với 20 phòng học",
    progress: 65,
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2024-06-15T14:30:00Z",
    created_by: 1,
    updated_by: 1
  },
  {
    id: 2,
    contract_number: "HD-2024-002",
    name: "Hợp đồng cung cấp thiết bị văn phòng",
    type: "supply",
    status: "completed",
    value: 150000000,
    currency: "VND",
    start_date: "2024-02-01",
    end_date: "2024-03-31",
    manager_id: 2,
    manager_name: "Trần Thị B",
    contractor_id: 102,
    contractor_name: "Công ty Thiết bị XYZ",
    client_id: 202,
    client_name: "Công ty TNHH DEF",
    description: "Cung cấp và lắp đặt thiết bị văn phòng cho 50 nhân viên",
    progress: 100,
    created_at: "2024-01-25T09:00:00Z",
    updated_at: "2024-04-01T16:00:00Z",
    created_by: 2,
    updated_by: 2
  },
  {
    id: 3,
    contract_number: "HD-2024-003",
    name: "Hợp đồng tư vấn thiết kế",
    type: "consulting",
    status: "draft",
    value: 80000000,
    currency: "VND",
    start_date: "2024-04-01",
    end_date: "2024-06-30",
    manager_id: 3,
    manager_name: "Lê Văn C",
    contractor_id: 103,
    contractor_name: "Công ty Tư vấn GHI",
    client_id: 203,
    client_name: "Công ty Bất động sản JKL",
    description: "Tư vấn thiết kế dự án chung cư cao cấp",
    progress: 0,
    created_at: "2024-03-15T10:00:00Z",
    updated_at: "2024-03-15T10:00:00Z",
    created_by: 3,
    updated_by: 3
  },
  {
    id: 4,
    contract_number: "HD-2024-004",
    name: "Hợp đồng dịch vụ bảo trì",
    type: "service",
    status: "pending_approval",
    value: 30000000,
    currency: "VND",
    start_date: "2024-05-01",
    end_date: "2024-12-31",
    manager_id: 1,
    manager_name: "Nguyễn Văn A",
    contractor_id: 104,
    contractor_name: "Công ty Bảo trì MNO",
    client_id: 204,
    client_name: "Trung tâm Thương mại PQR",
    description: "Dịch vụ bảo trì hệ thống điện, nước, điều hòa",
    progress: 0,
    created_at: "2024-04-20T11:00:00Z",
    updated_at: "2024-04-20T11:00:00Z",
    created_by: 1,
    updated_by: 1
  }
]

const mockActivityLogs: ActivityLog[] = [
  {
    id: 1,
    contract_id: 1,
    action: "create",
    description: "Tạo hợp đồng mới",
    before_values: null,
    after_values: { name: "Hợp đồng xây dựng trường học", value: 5000000000 },
    user_id: 1,
    user_name: "Nguyễn Văn A",
    timestamp: "2024-01-10T08:00:00Z",
    severity: "info",
    ip_address: "192.168.1.100",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: 2,
    contract_id: 1,
    action: "update",
    description: "Cập nhật tiến độ dự án",
    before_values: { progress: 50 },
    after_values: { progress: 65 },
    user_id: 1,
    user_name: "Nguyễn Văn A",
    timestamp: "2024-06-15T14:30:00Z",
    severity: "info",
    ip_address: "192.168.1.100",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: 3,
    contract_id: 2,
    action: "complete",
    description: "Hoàn thành hợp đồng",
    before_values: { status: "active", progress: 95 },
    after_values: { status: "completed", progress: 100 },
    user_id: 2,
    user_name: "Trần Thị B",
    timestamp: "2024-04-01T16:00:00Z",
    severity: "info",
    ip_address: "192.168.1.101",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  }
]

export function useContracts() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load initial data
  useEffect(() => {
    setContracts(mockContracts)
  }, [])

  // Create new contract
  const createContract = async (contractData: ContractFormData): Promise<Contract> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newContract: Contract = {
        id: Date.now(),
        contract_number: `HD-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        ...contractData,
        progress: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: 1,
        updated_by: 1
      }
      
      setContracts(prev => [...prev, newContract])
      return newContract
    } catch (error) {
      setError("Failed to create contract")
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Update existing contract
  const updateContract = async (id: number, updates: Partial<Contract>): Promise<Contract> => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setContracts(prev => prev.map(contract => 
        contract.id === id 
          ? { ...contract, ...updates, updated_at: new Date().toISOString(), updated_by: 1 }
          : contract
      ))
      
      const updatedContract = contracts.find(c => c.id === id)
      if (!updatedContract) throw new Error("Contract not found")
      
      return { ...updatedContract, ...updates }
    } catch (error) {
      setError("Failed to update contract")
      throw error
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
          ? { ...contract, status: "deleted", updated_at: new Date().toISOString(), updated_by: 1 }
          : contract
      ))
    } catch (error) {
      setError("Failed to delete contract")
      throw error
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
          ? { ...contract, status: "deleted", updated_at: new Date().toISOString(), updated_by: 1 }
          : contract
      ))
    } catch (error) {
      setError("Failed to delete contracts")
      throw error
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
      
      let results = contracts.filter(contract => {
        // Filter by query
        if (filters.query && !contract.name.toLowerCase().includes(filters.query.toLowerCase()) &&
            !contract.contract_number.toLowerCase().includes(filters.query.toLowerCase())) {
          return false
        }
        
        // Filter by status
        if (filters.status.length > 0 && !filters.status.includes(contract.status)) {
          return false
        }
        
        // Filter by type
        if (filters.type.length > 0 && !filters.type.includes(contract.type)) {
          return false
        }
        
        // Filter by value range
        if (filters.value_range.min && contract.value < filters.value_range.min) {
          return false
        }
        if (filters.value_range.max && contract.value > filters.value_range.max) {
          return false
        }
        
        // Filter by date range
        if (filters.date_range.start && contract.start_date < filters.date_range.start) {
          return false
        }
        if (filters.date_range.end && contract.end_date > filters.date_range.end) {
          return false
        }
        
        // Filter by manager
        if (filters.manager_id && contract.manager_id !== filters.manager_id) {
          return false
        }
        
        // Filter by contractor
        if (filters.contractor_id && contract.contractor_id !== filters.contractor_id) {
          return false
        }
        
        // Filter by client
        if (filters.client_id && contract.client_id !== filters.client_id) {
          return false
        }
        
        return true
      })
      
      return results
    } catch (error) {
      setError("Search failed")
      throw error
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
      
    } catch (error) {
      setError("Export failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Get activity logs
  const getActivityLogs = async (contractId?: number, filters?: LogFilters): Promise<ActivityLog[]> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let logs = mockActivityLogs
      
      if (contractId) {
        logs = logs.filter(log => log.contract_id === contractId)
      }
      
      if (filters) {
        if (filters.action && filters.action.length > 0) {
          logs = logs.filter(log => filters.action!.includes(log.action))
        }
        if (filters.severity && filters.severity.length > 0) {
          logs = logs.filter(log => filters.severity!.includes(log.severity))
        }
        if (filters.user_id) {
          logs = logs.filter(log => log.user_id === filters.user_id)
        }
        if (filters.date_range?.start) {
          logs = logs.filter(log => log.timestamp >= filters.date_range!.start!)
        }
        if (filters.date_range?.end) {
          logs = logs.filter(log => log.timestamp <= filters.date_range!.end!)
        }
      }
      
      return logs
    } catch (error) {
      setError("Failed to fetch activity logs")
      throw error
    }
  }

  // Get contract by ID
  const getContractById = (id: number): Contract | undefined => {
    return contracts.find(contract => contract.id === id)
  }

  // Get contracts by status
  const getContractsByStatus = (status: string): Contract[] => {
    return contracts.filter(contract => contract.status === status)
  }

  // Get contract statistics
  const getContractStatistics = () => {
    const total = contracts.length
    const active = contracts.filter(c => c.status === "active").length
    const draft = contracts.filter(c => c.status === "draft").length
    const completed = contracts.filter(c => c.status === "completed").length
    const totalValue = contracts.reduce((sum, c) => sum + c.value, 0)
    const completionRate = total > 0 ? (completed / total) * 100 : 0
    
    return {
      total,
      active,
      draft,
      completed,
      totalValue,
      completionRate: Math.round(completionRate)
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
