"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  X,
  Plus,
  Download,
  Filter,
  Search
} from "lucide-react"
import { useBiddingPackages } from "@/hooks/useBiddingPackages"
import { BiddingPackage } from "@/types/bidding"
import { formatCurrency } from "@/lib/utils"
import { BiddingList } from "./BiddingList"
import { BiddingModals } from "./BiddingModals"

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

  const [viewMode, setViewMode] = useState<"list" | "kanban">("list")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<BiddingPackage | null>(null)

  const stats = calculateBiddingStats()

  const handleViewPackageDetails = (biddingPackage: BiddingPackage) => {
    setSelectedPackage(biddingPackage)
    setShowDetailsModal(true)
  }

  const handleCreatePackage = (newPackageData: any) => {
    addBiddingPackage(newPackageData)
    setShowCreateModal(false)
  }

  const handlePublishPackage = (id: number) => {
    publishBiddingPackage(id)
  }

  const handleAwardPackage = (id: number, awardDate: string, notes?: string) => {
    awardBiddingPackage(id, awardDate, notes)
  }

  const handleDeletePackage = (id: number, reason: string) => {
    deleteBiddingPackage(id, reason)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quản lý Gói thầu</h1>
          <p className="text-slate-600 mt-1">
            Quản lý và theo dõi các gói thầu của dự án
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Xuất dữ liệu
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tạo gói thầu
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng gói thầu</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Tổng giá trị: {formatCurrency(stats.totalValue)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang thực hiện</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats.published + stats.bidding + stats.evaluating}
            </div>
            <p className="text-xs text-muted-foreground">
              Đã công bố: {stats.published} | Đang thầu: {stats.bidding} | Đánh giá: {stats.evaluating}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã trao thầu</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.awarded}</div>
            <p className="text-xs text-muted-foreground">
              Hoàn thành trong tháng này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bản nháp</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.draft}</div>
            <p className="text-xs text-muted-foreground">
              Chờ công bố
            </p>
          </CardContent>
        </Card>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            size="sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            Danh sách
          </Button>
          <Button
            variant={viewMode === "kanban" ? "default" : "outline"}
            onClick={() => setViewMode("kanban")}
            size="sm"
          >
            <Package className="w-4 h-4 mr-2" />
            Kanban
          </Button>
        </div>
      </div>

      {/* Bidding List */}
      <BiddingList
        biddingPackages={biddingPackages}
        viewMode={viewMode}
        onViewDetails={handleViewPackageDetails}
        onPublish={handlePublishPackage}
        onAward={handleAwardPackage}
        onDelete={handleDeletePackage}
      />

      {/* Modals */}
      <BiddingModals
        showCreateModal={showCreateModal}
        showDetailsModal={showDetailsModal}
        showExportModal={showExportModal}
        selectedPackage={selectedPackage}
        onCloseCreateModal={() => setShowCreateModal(false)}
        onCloseDetailsModal={() => setShowDetailsModal(false)}
        onCloseExportModal={() => setShowExportModal(false)}
        onCreatePackage={handleCreatePackage}
        onUpdatePackage={updateBiddingPackage}
      />
    </div>
  )
}
