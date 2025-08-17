"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Package, 
  Download,
  Filter,
  Search,
  Globe,
  BarChart3,
  Kanban,
  Plus,
  FileText,
  Settings,
  Activity
} from "lucide-react"
import { BiddingList } from "./BiddingList"
import { BiddingModals } from "./BiddingModals"
import { SearchAndFilter } from "./SearchAndFilter"
import { AdvancedExportModal } from "./AdvancedExportModal"
import { ActivityLogSystem } from "./ActivityLogSystem"
import { useBiddingPackages } from "@/hooks/useBiddingPackages"

export function BiddingPage() {
  const { 
    biddingPackages, 
    addBiddingPackage, 
    updateBiddingPackage, 
    deleteBiddingPackage,
    publishBiddingPackage,
    awardBiddingPackage,
    calculateBiddingStats 
  } = useBiddingPackages()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDocumentsModal, setShowDocumentsModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showAdvancedExportModal, setShowAdvancedExportModal] = useState(false)
  const [showActivityLogModal, setShowActivityLogModal] = useState(false)
  const [showPermissionsModal, setShowPermissionsModal] = useState(false)
  const [showReportsModal, setShowReportsModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"list" | "kanban" | "analytics">("list")
  const [activeTab, setActiveTab] = useState("overview")
  const [searchFilters, setSearchFilters] = useState<any>({})
  const [filteredResults, setFilteredResults] = useState<any[]>([])

  const stats = calculateBiddingStats()

  // Handle search and filter
  const handleSearch = (filters: any) => {
    setSearchFilters(filters)
    // Apply filters to bidding packages
    let filtered = biddingPackages
    if (filters.query) {
      filtered = filtered.filter(pkg => 
        pkg.package_code?.toLowerCase().includes(filters.query.toLowerCase()) ||
        pkg.name?.toLowerCase().includes(filters.query.toLowerCase()) ||
        pkg.project_name?.toLowerCase().includes(filters.query.toLowerCase())
      )
    }
    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter(pkg => filters.status.includes(pkg.status))
    }
    if (filters.tender_method && filters.tender_method.length > 0) {
      filtered = filtered.filter(pkg => filters.tender_method.includes(pkg.tender_method))
    }
    setFilteredResults(filtered)
  }

  const handleClearFilters = () => {
    setSearchFilters({})
    setFilteredResults([])
  }

  const handleSaveSearch = (name: string, filters: any) => {
    console.log('Saving search:', name, filters)
    // TODO: Implement save search functionality
  }

  const handleLoadSearch = (search: any) => {
    setSearchFilters(search.filters)
    handleSearch(search.filters)
  }

  // Handle export
  const handleAdvancedExport = async (config: any) => {
    console.log('Advanced export config:', config)
    // TODO: Implement advanced export functionality
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 2000) // Simulate export process
    })
  }

  // Handle activity log
  const handleViewLogDetails = (logId: number) => {
    console.log('Viewing log details:', logId)
    // TODO: Implement view log details
  }

  const handleRollbackLog = (logId: number) => {
    console.log('Rolling back log:', logId)
    // TODO: Implement rollback functionality
  }

  const handleExportLogs = async (filters: any, format: 'pdf' | 'excel' | 'csv') => {
    console.log('Exporting logs:', filters, format)
    // TODO: Implement log export functionality
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 1000)
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-slate-600'
      case 'created': return 'text-blue-600'
      case 'in_progress': return 'text-orange-600'
      case 'published': return 'text-purple-600'
      case 'bidding': return 'text-yellow-600'
      case 'evaluating': return 'text-indigo-600'
      case 'awarded': return 'text-green-600'
      case 'completed': return 'text-emerald-600'
      case 'cancelled': return 'text-red-600'
      default: return 'text-slate-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return '📝'
      case 'created': return '✨'
      case 'in_progress': return '🔄'
      case 'published': return '📢'
      case 'bidding': return '⏰'
      case 'evaluating': return '🔍'
      case 'awarded': return '🏆'
      case 'completed': return '✅'
      case 'cancelled': return '❌'
      default: return '📋'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-[#800020] flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-xl">
              <Package className="w-8 h-8 text-white" />
            </div>
            Quản lý Gói thầu
          </h1>
          <p className="text-slate-600 max-w-2xl mt-3 text-lg">
            Quản lý và theo dõi các gói thầu, tích hợp với Cổng thông tin đấu thầu Quốc gia.
            <span className="ml-2 text-[#800020] font-medium">Hỗ trợ tạo gói thầu mới và đồng bộ dữ liệu tự động.</span>
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 text-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tạo Gói thầu Mới
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-lg">
          <TabsTrigger 
            value="overview" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-[#800020] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-200"
          >
            <BarChart3 className="w-4 h-4" /> Tổng quan
          </TabsTrigger>
          <TabsTrigger 
            value="management" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-[#800020] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-200"
          >
            <Package className="w-4 h-4" /> Quản lý
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-[#800020] data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-200"
          >
            <Activity className="w-4 h-4" /> Lịch sử hoạt động
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="mt-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Tổng gói thầu - Màu đỏ Agribank (concept chính) */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#800020]/10 to-[#800020]/20 hover:from-[#800020]/20 hover:to-[#800020]/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#800020] mb-1">Tổng gói thầu</p>
                    <p className="text-3xl font-bold text-[#800020]">{stats.total}</p>
                    <p className="text-xs text-[#800020] mt-1">Tất cả gói thầu</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-[#800020] to-[#A00030] rounded-full shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gói thầu mới - Màu xanh lá */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/20 hover:from-green-500/20 hover:to-green-600/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700 mb-1">Gói thầu mới</p>
                    <p className="text-3xl font-bold text-green-800">{stats.created}</p>
                    <p className="text-xs text-green-600 mt-1">Đã tạo</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gói thầu đang thực hiện - Màu cam */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500/10 to-orange-600/20 hover:from-orange-500/20 hover:to-orange-600/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700 mb-1">Đang thực hiện</p>
                    <p className="text-3xl font-bold text-orange-800">{stats.in_progress}</p>
                    <p className="text-xs text-orange-600 mt-1">Đang xử lý</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gói thầu hoàn thành - Màu xanh dương */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/20 hover:from-blue-500/20 hover:to-blue-600/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700 mb-1">Hoàn thành</p>
                    <p className="text-3xl font-bold text-blue-800">{stats.completed}</p>
                    <p className="text-xs text-blue-600 mt-1">Đã kết thúc</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="p-2 bg-[#800020]/20 rounded-lg">
                  <Package className="w-5 h-5 text-[#800020]" />
                </div>
                Thao tác nhanh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo gói thầu mới
                </Button>
                <Button 
                  onClick={() => setShowAdvancedExportModal(true)}
                  variant="outline"
                  className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Xuất dữ liệu nâng cao
                </Button>
                <Button 
                  onClick={() => setShowReportsModal(true)}
                  variant="outline"
                  className="border-blue-500/30 hover:bg-blue-500/10 text-blue-600"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Báo cáo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Management Tab Content */}
        <TabsContent value="management" className="mt-6">
          {/* View Mode Toggle and Controls */}
          <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-white p-6 rounded-xl border border-slate-200 mb-6">
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "list" 
                      ? "bg-white text-[#800020] shadow-sm border border-slate-200" 
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Danh sách
                </button>
                <button
                  onClick={() => setViewMode("kanban")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "kanban" 
                      ? "bg-white text-[#800020] shadow-sm border border-slate-200" 
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  <Kanban className="w-4 h-4 inline mr-2" />
                  Kanban
                </button>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setShowReportsModal(true)}
                  variant="outline"
                  className="border-[#800020]/30 hover:bg-[#800020]/10 text-[#800020]"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Báo cáo
                </Button>
                
                <Button
                  onClick={() => setShowActivityLogModal(true)}
                  variant="outline"
                  className="border-blue-500/30 hover:bg-blue-500/10 text-blue-600"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Lịch sử
                </Button>

                <Button
                  onClick={() => setShowPermissionsModal(true)}
                  variant="outline"
                  className="border-purple-500/30 hover:bg-purple-500/10 text-purple-600"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Phân quyền
                </Button>
              </div>
            </div>

            {/* Export Button */}
            <Button
              onClick={() => setShowAdvancedExportModal(true)}
              className="bg-gradient-to-r from-[#800020] to-[#A00030] hover:from-[#700018] hover:to-[#900028] text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Xuất dữ liệu nâng cao
            </Button>
          </div>

          {/* Search and Filter */}
          <SearchAndFilter
            onSearch={handleSearch}
            onClearFilters={handleClearFilters}
            onSaveSearch={handleSaveSearch}
            onLoadSearch={handleLoadSearch}
            resultCount={filteredResults.length > 0 ? filteredResults.length : biddingPackages.length}
          />

          {/* BiddingList */}
          <BiddingList 
            biddingPackages={filteredResults.length > 0 ? filteredResults : biddingPackages}
            viewMode={viewMode}
            onViewDetails={(pkg) => {
              setSelectedPackage(pkg)
              setShowDetailsModal(true)
            }}
            onEdit={(pkg) => {
              setSelectedPackage(pkg)
              setShowEditModal(true)
            }}
            onDelete={(pkg) => {
              setSelectedPackage(pkg)
              setShowDeleteModal(true)
            }}
            onDocuments={(pkg) => {
              setSelectedPackage(pkg)
              setShowDocumentsModal(true)
            }}
            onHistory={(pkg) => {
              setSelectedPackage(pkg)
              setShowHistoryModal(true)
            }}
            onPublish={(id) => publishBiddingPackage(id)}
            onAward={(id) => awardBiddingPackage(id, new Date().toISOString())}
          />
        </TabsContent>

        {/* Analytics Tab Content */}
        <TabsContent value="analytics" className="mt-6">
          <ActivityLogSystem
            tenderPackageId={selectedPackage?.id}
            onViewDetails={handleViewLogDetails}
            onRollback={handleRollbackLog}
            onExport={handleExportLogs}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <BiddingModals
        showCreateModal={showCreateModal}
        showDetailsModal={showDetailsModal}
        showEditModal={showEditModal}
        showDeleteModal={showDeleteModal}
        showDocumentsModal={showDocumentsModal}
        showHistoryModal={showHistoryModal}
        showExportModal={showExportModal}
        selectedPackage={selectedPackage}
        onCloseCreateModal={() => setShowCreateModal(false)}
        onCloseDetailsModal={() => setShowDetailsModal(false)}
        onCloseEditModal={() => setShowEditModal(false)}
        onCloseDeleteModal={() => setShowDeleteModal(false)}
        onCloseDocumentsModal={() => setShowDocumentsModal(false)}
        onCloseHistoryModal={() => setShowHistoryModal(false)}
        onCloseExportModal={() => setShowExportModal(false)}
        onCreatePackage={addBiddingPackage}
        onUpdatePackage={updateBiddingPackage}
        onDeletePackage={deleteBiddingPackage}
      />

      {/* Advanced Export Modal */}
      <AdvancedExportModal
        isVisible={showAdvancedExportModal}
        onClose={() => setShowAdvancedExportModal(false)}
        onExport={handleAdvancedExport}
        totalRecords={biddingPackages.length}
        filteredRecords={filteredResults.length}
        selectedRecords={0}
      />
    </div>
  )
}
