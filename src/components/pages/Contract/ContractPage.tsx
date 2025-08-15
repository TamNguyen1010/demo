"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Download, 
  Search, 
  Filter, 
  BarChart3, 
  FileText,
  Trash2,
  Eye,
  Edit,
  AlertTriangle
} from "lucide-react"
import { Contract, SearchFilters, ExportConfig, LogFilters } from "@/types/contract"
import { useContracts } from "./hooks/useContracts"
import { ContractList } from "./ContractList"
import { StatisticsCards } from "./components/StatisticsCards"
import { SearchAndFilter } from "./components/SearchAndFilter"
import { ActivityLogSystem } from "./components/ActivityLogSystem"
import { AdvancedExportModal } from "./components/AdvancedExportModal"
import { CreateContractModal } from "./CreateContractModal"
import { ViewContractModal } from "./ViewContractModal"
import { EditContractModal } from "./EditContractModal"
import { DeleteContractModal } from "./DeleteContractModal"
import { DocumentManagement } from "./DocumentManagement"
import { FinancialDashboard } from "./FinancialDashboard"

export function ContractPage() {
  const {
    contracts,
    loading,
    error,
    searchContracts,
    exportContracts,
    getActivityLogs,
    getContractStatistics
  } = useContracts()

  // State management
  const [selectedContracts, setSelectedContracts] = useState<number[]>([])
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: "",
    status: [],
    type: [],
    value_range: { min: undefined, max: undefined },
    date_range: { start: undefined, end: undefined },
    manager_id: undefined,
    contractor_id: undefined,
    client_id: undefined
  })
  const [filteredResults, setFilteredResults] = useState<Contract[]>([])
  const [showAdvancedExportModal, setShowAdvancedExportModal] = useState(false)
  const [showCreateContractModal, setShowCreateContractModal] = useState(false)
  const [showViewContractModal, setShowViewContractModal] = useState(false)
  const [showEditContractModal, setShowEditContractModal] = useState(false)
  const [showDeleteContractModal, setShowDeleteContractModal] = useState(false)
  const [showDocumentManagementModal, setShowDocumentManagementModal] = useState(false)
  const [showFinancialDashboardModal, setShowFinancialDashboardModal] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [savedSearches, setSavedSearches] = useState<any[]>([])

  // Load initial data
  useEffect(() => {
    setFilteredResults(contracts)
  }, [contracts])

  // Handlers
  const handleSearch = async (filters: SearchFilters) => {
    setSearchFilters(filters)
    try {
      const results = await searchContracts(filters)
      setFilteredResults(results)
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  const handleClearFilters = () => {
    setSearchFilters({
      query: "",
      status: [],
      type: [],
      value_range: { min: undefined, max: undefined },
      date_range: { start: undefined, end: undefined },
      manager_id: undefined,
      contractor_id: undefined,
      client_id: undefined
    })
    setFilteredResults(contracts)
  }

  const handleSaveSearch = async (name: string, filters: SearchFilters) => {
    try {
      // TODO: Implement save search to backend
      const newSearch = {
        id: Date.now(),
        name,
        filters,
        created_by: 1,
        created_at: new Date()
      }
      setSavedSearches(prev => [...prev, newSearch])
      console.log("Search saved:", newSearch)
    } catch (error) {
      console.error("Failed to save search:", error)
    }
  }

  const handleLoadSearch = async (searchId: number) => {
    try {
      const search = savedSearches.find(s => s.id === searchId)
      if (search) {
        setSearchFilters(search.filters)
        await handleSearch(search.filters)
      }
    } catch (error) {
      console.error("Failed to load search:", error)
    }
  }

  const handleExport = async (config: ExportConfig) => {
    try {
      await exportContracts(config)
      setShowAdvancedExportModal(false)
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract)
    setShowViewContractModal(true)
  }

  const handleEditContract = (contract: Contract) => {
    setSelectedContract(contract)
    setShowEditContractModal(true)
  }

  const handleManageDocuments = (contract: Contract) => {
    setSelectedContract(contract)
    setShowDocumentManagementModal(true)
  }

  const handleFinancialDashboard = (contract: Contract) => {
    setSelectedContract(contract)
    setShowFinancialDashboardModal(true)
  }

  const handleUpdateContract = (updatedContract: Contract) => {
    // TODO: Implement contract update logic
    console.log("Updating contract:", updatedContract)
    // Here you would typically call an API to update the contract
    // For now, we'll just log the data
    setShowEditContractModal(false)
    setSelectedContract(null)
  }

  const handleDeleteContract = (contract: Contract) => {
    setSelectedContract(contract)
    setShowDeleteContractModal(true)
  }

  const handleConfirmDelete = (contract: Contract) => {
    // TODO: Implement contract deletion logic
    console.log("Deleting contract:", contract)
    // Here you would typically call an API to delete the contract
    // For now, we'll just log the data
    
    // Remove from selected contracts if it was selected
    setSelectedContracts(prev => prev.filter(id => id !== contract.id))
    
    // Close modal and reset state
    setShowDeleteContractModal(false)
    setSelectedContract(null)
  }

  const handleSelectContract = (contractId: number, selected: boolean) => {
    setSelectedContracts(prev => 
      selected 
        ? [...prev, contractId]
        : prev.filter(id => id !== contractId)
    )
  }

  const handleCreateContract = () => {
    setShowCreateContractModal(true)
  }

  const handleCloseCreateModal = () => {
    setShowCreateContractModal(false)
  }

  const handleSubmitContract = (contractData: any) => {
    // TODO: Implement contract creation logic
    console.log("Creating new contract:", contractData)
    // Here you would typically call an API to create the contract
    // For now, we'll just log the data
    setShowCreateContractModal(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020] mx-auto mb-4"></div>
          <p className="text-slate-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Lỗi tải dữ liệu</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-[#800020] flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-xl">
              <FileText className="w-8 h-8 text-white" />
            </div>
            Quản lý Hợp đồng
          </h1>
          <p className="text-slate-600 max-w-2xl mt-3 text-lg">
            Quản lý và theo dõi tất cả hợp đồng của tổ chức, bao gồm trạng thái, tiến độ và thông tin chi tiết.
            <span className="ml-2 text-[#800020] font-medium">Hỗ trợ tìm kiếm nâng cao và xuất báo cáo.</span>
          </p>
        </div>
        <Button 
          onClick={handleCreateContract}
          className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tạo Hợp đồng Mới
        </Button>
      </div>

      {/* Statistics Cards */}
      <StatisticsCards
        total={contracts.length}
        active={contracts.filter(c => c.status === 'active').length}
        draft={contracts.filter(c => c.status === 'draft').length}
        completed={contracts.filter(c => c.status === 'completed').length}
        totalValue={contracts.reduce((sum, c) => sum + c.value, 0)}
      />

      {/* Search and Filter */}
      <SearchAndFilter
        onSearch={handleSearch}
        onClearFilters={handleClearFilters}
        onSaveSearch={handleSaveSearch}
        onLoadSearch={handleLoadSearch}
        resultCount={filteredResults.length}
        savedSearches={savedSearches}
      />

      {/* Main Content */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <div className="p-2 bg-[#800020]/20 rounded-lg">
              <BarChart3 className="w-5 h-5 text-[#800020]" />
            </div>
            Danh sách Hợp đồng
          </CardTitle>
          <div className="flex items-center space-x-3">
            {selectedContracts.length > 0 && (
              <Button variant="outline" className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]">
                <Download className="w-4 h-4 mr-2" />
                Xuất ({selectedContracts.length})
              </Button>
            )}
            <Button
              onClick={() => setShowAdvancedExportModal(true)}
              variant="outline"
              className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
            >
              <Download className="w-4 h-4 mr-2" />
              Xuất dữ liệu
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100">
              <TabsTrigger value="list" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                Danh sách
              </TabsTrigger>
              <TabsTrigger value="logs" className="data-[state=active]:bg-white data-[state=active]:text-[#800020]">
                Lịch sử hoạt động
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="mt-6">
              <ContractList
                contracts={filteredResults}
                onViewContract={handleViewContract}
                onEditContract={handleEditContract}
                onDeleteContract={handleDeleteContract}
                onSelectContract={handleSelectContract}
                selectedContracts={selectedContracts}
              />
            </TabsContent>
            
            <TabsContent value="logs" className="mt-6">
              <ActivityLogSystem
                filters={{} as LogFilters}
                onFilterChange={() => {}}
                onExport={() => {}}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Advanced Export Modal */}
      <AdvancedExportModal
        isOpen={showAdvancedExportModal}
        onClose={() => setShowAdvancedExportModal(false)}
        onExport={handleExport}
        contracts={filteredResults}
      />

      {/* Create Contract Modal */}
      <CreateContractModal
        isOpen={showCreateContractModal}
        onClose={handleCloseCreateModal}
        onSubmit={handleSubmitContract}
      />

      {/* View Contract Modal */}
      <ViewContractModal
        isOpen={showViewContractModal}
        onClose={() => {
          setShowViewContractModal(false)
          setSelectedContract(null)
        }}
        contract={selectedContract}
        onEdit={handleEditContract}
        onManageDocuments={handleManageDocuments}
        onFinancialDashboard={handleFinancialDashboard}
      />

      {/* Edit Contract Modal */}
      <EditContractModal
        isOpen={showEditContractModal}
        onClose={() => {
          setShowEditContractModal(false)
          setSelectedContract(null)
        }}
        contract={selectedContract}
        onSubmit={handleUpdateContract}
      />

      {/* Delete Contract Modal */}
      <DeleteContractModal
        isOpen={showDeleteContractModal}
        onClose={() => {
          setShowDeleteContractModal(false)
          setSelectedContract(null)
        }}
        contract={selectedContract}
        onConfirm={handleConfirmDelete}
      />

      {/* Document Management Modal */}
      <DocumentManagement
        isOpen={showDocumentManagementModal}
        onClose={() => {
          setShowDocumentManagementModal(false)
          setSelectedContract(null)
        }}
        contract={selectedContract!}
      />

      {/* Financial Dashboard Modal */}
      <FinancialDashboard
        isOpen={showFinancialDashboardModal}
        onClose={() => {
          setShowFinancialDashboardModal(false)
          setSelectedContract(null)
        }}
        contract={selectedContract!}
      />
    </div>
  )
}
